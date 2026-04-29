import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  registrationSafetyGuardrails,
  registrationSections,
} from "@/data/registration";

type RegistrationInvitationPageProps = {
  params: Promise<{ token: string }>;
};

export const metadata: Metadata = {
  title: "Registration Invitation Prototype",
  description:
    "Static invitation route shell for future Pushkin's School onboarding. Prototype only; no data collection.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ token: "sample-token" }];
}

export default async function RegistrationInvitationPage({
  params,
}: RegistrationInvitationPageProps) {
  const { token } = await params;

  if (token !== "sample-token") {
    notFound();
  }

  const parentSections = registrationSections.filter(
    (section) => section.parentFacing,
  );

  return (
    <main className="bg-background">
      <section className="border-b border-border-soft bg-brand-blue-strong py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Registration invitation prototype
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold sm:text-5xl">
            This route is a static shell and does not collect information
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">
            Future secure invitation links can land here after authentication,
            privacy wording, retention rules, token handling, and admin access
            controls are approved. For now, the route displays sample structure
            only.
          </p>
          <div className="mt-8 grid max-w-xl gap-3 border-l-4 border-brand-gold bg-white/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
              Token handling
            </p>
            <p className="font-mono text-sm text-blue-50">
              Placeholder route received
            </p>
            <p className="text-sm leading-6 text-blue-50">
              The token is not looked up, stored, validated, decoded, or used to
              reveal any registration data in this scaffold, and it is not
              displayed back to the browser.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <aside className="border border-border-soft bg-surface p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
              Not live
            </p>
            <h2 className="mt-3 text-xl font-semibold text-brand-blue-strong">
              No parent form yet
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The live version should verify a short-lived invitation, avoid
              revealing whether a token exists, and only then show the right
              staged form for one family.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-400"
              >
                Continue registration disabled
              </button>
              <Link
                href="/contact#enquiry-form"
                className="inline-flex justify-center rounded-full border border-brand-blue/20 px-4 py-2 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              >
                Use public enquiry instead
              </Link>
            </div>
          </aside>

          <div className="grid gap-4 md:grid-cols-2">
            {parentSections.map((section) => (
              <article
                key={section.key}
                className="border border-border-soft bg-surface p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                  Future section
                </p>
                <h2 className="mt-3 text-lg font-semibold text-brand-blue-strong">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {section.purpose}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {section.sensitivity}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-2 lg:px-8">
          {registrationSafetyGuardrails.map((note) => (
            <div
              key={note}
              className="border-l border-brand-gold bg-background px-5 py-4 text-sm leading-6 text-slate-700"
            >
              {note}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
