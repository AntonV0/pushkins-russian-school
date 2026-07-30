import { curriculumPillars } from "./curriculum";
import { policies, policyGroups } from "./policies";
import { schoolStory } from "./school-story";
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
    value: `${networkSummary.locations} school locations`,
    summary:
      "Pushkin's School has a five-location heritage across England, with current pages explaining in-person, online, and local-interest routes clearly.",
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
      "The public curriculum explains balanced bilingualism, Russian language, literature, culture, performance, and the right route for older learners.",
    status: "publishable",
    href: "/curriculum",
    evidenceNote:
      "Built from high-level curriculum structure; detailed schemes and named materials can be added when they are suitable for families to view.",
  },
  {
    id: "founding-year",
    kind: "years-established",
    title: "Years established",
    value: `Founded in ${schoolStory.foundedYear}`,
    summary:
      "Pushkin's School has supported Russian language, literature, and culture learning for children since 2009.",
    status: "publishable",
    evidenceNote:
      "Founding year approved by the site owner for public use.",
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
    value: "Moscow-linked curriculum",
    summary:
      "The curriculum is described through cooperation with RUDN University, the Pushkin State Institute, and the Scientific Methodical Russian Speech Centre in Moscow.",
    status: "publishable",
    href: "/curriculum",
    evidenceNote:
      "Institutional curriculum wording approved by the site owner for public use. No logos or current formal partner badges are implied.",
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
    title: "Exam route clarity",
    value: "Volna exam pathway",
    summary:
      "Pushkin's School does not teach GCSE or A Level Russian. Families with exam goals are guided towards Volna Online Russian School.",
    status: "publishable",
    href: "/online-lessons",
    evidenceNote:
      "Approved clarification from the site owner; no exam teaching is claimed for Pushkin's School.",
  },
];

export const publishableTrustSignals = trustSignals.filter(
  (signal) => signal.status === "publishable",
);

export const pendingTrustSignals = trustSignals.filter(
  (signal) => signal.status === "needs-review",
);

export const trustHistoryNotes = [
  "Founded in 2009 and five-school network claims are approved for public parent-facing copy.",
  "Historic gallery material should be published only after image, consent, caption, and quality checks.",
  "Staff profiles, testimonials, trips, and outcome statistics can be added later if the school approves exact wording and evidence.",
];
