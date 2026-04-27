import Link from "next/link";
import type { School } from "@/data/schools";
import { StatusBadge } from "./status-badge";

type SchoolCardProps = {
  school: School;
};

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-lg border border-border-soft bg-surface p-6 shadow-sm">
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
        </dl>
      </div>
      <Link
        href={`/schools/${school.slug}`}
        className="mt-7 inline-flex items-center justify-center rounded-full border border-brand-blue/20 px-4 py-2 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
      >
        View school page
      </Link>
    </article>
  );
}
