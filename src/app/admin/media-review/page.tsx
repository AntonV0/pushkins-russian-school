import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import {
  MediaReviewDashboard,
  type MediaReviewAsset,
} from "@/components/admin/media-review-dashboard";
import { extendedGalleryMediaAssets } from "@/features/gallery/data/extended-gallery-assets";
import { approvedMediaAssets } from "@/features/gallery/data/media-assets";
import mediaSelectionManifest from "@/features/gallery/data/media-selection-manifest.json";
import { wixImportedMediaAssets } from "@/features/gallery/data/wix-imported-media-assets";
import { wixImportedVideoAssets } from "@/features/gallery/data/wix-imported-video-assets";

export const metadata: Metadata = {
  title: "Media Review",
  description:
    "Internal review dashboard for recovered Wix images and videos.",
};

export default function MediaReviewPage() {
  const wixImportedIds = new Set(
    wixImportedMediaAssets.map((asset) => asset.id),
  );
  const selectedReviewKeys = Array.from(
    new Set([
      ...mediaSelectionManifest.hero.map((asset) => asset.id),
      ...Object.values(mediaSelectionManifest.locations).flatMap((assets) =>
        assets.map((asset) => asset.id),
      ),
      ...Object.values(mediaSelectionManifest.gallery).flatMap((assets) =>
        assets.map((asset) => asset.id),
      ),
    ]),
  );
  const excludedVariants = mediaSelectionManifest.excludedVariants.map(
    (asset) => ({
      id: asset.id,
      keptId: asset.exclusion.keptId,
      reason: asset.exclusion.reason,
      variantKey: asset.exclusion.variantKey,
    }),
  );
  const reviewAssets: MediaReviewAsset[] = [
    ...approvedMediaAssets.map((asset) => ({
      ...asset,
      reviewKey: wixImportedIds.has(asset.id)
        ? `wix-import:${asset.id}`
        : `approved-featured:${asset.id}`,
      reviewSource: wixImportedIds.has(asset.id)
        ? ("wix-import" as const)
        : ("approved-featured" as const),
    })),
    ...extendedGalleryMediaAssets.map((asset) => ({
      ...asset,
      reviewKey: `extended-archive:${asset.id}`,
      reviewSource: "extended-archive" as const,
    })),
  ];

  return (
    <main className="bg-background">
      <AdminPageHeader
        eyebrow="Media review"
        title="Recovered Wix media"
        backLink={{ href: "/admin", label: "Back to admin overview" }}
      >
        <p>
          Review the full project media set by branch and category, then choose
          the highest approved use for each image before promoting the strongest
          assets into final page folders.
        </p>
      </AdminPageHeader>
      <MediaReviewDashboard
        assets={reviewAssets}
        videos={wixImportedVideoAssets}
        selectedReviewKeys={selectedReviewKeys}
        excludedVariants={excludedVariants}
      />
    </main>
  );
}
