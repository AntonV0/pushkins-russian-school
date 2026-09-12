import type { Metadata } from "next";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  MapPin,
  Monitor,
  UsersRound,
} from "lucide-react";
import {
  ButtonLink,
  quietHeroLinkClassName,
} from "@/components/site/button-link";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SchoolEvidencePanel } from "@/components/site/school-evidence-panel";
import { SectionIntro } from "@/components/site/section-intro";
import {
  admissionsSteps,
  childAgeOptions,
  enquiryChecklist,
  getSchoolEnquiryHref,
  russianLevelOptions,
} from "@/data/public/admissions";
import { contactDetails, paymentDetails } from "@/data/public/contact";
import { placementSignals } from "@/data/public/curriculum";
import { schoolStory } from "@/data/public/school-story";
import { schools } from "@/data/public/schools";
import {
  approvedMediaAssets,
  type MediaAsset,
} from "@/features/gallery/data/media-assets";

const admissionsEvidenceAssets = getApprovedMediaByIds([
  "IMG-0006",
  "IMG-0061",
  "IMG-0148",
]);

const admissionsEvidenceNotes = [
  "The first conversation is about the child, their Russian, and the most relevant learning route.",
  "Venue, classroom, and learning-material details help families picture the school before placement is confirmed.",
];

const admissionsFutureSections = [
  {
    title: "A separate register-interest journey",
    body: "A dedicated form for currently closed locations would separate future local demand from families registering for Bracknell or Exeter this year.",
  },
  {
    title: "What the first school day looks like",
    body: "A short practical guide could cover arrival, what to bring, how parents hand over, and what children can expect during their first visit.",
  },
  {
    title: "Live availability and fee summaries",
    body: "Once the branch data is verified and maintained centrally, this page could show current places and fee links without duplicating details from each school page.",
  },
  {
    title: "Joining questions from parents",
    body: "A compact admissions-only FAQ could cover trial periods, siblings, missed lessons, payment timing, placement changes and the longer safeguarding form.",
  },
] as const;

function getApprovedMediaByIds(ids: string[]) {
  return ids
    .map((id) => approvedMediaAssets.find((asset) => asset.id === id))
    .filter((asset): asset is MediaAsset => Boolean(asset));
}

export const metadata: Metadata = {
  title: "Admissions and Fees",
  description:
    "Admissions, joining guidance, fees, placement notes, and clear next steps for Pushkin's School families.",
  alternates: { canonical: "/admissions" },
  openGraph: {
    title: "Admissions and Fees | Pushkin's School",
    description:
      "Tell Pushkin's School about your child and understand registration, placement, joining routes, fees, and payment notes.",
    url: "/admissions",
  },
};

export default function AdmissionsPage() {
  const openSchools = schools.filter((school) => school.status === "open");
  const interestSchools = schools.filter((school) => school.status !== "open");

  return (
    <main>
      <PageHero
        eyebrow="Admissions and fees"
        title="A clear route from registration to the first school weeks"
        asideAlign="start"
        aside={
          <div className="grid content-start gap-4">
            <SchoolEvidencePanel
              devPageId="admissions"
              eyebrow="Before placement"
              title="A few details help us guide your child"
              summary="Real classroom, venue, and learning-material examples sit beside the details families share before the school recommends a starting point."
              assets={admissionsEvidenceAssets}
              notes={admissionsEvidenceNotes}
            />
            <aside className="border-y border-border-soft bg-background/70 py-6">
              <h2 className="text-xl font-semibold text-brand-blue-strong">
                Current school status
              </h2>
              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3 lg:grid-cols-1">
                <div className="border-l border-brand-accent pl-4">
                  <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                    <MapPin aria-hidden="true" className="size-4 text-brand-red" />
                    Current weekend schools
                  </dt>
                  <dd className="mt-1 text-slate-600">{openSchools.length}</dd>
                </div>
                <div className="border-l border-brand-accent pl-4">
                  <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                    <UsersRound aria-hidden="true" className="size-4 text-brand-red" />
                    Other local areas
                  </dt>
                  <dd className="mt-1 text-slate-600">
                    {interestSchools.length} register-interest or online routes
                  </dd>
                </div>
                <div className="border-l border-brand-accent pl-4">
                  <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                    <Mail aria-hidden="true" className="size-4 text-brand-red" />
                    Enquiries
                  </dt>
                  <dd className="mt-1 text-slate-600">{contactDetails.email}</dd>
                </div>
              </dl>
            </aside>
          </div>
        }
        actions={
          <>
            <ButtonLink
              href="/contact?intent=current-classes#enquiry-form"
              icon={<ClipboardCheck className="size-4" />}
            >
              Start registration
            </ButtonLink>
            <ButtonLink
              href="/schools"
              variant="quiet"
              className={quietHeroLinkClassName}
              icon={<MapPin className="size-4" />}
            >
              Compare school locations
            </ButtonLink>
          </>
        }
      >
        <p>
          {schoolStory.shortMission}{" "}Joining begins with choosing the relevant
          route, then sharing enough information for the school to understand
          your child&apos;s age and present experience with Russian.
        </p>
      </PageHero>

      <section className="bg-background site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Choose your route"
            title="What would you like to do next?"
          >
            <p>
              Registration for an open school and interest in a future location
              are different journeys. Choose the option that reflects what your
              family needs now.
            </p>
          </SectionIntro>
          <div className="mt-10 grid overflow-hidden rounded-lg border border-brand-blue/15 bg-surface lg:grid-cols-3 lg:divide-x lg:divide-brand-blue/12">
            <article className="flex flex-col px-6 py-7 sm:px-7">
              <ClipboardCheck aria-hidden="true" className="size-5 text-brand-red" />
              <h2 className="mt-5 text-2xl font-semibold text-brand-blue-strong">
                Join an open school
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Begin registration for current in-person classes in Bracknell
                or Exeter.
              </p>
              <div className="mt-6 grid gap-3">
                {openSchools.map((school) => (
                  <ButtonLink
                    key={school.slug}
                    href={getSchoolEnquiryHref(school)}
                    variant="secondary"
                    icon={<ArrowRight className="size-4" />}
                    iconPosition="end"
                  >
                    Start {school.name} registration
                  </ButtonLink>
                ))}
              </div>
            </article>

            <article className="flex flex-col border-t border-brand-blue/12 px-6 py-7 sm:px-7 lg:border-t-0">
              <UsersRound aria-hidden="true" className="size-5 text-brand-red" />
              <h2 className="mt-5 text-2xl font-semibold text-brand-blue-strong">
                Register interest elsewhere
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Tell us which local area interests you. We may contact you if a
                school opens there and can explain current alternatives.
              </p>
              <ButtonLink
                href="/contact?intent=future-interest#enquiry-form"
                variant="secondary"
                className="mt-6 self-start"
                icon={<ArrowRight className="size-4" />}
                iconPosition="end"
              >
                Register interest
              </ButtonLink>
            </article>

            <article className="flex flex-col border-t border-brand-blue/12 px-6 py-7 sm:px-7 lg:border-t-0">
              <Monitor aria-hidden="true" className="size-5 text-brand-red" />
              <h2 className="mt-5 text-2xl font-semibold text-brand-blue-strong">
                Explore online lessons
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Volna offers online group and individual lessons, including
                focused GCSE and A Level Russian preparation.
              </p>
              <ButtonLink
                href="/online-lessons"
                variant="secondary"
                className="mt-6 self-start"
                icon={<ArrowRight className="size-4" />}
                iconPosition="end"
              >
                See online options
              </ButtonLink>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Joining process"
            title="From first contact to a settled starting point"
          >
            <p>
              The process is deliberately straightforward: share the useful
              context, let the school check the options, then confirm the next
              step before your child starts.
            </p>
          </SectionIntro>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {admissionsSteps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-brand-accent pt-6">
                <p className="font-mono text-sm font-semibold text-brand-red">
                  0{index + 1}
                </p>
                <h2 className="mt-5 text-2xl font-semibold text-brand-blue-strong">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionIntro
              eyebrow="What to share"
              title="The useful basics are enough to begin"
            >
              <p>
                You do not need registration paperwork, medical details or
                payment information at this stage. Parents also do not need to
                identify the perfect class themselves.
              </p>
            </SectionIntro>
            <ul className="grid gap-3 sm:grid-cols-2">
              {enquiryChecklist.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 border-l border-brand-accent bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-brand-red"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 grid gap-8 border-t border-border-soft pt-8 lg:grid-cols-3">
            <div>
              <h2 className="text-lg font-semibold text-brand-blue-strong">
                Age
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {childAgeOptions.map((option) => (
                  <span
                    key={option}
                    className="rounded-full border border-brand-blue/15 bg-surface px-3 py-2 text-xs font-semibold text-brand-blue-strong"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-brand-blue-strong">
                Present Russian experience
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {russianLevelOptions.map((option) => (
                  <span
                    key={option}
                    className="rounded-full border border-brand-blue/15 bg-surface px-3 py-2 text-xs font-semibold text-brand-blue-strong"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-brand-blue-strong">
                What teachers consider
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                {placementSignals.slice(0, 4).map((signal) => (
                  <li key={signal} className="border-l border-brand-accent pl-4">
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Fees and availability"
              title="Check the current details for each open school"
            >
              <p>
                Timetables, fees and availability belong with the individual
                school information so families can see the details relevant to
                the branch they want to join.
              </p>
            </SectionIntro>
            <p className="mt-7 max-w-xl text-sm leading-6 text-slate-600">
              {paymentDetails.bankDetailsStatus}
            </p>
          </div>
          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              {openSchools.map((school) => (
                <article
                  key={school.slug}
                  className="border-t-4 border-brand-red bg-background p-6 shadow-[0_12px_28px_rgba(20,56,102,0.07)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                    Current in-person school
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
                    {school.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {school.area}, {school.county}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-slate-700">
                    {school.availabilitySummary}
                  </p>
                  <ButtonLink
                    href={`/schools/${school.slug}`}
                    variant="secondary"
                    className="mt-6"
                    icon={<ArrowRight className="size-4" />}
                    iconPosition="end"
                  >
                    View {school.name} details
                  </ButtonLink>
                </article>
              ))}
            </div>
            <div className="mt-7 border-y border-border-soft py-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-blue-strong">
                <Banknote aria-hidden="true" className="size-4 text-brand-red" />
                Details confirmed before joining
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {paymentDetails.termFees.map((fee) => (
                  <span
                    key={fee.label}
                    className="rounded-full border border-brand-blue/15 bg-background px-3 py-2 text-xs text-slate-600"
                  >
                    {fee.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Admissions next step"
        title="Ready to begin registration?"
        actions={
          <>
            <ButtonLink
              href="/contact?intent=current-classes#enquiry-form"
              variant="light"
              icon={<ClipboardCheck className="size-4" />}
            >
              Start registration
            </ButtonLink>
            <ButtonLink
              href="/schools"
              variant="light"
              icon={<MapPin className="size-4" />}
            >
              Compare schools
            </ButtonLink>
          </>
        }
      >
        <p>
          Choose Bracknell or Exeter and share your child&apos;s age and present
          experience with Russian. Families interested in another area can use
          the separate register-interest route above.
        </p>
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
              title="Possible additions to the Admissions page"
            >
              <p>
                These additions would be most useful once the two public form
                journeys and current branch information are finalised.
              </p>
            </SectionIntro>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {admissionsFutureSections.map((idea) => (
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
