import {
  registrationConsentCategories,
  registrationSafetyGuardrails,
  registrationSections,
} from "@/features/admin/data/registration";
import { GoldNote } from "@/components/shared/gold-note";
import { DisabledActionGroup } from "./disabled-action-group";

const readinessItems = [
  ["Auth", "Pending"],
  ["Storage", "Not connected"],
  ["Retention", "Pending"],
  ["Access roles", "Pending"],
  ["Uploads", "Not included"],
];

const futureActions = [
  "New invitation",
  "Send secure link",
  "Extend expiry",
  "Request update",
  "Accept registration",
  "Archive",
];

export function RegistrationWorkflowPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="border border-border-soft bg-surface p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
          Admin controls
        </p>
        <h2 className="mt-3 text-xl font-semibold text-brand-blue-strong">
          Static until privacy decisions are made
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The workflow is modelled for staff review, but every operational
          control is disabled. No secure link generation, parent portal,
          Supabase write, upload, or email action exists in this scaffold.
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <DisabledActionGroup
            actions={futureActions}
            size="md"
            className="contents"
          />
        </div>
        <dl className="mt-6 grid gap-2 border-t border-border-soft pt-5">
          {readinessItems.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <dt className="font-semibold text-brand-blue-strong">{label}</dt>
              <dd className="text-slate-600">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border border-border-soft bg-surface p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
          Consent model
        </p>
        <h2 className="mt-3 text-xl font-semibold text-brand-blue-strong">
          Granular and versioned later
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Consent categories are represented as metadata only. The live
          implementation should store label, wording version, timestamp, scope,
          and parent identity separately for each item.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {registrationConsentCategories.slice(0, 8).map((consent) => (
            <div
              key={consent.category}
              className="border-l border-brand-gold bg-background px-4 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-brand-blue-strong">
                  {consent.label}
                </p>
                <span className="rounded-full border border-border-soft px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {consent.scope}
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {consent.notes}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-border-soft bg-surface p-6 shadow-sm lg:col-span-2">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
              Section map
            </p>
            <h2 className="mt-3 text-xl font-semibold text-brand-blue-strong">
              Parent sections first, staff fields separate
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The model follows the registration plan while keeping sensitive
              collection closed. Staff-only placement, branch, invoice, and
              review fields remain separate from parent-submitted context.
            </p>
            <ul className="mt-5 grid gap-3">
              {registrationSafetyGuardrails.map((note) => (
                <li key={note}>
                  <GoldNote className="bg-background px-4 py-3 shadow-none">
                    {note}
                  </GoldNote>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {registrationSections.map((section) => (
              <div
                key={section.key}
                className="border border-border-soft bg-background p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-brand-blue-strong">
                    {section.title}
                  </p>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {section.parentFacing ? "Parent" : "Staff"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {section.purpose}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-red">
                  {section.sensitivity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
