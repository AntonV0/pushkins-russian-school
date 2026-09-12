import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle2, MapPin, UsersRound } from "lucide-react";
import {
  ButtonLink,
  quietHeroLinkClassName,
} from "@/components/site/button-link";
import { HeroImageDevChooser } from "@/components/site/hero-image-dev-chooser";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SectionIntro } from "@/components/site/section-intro";
import { VisualStoryPanel } from "@/components/site/visual-story-panel";
import { educationPrinciples } from "@/data/public/curriculum";
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
  "Explore Bracknell and Exeter for current in-person classes.",
  "If a local school is not currently available, we can note your interest and explain the online route.",
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
    icon: BookOpen,
    title: "Pushkin is more than a name",
    body: "The school takes inspiration from Alexander Pushkin and the ambition that pupils can move towards reading Russian works in the original.",
  },
];

const aboutFutureSections = [
  {
    title: "Meet the school leadership",
    body: "A concise introduction to the headteacher and educational leadership could make the school feel more personal once approved biographies and photographs are available.",
  },
  {
    title: "A visual school timeline",
    body: "Verified milestones from 2009 to the present could show how the school developed across locations without turning the page into a long written history.",
  },
  {
    title: "Parent and former-pupil stories",
    body: "Short, permission-approved experiences could provide stronger social proof than additional claims written by the school itself.",
  },
  {
    title: "Educational partners and materials",
    body: "A reviewed evidence section could explain the curriculum relationships and specialist textbooks in greater depth, with clear source links where appropriate.",
  },
] as const;

export const metadata: Metadata = {
  title: "About",
  description:
    "About Pushkin's School of Russian Language and Literature: founded in 2009 to help children in the UK build balanced bilingualism, Russian culture, and literacy.",
  alternates: { canonical: "/about" },
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
              Explore our schools
            </ButtonLink>
            <ButtonLink
              href="/contact#enquiry-form"
              variant="quiet"
              className={quietHeroLinkClassName}
              icon={<ArrowRight className="size-4" />}
              iconPosition="end"
            >
              Start registration
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
          {schoolStory.history}{" "}It was created for families who want Russian to
          remain part of their child&apos;s everyday communication, literacy,
          culture, and future study.
        </p>
      </PageHero>

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Our purpose"
              title="Founded in 2009 to keep Russian strong for children in the UK"
            >
              <p>
                Pushkin&apos;s School is a long-term educational setting: a place
                where Russian is practised, read, written, performed, and kept
                culturally alive across childhood.
              </p>
            </SectionIntro>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-700">
              {schoolStory.philosophy}
            </p>
          </div>
          <div className="divide-y divide-border-soft border-y border-border-soft">
            {schoolStoryCards.map((item) => (
              <article
                key={item.title}
                className="grid gap-4 py-6 sm:grid-cols-[8rem_1fr]"
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
      </section>

      <section className="border-y border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="What families are choosing"
              title="More than a weekly language lesson"
            >
              <p>
                Parents are choosing a place where Russian communication,
                literacy, culture and identity can remain a meaningful part of
                childhood in the UK.
              </p>
            </SectionIntro>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-700">
              Children can arrive as confident speakers, passive bilinguals or
              beginners in reading and writing. The common aim is to help each
              child use and develop the Russian they have now.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {parentValueProps.map((item) => (
              <article key={item.title} className="border-l border-brand-accent pl-5">
                <CheckCircle2
                  aria-hidden="true"
                  className="mb-3 size-5 text-brand-red"
                />
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
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionIntro
              eyebrow="Experience and foundations"
              title="A school history supported by a specialist curriculum"
            >
              <p>
                {schoolStory.curriculum}{" "}{schoolStory.materials}
              </p>
            </SectionIntro>
            <div className="grid overflow-hidden rounded-lg border border-brand-blue/15 bg-surface sm:grid-cols-2">
              {schoolProofPoints.map((item, index) => (
                <article
                  key={item.value}
                  className={`p-6 ${index > 1 ? "border-t border-brand-blue/12" : ""} ${
                    index % 2 === 1 ? "sm:border-l sm:border-brand-blue/12" : ""
                  } ${index === 1 ? "border-t sm:border-t-0" : ""}`}
                >
                  <p className="text-xl font-semibold text-brand-blue-strong">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-6 border-t border-border-soft pt-8 md:grid-cols-3">
            {educationPrinciples.map((principle) => (
              <article key={principle.title} className="border-l border-brand-accent pl-5">
                <h2 className="text-lg font-semibold text-brand-blue-strong">
                  {principle.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {principle.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-brand-blue-strong site-section-compact text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <SectionIntro
            eyebrow="School life"
            title="Language becomes part of something children share"
            tone="dark"
          >
            <p>
              {schoolStory.pushkin}{" "}Creative work, stories, cultural projects
              and performances give children visible reasons to use what they
              are learning.
            </p>
          </SectionIntro>
          <div>
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {[0, 1, 2, 4].map((index) => (
                <li
                  key={schoolLifeHighlights[index]}
                  className="flex gap-3 py-4 text-sm leading-6 text-white/75"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-brand-red"
                  />
                  <span>{schoolLifeHighlights[index]}</span>
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/gallery"
              variant="light"
              className="mt-7"
              icon={<ArrowRight className="size-4" />}
              iconPosition="end"
            >
              Explore school life
            </ButtonLink>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Your next step"
        title="Explore the school that could work for your family"
        tone="light"
        actions={
          <>
            <ButtonLink
              href="/contact#enquiry-form"
              icon={<ArrowRight className="size-4" />}
              iconPosition="end"
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
        <ul className="grid gap-2 text-sm leading-6 text-slate-600">
          {nextStepNotes.map((note) => (
            <li key={note} className="flex gap-2 border-l border-brand-accent pl-4">
              <CheckCircle2
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-brand-red"
              />
              <span>{note}</span>
            </li>
          ))}
        </ul>
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
              title="Possible additions to the About page"
            >
              <p>
                These are the strongest remaining opportunities once the core
                school story has been reviewed and verified.
              </p>
            </SectionIntro>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {aboutFutureSections.map((idea) => (
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
