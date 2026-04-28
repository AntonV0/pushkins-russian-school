import {
  invoicePaymentMethodMeta,
  invoiceReferenceGuidance,
  invoiceWorkflowNotes,
} from "@/data/invoices";

const futureActions = [
  "Create invoice",
  "Edit selected invoice",
  "Mark cash paid",
  "Record bank transfer",
  "Generate PDF",
  "Create Stripe link",
];

export function InvoiceWorkflowPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="border border-border-soft bg-surface p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
          Access state
        </p>
        <h2 className="mt-3 text-xl font-semibold text-brand-blue-strong">
          Protected admin shell
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
      </section>

      <section className="border border-border-soft bg-surface p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
          Payment routes
        </p>
        <h2 className="mt-3 text-xl font-semibold text-brand-blue-strong">
          Manual now, Stripe-ready later
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {Object.entries(invoicePaymentMethodMeta).map(([method, meta]) => (
            <div
              key={method}
              className="border-l border-brand-gold bg-background px-4 py-3"
            >
              <p className="font-semibold text-brand-blue-strong">
                {meta.label}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {meta.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-border-soft bg-surface p-6 shadow-sm lg:col-span-2">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
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
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
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
