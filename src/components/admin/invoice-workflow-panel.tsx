import {
  invoicePaymentMethodMeta,
  invoiceReferenceGuidance,
  invoiceWorkflowNotes,
} from "@/data/invoices";
import { hostedPaymentReadinessItems } from "@/data/payment-providers";

const workflowColumns = [
  {
    title: "Draft",
    detail:
      "Prepare line items, confirm school branch, and keep the record internal.",
  },
  {
    title: "Send",
    detail:
      "Share an approved invoice reference and parent-facing payment route.",
  },
  {
    title: "Reconcile",
    detail:
      "Match bank, cash, voucher, or hosted provider evidence to the reference.",
  },
  {
    title: "Close",
    detail:
      "Mark paid, void, or follow-up only after an auditable admin decision.",
  },
];

const futureActions = [
  "New invoice",
  "Edit draft",
  "Record payment",
  "Generate PDF",
  "Create hosted link",
  "Send follow-up",
];

export function InvoiceWorkflowPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="border border-border-soft bg-surface p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
          Admin controls
        </p>
        <h2 className="mt-3 text-xl font-semibold text-brand-blue-strong">
          Non-operational by design
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Authentication and admin roles are not connected yet, so this page is
          a non-operational planning surface. It should not be used for live
          invoices until access control, storage, and audit logging are agreed.
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {futureActions.map((action) => (
            <button
              key={action}
              type="button"
              disabled
              className="cursor-not-allowed rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-400"
            >
              {action}
            </button>
          ))}
        </div>
        <dl className="mt-6 grid gap-2 border-t border-border-soft pt-5">
          {hostedPaymentReadinessItems.map((item) => (
            <div
              key={item.label}
              className="grid gap-1 text-sm sm:grid-cols-[9rem_1fr]"
            >
              <dt className="font-semibold text-brand-blue-strong">
                {item.label}
              </dt>
              <dd className="text-slate-600">
                <span className="font-semibold text-slate-700">
                  {item.status}
                </span>
                <span className="block text-xs leading-5 text-slate-500">
                  {item.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border border-border-soft bg-surface p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
          Payment method clarity
        </p>
        <h2 className="mt-3 text-xl font-semibold text-brand-blue-strong">
          Manual now, hosted later
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Each route separates what the school can reconcile manually from what
          will need a future provider record. The UI stores labels and sample
          states only.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {Object.entries(invoicePaymentMethodMeta).map(([method, meta]) => (
            <div
              key={method}
              className="border-l border-brand-gold bg-background px-4 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-brand-blue-strong">
                  {meta.label}
                </p>
                <span className="rounded-full border border-border-soft px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {meta.online
                    ? "Hosted"
                    : meta.manual
                      ? "Manual"
                      : "Unset"}
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {meta.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-border-soft bg-surface p-6 shadow-sm lg:col-span-2">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
              Invoice references
            </p>
            <h2 className="mt-3 text-xl font-semibold text-brand-blue-strong">
              {invoiceReferenceGuidance.example}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {invoiceReferenceGuidance.summary}
            </p>
            <p className="mt-3 border-l-4 border-brand-red bg-background px-4 py-3 text-sm leading-6 text-slate-700">
              {invoiceReferenceGuidance.parentInstruction}
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {workflowColumns.map((item) => (
              <div
                key={item.title}
                className="border border-border-soft bg-background p-4"
              >
                <p className="font-semibold text-brand-blue-strong">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
          <ul className="grid gap-3 md:grid-cols-2 lg:col-span-2">
            {invoiceWorkflowNotes.map((note) => (
              <li
                key={note}
                className="border-l border-brand-gold bg-background px-4 py-3 text-sm leading-6 text-slate-700"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
