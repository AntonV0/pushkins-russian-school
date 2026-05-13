import type { Metadata } from "next";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  ClipboardCheck,
  HelpCircle,
  Mail,
  MapPin,
  UsersRound,
} from "lucide-react";
import { ButtonLink } from "@/components/site/button-link";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SchoolEvidencePanel } from "@/components/site/school-evidence-panel";
import { SectionIntro } from "@/components/site/section-intro";
import {
  admissionsSteps,
  childAgeOptions,
  enquiryChecklist,
  russianLevelOptions,
} from "@/data/admissions";
import { contactDetails, paymentDetails } from "@/data/contact";
import {
  curriculumRouteRecommendations,
  placementSignals,
} from "@/data/curriculum";
import { approvedMediaAssets, type MediaAsset } from "@/data/media-assets";
import { schools } from "@/data/schools";

const quietHeroLink =
  "min-h-0 w-auto justify-start px-0 py-1 text-left sm:min-h-11 sm:justify-center sm:px-5 sm:py-3";

const admissionsEvidenceAssets = getApprovedMediaByIds([
  "IMG-0006",
  "IMG-0061",
  "IMG-0148",
]);

const admissionsEvidenceNotes = [
  "The first enquiry is about context and fit, not registration paperwork.",
  "Venue, classroom, and learning-material details help families picture the school before placement is confirmed.",
];

function getApprovedMediaByIds(ids: string[]) {
  return ids
    .map((id) => approvedMediaAssets.find((asset) => asset.id === id))
    .filter((asset): asset is MediaAsset => Boolean(asset));
}

export const metadata: Metadata = {
  title: "Admissions and Fees",
  description:
    "Admissions, enquiry guidance, fees, introductory course notes, and payment information for Pushkin's School families.",
  alternates: {
    canonical: "/admissions",
  },
  openGraph: {
    title: "Admissions and Fees | Pushkin's School",
    description:
      "Understand the enquiry process, placement information, fee summary, and payment notes for Pushkin's School.",
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
        title="A clear path from enquiry to the right school group"
        asideAlign="start"
        aside={
          <div className="grid content-start gap-4">
            <SchoolEvidencePanel
              eyebrow="Before placement"
              title="A first enquiry connects a child to the right route"
              summary="Real classroom, venue, and learning-material examples sit beside the practical details families share before the school recommends a route."
              assets={admissionsEvidenceAssets}
              notes={admissionsEvidenceNotes}
            />
            <aside className="border-y border-border-soft bg-background/70 py-6">
              <h2 className="text-xl font-semibold text-brand-blue-strong">
                Current school status
              </h2>
              <dl className="mt-6 grid gap-4 text-sm">
                <div className="border-l border-brand-gold pl-4">
                  <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                    <MapPin aria-hidden="true" className="size-4 text-brand-red" />
                    Current weekend school
                  </dt>
                  <dd className="mt-1 text-slate-600">{openSchools.length}</dd>
                </div>
                <div className="border-l border-brand-gold pl-4">
                  <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                    <UsersRound aria-hidden="true" className="size-4 text-brand-red" />
                    Online or register-interest branches
                  </dt>
                  <dd className="mt-1 text-slate-600">
                    {interestSchools.length}
                  </dd>
                </div>
                <div className="border-l border-brand-gold pl-4">
                  <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                    <Mail aria-hidden="true" className="size-4 text-brand-red" />
                    Direct enquiries
                  </dt>
                  <dd className="mt-1 text-slate-600">
                    {contactDetails.email}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        }
        actions={
          <>
            <ButtonLink
              href="/contact#enquiry-form"
              icon={<ClipboardCheck className="size-4" />}
            >
              Start an enquiry
            </ButtonLink>
            <ButtonLink
              href="/faq"
              variant="quiet"
              className={quietHeroLink}
              icon={<HelpCircle className="size-4" />}
            >
              Read common questions
            </ButtonLink>
          </>
        }
      >
        <p>
          Families can enquire for current weekend classes, register interest in
          future local provision, ask about Volna online lessons, or flag GCSE
          self-study goals. The final placement is confirmed after the school
          reviews the child&apos;s learning context.
        </p>
      </PageHero>

      <section className="border-b border-border-soft bg-background site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Admissions checklist"
            title="What happens before a place or route is confirmed"
          >
            <p>
              The process is practical and deliberately calm: share enough
              context, let the school check the options, then confirm the
              sensible next step.
            </p>
          </SectionIntro>
          <ol className="mt-10 divide-y divide-border-soft border-y border-border-soft">
            {admissionsSteps.map((step) => (
              <li
                key={step.title}
                className="grid gap-4 py-6 md:grid-cols-[4rem_1fr]"
              >
                <span className="flex size-10 items-center justify-center rounded-md border border-brand-red/15 bg-brand-red/8 text-brand-red">
                  <ClipboardCheck aria-hidden="true" className="size-4" />
                </span>
                <span>
                  <span className="block text-xl font-semibold text-brand-blue-strong">
                    {step.title}
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-slate-600">
                    {step.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.76fr_1.24fr] lg:px-8">
          <SectionIntro
            eyebrow="What to send"
            title="The first enquiry only needs the useful basics"
          >
            <p>
              You do not need registration paperwork, medical details, or final
              payment information at this stage. These details are enough for a
              first recommendation.
            </p>
          </SectionIntro>
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {enquiryChecklist.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 border-l border-brand-gold bg-background/70 px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold text-brand-blue-strong">
                  Age range
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {childAgeOptions.map((option) => (
                    <span
                      key={option}
                      className="rounded-full border border-border-soft bg-background px-3 py-2 text-sm font-semibold text-brand-blue-strong"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-brand-blue-strong">
                  Russian level
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {russianLevelOptions.map((option) => (
                    <span
                      key={option}
                      className="rounded-full border border-border-soft bg-background px-3 py-2 text-sm font-semibold text-brand-blue-strong"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <SectionIntro
            eyebrow="Possible routes"
            title="The enquiry can be directed without repeating the whole curriculum"
          >
            <p>
              Most families start with the nearest weekend school. Where that
              is not the best fit, the school can point the enquiry to online
              lessons, future local interest, or exam support.
            </p>
          </SectionIntro>
          <div className="divide-y divide-border-soft border-y border-border-soft">
            {curriculumRouteRecommendations.map((route) => (
              <article
                key={route.title}
                className="grid gap-4 py-5 md:grid-cols-[1fr_auto] md:items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-brand-blue-strong">
                    {route.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {route.bestWhen}
                  </p>
                </div>
                <ButtonLink
                  href={route.href}
                  variant="secondary"
                  icon={<ArrowRight className="size-4" />}
                  iconPosition="end"
                >
                  {route.ctaLabel}
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionIntro
            eyebrow="Placement"
            title="What teachers look at before recommending a group"
          >
            <p>
              Placement is based on the child&apos;s real language confidence,
              not just their age or school year.
            </p>
          </SectionIntro>
          <ul className="grid gap-3 sm:grid-cols-2">
            {placementSignals.map((signal) => (
              <li
                key={signal}
                className="flex gap-2 border-l border-brand-gold bg-background/70 px-4 py-3 text-sm leading-6 text-slate-700"
              >
                <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionIntro
            eyebrow="Fees"
            title="Fee categories to confirm before joining"
          >
            <p>
              Fee and payment categories are kept clear at enquiry stage.
              Current amounts and payment instructions are confirmed directly
              by the school before a family joins.
            </p>
          </SectionIntro>
          <div className="grid gap-3 sm:grid-cols-2">
            {paymentDetails.termFees.map((fee) => (
              <div key={fee.label} className="border-l border-brand-gold bg-background/70 px-4 py-3">
                <p className="flex items-center gap-2 text-sm text-slate-600">
                  <Banknote aria-hidden="true" className="size-4 shrink-0 text-brand-red" />
                  {fee.label}
                </p>
                <p className="mt-1 font-semibold text-brand-blue-strong">
                  {fee.value}
                </p>
              </div>
            ))}
          </div>
          <div className="lg:col-start-2">
            <p className="text-sm leading-6 text-slate-600">
              Payment method: {paymentDetails.acceptedMethods.join(", ")}.
              {` ${paymentDetails.bankDetailsStatus}`}
            </p>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Admissions next step"
        title="Send the school enough context to recommend the right route"
        actions={
          <>
            <ButtonLink
              href="/contact#enquiry-form"
              variant="light"
              icon={<ClipboardCheck className="size-4" />}
            >
              Start an enquiry
            </ButtonLink>
            <ButtonLink href="/schools" variant="light" icon={<MapPin className="size-4" />}>
              Compare schools
            </ButtonLink>
          </>
        }
      >
        <p>
          Include location, age, Russian level, and any exam goals. The school
          can confirm availability, fit, and practical joining details.
        </p>
      </PageCta>
    </main>
  );
}
