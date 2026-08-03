import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  MapPin,
  Send,
} from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import {
  ButtonLink,
  quietHeroLinkClassName,
} from "@/components/site/button-link";
import { JsonLd } from "@/components/site/json-ld";
import { LearningOptions } from "@/components/site/learning-options";
import { LocationMediaShowcase } from "@/components/site/location-media-showcase";
import { RelatedSchools } from "@/components/site/related-schools";
import { StatusBadge } from "@/components/site/status-badge";
import { enquiryChecklist, getSchoolEnquiryHref } from "@/data/public/admissions";
import { contactDetails, paymentDetails } from "@/data/public/contact";
import { getLearningOptionsForBranchStatus } from "@/data/public/learning-options";
import { schoolStory } from "@/data/public/school-story";
import { getSelectedLocationMediaByBranch } from "@/features/gallery/data/selected-location-media";
import { getSchoolBySlug, schools } from "@/data/public/schools";
import { absoluteUrl, siteConfig } from "@/data/public/site";

type SchoolPageProps = {
  params: Promise<{ slug: string }>;
};

const quietHeroLink =
  "inline-flex min-h-0 w-auto justify-start rounded-none border-0 bg-transparent px-0 py-1 text-left text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/35 underline-offset-4 shadow-none transition hover:text-brand-red hover:decoration-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30 sm:min-h-11 sm:justify-center sm:rounded-md sm:border sm:border-brand-blue/20 sm:bg-white/70 sm:px-5 sm:py-3 sm:no-underline";

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
        ? `${school.name} Pushkin's School branch for Russian language, literature, culture, balanced bilingualism, and current joining details.`
        : `${school.name} Pushkin's School location in the five-school Russian language and culture network, with current online and register-interest options.`,
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
  const branchMedia = getSelectedLocationMediaByBranch(school.slug);

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
    ...(branchMedia.length > 0
      ? {
          image: branchMedia.map((asset) =>
            absoluteUrl(asset.approvedPublicPath),
          ),
        }
      : {}),
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
              {school.name} Russian school community
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              {school.lead}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              {school.availabilitySummary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={getSchoolEnquiryHref(school)}
                icon={<Send className="size-4" />}
              >
                {school.enquiryCta}
              </ButtonLink>
              {!hasCurrentVenue && school.bestNextSteps[1] ? (
                <ButtonLink
                  href={school.bestNextSteps[1].href}
                  variant="quiet"
                  className={quietHeroLinkClassName}
                  icon={<ArrowRight className="size-4" />}
                  iconPosition="end"
                >
                  {school.bestNextSteps[1].ctaLabel}
                </ButtonLink>
              ) : null}
              <a
                href={school.mapHref}
                target="_blank"
                rel="noreferrer"
                className={quietHeroLink}
              >
                <ExternalLink aria-hidden="true" className="size-4" />
                <span>{hasCurrentVenue ? "View map" : "View area map"}</span>
              </a>
            </div>
          </div>

          {hasCurrentVenue ? (
            <aside className="premium-panel rounded-lg border border-border-soft bg-surface-muted p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-brand-blue-strong">
                Visit snapshot
              </h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                    <MapPin aria-hidden="true" className="size-4 text-brand-red" />
                    Venue
                  </dt>
                  <dd className="mt-1 text-slate-600">{school.venueName}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                    <MapPin aria-hidden="true" className="size-4 text-brand-red" />
                    Address
                  </dt>
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
                  <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                    <Clock aria-hidden="true" className="size-4 text-brand-red" />
                    Schedule
                  </dt>
                  <dd className="mt-1 text-slate-600">{school.schedule}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                    <CheckCircle2 aria-hidden="true" className="size-4 text-brand-red" />
                    Before attending
                  </dt>
                  <dd className="mt-1 text-slate-600">
                    Enquire first to confirm spaces, class fit, start date, and
                    any arrival instructions for the school site.
                  </dd>
                </div>
              </dl>
              {school.scheduleNote ? (
                <p className="mt-5 border-l-2 border-brand-accent pl-4 text-sm leading-6 text-slate-600">
                  {school.scheduleNote}
                </p>
              ) : null}
            </aside>
          ) : (
            <aside className="premium-panel rounded-lg border border-border-soft bg-surface-muted p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-brand-blue-strong">
                How families can stay connected
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This location remains part of the Pushkin&apos;s School network.
                Families can ask about local interest, online learning, or a
                current in-person branch.
              </p>
              <div className="mt-6 grid gap-4">
                {school.bestNextSteps.map((step, index) => (
                  <div key={step.title} className="border-l border-brand-accent pl-4">
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
                  icon={<ArrowRight className="size-4" />}
                  iconPosition="end"
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
        devPageId={`school-${school.slug}`}
        title={`School life connected to ${school.name}`}
        intro="These images give families a sense of the learning materials, classrooms, performances, and school-life moments connected to Pushkin's School."
      />

      <section className="bg-background site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {hasCurrentVenue ? (
            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                  Sunday school morning
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-blue-strong">
                  A weekend rhythm for Russian learning
                </h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  The morning combines assembly, lessons, breaks, and classroom
                  rhythm so children can build Russian language, literacy, and
                  confidence in a familiar weekly setting.
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
                  {[
                    "Ask about the right class and start date before attending the school site.",
                    "Arrive a few minutes before the first assembly so the child can settle.",
                    "Bring any context that helps placement: age, spoken Russian, reading, writing, and exam aims.",
                    "Ask the school directly about drop-off, collection, fees, and payment instructions.",
                  ].map((note) => (
                  <li
                      key={note}
                      className="flex gap-2 border-l border-brand-accent bg-surface px-4 py-3"
                    >
                      <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

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
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                  Current options
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-blue-strong">
                  Keep Russian learning moving from {school.name}
                </h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Local in-person provision is not currently listed here, but
                  families can still stay connected to the school network and
                  choose a practical route for learning now.
                </p>
              </div>

              <div className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface">
                {school.bestNextSteps.map((item, index) => (
                  <article
                    key={item.title}
                    className="grid gap-5 border-b border-border-soft p-5 last:border-b-0 sm:grid-cols-[3rem_1fr_auto] sm:items-start"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center justify-self-start rounded-full border border-brand-accent/50 bg-surface-muted text-sm font-semibold text-brand-blue-strong">
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
                      icon={<ArrowRight className="size-4" />}
                      iconPosition="end"
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

      <section className="border-b border-border-soft bg-surface site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Learning and practical details
            </p>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Class groups, culture, and joining details in one place
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The educational aim stays the same across the network:
              {` ${schoolStory.philosophy}`} Current places, placement, fees,
              and payment instructions are confirmed directly before joining.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-brand-blue-strong">
                Class groups
              </h3>
              <ul className="mt-5 grid gap-3 text-sm text-slate-700">
                {school.classGroups.map((group) => (
                  <li
                    key={group}
                    className="flex gap-2 border-l border-brand-accent bg-background px-4 py-3"
                  >
                    <GraduationCap aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-red" />
                    <span>{group}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-brand-blue-strong">
                Programme highlights
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                {school.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-brand-blue-strong">
                Fees and payment
              </h3>
              <dl className="mt-5 space-y-3 text-sm">
                {paymentDetails.termFees.map((fee) => (
                  <div
                    key={fee.label}
                    className="flex items-center justify-between gap-4 border-b border-border-soft pb-3"
                  >
                    <dt className="flex items-center gap-2 text-slate-600">
                      <Banknote aria-hidden="true" className="size-4 shrink-0 text-brand-red" />
                      {fee.label}
                    </dt>
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
                  <li key={detail} className="flex gap-2">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-red" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                {school.onlineProgramme.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
                  >
                    <span>{link.label}</span>
                    <ExternalLink aria-hidden="true" className="size-4" />
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
              intro="This location remains part of the school network, while families can also consider Volna online Russian lessons or Volna's GCSE and A Level routes."
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
                : "If you are interested in this area"}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              {hasCurrentVenue
                ? "These practical notes help families confirm the right class fit and next step before attending."
                : "These notes help families choose a learning route while local venue, timetable, and payment details are not currently listed."}
            </p>
          </div>
          <ul className="space-y-3 text-sm leading-6 text-white/80">
            {(hasCurrentVenue
              ? [
                  "Ask about current spaces, class fit, and start date before attending.",
                  "Current fees and payment instructions are confirmed directly before joining.",
                ]
              : [
                  `Register interest if you would use local classes in the ${school.name} area.`,
                  "Local venue and timetable details will be published only when they are confirmed.",
                  "Ask about online learning if you would like to start sooner.",
                ]
            ).map((note) => (
              <li key={note} className="flex gap-2">
                <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-accent" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="border-l-4 border-brand-accent pl-6">
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              What to tell us about your child
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              A thoughtful first message helps the school understand your
              child&apos;s Russian and suggest local interest, online learning, a
              current branch, or a Volna exam route.
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {enquiryChecklist.slice(1, 8).map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 sm:justify-center">
            <div>
              <h2 className="text-2xl font-semibold text-brand-blue-strong">
                Interested in {school.name}?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use the form or email {contactDetails.email} directly to ask
                about the most suitable Russian learning route.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={getSchoolEnquiryHref(school)}
                icon={<Send className="size-4" />}
              >
                {school.enquiryCta}
              </ButtonLink>
              <ButtonLink
                href="/admissions"
                variant="secondary"
                icon={<ArrowRight className="size-4" />}
                iconPosition="end"
              >
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
