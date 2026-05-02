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
      "A warm, child-safe visual for the everyday materials of Russian language learning.",
    motif: "language-table",
    status: "illustration-ready",
    statusLabel: "Illustration used until a suitable school photo is available",
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
      "Books, writing, cultural work, and study habits sit at the centre of the learning pathway.",
    motif: "culture-shelf",
    status: "illustration-ready",
    statusLabel: "Child-safe study illustration",
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
      "A calm view of the decisions families make before the first conversation with the school.",
    motif: "learning-journey",
    status: "illustration-ready",
    statusLabel: "Simple, privacy-conscious admissions visual",
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
    title: "A careful archive of school life",
    eyebrow: "Gallery readiness",
    summary:
      "Public archive pages are prepared for selected school photos, captions, and year-by-year context.",
    motif: "archive-grid",
    status: "gallery-placeholder",
    statusLabel: "Photos will appear after consent and caption checks",
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
  "Selected public photos will appear after consent and caption checks.",
  "Gallery spaces stay simple until real school images are suitable for publication.",
  "Illustrations support general pages, while gallery archives remain reserved for real school moments.",
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
