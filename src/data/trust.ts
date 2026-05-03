import { curriculumPillars } from "./curriculum";
import { policies, policyGroups } from "./policies";
import { networkSummary } from "./schools";

export type TrustSignalKind =
  | "location-scale"
  | "policy-transparency"
  | "curriculum-structure"
  | "years-established"
  | "testimonials"
  | "partnerships"
  | "staff-details"
  | "exam-outcomes";

export type TrustSignalStatus = "publishable" | "needs-review";

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
    kind: "location-scale",
    title: "Known school locations",
    value: `${networkSummary.locations} location pages`,
    summary:
      "Every known location has a full page with clear status wording and a practical enquiry path, whether families are asking about a current class or future local interest.",
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
      "Safeguarding, parent, staff, and useful guidance policies are organised so families can see the document structure while formal PDFs are prepared.",
    status: "publishable",
    href: "/policies",
    evidenceNote:
      `Generated from ${policies.length} policy records. Formal school PDFs are linked only after approval.`,
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
      "Built from high-level curriculum structure; detailed schemes and named materials can be added when they are suitable for families to view.",
  },
  {
    id: "founding-year",
    kind: "years-established",
    title: "Years established",
    value: "Opening year to confirm",
    summary:
      "The site is ready to show a strong longevity claim once the founding or first-opening year is verified from business records.",
    status: "needs-review",
    evidenceNote:
      "Historic archive years suggest a long-running school community, but they should not be treated as a founding-year claim.",
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
    status: "needs-review",
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
    status: "needs-review",
    evidenceNote:
      "Historic institutional references need current relationship and publication-permission checks before they become public proof points.",
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
    status: "needs-review",
    evidenceNote:
      "Current public data avoids naming staff until roles, bios, photos, and permissions are confirmed.",
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
    status: "needs-review",
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
  (signal) => signal.status === "needs-review",
);

export const trustHistoryNotes = [
  "A 'since' or 'years established' proof point can be added once the official opening year is confirmed.",
  "Historic gallery material should be published only after image, consent, caption, and quality checks.",
  "Partnership, certificate, trip, staff, and exam-result claims should be added only when the school approves the exact public wording.",
];
