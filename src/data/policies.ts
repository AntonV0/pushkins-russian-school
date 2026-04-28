export type PolicyGroup = {
  title: string;
  policies: Policy[];
};

export type PolicyPublicationStatus =
  | "pending-review"
  | "reviewed-public"
  | "external-current"
  | "external-review-needed";

export type Policy = {
  title: string;
  slug: string;
  group: string;
  owner: string;
  documentType: "School policy" | "External guidance";
  summary: string;
  audience: string;
  publicationStatus: PolicyPublicationStatus;
  status: string;
  statusDescription: string;
  reviewCadence: string;
  reviewDate?: string;
  nextReviewDate?: string;
  version?: string;
  pdfPath?: string;
  externalGuidanceUrl?: string;
  externalGuidanceLabel?: string;
  externalGuidanceLastChecked?: string;
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
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const pendingSchoolPolicyMetadata: Pick<
  Policy,
  "publicationStatus" | "status" | "statusDescription" | "reviewCadence" | "version"
> = {
  publicationStatus: "pending-review",
  status: "Reviewed PDF pending",
  statusDescription:
    "The public summary is ready, but the formal policy PDF will only be linked after the document is reviewed and approved for publication.",
  reviewCadence: "Confirm document owner, version, and review date before launch.",
  version: "Publication shell",
};

const externalGuidanceOverrides: Record<
  string,
  Pick<
    Policy,
    | "externalGuidanceUrl"
    | "externalGuidanceLabel"
    | "externalGuidanceLastChecked"
    | "publicationStatus"
    | "status"
    | "statusDescription"
    | "reviewCadence"
    | "version"
  >
> = {
  "Keeping Children Safe in Education": {
    externalGuidanceUrl:
      "https://www.gov.uk/government/publications/keeping-children-safe-in-education--2",
    externalGuidanceLabel: "Open current GOV.UK guidance",
    externalGuidanceLastChecked: "2026-04-28",
    publicationStatus: "external-current",
    status: "Current external guidance linked",
    statusDescription:
      "This page links to the current Department for Education publication page rather than hosting a local copy.",
    reviewCadence:
      "Check the GOV.UK publication page before each safeguarding review cycle and before launch.",
    version: "GOV.UK publication page",
  },
  "EYFS Statutory Framework": {
    externalGuidanceUrl:
      "https://www.gov.uk/government/publications/early-years-foundation-stage-framework--2",
    externalGuidanceLabel: "Open current GOV.UK framework",
    externalGuidanceLastChecked: "2026-04-28",
    publicationStatus: "external-current",
    status: "Current external guidance linked",
    statusDescription:
      "This page links to the Department for Education EYFS framework page for the current provider guidance.",
    reviewCadence:
      "Check the GOV.UK publication page before referencing early years requirements publicly.",
    version: "GOV.UK publication page",
  },
  "Teachers' Standards": {
    externalGuidanceUrl:
      "https://www.gov.uk/government/publications/teachers-standards",
    externalGuidanceLabel: "Open current GOV.UK standards",
    externalGuidanceLastChecked: "2026-04-28",
    publicationStatus: "external-current",
    status: "Current external guidance linked",
    statusDescription:
      "This page links to the Department for Education Teachers' Standards publication page.",
    reviewCadence:
      "Check the GOV.UK publication page before staff policy or recruitment content is finalized.",
    version: "GOV.UK publication page",
  },
};

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
    owner:
      documentType === "External guidance"
        ? "Department for Education"
        : group,
    documentType,
    audience,
    summary: policySummaries[title],
    ...(documentType === "External guidance"
      ? externalGuidanceOverrides[title] ?? {
          publicationStatus: "external-review-needed" as const,
          status: "External guidance link pending review",
          statusDescription:
            "The guidance source still needs to be checked before a public link is shown.",
          reviewCadence: "Check source guidance before publication.",
          version: "External source pending review",
        }
      : pendingSchoolPolicyMetadata),
    reviewDate: undefined,
    nextReviewDate: undefined,
    pdfPath: undefined,
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
  "Policy summaries are public-ready, but formal school PDFs remain pending until reviewed.",
  "Unreviewed policy documents are intentionally not linked from the public site.",
  "External guidance links point to official GOV.UK publication pages that should be checked before launch.",
];

export function getPolicyAction(policy: Policy) {
  if (policy.pdfPath && policy.publicationStatus === "reviewed-public") {
    return {
      href: policy.pdfPath,
      label: "Download PDF",
      description: "Reviewed public document",
      isExternal: false,
    };
  }

  if (
    policy.externalGuidanceUrl &&
    policy.publicationStatus === "external-current"
  ) {
    return {
      href: policy.externalGuidanceUrl,
      label: policy.externalGuidanceLabel ?? "Open guidance",
      description: "Current external guidance",
      isExternal: true,
    };
  }

  return null;
}

export function getPolicyMetadata(policy: Policy) {
  return [
    { label: "Audience", value: policy.audience },
    { label: "Owner or category", value: policy.owner },
    { label: "Document type", value: policy.documentType },
    { label: "Publication status", value: policy.status },
    { label: "Version", value: policy.version ?? "To be confirmed" },
    { label: "Review date", value: policy.reviewDate ?? "To be confirmed" },
    { label: "Next review", value: policy.nextReviewDate ?? "To be confirmed" },
    ...(policy.externalGuidanceLastChecked
      ? [
          {
            label: "External link checked",
            value: policy.externalGuidanceLastChecked,
          },
        ]
      : []),
  ];
}

export function getPolicyStatusTone(policy: Policy) {
  if (policy.publicationStatus === "reviewed-public") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (policy.publicationStatus === "external-current") {
    return "border-brand-blue/15 bg-brand-blue/5 text-brand-blue-strong";
  }

  return "border-brand-gold/40 bg-brand-gold/10 text-brand-blue-strong";
}

export function getPolicyAvailabilitySummary(policy: Policy) {
  if (policy.publicationStatus === "reviewed-public") {
    return "Formal PDF available";
  }

  if (policy.publicationStatus === "external-current") {
    return "External guidance linked";
  }

  return policy.documentType === "External guidance"
    ? "External link pending"
    : "PDF pending review";
}

export function getPolicyBySlug(slug: string) {
  return policies.find((policy) => policy.slug === slug);
}
