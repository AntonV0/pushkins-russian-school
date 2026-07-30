import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  MapPin,
} from "lucide-react";
import {
  ButtonLink,
  quietHeroLinkClassName,
} from "@/components/site/button-link";
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
} from "@/data/public/curriculum";
import { schoolLifeHighlights, schoolStory } from "@/data/public/school-story";
import { approvedMediaAssets, type MediaAsset } from "@/features/gallery/data/media-assets";
import { classGroups } from "@/data/public/schools";

const curriculumEvidenceAssets = getApprovedMediaByIds([
  "IMG-0008",
  "IMG-0035",
  "IMG-0207",
]);

const curriculumEvidenceNotes = [
  "Classroom materials, writing, and cultural work show the kind of Russian children actually meet.",
  "Families can picture a pathway from everyday Russian to literacy, literature, cultural confidence, and stronger communication.",
];

const learningJourneyNotes = [
  "Weekend classes keep Russian visible and usable beyond the home.",
  "Children are supported as bilingual learners, heritage speakers, beginners, or exam-focused pupils.",
  "The curriculum is shaped by Moscow-linked expertise and textbooks designed for children brought up in the UK.",
  "Teachers can adjust the learning path when a child needs more confidence, more challenge, or a clearer next step.",
];

const syllabusThreads = [
  "Speaking and listening",
  "Reading and writing",
  "Grammar and vocabulary",
  "Literature and culture",
  "Projects, performance, and celebration",
  "Guidance towards Volna when GCSE or A Level Russian is the goal",
];

function getApprovedMediaByIds(ids: string[]) {
  return ids
    .map((id) => approvedMediaAssets.find((asset) => asset.id === id))
    .filter((asset): asset is MediaAsset => Boolean(asset));
}

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "Explore Pushkin's School curriculum for balanced bilingualism, Russian language, literature, culture, performances, and guidance towards Volna for exam routes.",
  alternates: {
    canonical: "/curriculum",
  },
  openGraph: {
    title: "Curriculum | Pushkin's School",
    description:
      "Balanced bilingualism, Russian language, culture, literature, performances, and clear guidance towards Volna for GCSE or A Level Russian.",
    url: "/curriculum",
  },
};

export default function CurriculumPage() {
  return (
    <main>
      <PageHero
        eyebrow="Curriculum"
        title="Balanced bilingualism, Russian literature, and confident progression"
        asideAlign="start"
        aside={
          <div className="grid content-start gap-4">
            <SchoolEvidencePanel
              devPageId="curriculum"
              eyebrow="Learning evidence"
              title="Materials, writing, and culture shape the pathway"
              summary="Exercise books, cultural materials, and classroom moments show how pupils build practical Russian, literacy, and cultural confidence."
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
            <ButtonLink href="/schools" icon={<MapPin className="size-4" />}>
              See current locations
            </ButtonLink>
            <ButtonLink
              href="/contact#enquiry-form"
              variant="quiet"
              className={quietHeroLinkClassName}
              icon={<ClipboardCheck className="size-4" />}
            >
              Ask about placement
            </ButtonLink>
          </>
        }
      >
        <p>
          {schoolStory.philosophy} The curriculum connects practical Russian,
          grammar, reading, writing, literature, theatre, culture, and visible
          class progress.
        </p>
      </PageHero>

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Curriculum map"
              title="A connected pathway for children growing up in the UK"
            >
              <p>
                {schoolStory.curriculum} Pupils do not move through isolated
                topics. Each stage revisits the same core strands with more
                independence in speaking, reading, writing, grammar, and
                cultural interpretation.
              </p>
            </SectionIntro>
            <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-700">
              {learningJourneyNotes.map((note) => (
                <li
                  key={note}
                  className="flex gap-2 border-l border-brand-accent bg-surface px-4 py-3"
                >
                  <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                  <span>{note}</span>
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
                  <div key={thread} className="border-l border-brand-accent pl-4">
                    <p className="flex gap-2 text-sm leading-6 text-slate-700">
                      <BookOpen aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                      {thread}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="divide-y divide-border-soft">
              {curriculumPillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="grid gap-4 py-5 first:pt-0 last:pb-0 sm:grid-cols-[4rem_1fr]"
                >
                  <GraduationCap aria-hidden="true" className="size-5 text-brand-red" />
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
              placement depends on the child&apos;s current Russian, not age
              alone.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
            <aside className="border-l border-brand-accent pl-5">
              <p className="text-sm font-semibold text-brand-blue-strong">
                What changes as pupils progress
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Lessons move from supported oral confidence and early literacy
                towards longer reading, more accurate writing, explicit grammar,
                cultural texts, Pushkin and Russian literature, and clear
                next-step guidance where needed.
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
                      <li key={area} className="border-l border-brand-accent pl-4">
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
              picture of the child&apos;s Russian before recommending the best
              group or learning option.
            </p>
          </SectionIntro>
          <div className="relative border-l border-brand-accent pl-6">
            {placementSteps.map((step, index) => (
              <article key={step.title} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[2.05rem] top-1 flex size-5 items-center justify-center rounded-full border border-brand-accent bg-surface">
                  <ClipboardCheck aria-hidden="true" className="size-3 text-brand-red" />
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
              Parents do not need perfect answers. These prompts simply help
              the school understand the child&apos;s Russian life now.
            </p>
          </div>
          <DecisionPanel
            eyebrow="Placement prompts"
            title="A few details help us understand your child"
          >
            <ul className="divide-y divide-border-soft">
              {placementSignals.map((signal) => (
                <li
                  key={signal}
                  className="py-3 text-sm leading-6 text-slate-700 first:pt-0 last:pb-0"
                >
                  <span className="flex gap-2">
                    <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                    <span>{signal}</span>
                  </span>
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
            title="Local school, online lessons, or exam-focused support"
            tone="dark"
          >
            <p>
              The strongest pathway is the one that matches the family&apos;s
              location, child&apos;s Russian level, and goal. These options keep
              Pushkin&apos;s School and Volna Online Russian School connected but
              distinct.
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
                  <ButtonLink
                    href={route.href}
                    variant="light"
                    icon={<ArrowRight className="size-4" />}
                    iconPosition="end"
                  >
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
              Performances, class progress, and the Pushkin pathway
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {schoolStory.pushkin} {schoolStory.culturalLife}{" "}
              {schoolStory.progression}
            </p>
          </div>
          <div className="rounded-lg border border-border-soft bg-surface p-5">
            <ul className="divide-y divide-border-soft">
              {[
                ...curriculumMaterials,
                ...schoolLifeHighlights,
                ...curriculumReviewNotes,
                ...curriculumDetailsPendingReview.map(
                  (item) => `${item.title}: ${item.body}`,
                ),
              ].map((item) => (
                <li
                  key={item}
                  className="py-3 text-sm leading-6 text-slate-700 first:pt-0 last:pb-0"
                >
                  <span className="flex gap-2">
                    <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                    <span>{item}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Curriculum next step"
        title="Find the right class for your child's Russian now"
        tone="light"
        actions={
          <>
            <ButtonLink
              href="/contact#enquiry-form"
              icon={<ClipboardCheck className="size-4" />}
            >
              Tell us about your child
            </ButtonLink>
            <ButtonLink
              href="/admissions"
              variant="secondary"
              icon={<ArrowRight className="size-4" />}
              iconPosition="end"
            >
              Admissions and fees
            </ButtonLink>
          </>
        }
      />
    </main>
  );
}
