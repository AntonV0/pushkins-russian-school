import type { Metadata } from "next";
import Link from "next/link";
import { InvoiceSummaryCards } from "@/components/admin/invoice-summary-cards";
import { InvoiceTable } from "@/components/admin/invoice-table";
import { InvoiceWorkflowPanel } from "@/components/admin/invoice-workflow-panel";
import { invoiceSummary } from "@/data/invoices";

export const metadata: Metadata = {
  title: "Invoices",
  description:
    "Admin invoice foundation for Pushkin's School payments. Shell only; not connected to live data or payment providers.",
};

export default function AdminInvoicesPage() {
  return (
    <main className="bg-background">
      <section className="border-b border-border-soft bg-surface py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                Admin invoices
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
                Payment operations foundation
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                A protected admin UI shell for future invoice generation,
                manual payment tracking, and hosted payment links. It contains
                sample data only and has no live actions.
              </p>
            </div>
            <div className="grid min-w-64 gap-3 border-l-4 border-brand-gold bg-background p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                Shell status
              </p>
              <p className="text-sm leading-6 text-slate-600">
                {invoiceSummary.totalInvoices} sample invoices,{" "}
                {invoiceSummary.activeFollowUpCount} active follow-up states,
                and no connected auth, storage, or payment execution.
              </p>
              <Link
                href="/admin"
                className="text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              >
                Admin overview
              </Link>
            </div>
          </div>
        </div>
      </section>

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
