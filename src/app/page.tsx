import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Drama,
  HeartHandshake,
  Languages,
  MapPin,
  MessageSquareText,
  School,
} from "lucide-react";
import {
  ButtonLink,
  quietHeroLinkClassName,
} from "@/components/site/button-link";
import { PageHero } from "@/components/site/page-hero";
import { SectionIntro } from "@/components/site/section-intro";
import { VideoPosterPlayer } from "@/components/site/video-poster-player";
import { curriculumPillars } from "@/data/public/curriculum";
import { schoolProofPoints } from "@/data/public/school-story";
import {
  approvedMediaAssets,
  getGalleryCategoryCoverAsset,
  getHeroReadyMedia,
  type MediaAsset,
} from "@/features/gallery/data/media-assets";
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
  src: "/images/archive/extended/wix-missing/bracknell/bracknell-group-video-poster.jpg",
  alt: "Children, families, and teachers gathered together at Pushkin's School in Bracknell.",
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
    title: "Share your child's Russian background",
    body: "Tell us their age, school year, confidence with speaking, reading, and writing, and whether Russian is used at home.",
  },
  {
    title: "Find the right class or route",
    body: "We match the child to the most suitable current location, register-interest area, or online route through Volna where that is a better fit.",
  },
  {
    title: "Start and adjust if needed",
    body: "Placement can be reviewed after the first weeks so children are challenged, supported, and not placed only by age.",
  },
];

const homepageCurriculumPillars = [
  curriculumPillars[0],
  curriculumPillars[1],
  {
    title: "Progression for older learners",
    body: "As pupils grow, lessons deepen their grammar, literacy and engagement with Russian literature, helping them become more independent readers, writers and speakers.",
  },
] as const;

const homepageSchoolSummaries: Record<string, string> = {
  "high-wycombe":
    "Register local interest or ask about online Russian lessons while in-person classes are not currently listed.",
  "hemel-hempstead":
    "Register local interest in Hertfordshire or discuss online Russian lessons.",
  bracknell:
    "Current Sunday in-person classes for families looking for classroom rhythm and community.",
  chelmsford:
    "Register local interest in Essex or ask about Volna online lessons.",
  "southend-on-sea":
    "Register local interest in Essex or discuss online learning routes.",
  exeter:
    "Register interest in Devon while the local venue, timetable, and provision are confirmed.",
};

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
  const currentSchool = schools.find((school) => school.status === "open");
  const interestSchools = schools.filter((school) => school.status !== "open");

  return (
    <main>
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
                className="group relative min-h-12 overflow-hidden px-6 py-3.5 text-[0.95rem] shadow-[0_12px_28px_rgba(20,56,102,0.2)] before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(20,56,102,0.27)] hover:before:translate-x-full"
                icon={
                  <MessageSquareText className="size-4 transition-transform duration-200 group-hover:scale-105" />
                }
              >
                Ask about joining
              </ButtonLink>
              <ButtonLink
                href="/schools"
                variant="quiet"
                className={`${quietHeroLinkClassName} group text-[0.95rem] transition duration-200 hover:-translate-y-0.5 hover:scale-[1.015] hover:decoration-brand-red/80`}
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
        <section className="border-b border-border-soft bg-surface py-9 sm:py-11">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-brand-blue-strong sm:text-4xl">
                Pushkin&apos;s School at a glance
              </h2>
              <Link
                href="/about"
                className="group inline-flex min-h-11 w-fit items-center gap-2 py-2 text-base font-semibold text-brand-blue-strong underline decoration-brand-red/35 underline-offset-4 transition hover:-translate-y-0.5 hover:text-brand-red hover:decoration-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-4"
              >
                <span>Read our story</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
            <div className="grid overflow-hidden rounded-2xl border border-brand-blue/15 bg-brand-blue-strong shadow-[0_24px_60px_rgba(20,56,102,0.16)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-stretch">
              <TrustSupportingVisual />

              <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(125,174,205,0.2),transparent_42%)]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-14 -top-16 size-52 rounded-full border border-white/10"
                />
                <div className="relative grid h-full sm:grid-cols-2">
                  {homepageProofPoints.map((point, index) => (
                    <article
                      key={point.value}
                      className={`flex flex-col justify-center p-6 sm:min-h-[12.5rem] sm:p-7 ${
                        index > 0 ? "border-t border-white/15" : ""
                      } ${
                        index % 2 === 1 ? "sm:border-l sm:border-white/15" : ""
                      } ${index === 1 ? "sm:border-t-0" : ""}`}
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#a9cade]">
                        {proofPointCategories[index]}
                      </p>
                      <h3 className="mt-4 text-xl font-semibold leading-snug text-white">
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
          </div>
        </section>
      </HomepageSectionMarker>

      <HomepageSectionMarker number={3}>
        <PushkinLiterarySection />
      </HomepageSectionMarker>

      <HomepageSectionMarker number={4}>
        <section className="border-y border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-8">
          <div>
            <SectionIntro
              title="Step inside our classrooms"
            >
              <p>
                Meet our supportive teachers and see how they help children feel
                comfortable joining in, speaking Russian and learning together.
              </p>
            </SectionIntro>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/gallery"
                variant="quiet"
                className="min-h-0 w-auto justify-start px-0 py-1.5 text-left !text-base sm:min-h-0 sm:px-0 sm:py-1.5"
                icon={<ArrowRight className="size-4.5" />}
                iconPosition="end"
              >
                View our gallery
              </ButtonLink>
            </div>
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
        <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Learning approach"
              title="What children learn at Pushkin's School"
            >
              <p>
                The curriculum is built for children growing up in the UK:
                practical Russian for communication, structured literacy,
                cultural knowledge, and a path towards reading Russian
                literature in the original.
              </p>
            </SectionIntro>
            <Link
              href="/curriculum"
              className="group mt-7 inline-flex min-h-11 w-fit items-center gap-2 py-2 text-base font-semibold text-brand-blue-strong underline decoration-brand-red/35 underline-offset-4 transition hover:-translate-y-0.5 hover:text-brand-red hover:decoration-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-4"
            >
              <span>Explore our curriculum</span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <ol className="relative grid border-y border-border-soft bg-surface md:grid-cols-3 md:divide-x md:divide-border-soft">
            {homepageCurriculumPillars.map((pathway, index) => (
              <li
                key={pathway.title}
                className="relative border-b border-border-soft px-5 py-7 last:border-b-0 md:border-b-0 md:px-6 md:py-8"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full border border-brand-blue/20 bg-white font-mono text-xs font-semibold text-brand-blue-strong">
                    0{index + 1}
                  </span>
                  <span className="h-px flex-1 bg-brand-accent/35" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold leading-tight text-brand-blue-strong">
                  {pathway.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {pathway.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
        </section>
      </HomepageSectionMarker>

      <HomepageSectionMarker number={6}>
        <section className="border-y border-border-soft bg-surface site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="School locations"
            title="Start with the option that fits your family"
          >
            <p>
              Bracknell is the current listed in-person school. Families in
              other areas can register local interest, explore the full location
              map, or ask about online Russian lessons.
            </p>
          </SectionIntro>

          <div className="mt-9 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            {currentSchool ? (
              <article className="border-t-4 border-brand-red bg-background px-6 py-6 shadow-[0_14px_35px_rgba(0,32,72,0.08)] sm:px-7 sm:py-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                  Current in-person school
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-brand-blue-strong">
                  {currentSchool.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-brand-accent">
                  {currentSchool.area}, {currentSchool.county}
                </p>
                <p className="mt-5 text-lg font-semibold leading-7 text-brand-blue-strong">
                  {currentSchool.schedule}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {homepageSchoolSummaries[currentSchool.slug] ??
                    currentSchool.availabilitySummary}
                </p>
                <ButtonLink
                  href={`/schools/${currentSchool.slug}`}
                  className="mt-6"
                  icon={<ArrowRight className="size-4" />}
                  iconPosition="end"
                >
                  View Bracknell school
                </ButtonLink>
              </article>
            ) : null}

            <div className="border-y border-border-soft bg-background">
              <div className="flex flex-col gap-3 border-b border-border-soft px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <h3 className="text-xl font-semibold text-brand-blue-strong">
                    Other school areas
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Register interest or discuss an online route.
                  </p>
                </div>
                <ButtonLink
                  href="/schools#location-explorer"
                  variant="quiet"
                  className="min-h-0 justify-start px-0 py-1 text-left"
                  icon={<MapPin className="size-4" />}
                >
                  Explore locations and map
                </ButtonLink>
              </div>

              <div className="grid sm:grid-cols-2">
                {interestSchools.map((school) => (
                  <Link
                    key={school.slug}
                    href={`/schools/${school.slug}`}
                    className="group border-b border-border-soft px-5 py-4 transition hover:bg-surface-muted/70 sm:px-6 sm:[&:nth-child(odd)]:border-r"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span>
                        <span className="block text-lg font-semibold text-brand-blue-strong transition group-hover:text-brand-red">
                          {school.name}
                        </span>
                        <span className="mt-1 block text-sm text-slate-600">
                          {school.county}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-brand-blue-strong transition-transform group-hover:translate-x-1"
                      />
                    </span>
                    <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.08em] text-brand-accent">
                      {school.slug === "exeter"
                        ? "Details being confirmed"
                        : "Register interest / online route"}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/online-lessons"
                  className="group border-b border-border-soft bg-brand-blue-strong px-5 py-4 text-white transition hover:bg-brand-blue sm:px-6"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span>
                      <span className="block text-lg font-semibold">
                        No nearby branch?
                      </span>
                      <span className="mt-1 block text-sm text-white/70">
                        Volna Online Russian School
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                  <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.08em] text-white/72">
                    Online lessons, GCSE and A Level routes
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </section>
      </HomepageSectionMarker>

      <HomepageSectionMarker number={7}>
        <section className="border-y border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.74fr_1.26fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Joining"
              title="How we find the right starting point"
            >
              <p>
                Every child arrives with a different relationship to Russian.
                Some speak it at home, some understand it quietly, and some are
                learning for the first time. The first step is to understand
                that background.
              </p>
            </SectionIntro>
            <div className="mt-7">
              <ButtonLink
                href="/admissions"
                variant="secondary"
                icon={<ClipboardCheck className="size-4" />}
              >
                Admissions and fees
              </ButtonLink>
            </div>
          </div>
          <ol className="grid border-y border-border-soft bg-background md:grid-cols-3 md:divide-x md:divide-border-soft">
            {joiningSteps.map((step, index) => (
              <li
                key={step.title}
                className="relative border-b border-border-soft px-5 py-6 last:border-b-0 md:border-b-0 md:px-6"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-brand-red">
                    0{index + 1}
                  </span>
                  <span className="h-px flex-1 bg-brand-accent/35" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-tight text-brand-blue-strong">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
                {index < joiningSteps.length - 1 ? (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-3 top-5 z-10 hidden size-6 bg-background p-1 text-brand-accent md:block"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
        </section>
      </HomepageSectionMarker>

      <HomepageSectionMarker number={8}>
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
                Join Pushkin&apos;s School at a location near you
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
                  icon={<MessageSquareText className="size-4" />}
                >
                  Ask about joining
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
    <div className="relative mx-auto mb-6 aspect-[3/2] w-full max-w-md min-[1180px]:col-start-2 min-[1180px]:row-span-2 min-[1180px]:row-start-1 min-[1180px]:mb-0 min-[1180px]:max-w-none min-[1180px]:self-center">
      <figure className="relative size-full overflow-hidden rounded-2xl border border-brand-blue/10 bg-surface-muted shadow-[0_14px_32px_rgba(20,56,102,0.10)]">
        <Image
          src="/images/archive/extended/community-archive/extended-community-archive-img-0194.jpg"
          alt="Two children standing outside school beside a Pushkin's School sign."
          fill
          sizes="(min-width: 1180px) 560px, (min-width: 1024px) 520px, (min-width: 640px) 560px, calc(125vw - 3.75rem)"
          quality={90}
          className="scale-[1.25] object-cover object-center"
        />
      </figure>
    </div>
  );
}

function PushkinLiterarySection() {
  const desktopPositions = [
    "min-[1180px]:col-start-1 min-[1180px]:row-start-1 min-[1180px]:self-start",
    "min-[1180px]:col-start-3 min-[1180px]:row-start-1 min-[1180px]:self-start min-[1180px]:text-right",
    "min-[1180px]:col-start-1 min-[1180px]:row-start-2 min-[1180px]:self-end",
    "min-[1180px]:col-start-3 min-[1180px]:row-start-2 min-[1180px]:self-end min-[1180px]:text-right",
  ];

  return (
    <section className="bg-background site-section-compact">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-brand-blue-strong sm:text-4xl min-[1180px]:mx-auto min-[1180px]:text-center">
          Why families choose Pushkin&apos;s School
        </h2>

        <div className="relative mt-10 overflow-hidden border-y border-brand-blue/15 py-4 min-[1180px]:grid min-[1180px]:grid-cols-[minmax(0,1fr)_24rem_minmax(0,1fr)] min-[1180px]:grid-rows-2 min-[1180px]:gap-x-8 min-[1180px]:gap-y-12 min-[1180px]:overflow-visible min-[1180px]:border-y-0 min-[1180px]:py-0">
          <SchoolIdentityVisual />

          <div className="relative grid md:grid-cols-2 md:gap-x-8 min-[1180px]:contents">
            {parentJourney.map((item, index) => (
              <article
                key={item.title}
                className={`relative border-b border-brand-blue/15 py-7 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 min-[1180px]:border-b-0 min-[1180px]:py-0 ${desktopPositions[index]}`}
              >
                <h3 className="text-2xl font-semibold leading-tight text-brand-blue-strong sm:text-[1.7rem]">
                  {item.title}
                </h3>
                <p
                  className={`mt-3 max-w-[34ch] text-base leading-7 text-slate-700 min-[1180px]:max-w-[45ch] ${
                    index % 2 === 1 ? "min-[1180px]:ml-auto" : ""
                  }`}
                >
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
        <div className="relative min-h-48 bg-surface-muted sm:min-h-[17rem] lg:min-h-[18rem]">
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
        <figcaption className="hidden bg-white/72 px-5 py-3 text-base leading-6 text-brand-blue-strong sm:block min-[1180px]:whitespace-nowrap min-[1180px]:px-4 min-[1180px]:text-sm min-[1180px]:leading-5">
          We&apos;ve taught across{" "}
          <strong className="font-semibold">
            Buckinghamshire, Hertfordshire, Berkshire, Essex, and Devon.
          </strong>
        </figcaption>
      </figure>
      <div className="hidden grid-cols-2 gap-3 sm:grid">
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
      <div className="relative min-h-64 sm:min-h-[20rem] lg:h-full lg:min-h-[25rem]">
        <Image
          src={trustSupportingAsset.approvedPublicPath}
          alt={trustSupportingAsset.altText}
          fill
          sizes="(min-width: 1024px) 430px, 100vw"
          className="object-cover"
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
