export type RegistrationSectionKey =
  | "family-parent-details"
  | "child-details"
  | "emergency-contacts"
  | "medical-health-notes"
  | "safeguarding-operational-consents"
  | "photo-media-consent"
  | "collection-permissions"
  | "class-placement-learning-needs"
  | "attendance-timetable-branch"
  | "registration-review-acceptance";

export type RegistrationSectionStatus =
  | "not-started"
  | "parent-draft"
  | "parent-complete"
  | "staff-review"
  | "blocked";

export type RegistrationSectionSensitivity =
  | "standard-personal-data"
  | "special-category-pending"
  | "safeguarding-operational"
  | "staff-only";

export type RegistrationInvitationStatus =
  | "draft"
  | "ready-to-send"
  | "sent"
  | "opened"
  | "submitted"
  | "expired"
  | "revoked";

export type RegistrationReviewState =
  | "draft"
  | "invited"
  | "submitted"
  | "needs-parent-update"
  | "under-review"
  | "accepted"
  | "withdrawn"
  | "archived";

export type RegistrationConsentCategory =
  | "school-rules"
  | "first-aid"
  | "emergency-services"
  | "safeguarding-policy"
  | "privacy-notice"
  | "operational-communication"
  | "teacher-admin-sharing"
  | "media-internal-records"
  | "media-private-community"
  | "media-public-website"
  | "media-social-media"
  | "media-print"
  | "collection-permissions";

export type RegistrationTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type RegistrationSectionMeta = {
  key: RegistrationSectionKey;
  title: string;
  purpose: string;
  sensitivity: RegistrationSectionSensitivity;
  collectNow: boolean;
  parentFacing: boolean;
  fieldsToModelLater: string[];
};

export type RegistrationConsentMeta = {
  category: RegistrationConsentCategory;
  label: string;
  scope: "family" | "child" | "staff-review";
  versioned: boolean;
  notes: string;
};

export type RegistrationPrototypeSection = {
  sectionKey: RegistrationSectionKey;
  status: RegistrationSectionStatus;
  adminNote: string;
};

export type RegistrationPrototypeRecord = {
  id: string;
  reference: string;
  familyLabel: string;
  invitedEmailLabel: string;
  childrenLabel: string;
  childCount: number;
  preferredBranchLabel: string;
  invitationStatus: RegistrationInvitationStatus;
  reviewState: RegistrationReviewState;
  createdAt: string;
  expiresAt: string;
  lastActivity: string;
  nextAction: string;
  sections: RegistrationPrototypeSection[];
  prototypeOnlyNotes: string[];
};

export const registrationInvitationStatusMeta: Record<
  RegistrationInvitationStatus,
  { label: string; description: string; tone: RegistrationTone }
> = {
  draft: {
    label: "Draft",
    description: "Invitation has not been prepared for a parent.",
    tone: "neutral",
  },
  "ready-to-send": {
    label: "Ready to send",
    description: "Static placeholder for a reviewed invitation.",
    tone: "info",
  },
  sent: {
    label: "Sent",
    description: "Prototype state for an invitation shared with a parent.",
    tone: "info",
  },
  opened: {
    label: "Opened",
    description: "Parent has reached the invitation shell in the model.",
    tone: "warning",
  },
  submitted: {
    label: "Submitted",
    description: "Parent submission would be ready for staff review.",
    tone: "success",
  },
  expired: {
    label: "Expired",
    description: "Invitation should no longer allow registration access.",
    tone: "danger",
  },
  revoked: {
    label: "Revoked",
    description: "Admin has intentionally withdrawn the invitation.",
    tone: "danger",
  },
};

export const registrationReviewStateMeta: Record<
  RegistrationReviewState,
  { label: string; description: string; tone: RegistrationTone }
> = {
  draft: {
    label: "Draft",
    description: "Admin is preparing the invitation internally.",
    tone: "neutral",
  },
  invited: {
    label: "Invited",
    description: "Family has been invited to complete onboarding.",
    tone: "info",
  },
  submitted: {
    label: "Submitted",
    description: "Parent submission is waiting for initial triage.",
    tone: "warning",
  },
  "needs-parent-update": {
    label: "Needs parent update",
    description: "Admin would ask the parent to correct or complete sections.",
    tone: "warning",
  },
  "under-review": {
    label: "Under review",
    description: "Admin or teacher review is in progress.",
    tone: "info",
  },
  accepted: {
    label: "Accepted",
    description: "Registration has been accepted after staff checks.",
    tone: "success",
  },
  withdrawn: {
    label: "Withdrawn",
    description: "Family or school has stopped the registration.",
    tone: "neutral",
  },
  archived: {
    label: "Archived",
    description: "Record is retained only according to final retention rules.",
    tone: "neutral",
  },
};

export const registrationSections: RegistrationSectionMeta[] = [
  {
    key: "family-parent-details",
    title: "Family and parent details",
    purpose:
      "Confirm the joining family record and preferred parent contact route.",
    sensitivity: "standard-personal-data",
    collectNow: false,
    parentFacing: true,
    fieldsToModelLater: [
      "Parent or carer name",
      "Relationship to child",
      "Email and mobile",
      "Home address",
      "Primary contact preference",
    ],
  },
  {
    key: "child-details",
    title: "Child details",
    purpose:
      "Create one future student record per child for placement and operations.",
    sensitivity: "standard-personal-data",
    collectNow: false,
    parentFacing: true,
    fieldsToModelLater: [
      "Legal and preferred name",
      "Date of birth",
      "Current education stage",
      "Russian ability context",
      "Preferred branch or online option",
    ],
  },
  {
    key: "emergency-contacts",
    title: "Emergency contacts",
    purpose:
      "Identify responsible adults staff can contact if the primary parent is unavailable.",
    sensitivity: "standard-personal-data",
    collectNow: false,
    parentFacing: true,
    fieldsToModelLater: [
      "Emergency contact name",
      "Relationship",
      "Phone number",
      "Collection permission flag",
      "Urgent-contact notes",
    ],
  },
  {
    key: "medical-health-notes",
    title: "Medical and health notes",
    purpose:
      "Capture safety-critical health context only after privacy and access rules are approved.",
    sensitivity: "special-category-pending",
    collectNow: false,
    parentFacing: true,
    fieldsToModelLater: [
      "Medical conditions",
      "Allergies",
      "Medication requirements",
      "Dietary needs",
      "Accessibility or support needs",
    ],
  },
  {
    key: "safeguarding-operational-consents",
    title: "Safeguarding and operational consents",
    purpose:
      "Record granular acknowledgements for safe school operation and policy awareness.",
    sensitivity: "safeguarding-operational",
    collectNow: false,
    parentFacing: true,
    fieldsToModelLater: [
      "School rules acknowledgement",
      "Basic first aid permission",
      "Emergency services permission",
      "Safeguarding policy acknowledgement",
      "Privacy notice acknowledgement",
    ],
  },
  {
    key: "photo-media-consent",
    title: "Photo and media consent",
    purpose:
      "Separate internal, community, public website, social, and print consent choices.",
    sensitivity: "safeguarding-operational",
    collectNow: false,
    parentFacing: true,
    fieldsToModelLater: [
      "Internal records choice",
      "Private community updates choice",
      "Website use choice",
      "Social media use choice",
      "Print use choice",
    ],
  },
  {
    key: "collection-permissions",
    title: "Collection permissions",
    purpose:
      "Model child-specific adults who may collect a pupil after a session.",
    sensitivity: "safeguarding-operational",
    collectNow: false,
    parentFacing: true,
    fieldsToModelLater: [
      "Allowed collector name",
      "Relationship",
      "Phone number",
      "Collection notes",
      "Independent travel permission",
    ],
  },
  {
    key: "class-placement-learning-needs",
    title: "Class placement and learning needs",
    purpose:
      "Keep parent-submitted learning context separate from staff placement decisions.",
    sensitivity: "staff-only",
    collectNow: false,
    parentFacing: false,
    fieldsToModelLater: [
      "Parent learning context",
      "Reading level",
      "Writing level",
      "Teacher placement decision",
      "First weeks review outcome",
    ],
  },
  {
    key: "attendance-timetable-branch",
    title: "Attendance, timetable, and branch operations",
    purpose:
      "Connect accepted students to a branch, session, and attendance process later.",
    sensitivity: "staff-only",
    collectNow: false,
    parentFacing: false,
    fieldsToModelLater: [
      "Branch label",
      "Intended start date",
      "Session label",
      "Class group",
      "Attendance register identifier",
    ],
  },
  {
    key: "registration-review-acceptance",
    title: "Registration review and acceptance",
    purpose:
      "Give admins a review state before class placement, invoicing, and attendance are linked.",
    sensitivity: "staff-only",
    collectNow: false,
    parentFacing: false,
    fieldsToModelLater: [
      "Review outcome",
      "Correction request",
      "Accepted timestamp",
      "Reviewed by",
      "Archive reason",
    ],
  },
];

export const registrationConsentCategories: RegistrationConsentMeta[] = [
  {
    category: "school-rules",
    label: "School rules or code of conduct",
    scope: "family",
    versioned: true,
    notes: "Store the exact wording version acknowledged by the parent.",
  },
  {
    category: "first-aid",
    label: "Basic first aid",
    scope: "child",
    versioned: true,
    notes: "Keep separate from emergency services permission.",
  },
  {
    category: "emergency-services",
    label: "Emergency services contact",
    scope: "child",
    versioned: true,
    notes: "Record as its own operational permission.",
  },
  {
    category: "safeguarding-policy",
    label: "Safeguarding policy acknowledgement",
    scope: "family",
    versioned: true,
    notes: "Link to approved public policy wording once published.",
  },
  {
    category: "privacy-notice",
    label: "Privacy notice acknowledgement",
    scope: "family",
    versioned: true,
    notes: "Do not launch until privacy notice wording is final.",
  },
  {
    category: "operational-communication",
    label: "Operational communication",
    scope: "family",
    versioned: true,
    notes: "Separate necessary school communication from marketing.",
  },
  {
    category: "teacher-admin-sharing",
    label: "Teacher and admin information sharing",
    scope: "staff-review",
    versioned: true,
    notes: "Keep staff access rules explicit before implementation.",
  },
  {
    category: "media-internal-records",
    label: "Internal school records",
    scope: "child",
    versioned: true,
    notes: "Lowest media scope; still child-specific.",
  },
  {
    category: "media-private-community",
    label: "Private parent group or community update",
    scope: "child",
    versioned: true,
    notes: "Separate from public promotional use.",
  },
  {
    category: "media-public-website",
    label: "Public website",
    scope: "child",
    versioned: true,
    notes: "Never assume consent applies to captions or names.",
  },
  {
    category: "media-social-media",
    label: "Social media",
    scope: "child",
    versioned: true,
    notes: "Separate from website and print choices.",
  },
  {
    category: "media-print",
    label: "Printed promotional materials",
    scope: "child",
    versioned: true,
    notes: "Useful for leaflets or event material only after approval.",
  },
  {
    category: "collection-permissions",
    label: "Collection permissions",
    scope: "child",
    versioned: true,
    notes: "Treat as operational permission with easy admin updates.",
  },
];

const baseSectionProgress: RegistrationPrototypeSection[] =
  registrationSections.map((section) => ({
    sectionKey: section.key,
    status:
      section.sensitivity === "staff-only" ? "staff-review" : "not-started",
    adminNote: section.collectNow
      ? "Future live collection candidate."
      : "Prototype metadata only; no live fields.",
  }));

export const sampleRegistrationRecords: RegistrationPrototypeRecord[] = [
  {
    id: "sample-registration-001",
    reference: "REG-2026-0001",
    familyLabel: "Sample Family A",
    invitedEmailLabel: "parent-a@example.invalid",
    childrenLabel: "Two sample children",
    childCount: 2,
    preferredBranchLabel: "High Wycombe",
    invitationStatus: "sent",
    reviewState: "invited",
    createdAt: "2026-04-24",
    expiresAt: "2026-05-08",
    lastActivity: "Static invitation model prepared for staff review.",
    nextAction: "Confirm privacy, retention, and access controls before launch.",
    sections: baseSectionProgress,
    prototypeOnlyNotes: [
      "Sample-only record with no real parent or child data.",
      "Invitation token storage is not implemented.",
      "No medical, safeguarding, or collection details are collected.",
    ],
  },
  {
    id: "sample-registration-002",
    reference: "REG-2026-0002",
    familyLabel: "Sample Family B",
    invitedEmailLabel: "parent-b@example.invalid",
    childrenLabel: "One sample child",
    childCount: 1,
    preferredBranchLabel: "Bracknell",
    invitationStatus: "opened",
    reviewState: "needs-parent-update",
    createdAt: "2026-04-21",
    expiresAt: "2026-05-05",
    lastActivity: "Parent-facing shell viewed in the prototype model.",
    nextAction: "Design correction request wording after access rules are agreed.",
    sections: baseSectionProgress.map((section) =>
      section.sectionKey === "family-parent-details" ||
      section.sectionKey === "child-details"
        ? { ...section, status: "parent-complete" }
        : section.sectionKey === "emergency-contacts"
          ? { ...section, status: "parent-draft" }
          : section,
    ),
    prototypeOnlyNotes: [
      "Progress indicators are static and do not represent real form progress.",
      "Correction workflow is visual only.",
      "No email sending or reminder action is connected.",
    ],
  },
  {
    id: "sample-registration-003",
    reference: "REG-2026-0003",
    familyLabel: "Sample Family C",
    invitedEmailLabel: "parent-c@example.invalid",
    childrenLabel: "One sample child",
    childCount: 1,
    preferredBranchLabel: "Chelmsford online-only interest",
    invitationStatus: "submitted",
    reviewState: "under-review",
    createdAt: "2026-04-18",
    expiresAt: "2026-05-02",
    lastActivity: "Static submission state ready for admin review layout.",
    nextAction: "Separate parent context from staff placement notes.",
    sections: baseSectionProgress.map((section) => {
      const meta = getRegistrationSectionMeta(section.sectionKey);

      return meta?.parentFacing
        ? { ...section, status: "parent-complete" }
        : section;
    }),
    prototypeOnlyNotes: [
      "Submitted state is sample-only.",
      "Staff placement and invoice links are intentionally absent.",
      "Future Supabase tables still need RLS and audit fields.",
    ],
  },
];

export function getRegistrationSectionMeta(key: RegistrationSectionKey) {
  return registrationSections.find((section) => section.key === key);
}

export function getRegistrationById(id: string) {
  return sampleRegistrationRecords.find((record) => record.id === id);
}

export function getRegistrationCompletion(record: RegistrationPrototypeRecord) {
  const parentSections = record.sections.filter((section) => {
    const meta = getRegistrationSectionMeta(section.sectionKey);

    return meta?.parentFacing;
  });
  const completed = parentSections.filter(
    (section) => section.status === "parent-complete",
  ).length;

  return {
    completed,
    total: parentSections.length,
    label: `${completed}/${parentSections.length}`,
  };
}

export function countRegistrationRecordsByReviewState(
  states: RegistrationReviewState[],
) {
  return sampleRegistrationRecords.filter((record) =>
    states.includes(record.reviewState),
  ).length;
}

export const registrationSafetyGuardrails = [
  "This scaffold is static and prototype-only until authentication, privacy, retention, and role-based access are decided.",
  "Do not add live storage, uploads, medical forms, real parent portal auth, or real child and parent data in this milestone.",
  "Future invitation tokens should be hashed server-side, expiring, revocable, and rate-limited.",
  "Consent wording should be granular, child-specific where needed, and versioned before launch.",
];

export const registrationSummary = {
  totalRecords: sampleRegistrationRecords.length,
  invitedCount: countRegistrationRecordsByReviewState(["invited"]),
  correctionCount: countRegistrationRecordsByReviewState([
    "needs-parent-update",
  ]),
  reviewCount: countRegistrationRecordsByReviewState([
    "submitted",
    "under-review",
  ]),
  acceptedCount: countRegistrationRecordsByReviewState(["accepted"]),
  sectionCount: registrationSections.length,
  consentCategoryCount: registrationConsentCategories.length,
};
