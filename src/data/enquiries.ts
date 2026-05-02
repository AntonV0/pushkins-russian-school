import { enquiryTypes, russianLevelOptions } from "@/data/admissions";
import { learningOptions } from "@/data/learning-options";
import { schools } from "@/data/schools";

export type EnquiryField =
  | "parentName"
  | "email"
  | "phone"
  | "preferredRoute"
  | "childNames"
  | "childAges"
  | "russianLevel"
  | "enquiryType"
  | "message"
  | "privacyConsent";

export type EnquiryValues = {
  parentName: string;
  email: string;
  phone: string;
  preferredRoute: string;
  childNames: string;
  childAges: string;
  russianLevel: string;
  enquiryType: string;
  message: string;
  privacyConsent: boolean;
};

export type EnquiryValidationResult =
  | {
      success: true;
      values: EnquiryValues;
    }
  | {
      success: false;
      values: EnquiryValues;
      errors: Partial<Record<EnquiryField, string>>;
    };

export type EnquirySubmissionStatus =
  | "idle"
  | "success"
  | "error"
  | "not-configured";

export type EnquirySubmissionState = {
  status: EnquirySubmissionStatus;
  message?: string;
  fieldErrors?: Partial<Record<EnquiryField, string>>;
  values?: EnquiryValues;
};

export type EnquiryStorageMode = "disabled" | "supabase";

export type EnquiryDeliveryMode = "disabled";

export type EnquiryRateLimitMode = "off" | "memory";

export type EnquiryInboxStatus =
  | "new"
  | "triage"
  | "invited"
  | "closed";

export type SampleEnquiryRecord = {
  id: string;
  receivedAt: string;
  parentLabel: string;
  childLabel: string;
  preferredRoute: string;
  enquiryType: string;
  russianLevel: string;
  status: EnquiryInboxStatus;
  lastActivity: string;
  nextAction: string;
  source: "sample-only";
};

export const initialEnquirySubmissionState: EnquirySubmissionState = {
  status: "idle",
};

export const enquiryPrivacyNotice =
  "This is an initial enquiry only. Please do not include medical details, safeguarding information, full addresses, documents, or other sensitive registration information in this form.";

export const enquiryStorageDecision =
  "Supabase storage should be enabled only after the enquiry table, row-level security, retention period, staff access model, and privacy wording are confirmed.";

export const enquiryDeliveryDecision =
  "Email delivery is disabled by default. Add a transactional email provider only after credentials, sender domains, acknowledgement wording, and failure handling are approved.";

export const enquirySpamProtectionDecision =
  "Spam protection starts with a honeypot. Optional in-memory rate limiting must hash request metadata with a server-only salt and should be replaced by durable edge or database-backed protection before heavy traffic.";

export const enquiryStatusMeta: Record<
  EnquiryInboxStatus,
  {
    label: string;
    description: string;
    tone: "info" | "warning" | "success" | "neutral";
  }
> = {
  new: {
    label: "New",
    description: "Needs first staff review.",
    tone: "info",
  },
  triage: {
    label: "Triage",
    description: "Awaiting branch, level, or timetable decision.",
    tone: "warning",
  },
  invited: {
    label: "Invited",
    description: "Ready for the second-stage registration flow.",
    tone: "success",
  },
  closed: {
    label: "Closed",
    description: "No further enquiry follow-up expected.",
    tone: "neutral",
  },
};

export const enquiryRouteOptions = [
  {
    groupLabel: "Pushkin's School branches",
    options: schools.map((school) => ({
      value: `school:${school.slug}`,
      label: `${school.name} - ${school.statusLabel}`,
    })),
  },
  {
    groupLabel: "Related Russian-learning options",
    options: learningOptions
      .filter((option) => option.id !== "pushkins-school")
      .map((option) => ({
        value: `learning:${option.id}`,
        label: option.name,
      })),
  },
  {
    groupLabel: "Not sure yet",
    options: [
      {
        value: "not-sure",
        label: "Please advise on the best option",
      },
    ],
  },
];

export function getInitialPreferredRoute(selectedSchool?: string) {
  if (selectedSchool && schools.some((school) => school.slug === selectedSchool)) {
    return `school:${selectedSchool}`;
  }

  return "";
}

export function normalizeEnquiryIntent(intent?: string) {
  if (intent && enquiryTypes.some((type) => type.value === intent)) {
    return intent;
  }

  return "general";
}

export function getPreferredRouteLabel(value: string) {
  for (const group of enquiryRouteOptions) {
    const option = group.options.find((routeOption) => routeOption.value === value);

    if (option) {
      return option.label;
    }
  }

  return "Not selected";
}

export function getEnquiryTypeLabel(value: string) {
  return (
    enquiryTypes.find((type) => type.value === value)?.label ??
    "General enquiry"
  );
}

export function validateEnquiryForm(formData: FormData): EnquiryValidationResult {
  const values: EnquiryValues = {
    parentName: cleanText(formData.get("parentName"), 120),
    email: cleanText(formData.get("email"), 160).toLowerCase(),
    phone: cleanText(formData.get("phone"), 40),
    preferredRoute: cleanText(formData.get("preferredRoute"), 80),
    childNames: cleanText(formData.get("childNames"), 180),
    childAges: cleanText(formData.get("childAges"), 120),
    russianLevel: cleanText(formData.get("russianLevel"), 80),
    enquiryType: cleanText(formData.get("enquiryType"), 80),
    message: cleanText(formData.get("message"), 1200),
    privacyConsent: formData.get("privacyConsent") === "yes",
  };

  const errors: Partial<Record<EnquiryField, string>> = {};

  if (values.parentName.length < 2) {
    errors.parentName = "Enter the parent or carer name.";
  }

  if (!isLikelyEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.preferredRoute || !isKnownPreferredRoute(values.preferredRoute)) {
    errors.preferredRoute = "Choose a branch or learning option.";
  }

  if (values.childNames.length < 2) {
    errors.childNames = "Enter the child first name or children's first names.";
  }

  if (values.childAges.length < 1) {
    errors.childAges = "Enter the child age or ages.";
  }

  if (!russianLevelOptions.includes(values.russianLevel)) {
    errors.russianLevel = "Choose the closest Russian level.";
  }

  if (!enquiryTypes.some((type) => type.value === values.enquiryType)) {
    errors.enquiryType = "Choose an enquiry type.";
  }

  if (!values.privacyConsent) {
    errors.privacyConsent = "Confirm that this is only an initial enquiry.";
  }

  if (hasSensitiveRegistrationContent(values.message)) {
    errors.message =
      "Please remove medical, safeguarding, document, address, or full registration details from the initial enquiry.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      values,
      errors,
    };
  }

  return {
    success: true,
    values,
  };
}

export function createEnquiryEmailDraft(values: EnquiryValues) {
  return [
    "New initial enquiry",
    "",
    `Parent or carer name: ${values.parentName}`,
    `Email address: ${values.email}`,
    `Phone number: ${values.phone || "Not provided"}`,
    `Preferred route: ${getPreferredRouteLabel(values.preferredRoute)}`,
    `Enquiry type: ${getEnquiryTypeLabel(values.enquiryType)}`,
    `Child first name(s): ${values.childNames}`,
    `Child age(s): ${values.childAges}`,
    `Current Russian level: ${values.russianLevel}`,
    "",
    "Message:",
    values.message || "Not provided",
    "",
    "Privacy note: submitted as an initial enquiry only. Full registration, medical, safeguarding, emergency contact, and consent details should be collected later through the approved registration workflow.",
  ].join("\n");
}

export const sampleEnquiries: SampleEnquiryRecord[] = [
  {
    id: "sample-enquiry-001",
    receivedAt: "2026-04-24",
    parentLabel: "Sample Parent A",
    childLabel: "Sample child, age 7",
    preferredRoute: "school:high-wycombe",
    enquiryType: "current-classes",
    russianLevel: "Understands some Russian at home",
    status: "new",
    lastActivity: "Initial enquiry received in the sample workflow.",
    nextAction: "Check class fit and prepare a careful first reply.",
    source: "sample-only",
  },
  {
    id: "sample-enquiry-002",
    receivedAt: "2026-04-23",
    parentLabel: "Sample Parent B",
    childLabel: "Two sample children, ages 10 and 12",
    preferredRoute: "learning:volna-online",
    enquiryType: "online-learning",
    russianLevel: "Reads and writes in Russian",
    status: "triage",
    lastActivity: "Tutor availability needs confirmation before replying.",
    nextAction: "Confirm route owner and avoid collecting registration details.",
    source: "sample-only",
  },
  {
    id: "sample-enquiry-003",
    receivedAt: "2026-04-21",
    parentLabel: "Sample Parent C",
    childLabel: "Sample GCSE learner",
    preferredRoute: "learning:gcse-russian",
    enquiryType: "exam-preparation",
    russianLevel: "Preparing for GCSE",
    status: "invited",
    lastActivity: "Sample guidance sent; ready for the next-stage workflow.",
    nextAction: "Send approved registration invitation if the family proceeds.",
    source: "sample-only",
  },
];

export const enquiryInboxSummary = {
  totalEnquiries: sampleEnquiries.length,
  newCount: countSampleEnquiriesByStatus(["new"]),
  activeCount: countSampleEnquiriesByStatus(["new", "triage"]),
  registrationReadyCount: countSampleEnquiriesByStatus(["invited"]),
};

export function getSampleEnquiryRouteLabel(enquiry: SampleEnquiryRecord) {
  return getPreferredRouteLabel(enquiry.preferredRoute);
}

export function getSampleEnquiryTypeLabel(enquiry: SampleEnquiryRecord) {
  return getEnquiryTypeLabel(enquiry.enquiryType);
}

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function hasSensitiveRegistrationContent(value: string) {
  if (!value) {
    return false;
  }

  const normalized = value.toLowerCase();
  const blockedTerms = [
    "allergy",
    "allergies",
    "birth certificate",
    "diagnosis",
    "doctor",
    "emergency contact",
    "home address",
    "medical",
    "medication",
    "passport",
    "safeguarding",
    "social worker",
  ];

  return blockedTerms.some((term) => normalized.includes(term));
}

function isKnownPreferredRoute(value: string) {
  return enquiryRouteOptions.some((group) =>
    group.options.some((option) => option.value === value),
  );
}

function isLikelyEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function countSampleEnquiriesByStatus(statuses: EnquiryInboxStatus[]) {
  return sampleEnquiries.filter((enquiry) => statuses.includes(enquiry.status))
    .length;
}
