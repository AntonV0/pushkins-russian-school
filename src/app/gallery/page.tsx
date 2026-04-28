import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { MetricStrip } from "@/components/site/metric-strip";
import { SectionIntro } from "@/components/site/section-intro";
import {
  galleryArchives,
  galleryReadinessNotes,
  gallerySupportLinks,
  galleryThemes,
  galleryWorkflowStages,
} from "@/data/gallery";
import { approvedMediaAssets, mediaReadinessNotes } from "@/data/media-assets";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Gallery shell for approved Pushkin's School public images and future year archives.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Pushkin's School Gallery",
    description:
      "Approved public gallery archive shells for Pushkin's School images and future year collections.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <main>
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.86fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Gallery
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
              A careful archive for approved school moments
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Raw source screenshots are intentionally not used as assets. This
              section is ready for approved, optimised images from the public
              assets workflow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/schools">Explore schools</ButtonLink>
              <ButtonLink href="/contact#enquiry-form" variant="secondary">
                Start an enquiry
              </ButtonLink>
            </div>
          </div>
          <MetricStrip
            metrics={[
              { label: "Year routes", value: galleryArchives.length },
              { label: "Themes", value: galleryThemes.length },
              { label: "Approved", value: approvedMediaAssets.length },
            ]}
          />
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
          {[...galleryReadinessNotes, ...mediaReadinessNotes].map((note) => (
            <div
              key={note}
              className="border-l border-brand-gold bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
            >
              {note}
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Approved media workflow"
            title="A gallery path that keeps source material private"
          >
            <p>
              The public site can show archive depth only after images pass
              review, optimisation, consent checks, and caption checks.
            </p>
          </SectionIntro>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {galleryWorkflowStages.map((stage, index) => (
              <li
                key={stage.label}
                className="border border-border-soft bg-background p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-red">
                  Step {index + 1}
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
            eyebrow="Archive shells"
            title="Year pages ready for reviewed public media"
          >
            <p>
              The old gallery was organised by year. The rebuilt archive keeps
              those routes while waiting for approved images, captions, and
              privacy checks.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryArchives.map((archive) => (
              <Link
                key={archive.year}
                href={`/gallery/${archive.year}`}
                className="group flex min-h-72 flex-col justify-between rounded-lg border border-border-soft bg-surface p-6 transition hover:-translate-y-0.5 hover:border-brand-red hover:shadow-md"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
                    {archive.theme}
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold text-brand-blue-strong">
                    {archive.year}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {archive.tone}
                  </p>
                  <p className="mt-4 border-l border-brand-gold pl-4 text-sm leading-6 text-slate-700">
                    {archive.readinessDetail}
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
                    {archive.readinessLabel}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-brand-blue-strong py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              While photos are pending
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Keep the journey focused on current school information
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              The gallery can wait for approved media without blocking families
              from comparing branches or sending an initial enquiry.
            </p>
          </div>
          <div className="grid gap-3">
            {gallerySupportLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-white/15 bg-white/5 p-5 transition hover:border-white/35 hover:bg-white/10"
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
