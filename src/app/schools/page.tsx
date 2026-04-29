import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { GoogleMapsNetworkPanel } from "@/components/site/google-maps-network-panel";
import { LearningOptions } from "@/components/site/learning-options";
import { MetricStrip } from "@/components/site/metric-strip";
import { NetworkVisual } from "@/components/site/network-visual";
import { SchoolCard } from "@/components/site/school-card";
import { SchoolComparisonTable } from "@/components/site/school-comparison-table";
import { SectionIntro } from "@/components/site/section-intro";
import { networkSummary, schools } from "@/data/schools";

export const metadata: Metadata = {
  title: "Schools",
  description:
    "Explore Pushkin's School current classes, online-only network areas, register-interest routes, and branch status.",
  alternates: {
    canonical: "/schools",
  },
  openGraph: {
    title: "Pushkin's School Routes",
    description:
      "Explore Pushkin's School current classes, online-only network areas, register-interest routes, and branch status.",
    url: "/schools",
  },
};

export default function SchoolsPage() {
  const openSchools = schools.filter((school) => school.status === "open");
  const onlineSchools = schools.filter((school) => school.status === "online");
  const otherSchools = schools.filter((school) => school.status !== "open");
  const openHubTitle =
    openSchools.length === 1
      ? "Current weekend school hub"
      : "Current weekend school hubs";
  const openHubDescription =
    openSchools.length === 1
      ? "This is the in-person weekend school location currently listed for parent enquiries. Additional current hubs can be added once their details are approved."
      : "These are the in-person weekend school locations currently listed for parent enquiries. Additional current hubs can be added once their details are approved.";

  return (
    <main>
      <section className="border-b border-border-soft bg-surface/80 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              School routes
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-brand-blue-strong sm:text-6xl">
              Current classes, online routes, and local interest
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Compare the current weekend hub, online-only network areas, and
              register-interest routes before choosing the most useful enquiry
              path.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#open-branches">
                View current hub
              </ButtonLink>
              <ButtonLink href="#compare-branches" variant="secondary">
                Compare all routes
              </ButtonLink>
            </div>
            <div className="mt-8">
              <MetricStrip
                metrics={[
                  { label: "Network areas", value: networkSummary.locations },
                  { label: "Current hub", value: openSchools.length },
                  { label: "Online / interest", value: onlineSchools.length },
                ]}
              />
            </div>
          </div>
          <NetworkVisual />
        </div>
      </section>

      <section className="border-b border-border-soft bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <GoogleMapsNetworkPanel schools={schools} />
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
              This comparison keeps current, online, and register-interest
              routes together so families can quickly understand the right
              next step for each branch.
            </p>
          </SectionIntro>
          <div className="mt-8">
            <SchoolComparisonTable schools={schools} />
          </div>
        </div>
      </section>

      <section
        id="open-branches"
        className="scroll-mt-24 bg-background py-14 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro eyebrow="Weekend schools" title={openHubTitle}>
            <p>{openHubDescription}</p>
          </SectionIntro>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {openSchools.map((school) => (
              <SchoolCard key={school.slug} school={school} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface/90 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Network continuity"
            title="Online-only and register-interest network areas"
          >
            <p className="mt-3 text-sm leading-6 text-slate-600">
              These locations remain part of the wider network. Families can use
              online routes now and register interest to support future local
              reopening.
            </p>
          </SectionIntro>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {otherSchools.map((school) => (
              <SchoolCard key={school.slug} school={school} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <LearningOptions
            eyebrow="Beyond local branches"
            title="If a nearby school is not currently available"
            intro="Families can still stay within the wider Russian-learning network: register interest locally, ask about online lessons, or explore GCSE-focused self-study support."
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
              Send one useful enquiry, even while local routes evolve
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
