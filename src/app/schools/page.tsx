import type { Metadata } from "next";
import Link from "next/link";
import { MetricStrip } from "@/components/site/metric-strip";
import { NetworkVisual } from "@/components/site/network-visual";
import { SchoolCard } from "@/components/site/school-card";
import { SectionIntro } from "@/components/site/section-intro";
import { networkSummary, schools } from "@/data/schools";

export const metadata: Metadata = {
  title: "Schools",
  description:
    "Explore Pushkin's School locations, weekend timetables, class groups, and current branch status.",
  alternates: {
    canonical: "/schools",
  },
  openGraph: {
    title: "Pushkin's School Locations",
    description:
      "Explore Pushkin's School branches, weekend timetables, class groups, and branch status.",
    url: "/schools",
  },
};

export default function SchoolsPage() {
  const openSchools = schools.filter((school) => school.status === "open");
  const otherSchools = schools.filter((school) => school.status !== "open");

  return (
    <main>
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              School locations
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
              A clear network view for every branch
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Active, online, and currently closed branches use the same page
              template so every location can present venue, timetable, pricing,
              enquiry, and status information.
            </p>
            <div className="mt-8">
              <MetricStrip
                metrics={[
                  { label: "Locations", value: networkSummary.locations },
                  { label: "Open branches", value: openSchools.length },
                  { label: "Register interest", value: otherSchools.length },
                ]}
              />
            </div>
          </div>
          <NetworkVisual />
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Weekend schools"
            title="Listed branches with in-person schedules"
          >
            <p>
              These branches are shown as weekend schools in the current source
              data. Timetables remain visible with verification notes where old
              copy conflicts.
            </p>
          </SectionIntro>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {openSchools.map((school) => (
              <SchoolCard key={school.slug} school={school} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Network continuity"
            title="Online or register-interest locations"
          >
            <p className="mt-3 text-sm leading-6 text-slate-600">
              These locations remain part of the school network and have full
              pages with transparent status wording for families.
            </p>
          </SectionIntro>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {otherSchools.map((school) => (
              <SchoolCard key={school.slug} school={school} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-blue-strong py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Choosing a location
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Not sure which branch is right?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              Share your preferred area, child&apos;s age, current Russian
              level, and whether you are looking for current places or future
              classes.
            </p>
          </div>
          <div className="flex items-center md:justify-end">
            <Link
              href="/contact#enquiry-form"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Start an enquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
