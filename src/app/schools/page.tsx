import type { Metadata } from "next";
import { SchoolCard } from "@/components/site/school-card";
import { schools } from "@/data/schools";

export const metadata: Metadata = {
  title: "Schools",
  description:
    "Explore Pushkin's School locations, weekend timetables, class groups, and current branch status.",
  alternates: {
    canonical: "/schools",
  },
  openGraph: {
    title: "Pushkin's School Locations",
    description:
      "Explore Pushkin's School branches, weekend timetables, class groups, and branch status.",
    url: "/schools",
  },
};

export default function SchoolsPage() {
  const openSchools = schools.filter((school) => school.status === "open");
  const otherSchools = schools.filter((school) => school.status !== "open");

  return (
    <main>
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
            School locations
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
            A data-driven school network, ready to grow
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Active, online, and currently closed branches use the same page
            template so every location can present clear venue, timetable,
            pricing, and enquiry information.
          </p>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-blue-strong">
            Listed weekend schools
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {openSchools.map((school) => (
              <SchoolCard key={school.slug} school={school} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Online or register-interest locations
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              These locations remain part of the school network and have full
              pages with transparent status wording for families.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {otherSchools.map((school) => (
              <SchoolCard key={school.slug} school={school} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
