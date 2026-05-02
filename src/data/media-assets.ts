import type { School } from "./schools";

export type MediaAssetCategory =
  | "classroom"
  | "event"
  | "creative-work"
  | "performance"
  | "location"
  | "portrait-safe"
  | "illustration";

export type MediaConsentStatus =
  | "approved-for-public-web"
  | "approved-limited-use"
  | "needs-review"
  | "do-not-use";

export type MediaQualityRating = "hero" | "feature" | "archive" | "replace";

export type VisualPlaceholderPage =
  | "home"
  | "about"
  | "curriculum"
  | "admissions"
  | "schools"
  | "gallery";

export type VisualPlaceholderMotif =
  | "language-table"
  | "culture-shelf"
  | "learning-journey"
  | "archive-grid";

export type VisualPlaceholderStatus =
  | "illustration-ready"
  | "photo-pending"
  | "gallery-placeholder";

export type MediaAsset = {
  id: string;
  sourceFilename: string;
  approvedPublicPath: string;
  altText: string;
  caption: string;
  year?: string;
  branchSlug?: School["slug"] | "network" | "online";
  category: MediaAssetCategory;
  consentStatus: MediaConsentStatus;
  qualityRating: MediaQualityRating;
  notes?: string[];
};

export type VisualPlaceholderSlot = {
  id: string;
  page: VisualPlaceholderPage;
  title: string;
  eyebrow: string;
  summary: string;
  motif: VisualPlaceholderMotif;
  status: VisualPlaceholderStatus;
  statusLabel: string;
  futureAssetRole: MediaQualityRating;
  suggestedPrompt: string;
  altTextWhenGenerated: string;
  usageNotes: string[];
};

export type MediaIntakeField = {
  label: string;
  description: string;
  required: boolean;
};

export const approvedMediaAssets: MediaAsset[] = [];

export const visualPlaceholderSlots: VisualPlaceholderSlot[] = [
  {
    id: "about-community-table",
    page: "about",
    title: "Language, culture, and a shared school rhythm",
    eyebrow: "School life",
    summary:
      "A warm editorial slot for the About page while approved classroom photos are selected.",
    motif: "language-table",
    status: "illustration-ready",
    statusLabel: "Artwork prepared while school photos are approved",
    futureAssetRole: "feature",
    suggestedPrompt:
      "Warm editorial illustration of a Russian language learning table with open books, notebooks, pencils, and subtle Cyrillic letter cards; no people, no faces, no school logos, no private documents, natural daylight, refined educational website style.",
    altTextWhenGenerated:
      "Illustration of Russian language books, notebooks, pencils, and Cyrillic letter cards on a learning table.",
    usageNotes: [
      "Use as an illustration or approved non-identifying detail photo.",
      "Avoid children, portraits, visible names, school documents, or private archive files.",
      "Keep the visual warm and academic rather than stock-like or promotional.",
    ],
  },
  {
    id: "curriculum-culture-shelf",
    page: "curriculum",
    title: "A curriculum built from reading, speech, and culture",
    eyebrow: "Learning materials",
    summary:
      "A visual pause for curriculum content using books, craft textures, and exam-aware study cues.",
    motif: "culture-shelf",
    status: "illustration-ready",
    statusLabel: "Generic study artwork ready for final illustration",
    futureAssetRole: "feature",
    suggestedPrompt:
      "Warm editorial illustration of Russian language study materials on shelves and a desk: books, grammar notes, folk-pattern paper details, a pencil, and exam revision cards; no people, no faces, no identifiable school materials, refined modern educational website style.",
    altTextWhenGenerated:
      "Illustration of Russian language books, study notes, folk-pattern paper, and revision cards.",
    usageNotes: [
      "Suitable for a generated illustration or approved close-up of learning materials.",
      "Do not include identifiable pupils, staff, names, or branded school artefacts.",
      "Prefer balanced colour and real classroom warmth over decorative filler.",
    ],
  },
  {
    id: "admissions-learning-journey",
    page: "admissions",
    title: "From first enquiry to the right learning option",
    eyebrow: "Parent journey",
    summary:
      "A calm visual for the admissions process, focused on steps and decisions rather than child imagery.",
    motif: "learning-journey",
    status: "illustration-ready",
    statusLabel: "Process artwork ready for final illustration",
    futureAssetRole: "feature",
    suggestedPrompt:
      "Warm editorial illustration of a parent enquiry journey for a Russian language school: simple path markers, calendar card, notebook, pencil, and branch choice cards; no people, no faces, no private forms, no logos, polished educational website style.",
    altTextWhenGenerated:
      "Illustration of an enquiry journey with a calendar card, notebook, pencil, and pathway markers.",
    usageNotes: [
      "Use for admissions and enquiry guidance without implying a confirmed place.",
      "Avoid private forms, bank details, child names, or real parent information.",
      "Keep the tone reassuring, practical, and non-promotional.",
    ],
  },
  {
    id: "gallery-approved-archive",
    page: "gallery",
    title: "Approved archive images will appear soon",
    eyebrow: "Gallery readiness",
    summary:
      "An honest gallery media space that signals future archive depth without using private media.",
    motif: "archive-grid",
    status: "gallery-placeholder",
    statusLabel: "Photos coming after approval",
    futureAssetRole: "archive",
    suggestedPrompt:
      "Warm abstract editorial illustration of empty gallery frames, archive labels, and an approval checklist for a school photo archive; no people, no faces, no real photos, no private documents, restrained educational website style.",
    altTextWhenGenerated:
      "Illustration of empty gallery frames, archive labels, and an approval checklist.",
    usageNotes: [
      "Keep gallery pages clearly awaiting images until approved media records exist.",
      "Do not use generated images to imitate real school archive photos.",
      "Use only to explain readiness, not as an archive substitute.",
    ],
  },
];

export const mediaAssetCategories: {
  value: MediaAssetCategory;
  label: string;
  guidance: string;
}[] = [
  {
    value: "classroom",
    label: "Classroom",
    guidance: "Lessons, reading, writing, small-group work, and teacher-led activities.",
  },
  {
    value: "event",
    label: "Event",
    guidance: "Celebrations, assemblies, award moments, and community gatherings.",
  },
  {
    value: "creative-work",
    label: "Creative work",
    guidance: "Crafts, displays, notebooks, projects, and child-safe detail images.",
  },
  {
    value: "performance",
    label: "Performance",
    guidance: "Stage, music, recitals, drama, and cultural celebration images.",
  },
  {
    value: "location",
    label: "Location",
    guidance: "Venue exteriors, classroom spaces, signage, and branch context.",
  },
  {
    value: "portrait-safe",
    label: "Portrait safe",
    guidance: "Approved, current portraits or group images suitable for prominent use.",
  },
  {
    value: "illustration",
    label: "Illustration",
    guidance: "Generated or commissioned visuals approved for use when photos are unavailable.",
  },
];

export const mediaIntakeFields: MediaIntakeField[] = [
  {
    label: "Source filename",
    description:
      "Original local file name used for traceability. Do not publish raw source files directly.",
    required: true,
  },
  {
    label: "Approved public path",
    description:
      "Optimised file path under /public/images/optimised after approval, cropping, and compression.",
    required: true,
  },
  {
    label: "Alt text",
    description:
      "Plain description of the visible scene for accessibility; avoid naming children.",
    required: true,
  },
  {
    label: "Caption",
    description:
      "Short public caption that gives context without exposing private child or family information.",
    required: true,
  },
  {
    label: "Year",
    description: "Archive year or approximate school year when known.",
    required: false,
  },
  {
    label: "Branch",
    description:
      "School branch slug, network-wide label, or online label for future filtering.",
    required: false,
  },
  {
    label: "Category",
    description:
      "Editorial category used to balance the gallery and avoid repetitive image types.",
    required: true,
  },
  {
    label: "Consent status",
    description:
      "Publication decision after checking parent consent, child privacy, and current suitability.",
    required: true,
  },
  {
    label: "Quality rating",
    description:
      "Hero, feature, archive, or replace rating to guide where the image may appear.",
    required: true,
  },
];

export const mediaIngestionSteps = [
  "Place unapproved photo batches outside Git or in ignored local review folders only.",
  "Select candidate images for public use and exclude raw screenshots, private documents, duplicates, and low-quality files.",
  "Confirm consent status, remove names or private context from captions, and avoid prominent use of sensitive images.",
  "Optimise approved images into /public/images/optimised with descriptive, non-private file names.",
  "Add metadata records to src/data/media-assets.ts with alt text, caption, year, branch, category, consent status, and quality rating.",
  "Use hero-rated images sparingly on public landing pages and archive-rated images mainly in gallery year pages.",
];

export const mediaReadinessNotes = [
  "No approved public photos are registered yet.",
  "Current gallery media spaces are intentional and should remain until image approval is complete.",
  "Generated illustrations can support warm editorial pages only when they are generic, non-identifying, and clearly separate from the gallery archive.",
];

export function getApprovedMediaByYear(year: string) {
  return approvedMediaAssets.filter((asset) => asset.year === year);
}

export function getApprovedMediaByBranch(branchSlug: MediaAsset["branchSlug"]) {
  return approvedMediaAssets.filter((asset) => asset.branchSlug === branchSlug);
}

export function getHeroReadyMedia() {
  return approvedMediaAssets.filter(
    (asset) =>
      asset.qualityRating === "hero" &&
      asset.consentStatus === "approved-for-public-web",
  );
}

export function getVisualPlaceholderSlot(id: string) {
  return visualPlaceholderSlots.find((slot) => slot.id === id);
}
