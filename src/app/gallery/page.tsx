import type { Metadata } from "next";
import Link from "next/link";
import { MetricStrip } from "@/components/site/metric-strip";
import { SectionIntro } from "@/components/site/section-intro";
import {
  galleryArchives,
  galleryReadinessNotes,
  galleryThemes,
} from "@/data/gallery";

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
          </div>
          <MetricStrip
            metrics={[
              { label: "Year routes", value: galleryArchives.length },
              { label: "Themes", value: galleryThemes.length },
              { label: "Status", value: "Review" },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-border-soft bg-background py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-3 lg:px-8">
          {galleryReadinessNotes.map((note) => (
            <div
              key={note}
              className="border-l border-brand-gold bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
            >
              {note}
            </div>
          ))}
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
                    {archive.status}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
