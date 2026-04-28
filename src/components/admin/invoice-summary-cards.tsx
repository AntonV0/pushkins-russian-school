import {
  formatCurrencyFromPence,
  invoiceSummary,
  sampleInvoices,
} from "@/data/invoices";

const summaryCards = [
  {
    label: "Sample invoices",
    value: invoiceSummary.totalInvoices.toString(),
    detail: "Demo records only",
  },
  {
    label: "Outstanding balance",
    value: formatCurrencyFromPence(invoiceSummary.totalOutstandingPence),
    detail: "Calculated from sample balances",
  },
  {
    label: "Manual routes",
    value: invoiceSummary.manualPaymentCount.toString(),
    detail: "Cash, transfer, voucher, or other",
  },
  {
    label: "Online-ready routes",
    value: invoiceSummary.onlineReadyCount.toString(),
    detail: "Stripe-ready placeholders",
  },
];

export function InvoiceSummaryCards() {
  return (
    <section
      aria-label="Invoice summary"
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
    >
      {summaryCards.map((card) => (
        <div
          key={card.label}
          className="border border-border-soft bg-surface p-5 shadow-sm"
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
