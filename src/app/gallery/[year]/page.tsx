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
              {archive.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-sm font-semibold text-brand-blue-strong">
                {archive.readinessLabel}
              </span>
              <span className="inline-flex items-center rounded-full border border-border-soft bg-background px-4 py-2 text-sm font-semibold text-muted">
                Raw screenshots excluded
              </span>
            </div>
          </div>
          <aside className="bg-surface-muted p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
              {archive.theme}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {archive.tone}
            </p>
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
            emptyDescription="Reserved for a reviewed image with consent, alt text, caption, and optimised public file."
          />

          <div>
            <AssetReadinessPanel
              title="Publication gate"
              status={`${archive.status}. This page intentionally avoids source screenshots and waits for reviewed, optimised public images.`}
              notes={[...archive.expectedContent, ...mediaReadinessNotes]}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="/gallery" variant="secondary">
                Back to gallery
              </ButtonLink>
              <ButtonLink href="/schools">Explore schools</ButtonLink>
              <span className="inline-flex items-center justify-center rounded-full border border-border-soft px-5 py-3 text-sm font-semibold text-muted">
                Uploads pending review
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
              The year route can be published as a credible shell now, then
              populated only when approved media records are ready.
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-3">
            {galleryWorkflowStages.map((stage, index) => (
              <li
                key={stage.label}
                className="border-l border-brand-gold bg-background px-4 py-3"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Step {index + 1}
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
      </section>

      <section className="border-t border-border-soft bg-surface py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-3 lg:px-8">
          {galleryReadinessNotes.map((note) => (
            <div
              key={note}
              className="border-l border-brand-gold bg-background px-4 py-3 text-sm leading-6 text-slate-700"
            >
              {note}
            </div>
          ))}
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
