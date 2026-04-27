import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/site/status-badge";
import { enquiryChecklist, getSchoolEnquiryHref } from "@/data/admissions";
import { contactDetails, paymentDetails } from "@/data/contact";
import { getSchoolBySlug, schools } from "@/data/schools";

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

  return {
    title: `${school.name} School`,
    description: `${school.name} Pushkin's School branch: venue, timetable, class groups, pricing notes, and enquiry information.`,
  };
}

export default async function SchoolPage({ params }: SchoolPageProps) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);

  if (!school) {
    notFound();
  }

  return (
    <main>
      <section className="border-b border-border-soft bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div>
            <StatusBadge status={school.status} label={school.statusLabel} />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              {school.county}
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
              {school.name}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {school.lead}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              {school.statusDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={getSchoolEnquiryHref(school)}
                className="inline-flex items-center justify-center rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              >
                {school.enquiryCta}
              </Link>
              <a
                href={school.mapHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-brand-blue/20 px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              >
                View map
              </a>
            </div>
          </div>

          <aside className="bg-surface-muted p-6 sm:p-8">
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
                  <br />
                  {school.postcode}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-blue-strong">Schedule</dt>
                <dd className="mt-1 text-slate-600">{school.schedule}</dd>
              </div>
            </dl>
            {school.scheduleNote ? (
              <p className="mt-5 border-l-2 border-brand-gold pl-4 text-sm leading-6 text-slate-600">
                {school.scheduleNote}
              </p>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Learning plan
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-blue-strong">
              A clear school-day rhythm
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The source timetable is represented as structured data so each
              branch can adjust session times without changing the page
              template.
            </p>
          </div>

          <ol className="divide-y divide-border-soft border-y border-border-soft bg-surface">
            {school.lessonPlan.map((item) => (
              <li
                key={`${item.time}-${item.activity}`}
                className="grid gap-2 px-5 py-4 sm:grid-cols-[9rem_1fr]"
              >
                <time className="font-mono text-sm font-semibold text-brand-blue-strong">
                  {item.time}
                </time>
                <span className="text-sm text-slate-700">{item.activity}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface py-14 sm:py-16">
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
              {school.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
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
              Accepted methods: {paymentDetails.acceptedMethods.join(", ")}.
              {` ${paymentDetails.bankDetailsStatus}`}
            </p>
          </div>
        </div>
      </section>

      {school.onlineProgramme ? (
        <section className="bg-background py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl border-l-4 border-brand-red bg-surface p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                Online source note
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

      <section className="bg-brand-blue-strong py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold">Content verification notes</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              These notes keep inherited source uncertainty visible during the
              rebuild, so the public launch can be checked branch by branch.
            </p>
          </div>
          <ul className="space-y-3 text-sm leading-6 text-white/80">
            {school.sourceNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="border-l-4 border-brand-gold pl-6">
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Before you enquire
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {enquiryChecklist.slice(0, 4).map((item) => (
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
              Email {contactDetails.email} or use the enquiry route while the
                final submission workflow is being connected.
              </p>
            </div>
            <Link
              href={getSchoolEnquiryHref(school)}
              className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            >
              {school.enquiryCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
