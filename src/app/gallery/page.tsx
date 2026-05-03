import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { MetricStrip } from "@/components/site/metric-strip";
import { SectionIntro } from "@/components/site/section-intro";
import { VisualStoryPanel } from "@/components/site/visual-story-panel";
import {
  galleryArchives,
  galleryThemes,
} from "@/data/gallery";
import {
  approvedMediaAssets,
  getVisualPlaceholderSlot,
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
  "Archive years are organised around learning, culture, performance, and community life.",
  "Public images are selected carefully so captions, consent, and child privacy stay appropriate.",
  "The gallery is designed to grow into a credible record of a school community built over many years.",
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
      "Year pages are reserved for accessible images, useful alt text, and a balanced mix of school moments.",
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

export default function GalleryPage() {
  const hasApprovedMedia = approvedMediaAssets.length > 0;

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
              celebrations, and cultural traditions from Pushkin&apos;s School will
              appear here as suitable images are selected.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/schools">Explore schools</ButtonLink>
              <ButtonLink href="/contact#enquiry-form" variant="secondary">
                Start an enquiry
              </ButtonLink>
            </div>
          </div>
          <div className="grid content-start gap-4">
            {galleryVisual ? (
              <VisualStoryPanel slot={galleryVisual} compact />
            ) : null}
            <MetricStrip
              metrics={[
                { label: "Archive years", value: galleryArchives.length },
                { label: "Themes", value: galleryThemes.length },
                {
                  label: "Photo care",
                  value: hasApprovedMedia
                    ? approvedMediaAssets.length
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
            title="School-life moments organised by year"
          >
            <p>
              The archive structure brings school history into a clear shape:
              classroom work, celebrations, performances, language learning,
              and community milestones.
            </p>
          </SectionIntro>
          {hasApprovedMedia ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryArchives.map((archive) => (
                <Link
                  key={archive.year}
                  href={`/gallery/${archive.year}`}
                  className="premium-panel group flex min-h-72 flex-col justify-between rounded-lg border border-border-soft bg-surface p-6 transition hover:-translate-y-0.5 hover:border-brand-red"
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
          ) : (
            <div className="premium-panel mt-10 grid gap-0 overflow-hidden rounded-lg border border-border-soft bg-surface lg:grid-cols-[0.72fr_1.28fr]">
              <div className="border-b border-border-soft bg-surface-muted p-6 lg:border-b-0 lg:border-r">
                <h2 className="text-lg font-semibold text-brand-blue-strong">
                  School-life archive
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Public year pages are organised around the school-life story
                  they will tell as suitable images and captions are selected.
                </p>
              </div>
              <div className="divide-y divide-border-soft">
                {galleryArchives.map((archive) => (
                  <article
                    key={archive.year}
                    className="grid gap-4 p-5 sm:grid-cols-[5rem_1fr] sm:items-start"
                  >
                    <div>
                      <p className="text-2xl font-semibold text-brand-blue-strong">
                        {archive.year}
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
