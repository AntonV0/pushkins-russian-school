import type { Metadata } from "next";
import Link from "next/link";
import { GoldNote } from "@/components/shared/gold-note";
import { enquiryInboxSummary } from "@/features/enquiries/data";
import {
  formatCurrencyFromPence,
  invoiceSummary,
  sampleInvoices,
} from "@/features/admin/data/invoices";
import { registrationSummary } from "@/features/admin/data/registration";
import { getAdminAccessDecision } from "@/lib/admin/access";

export const metadata: Metadata = {
  title: "Admin Workspace",
  description:
    "Non-operational admin workspace shell for future Pushkin's School operations.",
};

export default async function AdminPage() {
  const access = await getAdminAccessDecision("admin:overview");
  const adminTiles = [
    {
      label: "Invoices",
      value: sampleInvoices.length.toString(),
      detail: "Sample register with disabled operational controls",
      href: "/admin/invoices",
    },
    {
      label: "Outstanding",
      value: formatCurrencyFromPence(invoiceSummary.totalOutstandingPence),
      detail: "Prototype balance across sample records",
      href: "/admin/invoices",
    },
    {
      label: "Follow-up",
      value: invoiceSummary.activeFollowUpCount.toString(),
      detail: "Sent, part-paid, or overdue sample invoices",
      href: "/admin/invoices",
    },
    {
      label: "Enquiries",
      value: enquiryInboxSummary.totalEnquiries.toString(),
      detail: "Sample-only inbox for initial contact triage",
      href: "/admin/enquiries",
    },
    {
      label: "Registrations",
      value: registrationSummary.totalRecords.toString(),
      detail: "Prototype invitation and review queue",
      href: "/admin/registrations",
    },
    {
      label: "Sections",
      value: registrationSummary.sectionCount.toString(),
      detail: "Registration sections modelled for future onboarding",
      href: "/admin/registrations",
    },
  ];
  const adminNotes = [
    access.notice,
    "No real parent, student, enquiry, registration, or invoice data is stored in this shell.",
    "No bank details, payment credentials, or provider API calls are included.",
    "Do not treat this route as secure until real auth is implemented.",
  ];

  return (
    <main className="bg-background">
      <section className="border-b border-border-soft bg-brand-blue-strong py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Admin shell
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold sm:text-5xl">
            Internal tools are planned, not live
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">
            This area is intentionally non-operational until authentication,
            roles, storage, audit logging, and payment provider decisions are
            complete.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "View invoices", href: "/admin/invoices" },
              { label: "View enquiries", href: "/admin/enquiries" },
              { label: "View registrations", href: "/admin/registrations" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="inline-flex rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Return to public site
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-3 xl:grid-cols-6 lg:px-8">
          {adminTiles.map((tile) => (
            <Link
              key={tile.label}
              href={tile.href}
              className="border border-border-soft bg-background p-5 shadow-sm transition hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                {tile.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-brand-blue-strong">
                {tile.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {tile.detail}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3 lg:px-8">
          {adminNotes.map((note) => (
            <GoldNote key={note}>{note}</GoldNote>
          ))}
        </div>
      </section>
    </main>
  );
}
