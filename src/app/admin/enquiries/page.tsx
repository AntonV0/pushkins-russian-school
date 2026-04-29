import type { Metadata } from "next";
import Link from "next/link";
import {
  enquiryInboxSummary,
  enquirySpamProtectionDecision,
  enquiryStatusMeta,
  getSampleEnquiryRouteLabel,
  getSampleEnquiryTypeLabel,
  sampleEnquiries,
  type EnquiryInboxStatus,
} from "@/data/enquiries";

export const metadata: Metadata = {
  title: "Enquiries",
  description:
    "Admin enquiry inbox shell for Pushkin's School operations. Sample records only; not connected to live storage or delivery.",
};

const summaryCards = [
  {
    label: "Sample enquiries",
    value: enquiryInboxSummary.totalEnquiries.toString(),
    detail: "Static records only",
  },
  {
    label: "New",
    value: enquiryInboxSummary.newCount.toString(),
    detail: "Needs first review",
  },
  {
    label: "Registration-ready",
    value: enquiryInboxSummary.registrationReadyCount.toString(),
    detail: "Second-stage invitation only",
  },
];

export default function AdminEnquiriesPage() {
  return (
    <main className="bg-background">
      <section className="border-b border-border-soft bg-surface py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                Admin enquiries
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
                Initial enquiry inbox shell
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                A non-operational planning surface for reviewing lightweight
                contact enquiries before any registration, medical,
                safeguarding, document, or payment details are collected.
              </p>
            </div>
            <div className="grid min-w-64 gap-3 border-l-4 border-brand-gold bg-background p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                Shell status
              </p>
              <p className="text-sm leading-6 text-slate-600">
                {enquiryInboxSummary.totalEnquiries} sample enquiries, no live
                reads, no staff assignment, no email sending, and no stored
                sensitive registration data.
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

      <section className="border-b border-border-soft bg-background py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-3 lg:px-8">
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
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {card.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:px-8">
          <div className="overflow-hidden border border-border-soft bg-surface shadow-sm">
            <div className="border-b border-border-soft px-5 py-4">
              <h2 className="text-xl font-semibold text-brand-blue-strong">
                Sample inbox
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use these records to shape staff triage views only. They are not
                real families and should not be replaced with live data until
                admin authentication, retention, RLS, and audit decisions are
                complete.
              </p>
            </div>
            <div
              className="overflow-x-auto focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              tabIndex={0}
              aria-label="Scrollable sample enquiry inbox table"
            >
              <table className="min-w-[68rem] divide-y divide-border-soft text-left text-sm">
                <caption className="sr-only">
                  Sample enquiry inbox records showing received date, family
                  label, route, enquiry type, status, and next action.
                </caption>
                <thead className="bg-surface-muted text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                  <tr>
                    <th scope="col" className="px-5 py-3">
                      Received
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Family
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Route
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Next action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  {sampleEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="align-top transition hover:bg-surface-muted/60"
                    >
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700">
                        {enquiry.receivedAt}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-brand-blue-strong">
                          {enquiry.parentLabel}
                        </p>
                        <p className="mt-1 text-slate-600">
                          {enquiry.childLabel}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {getSampleEnquiryRouteLabel(enquiry)}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {getSampleEnquiryTypeLabel(enquiry)}
                      </td>
                      <td className="px-5 py-4">
                        <EnquiryStatusBadge status={enquiry.status} />
                      </td>
                      <td className="min-w-72 px-5 py-4">
                        <p className="text-slate-700">{enquiry.nextAction}</p>
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {enquiry.lastActivity}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Do not display medical, safeguarding, full address, document, or emergency contact fields in this inbox.",
              enquirySpamProtectionDecision,
              "Accepted enquiries should move to the approved invitation-based registration workflow, not expand this public form.",
            ].map((note) => (
              <div
                key={note}
                className="border-l border-brand-gold bg-surface px-5 py-4 text-sm leading-6 text-slate-700 shadow-sm"
              >
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function EnquiryStatusBadge({ status }: { status: EnquiryInboxStatus }) {
  const meta = enquiryStatusMeta[status];
  const toneClassName = {
    info: "border-blue-200 bg-blue-50 text-blue-800",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    neutral: "border-slate-200 bg-slate-50 text-slate-700",
  }[meta.tone];

  return (
    <span
      title={meta.description}
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneClassName}`}
    >
      {meta.label}
    </span>
  );
}
