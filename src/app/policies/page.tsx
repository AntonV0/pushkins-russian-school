import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
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
  "Policy summaries are available now, with formal school documents added when ready.",
  "Official statutory guidance opens from source pages so parents can check the current reference.",
];

const publicationPrinciples = [
  {
    label: "Clear parent guidance",
    description:
      "Each policy has a plain summary and a practical note about when families are most likely to need it.",
  },
  {
    label: "Checked documents",
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
  const currentExternalGuidanceLinks = policies.filter(
    (policy) => getPolicyAction(policy)?.kind === "external",
  );
  const familyPolicyCount = policyGroups
    .filter((group) => group.audience.toLowerCase().includes("famil"))
    .reduce((count, group) => count + group.policies.length, 0);

  return (
    <main>
      <PageHero
        eyebrow="Policies"
        title="Policies for a safe, well-run school community"
        actions={
          <>
            <ButtonLink href="/contact#enquiry-form">
              Ask a policy question
            </ButtonLink>
            <ButtonLink href="/schools" variant="secondary">
              View school locations
            </ButtonLink>
          </>
        }
        aside={
          <aside className="border-y border-border-soft bg-background/70 py-6 lg:border-l lg:border-y-0 lg:py-2 lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
              Policy library
            </p>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              {[
                { label: "Groups", value: policyGroups.length },
                { label: "Policies", value: policies.length },
                { label: "Family policies", value: familyPolicyCount },
                { label: "Guidance links", value: currentExternalGuidanceLinks.length },
              ].map((item) => (
                <div key={item.label} className="border-l border-brand-gold pl-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-brand-blue-strong">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        }
      >
        <p>
          Families can find safeguarding, welfare, conduct, privacy, and
          complaints information in one calm place, with formal documents added
          for download when the school has confirmed they are ready for families
          to use.
        </p>
      </PageHero>

      <section
        className="border-b border-border-soft bg-background site-section-compact"
        aria-labelledby="policy-readiness-notes"
      >
        <div className="mx-auto grid max-w-7xl gap-0 divide-y divide-border-soft px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
          <h2 id="policy-readiness-notes" className="sr-only">
            Policy publication notes
          </h2>
          {policyAssuranceNotes.map((note) => (
            <div
              key={note}
              className="py-4 text-sm leading-6 text-slate-700 md:px-5 md:first:pl-0 md:last:pr-0"
            >
              {note}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Policy care"
            title="Grouped for families, staff, and statutory reference"
          >
            <p>
              This page treats policies as part of everyday trust: visible,
              organised, and careful about what becomes a downloadable public
              document.
            </p>
          </SectionIntro>
          <div className="mt-8 grid gap-6 border-y border-border-soft py-6 lg:grid-cols-[0.9fr_1.1fr]">
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
          <div className="mt-10 divide-y divide-border-soft border-y border-border-soft">
            {policyGroups.map((group) => (
              <section
                key={group.title}
                className="grid gap-6 py-8 lg:grid-cols-[0.42fr_1fr]"
                aria-labelledby={`${group.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}-policies`}
              >
                <div>
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
                  <p className="mt-4 border-l border-brand-gold pl-4 text-sm leading-6 text-slate-700">
                    {group.title === "Useful Guidance"
                      ? "Official guidance opens from source publication pages."
                      : "Formal school downloads are added once they are ready for families to use."}
                  </p>
                </div>
                <ul className="divide-y divide-border-soft text-sm">
                  {group.policies.map((policy) => {
                    const action = getPolicyAction(policy);

                    return (
                      <li key={policy.slug} className="py-4 first:pt-0 last:pb-0">
                        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
                          <div>
                            <Link
                              href={`/policies/${policy.slug}`}
                              className="font-medium text-brand-blue-strong hover:text-brand-red"
                            >
                              {policy.title}
                            </Link>
                            <p className="mt-1 text-xs leading-5 text-muted">
                              {policy.documentType} / {policy.owner}
                            </p>
                          </div>
                          <span
                            className={`inline-flex max-w-full items-center rounded-full border px-3 py-1 text-xs font-semibold leading-5 ${getPolicyStatusTone(policy)}`}
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

      <PageCta
        eyebrow="Need help now?"
        title="Questions about a policy?"
        actions={
          <>
            {policyContactLinks.map((link) => (
              <ButtonLink key={link.href} href={link.href} variant="light">
                {link.label}
              </ButtonLink>
            ))}
          </>
        }
      >
        <p>
          Families can ask practical questions, check branch details, or use
          the enquiry form to reach the school team directly.
        </p>
      </PageCta>
    </main>
  );
}
