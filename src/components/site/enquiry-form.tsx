"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitEnquiry } from "@/app/contact/actions";
import {
  enquiryTypes,
  russianLevelOptions,
} from "@/data/admissions";
import { contactDetails } from "@/data/contact";
import {
  enquiryPrivacyNotice,
  enquiryRouteOptions,
  getInitialPreferredRoute,
  initialEnquirySubmissionState,
  normalizeEnquiryIntent,
  type EnquiryField,
  type EnquirySubmissionState,
} from "@/data/enquiries";

type EnquiryFormProps = {
  selectedSchool?: string;
  selectedIntent?: string;
  mode?: "live" | "preview";
};

export function EnquiryForm({
  selectedSchool,
  selectedIntent,
  mode = "preview",
}: EnquiryFormProps) {
  const [state, formAction] = useActionState(
    submitEnquiry,
    initialEnquirySubmissionState,
  );
  const fieldErrors = state.fieldErrors ?? {};
  const initialPreferredRoute = getInitialPreferredRoute(selectedSchool);
  const initialIntent = normalizeEnquiryIntent(selectedIntent);
  const statusId = "enquiry-form-status";
  const formIntro =
    mode === "live"
      ? "Submit a simple initial enquiry. The detailed registration form for health, safeguarding, emergency contacts, and consents comes later if your family joins."
      : "Use this form to check the details to include, then email the school directly while website enquiry delivery is being connected.";

  return (
    <form
      id="enquiry-form"
      action={formAction}
      className="rounded-lg border border-border-soft bg-surface p-6 shadow-sm sm:p-8"
      aria-describedby={`${statusId} enquiry-privacy-notice`}
      noValidate
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
          Enquiry form
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-brand-blue-strong">
          Tell us what you are looking for
        </h2>
        <p
          id={statusId}
          className="mt-3 text-sm leading-6 text-slate-600"
          aria-live="polite"
        >
          {formIntro}
        </p>
      </div>

      <SubmissionNotice state={state} />

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <FieldError field="parentName" errors={fieldErrors}>
          <label
            htmlFor="parent-name"
            className="text-sm font-semibold text-brand-blue-strong"
          >
            Parent or carer name
          </label>
          <input
            id="parent-name"
            name="parentName"
            type="text"
            autoComplete="name"
            maxLength={120}
            required
            aria-invalid={Boolean(fieldErrors.parentName)}
            aria-describedby={errorDescribedBy("parentName", fieldErrors)}
            defaultValue={state.values?.parentName ?? ""}
            className={fieldClassName(Boolean(fieldErrors.parentName))}
          />
        </FieldError>

        <FieldError field="email" errors={fieldErrors}>
          <label
            htmlFor="email"
            className="text-sm font-semibold text-brand-blue-strong"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            required
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={errorDescribedBy("email", fieldErrors)}
            defaultValue={state.values?.email ?? ""}
            className={fieldClassName(Boolean(fieldErrors.email))}
          />
        </FieldError>

        <FieldError field="phone" errors={fieldErrors}>
          <label
            htmlFor="phone"
            className="text-sm font-semibold text-brand-blue-strong"
          >
            Phone number{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={errorDescribedBy("phone", fieldErrors)}
            defaultValue={state.values?.phone ?? ""}
            className={fieldClassName(Boolean(fieldErrors.phone))}
          />
        </FieldError>

        <FieldError field="preferredRoute" errors={fieldErrors}>
          <label
            htmlFor="preferred-route"
            className="text-sm font-semibold text-brand-blue-strong"
          >
            Preferred school or learning route
          </label>
          <select
            id="preferred-route"
            name="preferredRoute"
            required
            aria-invalid={Boolean(fieldErrors.preferredRoute)}
            aria-describedby={errorDescribedBy("preferredRoute", fieldErrors)}
            defaultValue={state.values?.preferredRoute ?? initialPreferredRoute}
            className={fieldClassName(Boolean(fieldErrors.preferredRoute))}
          >
            <option value="">Select a route</option>
            {enquiryRouteOptions.map((group) => (
              <optgroup key={group.groupLabel} label={group.groupLabel}>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </FieldError>

        <FieldError field="childNames" errors={fieldErrors}>
          <label
            htmlFor="child-names"
            className="text-sm font-semibold text-brand-blue-strong"
          >
            Child first name(s)
          </label>
          <input
            id="child-names"
            name="childNames"
            type="text"
            autoComplete="off"
            maxLength={180}
            required
            aria-invalid={Boolean(fieldErrors.childNames)}
            aria-describedby={errorDescribedBy("childNames", fieldErrors)}
            placeholder="e.g. Sasha, Mila"
            defaultValue={state.values?.childNames ?? ""}
            className={fieldClassName(Boolean(fieldErrors.childNames))}
          />
        </FieldError>

        <FieldError field="childAges" errors={fieldErrors}>
          <label
            htmlFor="child-ages"
            className="text-sm font-semibold text-brand-blue-strong"
          >
            Child age(s)
          </label>
          <input
            id="child-ages"
            name="childAges"
            type="text"
            inputMode="text"
            maxLength={120}
            required
            aria-invalid={Boolean(fieldErrors.childAges)}
            aria-describedby={errorDescribedBy("childAges", fieldErrors)}
            placeholder="e.g. 6 and 9, or Year 10"
            defaultValue={state.values?.childAges ?? ""}
            className={fieldClassName(Boolean(fieldErrors.childAges))}
          />
        </FieldError>

        <FieldError field="russianLevel" errors={fieldErrors}>
          <label
            htmlFor="russian-level"
            className="text-sm font-semibold text-brand-blue-strong"
          >
            Current Russian level
          </label>
          <select
            id="russian-level"
            name="russianLevel"
            required
            aria-invalid={Boolean(fieldErrors.russianLevel)}
            aria-describedby={errorDescribedBy("russianLevel", fieldErrors)}
            defaultValue={state.values?.russianLevel ?? ""}
            className={fieldClassName(Boolean(fieldErrors.russianLevel))}
          >
            <option value="">Select the closest option</option>
            {russianLevelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FieldError>

        <FieldError field="enquiryType" errors={fieldErrors}>
          <label
            htmlFor="enquiry-type"
            className="text-sm font-semibold text-brand-blue-strong"
          >
            Enquiry type
          </label>
          <select
            id="enquiry-type"
            name="enquiryType"
            required
            aria-invalid={Boolean(fieldErrors.enquiryType)}
            aria-describedby={errorDescribedBy("enquiryType", fieldErrors)}
            defaultValue={state.values?.enquiryType ?? initialIntent}
            className={fieldClassName(Boolean(fieldErrors.enquiryType))}
          >
            {enquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </FieldError>
      </div>

      <FieldError field="message" errors={fieldErrors} className="mt-5">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-brand-blue-strong"
        >
          Message <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={1200}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={errorDescribedBy(
            "message",
            fieldErrors,
            "enquiry-message-guidance",
          )}
          placeholder="Share useful learning context only, such as previous lessons, exam goals, siblings, or preferred start date."
          defaultValue={state.values?.message ?? ""}
          className={fieldClassName(Boolean(fieldErrors.message))}
        />
        <p
          id="enquiry-message-guidance"
          className="mt-2 text-xs leading-5 text-slate-500"
        >
          Keep this to learning context. Do not include medical, safeguarding,
          document, address, emergency contact, or full registration details.
        </p>
      </FieldError>

      <div className="mt-6 border-t border-border-soft pt-6">
        <FieldError field="privacyConsent" errors={fieldErrors}>
          <label className="flex gap-3 text-sm leading-6 text-slate-700">
            <input
              name="privacyConsent"
              value="yes"
              type="checkbox"
              required
              aria-invalid={Boolean(fieldErrors.privacyConsent)}
              aria-describedby={errorDescribedBy(
                "privacyConsent",
                fieldErrors,
                "enquiry-privacy-notice",
              )}
              defaultChecked={state.values?.privacyConsent ?? false}
              className="mt-1 size-4 rounded border-border-soft text-brand-blue focus:ring-brand-blue/30"
            />
            <span id="enquiry-privacy-notice">
              I understand this is only an initial enquiry and I should not add
              medical, safeguarding, emergency contact, full registration, or
              document details here.
            </span>
          </label>
        </FieldError>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-border-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-xs leading-5 text-slate-500">
          {enquiryPrivacyNotice} For urgent or direct contact, email{" "}
          <a
            href={`mailto:${contactDetails.email}`}
            className="font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
          >
            {contactDetails.email}
          </a>
          .
        </p>
        <SubmitButton mode={mode} />
      </div>
    </form>
  );
}

function SubmissionNotice({
  state,
}: {
  state: EnquirySubmissionState;
}) {
  if (state.status === "idle") {
    return null;
  }

  const tone =
    state.status === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : state.status === "not-configured"
        ? "border-amber-200 bg-amber-50 text-amber-950"
        : "border-red-200 bg-red-50 text-red-950";

  return (
    <div
      className={`mt-6 rounded-md border px-4 py-3 text-sm leading-6 ${tone}`}
      role={state.status === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      {state.message}
    </div>
  );
}

function FieldError({
  field,
  errors,
  children,
  className,
}: {
  field: EnquiryField;
  errors: Partial<Record<EnquiryField, string>>;
  children: ReactNode;
  className?: string;
}) {
  const error = errors[field];

  return (
    <div className={className}>
      {children}
      {error ? (
        <p
          id={fieldErrorId(field)}
          className="mt-2 text-sm font-medium text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function fieldErrorId(field: EnquiryField) {
  return `enquiry-${field}-error`;
}

function errorDescribedBy(
  field: EnquiryField,
  errors: Partial<Record<EnquiryField, string>>,
  existingId?: string,
) {
  return [existingId, errors[field] ? fieldErrorId(field) : undefined]
    .filter(Boolean)
    .join(" ") || undefined;
}

function SubmitButton({
  mode,
}: {
  mode: NonNullable<EnquiryFormProps["mode"]>;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {pending
        ? mode === "live"
          ? "Submitting..."
          : "Checking..."
        : mode === "live"
          ? "Submit initial enquiry"
          : "Check enquiry details"}
    </button>
  );
}

function fieldClassName(hasError: boolean) {
  return [
    "mt-2 w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2",
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-red-500/15"
      : "border-border-soft focus:border-brand-blue focus:ring-brand-blue/15",
  ].join(" ");
}
