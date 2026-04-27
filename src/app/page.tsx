import Link from "next/link";
import { SchoolCard } from "@/components/site/school-card";
import { admissionsSteps } from "@/data/admissions";
import { contactDetails } from "@/data/contact";
import { networkSummary, schools } from "@/data/schools";

const featuredSchools = schools.slice(0, 3);

export default function Home() {
  return (
    <main>
      <section className="border-b border-border-soft bg-surface">
        <div className="mx-auto grid min-h-[calc(100vh-82px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Russian language, culture, and exam preparation
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] text-brand-blue-strong sm:text-6xl">
              Pushkin&apos;s School
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A warm, academically focused school network for children learning
              Russian through weekend classes, structured lesson plans, cultural
              study, and family-centred support.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/schools"
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              >
                Find your school
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-brand-blue/20 px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              >
                {contactDetails.registrationCta}
              </Link>
            </div>
          </div>

          <div className="border-l-4 border-brand-red bg-surface-muted p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
              School network
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div>
                <p className="text-4xl font-semibold text-brand-blue-strong">
                  {networkSummary.locations}
                </p>
                <p className="mt-1 text-sm text-slate-600">Known locations</p>
              </div>
              <div>
                <p className="text-4xl font-semibold text-brand-blue-strong">
                  {networkSummary.counties}
                </p>
                <p className="mt-1 text-sm text-slate-600">Counties served</p>
              </div>
              <div>
                <p className="text-4xl font-semibold text-brand-blue-strong">
                  {networkSummary.classGroupCount}
                </p>
                <p className="mt-1 text-sm text-slate-600">Class pathways</p>
              </div>
            </div>
            <div className="mt-8 grid gap-3">
              {schools.map((school) => (
                <Link
                  key={school.slug}
                  href={`/schools/${school.slug}`}
                  className="flex items-center justify-between border-t border-border-soft py-3 text-sm font-semibold text-brand-blue-strong hover:text-brand-red"
                >
                  <span>{school.name}</span>
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                    {school.county}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Local branches
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-blue-strong sm:text-4xl">
              Weekend schools with clear status for every location
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Each branch has its own page so families can see venue details,
              lesson structure, class groups, and whether in-person classes are
              open, online, or currently closed.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredSchools.map((school) => (
              <SchoolCard key={school.slug} school={school} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/schools"
              className="text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
            >
              View all school locations
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3 lg:px-8">
          {admissionsSteps.map((item) => (
            <div key={item.title} className="border-l border-brand-gold pl-5">
              <h2 className="text-xl font-semibold text-brand-blue-strong">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Parent journey
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-blue-strong">
              Enquiries stay clear even while details are being verified
            </h2>
          </div>
          <p className="text-base leading-7 text-slate-600">
            The site now separates confirmed structure from details that need a
            final business check. Families can still choose a location, see its
            current status, and register interest without the website guessing
            operational facts.
          </p>
        </div>
      </section>
    </main>
  );
}
