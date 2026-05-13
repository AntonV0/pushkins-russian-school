import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Laptop, MapPin, Search, UsersRound } from "lucide-react";
import { ButtonLink } from "@/components/site/button-link";
import { GoogleMapsNetworkPanel } from "@/components/site/google-maps-network-panel";
import { LearningOptions } from "@/components/site/learning-options";
import { MetricStrip } from "@/components/site/metric-strip";
import { NetworkVisual } from "@/components/site/network-visual";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SchoolComparisonTable } from "@/components/site/school-comparison-table";
import { SectionIntro } from "@/components/site/section-intro";
import { networkSummary, schools } from "@/data/schools";

const quietHeroLink =
  "min-h-0 w-auto justify-start px-0 py-1 text-left sm:min-h-11 sm:justify-center sm:px-5 sm:py-3";

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
      <PageHero
        eyebrow="School locations"
        title="Find the right Pushkin's School option for your family"
        aside={<NetworkVisual />}
        actions={
          <>
            <ButtonLink href="#location-explorer" icon={<MapPin className="size-4" />}>
              Explore locations
            </ButtonLink>
            <ButtonLink
              href="#compare-branches"
              variant="quiet"
              className={quietHeroLink}
              icon={<Search className="size-4" />}
            >
              Compare branches
            </ButtonLink>
          </>
        }
      >
        <p>
          Explore current weekend classes, register-interest areas, and online
          options for children learning Russian language, literature, and
          culture around England.
        </p>
      </PageHero>

      <section className="border-b border-border-soft bg-background/80 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <MetricStrip
            variant="quiet"
            metrics={[
              { label: "School locations", value: networkSummary.locations },
              { label: "Current in-person", value: openSchools.length },
              { label: "Counties covered", value: networkSummary.counties },
            ]}
          />
        </div>
      </section>

      <section
        id="location-explorer"
        className="scroll-mt-24 border-b border-border-soft bg-background site-section-compact"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Location guide"
            title="Choose by availability first, then by fit"
          >
            <p>
              The school network mixes one current weekend branch with towns
              where families can register local demand or ask about online
              learning. This guide keeps those routes separate before you
              enquire.
            </p>
          </SectionIntro>
          <div className="mt-8">
            <GoogleMapsNetworkPanel schools={schools} />
          </div>
        </div>
      </section>

      <section
        id="open-branches"
        className="scroll-mt-24 border-b border-border-soft bg-surface/90 site-section-compact"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Current availability"
              title="The practical order for a parent enquiry"
            >
              <p>
                Start with whether you need a current weekend place, want to
                signal future local demand, or need an online option. Then share
                the child&apos;s age, Russian confidence, and exam goals if relevant.
              </p>
            </SectionIntro>
            <div className="mt-7 border-l-4 border-brand-red bg-background px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                Best first step
              </p>
              <h2 className="mt-2 text-xl font-semibold text-brand-blue-strong">
                {currentSchool
                  ? `${currentSchool.name}: ${currentSchool.schedule}`
                  : "Weekend timetable confirmed by enquiry"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {currentSchool
                  ? `${currentSchool.venueName} is the current listed in-person branch. Use the wider list for register-interest areas and online options.`
                  : "Current in-person places and local venue details are confirmed directly through the school."}
              </p>
              <ButtonLink
                href={
                  currentSchool
                    ? `/schools/${currentSchool.slug}`
                    : "/contact#enquiry-form"
                }
                className="mt-5"
                icon={<ArrowRight className="size-4" />}
                iconPosition="end"
              >
                {currentSchool ? "View current branch" : "Start an enquiry"}
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              {
                label: "Current/open",
                icon: UsersRound,
                title: "Ask about a weekend place",
                body: currentSchool
                  ? `${currentSchool.name} is the current in-person branch. Check spaces, class fit, start date, and arrival details before attending.`
                  : "Ask the school which current weekend options are available.",
                href: currentSchool
                  ? currentSchool.bestNextSteps[0]?.href
                  : "/contact#enquiry-form",
                cta: "Ask about current places",
              },
              {
                label: "Register interest",
                icon: MapPin,
                title: "Signal demand for a local town",
                body: "Use this if you would attend future classes in High Wycombe, Hemel Hempstead, Chelmsford, Southend-on-Sea, or another listed area.",
                href: "/schools#compare-branches",
                cta: "Compare interest areas",
              },
              {
                label: "Online route",
                icon: Laptop,
                title: "Start sooner without a nearby branch",
                body: "Ask whether online lessons or exam-focused support would be more practical while local provision is not confirmed.",
                href: "/contact?intent=online-learning#enquiry-form",
                cta: "Ask about online learning",
              },
            ].map((item) => (
              <article
                key={item.label}
                className="border-l border-brand-gold bg-background px-5 py-4"
              >
                <div className="flex items-center gap-2">
                  <item.icon aria-hidden="true" className="size-4 text-brand-red" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                    {item.label}
                  </p>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-brand-blue-strong">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
                <Link
                  href={item.href ?? "/contact#enquiry-form"}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/35 hover:text-brand-red"
                >
                  <span>{item.cta}</span>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="compare-branches"
        className="scroll-mt-24 border-b border-border-soft bg-background site-section-compact"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Compare branches"
            title="One scan before you enquire"
          >
            <p>
              Current, online-only, and register-interest locations stay
              together so families can compare status, area, learning route,
              and the right next step without browsing separate branch pages
              first.
            </p>
          </SectionIntro>
          <div className="mt-8">
            <SchoolComparisonTable schools={schools} />
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface/90 site-section-compact">
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
                  href={school.bestNextSteps[0]?.href ?? `/schools/${school.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-background px-3 py-1.5 text-xs font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                >
                  <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                  <span>{school.name}: {school.bestNextSteps[0]?.ctaLabel ?? "View details"}</span>
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

      <PageCta
        eyebrow="Choosing a location"
        title="Send one useful enquiry about your preferred school"
        actions={
          <ButtonLink
            href="/contact#enquiry-form"
            variant="light"
            icon={<ArrowRight className="size-4" />}
            iconPosition="end"
          >
            Start an enquiry
          </ButtonLink>
        }
      >
        <p>
          Share your preferred area, child&apos;s age, current Russian level,
          and whether you are looking for current places or future classes.
        </p>
      </PageCta>
    </main>
  );
}
