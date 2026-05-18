import {
  registrationSummary,
  sampleRegistrationRecords,
} from "@/features/admin/data/registration";
import { AdminSummaryGrid } from "./admin-summary-grid";

const summaryCards = [
  {
    label: "Prototype records",
    value: registrationSummary.totalRecords.toString(),
    detail: "Sample registration records only",
    accent: "border-brand-blue/25",
  },
  {
    label: "Invited",
    value: registrationSummary.invitedCount.toString(),
    detail: "Admin-created invitation state",
    accent: "border-brand-gold/50",
  },
  {
    label: "Needs update",
    value: registrationSummary.correctionCount.toString(),
    detail: "Correction flow placeholder",
    accent: "border-amber-200",
  },
  {
    label: "Review queue",
    value: registrationSummary.reviewCount.toString(),
    detail: "Submitted or under review",
    accent: "border-brand-red/30",
  },
  {
    label: "Sections",
    value: registrationSummary.sectionCount.toString(),
    detail: `${registrationSummary.consentCategoryCount} consent categories`,
    accent: "border-slate-200",
  },
];

export function RegistrationSummaryCards() {
  return (
    <AdminSummaryGrid
      ariaLabel="Registration summary"
      cards={summaryCards}
      srOnly={
        <>
          This admin shell contains {sampleRegistrationRecords.length} sample
          registration records and no real parent, child, medical, or
          safeguarding data.
        </>
      }
    />
  );
}
