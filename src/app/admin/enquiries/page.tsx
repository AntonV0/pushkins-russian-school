import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminShellStatusCard } from "@/components/admin/admin-shell-status-card";
import { AdminSummaryGrid } from "@/components/admin/admin-summary-grid";
import { AdminTablePanel } from "@/components/admin/admin-table-panel";
import { GoldNote } from "@/components/shared/gold-note";
import { ToneBadge, type ToneBadgeTone } from "@/components/shared/tone-badge";
import {
  enquiryInboxSummary,
  enquirySpamProtectionDecision,
  enquiryStatusMeta,
  getSampleEnquiryRouteLabel,
  getSampleEnquiryTypeLabel,
  sampleEnquiries,
  type EnquiryInboxStatus,
} from "@/features/enquiries/data";
import { getAdminAccessDecision } from "@/lib/admin/access";

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

export default async function AdminEnquiriesPage() {
  const access = await getAdminAccessDecision("admin:enquiries");

  return (
    <main className="bg-background">
      <AdminPageHeader
        eyebrow="Admin enquiries"
        title="Initial enquiry inbox shell"
        status={
          <AdminShellStatusCard
            links={[{ href: "/admin", label: "Admin overview" }]}
          >
            {enquiryInboxSummary.totalEnquiries} sample enquiries, no live
            reads, no staff assignment, no email sending, and no stored
            sensitive registration data. {access.statusLabel}.
          </AdminShellStatusCard>
        }
      >
        A non-operational planning surface for reviewing lightweight contact
        enquiries before any registration, medical, safeguarding, document, or
        payment details are collected.
      </AdminPageHeader>

      <section className="border-b border-border-soft bg-background py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdminSummaryGrid
            ariaLabel="Enquiry summary"
            cards={summaryCards}
            columnsClassName="md:grid-cols-3"
          />
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:px-8">
          <AdminTablePanel
            title="Sample inbox"
            description={
              <p>
                Use these records to shape staff triage views only. They are not
                real families and should not be replaced with live data until
                admin authentication, retention, RLS, and audit decisions are
                complete.
              </p>
            }
            scrollLabel="Scrollable sample enquiry inbox table"
            titleClassName="text-xl"
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
          </AdminTablePanel>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Do not display medical, safeguarding, full address, document, or emergency contact fields in this inbox.",
              enquirySpamProtectionDecision,
              "Accepted enquiries should move to the approved invitation-based registration workflow, not expand this public form.",
            ].map((note) => (
              <GoldNote key={note}>{note}</GoldNote>
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
    info: "info",
    warning: "warning",
    success: "success",
    neutral: "neutral",
  }[meta.tone] as ToneBadgeTone;

  return (
    <ToneBadge
      title={meta.description}
      tone={toneClassName}
    >
      {meta.label}
    </ToneBadge>
  );
}
