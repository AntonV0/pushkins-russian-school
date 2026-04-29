import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { LearningOptions } from "@/components/site/learning-options";
import { SectionIntro } from "@/components/site/section-intro";
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
    "Contact Pushkin's School to enquire about current classes, online routes, future local classes, and registration interest.",
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

  return (
    <main>
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Contact
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
              Enquire about a school place or future local classes
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Use the structured form to submit a simple initial enquiry, or
              write to the school directly if you prefer email.
            </p>
          </div>
          <aside className="bg-surface-muted p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-brand-blue-strong">
              Enquiries
            </h2>
            <a
              href={`mailto:${contactDetails.email}`}
              className="mt-4 block break-all text-lg font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              {contactDetails.email}
            </a>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {contactDetails.enquiryFormNote}
            </p>
            <div className="mt-6 flex">
              <a
                href={`mailto:${contactDetails.email}`}
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              >
                Email directly
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-border-soft bg-background py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-3 lg:px-8">
          {contactSupportNotes.map((note) => (
            <div
              key={note}
              className="border-l border-brand-gold bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
            >
              {note}
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <LearningOptions
            eyebrow="Choose a route"
            title="Local school, online lessons, or GCSE self-study"
            intro="If a branch is not nearby or is not currently open, families can still ask about the wider set of Russian-learning options before deciding the next step."
            compact
          />
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Enquiry route"
              title="Before submitting"
            >
              <p>
                The form collects only the first details needed to respond:
                parent contact details, preferred route, child first names and
                ages, Russian level, and the reason for enquiring. Full
                registration, health, safeguarding, emergency contact, and
                consent information belongs in the later onboarding workflow.
              </p>
            </SectionIntro>
            <div className="mt-6">
              <Link
                href="/faq"
                className="text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
              >
                Read common questions before enquiring
              </Link>
            </div>
            <div className="mt-6 grid gap-3">
              {schools.map((school) => (
                <Link
                  key={school.slug}
                  href={`/schools/${school.slug}`}
                  className="rounded-lg border border-border-soft bg-surface p-5 transition hover:border-brand-red"
                >
                  <span className="block text-base font-semibold text-brand-blue-strong">
                    {school.name}
                  </span>
                  <span className="mt-2 block text-sm text-slate-600">
                    {school.statusLabel}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <EnquiryForm
            selectedSchool={selectedSchool}
            selectedIntent={selectedIntent}
            mode={enquiryStorageReady ? "live" : "preview"}
          />
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              What to include
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              A short, structured enquiry helps the school respond with the
              right branch, group, and next step.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {enquiryChecklist.map((item) => (
              <li
                key={item}
                className="border-l border-brand-gold bg-background px-4 py-3 text-sm text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border-soft bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Payment information
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {paymentDetails.bankDetailsStatus}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {paymentDetails.termFees.map((fee) => (
              <div
                key={fee.label}
                className="border-l border-brand-gold bg-surface px-4 py-3"
              >
                <p className="text-sm text-slate-600">{fee.label}</p>
                <p className="mt-1 font-semibold text-brand-blue-strong">
                  {fee.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
