import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { LearningOptions } from "@/components/site/learning-options";
import { MetricStrip } from "@/components/site/metric-strip";
import { NetworkVisual } from "@/components/site/network-visual";
import { SchoolCard } from "@/components/site/school-card";
import { SectionIntro } from "@/components/site/section-intro";
import { TrustSignals } from "@/components/site/trust-signals";
import { admissionsSteps } from "@/data/admissions";
import { contactDetails } from "@/data/contact";
import {
  curriculumPillars,
  curriculumProgressionStages,
  placementSteps,
} from "@/data/curriculum";
import { learningOptionSummary } from "@/data/learning-options";
import { networkSummary, schools } from "@/data/schools";
import { siteConfig } from "@/data/site";

const openSchools = schools.filter((school) => school.status === "open");
const interestSchools = schools.filter((school) => school.status !== "open");
const featuredSchools = [...openSchools, ...interestSchools].slice(0, 3);

export const metadata: Metadata = {
  title: "Pushkin's School | Russian Language School Network",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pushkin's School | Russian Language School Network",
    description: siteConfig.description,
    url: "/",
  },
};

export default function Home() {
  return (
    <main>
      <section className="border-b border-border-soft bg-surface">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[0.98fr_1.02fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Russian language, culture, and exam preparation
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.04] text-brand-blue-strong sm:text-6xl">
              Pushkin&apos;s School
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A warm, academically focused weekend school network for families
              raising children with Russian language, literature, culture, and
              exam goals.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              Current in-person teaching is centred on active hubs, while wider
              network areas stay open for online learning and future local
              interest.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/schools">Find your school</ButtonLink>
              <ButtonLink href="/contact#enquiry-form" variant="secondary">
                {contactDetails.registrationCta}
              </ButtonLink>
            </div>
            <div className="mt-10">
              <MetricStrip
                metrics={[
                  { label: "Locations", value: networkSummary.locations },
                  { label: "Current hubs", value: openSchools.length },
                  {
                    label: "Online / interest",
                    value: interestSchools.length,
                  },
                ]}
              />
            </div>
          </div>

          <NetworkVisual />
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Local branches"
            title="Start with the nearest route, then choose the next step"
          >
            <p>
              Every network area has its own page so families can see the
              current route: a weekend school place, an online-only path, or
              register-interest option for future local classes.
            </p>
          </SectionIntro>

          <div className="mt-8 grid gap-3 text-sm leading-6 text-slate-600 md:grid-cols-3">
            <div className="border-l-4 border-emerald-500 bg-surface px-4 py-3">
              <p className="font-semibold text-brand-blue-strong">
                Current weekend hub
              </p>
              <p>Ask about current places and class fit.</p>
            </div>
            <div className="border-l-4 border-sky-500 bg-surface px-4 py-3">
              <p className="font-semibold text-brand-blue-strong">
                Online-only network areas
              </p>
              <p>Keep learning while local demand rebuilds.</p>
            </div>
            <div className="border-l-4 border-zinc-300 bg-surface px-4 py-3">
              <p className="font-semibold text-brand-blue-strong">
                Future local interest
              </p>
              <p>Register interest to support possible reopening.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredSchools.map((school) => (
              <SchoolCard key={school.slug} school={school} />
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 border-l-4 border-brand-gold bg-surface px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-slate-600">
              The full schools page keeps the current hub and wider online-only
              network areas together for a direct comparison.
            </p>
            <Link
              href="/schools"
              className="text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
            >
              View all school locations
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <TrustSignals
            align="center"
            intro="Families can check the shape of the school network, curriculum, and policy structure before they enquire, with stronger proof points added only after review."
          />
        </div>
      </section>

      <section className="border-b border-border-soft bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <LearningOptions
            intro={`${learningOptionSummary} Families can start with a local branch, move online when distance is a barrier, or choose focused GCSE self-study support.`}
          />
        </div>
      </section>

      <section className="bg-brand-blue-strong py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionIntro
            eyebrow="Learning approach"
            title="Structured, stimulating, and easy for parents to understand"
            tone="dark"
          >
            <p>
              The curriculum page gives parents a clear route into language
              confidence, cultural connection, and exam-aware progression while
              detailed class guidance remains easy to update.
            </p>
          </SectionIntro>

          <div className="grid gap-4 md:grid-cols-3">
            {curriculumPillars.map((pathway) => (
              <article
                key={pathway.title}
                className="rounded-lg border border-white/15 bg-white/10 p-5"
              >
                <h2 className="text-lg font-semibold text-white">
                  {pathway.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  {pathway.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <SectionIntro
            eyebrow="Class placement"
            title="A thoughtful route into the right group"
          >
            <p>
              The rebuilt site now separates parent enquiry, teacher placement,
              and first-weeks review so the process feels clear without making
              promises that still need school confirmation.
            </p>
          </SectionIntro>
          <div className="grid gap-4 md:grid-cols-3">
            {placementSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-lg border border-border-soft bg-background p-5"
              >
                <p className="font-mono text-sm font-semibold text-brand-red">
                  0{index + 1}
                </p>
                <h2 className="mt-4 text-lg font-semibold text-brand-blue-strong">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Progression"
            title="From first confidence to exam preparation"
            align="center"
          >
            <p>
              Families do not need to diagnose the perfect level before
              enquiring. The pathway is designed to help parents describe the
              child&apos;s current confidence and goals, then choose the right
              next step.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {curriculumProgressionStages.map((stage) => (
              <article
                key={stage.title}
                className="rounded-lg border border-border-soft bg-surface p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
                  {stage.audience}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-brand-blue-strong">
                  {stage.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {stage.parentValue}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/curriculum" variant="secondary">
              Explore curriculum pathways
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Parent journey"
            title="From branch choice to a useful enquiry"
            align="center"
          >
            <p>
              The enquiry path is designed to help families share the details
              the school needs, with practical status notes where branch details
              need final confirmation.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {admissionsSteps.map((item, index) => (
              <article
                key={item.title}
                className="rounded-lg border border-border-soft bg-background p-6"
              >
                <p className="font-mono text-sm font-semibold text-brand-red">
                  0{index + 1}
                </p>
                <h2 className="mt-4 text-xl font-semibold text-brand-blue-strong">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Ready to start?
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-brand-blue-strong sm:text-4xl">
              Ask about current classes or register interest in a future local
              branch
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-end">
            <ButtonLink href="/contact#enquiry-form">
              Start an enquiry
            </ButtonLink>
            <ButtonLink href="/admissions" variant="secondary">
              Admissions and fees
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
