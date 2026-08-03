import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle2, ClipboardCheck, MapPin, UsersRound } from "lucide-react";
import {
  ButtonLink,
  quietHeroLinkClassName,
} from "@/components/site/button-link";
import { HeroImageDevChooser } from "@/components/site/hero-image-dev-chooser";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SectionIntro } from "@/components/site/section-intro";
import { VisualStoryPanel } from "@/components/site/visual-story-panel";
import {
  curriculumMaterials,
  educationPrinciples,
  placementSteps,
} from "@/data/public/curriculum";
import {
  parentValueProps,
  schoolLifeHighlights,
  schoolProofPoints,
  schoolStory,
} from "@/data/public/school-story";
import {
  getGalleryCategoryCoverAsset,
  getPublicImageDevChooserAssets,
  getVisualPlaceholderSlot,
  type MediaAsset,
} from "@/features/gallery/data/media-assets";

const aboutVisual = getVisualPlaceholderSlot("about-community-table");
const aboutLeadAsset = getGalleryCategoryCoverAsset("creative-work");
const aboutSupportingAssets = [
  getGalleryCategoryCoverAsset("locations"),
  getGalleryCategoryCoverAsset("classroom-learning"),
].filter((asset): asset is MediaAsset => Boolean(asset));

const nextStepNotes = [
  "Tell us about your child's Russian, confidence, reading and writing, and family goals.",
  "Ask about the current location, online route, or future local classes that could fit your family.",
  "The school can guide placement without expecting parents to diagnose the perfect class alone.",
];

const schoolStoryCards = [
  {
    label: "In the classroom",
    icon: BookOpen,
    title: "Russian is taught as a living language",
    body: "Children meet Russian through speaking, reading, writing, grammar, stories, cultural work, and creative school moments rather than a narrow vocabulary-only routine.",
  },
  {
    label: "Across childhood",
    icon: UsersRound,
    title: "Balanced bilingualism is the goal",
    body: "The school helps children growing up in the UK keep Russian strong enough for family life, culture, literacy, and later study.",
  },
  {
    label: "Through culture",
    icon: ClipboardCheck,
    title: "Pushkin is more than a name",
    body: "The school takes inspiration from Alexander Pushkin and the ambition that pupils can move towards reading Russian works in the original.",
  },
];

export const metadata: Metadata = {
  title: "About",
  description:
    "About Pushkin's School of Russian Language and Literature: founded in 2009 to help children in the UK build balanced bilingualism, Russian culture, and literacy.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Pushkin's School",
    description:
      "Learn about Pushkin's School, its Russian language and literature mission, Moscow-linked curriculum, and cultural pathway for children.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Pushkin's School"
        title="A Russian school community built around language, culture, and identity"
        actions={
          <>
            <ButtonLink href="/schools" icon={<MapPin className="size-4" />}>
              Explore schools
            </ButtonLink>
            <ButtonLink
              href="/contact#enquiry-form"
              variant="quiet"
              className={quietHeroLinkClassName}
              icon={<ArrowRight className="size-4" />}
              iconPosition="end"
            >
              Tell us about your child
            </ButtonLink>
          </>
        }
        aside={
          aboutLeadAsset ? (
            <AboutSchoolPhotoPanel
              leadAsset={aboutLeadAsset}
              supportingAssets={aboutSupportingAssets}
            />
          ) : aboutVisual ? (
            <VisualStoryPanel slot={aboutVisual} />
          ) : null
        }
      >
        <p>
          {schoolStory.history} It was created for families who want Russian
          to remain part of their child&apos;s everyday confidence, literacy,
          culture, and future study.
        </p>
      </PageHero>

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="School story"
              title="Founded in 2009 to keep Russian strong for children in the UK"
            >
              <p>
                Pushkin&apos;s School is a long-term educational setting: a place
                where Russian is practised, read, written, performed, and kept
                culturally alive across childhood.
              </p>
            </SectionIntro>
            <div className="mt-8 space-y-5 text-base leading-7 text-slate-700">
              <p>
                {schoolStory.curriculum}
              </p>
              <p>
                {schoolStory.materials}
              </p>
            </div>
          </div>
          <div className="border-y border-border-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              The shape of the story
            </p>
            <div className="mt-6 divide-y divide-border-soft">
              {schoolStoryCards.map((item) => (
                <article
                  key={item.title}
                  className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[8rem_1fr]"
                >
                  <p className="flex items-center gap-2 text-sm font-semibold text-brand-red">
                    <item.icon aria-hidden="true" className="size-4" />
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

      <section className="border-y border-border-soft bg-surface site-section">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="What families notice"
              title="What parents are choosing"
            >
              <p>
                Parents are not only choosing weekend lessons. They are choosing
                a place where Russian culture, literature, identity, and
                confident bilingualism are treated as a serious part of
                childhood.
              </p>
            </SectionIntro>
            <p className="mt-8 max-w-xl text-base leading-7 text-slate-700">
              {schoolStory.culturalLife}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {parentValueProps.map((item) => (
              <article key={item.title} className="border-l border-brand-accent pl-5">
                <CheckCircle2 aria-hidden="true" className="mb-3 size-5 text-brand-red" />
                <h2 className="text-xl font-semibold leading-tight text-brand-blue-strong">
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

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Curriculum and placement"
              title="A Moscow-linked curriculum that still starts with the child"
            >
              <p>
                Common class groups, teacher judgement, and an understanding of
                UK-raised bilingual children help new pupils start in a
                sensible place.
              </p>
            </SectionIntro>
          </div>
          <div className="grid gap-8">
            <div className="relative border-l border-brand-accent pl-6">
              {placementSteps.map((step, index) => (
                <article key={step.title} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[2.05rem] top-1 flex size-5 items-center justify-center rounded-full border border-brand-accent bg-background">
                    <ClipboardCheck aria-hidden="true" className="size-3 text-brand-red" />
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
                {[...curriculumMaterials, ...schoolLifeHighlights].map((item) => (
                  <li key={item} className="py-3 first:pt-0 last:pb-0">
                    <span className="flex gap-2">
                      <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                      <span>{item}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionIntro
            eyebrow="Education philosophy"
            title="Language learning that connects home, school, Moscow, and culture"
          >
            <p>
              {schoolStory.philosophy} This is why language, literature,
              performance, grammar, and culture are taught together.
            </p>
          </SectionIntro>
          <div className="divide-y divide-border-soft border-y border-border-soft">
            {educationPrinciples.map((item) => (
              <article
                key={item.title}
                className="grid gap-4 py-6 sm:grid-cols-[4rem_1fr]"
              >
                <CheckCircle2 aria-hidden="true" className="size-5 text-brand-red" />
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
      </section>

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionIntro
            eyebrow="Proof points"
            title="A school history parents can understand quickly"
          >
            <p>
              The school story is simple: a long-running Russian school
              founded in 2009, with a five-school heritage, a Moscow-linked
              curriculum, performances, and progression for children growing
              up in England. GCSE and A Level Russian are handled through the
              related Volna Online Russian School route.
            </p>
          </SectionIntro>
          <div className="grid gap-5 sm:grid-cols-3">
            {schoolProofPoints.map((item) => (
              <article key={item.value} className="border-t border-brand-accent pt-5">
                <BookOpen aria-hidden="true" className="mb-3 size-5 text-brand-red" />
                <h2 className="text-xl font-semibold text-brand-blue-strong">
                  {item.value}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Parent confidence"
        title="Tell us about your child and the right class can follow"
        tone="light"
        actions={
          <ButtonLink
            href="/contact#enquiry-form"
            icon={<ArrowRight className="size-4" />}
            iconPosition="end"
          >
            Tell us about your child
          </ButtonLink>
        }
      >
        <p>
          Share your child&apos;s age, Russian confidence, home-language
          background, and goals. The school can then suggest the most suitable
          route.
        </p>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
          {nextStepNotes.map((note) => (
            <li key={note} className="flex gap-2 border-l border-brand-accent pl-4">
              <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </PageCta>
    </main>
  );
}

function AboutSchoolPhotoPanel({
  leadAsset,
  supportingAssets,
}: {
  leadAsset: MediaAsset;
  supportingAssets: MediaAsset[];
}) {
  const devChooserEnabled = process.env.NODE_ENV === "development";
  const devChooserAssets = getPublicImageDevChooserAssets([
    leadAsset,
    ...supportingAssets,
  ]);

  return (
    <figure
      className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface"
      aria-labelledby="about-school-photo-heading"
    >
      <div className="relative min-h-80 bg-surface-muted sm:min-h-[25rem]">
        {devChooserEnabled ? (
          <HeroImageDevChooser
            assets={devChooserAssets}
            initialAssetId={leadAsset.id}
            pageId="about"
            slotId="lead"
            slotLabel="About lead"
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
        ) : (
          <Image
            src={leadAsset.approvedPublicPath}
            alt={leadAsset.altText}
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <figcaption className="p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
          School life
        </p>
        <h2
          id="about-school-photo-heading"
          className="mt-2 text-xl font-semibold leading-tight text-brand-blue-strong"
        >
          Language, culture, and a shared school rhythm
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {leadAsset.caption}
        </p>
        {supportingAssets.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-2">
            {supportingAssets.slice(0, 2).map((asset, index) => (
              <div
                key={asset.id}
                className="relative min-h-32 overflow-hidden rounded-md bg-surface-muted"
              >
                {devChooserEnabled ? (
                  <HeroImageDevChooser
                    assets={devChooserAssets}
                    initialAssetId={asset.id}
                    pageId="about"
                    slotId={`small-${index + 1}`}
                    slotLabel={`About small ${index + 1}`}
                    sizes="(min-width: 1024px) 18vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={asset.approvedPublicPath}
                    alt={asset.altText}
                    fill
                    sizes="(min-width: 1024px) 18vw, 50vw"
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        ) : null}
      </figcaption>
    </figure>
  );
}
