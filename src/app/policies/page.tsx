import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { MetricStrip } from "@/components/site/metric-strip";
import { SectionIntro } from "@/components/site/section-intro";
import {
  getPolicyAction,
  getPolicyAvailabilitySummary,
  getPolicyDownloadReadiness,
  getPolicyStatusTone,
  policies,
  policyGroups,
  policyIndexNotes,
  policyPublicationStates,
  policySupportLinks,
} from "@/data/policies";

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
  const availableActions = policies.filter((policy) => getPolicyAction(policy));
  const pendingSchoolPolicies = policies.filter(
    (policy) =>
      policy.documentType === "School policy" &&
      policy.publicationStatus === "pending-review",
  );

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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact#enquiry-form">
                Ask a policy question
              </ButtonLink>
              <ButtonLink href="/schools" variant="secondary">
                View school locations
              </ButtonLink>
            </div>
          </div>
          <MetricStrip
            metrics={[
              { label: "Groups", value: policyGroups.length },
              { label: "Policies", value: policies.length },
              { label: "Pending PDFs", value: pendingSchoolPolicies.length },
              { label: "Guidance links", value: availableActions.length },
            ]}
          />
        </div>
      </section>

      <section
        className="border-b border-border-soft bg-background py-12"
        aria-labelledby="policy-readiness-notes"
      >
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-3 lg:px-8">
          <h2 id="policy-readiness-notes" className="sr-only">
            Policy publication notes
          </h2>
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
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {policyPublicationStates.map((state) => (
              <article
                key={state.label}
                className="border border-border-soft bg-surface p-5"
              >
                <h2 className="text-base font-semibold text-brand-blue-strong">
                  {state.label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {state.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {policyGroups.map((group) => (
              <section
                key={group.title}
                className="rounded-lg border border-border-soft bg-surface p-6"
                aria-labelledby={`${group.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}-policies`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {group.audience}
                </p>
                <h2
                  id={`${group.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}-policies`}
                  className="mt-2 text-2xl font-semibold text-brand-blue-strong"
                >
                  {group.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {group.description}
                </p>
                <p className="mt-3 border-l border-brand-gold pl-4 text-sm leading-6 text-slate-700">
                  {group.reassurance}
                </p>
                <ul className="mt-5 divide-y divide-border-soft text-sm">
                  {group.policies.map((policy) => {
                    const action = getPolicyAction(policy);
                    const readiness = getPolicyDownloadReadiness(policy);

                    return (
                      <li key={policy.slug} className="py-4">
                        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
                          <div>
                            <Link
                              href={`/policies/${policy.slug}`}
                              className="font-medium text-slate-700 hover:text-brand-red"
                            >
                              {policy.title}
                            </Link>
                            <p className="mt-1 text-xs leading-5 text-muted">
                              {policy.documentType} / {policy.owner}
                            </p>
                          </div>
                          <span
                            className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${getPolicyStatusTone(policy)}`}
                          >
                            {getPolicyAvailabilitySummary(policy)}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {policy.parentGuidance}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-muted">
                          {readiness.label}: {readiness.description}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <Link
                            href={`/policies/${policy.slug}`}
                            className="text-xs font-semibold uppercase tracking-[0.12em] text-muted hover:text-brand-red"
                          >
                            View summary
                          </Link>
                          {action ? (
                            <a
                              href={action.href}
                              target={action.isExternal ? "_blank" : undefined}
                              rel={
                                action.isExternal
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              download={action.isExternal ? undefined : true}
                              className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue-strong hover:text-brand-red"
                            >
                              {action.label}
                            </a>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-brand-blue-strong py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Need help now?
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Use the public routes while documents are finalised
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              Families can still ask practical questions or check branch details
              without waiting for every formal PDF to be published.
            </p>
          </div>
          <div className="grid gap-3">
            {policySupportLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-white/15 bg-white/5 p-5 transition hover:border-white/35 hover:bg-white/10"
              >
                <span className="block text-sm font-semibold">
                  {link.label}
                </span>
                <span className="mt-2 block text-sm leading-6 text-white/75">
                  {link.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
