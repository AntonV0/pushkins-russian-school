import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { enquiryChecklist } from "@/data/admissions";
import {
  contactDetails,
  contactSupportNotes,
  paymentDetails,
} from "@/data/contact";
import { schools } from "@/data/schools";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Pushkin's School to enquire about current classes, online lessons, future local classes, and registration interest.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Pushkin's School",
    description:
      "Enquire about Pushkin's School branches, current places, future local classes, and Russian language learning.",
    url: "/contact",
  },
};

type ContactPageProps = {
  searchParams?: Promise<{
    school?: string;
    intent?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const selectedSchool = schools.some((school) => school.slug === params?.school)
    ? params?.school
    : undefined;
  const selectedIntent = params?.intent;
  const enquiryStorageReady =
    process.env.ENQUIRY_STORAGE_MODE === "supabase" &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const openSchools = schools.filter((school) => school.status === "open");
  const registerInterestSchools = schools.filter(
    (school) => school.status !== "open",
  );

  return (
    <main>
      <section className="border-b border-border-soft bg-surface/80 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="lg:sticky lg:top-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Contact
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-brand-blue-strong sm:text-5xl">
              Enquire about weekend Russian classes for your child
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Tell us your preferred location, your child&apos;s age and current
              Russian level, and whether you are asking about current weekend
              classes, future local provision, online lessons, or exam support.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#enquiry-form"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              >
                Start the enquiry form
              </Link>
              <a
                href={`mailto:${contactDetails.email}`}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-blue/20 bg-background px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              >
                Email the school
              </a>
            </div>

            <div className="mt-8 border-y border-border-soft py-6">
              <dl className="grid gap-5 text-sm sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div>
                  <dt className="font-semibold text-brand-blue-strong">
                    Current weekend branch
                  </dt>
                  <dd className="mt-1 leading-6 text-slate-600">
                    {openSchools.map((school) => school.name).join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-brand-blue-strong">
                    Register interest
                  </dt>
                  <dd className="mt-1 leading-6 text-slate-600">
                    {registerInterestSchools.length} local areas plus online
                    lessons
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-brand-blue-strong">
                    Direct enquiries
                  </dt>
                  <dd className="mt-1 leading-6 text-slate-600">
                    <a
                      href={`mailto:${contactDetails.email}`}
                      className="break-all font-semibold underline decoration-brand-red/40 hover:text-brand-red"
                    >
                      {contactDetails.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-7">
              <h2 className="text-lg font-semibold text-brand-blue-strong">
                Include these details
              </h2>
              <ul className="mt-4 grid gap-x-6 gap-y-2 text-sm leading-6 text-slate-700 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {enquiryChecklist.slice(0, 6).map((item) => (
                  <li key={item} className="border-l border-brand-gold pl-3">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                Please keep the first enquiry focused on learning context. Full
                registration, consent, emergency contact, and health details are
                requested later only if your family joins.
              </p>
            </div>
          </div>

          <EnquiryForm
            selectedSchool={selectedSchool}
            selectedIntent={selectedIntent}
            mode={enquiryStorageReady ? "live" : "preview"}
          />
        </div>
      </section>

      <section className="border-b border-border-soft bg-background py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
                Locations
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-brand-blue-strong">
                Choose a branch, or tell us the area you need
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Select the closest school or learning option in the form. If
                your preferred area is online-only or not currently open, your
                enquiry still helps the school understand local demand.
              </p>
              <div className="mt-6">
                <Link
                  href="/schools"
                  className="text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
                >
                  Compare all school locations
                </Link>
              </div>
            </div>

            <div className="divide-y divide-border-soft border-y border-border-soft">
              {schools.map((school) => (
                <div
                  key={school.slug}
                  className="grid gap-3 py-5 sm:grid-cols-[0.9fr_1fr_auto] sm:items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-brand-blue-strong">
                      {school.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {school.county}
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-slate-700">
                    {school.statusLabel}
                  </p>
                  <Link
                    href={`/schools/${school.slug}`}
                    className="inline-flex min-h-10 items-center justify-center rounded-md border border-brand-blue/20 px-4 py-2 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                  >
                    View details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface py-12 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Response process
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-blue-strong">
              What happens after you enquire
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {contactSupportNotes.map((note, index) => (
              <div key={note} className="border-l border-brand-gold pl-5">
                <p className="font-mono text-sm font-semibold text-brand-red">
                  0{index + 1}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Fees
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-blue-strong">
              Payment details are confirmed before joining
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {paymentDetails.bankDetailsStatus}
            </p>
          </div>
          <dl className="grid gap-x-8 gap-y-5 border-y border-border-soft py-6 sm:grid-cols-2">
            {paymentDetails.termFees.map((fee) => (
              <div key={fee.label}>
                <dt className="text-sm font-semibold text-brand-blue-strong">
                  {fee.label}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-slate-600">
                  {fee.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
