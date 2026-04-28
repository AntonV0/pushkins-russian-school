"use server";

import { createClient } from "@/lib/supabase/server";
import {
  createEnquiryEmailDraft,
  initialEnquirySubmissionState,
  type EnquirySubmissionState,
  validateEnquiryForm,
} from "@/data/enquiries";

const ENQUIRY_STORAGE_MODE = "supabase";

export async function submitEnquiry(
  previousState: EnquirySubmissionState = initialEnquirySubmissionState,
  formData: FormData,
): Promise<EnquirySubmissionState> {
  void previousState;

  const spamTrap = formData.get("website");

  if (typeof spamTrap === "string" && spamTrap.trim().length > 0) {
    return {
      status: "success",
      message:
        "Thank you. If the enquiry is genuine, the school will follow up using the details provided.",
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

  const storageResult = await storeEnquiryIfConfigured(validation.values);

  if (storageResult.status === "stored") {
    return {
      status: "success",
      message:
        "Thank you. Your initial enquiry has been submitted. The school will contact you about the most suitable next step.",
      values: validation.values,
    };
  }

  return {
    status: "not-configured",
    message:
      "Your enquiry details passed validation, but live delivery is not configured in this environment yet. Please email the school directly for now.",
    values: validation.values,
  };
}

async function storeEnquiryIfConfigured(
  values: NonNullable<EnquirySubmissionState["values"]>,
) {
  if (process.env.ENQUIRY_STORAGE_MODE !== ENQUIRY_STORAGE_MODE) {
    return { status: "not-configured" as const };
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { status: "not-configured" as const };
  }

  const tableName = process.env.SUPABASE_ENQUIRIES_TABLE ?? "enquiries";
  const supabase = await createClient();
  const { error } = await supabase.from(tableName).insert({
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
