import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/button-link";
import { DecisionPanel } from "@/components/site/decision-panel";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SectionIntro } from "@/components/site/section-intro";
import { VisualStoryPanel } from "@/components/site/visual-story-panel";
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
import { getVisualPlaceholderSlot } from "@/data/media-assets";
import { classGroups } from "@/data/schools";

const curriculumVisual = getVisualPlaceholderSlot("curriculum-culture-shelf");

const learningJourneyNotes = [
  "Weekend classes keep Russian visible and usable beyond the home.",
  "Children are supported as bilingual learners, heritage speakers, beginners, or exam-focused pupils.",
  "Teachers can adjust the learning path when a child needs more confidence, more challenge, or a clearer qualification plan.",
];

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
      "Russian language, culture, literature, and exam preparation pathways across Pushkin's School locations.",
    url: "/curriculum",
  },
};

export default function CurriculumPage() {
  return (
    <main>
      <PageHero
        eyebrow="Curriculum"
        title="Russian language learning with culture, confidence, and clear progression"
        asideAlign="start"
        aside={
          <div className="grid content-start gap-4">
            {curriculumVisual ? (
              <VisualStoryPanel slot={curriculumVisual} compact />
            ) : null}
            <div className="rounded-lg border border-border-soft bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                Class pathway
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {classGroups.map((group) => (
                  <span
                    key={group}
                    className="rounded-full border border-brand-blue/15 px-3 py-2 text-xs font-semibold text-brand-blue-strong"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          </div>
        }
        actions={
          <>
            <ButtonLink href="/schools">Choose a branch</ButtonLink>
            <ButtonLink href="/contact#enquiry-form" variant="secondary">
              Ask about placement
            </ButtonLink>
          </>
        }
      >
        <p>
          A parent-friendly view of the pathway: enough structure to choose the
          right next step, with space for teachers to place each child
          thoughtfully after learning more about their Russian.
        </p>
      </PageHero>

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Learning promise"
              title="A curriculum that moves from confidence to independence"
            >
              <p>
                The curriculum is framed as a progression parents can
                understand: children start by using Russian more comfortably,
                then build literacy and cultural knowledge, with exam planning
                introduced when it becomes relevant.
              </p>
            </SectionIntro>
            <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-700">
              {learningJourneyNotes.map((note) => (
                <li
                  key={note}
                  className="border-l border-brand-gold bg-surface px-4 py-3"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <div className="premium-panel rounded-lg border border-border-soft bg-surface p-6 sm:p-8">
            <div className="divide-y divide-border-soft">
              {curriculumPillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className="grid gap-4 py-6 first:pt-0 last:pb-0 sm:grid-cols-[4rem_1fr]"
                >
                  <p className="font-mono text-sm font-semibold text-brand-red">
                    0{index + 1}
                  </p>
                  <div>
                    <h2 className="text-xl font-semibold text-brand-blue-strong">
                      {pillar.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {pillar.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Progression"
            title="A simple journey from first confidence to exam focus"
          >
            <p>
              These high-level stages help parents see where their child may
              fit, while detailed class plans remain part of teacher-led
              placement rather than a promise based only on age.
            </p>
          </SectionIntro>
          <div className="mt-10 overflow-hidden rounded-lg border border-border-soft bg-background">
            {curriculumProgressionStages.map((stage) => (
              <article
                key={stage.title}
                className="grid gap-6 border-b border-border-soft p-6 last:border-b-0 lg:grid-cols-[0.75fr_1fr]"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
                    {stage.audience}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
                    {stage.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {stage.parentValue}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-blue-strong">
                    Typical focus
                  </p>
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {stage.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="border-l border-brand-gold bg-surface px-4 py-3"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <SectionIntro
            eyebrow="Placement"
            title="A careful start for new pupils"
          >
            <p>
              Placement is not just a form field. The school needs a rounded
              picture of the child&apos;s Russian before confirming the best
              group or recommending a different learning option.
            </p>
          </SectionIntro>
          <div className="relative border-l border-brand-gold pl-6">
            {placementSteps.map((step, index) => (
              <article key={step.title} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[2.05rem] top-1 flex size-5 items-center justify-center rounded-full border border-brand-gold bg-surface">
                  <span className="size-2 rounded-full bg-brand-red" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                  Placement {index + 1}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-brand-blue-strong">
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

      <section className="bg-background site-section-compact">
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
          <DecisionPanel
            eyebrow="Placement prompts"
            title="You do not need perfect answers before enquiring"
          >
            <ul className="divide-y divide-border-soft">
              {placementSignals.map((signal) => (
                <li
                  key={signal}
                  className="py-3 text-sm leading-6 text-slate-700 first:pt-0 last:pb-0"
                >
                  {signal}
                </li>
              ))}
            </ul>
          </DecisionPanel>
        </div>
      </section>

      <section className="border-y border-border-soft bg-brand-blue-strong site-section-compact text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Choosing the pathway"
            title="Local school, online lessons, or GCSE self-study"
            tone="dark"
          >
            <p>
              The strongest enquiry path is the one that matches the
              family&apos;s location and goal. These options keep Pushkin&apos;s
              School, Volna Online Russian School, and GCSERussian.com connected
              but distinct.
            </p>
          </SectionIntro>
          <div className="mt-10 overflow-hidden rounded-lg border border-white/15">
            {curriculumRouteRecommendations.map((route) => (
              <article
                key={route.title}
                className="grid gap-5 border-b border-white/15 bg-white/10 p-6 last:border-b-0 lg:grid-cols-[0.65fr_1fr_auto] lg:items-center"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                    Option
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    {route.title}
                  </h2>
                </div>
                <div className="grid gap-4 text-sm leading-6 text-white/75 md:grid-cols-2">
                  <p>{route.bestWhen}</p>
                  <p>{route.recommendation}</p>
                </div>
                <div className="lg:justify-self-end">
                  <ButtonLink href={route.href} variant="light">
                    {route.ctaLabel}
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              More detail as families need it
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The curriculum is useful for parents at enquiry stage, and the
              school can share more detailed teaching schemes, named materials,
              and branch-specific notes where they are relevant.
            </p>
          </div>
          <div className="rounded-lg border border-border-soft bg-surface p-5">
            <ul className="divide-y divide-border-soft">
              {[
                ...curriculumMaterials,
                ...curriculumReviewNotes,
                ...curriculumDetailsPendingReview.map(
                  (item) => `${item.title}: ${item.body}`,
                ),
              ].map((item) => (
                <li
                  key={item}
                  className="py-3 text-sm leading-6 text-slate-700 first:pt-0 last:pb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Curriculum next step"
        title="Ask which pathway fits your child's Russian now"
        tone="light"
        actions={
          <>
            <ButtonLink href="/contact#enquiry-form">Ask about placement</ButtonLink>
            <ButtonLink href="/admissions" variant="secondary">
              Admissions and fees
            </ButtonLink>
          </>
        }
      />
    </main>
  );
}
