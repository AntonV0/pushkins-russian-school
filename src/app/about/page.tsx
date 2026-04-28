import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/button-link";
import { MetricStrip } from "@/components/site/metric-strip";
import { SectionIntro } from "@/components/site/section-intro";
import { TrustSignals } from "@/components/site/trust-signals";
import { VisualStoryPanel } from "@/components/site/visual-story-panel";
import {
  curriculumMaterials,
  curriculumReviewNotes,
  educationPrinciples,
  placementSteps,
} from "@/data/curriculum";
import { getVisualPlaceholderSlot } from "@/data/media-assets";
import { networkSummary } from "@/data/schools";

const aboutVisual = getVisualPlaceholderSlot("about-community-table");

const reviewNotes = [
  ...curriculumReviewNotes,
  "Institutional partnerships and external references need current confirmation.",
  "Trips, certificates, staff details, and media should be reviewed before publication.",
  "Current branch statuses and timetables remain visible with verification notes.",
];

export const metadata: Metadata = {
  title: "About",
  description:
    "About Pushkin's School, its Russian language learning network, and the website rebuild direction.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Pushkin's School",
    description:
      "Learn about Pushkin's School and the renewed parent-facing Russian language school network.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              About Pushkin&apos;s School
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
              A refined home for an established Russian school community
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Pushkin&apos;s School is presented as a warm, academic weekend
              network for children learning Russian language, literature, and
              culture in the UK.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/schools">Explore schools</ButtonLink>
              <ButtonLink href="/contact#enquiry-form" variant="secondary">
                Start an enquiry
              </ButtonLink>
            </div>
          </div>
          {aboutVisual ? <VisualStoryPanel slot={aboutVisual} /> : null}
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Education philosophy"
            title="Language learning that connects home, school, and culture"
          >
            <p>
              The old About page centred on bilingual development, practical
              communication, cultural literacy, and a shared curriculum. This
              version keeps those themes while avoiding unverified institutional
              claims until they are reviewed.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {educationPrinciples.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-border-soft bg-surface p-6"
              >
                <h2 className="text-xl font-semibold text-brand-blue-strong">
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

      <section className="border-y border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionIntro
            eyebrow="Curriculum and placement"
            title="A shared route that still leaves room for the child"
          >
            <p>
              The old source material described common class groups, an
              introductory period, and teacher judgement when deciding the best
              group for a new pupil. The rebuild keeps that guidance structured
              and easy to update.
            </p>
          </SectionIntro>
          <div className="grid gap-5 md:grid-cols-3">
            {placementSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-lg border border-border-soft bg-background p-5"
              >
                <h2 className="text-lg font-semibold text-brand-blue-strong">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
          <div className="lg:col-start-2">
            <ul className="grid gap-3 sm:grid-cols-3">
              {curriculumMaterials.map((item) => (
                <li
                  key={item}
                  className="border-l border-brand-gold bg-background px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <SectionIntro
            eyebrow="Network"
            title="A school model built to be consistent across locations"
          >
            <p>
              The source site presented branches as one network with common
              class groups and lesson structures. The rebuild makes that model
              data-driven so future branches can be added without redesigning
              pages.
            </p>
          </SectionIntro>
          <MetricStrip
            metrics={[
              { label: "Locations", value: networkSummary.locations },
              { label: "Counties", value: networkSummary.counties },
              { label: "Class pathways", value: networkSummary.classGroupCount },
            ]}
          />
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <TrustSignals
            includeReviewQueue
            intro="The site separates public credibility signals from proof points that need approval, so future history, testimonial, partner, staff, and exam-result claims can be added cleanly."
          />
        </div>
      </section>

      <section className="bg-brand-blue-strong py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Content review
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              What still needs confirmation
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              This page intentionally stays polished but cautious until public
              biography, partner references, staff details, trips, and media are
              reviewed for current publication.
            </p>
          </div>
          <ul className="space-y-3 text-sm leading-6 text-white/80">
            {reviewNotes.map((note) => (
              <li key={note} className="border-l border-brand-gold pl-4">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
