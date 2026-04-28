import Link from "next/link";
import { getSchoolEnquiryHref } from "@/data/admissions";
import type { School } from "@/data/schools";
import { StatusBadge } from "./status-badge";

type SchoolComparisonTableProps = {
  schools: School[];
};

export function SchoolComparisonTable({ schools }: SchoolComparisonTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border-soft bg-surface">
      <div className="overflow-x-auto">
        <table className="min-w-[52rem] text-left text-sm">
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
                Next step
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {schools.map((school) => (
              <tr key={school.slug} className="align-top">
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
                  {school.schedule}
                  {school.scheduleNote ? (
                    <p className="mt-2 text-xs leading-5 text-muted">
                      {school.scheduleNote}
                    </p>
                  ) : null}
                </td>
                <td className="px-5 py-5">
                  <Link
                    href={getSchoolEnquiryHref(school)}
                    className="font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
                  >
                    {school.status === "open" ? "Enquire" : "Register interest"}
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
