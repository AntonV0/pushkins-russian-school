export type PolicyGroup = {
  title: string;
  description: string;
  audience: string;
  reassurance: string;
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
  parentGuidance: string;
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

export type PolicySupportLink = {
  label: string;
  href: string;
  description: string;
};

export type PolicyAction =
  | {
      kind: "pdf";
      href: string;
      label: string;
      description: string;
      isExternal: false;
    }
  | {
      kind: "external";
      href: string;
      label: string;
      description: string;
      isExternal: true;
    };

const policyPdfPublicPathPrefix = "/policies/";
const policyPdfExtension = ".pdf";
const unconfirmedMetadataValues = new Set([
  "publication shell",
  "to be confirmed",
]);

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

const parentGuidanceByTitle: Record<string, string> = {
  "Safeguarding Policy":
    "Start here for the school's safeguarding responsibilities, reporting route, and child protection approach.",
  "Health and Safety Policy":
    "Useful when checking how weekend lessons, premises, supervision, and activities are managed safely.",
  "GDPR and Data Protection Policy":
    "Useful when families want to understand how personal information is handled before enrolment or ongoing contact.",
  "Special Educational Needs (SEN) Policy":
    "Useful when a child may need extra learning support or a conversation about classroom adjustments.",
  "Fire Safety and Emergency Evacuation Policy":
    "Useful for understanding emergency planning expectations across school sessions and events.",
  "Prevent Duty Policy Statement":
    "Useful for understanding the school's responsibilities around safeguarding from radicalisation risks.",
  "Allegations Against Staff Policy":
    "Useful for understanding how concerns about adults working with children are escalated and handled.",
  "Safer Recruitment and Selection Policy":
    "Useful for understanding how the school approaches recruitment for adults working with pupils.",
  "Pupil and Parent Code of Conduct":
    "Useful before joining, renewing, or raising questions about respectful behaviour in the school community.",
  "Pupil and Parent Privacy Notice":
    "Useful when families want a plain route to the future formal privacy notice before sharing detailed information.",
  "Complaints Procedure":
    "Useful when parents or carers need a clear, calm route for raising and resolving concerns.",
  "Staff Code of Conduct":
    "Useful for setting professional expectations for adults working with pupils.",
  "Staff Privacy Notice":
    "Useful for explaining staff data handling once the formal notice is reviewed for publication.",
  "Staff Grievance Procedure":
    "Useful for staff-facing governance and internal concern routes once approved for public publication.",
  "Whistleblowing Policy":
    "Useful for understanding how serious public-interest concerns can be raised.",
  "Keeping Children Safe in Education":
    "Useful for checking the official Department for Education safeguarding guidance referenced by schools.",
  "EYFS Statutory Framework":
    "Useful for checking the official early years requirements relevant to younger pupils.",
  "Teachers' Standards":
    "Useful for checking the official professional standards referenced in staff and recruitment guidance.",
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
    parentGuidance: parentGuidanceByTitle[title],
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
    description:
      "Safeguarding, health, emergency planning, and child welfare documents that parents usually look for first.",
    audience: "Families, staff, and safeguarding leads",
    reassurance:
      "Formal school PDFs stay unpublished until reviewed, approved, and connected through the public asset workflow.",
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
    description:
      "Family-facing expectations, privacy, and complaints routes in one practical parent section.",
    audience: "Parents and carers",
    reassurance:
      "These summaries are safe for launch planning; downloadable documents remain gated until final review.",
    policies: createPolicies("Parent and Carer", "Parents and carers", [
      "Pupil and Parent Code of Conduct",
      "Pupil and Parent Privacy Notice",
      "Complaints Procedure",
    ]),
  },
  {
    title: "Staff",
    description:
      "Staff and volunteer governance shells kept visible as structure without publishing unreviewed internal detail.",
    audience: "Staff, volunteers, and leadership",
    reassurance:
      "Internal procedures are represented by public-safe summaries only until a publication decision is made.",
    policies: createPolicies("Staff", "Staff and volunteers", [
      "Staff Code of Conduct",
      "Staff Privacy Notice",
      "Staff Grievance Procedure",
      "Whistleblowing Policy",
    ]),
  },
  {
    title: "Useful Guidance",
    description:
      "Official external guidance links that support policy review and parent confidence.",
    audience: "Reference for families and staff",
    reassurance:
      "External links point to official publication pages rather than copied documents.",
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
  "Reviewed PDF added under public/policies and linked with a /policies/*.pdf path.",
  "Owner, version, and review date confirmed before launch.",
  "Next review date agreed before the download is made public.",
  "Personal, staff, or unpublished operational details removed.",
  "Download link, summary copy, and last-reviewed label connected from this shell.",
];

export const policyIndexNotes = [
  "Policy summaries are public-ready, but formal school PDFs remain pending until reviewed.",
  "Unreviewed policy documents are intentionally not linked from the public site.",
  "External guidance links point to official GOV.UK publication pages that should be checked before launch.",
];

export const policyPublicationStates = [
  {
    label: "Reviewed public document",
    description:
      "A PDF can be linked only after approval, privacy review, metadata checks, and placement under /policies.",
  },
  {
    label: "Publication shell only",
    description:
      "The route and metadata are prepared, but no unreviewed school PDF is published.",
  },
  {
    label: "Official external guidance",
    description:
      "Reference pages link to authoritative GOV.UK publication pages and should be checked before launch.",
  },
];

export const policyAssetConvention = {
  publicFolder: "public/policies",
  publicPathPrefix: policyPdfPublicPathPrefix,
  allowedExtension: policyPdfExtension,
  summary:
    "Only reviewed, approved, public-safe PDFs should be placed in public/policies and linked from policy data.",
};

export const policySupportLinks: PolicySupportLink[] = [
  {
    label: "Ask a policy question",
    href: "/contact#enquiry-form",
    description:
      "Use the enquiry form for parent questions while downloadable documents are being finalised.",
  },
  {
    label: "Compare school routes",
    href: "/schools",
    description:
      "Check branch, timetable, and status information before choosing the most relevant enquiry route.",
  },
];

export function isValidPolicyPdfPath(path?: string) {
  if (!path) {
    return false;
  }

  const normalizedPath = path.trim();

  return (
    normalizedPath === path &&
    normalizedPath.startsWith(policyPdfPublicPathPrefix) &&
    normalizedPath.endsWith(policyPdfExtension) &&
    !normalizedPath.includes("..") &&
    !normalizedPath.includes("//") &&
    !normalizedPath.includes("?") &&
    !normalizedPath.includes("#") &&
    normalizedPath.length > policyPdfPublicPathPrefix.length + policyPdfExtension.length
  );
}

function isConfirmedPolicyMetadataValue(value?: string) {
  const normalizedValue = value?.trim().toLowerCase();

  return Boolean(
    normalizedValue &&
      !unconfirmedMetadataValues.has(normalizedValue) &&
      !normalizedValue.includes("pending"),
  );
}

export function getMissingPolicyPublicationMetadata(policy: Policy) {
  return [
    { label: "owner", value: policy.owner },
    { label: "version", value: policy.version },
    { label: "review date", value: policy.reviewDate },
    { label: "next review date", value: policy.nextReviewDate },
  ]
    .filter((item) => !isConfirmedPolicyMetadataValue(item.value))
    .map((item) => item.label);
}

export function hasReviewedPolicyPublicationMetadata(policy: Policy) {
  return getMissingPolicyPublicationMetadata(policy).length === 0;
}

export function hasReviewedPublicPolicyPdf(policy: Policy) {
  return (
    policy.documentType === "School policy" &&
    policy.publicationStatus === "reviewed-public" &&
    hasReviewedPolicyPublicationMetadata(policy) &&
    isValidPolicyPdfPath(policy.pdfPath)
  );
}

export function getPolicyAction(policy: Policy): PolicyAction | null {
  if (hasReviewedPublicPolicyPdf(policy) && policy.pdfPath) {
    return {
      kind: "pdf",
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
      kind: "external",
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
  if (hasReviewedPublicPolicyPdf(policy)) {
    return "Formal PDF available";
  }

  if (policy.publicationStatus === "reviewed-public") {
    return "PDF metadata needs review";
  }

  if (policy.publicationStatus === "external-current") {
    return "External guidance linked";
  }

  return policy.documentType === "External guidance"
    ? "External link pending"
    : "PDF pending review";
}

export function getPolicyDownloadReadiness(policy: Policy) {
  if (hasReviewedPublicPolicyPdf(policy)) {
    return {
      label: "Download available",
      description:
        "The reviewed public document is connected and ready for families to download.",
    };
  }

  if (policy.publicationStatus === "reviewed-public") {
    const missingMetadata = getMissingPolicyPublicationMetadata(policy);

    if (missingMetadata.length > 0) {
      return {
        label: "Publication metadata needs review",
        description: `This policy is marked reviewed, but ${missingMetadata.join(
          ", ",
        )} must be confirmed before a download button appears.`,
      };
    }

    return {
      label: "PDF metadata needs review",
      description:
        "This policy is marked reviewed, but a valid /policies/*.pdf path is still required before a download button appears.",
    };
  }

  if (policy.publicationStatus === "external-current") {
    return {
      label: "Official guidance linked",
      description:
        "This page sends visitors to the official publication page instead of hosting a local copy.",
    };
  }

  return {
    label: "Download pending review",
    description:
      "The public route is ready, but the file remains unpublished until the approved document workflow is complete.",
  };
}

export function getPolicyBySlug(slug: string) {
  return policies.find((policy) => policy.slug === slug);
}
