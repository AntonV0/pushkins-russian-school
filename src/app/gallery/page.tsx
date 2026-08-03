import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, CheckCircle2, Images, MapPin, MessageSquareText } from "lucide-react";
import {
  ButtonLink,
  quietHeroLinkClassName,
} from "@/components/site/button-link";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SectionIntro } from "@/components/site/section-intro";
import { VisualStoryPanel } from "@/components/site/visual-story-panel";
import {
  galleryCollections,
  galleryThemes,
} from "@/data/public/gallery";
import {
  getVisualPlaceholderSlot,
  type MediaAsset,
} from "@/features/gallery/data/media-assets";
import {
  getSelectedGalleryAssetCount,
  getSelectedGalleryCategoryAssetCount,
  getSelectedGalleryCategoryCoverAsset,
  selectedGalleryMediaAssets,
} from "@/features/gallery/data/selected-gallery-media";

const galleryVisual = getVisualPlaceholderSlot("gallery-approved-archive");

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A warm view of Pushkin's School life, Russian lessons, performances, celebrations, creative work, and school archive moments.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Pushkin's School Gallery",
    description:
      "A warm view of Pushkin's School life, Russian lessons, performances, celebrations, creative work, and school archive moments.",
    url: "/gallery",
  },
};

const galleryAssuranceNotes = [
  "Gallery collections are organised around learning, culture, performance, locations, and community life.",
  "Captions and image choices keep child privacy and family confidence in view.",
  "Archive images can be used at modest sizes when they add useful school-history context.",
];

const galleryCurationStandards = [
  {
    label: "School-life selection",
    description:
      "Images are chosen for warmth, clarity, and relevance to real Russian school life.",
  },
  {
    label: "Respectful captions",
    description:
      "Captions give context for families without exposing personal details or relying on children being named.",
  },
  {
    label: "Archive context",
    description:
      "Gallery collections balance accessible images, useful alt text, and a meaningful mix of school moments.",
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
    label: "Tell us about your child",
    href: "/contact#enquiry-form",
    description:
      "Ask about classes, availability, online learning, or the best option for your child.",
  },
];

function getGalleryHeroCoverAssets() {
  return galleryCollections.reduce<MediaAsset[]>((assets, collection) => {
    const coverAsset = getSelectedGalleryCategoryCoverAsset(collection.slug);

    if (!coverAsset) {
      return assets;
    }

    return [...assets, coverAsset];
  }, []);
}

export default function GalleryPage() {
  const selectedGalleryAssetCount = getSelectedGalleryAssetCount();
  const hasApprovedMedia = selectedGalleryMediaAssets.length > 0;
  const galleryHeroCoverAssets = getGalleryHeroCoverAssets();

  return (
    <main>
      <PageHero
        eyebrow="Gallery"
        title="Russian school life in lessons, performances, and celebrations"
        actions={
          <>
            <ButtonLink href="/schools" icon={<MapPin className="size-4" />}>
              Explore schools
            </ButtonLink>
            <ButtonLink
              href="/contact#enquiry-form"
              variant="quiet"
              className={quietHeroLinkClassName}
              icon={<MessageSquareText className="size-4" />}
            >
              Tell us about your child
            </ButtonLink>
          </>
        }
        aside={
          <div className="grid content-start gap-4">
            {hasApprovedMedia && galleryHeroCoverAssets.length > 0 ? (
              <GalleryHeroMosaic
                assets={galleryHeroCoverAssets}
                totalAssets={selectedGalleryAssetCount}
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
                    ? selectedGalleryAssetCount
                    : "Curated",
                },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    <Images aria-hidden="true" className="mb-1 size-4 text-brand-red" />
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
          A warm view of lessons, performances, celebrations, creative work,
          and cultural traditions from Pushkin&apos;s School.
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
                const coverAsset = getSelectedGalleryCategoryCoverAsset(
                  archive.slug,
                );
                const assetCount = getSelectedGalleryCategoryAssetCount(
                  archive.slug,
                );
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
                              ? `${assetCount} selected`
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
                              className="border-b border-brand-accent/60 pb-0.5 text-xs font-semibold text-brand-blue-strong"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                        <p className="mt-5 text-sm font-semibold text-muted">
                          <ArrowRight aria-hidden="true" className="mr-1 inline size-4 align-[-0.2em]" />
                          {hasCategoryMedia
                              ? "View school-life images"
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
              School life, shown thoughtfully
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
              Browse lessons, performances, and culture
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              The gallery is arranged so families can quickly see classroom
              learning, performances, celebrations, locations, and creative
              work.
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
                  className="flex gap-2 py-4 text-sm leading-6 text-slate-700 md:px-4 md:first:pl-0 md:last:pr-0"
                >
                  <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                  <span>{note}</span>
                </p>
              ))}
            </div>
            <ol className="grid gap-3 sm:grid-cols-3">
              {galleryCurationStandards.map((stage, index) => (
                <li key={stage.label} className="border-l border-brand-accent pl-4">
                  <Camera aria-hidden="true" className="mb-2 size-5 text-brand-red" />
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
                icon={link.href === "/schools" ? <MapPin className="size-4" /> : <MessageSquareText className="size-4" />}
              >
                {link.label}
              </ButtonLink>
            ))}
          </>
        }
      >
        <p>
          Families can explore the school network and ask about the right
          Russian learning route for their child.
        </p>
      </PageCta>
    </main>
  );
}

function GalleryHeroMosaic({
  assets,
  totalAssets,
}: {
  assets: MediaAsset[];
  totalAssets: number;
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
          School life archive
        </p>
        <h2
          id="gallery-hero-mosaic-heading"
          className="mt-2 text-xl font-semibold leading-tight text-brand-blue-strong"
        >
          {totalAssets} school-life images across {galleryCollections.length}{" "}
          gallery collections
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Each collection shows distinct school-life moments across lessons,
          performances, celebrations, locations, and creative work.
        </p>
      </figcaption>
    </figure>
  );
}
