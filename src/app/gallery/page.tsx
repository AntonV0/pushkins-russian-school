import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { MetricStrip } from "@/components/site/metric-strip";
import { SectionIntro } from "@/components/site/section-intro";
import { VisualStoryPanel } from "@/components/site/visual-story-panel";
import {
  getExtendedGalleryAssetCount,
  getExtendedGalleryCategoryAssetCount,
} from "@/data/extended-gallery-assets";
import {
  galleryCollections,
  galleryThemes,
} from "@/data/gallery";
import {
  approvedMediaAssets,
  getGalleryCategoryAssetCount,
  getGalleryCategoryCoverAsset,
  getVisualPlaceholderSlot,
  type MediaAsset,
} from "@/data/media-assets";

const galleryVisual = getVisualPlaceholderSlot("gallery-approved-archive");

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A curated view of Pushkin's School life, events, traditions, and selected school archive moments.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Pushkin's School Gallery",
    description:
      "A curated view of Pushkin's School life, events, traditions, and selected school archive moments.",
    url: "/gallery",
  },
};

const galleryAssuranceNotes = [
  "Gallery collections are organised around learning, culture, performance, locations, and community life.",
  "Public images are selected carefully so captions, consent, and child privacy stay appropriate.",
  "Legacy archive images can be used at modest sizes when they add useful school-history context.",
];

const galleryCurationStandards = [
  {
    label: "Curated selection",
    description:
      "Images are chosen for warmth, clarity, and relevance to real school life before they appear publicly.",
  },
  {
    label: "Respectful captions",
    description:
      "Captions give context for families without exposing personal details or relying on children being named.",
  },
  {
    label: "Archive quality",
    description:
      "Gallery collections are reserved for accessible images, useful alt text, and a balanced mix of school moments.",
  },
];

const galleryContactLinks = [
  {
    label: "Explore schools",
    href: "/schools",
    description:
      "See current branch pages and locations for families considering lessons.",
  },
  {
    label: "Start an enquiry",
    href: "/contact#enquiry-form",
    description:
      "Ask about classes, availability, or the best option for your child.",
  },
];

function getGalleryHeroCoverAssets() {
  return galleryCollections.reduce<MediaAsset[]>((assets, collection) => {
    const coverAsset = getGalleryCategoryCoverAsset(collection.slug);

    if (!coverAsset) {
      return assets;
    }

    return [...assets, coverAsset];
  }, []);
}

export default function GalleryPage() {
  const hasApprovedMedia = approvedMediaAssets.length > 0;
  const galleryHeroCoverAssets = getGalleryHeroCoverAssets();
  const extendedGalleryAssetCount = getExtendedGalleryAssetCount();

  return (
    <main>
      <section className="border-b border-border-soft bg-surface/80 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.86fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Gallery
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-brand-blue-strong sm:text-6xl">
              School life, shared with care
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              A thoughtful public record of lessons, performances,
              celebrations, and cultural traditions from Pushkin&apos;s School,
              curated from selected location and archive images.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/schools">Explore schools</ButtonLink>
              <ButtonLink href="/contact#enquiry-form" variant="secondary">
                Start an enquiry
              </ButtonLink>
            </div>
          </div>
          <div className="grid content-start gap-4">
            {hasApprovedMedia && galleryHeroCoverAssets.length > 0 ? (
              <GalleryHeroMosaic
                assets={galleryHeroCoverAssets}
                totalAssets={approvedMediaAssets.length}
                extendedAssets={extendedGalleryAssetCount}
              />
            ) : galleryVisual ? (
              <VisualStoryPanel slot={galleryVisual} compact />
            ) : null}
            <MetricStrip
              metrics={[
                { label: "Collections", value: galleryCollections.length },
                { label: "Themes", value: galleryThemes.length },
                {
                  label: "Photo care",
                  value: hasApprovedMedia
                    ? `${approvedMediaAssets.length} + ${extendedGalleryAssetCount}`
                    : "Curated",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section
        className="border-b border-border-soft bg-background py-12"
        aria-labelledby="gallery-readiness-notes"
      >
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-3 lg:px-8">
          <h2 id="gallery-readiness-notes" className="sr-only">
            Gallery readiness notes
          </h2>
          {galleryAssuranceNotes.map((note) => (
            <div
              key={note}
              className="premium-panel border-l border-brand-gold bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
            >
              {note}
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Curated with care"
            title="A public gallery needs the same care as a classroom"
          >
            <p>
              A parent-facing school gallery should feel warm and specific while
              still being careful about children&apos;s privacy and public context.
            </p>
          </SectionIntro>
          <ol className="premium-panel mt-8 grid gap-0 overflow-hidden rounded-lg border border-border-soft bg-background md:grid-cols-3">
            {galleryCurationStandards.map((stage, index) => (
              <li
                key={stage.label}
                className="border-b border-border-soft p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-red">
                  Standard {index + 1}
                </p>
                <h2 className="mt-2 text-base font-semibold text-brand-blue-strong">
                  {stage.label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {stage.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="School archive"
            title="School-life moments organised by category"
          >
            <p>
              The archive structure brings school history into a clear shape:
              classroom work, celebrations, performances, language learning,
              and community milestones.
            </p>
          </SectionIntro>
          {hasApprovedMedia ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryCollections.map((archive) => {
                const coverAsset = getGalleryCategoryCoverAsset(archive.slug);
                const assetCount = getGalleryCategoryAssetCount(archive.slug);
                const extendedAssetCount =
                  getExtendedGalleryCategoryAssetCount(archive.slug);
                const hasCategoryMedia = assetCount > 0;

                return (
                  <Link
                    key={archive.slug}
                    href={`/gallery/${archive.slug}`}
                    className="premium-panel group flex min-h-[31rem] flex-col overflow-hidden rounded-lg border border-border-soft bg-surface transition hover:-translate-y-0.5 hover:border-brand-red"
                  >
                    <div className="relative aspect-[4/3] bg-surface-muted">
                      {coverAsset ? (
                        <Image
                          src={coverAsset.approvedPublicPath}
                          alt={coverAsset.altText}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="relative flex h-full items-end overflow-hidden p-5">
                          <div
                            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,56,102,0.07)_1px,transparent_1px),linear-gradient(0deg,rgba(20,56,102,0.07)_1px,transparent_1px)] bg-[size:30px_30px]"
                            aria-hidden="true"
                          />
                          <p className="relative text-sm font-semibold text-muted">
                            Images in preparation
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
                            {archive.theme}
                          </p>
                          <span className="shrink-0 rounded-full border border-border-soft bg-background px-3 py-1 text-xs font-semibold text-muted">
                            {hasCategoryMedia
                              ? `${assetCount} featured`
                              : "Preparing"}
                          </span>
                        </div>
                        <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
                          {archive.title}
                        </h2>
                        <p className="mt-4 text-sm leading-6 text-slate-600">
                          {archive.tone}
                        </p>
                      </div>
                      <div>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {archive.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="rounded-full border border-border-soft px-3 py-1 text-xs font-semibold text-brand-blue-strong"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                        <p className="mt-5 text-sm font-semibold text-muted">
                          {hasCategoryMedia
                            ? extendedAssetCount > 0
                              ? `View selected images and ${extendedAssetCount} archive tiles`
                              : "View selected images"
                            : archive.readinessLabel}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="premium-panel mt-10 grid gap-0 overflow-hidden rounded-lg border border-border-soft bg-surface lg:grid-cols-[0.72fr_1.28fr]">
              <div className="border-b border-border-soft bg-surface-muted p-6 lg:border-b-0 lg:border-r">
                <h2 className="text-lg font-semibold text-brand-blue-strong">
                  School-life archive
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Public gallery collections are organised around the
                  school-life story they will tell as suitable images and
                  captions are selected.
                </p>
              </div>
              <div className="divide-y divide-border-soft">
                {galleryCollections.map((archive) => (
                  <article
                    key={archive.slug}
                    className="grid gap-4 p-5 sm:grid-cols-[12rem_1fr] sm:items-start"
                  >
                    <div>
                      <p className="text-lg font-semibold text-brand-blue-strong">
                        {archive.title}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-red">
                        {archive.theme}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm leading-6 text-slate-600">
                        {archive.tone}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {archive.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-full border border-border-soft px-3 py-1 text-xs font-semibold text-brand-blue-strong"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border-soft bg-brand-blue-strong py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Current information
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              See the current school locations
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              Families can explore branches, timetables, and enquiries while
              the public archive is curated.
            </p>
          </div>
          <div className="grid gap-3">
            {galleryContactLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-white/15 bg-white/5 p-5 transition hover:border-white/35 hover:bg-white/10"
              >
                <span className="block text-sm font-semibold">
                  {link.label}
                </span>
                <span className="mt-2 block text-sm leading-6 text-white/75">
                  {link.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function GalleryHeroMosaic({
  assets,
  totalAssets,
  extendedAssets,
}: {
  assets: MediaAsset[];
  totalAssets: number;
  extendedAssets: number;
}) {
  const visibleAssets = assets.slice(0, 6);

  return (
    <figure
      className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface"
      aria-labelledby="gallery-hero-mosaic-heading"
    >
      <div className="grid min-h-72 grid-cols-3 grid-rows-2 gap-1 bg-surface-muted p-1 sm:min-h-80">
        {visibleAssets.map((asset, index) => (
          <div
            key={asset.id}
            className="relative overflow-hidden rounded-md bg-surface-muted"
            style={
              index === 0
                ? { gridColumn: "span 2", gridRow: "span 2" }
                : undefined
            }
          >
            <Image
              src={asset.approvedPublicPath}
              alt={asset.altText}
              fill
              sizes={
                index === 0
                  ? "(min-width: 1024px) 40vw, 66vw"
                  : "(min-width: 1024px) 14vw, 33vw"
              }
              className="object-cover"
              priority={index === 0}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-brand-blue-strong/35 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
      <figcaption className="p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
          Selected archive
        </p>
        <h2
          id="gallery-hero-mosaic-heading"
          className="mt-2 text-xl font-semibold leading-tight text-brand-blue-strong"
        >
          {totalAssets} featured images across {galleryCollections.length}{" "}
          gallery collections
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The featured set stays carefully curated, with {extendedAssets} more
          small archive tiles adding depth where lower-resolution images still
          help tell the school story.
        </p>
      </figcaption>
    </figure>
  );
}
