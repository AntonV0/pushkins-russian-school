import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  MonitorPlay,
  UsersRound,
} from "lucide-react";
import {
  ButtonLink,
  quietHeroLinkClassName,
} from "@/components/site/button-link";
import { LearningOptions } from "@/components/site/learning-options";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SectionIntro } from "@/components/site/section-intro";
import { learningOptions } from "@/data/public/learning-options";

const volnaLinks = [
  {
    title: "Online Russian classes for children",
    body: "Group and private online Russian lessons for children who cannot attend a local branch or need a more flexible route.",
    detail: "Includes routes for bilingual children, Russian as a foreign language, and one-to-one tuition.",
    href: "https://www.volnaschool.com/classes-for-children",
    icon: UsersRound,
  },
  {
    title: "GCSE Russian online",
    body: "Volna's GCSE Russian page covers current Pearson Edexcel course options, private tuition, timetable, prices, and registration.",
    detail: "Use this route for exam-focused GCSE Russian support rather than Pushkin's School weekend classes.",
    href: "https://www.volnaschool.com/gcse-classes",
    icon: GraduationCap,
  },
  {
    title: "A Level Russian online",
    body: "Volna's A Level Russian page is the right place for older students who need Pearson Edexcel exam-focused online teaching.",
    detail: "A Level students should use Volna for literature, film, research-project, speaking, and exam practice.",
    href: "https://www.volnaschool.com/a-level-classes",
    icon: GraduationCap,
  },
] as const;

const parentDecisions = [
  {
    title: "Choose Pushkin's School if you want local community",
    body: "The weekend school is the better fit for families who want in-person rhythm, Russian culture, performances, literature, and a shared school community.",
  },
  {
    title: "Choose Volna if distance or timetable is the issue",
    body: "Volna is the better fit when travel is difficult, a local branch is not currently available, or the child needs online group or private lessons.",
  },
  {
    title: "Choose Volna for GCSE and A Level Russian",
    body: "Exam courses are not taught at Pushkin's School. Volna keeps the current GCSE and A Level course details, fees, timetables, and registration forms.",
  },
] as const;

const volnaStrengths = [
  "Online lessons are delivered through video platforms such as Microsoft Teams or Zoom.",
  "Children's classes include routes for Russian-speaking children and children new to Russian.",
  "Volna offers group lessons and private tuition for more personalised support.",
  "GCSE and A Level courses are separate Volna routes with their own current course information.",
] as const;

const routeNotes = [
  "Pushkin's School remains the weekend school for Russian language, literature, culture, performance, and bilingual confidence.",
  "Volna Online Russian School is the related online route for live online lessons, private tuition, GCSE Russian, and A Level Russian.",
  "GCSE and A Level Russian are not taught at Pushkin's School, so exam-focused families should use Volna's course pages for current details.",
] as const;

export const metadata: Metadata = {
  title: "Online Russian Lessons",
  description:
    "Online Russian lesson routes connected to Pushkin's School, including Volna Online Russian School for children, GCSE Russian, and A Level Russian.",
  alternates: {
    canonical: "/online-lessons",
  },
  openGraph: {
    title: "Online Russian Lessons | Pushkin's School",
    description:
      "Learn when to choose Pushkin's School local classes and when Volna Online Russian School is the better route for online, GCSE, or A Level Russian.",
    url: "/online-lessons",
  },
};

export default function OnlineLessonsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Online Russian lessons"
        title="When online lessons or exam courses are the better route"
        actions={
          <>
            <ButtonLink href="/schools" icon={<ArrowRight className="size-4" />}>
              See local schools
            </ButtonLink>
            <a
              href="https://www.volnaschool.com/"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex min-h-11 w-full max-w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-center text-sm font-semibold whitespace-nowrap transition duration-150 focus:outline-none focus-visible:ring-2 sm:w-auto ${quietHeroLinkClassName} border border-transparent bg-transparent text-brand-blue-strong underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red hover:decoration-brand-red focus:ring-brand-red/30`}
            >
              <span>Visit Volna</span>
              <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          </>
        }
        aside={
          <div className="premium-panel rounded-lg border border-border-soft bg-surface p-6 sm:p-8">
            <MonitorPlay aria-hidden="true" className="size-8 text-brand-red" />
            <h2 className="mt-4 text-2xl font-semibold text-brand-blue-strong">
              Pushkin&apos;s School and Volna work best as connected but separate routes
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Local weekend school is strongest for culture, classroom rhythm,
              and community. Volna is strongest when a family needs live online
              lessons, private tuition, GCSE Russian, or A Level Russian.
            </p>
          </div>
        }
      >
        <p>
          Some families need Russian lessons without travelling to a branch.
          Others need GCSE or A Level Russian, which Pushkin&apos;s School does not
          teach. In those cases, the right route is Volna Online Russian School.
        </p>
      </PageHero>

      <section className="border-b border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <SectionIntro
            eyebrow="Parent decision"
            title="Which route should you choose?"
          >
            <p>
              Pushkin&apos;s School and Volna are connected by history and
              teaching experience, but they should not feel interchangeable to
              parents. The right choice depends on the child&apos;s age, level,
              travel distance, and whether exams are involved.
            </p>
          </SectionIntro>
          <div className="grid gap-4">
            {parentDecisions.map((decision) => (
              <article
                key={decision.title}
                className="grid gap-3 border-l border-brand-accent bg-background px-5 py-4 sm:grid-cols-[2rem_1fr]"
              >
                <CheckCircle2 aria-hidden="true" className="mt-1 size-5 text-brand-red" />
                <div>
                  <h2 className="text-lg font-semibold text-brand-blue-strong">
                    {decision.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {decision.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionIntro
            eyebrow="Clear route"
            title="Local school for culture and community, Volna for online and exams"
          >
            <p>
              This page keeps the relationship honest for parents: Pushkin&apos;s
              School and Volna are related schools, but they answer different
              family needs.
            </p>
          </SectionIntro>
          <div className="grid gap-4">
            {routeNotes.map((note) => (
              <p
                key={note}
                className="border-l border-brand-accent bg-surface px-5 py-4 text-sm leading-6 text-slate-700"
              >
                {note}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionIntro
            eyebrow="What Volna offers"
            title="Online routes for children, private tuition, GCSE, and A Level"
          >
            <p>
              Volna describes itself as an online Russian school for learners
              of different ages and levels, with live online group classes,
              private tuition, and dedicated GCSE and A Level Russian routes.
            </p>
          </SectionIntro>
          <div className="grid gap-3 sm:grid-cols-2">
            {volnaStrengths.map((strength) => (
              <p
                key={strength}
                className="flex gap-2 border-l border-brand-accent bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
              >
                <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                <span>{strength}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        id="gcse-a-level"
        className="scroll-mt-24 border-b border-border-soft bg-surface site-section-compact"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Volna routes"
            title="Choose the Volna page that matches the learner"
          >
            <p>
              Volna keeps its own current course pages, timetables, fees,
              registration forms, and exam guidance. Use those pages for the
              latest online lesson information.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {volnaLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col border-l border-brand-accent bg-background px-5 py-5 transition hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              >
                <link.icon aria-hidden="true" className="size-5 text-brand-red" />
                <h2 className="mt-4 text-xl font-semibold leading-tight text-brand-blue-strong">
                  {link.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {link.body}
                </p>
                <p className="mt-3 border-l border-brand-accent pl-3 text-xs leading-5 text-slate-500">
                  {link.detail}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-strong group-hover:text-brand-red">
                  Visit Volna
                  <ExternalLink aria-hidden="true" className="size-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <LearningOptions
            options={learningOptions}
            eyebrow="Compare routes"
            title="Choose the right Russian-learning path"
            intro="Pushkin's School and Volna should support each other without confusing parents about who teaches what."
            highlightId="volna-online"
          />
        </div>
      </section>

      <PageCta
        eyebrow="Still not sure?"
        title="Tell us about your child and we will point you to the right route"
        tone="light"
        actions={
          <>
            <ButtonLink href="/contact#enquiry-form">
              Tell us about your child
            </ButtonLink>
            <Link
              href="/curriculum"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-brand-blue/20 bg-white/70 px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              Curriculum
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </>
        }
      />
    </main>
  );
}
