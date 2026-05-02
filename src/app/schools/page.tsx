import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { GoogleMapsNetworkPanel } from "@/components/site/google-maps-network-panel";
import { LearningOptions } from "@/components/site/learning-options";
import { MetricStrip } from "@/components/site/metric-strip";
import { NetworkVisual } from "@/components/site/network-visual";
import { SchoolComparisonTable } from "@/components/site/school-comparison-table";
import { SectionIntro } from "@/components/site/section-intro";
import { admissionsSteps } from "@/data/admissions";
import { networkSummary, schools } from "@/data/schools";

export const metadata: Metadata = {
  title: "Schools",
  description:
    "Explore Pushkin's School locations, current weekend classes, online-only areas, and register-interest options.",
  alternates: {
    canonical: "/schools",
  },
  openGraph: {
    title: "Pushkin's School Locations",
    description:
      "Explore Pushkin's School locations, current weekend classes, online-only areas, and register-interest options.",
    url: "/schools",
  },
};

export default function SchoolsPage() {
  const openSchools = schools.filter((school) => school.status === "open");
  const otherSchools = schools.filter((school) => school.status !== "open");
  const currentSchool = openSchools[0];

  return (
    <main>
      <section className="border-b border-border-soft bg-surface/80 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              School locations
            </p>
            <h1 className="mt-4 max-w-4xl break-words text-4xl font-semibold leading-tight text-brand-blue-strong sm:text-6xl">
              Find the right Pushkin&apos;s School option for your family
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Explore current weekend classes, register-interest areas, and
              online options for children learning Russian language,
              literature, and culture around England.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#location-explorer">
                Explore locations
              </ButtonLink>
              <ButtonLink href="#compare-branches" variant="secondary">
                Compare branches
              </ButtonLink>
            </div>
            <div className="mt-8">
              <MetricStrip
                metrics={[
                  { label: "School locations", value: networkSummary.locations },
                  { label: "Current in-person", value: openSchools.length },
                  { label: "Counties covered", value: networkSummary.counties },
                ]}
              />
            </div>
          </div>
          <NetworkVisual />
        </div>
      </section>

      <section
        id="location-explorer"
        className="scroll-mt-24 border-b border-border-soft bg-background py-14 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Location explorer"
            title="A clearer way to choose a branch"
          >
            <p>
              The map, status notes, schedules, and enquiry actions sit
              together so parents can separate current weekend availability
              from future local interest in one scan.
            </p>
          </SectionIntro>
          <div className="mt-8">
            <GoogleMapsNetworkPanel schools={schools} />
          </div>
        </div>
      </section>

      <section
        id="open-branches"
        className="scroll-mt-24 border-b border-border-soft bg-surface/90 py-14 sm:py-16"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Current availability"
              title="Start with the branch status, then the child&apos;s fit"
            >
              <p>
                Pushkin&apos;s School is a weekend supplementary school, so the
                most useful enquiry includes location, age, current Russian
                confidence, and whether your family needs a place now or wants
                future local provision.
              </p>
            </SectionIntro>
            <div className="mt-7 rounded-lg border border-brand-gold/45 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-brand-blue-strong">
                {currentSchool
                  ? `${currentSchool.name}: ${currentSchool.schedule}`
                  : "Weekend timetable confirmed by enquiry"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {currentSchool
                  ? `${currentSchool.venueName} is the current listed in-person branch. Other towns remain visible for register-interest enquiries and online learning.`
                  : "Current in-person places and local venue details are confirmed directly through the school."}
              </p>
            </div>
          </div>
          <div className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface">
            <div className="border-b border-border-soft bg-white px-5 py-4 sm:px-6">
              <p className="text-sm font-semibold text-brand-blue-strong">
                Parent enquiry flow
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                A focused enquiry helps the school recommend a branch, group,
                or online lesson option without back-and-forth.
              </p>
            </div>
            <ol className="divide-y divide-border-soft">
              {admissionsSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-4 px-5 py-5 sm:grid-cols-[3rem_1fr] sm:px-6"
                >
                  <span className="flex size-11 items-center justify-center rounded-full border border-brand-gold/50 bg-surface-muted text-sm font-semibold text-brand-blue-strong">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-brand-blue-strong">
                      {step.title}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600">
                      {step.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        id="compare-branches"
        className="scroll-mt-24 border-b border-border-soft bg-background py-14 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Compare branches"
            title="One scan before you enquire"
          >
            <p>
              Current, online-only, and register-interest locations stay
              together so families can compare status, schedule, area, and the
              right next step without browsing separate branch pages first.
            </p>
          </SectionIntro>
          <div className="mt-8">
            <SchoolComparisonTable schools={schools} />
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface/90 py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div className="rounded-lg border border-border-soft bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Wider locations
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-brand-blue-strong">
              {otherSchools.length} towns are open for future local interest
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Families outside the current weekend branch can still signal
              demand, ask about online learning, and discuss exam preparation.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {otherSchools.map((school) => (
                <Link
                  key={school.slug}
                  href={`/schools/${school.slug}`}
                  className="rounded-full border border-border-soft bg-background px-3 py-1.5 text-xs font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                >
                  {school.name}
                </Link>
              ))}
            </div>
          </div>
          <LearningOptions
            eyebrow="Beyond local branches"
            title="If a nearby school is not currently available"
            intro="Families can register interest locally, ask about online lessons, or explore GCSE-focused self-study support while waiting for a nearby weekend class."
            compact
          />
        </div>
      </section>

      <section className="bg-brand-blue-strong py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Choosing a location
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Send one useful enquiry about your preferred school
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
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Start an enquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
