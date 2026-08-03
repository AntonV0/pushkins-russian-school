import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Laptop, MapPin, Search, UsersRound } from "lucide-react";
import {
  ButtonLink,
  quietHeroLinkClassName,
} from "@/components/site/button-link";
import { GoogleMapsNetworkPanel } from "@/components/site/google-maps-network-panel";
import { LearningOptions } from "@/components/site/learning-options";
import { MetricStrip } from "@/components/site/metric-strip";
import { NetworkVisual } from "@/components/site/network-visual";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SchoolComparisonTable } from "@/components/site/school-comparison-table";
import { SectionIntro } from "@/components/site/section-intro";
import { schoolProofPoints, schoolStory } from "@/data/public/school-story";
import { networkSummary, schools } from "@/data/public/schools";

export const metadata: Metadata = {
  title: "Schools",
  description:
    "Explore Pushkin's School's Russian language and culture heritage, current location areas, online options, and ways to join.",
  alternates: {
    canonical: "/schools",
  },
  openGraph: {
    title: "Pushkin's School Locations",
    description:
      "Explore Pushkin's School's Russian language and culture network, current locations, online options, and ways to join.",
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
        title="A Russian learning community across England"
        aside={<NetworkVisual />}
        actions={
          <>
            <ButtonLink href="#location-explorer" icon={<MapPin className="size-4" />}>
              See current locations
            </ButtonLink>
            <ButtonLink
              href="#compare-branches"
              variant="quiet"
              className={quietHeroLinkClassName}
              icon={<Search className="size-4" />}
            >
              Compare options
            </ButtonLink>
          </>
        }
      >
        <p>
          Since {schoolStory.foundedYear}, Pushkin&apos;s School has helped
          children keep Russian language, literature, culture, and confidence
          alive through a five-location supplementary school heritage, with
          Exeter now listed as a Devon area where details are being confirmed.
        </p>
      </PageHero>

      <section className="border-b border-border-soft bg-background/80 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <MetricStrip
            variant="quiet"
            metrics={[
              { label: "School areas", value: networkSummary.locations },
              { label: "Founded", value: schoolStory.foundedYear },
              { label: "Current in-person", value: openSchools.length },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionIntro
            eyebrow="School heritage"
            title="One curriculum, one cultural purpose, several local communities"
          >
            <p>
              The school network has included High Wycombe, Hemel Hempstead,
              Bracknell, Chelmsford, and Southend-on-Sea. Current local
              availability can change, but the educational purpose remains the
              same: balanced bilingualism, Russian literacy, culture,
              performance, and progression. Exeter is listed separately while
              the Devon provision is confirmed.
            </p>
          </SectionIntro>
          <div className="grid gap-4 sm:grid-cols-2">
            {schoolProofPoints.map((point) => (
              <article key={point.value} className="border-l border-brand-accent pl-5">
                <h2 className="text-lg font-semibold text-brand-blue-strong">
                  {point.value}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {point.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="location-explorer"
        className="scroll-mt-24 border-b border-border-soft bg-background site-section-compact"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Current ways to join"
            title="See the current locations and learning routes"
          >
            <p>
              This guide shows what is currently available: one listed
              in-person weekend branch, local interest areas, and online
              learning routes for families who want Russian to continue now.
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
              title="How to join now"
            >
              <p>
                Start with the route that fits your family now: a current
                weekend place, future local interest, or online learning. Then
                tell the school about your child&apos;s Russian and goals.
              </p>
            </SectionIntro>
            <div className="mt-7 border-l-4 border-brand-red bg-background px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                Current in-person branch
              </p>
              <h2 className="mt-2 text-xl font-semibold text-brand-blue-strong">
                {currentSchool
                  ? `${currentSchool.name}: ${currentSchool.schedule}`
                  : "Weekend timetable confirmed directly"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {currentSchool
                  ? `${currentSchool.venueName} is the current listed in-person branch. The wider list shows local interest areas and online options.`
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
                {currentSchool ? "View current branch" : "Tell us about your child"}
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              {
                label: "Current/open",
                icon: UsersRound,
                title: "Find a weekend place",
                body: currentSchool
                  ? `${currentSchool.name} is the current in-person branch. Check spaces, class fit, start date, and arrival details before attending.`
                  : "Ask the school which current weekend options are available.",
                href: currentSchool
                  ? currentSchool.bestNextSteps[0]?.href
                  : "/contact#enquiry-form",
                cta: "Ask about joining",
              },
              {
                label: "Register interest",
                icon: MapPin,
                title: "Ask about a local town",
                body: "Use this if you would attend future classes in High Wycombe, Hemel Hempstead, Chelmsford, Southend-on-Sea, or another listed area.",
                href: "/schools#compare-branches",
                cta: "See local areas",
              },
              {
                label: "Online route",
                icon: Laptop,
                title: "Keep learning without a nearby branch",
                body: "Ask whether online lessons or exam-focused support would be more practical while local provision is not confirmed.",
                href: "/contact?intent=online-learning#enquiry-form",
                cta: "Ask about online learning",
              },
            ].map((item) => (
              <article
                key={item.label}
                className="border-l border-brand-accent bg-background px-5 py-4"
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
            title="Compare locations without losing the school story"
          >
            <p>
              Current, online-only, and register-interest locations stay
              together so families can compare status, area, learning route,
              and the right next step.
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
              {otherSchools.length} towns remain part of the local school story
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Families outside the current weekend branch can still signal
              demand, ask about online learning, and discuss Russian language,
              culture, or a Volna route for GCSE and A Level Russian.
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
            intro="Families can register interest locally, ask about online lessons, or use Volna for GCSE and A Level Russian while keeping learning moving."
            compact
          />
        </div>
      </section>

      <PageCta
        eyebrow="Choosing a location"
        title="Tell us about your child and the area that works for your family"
        actions={
          <ButtonLink
            href="/contact#enquiry-form"
            variant="light"
            icon={<ArrowRight className="size-4" />}
            iconPosition="end"
          >
            Tell us about your child
          </ButtonLink>
        }
      >
        <p>
          Share your preferred area, child&apos;s age, current Russian level,
          and whether you are looking for current classes, future local
          provision, online learning, or exam support.
        </p>
      </PageCta>
    </main>
  );
}
