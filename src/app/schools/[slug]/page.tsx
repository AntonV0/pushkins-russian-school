import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ButtonLink } from "@/components/site/button-link";
import { JsonLd } from "@/components/site/json-ld";
import { LearningOptions } from "@/components/site/learning-options";
import { LocationMediaShowcase } from "@/components/site/location-media-showcase";
import { RelatedSchools } from "@/components/site/related-schools";
import { SectionIntro } from "@/components/site/section-intro";
import { StatusBadge } from "@/components/site/status-badge";
import { enquiryChecklist, getSchoolEnquiryHref } from "@/data/admissions";
import { contactDetails, paymentDetails } from "@/data/contact";
import {
  curriculumMaterials,
  curriculumProgressionStages,
  placementSignals,
  placementSteps,
} from "@/data/curriculum";
import { getLearningOptionsForBranchStatus } from "@/data/learning-options";
import { getLocationPageMediaByBranch } from "@/data/media-assets";
import { getSchoolBySlug, schools } from "@/data/schools";
import { absoluteUrl, siteConfig } from "@/data/site";

type SchoolPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return schools.map((school) => ({ slug: school.slug }));
}

export async function generateMetadata({
  params,
}: SchoolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);

  if (!school) {
    return {
      title: "School not found",
    };
  }

  const pageTitle =
    school.status === "open"
      ? `${school.name} School`
      : `${school.name} School Location`;

  return {
    title: pageTitle,
    description:
      school.status === "open"
        ? `${school.name} Pushkin's School branch: venue, timetable, class groups, fee categories, and enquiry information.`
        : `${school.name} Pushkin's School location: online-only learning, register-interest option, class groups, and enquiry information.`,
    alternates: {
      canonical: `/schools/${school.slug}`,
    },
    openGraph: {
      title: `${pageTitle} | Pushkin's School`,
      description: school.lead,
      url: `/schools/${school.slug}`,
      type: "article",
    },
  };
}

export default async function SchoolPage({ params }: SchoolPageProps) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);

  if (!school) {
    notFound();
  }

  const isLocalProvisionUnconfirmed = school.status !== "open";
  const hasCurrentVenue = school.status === "open";
  const learningOptions = getLearningOptionsForBranchStatus(school.status);
  const highlightedLearningOption =
    school.status === "online" ? "volna-online" : undefined;
  const branchMedia = getLocationPageMediaByBranch(school.slug).slice(0, 4);

  const schoolJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: `${siteConfig.name} ${school.name}`,
    url: absoluteUrl(`/schools/${school.slug}`),
    email: contactDetails.email,
    description: school.lead,
    areaServed: school.county,
    ...(hasCurrentVenue
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: school.address.join(", "),
            postalCode: school.postcode,
            addressCountry: "GB",
          },
        }
      : {}),
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <main>
      <JsonLd data={schoolJsonLd} />
      <section className="border-b border-border-soft bg-surface/72">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 site-section-compact lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div>
            <Breadcrumbs
              items={[
                { label: "Schools", href: "/schools" },
                { label: school.name },
              ]}
            />
            <StatusBadge status={school.status} label={school.statusLabel} />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              {school.county}
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.06] text-brand-blue-strong sm:text-5xl">
              {school.name}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              {school.lead}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              {school.availabilitySummary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={getSchoolEnquiryHref(school)}>
                {school.enquiryCta}
              </ButtonLink>
              {!hasCurrentVenue && school.bestNextSteps[1] ? (
                <ButtonLink href={school.bestNextSteps[1].href} variant="secondary">
                  {school.bestNextSteps[1].ctaLabel}
                </ButtonLink>
              ) : null}
              <a
                href={school.mapHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-brand-blue/20 bg-white/70 px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:bg-white hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30 sm:w-auto"
              >
                {hasCurrentVenue ? "View map" : "View area map"}
              </a>
            </div>
          </div>

          {hasCurrentVenue ? (
            <aside className="premium-panel rounded-lg border border-border-soft bg-surface-muted p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-brand-blue-strong">
                Venue and timetable
              </h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-brand-blue-strong">Venue</dt>
                  <dd className="mt-1 text-slate-600">{school.venueName}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-brand-blue-strong">Address</dt>
                  <dd className="mt-1 text-slate-600">
                    {school.address.join(", ")}
                    {school.postcode ? (
                      <>
                        <br />
                        {school.postcode}
                      </>
                    ) : null}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-brand-blue-strong">
                    Schedule
                  </dt>
                  <dd className="mt-1 text-slate-600">{school.schedule}</dd>
                </div>
              </dl>
              {school.scheduleNote ? (
                <p className="mt-5 border-l-2 border-brand-gold pl-4 text-sm leading-6 text-slate-600">
                  {school.scheduleNote}
                </p>
              ) : null}
            </aside>
          ) : (
            <aside className="premium-panel rounded-lg border border-border-soft bg-surface-muted p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-brand-blue-strong">
                What families can do next
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Choose the enquiry route that best matches your family&apos;s
                situation. The school can then respond with the most practical
                option.
              </p>
              <div className="mt-6 grid gap-4">
                {school.bestNextSteps.map((step, index) => (
                  <div key={step.title} className="border-l border-brand-gold pl-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-red">
                      Option {index + 1}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-brand-blue-strong">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-md border border-border-soft bg-white/70 p-4">
                <p className="text-sm font-semibold text-brand-blue-strong">
                  {school.nearbyAlternativeCta.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {school.nearbyAlternativeCta.body}
                </p>
                <ButtonLink
                  href={school.nearbyAlternativeCta.href}
                  variant="secondary"
                  className="mt-4"
                >
                  View option
                </ButtonLink>
              </div>
            </aside>
          )}
        </div>
      </section>

      <LocationMediaShowcase
        assets={branchMedia}
        title={`Selected images from ${school.name}`}
        intro="These approved public images give families a visual sense of the school setting and learning materials while the current availability notes above stay authoritative."
      />

      <section className="bg-background site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {hasCurrentVenue ? (
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <SectionIntro
                eyebrow="Learning plan"
                title="A clear school-day rhythm"
              >
                <p>
                  The current branch timetable gives parents a practical sense
                  of the weekend rhythm before they ask about spaces, class
                  fit, and start dates.
                </p>
              </SectionIntro>

              <ol className="premium-panel divide-y divide-border-soft overflow-hidden rounded-lg border border-border-soft bg-surface">
                {school.lessonPlan.map((item) => (
                  <li
                    key={`${item.time}-${item.activity}`}
                    className="grid gap-2 px-5 py-4 sm:grid-cols-[9rem_1fr]"
                  >
                    <time className="font-mono text-sm font-semibold text-brand-blue-strong">
                      {item.time}
                    </time>
                    <span className="text-sm text-slate-700">
                      {item.activity}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <SectionIntro
                eyebrow="Decision guide"
                title={`Choose the right next step for ${school.name}`}
              >
                <p>
                  The local page stays visible for future demand, while parents
                  can still choose a practical next step for learning now.
                </p>
              </SectionIntro>

              <div className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface">
                {school.bestNextSteps.map((item, index) => (
                  <article
                    key={item.title}
                    className="grid gap-5 border-b border-border-soft p-5 last:border-b-0 sm:grid-cols-[3rem_1fr_auto] sm:items-start"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center justify-self-start rounded-full border border-brand-gold/50 bg-surface-muted text-sm font-semibold text-brand-blue-strong">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-brand-blue-strong">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {item.body}
                      </p>
                    </div>
                    <ButtonLink
                      href={item.href}
                      variant={index === 0 ? "primary" : "secondary"}
                      className="justify-self-start sm:justify-self-end"
                    >
                      {item.ctaLabel}
                    </ButtonLink>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <SectionIntro
            eyebrow="Class placement"
            title="Finding the right learning group"
          >
            <p>
              Families can share the child&apos;s current Russian experience in
              the enquiry. Teachers then use that context, branch availability,
              and the first weeks of learning to guide the most suitable group
              or alternative option.
            </p>
          </SectionIntro>
          <div className="relative border-l border-brand-gold pl-6">
            {placementSteps.map((step, index) => (
              <article key={step.title} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[2.05rem] top-1 flex size-5 items-center justify-center rounded-full border border-brand-gold bg-surface">
                  <span className="size-2 rounded-full bg-brand-red" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                  Placement {index + 1}
                </p>
                <h2 className="text-lg font-semibold text-brand-blue-strong">
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

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Progression at this branch
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Parents can use these stages to understand the broad learning
              journey and decide what to mention in the enquiry. Detailed class
              guidance can then be discussed with the school.
            </p>
            <ul className="mt-5 grid gap-2">
              {placementSignals.slice(0, 3).map((signal) => (
                <li
                  key={signal}
                  className="border-l border-brand-gold bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {signal}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {curriculumProgressionStages.map((stage) => (
              <article
                key={stage.title}
                className="premium-panel rounded-lg border border-border-soft bg-surface p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-red">
                  {stage.audience}
                </p>
                <h2 className="mt-3 text-lg font-semibold text-brand-blue-strong">
                  {stage.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {stage.parentValue}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Class groups
            </h2>
            <ul className="mt-5 grid gap-3 text-sm text-slate-700">
              {school.classGroups.map((group) => (
                <li
                  key={group}
                  className="border-l border-brand-gold bg-background px-4 py-3"
                >
                  {group}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Programme highlights
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {[...school.highlights, ...curriculumMaterials].map(
                (highlight) => (
                  <li key={highlight}>{highlight}</li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Fees and payment
            </h2>
            <dl className="mt-5 space-y-3 text-sm">
              {paymentDetails.termFees.map((fee) => (
                <div
                  key={fee.label}
                  className="flex items-center justify-between gap-4 border-b border-border-soft pb-3"
                >
                  <dt className="text-slate-600">{fee.label}</dt>
                  <dd className="font-semibold text-brand-blue-strong">
                    {fee.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Payment method: {paymentDetails.acceptedMethods.join(", ")}.
              {` ${paymentDetails.bankDetailsStatus}`}
            </p>
          </div>
        </div>
      </section>

      {school.onlineProgramme ? (
        <section className="bg-background site-section-compact">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="premium-panel max-w-4xl border-l-4 border-brand-red bg-surface p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                Online learning option
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
                {school.onlineProgramme.name}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {school.onlineProgramme.summary}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                {school.onlineProgramme.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                {school.onlineProgramme.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {isLocalProvisionUnconfirmed ? (
        <section className="border-y border-border-soft bg-surface site-section-compact">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <LearningOptions
              options={learningOptions}
              eyebrow="Alternative options"
              title={`More ways to learn Russian while local classes in ${school.name} are not available`}
              intro="This location keeps its full page for local interest, while families can also consider online Russian lessons or GCSE-focused self-study support."
              highlightId={highlightedLearningOption}
              compact
            />
          </div>
        </section>
      ) : null}

      <section className="bg-brand-blue-strong site-section-compact text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold">
              {hasCurrentVenue
                ? "Before your first visit"
                : "Before local details are published"}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              {hasCurrentVenue
                ? "These practical notes help families confirm the right class fit and next step before attending."
                : "These practical notes help families choose the next step while local venue, timetable, and payment details are still being gathered."}
            </p>
          </div>
          <ul className="space-y-3 text-sm leading-6 text-white/80">
            {(hasCurrentVenue
              ? [
                  "Ask about current spaces, class fit, and start date before attending.",
                  "Current fees and payment instructions are confirmed directly after enquiry.",
                ]
              : [
                  `Register interest if you would use local classes in the ${school.name} area.`,
                  "Local venue and timetable details will be published only when they are confirmed.",
                  "Ask about online learning if you would like to start sooner.",
                ]
            ).map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="border-l-4 border-brand-gold pl-6">
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              What to include in your enquiry
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              A focused first message helps the school recommend local interest,
              online learning, a current branch, or exam preparation.
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {enquiryChecklist.slice(1, 8).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 sm:justify-center">
            <div>
              <h2 className="text-2xl font-semibold text-brand-blue-strong">
                Interested in {school.name}?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use the enquiry form or email {contactDetails.email} directly
                to ask about the most suitable next step.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={getSchoolEnquiryHref(school)}>
                {school.enquiryCta}
              </ButtonLink>
              <ButtonLink href="/admissions" variant="secondary">
                Admissions and fees
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <RelatedSchools currentSlug={school.slug} schools={schools} />
    </main>
  );
}
