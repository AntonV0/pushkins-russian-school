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

export const initialEnquirySubmissionState: EnquirySubmissionState = {
  status: "idle",
};

export const enquiryPrivacyNotice =
  "This is an initial enquiry only. Please do not include medical details, safeguarding information, full addresses, documents, or other sensitive registration information in this form.";

export const enquiryStorageDecision =
  "Supabase storage should be enabled only after the enquiry table, row-level security, retention period, staff access model, and privacy wording are confirmed.";

export const enquiryRouteOptions = [
  {
    groupLabel: "Pushkin's School branches",
    options: schools.map((school) => ({
      value: `school:${school.slug}`,
      label: `${school.name} - ${school.statusLabel}`,
    })),
  },
  {
    groupLabel: "Related Russian-learning routes",
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
        label: "Please advise on the best route",
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
    errors.preferredRoute = "Choose a branch or learning route.";
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

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function isKnownPreferredRoute(value: string) {
  return enquiryRouteOptions.some((group) =>
    group.options.some((option) => option.value === value),
  );
}

function isLikelyEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
