import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/button-link";
import { DecisionPanel } from "@/components/site/decision-panel";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SchoolEvidencePanel } from "@/components/site/school-evidence-panel";
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
import { approvedMediaAssets, type MediaAsset } from "@/data/media-assets";
import { classGroups } from "@/data/schools";

const quietHeroLink =
  "min-h-0 w-auto justify-start px-0 py-1 text-left sm:min-h-11 sm:justify-center sm:px-5 sm:py-3";

const curriculumEvidenceAssets = getApprovedMediaByIds([
  "IMG-0008",
  "IMG-0035",
  "IMG-0207",
]);

const curriculumEvidenceNotes = [
  "Classroom materials, writing, and cultural work show the kind of work children actually meet.",
  "Families can picture the lesson rhythm before asking about the right class group.",
];

const learningJourneyNotes = [
  "Weekend classes keep Russian visible and usable beyond the home.",
  "Children are supported as bilingual learners, heritage speakers, beginners, or exam-focused pupils.",
  "Teachers can adjust the learning path when a child needs more confidence, more challenge, or a clearer qualification plan.",
];

const syllabusThreads = [
  "Speaking and listening",
  "Reading and writing",
  "Grammar and vocabulary",
  "Literature and culture",
  "Projects, performance, and celebration",
  "GCSE or A Level planning when relevant",
];

function getApprovedMediaByIds(ids: string[]) {
  return ids
    .map((id) => approvedMediaAssets.find((asset) => asset.id === id))
    .filter((asset): asset is MediaAsset => Boolean(asset));
}

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
            <SchoolEvidencePanel
              eyebrow="Learning evidence"
              title="Materials, writing, and culture shape the pathway"
              summary="Exercise books, cultural materials, and classroom moments make the syllabus feel less abstract for parents comparing routes."
              assets={curriculumEvidenceAssets}
              notes={curriculumEvidenceNotes}
            />
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
            <ButtonLink
              href="/contact#enquiry-form"
              variant="quiet"
              className={quietHeroLink}
            >
              Ask about placement
            </ButtonLink>
          </>
        }
      >
        <p>
          A parent-friendly syllabus pathway: what pupils build, how the work
          becomes more demanding, and what teachers look at before confirming a
          class.
        </p>
      </PageHero>

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Curriculum map"
              title="The same strands return at a deeper level each year"
            >
              <p>
                Pupils do not move through isolated topics. Each stage revisits
                the same core strands, with more independence in speaking,
                reading, writing, grammar, and cultural interpretation.
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
          <div className="grid gap-8">
            <div className="border-y border-border-soft py-6">
              <p className="text-sm font-semibold text-brand-blue-strong">
                Syllabus strands
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {syllabusThreads.map((thread) => (
                  <div key={thread} className="border-l border-brand-gold pl-4">
                    <p className="text-sm leading-6 text-slate-700">
                      {thread}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="divide-y divide-border-soft">
              {curriculumPillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className="grid gap-4 py-5 first:pt-0 last:pb-0 sm:grid-cols-[4rem_1fr]"
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
            title="A clearer route from first confidence to exam focus"
          >
            <p>
              These stages show the typical teaching emphasis. Exact class
              placement still depends on the child&apos;s current Russian, not
              age alone.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
            <aside className="border-l border-brand-gold pl-5">
              <p className="text-sm font-semibold text-brand-blue-strong">
                What changes as pupils progress
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Lessons move from supported oral confidence and early literacy
                towards longer reading, more accurate writing, explicit grammar,
                cultural texts, and qualification planning where needed.
              </p>
            </aside>
            <div className="divide-y divide-border-soft border-y border-border-soft">
            {curriculumProgressionStages.map((stage) => (
              <article
                key={stage.title}
                className="grid gap-6 py-6 lg:grid-cols-[0.72fr_1fr]"
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
                  <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
                    {stage.focusAreas.map((area) => (
                      <li key={area} className="border-l border-brand-gold pl-4">
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
            </div>
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
          <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
            {curriculumRouteRecommendations.map((route) => (
              <article
                key={route.title}
                className="grid gap-5 py-6 lg:grid-cols-[0.65fr_1fr_auto] lg:items-center"
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
