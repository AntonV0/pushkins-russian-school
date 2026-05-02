import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { MetricStrip } from "@/components/site/metric-strip";
import { SectionIntro } from "@/components/site/section-intro";
import {
  getPolicyAction,
  getPolicyStatusTone,
  hasReviewedPublicPolicyPdf,
  type Policy,
  policies,
  policyGroups,
} from "@/data/policies";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Safeguarding, welfare, conduct, and parent policy information for Pushkin's School families.",
  alternates: {
    canonical: "/policies",
  },
  openGraph: {
    title: "Pushkin's School Policies",
    description:
      "Safeguarding, welfare, conduct, and parent policy information for Pushkin's School families.",
    url: "/policies",
  },
};

const policyAssuranceNotes = [
  "Key safeguarding, welfare, data, conduct, and complaints information is grouped clearly for families.",
  "Downloadable school documents appear when the approved public version is ready.",
  "Official statutory guidance opens from source pages so parents can check the current reference.",
];

const publicationPrinciples = [
  {
    label: "Clear parent guidance",
    description:
      "Each policy has a plain summary and a practical note about when families are most likely to need it.",
  },
  {
    label: "Controlled documents",
    description:
      "Formal PDFs appear after owner, version, update date, and next update date have been confirmed.",
  },
  {
    label: "Current references",
    description:
      "External guidance links point to official publication pages rather than copied local files.",
  },
];

const policyContactLinks = [
  {
    label: "Ask a policy question",
    href: "/contact#enquiry-form",
    description:
      "Send a practical parent question to the school team through the enquiry form.",
  },
  {
    label: "Compare school locations",
    href: "/schools",
    description:
      "Check branch, timetable, and location information before choosing the right contact path.",
  },
];

function getParentPolicyStatusLabel(policy: Policy) {
  if (hasReviewedPublicPolicyPdf(policy)) {
    return "Download available";
  }

  const action = getPolicyAction(policy);

  if (action?.kind === "external") {
    return "Official guidance";
  }

  return "Summary available";
}

export default function PoliciesPage() {
  const reviewedPublicPdfs = policies.filter((policy) =>
    hasReviewedPublicPolicyPdf(policy),
  );
  const currentExternalGuidanceLinks = policies.filter(
    (policy) => getPolicyAction(policy)?.kind === "external",
  );
  const familyPolicyCount = policyGroups
    .filter((group) => group.audience.toLowerCase().includes("famil"))
    .reduce((count, group) => count + group.policies.length, 0);

  return (
    <main>
      <section className="border-b border-border-soft bg-surface/80 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Policies
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-brand-blue-strong sm:text-6xl">
              Policies for a safe, well-run school community
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Families can find safeguarding, welfare, conduct, privacy, and
              complaints information in one calm place, with formal documents
              added as controlled public versions are approved.
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
              {
                label: "Family policies",
                value: familyPolicyCount,
              },
              {
                label: "Downloads",
                value:
                  reviewedPublicPdfs.length > 0
                    ? reviewedPublicPdfs.length
                    : "Controlled",
              },
              {
                label: "Guidance links",
                value: currentExternalGuidanceLinks.length,
              },
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
          {policyAssuranceNotes.map((note) => (
            <div
              key={note}
              className="premium-panel border-l border-brand-gold bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
            >
              {note}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Policy care"
            title="Grouped for families, staff, and statutory reference"
          >
            <p>
              Pushkin&apos;s School has operated for over a decade, so this page
              treats policies as part of everyday trust: visible, organised, and
              careful about what becomes a downloadable public document.
            </p>
          </SectionIntro>
          <div className="premium-panel mt-8 grid gap-6 border border-border-soft bg-surface p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-7">
            <div>
              <h2 className="text-xl font-semibold text-brand-blue-strong">
                What parents can expect
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Summaries stay easy to scan, next steps stay clear, and document
                downloads are kept controlled so families are not sent outdated
                or informal files.
              </p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-3">
              {publicationPrinciples.map((principle) => (
                <div key={principle.label}>
                  <dt className="text-sm font-semibold text-brand-blue-strong">
                    {principle.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-600">
                    {principle.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {policyGroups.map((group) => (
              <section
                key={group.title}
                className="premium-panel rounded-lg border border-border-soft bg-surface p-6"
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
                  {group.title === "Useful Guidance"
                    ? "Official guidance opens from source publication pages."
                    : "Formal school downloads are added once the approved public version is ready."}
                </p>
                <ul className="mt-5 divide-y divide-border-soft text-sm">
                  {group.policies.map((policy) => {
                    const action = getPolicyAction(policy);

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
                            {getParentPolicyStatusLabel(policy)}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {policy.parentGuidance}
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
              Questions about a policy?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              Families can ask practical questions, check branch details, or
              use the enquiry form to reach the school team directly.
            </p>
          </div>
          <div className="grid gap-3">
            {policyContactLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-white/15 bg-white/5 p-5 transition hover:border-white/35 hover:bg-white/10"
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
