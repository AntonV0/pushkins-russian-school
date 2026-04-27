import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { galleryArchives, getGalleryArchive } from "@/data/gallery";

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

  return {
    title: archive.title,
    description: `${archive.title} shell for approved Pushkin's School public images.`,
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

  return (
    <main>
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
            Gallery archive
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
            {archive.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {archive.summary}
          </p>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={`${archive.year}-${index}`}
                className="flex aspect-[4/3] items-end rounded-lg border border-dashed border-border-soft bg-surface-muted p-5"
              >
                <p className="text-sm font-semibold text-brand-blue-strong">
                  Approved image slot {index + 1}
                </p>
              </div>
            ))}
          </div>

          <aside className="bg-surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Asset readiness
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {archive.status}. This page intentionally avoids source screenshots
              and waits for reviewed, optimised public images.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {archive.expectedContent.map((item) => (
                <li key={item} className="border-l border-brand-gold pl-4">
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/gallery"
              className="mt-8 inline-flex items-center justify-center rounded-full border border-brand-blue/20 px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              Back to gallery
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
