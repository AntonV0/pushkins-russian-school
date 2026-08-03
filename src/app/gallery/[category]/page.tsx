import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Images, MapPin } from "lucide-react";
import {
  AssetReadinessPanel,
  MediaAssetGrid,
} from "@/components/site/asset-readiness";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ButtonLink } from "@/components/site/button-link";
import { JsonLd } from "@/components/site/json-ld";
import {
  galleryCollections,
  galleryReadinessNotes,
  gallerySupportLinks,
  galleryWorkflowStages,
  getGalleryCollection,
} from "@/data/public/gallery";
import {
  mediaReadinessNotes,
} from "@/features/gallery/data/media-assets";
import {
  getSelectedGalleryMediaByCategory,
  getSelectedGalleryMediaGroupsByCategory,
} from "@/features/gallery/data/selected-gallery-media";
import { absoluteUrl, siteConfig } from "@/data/public/site";

type GalleryCategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return galleryCollections.map((collection) => ({
    category: collection.slug,
  }));
}

export async function generateMetadata({
  params,
}: GalleryCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const archive = getGalleryCollection(category);

  if (!archive) {
    return {
      title: "Gallery collection not found",
    };
  }

  const selectedAssets = getSelectedGalleryMediaByCategory(archive.slug);
  const assetCount = selectedAssets.length;
  const description =
    assetCount > 0
      ? `${archive.title} with ${assetCount} Pushkin's School image${
          assetCount === 1 ? "" : "s"
        } and captions.`
      : `${archive.title} for Pushkin's School images and captions.`;

  return {
    title: archive.title,
    description,
    robots:
      selectedAssets.length > 0
        ? undefined
        : {
            index: false,
            follow: true,
          },
    alternates: {
      canonical: `/gallery/${archive.slug}`,
    },
    openGraph: {
      title: `${archive.title} | Pushkin's School Gallery`,
      description,
      url: `/gallery/${archive.slug}`,
      type: "article",
    },
  };
}

export default async function GalleryCategoryPage({
  params,
}: GalleryCategoryPageProps) {
  const { category } = await params;
  const archive = getGalleryCollection(category);

  if (!archive) {
    notFound();
  }

  const selectedAssets = getSelectedGalleryMediaByCategory(archive.slug);
  const { featuredAssets, supportingAssets } =
    getSelectedGalleryMediaGroupsByCategory(archive.slug);
  const assetCount = selectedAssets.length;
  const supportingAssetCount = supportingAssets.length;
  const hasApprovedAssets = assetCount > 0;
  const hasSupportingAssets = supportingAssetCount > 0;
  const assetCountLabel = `${assetCount} ${
    assetCount === 1 ? "school-life image" : "school-life images"
  }`;
  const supportingAssetCountLabel = `${supportingAssetCount} ${
    supportingAssetCount === 1 ? "additional image" : "additional images"
  }`;

  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: archive.title,
    url: absoluteUrl(`/gallery/${archive.slug}`),
    description: archive.summary,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: archive.highlights.map((highlight) => ({
      "@type": "Thing",
      name: highlight,
    })),
    ...(hasApprovedAssets
      ? {
          image: selectedAssets.map((asset) =>
            absoluteUrl(asset.approvedPublicPath),
          ),
        }
      : {}),
  };

  return (
    <main>
      <JsonLd data={galleryJsonLd} />
      <section className="border-b border-border-soft bg-surface/72 py-7 sm:py-[var(--section-y-compact)]">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:gap-8 lg:grid-cols-[1fr_0.78fr] lg:gap-10 lg:px-8">
          <div>
            <Breadcrumbs
              items={[
                { label: "Gallery", href: "/gallery" },
                { label: archive.title },
              ]}
            />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Gallery archive
            </p>
            <h1 className="mt-2 max-w-4xl text-balance break-words text-3xl font-semibold leading-[1.08] text-brand-blue-strong sm:mt-4 sm:text-5xl sm:leading-[1.06]">
              {archive.title}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
              {archive.tone}
            </p>
            <div className="mt-4 flex flex-col gap-1.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-2">
              <span className="inline-flex max-w-full items-center border-l border-brand-accent bg-background px-3 py-1.5 text-sm font-semibold leading-5 text-brand-blue-strong sm:py-2">
                {hasApprovedAssets ? "School-life collection" : archive.readinessLabel}
              </span>
              <span className="inline-flex max-w-full items-center border-l border-border-soft bg-background px-3 py-1.5 text-sm font-semibold leading-5 text-muted sm:py-2">
                {hasApprovedAssets ? assetCountLabel : "School life"}
              </span>
              {hasSupportingAssets ? (
                <span className="hidden max-w-full items-center border-l border-border-soft bg-background px-3 py-2 text-sm font-semibold leading-5 text-muted sm:inline-flex">
                  {supportingAssetCountLabel}
                </span>
              ) : null}
            </div>
          </div>
          <aside className="border-y border-border-soft bg-background py-4 sm:py-8 lg:border-l lg:border-y-0 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red sm:text-sm">
              {archive.theme}
            </p>
            <h2 className="mt-2 text-lg font-semibold leading-snug text-brand-blue-strong sm:mt-3 sm:text-2xl sm:leading-tight">
              {hasApprovedAssets
                ? "Images for family browsing"
                : "School moments for families"}
            </h2>
            <p className="mt-3 border-l border-brand-accent pl-3 text-sm leading-6 text-slate-700 sm:mt-4 sm:pl-4">
              {hasApprovedAssets
                ? "This collection brings together school-life images and captions for families."
                : archive.readinessDetail}
            </p>
            <div className="mt-4 hidden flex-wrap gap-2 sm:flex sm:mt-5">
              {archive.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-semibold text-brand-blue-strong"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-background py-6 sm:py-[var(--section-y-compact)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <section aria-labelledby={`${archive.slug}-selected-gallery`}>
            <div className="mb-4 flex flex-col gap-2 border-b border-border-soft pb-4 sm:mb-6 sm:gap-3 sm:pb-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                  School-life highlights
                </p>
                <h2
                  id={`${archive.slug}-selected-gallery`}
                  className="mt-2 text-2xl font-semibold text-brand-blue-strong"
                >
                  Featured school moments
                </h2>
              </div>
              <p className="hidden max-w-2xl text-sm leading-6 text-slate-600 sm:block">
                These images introduce the collection before the denser gallery
                section below.
              </p>
            </div>
            <MediaAssetGrid
              assets={featuredAssets}
              emptyLabel={`${archive.title} image`}
              emptyDescription="A school image can appear here after consent, alt text, caption, and accessibility checks."
              reviewLabel="School life"
              featureFirst={hasApprovedAssets}
            />
          </section>

          {hasSupportingAssets ? (
            <section
              className="mt-12 border-t border-border-soft pt-8"
              aria-labelledby={`${archive.slug}-supporting-gallery`}
            >
              <div className="mb-5 grid gap-3 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
                <div className="border-l border-brand-accent pl-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                    Gallery
                  </p>
                  <h2
                    id={`${archive.slug}-supporting-gallery`}
                    className="mt-2 text-2xl font-semibold text-brand-blue-strong"
                  >
                    More school-life images
                  </h2>
                </div>
                <p className="max-w-3xl text-sm leading-6 text-slate-600">
                  These images stay in a denser gallery grid so families can
                  browse more moments without making every archive image feel
                  like a hero.
                </p>
              </div>
              <MediaAssetGrid
                assets={supportingAssets}
                variant="compact"
                reviewLabel="Gallery"
              />
            </section>
          ) : null}

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
            <AssetReadinessPanel
              title="Curation standard"
              status={
                hasApprovedAssets
                  ? `${assetCountLabel} are currently live in this collection. ${
                      hasSupportingAssets
                        ? `${supportingAssetCountLabel} are shown in the denser gallery section.`
                        : "Future additions should follow the same consent, caption, crop, and accessibility checks."
                    }`
                  : "Selected photos, captions, and alt text will appear here once they are suitable for public school use."
              }
              notes={
                hasApprovedAssets
                  ? [
                      ...galleryReadinessNotes,
                      "Keep adding images only after suitability and crop checks.",
                      "Avoid near-duplicates so each image adds a distinct school-life detail.",
                      "Use the denser gallery section for useful images that should not become prominent page imagery.",
                    ]
                  : [...archive.expectedContent, ...mediaReadinessNotes]
              }
            />
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink
                href="/gallery"
                variant="secondary"
                icon={<Images className="size-4" />}
              >
                Back to gallery
              </ButtonLink>
              <ButtonLink href="/schools" icon={<MapPin className="size-4" />}>
                Explore schools
              </ButtonLink>
              <span className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-border-soft px-5 py-3 text-center text-sm font-semibold text-muted sm:w-auto">
                School life gallery
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              How this archive is organised
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {hasApprovedAssets
                ? "This collection keeps school photos organised so families can understand the life around the curriculum."
                : "This collection keeps the archive organised while suitable school photos, captions, and accessibility details are prepared."}
            </p>
          </div>
          <ol className="divide-y divide-border-soft border-y border-border-soft bg-background">
            {galleryWorkflowStages.map((stage) => (
              <li
                key={stage.label}
                className="grid gap-4 px-5 py-5 sm:grid-cols-[3rem_1fr]"
              >
                <span className="flex h-10 w-10 items-center justify-center justify-self-start rounded-full border border-brand-accent/50 bg-surface text-sm font-semibold text-brand-blue-strong">
                  <CheckCircle2 aria-hidden="true" className="size-4 text-brand-red" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-brand-blue-strong">
                    {stage.label}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    {stage.description}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Family confidence
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The gallery can feel warm while still protecting child image
              permissions and family privacy.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {galleryReadinessNotes.map((note) => (
              <div
                key={note}
                className="border-l border-brand-accent bg-background px-4 py-3 text-sm leading-6 text-slate-700"
              >
                <span className="flex gap-2">
                  <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                  <span>{note}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-brand-blue-strong site-section-compact text-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:px-8">
          {gallerySupportLinks.map((link) => (
            <ButtonLink
              key={link.href}
              href={link.href}
              variant="light"
              className="h-full items-start text-left"
              icon={<ArrowRight className="size-4" />}
              iconPosition="end"
            >
              {link.label}
            </ButtonLink>
          ))}
        </div>
      </section>
    </main>
  );
}
