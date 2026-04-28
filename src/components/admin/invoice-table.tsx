import {
  formatCurrencyFromPence,
  getInvoiceBalance,
  getInvoiceNextAction,
  getInvoicePaymentRoute,
  getInvoiceProviderState,
  getInvoiceSchool,
  getInvoiceTotal,
  getInvoiceWorkflowState,
  invoicePaymentMethodMeta,
  invoiceReferenceGuidance,
  sampleInvoices,
} from "@/data/invoices";
import {
  InvoiceStatusBadge,
  PaymentMethodBadge,
} from "./invoice-status-badge";

function formatInvoiceDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

const disabledActions = ["Export", "Filter", "Send reminder"];

export function InvoiceTable() {
  if (sampleInvoices.length === 0) {
    return (
      <section className="border border-dashed border-border-soft bg-surface p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
          Empty register
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
          No invoice records are loaded
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          The live version should show a guarded empty state with clear next
          steps for creating an invoice only after authentication, storage, and
          invoice numbering are approved.
        </p>
      </section>
    );
  }

  return (
    <div className="overflow-hidden border border-border-soft bg-surface shadow-sm">
      <div className="border-b border-border-soft px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-brand-blue-strong">
              Invoice register
            </h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
              Sample-only records showing reference matching, manual
              reconciliation, and future hosted payment readiness. Live storage,
              editing, payment links, and PDF generation are intentionally
              disabled.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {disabledActions.map((action) => (
              <button
                key={action}
                type="button"
                disabled
                className="cursor-not-allowed rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-400"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className="overflow-x-auto focus:outline-none focus:ring-2 focus:ring-brand-red/30"
        tabIndex={0}
        aria-label="Scrollable invoice register table"
      >
        <table className="min-w-[68rem] divide-y divide-border-soft text-left text-sm">
          <thead className="bg-surface-muted text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
            <tr>
              <th scope="col" className="px-5 py-3">
                Invoice
              </th>
              <th scope="col" className="px-5 py-3">
                Family
              </th>
              <th scope="col" className="px-5 py-3">
                Status
              </th>
              <th scope="col" className="px-5 py-3">
                Payment route
              </th>
              <th scope="col" className="px-5 py-3">
                Dates
              </th>
              <th scope="col" className="px-5 py-3 text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {sampleInvoices.map((invoice) => {
              const school = getInvoiceSchool(invoice);
              const total = getInvoiceTotal(invoice);
              const balance = getInvoiceBalance(invoice);
              const paid = total - balance;
              const methodMeta = invoicePaymentMethodMeta[invoice.paymentMethod];
              const nextAction = getInvoiceNextAction(invoice);

              return (
                <tr
                  key={invoice.id}
                  className="align-top transition hover:bg-surface-muted/60"
                >
                  <td className="px-5 py-4">
                    <span className="block font-mono text-xs font-semibold text-brand-blue-strong">
                      {invoice.reference}
                    </span>
                    <span className="mt-2 inline-flex rounded-full border border-brand-blue/15 bg-surface-blue px-2.5 py-1 text-xs font-semibold text-brand-blue-strong">
                      {getInvoiceWorkflowState(invoice)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="block font-semibold text-brand-blue-strong">
                      {invoice.customerLabel}
                    </span>
                    <span className="mt-1 block text-xs text-slate-600">
                      {invoice.studentLabel}
                    </span>
                    <span className="mt-2 block text-xs text-slate-500">
                      {school?.name ?? "School to confirm"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <InvoiceStatusBadge status={invoice.paymentStatus} />
                    <p className="mt-2 max-w-56 text-xs leading-5 text-slate-600">
                      {nextAction}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <PaymentMethodBadge method={invoice.paymentMethod} />
                    <p className="mt-2 text-xs font-semibold text-slate-700">
                      {getInvoicePaymentRoute(invoice)}
                    </p>
                    <p className="mt-1 max-w-60 text-xs leading-5 text-slate-500">
                      {getInvoiceProviderState(invoice)}
                    </p>
                    <p className="mt-2 max-w-60 text-xs leading-5 text-slate-600">
                      {methodMeta.manual
                        ? `Match payment against ${invoice.reference}.`
                        : invoiceReferenceGuidance.parentInstruction}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    <dl className="grid gap-2 text-xs">
                      <div>
                        <dt className="font-semibold text-slate-500">Issued</dt>
                        <dd>{formatInvoiceDate(invoice.issueDate)}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-500">Due</dt>
                        <dd>{formatInvoiceDate(invoice.dueDate)}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-500">
                          Last note
                        </dt>
                        <dd className="max-w-56 leading-5">
                          {invoice.lastActivity}
                        </dd>
                      </div>
                    </dl>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="block font-semibold text-brand-blue-strong">
                      {formatCurrencyFromPence(balance)}
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      balance of {formatCurrencyFromPence(total)}
                    </span>
                    <span className="mt-2 block text-xs text-slate-500">
                      Paid {formatCurrencyFromPence(paid)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border-soft bg-background px-5 py-4 sm:px-6">
        <p className="text-sm font-semibold text-brand-blue-strong">
          Selection state placeholder
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          A live admin build should open a detail pane for the selected invoice,
          showing audit history, line items, reconciliation evidence, and
          disabled-by-default payment actions until authorization is present.
        </p>
      </div>
    </div>
  );
}
