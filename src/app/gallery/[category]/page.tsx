import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
} from "@/data/gallery";
import {
  getExtendedGalleryMediaByCategory,
} from "@/data/extended-gallery-assets";
import {
  getApprovedMediaByGalleryCategory,
  mediaReadinessNotes,
} from "@/data/media-assets";
import { absoluteUrl, siteConfig } from "@/data/site";

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

  const approvedAssets = getApprovedMediaByGalleryCategory(archive.slug);
  const assetCount = approvedAssets.length;
  const description =
    assetCount > 0
      ? `${archive.title} with ${assetCount} approved public Pushkin's School image${
          assetCount === 1 ? "" : "s"
        } and captions.`
      : `${archive.title} for selected Pushkin's School public images and captions.`;

  return {
    title: archive.title,
    description,
    robots:
      approvedAssets.length > 0
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

  const approvedAssets = getApprovedMediaByGalleryCategory(archive.slug);
  const extendedAssets = getExtendedGalleryMediaByCategory(archive.slug);
  const assetCount = approvedAssets.length;
  const extendedAssetCount = extendedAssets.length;
  const hasApprovedAssets = assetCount > 0;
  const hasExtendedAssets = extendedAssetCount > 0;
  const assetCountLabel = `${assetCount} ${
    assetCount === 1 ? "approved image" : "approved images"
  }`;
  const extendedAssetCountLabel = `${extendedAssetCount} ${
    extendedAssetCount === 1 ? "extended archive image" : "extended archive images"
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
          image: approvedAssets.map((asset) => absoluteUrl(asset.approvedPublicPath)),
        }
      : {}),
  };

  return (
    <main>
      <JsonLd data={galleryJsonLd} />
      <section className="border-b border-border-soft bg-surface/72 site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.78fr] lg:px-8">
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
            <h1 className="mt-4 max-w-4xl text-balance break-words text-4xl font-semibold leading-[1.06] text-brand-blue-strong sm:text-5xl">
              {archive.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {archive.tone}
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <span className="inline-flex max-w-full items-center rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-sm font-semibold leading-5 text-brand-blue-strong">
                {hasApprovedAssets ? "Approved collection" : archive.readinessLabel}
              </span>
              <span className="inline-flex max-w-full items-center rounded-full border border-border-soft bg-background px-4 py-2 text-sm font-semibold leading-5 text-muted">
                {hasApprovedAssets ? assetCountLabel : "Selected with care"}
              </span>
              {hasExtendedAssets ? (
                <span className="inline-flex max-w-full items-center rounded-full border border-border-soft bg-background px-4 py-2 text-sm font-semibold leading-5 text-muted">
                  {extendedAssetCountLabel}
                </span>
              ) : null}
            </div>
          </div>
          <aside className="border-y border-border-soft bg-background py-6 sm:py-8 lg:border-l lg:border-y-0 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
              {archive.theme}
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-brand-blue-strong">
              {hasApprovedAssets
                ? "Approved images for public family browsing"
                : "A careful public record for selected school moments"}
            </h2>
            <p className="mt-4 border-l border-brand-gold pl-4 text-sm leading-6 text-slate-700">
              {hasApprovedAssets
                ? "This collection is live with public images that have been selected, optimised, captioned, and checked for suitable presentation."
                : archive.readinessDetail}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
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

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="grid gap-10">
            <MediaAssetGrid
              assets={approvedAssets}
              emptyLabel={`${archive.title} image`}
              emptyDescription="A selected school image can appear here after consent, alt text, caption, and accessibility checks."
              reviewLabel="Featured"
            />

            {hasExtendedAssets ? (
              <section aria-labelledby={`${archive.slug}-extended-archive`}>
                <div className="border-l border-brand-gold pl-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                    Extended archive
                  </p>
                  <h2
                    id={`${archive.slug}-extended-archive`}
                    className="mt-2 text-2xl font-semibold text-brand-blue-strong"
                  >
                    More school-life moments
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    These extra archive images are kept intentionally smaller:
                    useful for depth and history, but separate from the main
                    featured set.
                  </p>
                </div>
                <div className="mt-5">
                  <MediaAssetGrid
                    assets={extendedAssets}
                    variant="compact"
                    reviewLabel="Archive"
                  />
                </div>
              </section>
            ) : null}
          </div>

          <div>
            <AssetReadinessPanel
              title="Curation standard"
              status={
                hasApprovedAssets
                  ? `${assetCountLabel} are currently featured in this collection. ${
                      hasExtendedAssets
                        ? `${extendedAssetCountLabel} are shown separately as smaller archive tiles.`
                        : "Future additions should follow the same consent, caption, crop, and accessibility checks."
                    }`
                  : "Selected photos, captions, and alt text will appear here once they are suitable for public school use."
              }
              notes={
                hasApprovedAssets
                  ? [
                      ...galleryReadinessNotes,
                      "Keep adding images only after public suitability and crop checks.",
                      "Avoid near-duplicates so each image adds a distinct school-life detail.",
                      "Use the extended archive tier for useful lower-resolution images that should not become prominent page imagery.",
                    ]
                  : [...archive.expectedContent, ...mediaReadinessNotes]
              }
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="/gallery" variant="secondary">
                Back to gallery
              </ButtonLink>
              <ButtonLink href="/schools">Explore schools</ButtonLink>
              <span className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-border-soft px-5 py-3 text-center text-sm font-semibold text-muted sm:w-auto">
                Photos selected with care
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              How this archive is curated
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {hasApprovedAssets
                ? "This collection keeps approved school photos organised while future images can be added through the same review path."
                : "This collection keeps the archive organised while suitable school photos, captions, and accessibility details are selected."}
            </p>
          </div>
          <ol className="divide-y divide-border-soft border-y border-border-soft bg-background">
            {galleryWorkflowStages.map((stage, index) => (
              <li
                key={stage.label}
                className="grid gap-4 px-5 py-5 sm:grid-cols-[3rem_1fr]"
              >
                <span className="flex h-10 w-10 items-center justify-center justify-self-start rounded-full border border-brand-gold/50 bg-surface text-sm font-semibold text-brand-blue-strong">
                  {index + 1}
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
              Publication care
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
                className="border-l border-brand-gold bg-background px-4 py-3 text-sm leading-6 text-slate-700"
              >
                {note}
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
            >
              {link.label}
            </ButtonLink>
          ))}
        </div>
      </section>
    </main>
  );
}
