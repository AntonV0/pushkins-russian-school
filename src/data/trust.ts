import { curriculumPillars } from "./curriculum";
import { policies, policyGroups } from "./policies";
import { networkSummary } from "./schools";

export type TrustSignalKind =
  | "network-scale"
  | "policy-transparency"
  | "curriculum-structure"
  | "years-established"
  | "testimonials"
  | "partnerships"
  | "staff-details"
  | "exam-outcomes";

export type TrustSignalStatus = "publishable" | "pending-review";

export type TrustSignal = {
  id: string;
  kind: TrustSignalKind;
  title: string;
  value: string;
  summary: string;
  status: TrustSignalStatus;
  href?: string;
  evidenceNote: string;
  reviewNote?: string;
};

export const trustSignals: TrustSignal[] = [
  {
    id: "known-school-network",
    kind: "network-scale",
    title: "Visible school network",
    value: `${networkSummary.locations} location pages`,
    summary:
      "Every known branch has a full page with venue, schedule, status wording, enquiry route, and review notes where current details still need confirmation.",
    status: "publishable",
    href: "/schools",
    evidenceNote:
      "Generated from the current school data model and safe to publish because it describes the website structure, not unverified operating status.",
  },
  {
    id: "policy-library",
    kind: "policy-transparency",
    title: "Policy transparency",
    value: `${policyGroups.length} policy groups`,
    summary:
      "Safeguarding, parent, staff, and useful guidance policies are organised with clear publication states before formal PDFs are linked.",
    status: "publishable",
    href: "/policies",
    evidenceNote:
      `Generated from ${policies.length} policy records. Formal school PDFs remain pending until reviewed and approved.`,
  },
  {
    id: "curriculum-pathways",
    kind: "curriculum-structure",
    title: "Structured curriculum",
    value: `${curriculumPillars.length} learning pillars`,
    summary:
      "The public curriculum explains language foundations, literature and culture, placement, and exam preparation without overclaiming class-by-class detail.",
    status: "publishable",
    href: "/curriculum",
    evidenceNote:
      "Built from reviewed high-level curriculum scaffolding; detailed schemes and named materials still need headteacher confirmation.",
  },
  {
    id: "founding-year",
    kind: "years-established",
    title: "Years established",
    value: "Opening year to confirm",
    summary:
      "The site is ready to show a strong longevity claim once the founding or first-opening year is verified from business records.",
    status: "pending-review",
    evidenceNote:
      "Local ignored audit notes do not confirm a founding year. They identify old gallery archive routes as early as 2012, but that should not be treated as a founding claim.",
    reviewNote:
      "Confirm the official founding/opening year before publishing 'since' or 'years established' wording.",
  },
  {
    id: "testimonials",
    kind: "testimonials",
    title: "Parent testimonials",
    value: "Awaiting approval",
    summary:
      "Testimonials can add warmth and conversion confidence once the exact wording, names, consent, and attribution style are approved.",
    status: "pending-review",
    evidenceNote:
      "No reviewed testimonial copy is currently available in the public data model.",
    reviewNote:
      "Collect short parent quotes and decide whether names, initials, branch names, or anonymous labels should be used.",
  },
  {
    id: "partnerships",
    kind: "partnerships",
    title: "Partnerships and collaborators",
    value: "Needs current confirmation",
    summary:
      "Historic partner references should only become public trust signals after relationship, permission, and wording checks.",
    status: "pending-review",
    evidenceNote:
      "Ignored audit notes mention historic institutional references, but current relationships and publication permission are not confirmed.",
    reviewNote:
      "Verify each institution, logo permission, and whether the relationship is current before adding partner badges or copy.",
  },
  {
    id: "staff-details",
    kind: "staff-details",
    title: "Staff and leadership",
    value: "Review before publishing",
    summary:
      "Leadership and teacher details can build trust, but named staff information should wait for approval and a consistent privacy approach.",
    status: "pending-review",
    evidenceNote:
      "Current public data avoids unpublished staff details in line with AGENTS.md.",
    reviewNote:
      "Decide which roles, bios, photos, qualifications, and safeguarding responsibilities can be public.",
  },
  {
    id: "exam-outcomes",
    kind: "exam-outcomes",
    title: "Exam outcomes",
    value: "Evidence needed",
    summary:
      "GCSE and A Level success stories would be powerful, but results and outcomes should be supported by verified, anonymised evidence.",
    status: "pending-review",
    evidenceNote:
      "The site can describe exam preparation, but no verified outcome statistics are currently approved for publication.",
    reviewNote:
      "Confirm whether to publish anonymised results, case studies, exam pass rates, or only exam-preparation pathways.",
  },
];

export const publishableTrustSignals = trustSignals.filter(
  (signal) => signal.status === "publishable",
);

export const pendingTrustSignals = trustSignals.filter(
  (signal) => signal.status === "pending-review",
);

export const trustHistoryNotes = [
  "The rebuild is ready to support a 'since' or 'years established' proof point once the official opening year is confirmed.",
  "Historic gallery/archive material found in ignored audit notes should be used only after image, consent, and quality review.",
  "Partnership, certificate, trip, staff, and exam-result claims are modelled as pending proof points rather than public claims.",
];
