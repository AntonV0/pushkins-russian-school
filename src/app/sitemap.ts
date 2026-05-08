import type { MetadataRoute } from "next";
import { galleryCollections } from "@/data/gallery";
import { approvedMediaAssets } from "@/data/media-assets";
import { primaryNavigation } from "@/data/navigation";
import { policies } from "@/data/policies";
import { publicRoutePriority } from "@/data/seo";
import { schools } from "@/data/schools";
import { absoluteUrl } from "@/data/site";

const staticRoutes = Array.from(new Set([
  "/",
  ...primaryNavigation.map((item) => item.href),
  "/admissions",
  "/faq",
]));
const approvedGalleryCategories = new Set(
  approvedMediaAssets
    .map((asset) => asset.galleryCategorySlug)
    .filter((slug): slug is string => Boolean(slug)),
);
const publicGalleryCollections = galleryCollections.filter((collection) =>
  approvedGalleryCategories.has(collection.slug),
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      changeFrequency: "monthly" as const,
      priority: publicRoutePriority[route] ?? 0.7,
    })),
    ...schools.map((school) => ({
      url: absoluteUrl(`/schools/${school.slug}`),
      changeFrequency: "monthly" as const,
      priority: school.status === "open" ? 0.85 : 0.7,
    })),
    ...policies.map((policy) => ({
      url: absoluteUrl(`/policies/${policy.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.45,
    })),
    ...publicGalleryCollections.map((collection) => ({
      url: absoluteUrl(`/gallery/${collection.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
