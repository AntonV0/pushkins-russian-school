import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PolicyEmailContact } from "@/components/site/policy-email-contact";
import { policies } from "@/data/public/policies";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Privacy, safeguarding and parent terms for Pushkin's School of Russian Language and Literature.",
  alternates: {
    canonical: "/policies",
  },
  openGraph: {
    title: "Policies | Pushkin's School",
    description:
      "Read the school's privacy notice, safeguarding policy and practical parent terms.",
    url: "/policies",
  },
};

const directoryDescriptions: Record<string, string> = {
  "privacy-and-cookies":
    "How we collect, use and protect personal information about pupils, families and website visitors.",
  "safeguarding-and-child-protection":
    "How we keep children safe and how to raise a safeguarding concern.",
  "parent-terms-and-complaints":
    "Joining the school, paying fees, missed lessons, cancellations and complaints.",
};

export default function PoliciesPage() {
  return (
    <main>
      <section className="border-b border-border-soft bg-surface/72 pt-10 pb-8 sm:pt-14 sm:pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Policies" }]} />
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] text-brand-blue-strong sm:text-5xl">
            Our school policies
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
            Information about privacy, safeguarding and the terms for joining
            and attending the school.
          </p>
        </div>
      </section>

      <section className="bg-background pt-6 pb-8 sm:pb-10" aria-labelledby="policy-list-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 id="policy-list-title" className="sr-only">
            Public policies
          </h2>
          <ul className="divide-y divide-border-soft border-y border-border-soft">
            {policies.map((policy) => (
              <li key={policy.slug}>
                <Link
                  href={`/policies/${policy.slug}`}
                  aria-labelledby={`${policy.slug}-title`}
                  className="group -mx-3 grid gap-3 rounded-sm px-3 py-6 transition-colors duration-200 hover:bg-surface-blue focus-visible:bg-surface-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue! motion-reduce:transition-none sm:py-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-12"
                >
                  <h2 className="text-xl font-semibold leading-snug text-brand-blue-strong sm:text-2xl">
                    <span
                      className="flex min-h-11 items-center justify-between gap-4 underline decoration-brand-blue/25 underline-offset-4 transition-colors duration-200 group-hover:decoration-brand-blue group-focus-visible:decoration-brand-blue motion-reduce:transition-none"
                    >
                      <span id={`${policy.slug}-title`}>{policy.title}</span>
                      <ArrowRight aria-hidden="true" className="size-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:translate-x-0! motion-reduce:transition-none" />
                    </span>
                  </h2>
                  <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                    {directoryDescriptions[policy.slug] ?? policy.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-sm leading-6 text-slate-600">
              Questions about a policy or need an accessible copy?
            </p>
            <PolicyEmailContact />
          </div>
        </div>
      </section>
    </main>
  );
}
