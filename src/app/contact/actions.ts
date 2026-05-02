"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  createEnquiryEmailDraft,
  initialEnquirySubmissionState,
  type EnquiryDeliveryMode,
  type EnquiryRateLimitMode,
  type EnquiryStorageMode,
  type EnquirySubmissionState,
  validateEnquiryForm,
} from "@/data/enquiries";

const SUPABASE_STORAGE_MODE = "supabase";
const DISABLED_MODE = "disabled";
const MEMORY_RATE_LIMIT_MODE = "memory";
const DEFAULT_RATE_LIMIT_MAX = 5;
const DEFAULT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

type EnquiryRuntimeConfig = {
  storage: {
    mode: EnquiryStorageMode;
    tableName: string;
    ready: boolean;
    missing: string[];
  };
  delivery: {
    mode: EnquiryDeliveryMode;
    ready: boolean;
  };
  rateLimit: {
    mode: EnquiryRateLimitMode;
    maxAttempts: number;
    windowMs: number;
    salt?: string;
    ready: boolean;
  };
  configErrors: string[];
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitEntries = new Map<string, RateLimitEntry>();

export async function submitEnquiry(
  previousState: EnquirySubmissionState = initialEnquirySubmissionState,
  formData: FormData,
): Promise<EnquirySubmissionState> {
  void previousState;

  const runtimeConfig = getEnquiryRuntimeConfig();
  const spamTrap = formData.get("website");

  if (typeof spamTrap === "string" && spamTrap.trim().length > 0) {
    return {
      status: "success",
      message:
        "Thank you. If the enquiry is genuine, the school will follow up using the details provided.",
    };
  }

  const rateLimitResult = await checkRateLimit(runtimeConfig);

  if (rateLimitResult.status === "limited") {
    return {
      status: "error",
      message:
        "Too many enquiry attempts have been made from this browser or network. Please wait a little while, or email the school directly.",
    };
  }

  const validation = validateEnquiryForm(formData);

  if (!validation.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: validation.errors,
      values: validation.values,
    };
  }

  const storageResult = await storeEnquiryIfConfigured(
    validation.values,
    runtimeConfig,
  );

  if (storageResult.status === "stored") {
    return {
      status: "success",
      message:
        "Thank you. Your initial enquiry has been submitted securely. The school will contact you about the most suitable next step.",
      values: validation.values,
    };
  }

  const message =
    runtimeConfig.configErrors.length > 0
      ? "Your details were checked, but online delivery is not available in this environment. Please email the school directly."
      : "Your details are ready to email. Please send them directly to the school.";

  return {
    status: "not-configured",
    message,
    values: validation.values,
  };
}

async function storeEnquiryIfConfigured(
  values: NonNullable<EnquirySubmissionState["values"]>,
  runtimeConfig: EnquiryRuntimeConfig,
) {
  if (
    runtimeConfig.storage.mode !== SUPABASE_STORAGE_MODE ||
    !runtimeConfig.storage.ready ||
    runtimeConfig.configErrors.length > 0
  ) {
    return { status: "not-configured" as const };
  }

  const supabase = await createClient();
  const { error } = await supabase.from(runtimeConfig.storage.tableName).insert({
    parent_name: values.parentName,
    email: values.email,
    phone: values.phone || null,
    preferred_route: values.preferredRoute,
    child_first_names: values.childNames,
    child_ages: values.childAges,
    russian_level: values.russianLevel,
    enquiry_type: values.enquiryType,
    message: values.message || null,
    privacy_consent: values.privacyConsent,
    email_draft: createEnquiryEmailDraft(values),
    source: "website-contact-form",
  });

  if (error) {
    return { status: "not-configured" as const };
  }

  return { status: "stored" as const };
}

function getEnquiryRuntimeConfig(): EnquiryRuntimeConfig {
  const storageMode = parseStorageMode(process.env.ENQUIRY_STORAGE_MODE);
  const deliveryMode = parseDeliveryMode(process.env.ENQUIRY_DELIVERY_MODE);
  const rateLimitMode = parseRateLimitMode(process.env.ENQUIRY_RATE_LIMIT_MODE);
  const tableName = process.env.SUPABASE_ENQUIRIES_TABLE || "enquiries";
  const storageMissing =
    storageMode === SUPABASE_STORAGE_MODE
      ? [
          "NEXT_PUBLIC_SUPABASE_URL",
          "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        ].filter((key) => !process.env[key])
      : [];
  const rateLimitSalt = process.env.ENQUIRY_RATE_LIMIT_SALT;
  const configErrors = [
    ...validateConfiguredMode(
      "ENQUIRY_STORAGE_MODE",
      process.env.ENQUIRY_STORAGE_MODE,
      [DISABLED_MODE, SUPABASE_STORAGE_MODE],
    ),
    ...validateConfiguredMode(
      "ENQUIRY_DELIVERY_MODE",
      process.env.ENQUIRY_DELIVERY_MODE,
      [DISABLED_MODE],
    ),
    ...validateConfiguredMode(
      "ENQUIRY_RATE_LIMIT_MODE",
      process.env.ENQUIRY_RATE_LIMIT_MODE,
      ["off", MEMORY_RATE_LIMIT_MODE],
    ),
  ];

  if (storageMissing.length > 0) {
    configErrors.push(
      `Missing enquiry storage environment variables: ${storageMissing.join(
        ", ",
      )}`,
    );
  }

  if (rateLimitMode === MEMORY_RATE_LIMIT_MODE && !rateLimitSalt) {
    configErrors.push("Missing ENQUIRY_RATE_LIMIT_SALT for memory rate limiting");
  }

  return {
    storage: {
      mode: storageMode,
      tableName,
      ready: storageMode === SUPABASE_STORAGE_MODE && storageMissing.length === 0,
      missing: storageMissing,
    },
    delivery: {
      mode: deliveryMode,
      ready: false,
    },
    rateLimit: {
      mode: rateLimitMode,
      maxAttempts: parsePositiveInteger(
        process.env.ENQUIRY_RATE_LIMIT_MAX,
        DEFAULT_RATE_LIMIT_MAX,
      ),
      windowMs:
        parsePositiveInteger(
          process.env.ENQUIRY_RATE_LIMIT_WINDOW_SECONDS,
          DEFAULT_RATE_LIMIT_WINDOW_MS / 1000,
        ) * 1000,
      salt: rateLimitSalt,
      ready: rateLimitMode !== MEMORY_RATE_LIMIT_MODE || Boolean(rateLimitSalt),
    },
    configErrors,
  };
}

async function checkRateLimit(runtimeConfig: EnquiryRuntimeConfig) {
  if (
    runtimeConfig.rateLimit.mode !== MEMORY_RATE_LIMIT_MODE ||
    !runtimeConfig.rateLimit.ready ||
    !runtimeConfig.rateLimit.salt
  ) {
    return { status: "allowed" as const };
  }

  const key = await getRateLimitKey(runtimeConfig.rateLimit.salt);
  const now = Date.now();
  const existing = rateLimitEntries.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitEntries.set(key, {
      count: 1,
      resetAt: now + runtimeConfig.rateLimit.windowMs,
    });
    pruneExpiredRateLimitEntries(now);

    return { status: "allowed" as const };
  }

  if (existing.count >= runtimeConfig.rateLimit.maxAttempts) {
    return { status: "limited" as const };
  }

  rateLimitEntries.set(key, {
    ...existing,
    count: existing.count + 1,
  });

  return { status: "allowed" as const };
}

async function getRateLimitKey(salt: string) {
  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address =
    forwardedFor || headerStore.get("x-real-ip") || "unknown-address";
  const userAgent = headerStore.get("user-agent") || "unknown-agent";

  return createHash("sha256")
    .update(`${salt}:${address}:${userAgent}`)
    .digest("hex");
}

function pruneExpiredRateLimitEntries(now: number) {
  for (const [key, entry] of rateLimitEntries) {
    if (entry.resetAt <= now) {
      rateLimitEntries.delete(key);
    }
  }
}

function parseStorageMode(value?: string): EnquiryStorageMode {
  return value === SUPABASE_STORAGE_MODE ? SUPABASE_STORAGE_MODE : DISABLED_MODE;
}

function parseDeliveryMode(value?: string): EnquiryDeliveryMode {
  return value === DISABLED_MODE ? DISABLED_MODE : DISABLED_MODE;
}

function parseRateLimitMode(value?: string): EnquiryRateLimitMode {
  return value === MEMORY_RATE_LIMIT_MODE ? MEMORY_RATE_LIMIT_MODE : "off";
}

function validateConfiguredMode(
  key: string,
  value: string | undefined,
  allowed: string[],
) {
  if (!value || allowed.includes(value)) {
    return [];
  }

  return [`Unsupported ${key}: ${value}`];
}

function parsePositiveInteger(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
