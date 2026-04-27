import type { Metadata } from "next";
import Link from "next/link";
import { contactDetails, paymentDetails } from "@/data/contact";
import { schools } from "@/data/schools";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Pushkin's School to enquire about school locations, future classes, and registration interest.",
};

export default function ContactPage() {
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
              The public form will be added when the final contact workflow is
              confirmed. For now, the site points families to the central email
              and branch pages.
            </p>
          </div>
          <aside className="bg-surface-muted p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-brand-blue-strong">
              Enquiries
            </h2>
            <a
              href={`mailto:${contactDetails.email}`}
              className="mt-4 block text-lg font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
            >
              {contactDetails.email}
            </a>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {contactDetails.enquiryFormNote}
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Choose a branch
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Include the child&apos;s age, preferred location, and whether the
              enquiry is for current classes or future local provision.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
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
      </section>

      <section className="border-t border-border-soft bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-blue-strong">
            Payment information
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            {paymentDetails.bankDetailsStatus}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>
    </main>
  );
}
