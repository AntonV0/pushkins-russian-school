import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { getSchoolEnquiryHref } from "@/data/public/admissions";
import type { School } from "@/data/public/schools";
import { StatusBadge } from "./status-badge";

type SchoolComparisonTableProps = {
  schools: School[];
};

const rowTone = {
  open: "bg-white",
  online: "bg-sky-50/45",
  closed: "bg-zinc-50",
  "opening-soon": "bg-amber-50/45",
};

function getNextStepLabel(school: School) {
  return school.bestNextSteps[0]?.ctaLabel ?? "Start an enquiry";
}

function getNextStepHref(school: School) {
  return school.bestNextSteps[0]?.href ?? getSchoolEnquiryHref(school);
}

function getLocationContext(school: School) {
  if (school.status === "open") {
    return "Current in-person branch";
  }

  return "Local interest area";
}

export function SchoolComparisonTable({ schools }: SchoolComparisonTableProps) {
  const orderedSchools = [
    ...schools.filter((school) => school.status === "open"),
    ...schools.filter((school) => school.status !== "open"),
  ];

  return (
    <div className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface">
      <div className="border-b border-border-soft bg-white px-5 py-4">
        <p className="text-sm font-semibold text-brand-blue-strong">
          Parent comparison
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Current provision is listed first, followed by register-interest and
          online areas. Use the first action when you already know which route
          fits your family.
        </p>
      </div>
      <div className="grid gap-3 p-4 md:hidden">
        {orderedSchools.map((school) => (
          <article
            key={school.slug}
            className={`rounded-lg border border-border-soft p-4 ${rowTone[school.status]}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Link
                  href={`/schools/${school.slug}`}
                  className="text-lg font-semibold text-brand-blue-strong hover:text-brand-red"
                >
                  {school.name}
                </Link>
                <p className="mt-1 text-xs text-muted">{school.county}</p>
              </div>
              <StatusBadge status={school.status} label={school.statusLabel} />
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                  <MapPin aria-hidden="true" className="size-4 shrink-0 text-brand-red" />
                  Location
                </dt>
                <dd className="mt-1 leading-6 text-slate-600">
                  {school.venueName}
                  {school.postcode ? `, ${school.postcode}` : ""}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                  <Clock aria-hidden="true" className="size-4 shrink-0 text-brand-red" />
                  Schedule
                </dt>
                <dd className="mt-1 leading-6 text-slate-600">
                  {school.schedule}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {school.availabilitySummary}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href={getNextStepHref(school)}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              >
                {getNextStepLabel(school)}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href={`/schools/${school.slug}`}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-brand-blue/20 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              >
                <MapPin aria-hidden="true" className="size-4" />
                Branch details
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div
        className="hidden overflow-x-auto focus:outline-none focus:ring-2 focus:ring-brand-red/30 md:block"
        tabIndex={0}
        aria-label="Scrollable branch comparison table"
      >
        <table className="min-w-[58rem] text-left text-sm">
          <caption className="sr-only">
            Compare Pushkin&apos;s School branches by status, location, schedule,
            and enquiry action.
          </caption>
          <thead className="bg-surface-muted text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            <tr>
              <th scope="col" className="px-5 py-4">
                Branch
              </th>
              <th scope="col" className="px-5 py-4">
                Status
              </th>
              <th scope="col" className="px-5 py-4">
                Location
              </th>
              <th scope="col" className="px-5 py-4">
                Schedule
              </th>
              <th scope="col" className="px-5 py-4">
                Best for
              </th>
              <th scope="col" className="px-5 py-4">
                Next step
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {orderedSchools.map((school) => (
              <tr key={school.slug} className={`align-top ${rowTone[school.status]}`}>
                <th scope="row" className="px-5 py-5">
                  <Link
                    href={`/schools/${school.slug}`}
                    className="text-base font-semibold text-brand-blue-strong hover:text-brand-red"
                  >
                    {school.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted">{school.county}</p>
                </th>
                <td className="px-5 py-5">
                  <StatusBadge
                    status={school.status}
                    label={school.statusLabel}
                  />
                  {school.status === "open" ? (
                    <p className="mt-2 text-xs font-semibold text-brand-blue-strong">
                      Current weekend places can be discussed by enquiry.
                    </p>
                  ) : null}
                </td>
                <td className="px-5 py-5 text-slate-600">
                  <p className="font-semibold text-brand-blue-strong">
                    {school.venueName}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-red">
                    {getLocationContext(school)}
                  </p>
                  <p className="mt-1">
                    {school.address.join(", ")}
                    {school.postcode ? ` ${school.postcode}` : ""}
                  </p>
                </td>
                <td className="px-5 py-5 text-slate-600">
                  <p>{school.schedule}</p>
                  {school.scheduleNote ? (
                    <p className="mt-2 border-l-2 border-brand-gold pl-3 text-xs leading-5 text-muted">
                      {school.scheduleNote}
                    </p>
                  ) : null}
                </td>
                <td className="px-5 py-5 text-slate-600">
                  <p className="font-medium text-brand-blue-strong">
                    {school.status === "open"
                      ? "Families ready to discuss a current weekend place"
                      : "Families registering future local demand or asking about online learning"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    {school.availabilitySummary}
                  </p>
                </td>
                <td className="px-5 py-5">
                  <Link
                    href={getNextStepHref(school)}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 ${
                      school.status === "open"
                        ? "bg-brand-blue text-white hover:bg-brand-blue-strong focus:ring-brand-blue/30"
                        : "border border-brand-blue/20 bg-white/70 text-brand-blue-strong hover:border-brand-red hover:text-brand-red focus:ring-brand-red/30"
                    }`}
                  >
                    {getNextStepLabel(school)}
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                  {school.status !== "open" ? (
                    <Link
                      href={school.nearbyAlternativeCta.href}
                      className="mt-3 block text-xs font-semibold text-muted underline decoration-brand-red/30 hover:text-brand-red"
                    >
                      {school.nearbyAlternativeCta.label}
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
