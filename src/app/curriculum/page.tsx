import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/button-link";
import { SectionIntro } from "@/components/site/section-intro";
import {
  curriculumMaterials,
  curriculumPillars,
  curriculumReviewNotes,
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
              The network curriculum is presented as shared, flexible guidance:
              enough structure for parents to understand the pathway, with room
              for teachers to place each child thoughtfully.
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
            title="Three strands parents can understand quickly"
          >
            <p>
              These strands are deliberately written as reusable content so the
              school can expand the model later with detailed syllabuses,
              termly outcomes, and branch-specific notes.
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
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <SectionIntro
            eyebrow="Placement"
            title="A careful start for new pupils"
          >
            <p>
              Placement copy is intentionally transparent. It explains the
              parent enquiry route and teacher judgement without overpromising
              final group allocation before the school has met the child.
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
              Materials and next content pass
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This page is ready for approved curriculum documents, textbook
              references, teacher notes, and termly outcomes when the school
              confirms what should be public.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[...curriculumMaterials, ...curriculumReviewNotes].map((item) => (
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
