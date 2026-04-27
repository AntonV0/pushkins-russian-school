import type { Metadata } from "next";
import Link from "next/link";
import { galleryArchives } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Gallery shell for approved Pushkin's School public images and future year archives.",
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryArchives.map((archive) => (
              <Link
                key={archive.year}
                href={`/gallery/${archive.year}`}
                className="aspect-[4/3] rounded-lg border border-border-soft bg-surface p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                  Archive
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-brand-blue-strong">
                  {archive.year}
                </h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {archive.status}. Open the year shell for asset and caption
                  readiness notes.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
