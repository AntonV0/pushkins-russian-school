import mediaSelectionManifest from "./media-selection-manifest.json";
import type {
  MediaAsset,
  MediaAssetCategory,
  MediaAssetCollection,
  MediaQualityRating,
} from "./media-assets";

type SelectedLocationDecision = "hero" | "location-page" | "gallery";

type ManifestLocationRecord = {
  id: string;
  mediaAssetId: string;
  decision: SelectedLocationDecision;
  eligibleUses: string[];
  assetPath: string;
  sourceFilename: string;
  sourceRelativePath?: string;
  branchSlug?: string;
  galleryCategorySlug?: string;
  category: string;
  caption: string;
  altText: string;
  width?: number;
  height?: number;
  pixels?: number;
  bytes?: number;
  format?: string;
  variantKey?: string;
};

export type SelectedLocationMediaAsset = MediaAsset & {
  selectionId: string;
  originalMediaAssetId: string;
  selectedDecision: SelectedLocationDecision;
  eligibleUses: string[];
  width?: number;
  height?: number;
  pixels?: number;
  bytes?: number;
  format?: string;
  variantKey?: string;
};

const categoryRank: Record<string, number> = {
  locations: 0,
  "classroom-learning": 1,
  "creative-work": 2,
  performances: 3,
  celebrations: 4,
  "community-archive": 5,
};

const decisionRank: Record<SelectedLocationDecision, number> = {
  hero: 0,
  "location-page": 1,
  gallery: 2,
};

function getSourceCollection(assetPath: string): MediaAssetCollection {
  if (assetPath.startsWith("/images/locations/")) {
    return "location";
  }

  if (assetPath.startsWith("/images/site/")) {
    return "site";
  }

  return "archive";
}

function getQualityRating(
  decision: SelectedLocationDecision,
): MediaQualityRating {
  if (decision === "hero") {
    return "hero";
  }

  if (decision === "location-page") {
    return "feature";
  }

  return "archive";
}

function getSourceRank(asset: SelectedLocationMediaAsset) {
  if (
    asset.branchSlug &&
    asset.approvedPublicPath.startsWith(`/images/locations/${asset.branchSlug}/`)
  ) {
    return 0;
  }

  if (
    asset.branchSlug &&
    asset.approvedPublicPath.includes(`/wix-missing/${asset.branchSlug}/`)
  ) {
    return 1;
  }

  if (asset.sourceCollection === "location") {
    return 2;
  }

  return 3;
}

function toSelectedLocationMediaAsset(
  record: ManifestLocationRecord,
): SelectedLocationMediaAsset {
  return {
    id: record.id,
    selectionId: record.id,
    originalMediaAssetId: record.mediaAssetId,
    sourceFilename: record.sourceFilename,
    sourceRelativePath: record.sourceRelativePath,
    sourceCollection: getSourceCollection(record.assetPath),
    approvedPublicPath: record.assetPath,
    altText: record.altText,
    caption: record.caption,
    branchSlug: record.branchSlug as MediaAsset["branchSlug"],
    galleryCategorySlug: record.galleryCategorySlug,
    category: record.category as MediaAssetCategory,
    consentStatus: "approved-for-public-web",
    qualityRating: getQualityRating(record.decision),
    recommendedUse: record.decision,
    selectedDecision: record.decision,
    eligibleUses: record.eligibleUses,
    width: record.width,
    height: record.height,
    pixels: record.pixels,
    bytes: record.bytes,
    format: record.format,
    variantKey: record.variantKey,
    notes: [
      "Selected by the media review pass for location-page use and deduped through media-selection-manifest.json.",
    ],
  };
}

function sortLocationMedia(assets: SelectedLocationMediaAsset[]) {
  return [...assets].sort((first, second) => {
    const firstCategory = categoryRank[first.galleryCategorySlug ?? ""] ?? 9;
    const secondCategory = categoryRank[second.galleryCategorySlug ?? ""] ?? 9;

    if (firstCategory !== secondCategory) {
      return firstCategory - secondCategory;
    }

    const firstDecision = decisionRank[first.selectedDecision] ?? 9;
    const secondDecision = decisionRank[second.selectedDecision] ?? 9;

    if (firstDecision !== secondDecision) {
      return firstDecision - secondDecision;
    }

    const firstSource = getSourceRank(first);
    const secondSource = getSourceRank(second);

    if (firstSource !== secondSource) {
      return firstSource - secondSource;
    }

    const firstPixels = first.pixels ?? 0;
    const secondPixels = second.pixels ?? 0;

    if (firstPixels !== secondPixels) {
      return secondPixels - firstPixels;
    }

    return first.id.localeCompare(second.id);
  });
}

const selectedLocationEntries = Object.entries(
  mediaSelectionManifest.locations,
) as Array<[string, ManifestLocationRecord[]]>;

const selectedLocationMediaByBranch = Object.fromEntries(
  selectedLocationEntries.map(([branchSlug, records]) => [
    branchSlug,
    sortLocationMedia(records.map(toSelectedLocationMediaAsset)),
  ]),
) as Record<string, SelectedLocationMediaAsset[]>;

export const selectedLocationMediaAssets = selectedLocationEntries.flatMap(
  ([, records]) => records.map(toSelectedLocationMediaAsset),
);

export function getSelectedLocationMediaByBranch(branchSlug: string) {
  return selectedLocationMediaByBranch[branchSlug] ?? [];
}

export function getSelectedLocationMediaCount(branchSlug: string) {
  return getSelectedLocationMediaByBranch(branchSlug).length;
}
