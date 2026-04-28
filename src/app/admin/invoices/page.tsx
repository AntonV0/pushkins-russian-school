import type { Metadata } from "next";
import Link from "next/link";
import { InvoiceSummaryCards } from "@/components/admin/invoice-summary-cards";
import { InvoiceTable } from "@/components/admin/invoice-table";
import { InvoiceWorkflowPanel } from "@/components/admin/invoice-workflow-panel";

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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                Admin invoices
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
                Payment operations foundation
              </h1>
            </div>
            <Link
              href="/admin"
              className="inline-flex rounded-full border border-brand-blue/20 px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              Admin overview
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            A protected admin UI shell for future invoice generation, manual
            payment tracking, and Stripe-hosted payment links. It contains
            sample data only and has no live actions.
          </p>
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
