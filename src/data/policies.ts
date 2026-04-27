export type PolicyGroup = {
  title: string;
  policies: Policy[];
};

export type Policy = {
  title: string;
  slug: string;
  group: string;
  documentType: "School policy" | "External guidance";
  summary: string;
  audience: string;
  status: string;
  reviewCadence: string;
};

const policySummaries: Record<string, string> = {
  "Safeguarding Policy":
    "Sets out how the school protects children and responds to safeguarding concerns.",
  "Health and Safety Policy":
    "Explains the school's approach to safe premises, activities, and supervision.",
  "GDPR and Data Protection Policy":
    "Covers responsible handling of personal data for pupils, parents, carers, and staff.",
  "Special Educational Needs (SEN) Policy":
    "Describes how additional learning needs are identified, supported, and reviewed.",
  "Fire Safety and Emergency Evacuation Policy":
    "Outlines emergency evacuation expectations for weekend school settings.",
  "Prevent Duty Policy Statement":
    "Summarises the school's responsibilities under the Prevent duty.",
  "Allegations Against Staff Policy":
    "Sets out the process for responding to concerns or allegations involving staff.",
  "Safer Recruitment and Selection Policy":
    "Explains safer recruitment principles for adults working with children.",
  "Pupil and Parent Code of Conduct":
    "Sets shared expectations for respectful behaviour across the school community.",
  "Pupil and Parent Privacy Notice":
    "Explains what personal information may be collected and how it may be used.",
  "Complaints Procedure":
    "Gives parents and carers a clear route for raising and resolving concerns.",
  "Staff Code of Conduct":
    "Defines professional expectations for staff and volunteers.",
  "Staff Privacy Notice":
    "Explains how staff personal information is handled.",
  "Staff Grievance Procedure":
    "Sets out how staff concerns can be raised and addressed.",
  "Whistleblowing Policy":
    "Provides a route for reporting serious concerns in the public interest.",
  "Keeping Children Safe in Education":
    "External statutory guidance used by schools and safeguarding leads.",
  "EYFS Statutory Framework":
    "External early years guidance relevant to younger pupils.",
  "Teachers' Standards":
    "External professional standards for teaching conduct and practice.",
};

function slugifyPolicy(title: string) {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createPolicies(
  group: string,
  audience: string,
  titles: string[],
  documentType: Policy["documentType"] = "School policy",
): Policy[] {
  return titles.map((title) => ({
    title,
    slug: slugifyPolicy(title),
    group,
    documentType,
    audience,
    summary: policySummaries[title],
    status:
      documentType === "External guidance"
        ? "Pending current external guidance link review"
        : "Pending reviewed document upload",
    reviewCadence:
      documentType === "External guidance"
        ? "Check source guidance before publication"
        : "Confirm owner and review date before publication",
  }));
}

export const policyGroups: PolicyGroup[] = [
  {
    title: "Child Safety and Well-Being",
    policies: createPolicies("Child Safety and Well-Being", "Families and staff", [
      "Safeguarding Policy",
      "Health and Safety Policy",
      "GDPR and Data Protection Policy",
      "Special Educational Needs (SEN) Policy",
      "Fire Safety and Emergency Evacuation Policy",
      "Prevent Duty Policy Statement",
      "Allegations Against Staff Policy",
      "Safer Recruitment and Selection Policy",
    ]),
  },
  {
    title: "Parent and Carer",
    policies: createPolicies("Parent and Carer", "Parents and carers", [
      "Pupil and Parent Code of Conduct",
      "Pupil and Parent Privacy Notice",
      "Complaints Procedure",
    ]),
  },
  {
    title: "Staff",
    policies: createPolicies("Staff", "Staff and volunteers", [
      "Staff Code of Conduct",
      "Staff Privacy Notice",
      "Staff Grievance Procedure",
      "Whistleblowing Policy",
    ]),
  },
  {
    title: "Useful Guidance",
    policies: createPolicies(
      "Useful Guidance",
      "Reference",
      [
        "Keeping Children Safe in Education",
        "EYFS Statutory Framework",
        "Teachers' Standards",
      ],
      "External guidance",
    ),
  },
];

export const policies = policyGroups.flatMap((group) => group.policies);

export const policyPublicationChecklist = [
  "Reviewed PDF or web document added to the approved public asset flow.",
  "Owner, version, and review date confirmed before launch.",
  "Personal, staff, or unpublished operational details removed.",
  "Download link, summary copy, and last-reviewed label connected from this shell.",
];

export const policyIndexNotes = [
  "Policy files will be downloaded or updated in a later content pass.",
  "Unreviewed policy documents are intentionally not linked from the public site.",
  "External guidance links should point to current official sources once verified.",
];

export function getPolicyBySlug(slug: string) {
  return policies.find((policy) => policy.slug === slug);
}
