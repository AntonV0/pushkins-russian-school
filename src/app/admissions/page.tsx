import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/button-link";
import { SectionIntro } from "@/components/site/section-intro";
import { VisualStoryPanel } from "@/components/site/visual-story-panel";
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
import { getVisualPlaceholderSlot } from "@/data/media-assets";
import { schools } from "@/data/schools";

const admissionsVisual = getVisualPlaceholderSlot("admissions-learning-journey");

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
      "Understand the enquiry route, placement information, fee summary, and payment notes for Pushkin's School.",
    url: "/admissions",
  },
};

export default function AdmissionsPage() {
  const openSchools = schools.filter((school) => school.status === "open");
  const interestSchools = schools.filter((school) => school.status !== "open");

  return (
    <main>
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Admissions and fees
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
              A clear route from enquiry to the right school group
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Families can enquire for current weekend classes, register
              interest in future local provision, ask about Volna online
              lessons, or flag GCSE self-study goals. The final placement is
              confirmed after the school reviews the child&apos;s learning context.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact#enquiry-form">
                Start an enquiry
              </ButtonLink>
              <ButtonLink href="/schools" variant="secondary">
                Compare branches
              </ButtonLink>
              <ButtonLink href="/faq" variant="secondary">
                Read FAQ
              </ButtonLink>
            </div>
          </div>
          <div className="grid content-start gap-4">
            {admissionsVisual ? (
              <VisualStoryPanel slot={admissionsVisual} compact />
            ) : null}
            <aside className="bg-surface-muted p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-brand-blue-strong">
                Current network status
              </h2>
              <dl className="mt-6 grid gap-4 text-sm">
                <div className="border-l border-brand-gold pl-4">
                  <dt className="font-semibold text-brand-blue-strong">
                    Current weekend hub
                  </dt>
                  <dd className="mt-1 text-slate-600">{openSchools.length}</dd>
                </div>
                <div className="border-l border-brand-gold pl-4">
                  <dt className="font-semibold text-brand-blue-strong">
                    Online or register-interest branches
                  </dt>
                  <dd className="mt-1 text-slate-600">
                    {interestSchools.length}
                  </dd>
                </div>
                <div className="border-l border-brand-gold pl-4">
                  <dt className="font-semibold text-brand-blue-strong">
                    Direct enquiries
                  </dt>
                  <dd className="mt-1 text-slate-600">
                    {contactDetails.email}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Choosing the best route"
            title="One enquiry can point families to the right option"
          >
            <p>
              Pushkin&apos;s School remains the local weekend route where a
              branch fits. If distance, branch status, or exam goals suggest a
              different path, the enquiry can also point families towards Volna
              Online Russian School or GCSERussian.com.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {curriculumRouteRecommendations.map((route) => (
              <article
                key={route.title}
                className="rounded-lg border border-border-soft bg-surface p-6"
              >
                <h2 className="text-xl font-semibold text-brand-blue-strong">
                  {route.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {route.bestWhen}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {route.recommendation}
                </p>
                <div className="mt-6">
                  <ButtonLink href={route.href} variant="secondary">
                    {route.ctaLabel}
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="How admissions works"
            title="Three steps for a useful first conversation"
          >
            <p>
              The process is written for parents: practical, transparent, and
              careful about what still needs school confirmation.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {admissionsSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-lg border border-border-soft bg-surface p-6"
              >
                <p className="font-mono text-sm font-semibold text-brand-red">
                  0{index + 1}
                </p>
                <h2 className="mt-4 text-xl font-semibold text-brand-blue-strong">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionIntro
            eyebrow="Fees"
            title="Fee categories to confirm before joining"
          >
            <p>
              Fee and payment categories are centralized in one editable data
              object. Current amounts and payment instructions are confirmed
              directly by the school after enquiry.
            </p>
          </SectionIntro>
          <div className="grid gap-3 sm:grid-cols-2">
            {paymentDetails.termFees.map((fee) => (
              <div
                key={fee.label}
                className="border-l border-brand-gold bg-background px-4 py-3"
              >
                <p className="text-sm text-slate-600">{fee.label}</p>
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

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              What to include in an enquiry
            </h2>
            <ul className="mt-5 grid gap-3">
              {enquiryChecklist.map((item) => (
                <li
                  key={item}
                  className="border-l border-brand-gold bg-surface px-4 py-3 text-sm text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <h2 className="text-2xl font-semibold text-brand-blue-strong">
                Placement signals
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                These details help the school understand whether the child is
                ready for a local class, online support, exam preparation, or a
                first confidence-building step.
              </p>
              <ul className="mt-5 grid gap-2">
                {placementSignals.slice(0, 4).map((signal) => (
                  <li
                    key={signal}
                    className="border-l border-brand-gold bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
                  >
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-brand-blue-strong">
                Age ranges
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                These ranges help parents describe the child&apos;s stage; the
                school can confirm the best class group.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {childAgeOptions.map((option) => (
                  <span
                    key={option}
                    className="rounded-full border border-border-soft bg-surface px-3 py-2 text-sm font-semibold text-brand-blue-strong"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-brand-blue-strong">
                Russian level
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Families do not need to know the exact group before enquiring.
                These options simply make the first message easier to answer.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {russianLevelOptions.map((option) => (
                  <span
                    key={option}
                    className="rounded-full border border-border-soft bg-surface px-3 py-2 text-sm font-semibold text-brand-blue-strong"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
