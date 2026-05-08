import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { LearningOptions } from "@/components/site/learning-options";
import { MetricStrip } from "@/components/site/metric-strip";
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
import {
  getGalleryCategoryCoverAsset,
  getHeroReadyMedia,
  type MediaAsset,
} from "@/data/media-assets";
import { networkSummary, schools } from "@/data/schools";
import { siteConfig } from "@/data/site";

const openSchools = schools.filter((school) => school.status === "open");
const interestSchools = schools.filter((school) => school.status !== "open");
const heroLeadAsset =
  getHeroReadyMedia()[0] ?? getGalleryCategoryCoverAsset("classroom-learning");
const heroSupportingAssets = [
  getGalleryCategoryCoverAsset("creative-work"),
  getGalleryCategoryCoverAsset("performances"),
].filter((asset): asset is MediaAsset => Boolean(asset));

export const metadata: Metadata = {
  title: "Pushkin's School of Russian Language and Literature",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pushkin's School of Russian Language and Literature",
    description: siteConfig.description,
    url: "/",
  },
};

export default function Home() {
  return (
    <main>
      <section className="overflow-hidden border-b border-border-soft bg-surface/80">
        <div className="mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl items-center gap-12 px-6 py-14 sm:py-18 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-red sm:tracking-[0.2em]">
              Weekend supplementary Russian school for children
            </p>
            <h1 className="mt-5 max-w-4xl break-words text-4xl font-semibold leading-[1.02] text-brand-blue-strong sm:text-6xl lg:text-6xl">
              Pushkin&apos;s School of Russian Language and Literature
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-xl leading-8 text-slate-700">
              The school helps children aged 3-18 keep Russian language,
              literature, culture, and confidence alive in a warm weekend
              classroom setting.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Classes are designed for children with different levels of
              Russian, from early language exposure through reading, writing,
              speaking, culture, and GCSE or A Level preparation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/schools">Find a school location</ButtonLink>
              <ButtonLink href="/contact#enquiry-form" variant="secondary">
                {contactDetails.registrationCta}
              </ButtonLink>
            </div>
          </div>

          <HeroSchoolVisual />

          <div className="grid gap-6 lg:col-span-2 lg:grid-cols-[0.92fr_1.08fr]">
            <MetricStrip
              metrics={[
                { label: "School locations", value: networkSummary.locations },
                { label: "Current in-person", value: openSchools.length },
                {
                  label: "Future interest",
                  value: interestSchools.length,
                },
              ]}
            />
            <div className="grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
              <div className="border-l-2 border-emerald-500 bg-white/75 px-4 py-3">
                <p className="font-semibold text-brand-blue-strong">
                  Bracknell weekend school
                </p>
                <p>Sunday morning classes currently listed for enquiries.</p>
              </div>
              <div className="border-l-2 border-sky-500 bg-white/75 px-4 py-3">
                <p className="font-semibold text-brand-blue-strong">
                  Other local areas
                </p>
                <p>Parents can register interest where local classes pause.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionIntro
              eyebrow="Our schools"
              title="Start with the nearest school location"
            >
              <p>
                Families can compare High Wycombe, Hemel Hempstead, Bracknell,
                Chelmsford, and Southend-on-Sea in one place, then enquire with
                the right location, age, Russian level, and goal already in
                mind.
              </p>
            </SectionIntro>
            <div className="mt-7 hidden lg:block">
              <ButtonLink href="/schools" variant="secondary">
                View all school locations
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-5">
            <article className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface">
              <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                <div className="relative min-h-80 overflow-hidden bg-brand-blue-strong text-white">
                  <div className="fine-grid absolute inset-0 opacity-25" aria-hidden="true" />
                  <div className="absolute inset-x-8 top-8 rounded-md border border-white/20 bg-white/10 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                      School life
                    </p>
                    <p className="mt-3 text-2xl font-semibold leading-tight">
                      Language, culture, performance, and community
                    </p>
                  </div>
                  <div className="absolute bottom-8 left-8 right-10 grid gap-3 sm:grid-cols-3">
                    {["Language", "Culture", "Community"].map((label) => (
                      <div
                        key={label}
                        className="rounded-md border border-white/15 bg-white/12 px-3 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/75"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
                    What parents compare
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight text-brand-blue-strong">
                    A local Saturday or Sunday rhythm, not a casual activity
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Parents can quickly understand where classes happen,
                    whether a place is available, how children are placed, and
                    what the school offers beyond language drills.
                  </p>
                  <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="font-mono text-2xl font-semibold text-brand-blue-strong">
                        {networkSummary.locations}
                      </dt>
                      <dd className="mt-1 text-slate-600">listed locations</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-2xl font-semibold text-brand-blue-strong">
                        3-18
                      </dt>
                      <dd className="mt-1 text-slate-600">age range</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-2xl font-semibold text-brand-blue-strong">
                        {networkSummary.classGroupCount}
                      </dt>
                      <dd className="mt-1 text-slate-600">class pathways</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>

            <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
              <div className="overflow-hidden rounded-lg border border-border-soft bg-surface">
                {schools.map((school, index) => (
                  <Link
                    key={school.slug}
                    href={`/schools/${school.slug}`}
                    className="grid gap-3 border-b border-border-soft px-5 py-4 transition last:border-b-0 hover:bg-surface-muted/60 sm:grid-cols-[2rem_1fr_auto] sm:items-center"
                  >
                    <span className="font-mono text-sm font-semibold text-brand-red">
                      0{index + 1}
                    </span>
                    <span>
                      <span className="block font-semibold text-brand-blue-strong">
                        {school.name}
                      </span>
                      <span className="mt-1 block text-sm text-slate-600">
                        {school.availabilitySummary}
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-brand-blue-strong">
                      Decision guide
                    </span>
                  </Link>
                ))}
              </div>

              <div className="premium-panel flex flex-col justify-between rounded-lg border border-border-soft bg-surface-blue p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                    Enquiry focus
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
                    Help the school place your child well
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-slate-700">
                    A strong enquiry gives the team the practical context:
                    preferred location, age, Russian exposure, confidence with
                    reading and writing, and exam goals where relevant.
                  </p>
                </div>
                <Link
                  href="/contact#enquiry-form"
                  className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                >
                  Start an enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <TrustSignals
            align="center"
            intro="Families can check the school locations, curriculum, and policy structure before they enquire, with further school proof points added as suitable public records become available."
          />
        </div>
      </section>

      <section className="border-b border-border-soft bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <LearningOptions
            intro={`${learningOptionSummary} Families can start with a local weekend class, ask about online support when distance is a barrier, or choose focused GCSE self-study support.`}
          />
        </div>
      </section>

      <section className="bg-brand-blue-strong py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <SectionIntro
              eyebrow="Learning approach"
              title="Structured, stimulating, and easy for parents to understand"
              tone="dark"
            >
              <p>
                The curriculum page gives parents a clear pathway into language
                confidence, cultural connection, literature, and exam-aware
                progression while detailed class guidance remains easy to
                update.
              </p>
            </SectionIntro>

            <div className="relative min-h-[34rem]">
              <div className="absolute inset-0 rounded-lg border border-white/15 bg-white/8" />
              {curriculumPillars.map((pathway, index) => (
                <article
                  key={pathway.title}
                  className={`relative rounded-lg border border-white/15 bg-white p-6 text-brand-blue-strong shadow-2xl ${
                    index === 0
                      ? "ml-0 max-w-xl"
                      : index === 1
                        ? "ml-auto mt-6 max-w-lg"
                        : "ml-8 mt-6 max-w-2xl sm:ml-20"
                  }`}
                >
                  <p className="font-mono text-sm font-semibold text-brand-red">
                    0{index + 1}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight">
                    {pathway.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {pathway.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <SectionIntro
            eyebrow="Class placement"
            title="A thoughtful start in the right group"
          >
            <p>
              The school separates the first parent enquiry, teacher placement,
              and first-weeks check-in so families know what happens before
              they commit to the right learning option.
            </p>
          </SectionIntro>
          <div className="relative">
            <div className="absolute left-4 top-8 hidden h-[calc(100%-4rem)] w-px bg-brand-gold/60 md:block" />
            {placementSteps.map((step, index) => (
              <article
                key={step.title}
                className="relative grid gap-4 border-b border-border-soft py-6 last:border-b-0 md:grid-cols-[4rem_1fr]"
              >
                <div className="flex size-9 items-center justify-center rounded-full border border-brand-gold/50 bg-surface text-sm font-semibold text-brand-red shadow-sm">
                  {index + 1}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-brand-blue-strong">
                    {step.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    {step.body}
                  </p>
                </div>
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
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            {curriculumProgressionStages.map((stage) => (
              <article
                key={stage.title}
                className="group rounded-lg border border-border-soft bg-surface p-6 transition hover:border-brand-gold/70 first:lg:row-span-2 first:lg:min-h-96 first:lg:p-8"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
                  {stage.audience}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
                  {stage.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {stage.parentValue}
                </p>
                <ul className="mt-6 grid gap-2 text-sm leading-6 text-slate-600">
                  {stage.focusAreas.map((area) => (
                    <li key={area} className="border-l border-brand-gold pl-3">
                      {area}
                    </li>
                  ))}
                </ul>
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
              the school needs before visiting a location or arranging the next
              step: child age, current Russian confidence, preferred school,
              and learning goals.
            </p>
          </SectionIntro>
          <div className="mt-10 overflow-hidden rounded-lg border border-border-soft bg-background">
            {admissionsSteps.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-5 border-b border-border-soft p-6 last:border-b-0 md:grid-cols-[12rem_1fr_auto] md:items-center"
              >
                <p className="font-mono text-4xl font-semibold text-brand-red/80">
                  0{index + 1}
                </p>
                <div>
                  <h2 className="text-xl font-semibold text-brand-blue-strong">
                    {item.title}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                    {item.body}
                  </p>
                </div>
                <span className="hidden h-px w-20 bg-brand-gold md:block" />
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
              school
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

function HeroSchoolVisual() {
  if (!heroLeadAsset) {
    return <HeroSchoolVisualFallback />;
  }

  return (
    <div
      className="grid gap-4"
      aria-label="School life visual spaces"
    >
      <figure className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface">
        <div className="relative min-h-80 bg-surface-muted sm:min-h-[25rem]">
          <Image
            src={heroLeadAsset.approvedPublicPath}
            alt={heroLeadAsset.altText}
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-blue-strong/60 via-transparent to-transparent"
            aria-hidden="true"
          />
        </div>
        <figcaption className="p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
            Classroom rhythm
          </p>
          <p className="mt-3 max-w-md text-xl font-semibold leading-tight text-brand-blue-strong">
            {heroLeadAsset.caption}
          </p>
        </figcaption>
      </figure>
      <div className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-white">
        <div className="grid sm:grid-cols-[0.72fr_1.28fr]">
          <div className="bg-brand-red px-5 py-8 text-white">
            <p className="font-mono text-4xl font-semibold">3-18</p>
            <p className="mt-3 text-sm font-semibold leading-5">
              Children and young people
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1 bg-surface-muted p-1">
            {heroSupportingAssets.map((asset) => (
              <div
                key={asset.id}
                className="relative min-h-36 overflow-hidden rounded-md bg-surface-muted"
              >
                <Image
                  src={asset.approvedPublicPath}
                  alt={asset.altText}
                  fill
                  sizes="(min-width: 1024px) 18vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSchoolVisualFallback() {
  return (
    <div
      className="grid gap-4"
      aria-label="School life visual spaces"
    >
      <div className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface">
        <div className="relative min-h-80 bg-surface-muted">
          <div className="fine-grid absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-6 rounded-md border border-dashed border-brand-blue/20 bg-white/55" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
              Classroom rhythm
            </p>
            <p className="mt-3 max-w-sm text-2xl font-semibold leading-tight text-brand-blue-strong">
              Reading, speaking, writing, and cultural work in a weekend school
              setting
            </p>
          </div>
        </div>
      </div>
      <div className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-white">
        <div className="grid sm:grid-cols-[0.75fr_1.25fr]">
          <div className="bg-brand-red px-5 py-8 text-white">
            <p className="font-mono text-4xl font-semibold">3-18</p>
            <p className="mt-3 text-sm font-semibold leading-5">
              Children and young people
            </p>
          </div>
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Weekend rhythm
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Language, literature, culture, performances, and exam-aware
              progression in a school setting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
