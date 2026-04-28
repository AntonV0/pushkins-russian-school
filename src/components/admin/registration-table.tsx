import Link from "next/link";
import {
  getRegistrationCompletion,
  sampleRegistrationRecords,
} from "@/data/registration";
import {
  RegistrationInvitationBadge,
  RegistrationReviewBadge,
} from "./registration-status-badge";

function formatRegistrationDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

const disabledActions = [
  "Create invitation",
  "Resend link",
  "Request update",
  "Accept",
];

export function RegistrationTable() {
  if (sampleRegistrationRecords.length === 0) {
    return (
      <section className="border border-dashed border-border-soft bg-surface p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
          Empty register
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
          No registration records are loaded
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          A live version should show a guarded empty state only after
          authentication, role-based access, storage, and retention rules are
          agreed.
        </p>
      </section>
    );
  }

  return (
    <div className="overflow-hidden border border-border-soft bg-surface shadow-sm">
      <div className="border-b border-border-soft px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-brand-blue-strong">
              Registration queue
            </h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
              Sample-only invitation and review records. Live parent data,
              medical details, file uploads, email sending, and acceptance
              actions are intentionally absent.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {disabledActions.map((action) => (
              <button
                key={action}
                type="button"
                disabled
                className="cursor-not-allowed rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-400"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className="overflow-x-auto focus:outline-none focus:ring-2 focus:ring-brand-red/30"
        tabIndex={0}
        aria-label="Scrollable registration queue table"
      >
        <table className="min-w-[68rem] divide-y divide-border-soft text-left text-sm">
          <thead className="bg-surface-muted text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
            <tr>
              <th scope="col" className="px-5 py-3">
                Registration
              </th>
              <th scope="col" className="px-5 py-3">
                Family
              </th>
              <th scope="col" className="px-5 py-3">
                Invitation
              </th>
              <th scope="col" className="px-5 py-3">
                Review
              </th>
              <th scope="col" className="px-5 py-3">
                Dates
              </th>
              <th scope="col" className="px-5 py-3">
                Next step
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {sampleRegistrationRecords.map((record) => {
              const completion = getRegistrationCompletion(record);

              return (
                <tr
                  key={record.id}
                  className="align-top transition hover:bg-surface-muted/60"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/registrations/${record.id}`}
                      className="block font-mono text-xs font-semibold text-brand-blue-strong underline decoration-brand-red/30 hover:text-brand-red"
                    >
                      {record.reference}
                    </Link>
                    <span className="mt-2 inline-flex rounded-full border border-brand-blue/15 bg-surface-blue px-2.5 py-1 text-xs font-semibold text-brand-blue-strong">
                      {completion.label} parent sections
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="block font-semibold text-brand-blue-strong">
                      {record.familyLabel}
                    </span>
                    <span className="mt-1 block text-xs text-slate-600">
                      {record.childrenLabel}
                    </span>
                    <span className="mt-2 block text-xs text-slate-500">
                      {record.preferredBranchLabel}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <RegistrationInvitationBadge
                      status={record.invitationStatus}
                    />
                    <p className="mt-2 max-w-56 text-xs leading-5 text-slate-600">
                      Token storage, expiry checks, QR codes, and email sending
                      are not connected.
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <RegistrationReviewBadge state={record.reviewState} />
                    <p className="mt-2 max-w-56 text-xs leading-5 text-slate-600">
                      Review state is sample metadata only.
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    <dl className="grid gap-2 text-xs">
                      <div>
                        <dt className="font-semibold text-slate-500">
                          Created
                        </dt>
                        <dd>{formatRegistrationDate(record.createdAt)}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-500">
                          Expires
                        </dt>
                        <dd>{formatRegistrationDate(record.expiresAt)}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-500">
                          Last activity
                        </dt>
                        <dd className="max-w-56 leading-5">
                          {record.lastActivity}
                        </dd>
                      </div>
                    </dl>
                  </td>
                  <td className="px-5 py-4">
                    <p className="max-w-64 text-sm leading-6 text-slate-700">
                      {record.nextAction}
                    </p>
                    <Link
                      href={`/admin/registrations/${record.id}`}
                      className="mt-3 inline-flex text-xs font-semibold text-brand-blue-strong underline decoration-brand-red/30 hover:text-brand-red"
                    >
                      View static detail
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border-soft bg-background px-5 py-4 sm:px-6">
        <p className="text-sm font-semibold text-brand-blue-strong">
          Prototype boundary
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          A future live queue should re-check admin authorization on the server
          and never rely on this static UI as a security boundary.
        </p>
      </div>
    </div>
  );
}
