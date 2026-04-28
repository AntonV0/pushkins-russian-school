import {
  formatCurrencyFromPence,
  invoiceSummary,
  sampleInvoices,
} from "@/data/invoices";

const summaryCards = [
  {
    label: "Register size",
    value: invoiceSummary.totalInvoices.toString(),
    detail: "Sample invoice records only",
    accent: "border-brand-blue/25",
  },
  {
    label: "Outstanding balance",
    value: formatCurrencyFromPence(invoiceSummary.totalOutstandingPence),
    detail: "Calculated from unpaid sample balances",
    accent: "border-brand-red/30",
  },
  {
    label: "Active follow-up",
    value: invoiceSummary.activeFollowUpCount.toString(),
    detail: `${invoiceSummary.overdueCount} overdue, ${invoiceSummary.draftCount} draft`,
    accent: "border-brand-gold/50",
  },
  {
    label: "Payment routes",
    value: `${invoiceSummary.manualPaymentCount}/${invoiceSummary.onlineReadyCount}`,
    detail: "Manual routes / online placeholders",
    accent: "border-brand-blue/25",
  },
  {
    label: "Provider setup",
    value: invoiceSummary.providerSetupCount.toString(),
    detail: "Hosted payment records still absent",
    accent: "border-slate-200",
  },
];

export function InvoiceSummaryCards() {
  return (
    <section
      aria-label="Invoice summary"
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
    >
      {summaryCards.map((card) => (
        <div
          key={card.label}
          className={`border border-l-4 bg-surface p-5 shadow-sm ${card.accent}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
            {card.label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-brand-blue-strong">
            {card.value}
          </p>
          <p className="mt-2 text-sm text-slate-600">{card.detail}</p>
        </div>
      ))}
      <p className="sr-only">
        This admin shell currently contains {sampleInvoices.length} sample
        invoices and no real parent or student data.
      </p>
    </section>
  );
}
