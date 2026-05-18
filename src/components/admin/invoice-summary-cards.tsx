import {
  formatCurrencyFromPence,
  invoiceSummary,
  sampleInvoices,
} from "@/features/admin/data/invoices";
import { AdminSummaryGrid } from "./admin-summary-grid";

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
    <AdminSummaryGrid
      ariaLabel="Invoice summary"
      cards={summaryCards}
      srOnly={
        <>
          This admin shell currently contains {sampleInvoices.length} sample
          invoices and no real parent or student data.
        </>
      }
    />
  );
}
