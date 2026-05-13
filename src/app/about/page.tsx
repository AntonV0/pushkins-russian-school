import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle2, ClipboardCheck, MapPin, UsersRound } from "lucide-react";
import { ButtonLink } from "@/components/site/button-link";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SectionIntro } from "@/components/site/section-intro";
import { VisualStoryPanel } from "@/components/site/visual-story-panel";
import {
  curriculumMaterials,
  educationPrinciples,
  placementSteps,
} from "@/data/curriculum";
import {
  getGalleryCategoryCoverAsset,
  getVisualPlaceholderSlot,
  type MediaAsset,
} from "@/data/media-assets";

const aboutVisual = getVisualPlaceholderSlot("about-community-table");
const aboutLeadAsset = getGalleryCategoryCoverAsset("creative-work");
const aboutSupportingAssets = [
  getGalleryCategoryCoverAsset("locations"),
  getGalleryCategoryCoverAsset("classroom-learning"),
].filter((asset): asset is MediaAsset => Boolean(asset));

const quietHeroLink =
  "min-h-0 w-auto justify-start px-0 py-1 text-left sm:min-h-11 sm:justify-center sm:px-5 sm:py-3";

const reviewNotes = [
  "Class groups and placement guidance are shared clearly, with exact fit confirmed through enquiry.",
  "Branch pages focus on current practical details so families can choose the best next step.",
  "Photos, staff details, certificates, and partner references can be added when they are suitable for families to view.",
];

const schoolStory = [
  {
    label: "In the classroom",
    icon: BookOpen,
    title: "Russian is treated as a living language",
    body: "Children meet Russian through speaking, reading, writing, stories, cultural work, and creative school moments rather than a narrow vocabulary-only routine.",
  },
  {
    label: "Across childhood",
    icon: UsersRound,
    title: "Progression is allowed to take time",
    body: "The school presents learning as a steady supplementary pathway, from early confidence through more structured language, literature, and exam-aware preparation where relevant.",
  },
  {
    label: "At the start",
    icon: ClipboardCheck,
    title: "Placement begins with the child in front of the school",
    body: "Age is useful, but it is not the whole story. Home language exposure, confidence, reading, writing, and teacher judgement all shape the first recommendation.",
  },
];

const familyNotices = [
  {
    title: "The tone is academic without feeling cold",
    body: "The public site should make room for seriousness, care, and warmth in the same breath.",
  },
  {
    title: "Culture sits beside language, not after it",
    body: "Literature, performance, creative work, and shared traditions help explain why families choose a weekend school.",
  },
  {
    title: "The practical questions are welcomed early",
    body: "Location, age, confidence, reading, writing, and goals are treated as useful context rather than barriers to asking.",
  },
  {
    title: "The record stays careful",
    body: "Public claims can grow as suitable photos, staff details, certificates, and archive material are reviewed for family-facing use.",
  },
];

const publicRecordGuides = [
  {
    title: "Branch pages",
    body: "Use these for current location details, availability language, and the best next step for a local enquiry.",
  },
  {
    title: "Curriculum pages",
    body: "Use these to understand the learning route before asking about the right class group.",
  },
  {
    title: "Policies and contact",
    body: "Use these to check the school structure and share the practical information needed for a useful reply.",
  },
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
      <PageHero
        eyebrow="About Pushkin's School"
        title="A Russian school community for children and families"
        actions={
          <>
            <ButtonLink href="/schools" icon={<MapPin className="size-4" />}>
              Explore schools
            </ButtonLink>
            <ButtonLink
              href="/contact#enquiry-form"
              variant="quiet"
              className={quietHeroLink}
              icon={<ArrowRight className="size-4" />}
              iconPosition="end"
            >
              Start an enquiry
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
          Pushkin&apos;s School is a warm, academic weekend supplementary school
          for children studying Russian language, literature, and culture in the
          UK. Families can see the learning approach, locations, admissions
          pathway, and policy structure before they enquire.
        </p>
      </PageHero>

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="School story"
              title="A weekend school built around continuity"
            >
              <p>
                Parents need to see more than a list of subjects. Pushkin&apos;s
                School is a long-term educational setting: a place where
                Russian is practised, read, written, performed, and kept
                culturally alive across childhood.
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
          <div className="border-y border-border-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              The shape of the story
            </p>
            <div className="mt-6 divide-y divide-border-soft">
              {schoolStory.map((item) => (
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
              title="A human school, not just a timetable"
            >
              <p>
                The strongest public story is the one families can recognise:
                a child arriving with a particular mix of confidence,
                hesitation, ability, and family context, then being guided into
                a suitable learning rhythm.
              </p>
            </SectionIntro>
            <p className="mt-8 max-w-xl text-base leading-7 text-slate-700">
              This page keeps the claims modest while giving parents a clearer
              feel for the school: warm, structured, culturally grounded, and
              practical about placement.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {familyNotices.map((item) => (
              <article key={item.title} className="border-l border-brand-gold pl-5">
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
                {curriculumMaterials.map((item) => (
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
            title="Language learning that connects home, school, and culture"
          >
            <p>
              The school message centres on bilingual development, practical
              communication, cultural literacy, and a shared curriculum.
              Together, these principles form a coherent philosophy rather than
              a set of interchangeable boxes.
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
            eyebrow="Public record"
            title="Clear enough for today, careful enough to grow"
          >
            <p>
              The website can help families now without overstating the record.
              It gives practical school information first, then leaves room for
              more public proof points as they are reviewed.
            </p>
          </SectionIntro>
          <div className="grid gap-5 sm:grid-cols-3">
            {publicRecordGuides.map((item) => (
              <article key={item.title} className="border-t border-brand-gold pt-5">
                <BookOpen aria-hidden="true" className="mb-3 size-5 text-brand-red" />
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

      <PageCta
        eyebrow="Parent confidence"
        title="Ask about the right next step for your child"
        tone="light"
        actions={
          <ButtonLink
            href="/contact#enquiry-form"
            icon={<ArrowRight className="size-4" />}
            iconPosition="end"
          >
            Start an enquiry
          </ButtonLink>
        }
      >
        <p>
          The school can add more history, staff detail, trips, certificates,
          and photographs over time while keeping the current parent journey
          clear and reliable.
        </p>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
          {reviewNotes.map((note) => (
            <li key={note} className="flex gap-2 border-l border-brand-gold pl-4">
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
  return (
    <figure
      className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface"
      aria-labelledby="about-school-photo-heading"
    >
      <div className="relative min-h-80 bg-surface-muted sm:min-h-[25rem]">
        <Image
          src={leadAsset.approvedPublicPath}
          alt={leadAsset.altText}
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
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
            {supportingAssets.slice(0, 2).map((asset) => (
              <div
                key={asset.id}
                className="relative min-h-32 overflow-hidden rounded-md bg-surface-muted"
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
        ) : null}
      </figcaption>
    </figure>
  );
}
