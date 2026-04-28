import Link from "next/link";
import { getSchoolEnquiryHref } from "@/data/admissions";
import type { School } from "@/data/schools";
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
  if (school.status === "open") {
    return "Ask about places";
  }

  if (school.status === "online") {
    return "Ask about online or future classes";
  }

  return "Register interest";
}

export function SchoolComparisonTable({ schools }: SchoolComparisonTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border-soft bg-surface">
      <div className="border-b border-border-soft bg-white px-5 py-4">
        <p className="text-sm font-semibold text-brand-blue-strong">
          Branch comparison
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Status and schedule notes are shown together so families can separate
          current classes from future-interest routes.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[58rem] text-left text-sm">
          <caption className="sr-only">
            Compare Pushkin&apos;s School branches by status, venue, schedule,
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
                Venue
              </th>
              <th scope="col" className="px-5 py-4">
                Schedule
              </th>
              <th scope="col" className="px-5 py-4">
                Class route
              </th>
              <th scope="col" className="px-5 py-4">
                Next step
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {schools.map((school) => (
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
                </td>
                <td className="px-5 py-5 text-slate-600">
                  <p className="font-semibold text-brand-blue-strong">
                    {school.venueName}
                  </p>
                  <p className="mt-1">
                    {school.address.join(", ")} {school.postcode}
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
                  <p>{school.classGroups[0]}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Through to exam preparation where suitable
                  </p>
                </td>
                <td className="px-5 py-5">
                  <Link
                    href={getSchoolEnquiryHref(school)}
                    className="inline-flex rounded-full border border-brand-blue/20 px-3 py-2 text-xs font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                  >
                    {getNextStepLabel(school)}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
