import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/button-link";
import { LearningOptions } from "@/components/site/learning-options";
import { SectionIntro } from "@/components/site/section-intro";
import {
  curriculumDetailsPendingReview,
  curriculumMaterials,
  curriculumPillars,
  curriculumProgressionStages,
  curriculumReviewNotes,
  curriculumRouteRecommendations,
  placementSignals,
  placementSteps,
} from "@/data/curriculum";
import { classGroups } from "@/data/schools";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "Explore Pushkin's School curriculum pathways, class placement guidance, Russian language learning, culture, and exam preparation.",
  alternates: {
    canonical: "/curriculum",
  },
  openGraph: {
    title: "Curriculum | Pushkin's School",
    description:
      "Russian language, culture, literature, and exam preparation pathways across the Pushkin's School network.",
    url: "/curriculum",
  },
};

export default function CurriculumPage() {
  return (
    <main>
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Curriculum
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
              Russian language learning with culture, confidence, and clear
              progression
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              A parent-friendly view of the pathway: enough structure to choose
              the right next step, with space for teachers to place each child
              thoughtfully after learning more about their Russian.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/schools">Choose a branch</ButtonLink>
              <ButtonLink href="/contact#enquiry-form" variant="secondary">
                Ask about placement
              </ButtonLink>
            </div>
          </div>
          <div className="grid content-start gap-3">
            {classGroups.map((group) => (
              <div
                key={group}
                className="border-l-4 border-brand-gold bg-background px-5 py-4"
              >
                <p className="text-sm font-semibold text-brand-blue-strong">
                  {group}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Pathways"
            title="Three outcomes parents can understand quickly"
          >
            <p>
              This page keeps the promise clear: confidence in Russian, a
              stronger connection to culture, and the right level of exam
              guidance when qualifications become the goal.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {curriculumPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-lg border border-border-soft bg-surface p-6"
              >
                <h2 className="text-xl font-semibold text-brand-blue-strong">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Progression"
            title="A simple journey from first confidence to exam focus"
          >
            <p>
              The detailed class-by-class curriculum still needs headteacher
              review. Until then, these high-level stages help parents see where
              their child may fit without treating age as the only factor.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {curriculumProgressionStages.map((stage) => (
              <article
                key={stage.title}
                className="rounded-lg border border-border-soft bg-background p-6"
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
                <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-700">
                  {stage.focusAreas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <SectionIntro
            eyebrow="Placement"
            title="A careful start for new pupils"
          >
            <p>
              Placement is not just a form field. The school needs a rounded
              picture of the child&apos;s Russian before confirming the best
              group or recommending a different learning route.
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

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              What helps teachers place a child well
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Parents do not need perfect answers before enquiring. These
              prompts simply make the first conversation more useful.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {placementSignals.map((signal) => (
              <div
                key={signal}
                className="border-l border-brand-gold bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
              >
                {signal}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-brand-blue-strong py-14 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Choosing the route"
            title="Local school, online lessons, or GCSE self-study"
            tone="dark"
          >
            <p>
              The strongest enquiry path is the one that matches the family&apos;s
              location and goal. These routes keep Pushkin&apos;s School, Volna
              Online Russian School, and GCSERussian.com connected but distinct.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {curriculumRouteRecommendations.map((route) => (
              <article
                key={route.title}
                className="rounded-lg border border-white/15 bg-white/10 p-6"
              >
                <h2 className="text-xl font-semibold text-white">
                  {route.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  {route.bestWhen}
                </p>
                <p className="mt-4 text-sm leading-6 text-white/75">
                  {route.recommendation}
                </p>
                <div className="mt-6">
                  <ButtonLink href={route.href} variant="light">
                    {route.ctaLabel}
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <LearningOptions
            eyebrow="Learning network"
            title="Three connected options for different family needs"
            intro="Families can start with local weekend classes, ask about online support when distance is a barrier, or choose a GCSE-focused route when exam preparation is the main priority."
            compact
          />
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Details still waiting for review
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The page is deliberately useful without pretending the full
              teaching scheme has been approved for publication. These details
              can be added later once the headteacher confirms them.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ...curriculumMaterials,
              ...curriculumReviewNotes,
              ...curriculumDetailsPendingReview.map(
                (item) => `${item.title}: ${item.body}`,
              ),
            ].map((item) => (
              <div
                key={item}
                className="border-l border-brand-gold bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
