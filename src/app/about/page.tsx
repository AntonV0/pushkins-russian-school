import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Pushkin's School, its Russian language learning network, and the website rebuild direction.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
            About Pushkin&apos;s School
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
            A professional home for an established Russian school community
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            This rebuild presents the school as warm, trustworthy, academic, and
            easy for parents to understand. The old site is used for public
            source content only; the visual language is intentionally renewed.
          </p>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              title: "Parent-facing clarity",
              body: "Families should quickly understand locations, status, timetables, class groups, and how to enquire.",
            },
            {
              title: "Academic warmth",
              body: "The site uses a refined palette and spacious typography while keeping the school network human and welcoming.",
            },
            {
              title: "Built to extend",
              body: "School pages are powered by local TypeScript data so future locations can be added cleanly.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-border-soft bg-surface p-6"
            >
              <h2 className="text-xl font-semibold text-brand-blue-strong">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-brand-blue-strong">
              Next content pass
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Public biography, staff, safeguarding, and richer history copy can
              be layered in after the reviewed source documents are ready.
            </p>
            <Link
              href="/schools"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            >
              Explore schools
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
