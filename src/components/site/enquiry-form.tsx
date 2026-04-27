"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import {
  childAgeOptions,
  enquiryTypes,
  russianLevelOptions,
} from "@/data/admissions";
import { contactDetails } from "@/data/contact";
import { schools } from "@/data/schools";

type EnquiryFormProps = {
  selectedSchool?: string;
  selectedIntent?: string;
};

type FormState = {
  parentName: string;
  email: string;
  school: string;
  enquiryType: string;
  childAge: string;
  russianLevel: string;
  message: string;
};

export function EnquiryForm({
  selectedSchool,
  selectedIntent,
}: EnquiryFormProps) {
  const [formState, setFormState] = useState<FormState>({
    parentName: "",
    email: "",
    school: selectedSchool ?? "",
    enquiryType: selectedIntent ?? "general",
    childAge: "",
    russianLevel: "",
    message: "",
  });

  const selectedSchoolName = useMemo(
    () =>
      schools.find((school) => school.slug === formState.school)?.name ??
      "Not selected",
    [formState.school],
  );

  const selectedEnquiryLabel = useMemo(
    () =>
      enquiryTypes.find((type) => type.value === formState.enquiryType)?.label ??
      "General enquiry",
    [formState.enquiryType],
  );

  const emailDraftHref = useMemo(() => {
    const subject = `Pushkin's School enquiry: ${selectedSchoolName}`;
    const body = [
      "Hello Pushkin's School,",
      "",
      "I would like to enquire about classes.",
      "",
      `Parent or carer name: ${formState.parentName || "Not provided"}`,
      `Email address: ${formState.email || "Not provided"}`,
      `Preferred branch: ${selectedSchoolName}`,
      `Enquiry type: ${selectedEnquiryLabel}`,
      `Child age or stage: ${formState.childAge || "Not provided"}`,
      `Current Russian level: ${formState.russianLevel || "Not provided"}`,
      "",
      "Message:",
      formState.message || "Not provided",
      "",
      "Thank you.",
    ].join("\n");

    return `mailto:${contactDetails.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }, [formState, selectedEnquiryLabel, selectedSchoolName]);

  function updateField(field: keyof FormState, value: string) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = emailDraftHref;
  }

  return (
    <form
      id="enquiry-form"
      onSubmit={handleSubmit}
      className="rounded-lg border border-border-soft bg-surface p-6 shadow-sm sm:p-8"
      aria-describedby="enquiry-form-status"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
          Enquiry form
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-brand-blue-strong">
          Tell us what you are looking for
        </h2>
        <p
          id="enquiry-form-status"
          className="mt-3 text-sm leading-6 text-slate-600"
        >
          Complete the fields to prepare a structured email draft. A direct
          backend submission can be connected once the public contact workflow is
          confirmed.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div>
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
            value={formState.parentName}
            onChange={(event) => updateField("parentName", event.target.value)}
            className="mt-2 w-full rounded-md border border-border-soft bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
          />
        </div>

        <div>
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
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="mt-2 w-full rounded-md border border-border-soft bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
          />
        </div>

        <div>
          <label
            htmlFor="school"
            className="text-sm font-semibold text-brand-blue-strong"
          >
            Preferred branch
          </label>
          <select
            id="school"
            name="school"
            value={formState.school}
            onChange={(event) => updateField("school", event.target.value)}
            className="mt-2 w-full rounded-md border border-border-soft bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
          >
            <option value="">Select a branch</option>
            {schools.map((school) => (
              <option key={school.slug} value={school.slug}>
                {school.name} - {school.statusLabel}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="enquiry-type"
            className="text-sm font-semibold text-brand-blue-strong"
          >
            Enquiry type
          </label>
          <select
            id="enquiry-type"
            name="enquiryType"
            value={formState.enquiryType}
            onChange={(event) =>
              updateField("enquiryType", event.target.value)
            }
            className="mt-2 w-full rounded-md border border-border-soft bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
          >
            {enquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="child-age"
            className="text-sm font-semibold text-brand-blue-strong"
          >
            Child age or school stage
          </label>
          <select
            id="child-age"
            name="childAge"
            value={formState.childAge}
            onChange={(event) => updateField("childAge", event.target.value)}
            className="mt-2 w-full rounded-md border border-border-soft bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
          >
            <option value="">Select an age range</option>
            {childAgeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="russian-level"
            className="text-sm font-semibold text-brand-blue-strong"
          >
            Current Russian level
          </label>
          <select
            id="russian-level"
            name="russianLevel"
            value={formState.russianLevel}
            onChange={(event) => updateField("russianLevel", event.target.value)}
            className="mt-2 w-full rounded-md border border-border-soft bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
          >
            <option value="">Select the closest option</option>
            {russianLevelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-brand-blue-strong"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Share any useful context, such as home language exposure, previous lessons, exam goals, siblings, or preferred start date."
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="mt-2 w-full rounded-md border border-border-soft bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-border-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-xs leading-5 text-slate-500">
          This opens your email app with the enquiry details filled in. It does
          not store or send information through the website yet.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
        >
          Open email draft
        </button>
      </div>
    </form>
  );
}
