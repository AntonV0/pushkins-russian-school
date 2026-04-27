import type { Metadata } from "next";
import Link from "next/link";
import { SectionIntro } from "@/components/site/section-intro";
import { galleryArchives } from "@/data/gallery";

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
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
            Gallery
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
            Approved school moments will live here
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Raw source screenshots are intentionally not used as assets. This
            section is ready for approved, optimised images from the public
            assets workflow.
          </p>
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
                className="group flex aspect-[4/3] flex-col justify-between rounded-lg border border-border-soft bg-surface p-6 transition hover:-translate-y-0.5 hover:border-brand-red hover:shadow-md"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                    Archive
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold text-brand-blue-strong">
                    {archive.year}
                  </h2>
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  {archive.status}. Open readiness notes.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
