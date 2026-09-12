import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardPenLine,
  MapPin,
  MessageSquareText,
  Plus,
} from "lucide-react";
import {
  ButtonLink,
  quietActionLinkClassName,
} from "@/components/site/button-link";
import {
  CelebrationShowcase,
  type CelebrationSlide,
} from "@/components/site/celebration-showcase";
import curriculumStyles from "@/components/site/home-curriculum.module.css";
import classroomStyles from "@/components/site/home-classroom.module.css";
import identityStyles from "@/components/site/home-identity.module.css";
import trustStyles from "@/components/site/home-trust.module.css";
import heroStyles from "@/components/site/home-hero.module.css";
import { PageHero } from "@/components/site/page-hero";
import { DevBreakpointStrip } from "@/components/site/dev-breakpoint-strip";
import { SectionIntro } from "@/components/site/section-intro";
import { VideoPosterPlayer } from "@/components/site/video-poster-player";
import { schoolProofPoints } from "@/data/public/school-story";
import {
  approvedMediaAssets,
  getGalleryCategoryCoverAsset,
  getHeroReadyMedia,
  type MediaAsset,
} from "@/features/gallery/data/media-assets";
import { extendedGalleryMediaAssets } from "@/features/gallery/data/extended-gallery-assets";
import { schools } from "@/data/public/schools";

function getApprovedMediaAssetById(id: string) {
  return approvedMediaAssets.find((asset) => asset.id === id);
}

const homepageHeroSourceByMediaId: Record<string, string> = {
  "WIX-HIGH-WYCOMBE-0096":
    "/images/site/homepage-hero-high-wycombe-school-sign-930.jpg",
  "WIX-HEMEL-0093": "/images/site/homepage-hero-hemel-classroom-source.jpg",
  "WIX-HIGH-WYCOMBE-0131":
    "/images/site/homepage-hero-high-wycombe-classroom-source.jpg",
};
const homepageHeroLeadSrcSetByMediaId: Record<string, string> = {
  "WIX-HIGH-WYCOMBE-0096":
    "/images/site/homepage-hero-high-wycombe-school-sign-620.jpg 620w, /images/site/homepage-hero-high-wycombe-school-sign-930.jpg 930w, /images/site/homepage-hero-high-wycombe-school-sign-1240.jpg 1240w",
};

const heroLeadAsset =
  getApprovedMediaAssetById("BRACKNELL-DSC03280") ??
  getHeroReadyMedia()[0] ??
  getGalleryCategoryCoverAsset("classroom-learning");
const heroLeadImageSrc =
  heroLeadAsset && homepageHeroSourceByMediaId[heroLeadAsset.id]
    ? homepageHeroSourceByMediaId[heroLeadAsset.id]
    : heroLeadAsset?.approvedPublicPath;
const heroLeadImageSrcSet =
  heroLeadAsset && homepageHeroLeadSrcSetByMediaId[heroLeadAsset.id]
    ? homepageHeroLeadSrcSetByMediaId[heroLeadAsset.id]
    : undefined;
const heroSupportingAssets = [
  getApprovedMediaAssetById("WIX-HEMEL-0093") ??
    getGalleryCategoryCoverAsset("creative-work"),
  getApprovedMediaAssetById("WIX-HIGH-WYCOMBE-0131") ??
    getGalleryCategoryCoverAsset("performances"),
].filter((asset): asset is MediaAsset => Boolean(asset));
const trustSupportingAsset =
  getApprovedMediaAssetById("BRACKNELL-DSC03332") ??
  getGalleryCategoryCoverAsset("creative-work");
const schoolIntroVideo = {
  src: "/videos/site/pushkins-school-classroom-introduction.mp4",
  poster: "/images/locations/exeter/exeter-classroom-learning.webp",
};
const homepageCommunityImage = {
  src: "/images/locations/bracknell/bracknell-performance-wide.webp",
  alt: "Children performing for families at Pushkin's School in Bracknell.",
};
const homepageLocationImageAssets: Record<string, MediaAsset | undefined> = {
  bracknell: getApprovedMediaAssetById("BRACKNELL-DSC03270"),
  exeter: extendedGalleryMediaAssets.find((asset) => asset.id === "IMG-0007"),
};
const homepageLocationImagePresentation: Record<
  string,
  { objectPosition: string }
> = {
  bracknell: { objectPosition: "center 43%" },
  exeter: { objectPosition: "center 38%" },
};
const homepageSchoolTermDetails: Record<
  string,
  { venue: string; schedule: string; startDate: string; summary: string }
> = {
  bracknell: {
    venue: "Saint Joseph's Primary School · Gipsy Lane · RG12 9AP",
    schedule: "Sundays, 09:30 to 12:30",
    startDate: "First school day · 20 September 2026",
    summary: "Ask about current places and the right starting group for your child.",
  },
  exeter: {
    venue: "Exeter area · venue details provided after enquiry",
    schedule: "Saturdays, 09:30 to 12:30",
    startDate: "First school day · 12 September 2026",
    summary:
      "Ask about current availability and a suitable learning group for your child.",
  },
};

const parentJourney = [
  {
    title: "Professional, experienced teachers",
    body: "Our teachers bring years of classroom experience and subject knowledge to every lesson.",
  },
  {
    title: "Building from what children already know",
    body: "Lessons begin with familiar Russian, then gently introduce new words, phrases and grammar.",
  },
  {
    title: "Friendship through language",
    body: "Children use Russian socially through shared activities, celebrations, and performances.",
  },
  {
    title: "Russian skills that develop over time",
    body: "Each stage of learning helps children become more fluent and independent Russian speakers.",
  },
];

const proofPointCategories = [
  "Years of experience",
  "Local communities",
  "Ages 3–18",
  "Teaching approach",
] as const;

const homepageProofPoints = [
  {
    ...schoolProofPoints[0],
    label:
      "Pushkin's School has helped hundreds of children speak, read and write Russian with confidence.",
  },
  schoolProofPoints[1],
  {
    value: "Teaching for every stage",
    label:
      "Lessons are adapted to each child’s age and level, with balanced bilingualism as the long-term goal.",
  },
  schoolProofPoints[3],
] as const;

const joiningSteps = [
  {
    title: "Complete the registration form",
    body: "Select your preferred school and share some initial details about your child.",
  },
  {
    title: "Hear from our headteacher",
    body: "Our headteacher sends a longer safeguarding form and invites your child to attend on the next scheduled school day.",
  },
  {
    title: "Begin the first three weeks",
    body: "The introductory payment covers three weeks, during which teachers place your child with learners at a similar Russian level.",
  },
];

const homepageCurriculumPrototype = [
  {
    label: "Communication",
    title: "From understanding to expression",
    body: "Speaking and listening develop alongside vocabulary and grammar, helping children express their own ideas more clearly in Russian.",
  },
  {
    label: "Literacy",
    title: "Developing reading and writing together",
    body: "Children progress from letters and sounds towards reading with greater confidence and writing more clearly in Russian, with activities matched to their current skills.",
  },
  {
    label: "Literature",
    title: "Exploring Russian literature",
    body: "Stories, poetry and theatre deepen vocabulary and comprehension, helping children engage with Russian literature through reading, discussion and performance.",
  },
] as const;

const homepageCelebrationSlides = [
  {
    assetId: "IMG-0054",
    objectPosition: "center",
    label: "Performing together",
    caption:
      "At school events, children take the stage and perform in Russian, with families in the audience.",
  },
  {
    assetId: "IMG-0069",
    objectPosition: "center",
    label: "Children's artwork",
    caption:
      "Art activities give children a colourful way to respond to stories and ideas.",
  },
  {
    assetId: "IMG-0035",
    objectPosition: "center",
    label: "Culture and tradition",
    caption:
      "Traditional objects and decorations give children a tangible connection to Russian culture.",
  },
  {
    assetId: "IMG-0037",
    objectPosition: "center",
    label: "Hands-on making",
    caption:
      "Small craft activities encourage children to experiment with materials and make something of their own.",
  },
  {
    assetId: "WIX-LOOSE-0013",
    objectPosition: "center 70%",
    label: "Seasonal celebrations",
    caption:
      "Games, costumes and shared traditions bring children and families together beyond the weekly classes.",
  },
].flatMap((slide): CelebrationSlide[] => {
  const asset = getApprovedMediaAssetById(slide.assetId);

  return asset
    ? [
        {
          src: asset.approvedPublicPath,
          alt: asset.altText,
          label: slide.label,
          caption: slide.caption,
          objectPosition: slide.objectPosition,
        },
      ]
    : [];
});

const homepageFaqs = [
  {
    question: "Does my child need to already speak Russian?",
    answer:
      "No. Children join us with different levels of Russian. Tell us their age and what they currently understand, speak, read or write, and our teachers will help them find a comfortable starting point.",
  },
  {
    question: "Does Pushkin's School offer GCSE or A Level Russian?",
    answer: (
      <>
        Pushkin&apos;s School focuses on weekend Russian language classes. GCSE
        and A Level Russian are available online through{" "}
        <Link
          href="/online-lessons"
          className="font-semibold text-brand-blue-strong underline decoration-brand-accent/65 underline-offset-4 transition hover:decoration-brand-red"
        >
          Volna Online Russian School
        </Link>
        .
      </>
    ),
  },
  {
    question: "Where can I see school locations, fees and availability?",
    answer: (
      <>
        <Link
          href="/schools"
          className="font-semibold text-brand-blue-strong underline decoration-brand-accent/65 underline-offset-4 transition hover:decoration-brand-red"
        >
          View our school locations
        </Link>{" "}
        to compare branches and find the latest timetable, fee and availability
        information for each school.
      </>
    ),
  },
  {
    question: "Can I register interest in a school that is not currently open?",
    answer: (
      <>
        Yes. Use the{" "}
        <Link
          href="/contact#enquiry-form"
          className="font-semibold text-brand-blue-strong underline decoration-brand-accent/65 underline-offset-4 transition hover:decoration-brand-red"
        >
          registration form
        </Link>{" "}
        to tell us which area you are interested in. We may contact you if a
        school opens there in future, and we can suggest online alternatives in
        the meantime.
      </>
    ),
  },
] as const;

export const metadata: Metadata = {
  title: "Pushkin's School | Russian School UK for Children",
  description:
    "Pushkin's School is a weekend Russian school for children aged 3-18 in the UK, helping families keep Russian language, literature, culture, and balanced bilingualism alive.",
  keywords: [
    "Russian school UK",
    "Russian language classes for children",
    "weekend Russian school",
    "Russian culture for children",
    "Russian literature for children",
    "balanced bilingualism",
    "Russian school near me",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pushkin's School | Russian School UK for Children",
    description:
      "Weekend Russian language, literature, and culture classes for children aged 3-18, with a proud school heritage and clear routes for local or online learning.",
    url: "/",
  },
};

export default function Home() {
  const currentSchools = schools.filter((school) => school.status === "open");

  return (
    <main>
      {process.env.NODE_ENV === "development" ? <DevBreakpointStrip /> : null}
      <HomepageSectionMarker number={1}>
        <PageHero
          eyebrow="Weekend Russian language education"
          title="Russian schools for children in the UK"
          variant="home"
          aside={<HeroSchoolVisual />}
          actions={
            <>
              <ButtonLink
                href="/contact#enquiry-form"
                className="min-h-12 px-6 py-3.5 text-[0.95rem]"
                icon={
                  <MessageSquareText className="size-4" />
                }
              >
                Ask about joining
              </ButtonLink>
              <ButtonLink
                href="/schools"
                variant="quiet"
                className={`${quietActionLinkClassName} text-[0.95rem]`}
                icon={
                  <MapPin className="size-4" />
                }
              >
                See school locations
              </ButtonLink>
            </>
          }
        >
          <p className="max-w-2xl text-lg leading-7 text-brand-blue-strong sm:text-2xl sm:leading-9 lg:text-xl lg:leading-8 min-[1180px]:text-2xl min-[1180px]:leading-9">
            Our classes help children enjoy and use Russian through
            conversation, stories and traditions, whether they speak Russian
            at home or are discovering it for the first time.
          </p>
        </PageHero>
      </HomepageSectionMarker>

      <HomepageSectionMarker number={2}>
        <section id="school-at-a-glance" className="border-b border-border-soft bg-surface py-9 sm:py-11" aria-labelledby="school-at-a-glance-title">
          <div className="home-content-container mx-auto max-w-7xl px-6 lg:px-8">
            <div className={trustStyles.heading}>
              <h2 id="school-at-a-glance-title">
                <span>Pushkin&apos;s School</span>{" "}
                <span className={trustStyles.subtitle}>at a glance</span>
              </h2>
              <Link href="/about" className={trustStyles.link}>
                Read our story <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className={trustStyles.panel}><HomeTrustPanel /></div>
          </div>
        </section>
      </HomepageSectionMarker>
      <HomepageSectionMarker number={3}>
        <PushkinLiterarySection />
      </HomepageSectionMarker>

      <HomepageSectionMarker number={4}>
        <section className="border-y border-border-soft bg-surface site-section-compact">
        <div className={`home-content-container mx-auto grid max-w-7xl gap-6 px-6 sm:gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-10 lg:px-8 ${classroomStyles.section}`}>
          <div>
            <SectionIntro
              title="Step inside our classrooms"
            >
              <p>
                Meet our supportive teachers and see how they help children feel
                comfortable joining in, speaking Russian and learning together.
              </p>
            </SectionIntro>
          </div>

          <figure className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-background">
            <VideoPosterPlayer
              src={schoolIntroVideo.src}
              poster={schoolIntroVideo.poster}
              ariaLabel="Introductory video showing Pushkin's School classroom life"
              overlayTitle="A warm welcome to Pushkin's School"
              overlayDescription="Russian language, community, and culture"
              className="aspect-video w-full bg-brand-blue-strong object-cover object-center"
            />
          </figure>
        </div>
        </section>
      </HomepageSectionMarker>

      <HomepageSectionMarker number={5}>
        <section className="border-y border-border-soft bg-background site-section-compact">
          <div className={`home-content-container mx-auto max-w-7xl px-6 lg:px-8 ${curriculumStyles.section}`}>
            <div className={`grid gap-7 border-b border-border-soft pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 ${curriculumStyles.intro}`}>
              <SectionIntro title="What children learn at Pushkin's School">
                <p>
                  Our curriculum was developed through cooperation with{" "}
                  <Link
                    href="https://eng.rudn.ru/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="RUDN University (opens in a new tab)"
                    className="font-medium text-brand-blue-strong underline decoration-brand-accent/50 underline-offset-4 transition hover:decoration-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2"
                  >
                    RUDN University
                  </Link>
                  ,{" "}
                  <Link
                    href="https://www.pushkin.institute/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="The Pushkin State Institute (opens in a new tab)"
                    className="font-medium text-brand-blue-strong underline decoration-brand-accent/50 underline-offset-4 transition hover:decoration-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2"
                  >
                    the Pushkin State Institute
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="https://specped.ru/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="The Scientific Methodical Russian Speech Centre (opens in a new tab)"
                    className="font-medium text-brand-blue-strong underline decoration-brand-accent/50 underline-offset-4 transition hover:decoration-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2"
                  >
                    the Scientific Methodical Russian Speech Centre
                  </Link>{" "}
                  in Moscow. Pushkin&apos;s School adapts this foundation for
                  children growing up in the UK and learning Russian alongside
                  their wider education.
                </p>
              </SectionIntro>
              <Link
                href="/curriculum"
                className="group inline-flex min-h-11 w-fit items-center gap-2 py-2 text-base font-semibold text-brand-blue-strong underline decoration-brand-red/35 underline-offset-4 transition hover:-translate-y-0.5 hover:text-brand-red hover:decoration-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-4 lg:justify-self-end"
              >
                <span>Explore our curriculum</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className={curriculumStyles.panel}>
              {homepageCurriculumPrototype.map((strand) => (
                <article key={strand.label} className={curriculumStyles.strand}>
                  <p className={curriculumStyles.label}>{strand.label}</p>
                  <h3>{strand.title}</h3>
                  <p className={curriculumStyles.body}>{strand.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </HomepageSectionMarker>

      <HomepageSectionMarker number={6}>
        <CelebrationShowcase slides={homepageCelebrationSlides} />
      </HomepageSectionMarker>

      <HomepageSectionMarker number={7}>
        <section className="border-y border-border-soft bg-background py-12 lg:py-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <SectionIntro title="Weekend classes in Bracknell and Exeter" />
              <p className="mt-4 max-w-[42rem] text-base leading-7 text-slate-600">
                Both schools meet from 09:30 to 12:30 — Sundays in Bracknell
                and Saturdays in Exeter.
              </p>
            </div>

            <div className="mt-7 overflow-hidden border border-border-soft bg-surface shadow-[var(--elevation-panel)]">
              <div className="grid divide-y divide-border-soft lg:grid-cols-2 lg:divide-x lg:divide-y-0">
                {currentSchools.map((school) => {
                  const imageAsset = homepageLocationImageAssets[school.slug];
                  const imagePresentation =
                    homepageLocationImagePresentation[school.slug];
                  const termDetails = homepageSchoolTermDetails[school.slug];

                  return (
                    <article
                      key={school.slug}
                      className="flex min-w-0 flex-col bg-surface"
                    >
                      {imageAsset ? (
                        <figure className="relative aspect-[2/1] overflow-hidden border-b border-border-soft bg-surface-muted">
                          <Image
                            src={imageAsset.approvedPublicPath}
                            alt={imageAsset.altText}
                            fill
                            sizes="(min-width: 1024px) 608px, calc(100vw - 3rem)"
                            quality={90}
                            className="object-cover"
                            style={{
                              objectPosition:
                                imagePresentation?.objectPosition ?? "center",
                            }}
                          />
                        </figure>
                      ) : null}

                      <div className="flex flex-1 flex-col px-6 py-6 sm:px-8 sm:py-7 lg:px-10">
                        <div className="flex items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className="size-2 rounded-full bg-emerald-600"
                          />
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue-strong">
                            Current in-person school
                          </p>
                        </div>

                        <h3 className="mt-4 text-3xl font-semibold tracking-tight text-brand-blue-strong sm:text-4xl">
                          {school.name}, {school.county}
                        </h3>
                        <p className="mt-3 inline-flex w-fit max-w-full items-center gap-2 rounded-lg border border-border-soft bg-surface-blue/55 px-3 py-2 text-sm font-semibold leading-5 text-brand-blue-strong lg:min-h-[3.625rem] xl:min-h-0">
                          <MapPin
                            aria-hidden="true"
                            className="size-4 shrink-0 text-brand-accent"
                          />
                          <span>{termDetails?.venue}</span>
                        </p>

                        <div className="mt-5 border-l-2 border-brand-accent/45 pl-4">
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                            2026–27 school year
                          </p>
                          <p className="mt-2 text-lg font-semibold leading-7 text-brand-blue-strong">
                            {termDetails?.schedule}
                          </p>
                          <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                            {termDetails?.startDate}
                          </p>
                        </div>

                        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
                          {termDetails?.summary}
                        </p>

                        <div className="mt-auto pt-5">
                          <ButtonLink
                            href={`/schools/${school.slug}`}
                            className="self-start"
                            icon={<ArrowRight className="size-4" />}
                            iconPosition="end"
                          >
                            See {school.name} school details
                          </ButtonLink>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="flex flex-col gap-5 border-t border-border-soft bg-surface-blue/45 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div>
                  <h3 className="text-lg font-semibold text-brand-blue-strong">
                    Not near Bracknell or Exeter?
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                    If travelling to either school is difficult, you can
                    register interest in another area or consider online
                    lessons.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                  <Link
                    href="/schools#location-explorer"
                    className="group inline-flex min-h-10 items-center gap-2 py-1 text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/35 underline-offset-4 transition hover:text-brand-red hover:decoration-brand-red"
                  >
                    <span>View other locations</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                  <Link
                    href="/online-lessons"
                    className="group inline-flex min-h-10 items-center gap-2 py-1 text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/35 underline-offset-4 transition hover:text-brand-red hover:decoration-brand-red"
                  >
                    <span>Explore online lessons</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </HomepageSectionMarker>

      <HomepageSectionMarker number={8}>
        <section className="bg-surface site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl">
              <SectionIntro title="From registration to the first three weeks">
                <p>
                  A clear process for completing the necessary forms and helping
                  your child settle into a suitable group.
                </p>
              </SectionIntro>
            </div>
            <Link
              href="/admissions"
              className="group inline-flex min-h-11 w-fit items-center gap-2 py-2 text-base font-semibold text-brand-blue-strong underline decoration-brand-red/35 underline-offset-4 transition hover:-translate-y-0.5 hover:text-brand-red hover:decoration-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-4 lg:mb-1"
            >
              <span>View admissions and fees</span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          <ol className="mt-12 grid gap-y-10 md:grid-cols-3 md:gap-x-10 lg:gap-x-14">
            {joiningSteps.map((step, index) => (
              <li
                key={step.title}
                className="min-w-0"
              >
                <span className="font-mono text-5xl font-semibold tracking-[-0.07em] text-brand-blue/20">
                  0{index + 1}
                </span>
                <h3 className="mt-6 text-2xl font-semibold leading-tight text-brand-blue-strong">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-700">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
        </section>
      </HomepageSectionMarker>

      <HomepageSectionMarker number={9}>
        <section className="border-y border-border-soft bg-background site-section-compact">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
            <div>
              <SectionIntro eyebrow="FAQ" title="What parents ask before joining" />
              <Link
                href="/faq"
                className="group mt-7 inline-flex min-h-11 w-fit items-center gap-2 py-2 text-base font-semibold text-brand-blue-strong underline decoration-brand-red/35 underline-offset-4 transition hover:-translate-y-0.5 hover:text-brand-red hover:decoration-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-4"
              >
                <span>See all frequently asked questions</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="divide-y divide-border-soft border-y border-border-soft bg-surface">
              {homepageFaqs.map((item) => (
                <details key={item.question} className="group px-5 sm:px-6">
                  <summary className="-mx-5 flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left font-semibold text-brand-blue-strong transition-colors duration-150 ease-out marker:content-none hover:bg-surface-blue/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-red/40 group-open:hover:bg-transparent sm:-mx-6 sm:px-6 [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <Plus
                      aria-hidden="true"
                      className="size-5 shrink-0 text-brand-red transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="max-w-2xl pb-5 pr-10 pt-1 text-sm leading-6 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </HomepageSectionMarker>

      <HomepageSectionMarker number={10}>
        <section
          className="border-y border-border-soft bg-white"
          aria-labelledby="homepage-final-cta-title"
        >
          <div className="mx-auto grid max-w-[80rem] lg:min-h-[25rem] lg:grid-cols-[1.45fr_1fr]">
            <figure className="relative aspect-[4/3] overflow-hidden bg-surface-muted sm:aspect-video lg:aspect-auto lg:min-h-[25rem]">
              <Image
                src={homepageCommunityImage.src}
                alt={homepageCommunityImage.alt}
                fill
                sizes="(min-width: 1280px) 758px, (min-width: 1024px) 59vw, 100vw"
                quality={90}
                className="object-cover object-center"
              />
            </figure>

            <div className="flex flex-col justify-center border-border-soft bg-transparent px-6 py-10 sm:px-8 lg:border-l lg:px-10 lg:py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                Your next step
              </p>
              <h2
                id="homepage-final-cta-title"
                className="mt-3 text-3xl font-semibold leading-tight text-brand-blue-strong sm:text-4xl lg:text-3xl xl:text-4xl"
              >
                Ready to join Pushkin&apos;s School?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
                Share your child&apos;s age and experience with Russian. We&apos;ll
                guide you through enrolment at your nearest school, with{" "}
                <Link
                  href="/online-lessons"
                  className="font-semibold text-brand-blue-strong underline decoration-brand-accent/65 underline-offset-4 transition hover:decoration-brand-red"
                >
                  online lessons
                </Link>{" "}
                also available if they better fit your family&apos;s schedule.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink
                  href="/contact#enquiry-form"
                  icon={<ClipboardPenLine className="size-4" />}
                >
                  Start registration
                </ButtonLink>
                <ButtonLink
                  href="/schools#location-explorer"
                  variant="secondary"
                  icon={<MapPin className="size-4" />}
                >
                  See school locations
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </HomepageSectionMarker>
    </main>
  );
}

function HomepageSectionMarker({
  children,
  number,
}: {
  children: ReactNode;
  number: number;
}) {
  if (process.env.NODE_ENV === "production") {
    return children;
  }

  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 z-30 select-none font-mono text-5xl font-semibold leading-none text-slate-400/55 sm:right-5 sm:top-4 sm:text-6xl lg:right-8 lg:text-7xl"
      >
        {String(number).padStart(2, "0")}
      </span>
      {children}
    </div>
  );
}

function SchoolIdentityVisual() {
  return (
    <div className={identityStyles.visual}>
      <figure className="relative size-full overflow-hidden rounded-2xl border border-brand-blue/10 bg-surface-muted shadow-[var(--elevation-panel)]">
        <Image
          src="/images/archive/extended/community-archive/extended-community-archive-img-0194.jpg"
          alt="Two children standing outside school beside a Pushkin's School sign."
          fill
          sizes="(min-width: 1280px) 480px, (min-width: 1024px) 840px, (min-width: 720px) 672px, calc(100vw - 48px)"
          quality={90}
          className="object-cover"
        />
      </figure>
    </div>
  );
}

function PushkinLiterarySection() {
  return (
    <section aria-labelledby="why-families-title" className="bg-background site-section-compact">
      <div className="home-content-container mx-auto max-w-7xl px-6 lg:px-8">
        <div className={identityStyles.heading}>
          <span aria-hidden="true" className={identityStyles.accent} />
          <h2 id="why-families-title" className="text-3xl font-semibold tracking-tight text-brand-blue-strong sm:text-4xl">
            Why families choose Pushkin&apos;s School
          </h2>
        </div>
        <div className={identityStyles.layout}>
          <SchoolIdentityVisual />
          <div className={identityStyles.benefits}>
            {parentJourney.map((item) => (
              <article key={item.title} className={identityStyles.benefit}>
                <h3 className="text-2xl font-semibold leading-tight text-brand-blue-strong">
                  {item.title}
                </h3>
                <p className="text-base leading-7 text-slate-700">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSchoolVisual() {
  if (!heroLeadAsset) {
    return <HeroSchoolVisualFallback />;
  }

  return (
    <div
      className="grid gap-3 sm:gap-4"
      aria-label="School life photographs"
    >
      <figure className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface">
        <div className={`${heroStyles.leadImage} relative min-h-48 bg-surface-muted sm:min-h-[17rem] lg:min-h-[18rem]`}>
          {heroLeadImageSrcSet ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroLeadImageSrc ?? heroLeadAsset.approvedPublicPath}
              srcSet={heroLeadImageSrcSet}
              sizes="(min-width: 1180px) 620px, (min-width: 1024px) 54vw, 100vw"
              alt={heroLeadAsset.altText}
              className="absolute inset-0 size-full object-cover"
              decoding="async"
              fetchPriority="high"
            />
          ) : (
            <Image
              src={heroLeadImageSrc ?? heroLeadAsset.approvedPublicPath}
              alt={heroLeadAsset.altText}
              fill
              sizes="(min-width: 1180px) 620px, (min-width: 1024px) 54vw, 100vw"
              quality={90}
              className="object-cover"
              priority
            />
          )}
        </div>
        <figcaption className="hidden bg-white/72 px-5 py-3 text-sm leading-5 text-brand-blue-strong sm:block min-[1180px]:px-4">
          We&apos;ve taught across{" "}
          <strong className="font-semibold">
            Buckinghamshire, Hertfordshire, Berkshire, Essex, and Devon.
          </strong>
        </figcaption>
      </figure>
      <div className="hidden grid-cols-2 gap-3 lg:grid">
        {heroSupportingAssets.map((asset) => (
          <div
            key={asset.id}
            className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-white"
          >
            <div className="relative min-h-40 overflow-hidden bg-surface-muted sm:min-h-40">
              <Image
                src={
                  homepageHeroSourceByMediaId[asset.id] ??
                  asset.approvedPublicPath
                }
                alt={asset.altText}
                fill
                sizes="(min-width: 1180px) 300px, (min-width: 1024px) 25vw, 50vw"
                quality={90}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustSupportingVisual() {
  if (!trustSupportingAsset) {
    return null;
  }

  return (
    <figure className="overflow-hidden bg-surface-muted">
      <div className="relative aspect-[4/3] min-[430px]:aspect-auto min-[430px]:h-[clamp(17rem,45vw,23.75rem)] lg:h-full lg:min-h-[25rem]">
        <Image
          src={trustSupportingAsset.approvedPublicPath}
          alt={trustSupportingAsset.altText}
          fill
          sizes="(min-width: 1280px) 500px, (min-width: 1024px) 36vw, (min-width: 720px) 672px, calc(100vw - 48px)"
          className="object-cover object-top lg:object-center"
        />
      </div>
    </figure>
  );
}

function ProofPointLabel({
  point,
  inverse = false,
}: {
  point: (typeof homepageProofPoints)[number];
  inverse?: boolean;
}) {
  const links = "links" in point ? point.links : undefined;

  if (!links) {
    return point.label;
  }

  const parts: ReactNode[] = [];
  let cursor = 0;

  links.forEach((link) => {
    const linkStart = point.label.indexOf(link.label, cursor);

    if (linkStart === -1) {
      return;
    }

    if (linkStart > cursor) {
      parts.push(point.label.slice(cursor, linkStart));
    }

    const external = "external" in link && link.external;

    parts.push(
      <Link
        key={link.href}
        href={link.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        aria-label={
          external ? `${link.label} (opens in a new tab)` : undefined
        }
        className={
          inverse
            ? "font-medium text-white decoration-white/70 underline-offset-4 transition hover:underline focus-visible:underline focus-visible:outline-none"
            : "font-medium text-brand-blue-strong decoration-brand-accent/60 underline-offset-4 transition hover:underline focus-visible:underline focus-visible:outline-none"
        }
      >
        {link.label}
      </Link>,
    );

    cursor = linkStart + link.label.length;
  });

  if (cursor < point.label.length) {
    parts.push(point.label.slice(cursor));
  }

  return parts;
}

function HeroSchoolVisualFallback() {
  return (
    <div
      className="grid gap-3 sm:gap-4"
      aria-label="School life photographs"
    >
      <div className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface">
        <div className="relative min-h-48 bg-surface-muted sm:min-h-[17rem] lg:min-h-[18rem]">
          <div className="fine-grid absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-6 rounded-md border border-dashed border-brand-blue/20 bg-white/55" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
              School life
            </p>
            <p className="mt-3 max-w-sm text-2xl font-semibold leading-tight text-brand-blue-strong">
              Reading, speaking, writing, and cultural work in a weekend school
              setting
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {["Ages 3-18", "Literature", "Performance"].map((item) => (
          <span
            key={item}
            className="border-l border-brand-accent bg-surface px-2 py-2 text-xs font-semibold text-brand-blue-strong"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function HomeTrustPanel() {
  return (
            <div className="grid overflow-hidden rounded-2xl border border-brand-blue/15 bg-brand-blue-strong shadow-[var(--elevation-feature)] lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-stretch xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
              <TrustSupportingVisual />

              <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(125,174,205,0.2),transparent_42%)]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-14 -top-16 size-52 rounded-full border border-white/10"
                />
                <div className={`${trustStyles.proofGrid} relative grid h-full sm:grid-cols-2`}>
                  {homepageProofPoints.map((point, index) => (
                    <article
                      key={point.value}
                      className={`${trustStyles.proofCard} flex flex-col p-5 sm:min-h-[12.5rem] sm:p-6 md:p-7 lg:p-6 xl:p-7 ${
                        index > 0 ? "border-t border-white/15" : ""
                      } ${
                        index % 2 === 1 ? "sm:border-l sm:border-white/15" : ""
                      } ${index === 1 ? "sm:border-t-0" : ""}`}
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#a9cade]">
                        {proofPointCategories[index]}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold leading-snug text-white sm:mt-4">
                        {point.value}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/72">
                        <ProofPointLabel point={point} inverse />
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
  );
}
