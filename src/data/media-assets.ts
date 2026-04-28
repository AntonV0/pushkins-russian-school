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

export type MediaIntakeField = {
  label: string;
  description: string;
  required: boolean;
};

export const approvedMediaAssets: MediaAsset[] = [];

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
      "Optimised file path under /public/images/optimised after review, cropping, and compression.",
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
  "Place unreviewed photo batches outside Git or in ignored local review folders only.",
  "Select candidate images for public use and exclude raw screenshots, private documents, duplicates, and low-quality files.",
  "Confirm consent status, remove names or private context from captions, and avoid prominent use of sensitive images.",
  "Optimise approved images into /public/images/optimised with descriptive, non-private file names.",
  "Add metadata records to src/data/media-assets.ts with alt text, caption, year, branch, category, consent status, and quality rating.",
  "Use hero-rated images sparingly on public landing pages and archive-rated images mainly in gallery year pages.",
];

export const mediaReadinessNotes = [
  "No approved public photos are registered yet.",
  "Current gallery placeholders are intentional and should remain until image review is complete.",
  "Generated illustrations are a future design option, not a substitute for approved school photos unless explicitly chosen.",
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
