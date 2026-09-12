import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
} from "lucide-react";
import {
  ButtonLink,
  quietHeroLinkClassName,
} from "@/components/site/button-link";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SchoolEvidencePanel } from "@/components/site/school-evidence-panel";
import { SectionIntro } from "@/components/site/section-intro";
import {
  curriculumDetailsPendingReview,
  curriculumMaterials,
  curriculumProgressionStages,
  curriculumReviewNotes,
  curriculumRouteRecommendations,
  placementSignals,
  placementSteps,
} from "@/data/public/curriculum";
import { classGroups } from "@/data/public/schools";
import { schoolStory } from "@/data/public/school-story";
import {
  approvedMediaAssets,
  type MediaAsset,
} from "@/features/gallery/data/media-assets";

const curriculumEvidenceAssets = getApprovedMediaByIds([
  "IMG-0008",
  "IMG-0035",
  "IMG-0207",
]);

const curriculumEvidenceNotes = [
  "Classroom materials, writing, and cultural work show the kind of Russian children actually meet.",
  "Families can picture a pathway from everyday Russian to literacy, literature, cultural confidence, and stronger communication.",
];

const curriculumStrands = [
  {
    label: "Core focus",
    title: "Russian for real communication",
    body: "Children build speaking and listening through conversation, shared activities and everyday situations, alongside vocabulary and grammar that help them use Russian more independently.",
  },
  {
    label: "Literacy",
    title: "Structured reading and writing",
    body: "Reading, writing, vocabulary and grammar develop progressively, with teaching adapted to the pupil's current Russian rather than age alone.",
  },
  {
    label: "Context",
    title: "Literature and culture",
    body: "Stories, poetry, Pushkin, theatre, traditions, celebrations and creative work help Russian feel meaningful, social and lived-in.",
  },
] as const;

const syllabusThreads = [
  "Speaking and listening",
  "Reading and writing",
  "Grammar and vocabulary",
  "Literature and culture",
  "Projects, performance, and celebration",
  "Guidance towards Volna when GCSE or A Level Russian is the goal",
];

const learningJourneyNotes = [
  "Weekend classes keep Russian visible and usable beyond the home.",
  "Children are supported as bilingual learners, heritage speakers, beginners, or pupils developing stronger literacy.",
  "The curriculum is shaped by specialist expertise and textbooks designed for children brought up in the UK.",
  "Teachers can adjust the learning path when a child needs more confidence, more challenge, or a clearer next step.",
];

const curriculumFutureSections = [
  ...curriculumDetailsPendingReview,
  {
    title: "A sample lesson journey",
    body: "A visual example could show how conversation, literacy, grammar and cultural work connect during one typical school day.",
  },
  {
    title: "Materials parents can recognise",
    body: `${curriculumReviewNotes.join(" ")} Approved examples of books, writing and projects could make the learning pathway easier to picture.`,
  },
] as const;

function getApprovedMediaByIds(ids: string[]) {
  return ids
    .map((id) => approvedMediaAssets.find((asset) => asset.id === id))
    .filter((asset): asset is MediaAsset => Boolean(asset));
}

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "Explore Pushkin's School curriculum for balanced bilingualism, Russian language, literature, culture, performances, and guidance towards Volna for GCSE or A Level Russian.",
  alternates: { canonical: "/curriculum" },
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
        title="How children build confident, lasting Russian"
        asideAlign="start"
        aside={
          <div className="grid content-start gap-4">
            <SchoolEvidencePanel
              devPageId="curriculum"
              eyebrow="Learning evidence"
              title="Materials, writing, and culture shape the pathway"
              summary="Exercise books, cultural materials, and classroom moments show how pupils build practical Russian, literacy, and cultural understanding."
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
              See school locations
            </ButtonLink>
            <ButtonLink
              href="/contact#enquiry-form"
              variant="quiet"
              className={quietHeroLinkClassName}
              icon={<ClipboardCheck className="size-4" />}
            >
              Start registration
            </ButtonLink>
          </>
        }
      >
        <p>
          {schoolStory.philosophy}{" "}The curriculum connects practical Russian,
          grammar, reading, writing, literature, theatre, culture, and visible
          class progress.
        </p>
      </PageHero>

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Curriculum map"
              title="A connected pathway for children growing up in the UK"
            >
              <p>
                {schoolStory.curriculum}{" "}Pupils revisit the same core strands
                with increasing independence, rather than moving through
                isolated topics.
              </p>
            </SectionIntro>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-700">
              {schoolStory.materials}
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-brand-blue/15 bg-surface">
            <article className="grid gap-4 border-b border-brand-blue/15 bg-surface-blue/70 px-6 py-7 sm:grid-cols-[7rem_1fr] sm:gap-7 sm:px-7 sm:py-8">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-red">
                {curriculumStrands[0].label}
              </p>
              <div>
                <h2 className="text-2xl font-semibold text-brand-blue-strong">
                  {curriculumStrands[0].title}
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {curriculumStrands[0].body}
                </p>
              </div>
            </article>
            <div className="divide-y divide-brand-blue/12 md:grid md:grid-cols-2 md:divide-x md:divide-y-0">
              {curriculumStrands.slice(1).map((strand) => (
                <article key={strand.title} className="px-6 py-7 sm:px-7 sm:py-8">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-red">
                    {strand.label}
                  </p>
                  <h2 className="mt-4 text-xl font-semibold text-brand-blue-strong">
                    {strand.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {strand.body}
                  </p>
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
            title="The emphasis develops as each child grows"
          >
            <p>
              These stages describe a typical learning journey. Exact placement
              depends on the child&apos;s current Russian, experience and goals,
              not age alone.
            </p>
          </SectionIntro>
          <div className="mt-10 divide-y divide-border-soft border-y border-border-soft">
            {curriculumProgressionStages.map((stage) => (
              <article
                key={stage.title}
                className="grid gap-6 py-7 lg:grid-cols-[0.72fr_1fr]"
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
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-3">
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
      </section>

      <section className="bg-background site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionIntro
              eyebrow="Teaching in practice"
              title="Language, literacy and culture are taught together"
            >
              <p>
                {schoolStory.pushkin}{" "}Class feedback, teacher encouragement,
                creative work and visible progress help pupils feel proud of
                their Russian and ready for the next stage.
              </p>
            </SectionIntro>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-brand-blue-strong">
                  Curriculum threads
                </p>
                <ul className="mt-4 divide-y divide-border-soft border-y border-border-soft">
                  {syllabusThreads.map((thread) => (
                    <li key={thread} className="flex gap-3 py-3 text-sm leading-6 text-slate-700">
                      <BookOpen
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-brand-red"
                      />
                      <span>{thread}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-blue-strong">
                  What supports the journey
                </p>
                <ul className="mt-4 divide-y divide-border-soft border-y border-border-soft">
                  {learningJourneyNotes.map((note) => (
                    <li key={note} className="flex gap-3 py-3 text-sm leading-6 text-slate-700">
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-brand-red"
                      />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 grid gap-4 border-t border-border-soft pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {curriculumMaterials.map((item) => (
              <p
                key={item}
                className="border-l border-brand-accent pl-4 text-sm leading-6 text-slate-600"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <SectionIntro
            eyebrow="Starting point"
            title="Teachers begin with the Russian a child has now"
          >
            <p>
              Parents do not need to diagnose a class themselves. A rounded
              picture of speaking, understanding, reading, writing and home
              language helps the school recommend a sensible starting point.
            </p>
          </SectionIntro>
          <div>
            <ol className="divide-y divide-border-soft border-y border-border-soft">
              {placementSteps.map((step, index) => (
                <li key={step.title} className="grid gap-4 py-5 sm:grid-cols-[5rem_1fr]">
                  <p className="font-mono text-sm font-semibold text-brand-red">
                    0{index + 1}
                  </p>
                  <div>
                    <h2 className="text-xl font-semibold text-brand-blue-strong">
                      {step.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-7 flex flex-wrap gap-2">
              {placementSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-brand-blue/15 bg-background px-3 py-2 text-xs font-semibold text-brand-blue-strong"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-brand-blue-strong site-section-compact text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Choose the next step"
            title="Weekend school, online lessons, or exam-focused support"
            tone="dark"
          >
            <p>
              Pushkin&apos;s School provides the weekend language and cultural
              pathway. Volna remains a separate route for online learning and
              focused GCSE or A Level Russian preparation.
            </p>
          </SectionIntro>
          <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
            {curriculumRouteRecommendations.map((route) => (
              <article
                key={route.title}
                className="grid gap-5 py-6 lg:grid-cols-[0.65fr_1fr_auto] lg:items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {route.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {route.bestWhen}
                  </p>
                </div>
                <p className="text-sm leading-6 text-white/75">
                  {route.recommendation}
                </p>
                <ButtonLink
                  href={route.href}
                  variant="light"
                  icon={<ArrowRight className="size-4" />}
                  iconPosition="end"
                >
                  {route.ctaLabel}
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Curriculum next step"
        title="Choose where your child's Russian journey continues"
        tone="light"
        actions={
          <>
            <ButtonLink
              href="/contact#enquiry-form"
              icon={<ClipboardCheck className="size-4" />}
            >
              Start registration
            </ButtonLink>
            <ButtonLink
              href="/schools"
              variant="secondary"
              icon={<MapPin className="size-4" />}
            >
              Compare school locations
            </ButtonLink>
          </>
        }
      >
        <p>
          Share your child&apos;s age and present experience with Russian, or
          explore Bracknell and Exeter before beginning registration.
        </p>
      </PageCta>

      {process.env.NODE_ENV === "development" ? (
      <section className="border-t border-border-soft bg-surface-blue/35 site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-brand-red/20 bg-white/70 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-brand-red">
            Temporary planning section
          </p>
          <div className="mt-7">
            <SectionIntro
              eyebrow="Ideas to consider"
              title="Possible additions to the Curriculum page"
            >
              <p>
                These ideas could add useful depth after the class structure,
                progression language and supporting evidence have been reviewed.
              </p>
            </SectionIntro>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {curriculumFutureSections.map((idea) => (
              <article
                key={idea.title}
                className="border-l-2 border-brand-accent bg-background px-5 py-5"
              >
                <h2 className="text-lg font-semibold text-brand-blue-strong">
                  {idea.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {idea.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      ) : null}
    </main>
  );
}
