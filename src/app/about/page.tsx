import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/button-link";
import { MetricStrip } from "@/components/site/metric-strip";
import { SectionIntro } from "@/components/site/section-intro";
import { TrustSignals } from "@/components/site/trust-signals";
import { VisualStoryPanel } from "@/components/site/visual-story-panel";
import {
  curriculumMaterials,
  educationPrinciples,
  placementSteps,
} from "@/data/curriculum";
import { getVisualPlaceholderSlot } from "@/data/media-assets";
import { networkSummary } from "@/data/schools";

const aboutVisual = getVisualPlaceholderSlot("about-community-table");

const reviewNotes = [
  "Class groups and placement guidance are shared clearly, with exact fit confirmed through enquiry.",
  "Branch pages focus on current practical details so families can choose the best next step.",
  "Photos, staff details, certificates, and partner references are added only when they are suitable for public use.",
];

const schoolStory = [
  {
    label: "Purpose",
    title: "A weekend school for serious, child-centred Russian learning",
    body: "Pushkin's School is presented as a thoughtful supplementary school for families who want Russian to remain useful, expressive, and connected to culture.",
  },
  {
    label: "Continuity",
    title: "A shared academic rhythm across locations",
    body: "Branches follow the same core promise: language, literature, culture, and age-aware class groups, with local details confirmed through enquiry.",
  },
  {
    label: "Care",
    title: "Placement that respects each child's starting point",
    body: "The school does not reduce children to age alone. Family context, home language exposure, confidence, and teacher judgement shape the start in a suitable group.",
  },
];

const parentSignals = [
  "A clear weekend rhythm with assembly, lessons, and supervised breaks",
  "Russian used for communication, reading, writing, creativity, and culture",
  "A practical enquiry process that can discuss local classes, online support, or exam goals",
  "A public school record that can grow with suitable photos, staff details, and archive evidence",
];

export const metadata: Metadata = {
  title: "About",
  description:
    "About Pushkin's School of Russian Language and Literature, a weekend supplementary Russian school for children.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Pushkin's School",
    description:
      "Learn about Pushkin's School and its weekend Russian language, literature, and culture classes for children.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <section className="border-b border-border-soft bg-surface/80 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              About Pushkin&apos;s School
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-brand-blue-strong sm:text-6xl">
              An established Russian school community for children and families
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Pushkin&apos;s School is a warm, academic weekend supplementary
              school for children studying Russian language, literature, and
              culture in the UK. Families can see the learning approach,
              locations, admissions pathway, and policy structure before they
              enquire.
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
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="School story"
              title="A school built around continuity, not one-off activities"
            >
              <p>
                Parents need to see more than a list of subjects. The About page
                frames Pushkin&apos;s School as a long-term educational
                setting: a place where Russian is practised, read, written,
                performed, and kept culturally alive across childhood.
              </p>
            </SectionIntro>
            <div className="mt-8 space-y-5 text-base leading-7 text-slate-700">
              <p>
                The school&apos;s public message focuses on what matters most to
                parents: a reliable weekend rhythm, thoughtful placement, clear
                branch information, and careful safeguarding and policy
                signposting.
              </p>
              <p>
                Families can understand the school&apos;s standards and rhythm
                through practical detail rather than generic promises.
              </p>
            </div>
          </div>
          <div className="premium-panel rounded-lg border border-border-soft bg-surface p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Continuity markers
            </p>
            <div className="mt-6 divide-y divide-border-soft">
              {schoolStory.map((item) => (
                <article
                  key={item.title}
                  className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[8rem_1fr]"
                >
                  <p className="text-sm font-semibold text-brand-red">
                    {item.label}
                  </p>
                  <div>
                    <h2 className="text-xl font-semibold leading-tight text-brand-blue-strong">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Education philosophy"
              title="Language learning that connects home, school, and culture"
            >
              <p>
                The school message centres on bilingual development, practical
                communication, cultural literacy, and a shared curriculum. The
                page reads as a coherent philosophy rather than a set of
                interchangeable boxes.
              </p>
            </SectionIntro>
            <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-700">
              {parentSignals.map((signal) => (
                <li
                  key={signal}
                  className="border-l border-brand-gold bg-background px-4 py-3"
                >
                  {signal}
                </li>
              ))}
            </ul>
          </div>
          <div className="premium-panel rounded-lg border border-border-soft bg-background p-6 sm:p-8">
            <div className="space-y-7">
              {educationPrinciples.map((item, index) => (
                <article
                  key={item.title}
                  className="grid gap-4 border-b border-border-soft pb-7 last:border-b-0 last:pb-0 sm:grid-cols-[3.25rem_1fr]"
                >
                  <div className="flex size-11 items-center justify-center rounded-full bg-brand-blue-strong text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-brand-blue-strong">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Curriculum and placement"
              title="A shared pathway that still leaves room for the child"
            >
              <p>
                Common class groups, an introductory period, and teacher
                judgement help new pupils start in a sensible place. This is
                presented as a measured parent journey instead of a quick set of
                cards.
              </p>
            </SectionIntro>
          </div>
          <div className="grid gap-8">
            <div className="relative border-l border-brand-gold pl-6">
              {placementSteps.map((step, index) => (
                <article key={step.title} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[2.05rem] top-1 flex size-5 items-center justify-center rounded-full border border-brand-gold bg-background">
                    <span className="size-2 rounded-full bg-brand-red" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                    Step {index + 1}
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
            <div className="rounded-lg border border-border-soft bg-surface p-5">
              <h2 className="text-lg font-semibold text-brand-blue-strong">
                Teaching spine
              </h2>
              <ul className="mt-4 divide-y divide-border-soft text-sm leading-6 text-slate-700">
                {curriculumMaterials.map((item) => (
                  <li key={item} className="py-3 first:pt-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <SectionIntro
            eyebrow="Locations"
            title="A school model built to be consistent across locations"
          >
            <p>
              The school model keeps a shared learning structure across current
              and future locations, while each branch page gives families the
              practical details they need before enquiring.
            </p>
          </SectionIntro>
          <MetricStrip
            metrics={[
              { label: "School locations", value: networkSummary.locations },
              { label: "Counties", value: networkSummary.counties },
              { label: "Class pathways", value: networkSummary.classGroupCount },
            ]}
          />
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <TrustSignals
            intro="Parents can check school locations, curriculum structure, policy summaries, and practical next steps before they contact the school."
          />
        </div>
      </section>

      <section className="bg-brand-blue-strong py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Parent confidence
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Clear today, careful as the record grows
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              The school can add more history, staff detail, trips,
              certificates, and photographs over time while keeping the current
              parent journey clear and reliable.
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
