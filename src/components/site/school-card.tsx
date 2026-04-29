import Link from "next/link";
import type { School } from "@/data/schools";
import { getSchoolEnquiryHref } from "@/data/admissions";
import { ButtonLink } from "./button-link";
import { StatusBadge } from "./status-badge";

type SchoolCardProps = {
  school: School;
};

const statusAccent = {
  open: "border-t-4 border-t-emerald-500",
  online: "border-t-4 border-t-sky-500",
  closed: "border-t-4 border-t-zinc-300",
  "opening-soon": "border-t-4 border-t-amber-500",
};

function getNextStepLabel(school: School) {
  if (school.status === "open") {
    return "Ask about current places";
  }

  if (school.status === "online") {
    return "Register interest";
  }

  return "Register interest";
}

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <article
      className={`premium-panel flex h-full flex-col justify-between rounded-lg border border-border-soft bg-surface p-5 transition hover:-translate-y-0.5 hover:border-brand-gold/70 sm:p-6 ${statusAccent[school.status]}`}
    >
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <StatusBadge status={school.status} label={school.statusLabel} />
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {school.county}
          </span>
        </div>
        <div className="mt-5">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">
            {school.area}
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight">
            <Link
              href={`/schools/${school.slug}`}
              className="text-brand-blue-strong transition hover:text-brand-red"
            >
              {school.name}
            </Link>
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {school.statusDescription}
          </p>
        </div>
        <dl className="mt-6 divide-y divide-border-soft/80 border-y border-border-soft/80 text-sm">
          <div className="py-3">
            <dt className="font-semibold text-brand-blue-strong">
              {school.status === "open" ? "Venue" : "Network area"}
            </dt>
            <dd className="mt-1 text-slate-600">{school.venueName}</dd>
          </div>
          <div className="py-3">
            <dt className="font-semibold text-brand-blue-strong">Schedule</dt>
            <dd className="mt-1 text-slate-600">{school.schedule}</dd>
            {school.scheduleNote ? (
              <dd className="mt-1 text-xs leading-5 text-muted">
                {school.scheduleNote}
              </dd>
            ) : null}
          </div>
          <div className="py-3">
            <dt className="font-semibold text-brand-blue-strong">
              {school.status === "open" ? "Address" : "Area"}
            </dt>
            <dd className="mt-1 text-slate-600">
              {school.address.join(", ")}
              {school.postcode ? ` ${school.postcode}` : ""}
            </dd>
          </div>
        </dl>
      </div>
      <ButtonLink
        href={getSchoolEnquiryHref(school)}
        variant="secondary"
        className="mt-7 w-full px-4 py-2 sm:w-fit"
      >
        {getNextStepLabel(school)}
      </ButtonLink>
    </article>
  );
}
