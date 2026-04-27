import type { School } from "@/data/schools";
import { ButtonLink } from "./button-link";
import { StatusBadge } from "./status-badge";

type SchoolCardProps = {
  school: School;
};

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-lg border border-border-soft bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <StatusBadge status={school.status} label={school.statusLabel} />
        <div className="mt-5">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">
            {school.county}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-brand-blue-strong">
            {school.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {school.statusDescription}
          </p>
        </div>
        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="font-semibold text-brand-blue-strong">Venue</dt>
            <dd className="mt-1 text-slate-600">{school.venueName}</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-blue-strong">Schedule</dt>
            <dd className="mt-1 text-slate-600">{school.schedule}</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-blue-strong">Address</dt>
            <dd className="mt-1 text-slate-600">
              {school.address.join(", ")} {school.postcode}
            </dd>
          </div>
        </dl>
      </div>
      <ButtonLink
        href={`/schools/${school.slug}`}
        variant="secondary"
        className="mt-7 px-4 py-2"
      >
        View school page
      </ButtonLink>
    </article>
  );
}
