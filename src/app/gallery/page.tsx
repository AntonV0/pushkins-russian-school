import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
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

const quietHeroLink =
  "min-h-0 w-auto justify-start px-0 py-1 text-left sm:min-h-11 sm:justify-center sm:px-5 sm:py-3";

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
      <PageHero
        eyebrow="Gallery"
        title="School life, shared with care"
        actions={
          <>
            <ButtonLink href="/schools">Explore schools</ButtonLink>
            <ButtonLink
              href="/contact#enquiry-form"
              variant="quiet"
              className={quietHeroLink}
            >
              Start an enquiry
            </ButtonLink>
          </>
        }
        aside={
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
            <dl className="grid gap-3 border-y border-border-soft py-4 text-sm sm:grid-cols-3">
              {[
                { label: "Collections", value: galleryCollections.length },
                { label: "Themes", value: galleryThemes.length },
                {
                  label: "Photo care",
                  value: hasApprovedMedia
                    ? `${approvedMediaAssets.length} + ${extendedGalleryAssetCount}`
                    : "Curated",
                },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-xl font-semibold text-brand-blue-strong">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        }
      >
        <p>
          A thoughtful public record of lessons, performances, celebrations,
          and cultural traditions from Pushkin&apos;s School, curated from selected
          location and archive images.
        </p>
      </PageHero>

      <section className="border-b border-border-soft bg-background site-section-compact">
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
            <div className="mt-10 grid gap-x-5 gap-y-7 lg:grid-cols-6">
              {galleryCollections.map((archive, index) => {
                const coverAsset = getGalleryCategoryCoverAsset(archive.slug);
                const assetCount = getGalleryCategoryAssetCount(archive.slug);
                const extendedAssetCount =
                  getExtendedGalleryCategoryAssetCount(archive.slug);
                const hasCategoryMedia = assetCount > 0;
                const isLead = index === 0;
                const isWide = index === 1 || index === 2;

                return (
                  <Link
                    key={archive.slug}
                    href={`/gallery/${archive.slug}`}
                    className={`group overflow-hidden border-y border-border-soft bg-background transition hover:border-brand-red ${
                      isLead
                        ? "lg:col-span-4 lg:grid lg:grid-cols-[1.2fr_0.8fr]"
                        : isWide
                          ? "sm:grid sm:grid-cols-[0.95fr_1.05fr] lg:col-span-3"
                          : "sm:grid sm:grid-cols-[0.8fr_1.2fr] lg:col-span-2 lg:block"
                    }`}
                  >
                    <div className="relative aspect-[5/4] min-h-48 bg-surface-muted sm:aspect-[4/3]">
                      {coverAsset ? (
                        <Image
                          src={coverAsset.approvedPublicPath}
                          alt={coverAsset.altText}
                          fill
                          sizes={
                            isLead
                              ? "(min-width: 1024px) 50vw, 100vw"
                              : isWide
                                ? "(min-width: 1024px) 33vw, (min-width: 640px) 40vw, 100vw"
                                : "(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 100vw"
                          }
                          className="object-cover transition duration-300 group-hover:scale-[1.02]"
                          loading={
                            archive.slug === galleryCollections[0]?.slug
                              ? "eager"
                              : "lazy"
                          }
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
                    <div className="flex flex-1 flex-col justify-between py-5 sm:p-5 lg:p-6">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-red">
                            {archive.theme}
                          </p>
                          <span className="shrink-0 border border-border-soft bg-surface px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted">
                            {hasCategoryMedia
                              ? `${assetCount} featured`
                              : "Preparing"}
                          </span>
                        </div>
                        <h2
                          className={`mt-3 font-semibold text-brand-blue-strong ${
                            isLead ? "text-3xl" : "text-xl"
                          }`}
                        >
                          {archive.title}
                        </h2>
                        <p className="mt-4 text-sm leading-6 text-slate-600">
                          {archive.tone}
                        </p>
                      </div>
                      <div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {archive.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="border-b border-brand-gold/60 pb-0.5 text-xs font-semibold text-brand-blue-strong"
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

      <section className="border-b border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
              Curated with care
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
              Browse first, with publication care close behind
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              The gallery is arranged for visual browsing while keeping the
              public-use standards visible for families and future editors.
            </p>
          </div>
          <div className="grid gap-6">
            <div
              className="grid gap-0 divide-y divide-border-soft border-y border-border-soft md:grid-cols-3 md:divide-x md:divide-y-0"
              aria-labelledby="gallery-readiness-notes"
            >
              <h2 id="gallery-readiness-notes" className="sr-only">
                Gallery readiness notes
              </h2>
              {galleryAssuranceNotes.map((note) => (
                <p
                  key={note}
                  className="py-4 text-sm leading-6 text-slate-700 md:px-4 md:first:pl-0 md:last:pr-0"
                >
                  {note}
                </p>
              ))}
            </div>
            <ol className="grid gap-3 sm:grid-cols-3">
              {galleryCurationStandards.map((stage, index) => (
                <li key={stage.label} className="border-l border-brand-gold pl-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    Standard {index + 1}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-brand-blue-strong">
                    {stage.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {stage.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Current information"
        title="See the current school locations"
        actions={
          <>
            {galleryContactLinks.map((link) => (
              <ButtonLink
                key={link.href}
                href={link.href}
                variant="light"
              >
                {link.label}
              </ButtonLink>
            ))}
          </>
        }
      >
        <p>
          Families can explore branches, timetables, and enquiries while the
          public archive is curated.
        </p>
      </PageCta>
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
            className="relative min-h-36 overflow-hidden rounded-md bg-surface-muted"
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
              loading={index === 0 ? "eager" : "lazy"}
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
