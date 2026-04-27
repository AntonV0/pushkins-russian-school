import {
  childAgeOptions,
  enquiryTypes,
  russianLevelOptions,
} from "@/data/admissions";
import { schools } from "@/data/schools";

type EnquiryFormProps = {
  selectedSchool?: string;
  selectedIntent?: string;
};

export function EnquiryForm({
  selectedSchool,
  selectedIntent,
}: EnquiryFormProps) {
  return (
    <form
      id="enquiry-form"
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
          This is a polished form shell. Submission handling will be connected
          once the public contact workflow is confirmed.
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
            defaultValue={selectedSchool ?? ""}
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
            defaultValue={selectedIntent ?? "general"}
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
            defaultValue=""
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
            defaultValue=""
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
          className="mt-2 w-full rounded-md border border-border-soft bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-border-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-xs leading-5 text-slate-500">
          The form is intentionally not submitting yet. This prevents enquiries
          from disappearing before the final inbox, consent, and data handling
          process is confirmed.
        </p>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
        >
          Submission coming soon
        </button>
      </div>
    </form>
  );
}
