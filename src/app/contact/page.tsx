import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Banknote, CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { PageHero } from "@/components/site/page-hero";
import { enquiryChecklist } from "@/data/public/admissions";
import {
  contactDetails,
  contactSupportNotes,
  paymentDetails,
} from "@/data/public/contact";
import { schools } from "@/data/public/schools";

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
      <PageHero
        eyebrow="Contact"
        title="Send a first enquiry"
        variant="compact"
        asideAlign="start"
        aside={
          <EnquiryForm
            selectedSchool={selectedSchool}
            selectedIntent={selectedIntent}
            mode={enquiryStorageReady ? "live" : "preview"}
          />
        }
      >
        <p>
          Use the form to share your preferred location, your child&apos;s age,
          current Russian level, and the kind of support you are looking for.
        </p>
      </PageHero>

      <section className="border-b border-border-soft bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Enquiry notes
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
              Keep the first message focused on placement
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Please do not include medical, safeguarding, emergency contact, or
              full registration details in the initial enquiry. Those are
              requested later only if your family joins.
            </p>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              Prefer email?{" "}
              <a
                href={`mailto:${contactDetails.email}`}
                className="inline-flex items-center gap-1.5 break-all font-semibold underline decoration-brand-red/40 hover:text-brand-red"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                {contactDetails.email}
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-blue-strong">
              Useful details to include
            </h3>
            <ul className="mt-4 grid gap-x-6 gap-y-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
              {enquiryChecklist.slice(0, 6).map((item) => (
                <li key={item} className="flex gap-2 border-l border-brand-gold pl-3">
                  <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid gap-4 border-y border-border-soft py-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                  <MapPin aria-hidden="true" className="size-4 text-brand-red" />
                  Current weekend branch
                </dt>
                <dd className="mt-1 leading-6 text-slate-600">
                  {openSchools.map((school) => school.name).join(", ")}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                  <Send aria-hidden="true" className="size-4 text-brand-red" />
                  Register interest
                </dt>
                <dd className="mt-1 leading-6 text-slate-600">
                  {registerInterestSchools.length} local areas plus online
                  lessons
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-background site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
                Locations
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
                Choose a branch, or tell us the area you need
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Select the closest school or learning option in the form. If
                your preferred area is online-only or not currently open, your
                enquiry still helps the school understand local demand and
                suggest online or current-branch alternatives.
              </p>
              <div className="mt-6">
                <Link
                  href="/schools"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
                >
                  <span>Compare all school locations</span>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>

            <div className="divide-y divide-border-soft border-y border-border-soft">
              {schools.map((school) => (
                <div
                  key={school.slug}
                  className="grid gap-3 py-4 sm:grid-cols-[0.9fr_1fr_auto] sm:items-center"
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
                    {school.availabilitySummary}
                  </p>
                  <Link
                    href={school.bestNextSteps[0]?.href ?? `/schools/${school.slug}`}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-brand-blue/20 px-4 py-2 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                  >
                    {school.bestNextSteps[0]?.ctaLabel ?? "View details"}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Response process
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
              What happens after you enquire
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {contactSupportNotes.map((note) => (
              <div key={note} className="border-l border-brand-gold pl-5">
                <Send aria-hidden="true" className="size-5 text-brand-red" />
                <p className="mt-3 text-sm leading-6 text-slate-700">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background site-section-compact">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Joining details
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
              Fees are confirmed after the first enquiry
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {paymentDetails.bankDetailsStatus}
            </p>
          </div>
          <dl className="grid gap-x-8 gap-y-4 border-y border-border-soft py-5 sm:grid-cols-2 lg:grid-cols-3">
            {paymentDetails.termFees.map((fee) => (
              <div key={fee.label}>
                <dt className="flex items-center gap-2 text-sm font-semibold text-brand-blue-strong">
                  <Banknote aria-hidden="true" className="size-4 text-brand-red" />
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
