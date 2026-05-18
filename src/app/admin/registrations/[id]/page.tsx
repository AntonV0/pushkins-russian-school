import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminShellStatusCard } from "@/components/admin/admin-shell-status-card";
import { AdminTablePanel } from "@/components/admin/admin-table-panel";
import { GoldNote } from "@/components/shared/gold-note";
import {
  getRegistrationById,
  getRegistrationCompletion,
  getRegistrationSectionMeta,
  sampleRegistrationRecords,
} from "@/features/admin/data/registration";
import {
  RegistrationInvitationBadge,
  RegistrationReviewBadge,
} from "@/components/admin/registration-status-badge";

type AdminRegistrationDetailPageProps = {
  params: Promise<{ id: string }>;
};

function formatRegistrationDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function generateStaticParams() {
  return sampleRegistrationRecords.map((record) => ({ id: record.id }));
}

export async function generateMetadata({
  params,
}: AdminRegistrationDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const record = getRegistrationById(id);

  if (!record) {
    return {
      title: "Registration not found",
    };
  }

  return {
    title: record.reference,
    description:
      "Static admin registration detail shell. Prototype only; not connected to live onboarding data.",
  };
}

export default async function AdminRegistrationDetailPage({
  params,
}: AdminRegistrationDetailPageProps) {
  const { id } = await params;
  const record = getRegistrationById(id);

  if (!record) {
    notFound();
  }

  const completion = getRegistrationCompletion(record);

  return (
    <main className="bg-background">
      <AdminPageHeader
        eyebrow={record.reference}
        title={record.familyLabel}
        backLink={{
          href: "/admin/registrations",
          label: "Back to registration queue",
        }}
        status={
          <AdminShellStatusCard label="Prototype boundary">
            No token lookup, submitted data, medical notes, collection
            permissions, files, or parent portal auth are connected.
          </AdminShellStatusCard>
        }
      >
        <p>
          Static detail shell for reviewing the future registration journey. It
          uses sample labels only and must not be treated as a secure admin
          record.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <RegistrationInvitationBadge status={record.invitationStatus} />
          <RegistrationReviewBadge state={record.reviewState} />
          <span className="inline-flex rounded-full border border-brand-blue/15 bg-surface-blue px-2.5 py-1 text-xs font-semibold text-brand-blue-strong">
            {completion.label} parent sections
          </span>
        </div>
      </AdminPageHeader>

      <section className="py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="border border-border-soft bg-surface p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                Invited contact
              </p>
              <p className="mt-3 font-semibold text-brand-blue-strong">
                {record.invitedEmailLabel}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Invalid example domain; no real email address.
              </p>
            </div>
            <div className="border border-border-soft bg-surface p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                Children
              </p>
              <p className="mt-3 font-semibold text-brand-blue-strong">
                {record.childrenLabel}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {record.childCount} child record placeholder
                {record.childCount === 1 ? "" : "s"}.
              </p>
            </div>
            <div className="border border-border-soft bg-surface p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                Dates
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Created {formatRegistrationDate(record.createdAt)}
              </p>
              <p className="text-sm leading-6 text-slate-700">
                Expires {formatRegistrationDate(record.expiresAt)}
              </p>
            </div>
          </div>

          <AdminTablePanel
            title="Section review map"
            description={
              <p>
                Section status is static sample metadata. It should become live
                only after access controls, retention, and privacy wording are
                approved.
              </p>
            }
            scrollLabel="Section review map"
          >
            <div className="grid gap-0 divide-y divide-border-soft">
              {record.sections.map((section) => {
                const meta = getRegistrationSectionMeta(section.sectionKey);

                return (
                  <div
                    key={section.sectionKey}
                    className="grid gap-4 px-5 py-4 md:grid-cols-[0.42fr_0.18fr_0.4fr] sm:px-6"
                  >
                    <div>
                      <p className="font-semibold text-brand-blue-strong">
                        {meta?.title ?? section.sectionKey}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {meta?.purpose}
                      </p>
                    </div>
                    <div>
                      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        {section.status}
                      </span>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-red">
                        {meta?.sensitivity}
                      </p>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">
                      {section.adminNote}
                    </p>
                  </div>
                );
              })}
            </div>
          </AdminTablePanel>

          <section className="grid gap-4 md:grid-cols-3">
            {record.prototypeOnlyNotes.map((note) => (
              <GoldNote key={note}>{note}</GoldNote>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
