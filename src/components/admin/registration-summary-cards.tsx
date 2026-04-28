import {
  registrationSummary,
  sampleRegistrationRecords,
} from "@/data/registration";

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
    <section
      aria-label="Registration summary"
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
    >
      {summaryCards.map((card) => (
        <div
          key={card.label}
          className={`border border-l-4 bg-surface p-5 shadow-sm ${card.accent}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
            {card.label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-brand-blue-strong">
            {card.value}
          </p>
          <p className="mt-2 text-sm text-slate-600">{card.detail}</p>
        </div>
      ))}
      <p className="sr-only">
        This admin shell contains {sampleRegistrationRecords.length} sample
        registration records and no real parent, child, medical, or safeguarding
        data.
      </p>
    </section>
  );
}
