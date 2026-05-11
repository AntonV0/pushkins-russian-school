import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SectionIntro } from "@/components/site/section-intro";
import { admissionsSteps } from "@/data/admissions";
import { contactDetails } from "@/data/contact";
import {
  curriculumPillars,
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

const quietHeroLink =
  "min-h-0 w-auto justify-start px-0 py-1 text-left sm:min-h-11 sm:justify-center sm:px-5 sm:py-3";

const parentJourney = [
  {
    title: "Choose the nearest sensible location",
    body: "Start with the branch page that fits your journey. Current opening details and paused local interest are easier to compare before you contact the school.",
    href: "/schools",
    cta: "Compare branches",
  },
  {
    title: "Describe your child clearly",
    body: "Age matters, but so do confidence, home language exposure, reading, writing, and whether exams are already part of the family plan.",
    href: "/curriculum",
    cta: "Understand levels",
  },
  {
    title: "Ask a focused question",
    body: "A useful enquiry names the preferred location, the child's current Russian, and the next step you need: a place, advice, online support, or exam preparation.",
    href: "/contact#enquiry-form",
    cta: "Start an enquiry",
  },
];

const enquiryPrompts = [
  "Which branch is realistic for your family each weekend?",
  "How much Russian does your child hear or use at home?",
  "Can they read or write in Russian already?",
  "Are you looking for confidence, continuity, culture, or exam support?",
];

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
      <PageHero
        eyebrow="Weekend supplementary Russian school for children"
        title="Pushkin's School of Russian Language and Literature"
        variant="home"
        aside={<HeroSchoolVisual />}
        actions={
          <>
            <ButtonLink href="/schools">Find a school location</ButtonLink>
            <ButtonLink
              href="/contact#enquiry-form"
              variant="quiet"
              className={quietHeroLink}
            >
              {contactDetails.registrationCta}
            </ButtonLink>
          </>
        }
      >
        <p>
          The school helps children aged 3-18 keep Russian language,
          literature, culture, and confidence alive in a warm weekend classroom
          setting.
        </p>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Classes are designed for different levels of Russian, from early
          language exposure through reading, writing, speaking, culture, and
          GCSE or A Level preparation.
        </p>
      </PageHero>

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Parent journey"
              title="Three useful questions before you enquire"
            >
              <p>
                The first step is not choosing a package. It is making the
                child&apos;s weekend, language background, and learning goal
                clear enough for the school to advise the next move.
              </p>
            </SectionIntro>
            <p className="mt-8 max-w-xl text-base leading-7 text-slate-700">
              {learningOptionSummary} The right option depends on distance,
              current confidence, and whether your family needs regular
              classes, online support, or exam preparation.
            </p>
          </div>

          <div className="grid gap-6">
            {parentJourney.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-4 border-l border-brand-gold bg-surface px-5 py-5 sm:grid-cols-[4rem_1fr_auto] sm:items-start sm:px-6"
              >
                <p className="font-mono text-3xl font-semibold text-brand-red/80">
                  0{index + 1}
                </p>
                <div>
                  <h2 className="text-2xl font-semibold leading-tight text-brand-blue-strong">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.body}
                  </p>
                </div>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-brand-blue-strong underline decoration-brand-gold/70 underline-offset-4"
                >
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface site-section">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionIntro
              eyebrow="Our schools"
              title="Start with the branch, then the fit"
            >
              <p>
                Families can compare {networkSummary.locations} listed
                locations, including {openSchools.length} current in-person
                branch and {interestSchools.length} local interest areas, then
                use the enquiry form to ask about the realistic next step.
              </p>
            </SectionIntro>
            <div className="mt-7 hidden lg:block">
              <ButtonLink href="/schools" variant="secondary">
                View all school locations
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="overflow-hidden bg-background">
              {schools.map((school, index) => (
                <Link
                  key={school.slug}
                  href={`/schools/${school.slug}`}
                  className="grid gap-4 border-b border-border-soft py-5 transition last:border-b-0 hover:bg-surface-muted/60 sm:grid-cols-[4rem_1fr_10rem] sm:items-center sm:px-4"
                >
                  <span className="font-mono text-sm font-semibold text-brand-red">
                    0{index + 1}
                  </span>
                  <span>
                    <span className="block text-xl font-semibold text-brand-blue-strong">
                      {school.name}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {school.availabilitySummary}
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-brand-blue-strong">
                    Branch guide
                  </span>
                </Link>
              ))}
            </div>
            <div className="border-l border-brand-gold pl-5">
              <h2 className="text-xl font-semibold text-brand-blue-strong">
                What to include in your message
              </h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                {enquiryPrompts.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background site-section">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <SectionIntro
            eyebrow="Learning approach"
            title="A curriculum with language, culture, and confidence in view"
          >
            <p>
              The curriculum page gives parents a clearer pathway into
              language confidence, cultural connection, literature, and
              exam-aware progression without asking them to diagnose the
              perfect group alone.
            </p>
          </SectionIntro>
          <div className="divide-y divide-border-soft border-y border-border-soft">
            {curriculumPillars.map((pathway, index) => (
              <article
                key={pathway.title}
                className="grid gap-4 py-7 sm:grid-cols-[5rem_1fr]"
              >
                <p className="font-mono text-sm font-semibold text-brand-red">
                  0{index + 1}
                </p>
                <div>
                  <h2 className="text-2xl font-semibold leading-tight text-brand-blue-strong">
                    {pathway.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    {pathway.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface site-section">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Placement"
              title="A thoughtful start in the right group"
            >
              <p>
                Families do not need to solve the level question before
                enquiring. The school separates first contact, teacher
                placement, and the first-weeks check-in so the start can be
                sensible for the child.
              </p>
            </SectionIntro>
            <div className="mt-7">
              <ButtonLink href="/curriculum" variant="secondary">
                Explore curriculum pathways
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
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
            <div className="relative border-l border-brand-gold pl-6">
              {admissionsSteps.map((item, index) => (
                <article key={item.title} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[2.05rem] top-1 flex size-5 items-center justify-center rounded-full border border-brand-gold bg-surface">
                    <span className="size-2 rounded-full bg-brand-blue-strong" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                    Enquiry {index + 1}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-brand-blue-strong">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Ready to start?"
        title="Ask about current classes or register interest in a future local school"
        tone="light"
        actions={
          <>
            <ButtonLink href="/contact#enquiry-form">Start an enquiry</ButtonLink>
            <ButtonLink href="/admissions" variant="secondary">
              Admissions and fees
            </ButtonLink>
          </>
        }
      />
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
