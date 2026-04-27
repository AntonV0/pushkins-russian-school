import type { Metadata } from "next";
import Link from "next/link";
import { MetricStrip } from "@/components/site/metric-strip";
import { SectionIntro } from "@/components/site/section-intro";
import { policies, policyGroups, policyIndexNotes } from "@/data/policies";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Policy index shell for Pushkin's School safeguarding, parent, staff, and guidance documents.",
  alternates: {
    canonical: "/policies",
  },
  openGraph: {
    title: "Pushkin's School Policies",
    description:
      "Safeguarding, parent, staff, and guidance policy index for Pushkin's School.",
    url: "/policies",
  },
};

export default function PoliciesPage() {
  return (
    <main>
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Policies
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
              A clear index for reviewed school documents
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Document downloads and detail pages will be added after the policy
              files are reviewed and updated. This shell keeps the public
              structure ready without publishing unreviewed material.
            </p>
          </div>
          <MetricStrip
            metrics={[
              { label: "Groups", value: policyGroups.length },
              { label: "Policies", value: policies.length },
              { label: "Downloads", value: "Pending" },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-border-soft bg-background py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-3 lg:px-8">
          {policyIndexNotes.map((note) => (
            <div
              key={note}
              className="border-l border-brand-gold bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
            >
              {note}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Publication workflow"
            title="Grouped for families, staff, and statutory guidance"
          >
            <p>
              The old policy index grouped documents into clear categories. The
              rebuild keeps that clarity while making every document page
              explicitly pending review.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {policyGroups.map((group) => (
              <section
                key={group.title}
                className="rounded-lg border border-border-soft bg-surface p-6"
              >
                <h2 className="text-2xl font-semibold text-brand-blue-strong">
                  {group.title}
                </h2>
                <ul className="mt-5 divide-y divide-border-soft text-sm">
                  {group.policies.map((policy) => (
                    <li
                      key={policy.slug}
                      className="grid gap-2 py-3 sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <div>
                        <Link
                          href={`/policies/${policy.slug}`}
                          className="font-medium text-slate-700 hover:text-brand-red"
                        >
                          {policy.title}
                        </Link>
                        <p className="mt-1 text-xs leading-5 text-muted">
                          {policy.documentType} / {policy.status}
                        </p>
                      </div>
                      <Link
                        href={`/policies/${policy.slug}`}
                        className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-muted hover:text-brand-red"
                      >
                        View shell
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
