import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminShellStatusCard } from "@/components/admin/admin-shell-status-card";
import { InvoiceSummaryCards } from "@/components/admin/invoice-summary-cards";
import { InvoiceTable } from "@/components/admin/invoice-table";
import { InvoiceWorkflowPanel } from "@/components/admin/invoice-workflow-panel";
import { invoiceSummary } from "@/features/admin/data/invoices";
import { getAdminAccessDecision } from "@/lib/admin/access";

export const metadata: Metadata = {
  title: "Invoices",
  description:
    "Admin invoice foundation for Pushkin's School payments. Shell only; not connected to live data or payment providers.",
};

export default async function AdminInvoicesPage() {
  const access = await getAdminAccessDecision("admin:invoices");

  return (
    <main className="bg-background">
      <AdminPageHeader
        eyebrow="Admin invoices"
        title="Payment operations foundation"
        status={
          <AdminShellStatusCard
            links={[{ href: "/admin", label: "Admin overview" }]}
          >
            {invoiceSummary.totalInvoices} sample invoices,{" "}
            {invoiceSummary.activeFollowUpCount} active follow-up states, and no
            connected auth, storage, or payment execution. {access.statusLabel}.
          </AdminShellStatusCard>
        }
      >
        A protected admin UI shell for future invoice generation, manual payment
        tracking, and hosted payment links. It contains sample data only and has
        no live actions.
      </AdminPageHeader>

      <section className="py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:px-8">
          <InvoiceSummaryCards />
          <InvoiceTable />
          <InvoiceWorkflowPanel />
        </div>
      </section>
    </main>
  );
}
