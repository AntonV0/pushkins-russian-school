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
  galleryArchives,
  galleryReadinessNotes,
  gallerySupportLinks,
  galleryWorkflowStages,
  getGalleryArchive,
} from "@/data/gallery";
import {
  getApprovedMediaByYear,
  mediaReadinessNotes,
} from "@/data/media-assets";
import { absoluteUrl, siteConfig } from "@/data/site";

type GalleryYearPageProps = {
  params: Promise<{ year: string }>;
};

export function generateStaticParams() {
  return galleryArchives.map((archive) => ({ year: archive.year }));
}

export async function generateMetadata({
  params,
}: GalleryYearPageProps): Promise<Metadata> {
  const { year } = await params;
  const archive = getGalleryArchive(year);

  if (!archive) {
    return {
      title: "Gallery archive not found",
    };
  }

  const approvedAssets = getApprovedMediaByYear(archive.year);

  return {
    title: archive.title,
    description: `${archive.title} shell for approved Pushkin's School public images.`,
    robots:
      approvedAssets.length > 0
        ? undefined
        : {
            index: false,
            follow: true,
          },
    alternates: {
      canonical: `/gallery/${archive.year}`,
    },
    openGraph: {
      title: `${archive.title} | Pushkin's School Gallery`,
      description: archive.summary,
      url: `/gallery/${archive.year}`,
      type: "article",
    },
  };
}

export default async function GalleryYearPage({ params }: GalleryYearPageProps) {
  const { year } = await params;
  const archive = getGalleryArchive(year);

  if (!archive) {
    notFound();
  }

  const approvedAssets = getApprovedMediaByYear(archive.year);

  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: archive.title,
    url: absoluteUrl(`/gallery/${archive.year}`),
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
  };

  return (
    <main>
      <JsonLd data={galleryJsonLd} />
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.78fr] lg:px-8">
          <div>
            <Breadcrumbs
              items={[
                { label: "Gallery", href: "/gallery" },
                { label: archive.year },
              ]}
            />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Gallery archive
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
              {archive.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {archive.tone}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-sm font-semibold text-brand-blue-strong">
                {archive.readinessLabel}
              </span>
              <span className="inline-flex items-center rounded-full border border-border-soft bg-background px-4 py-2 text-sm font-semibold text-muted">
                Curated before publication
              </span>
            </div>
          </div>
          <aside className="premium-panel rounded-lg border border-border-soft bg-background p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
              {archive.theme}
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-brand-blue-strong">
              A careful public record for approved school moments
            </h2>
            <p className="mt-4 border-l border-brand-gold pl-4 text-sm leading-6 text-slate-700">
              {archive.readinessDetail}
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

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <MediaAssetGrid
            assets={approvedAssets}
            emptyLabel={`${archive.year} approved image slot`}
            emptyDescription="Reserved for an approved image with consent, alt text, caption, and an optimised public file."
          />

          <div>
            <AssetReadinessPanel
              title="Curation standard"
              status="The public page is ready for approved images, captions, and alt text. Private source material stays out of the website."
              notes={[...archive.expectedContent, ...mediaReadinessNotes]}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="/gallery" variant="secondary">
                Back to gallery
              </ButtonLink>
              <ButtonLink href="/schools">Explore schools</ButtonLink>
              <span className="inline-flex items-center justify-center rounded-md border border-border-soft px-5 py-3 text-sm font-semibold text-muted">
                Approved photos will be added here
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Before this archive goes live
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The archive page can stay visible as a polished public structure,
              then become visual once approved media records are ready.
            </p>
          </div>
          <ol className="overflow-hidden rounded-lg border border-border-soft bg-background">
            {galleryWorkflowStages.map((stage, index) => (
              <li
                key={stage.label}
                className="grid gap-4 border-b border-border-soft px-5 py-5 last:border-b-0 sm:grid-cols-[3rem_1fr]"
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

      <section className="border-t border-border-soft bg-surface py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Publication care
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The gallery can feel warm while protecting private archive
              material and child image permissions.
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

      <section className="border-t border-border-soft bg-brand-blue-strong py-12 text-white">
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
