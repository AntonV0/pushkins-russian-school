import type { MetadataRoute } from "next";
import { galleryArchives } from "@/data/gallery";
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: publicRoutePriority[route] ?? 0.7,
    })),
    ...schools.map((school) => ({
      url: absoluteUrl(`/schools/${school.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: school.status === "open" ? 0.85 : 0.7,
    })),
    ...policies.map((policy) => ({
      url: absoluteUrl(`/policies/${policy.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.45,
    })),
    ...galleryArchives.map((archive) => ({
      url: absoluteUrl(`/gallery/${archive.year}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
