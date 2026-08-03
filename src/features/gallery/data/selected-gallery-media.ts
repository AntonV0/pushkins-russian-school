import mediaSelectionManifest from "./media-selection-manifest.json";
import type {
  MediaAsset,
  MediaAssetCategory,
  MediaAssetCollection,
  MediaQualityRating,
} from "./media-assets";

type SelectedGalleryDecision = "hero" | "location-page" | "gallery";

type ManifestGalleryRecord = {
  id: string;
  mediaAssetId: string;
  decision: SelectedGalleryDecision;
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

export type SelectedGalleryMediaAsset = MediaAsset & {
  selectionId: string;
  originalMediaAssetId: string;
  selectedDecision: SelectedGalleryDecision;
  eligibleUses: string[];
  width?: number;
  height?: number;
  pixels?: number;
  bytes?: number;
  format?: string;
  variantKey?: string;
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
  decision: SelectedGalleryDecision,
): MediaQualityRating {
  if (decision === "hero") {
    return "hero";
  }

  if (decision === "location-page") {
    return "feature";
  }

  return "archive";
}

function toSelectedGalleryMediaAsset(
  record: ManifestGalleryRecord,
): SelectedGalleryMediaAsset {
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
      "Selected by the media review pass and deduped through media-selection-manifest.json.",
    ],
  };
}

const selectedGalleryEntries = Object.entries(
  mediaSelectionManifest.gallery,
) as Array<[string, ManifestGalleryRecord[]]>;

const selectedGalleryMediaByCategory = Object.fromEntries(
  selectedGalleryEntries.map(([categorySlug, records]) => [
    categorySlug,
    records.map(toSelectedGalleryMediaAsset),
  ]),
) as Record<string, SelectedGalleryMediaAsset[]>;

export const selectedGalleryMediaAssets = selectedGalleryEntries.flatMap(
  ([, records]) => records.map(toSelectedGalleryMediaAsset),
);

export function getSelectedGalleryMediaByCategory(galleryCategorySlug: string) {
  return selectedGalleryMediaByCategory[galleryCategorySlug] ?? [];
}

export function getSelectedGalleryMediaGroupsByCategory(
  galleryCategorySlug: string,
) {
  const assets = getSelectedGalleryMediaByCategory(galleryCategorySlug);
  const featuredAssets = assets.filter(
    (asset) => asset.selectedDecision !== "gallery",
  );

  if (featuredAssets.length > 0) {
    return {
      featuredAssets,
      supportingAssets: assets.filter(
        (asset) => asset.selectedDecision === "gallery",
      ),
    };
  }

  return {
    featuredAssets: assets.slice(0, 6),
    supportingAssets: assets.slice(6),
  };
}

export function getSelectedGalleryCategoryCoverAsset(
  galleryCategorySlug: string,
) {
  return getSelectedGalleryMediaByCategory(galleryCategorySlug)[0];
}

export function getSelectedGalleryCategoryAssetCount(
  galleryCategorySlug: string,
) {
  return getSelectedGalleryMediaByCategory(galleryCategorySlug).length;
}

export function getSelectedGalleryAssetCount() {
  return selectedGalleryMediaAssets.length;
}
