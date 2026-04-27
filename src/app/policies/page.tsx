import type { Metadata } from "next";
import { policyGroups } from "@/data/policies";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Policy index shell for Pushkin's School safeguarding, parent, staff, and guidance documents.",
};

export default function PoliciesPage() {
  return (
    <main>
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
            Policies
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
            A clear index for reviewed school documents
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Document downloads and detail pages will be added after the policy
            files are reviewed and updated. This shell keeps the public structure
            ready without publishing unreviewed material.
          </p>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:px-8">
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
                    key={policy}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <span className="text-slate-700">{policy}</span>
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      Coming soon
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
