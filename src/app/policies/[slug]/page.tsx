import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ButtonLink } from "@/components/site/button-link";
import { JsonLd } from "@/components/site/json-ld";
import {
  getPolicyAction,
  getPolicyBySlug,
  getPolicyDownloadReadiness,
  getPolicyMetadata,
  getPolicyNextSteps,
  getPolicyStatusTone,
  policies,
  policyPublicationChecklist,
  policySupportLinks,
  safeguardingConcernGuidance,
} from "@/data/policies";
import { absoluteUrl, siteConfig } from "@/data/site";

type PolicyPageProps = {
  params: Promise<{ slug: string }>;
};

const parentPolicyAssurance = [
  "Read the parent summary first.",
  "Use official guidance links where the school document is not public yet.",
  "Ask the school a practical question if your family needs clarification.",
];

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({
  params,
}: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);

  if (!policy) {
    return {
      title: "Policy not found",
    };
  }

  return {
    title: policy.title,
    description: `${policy.title} summary and publication status for Pushkin's School policies.`,
    alternates: {
      canonical: `/policies/${policy.slug}`,
    },
    openGraph: {
      title: `${policy.title} | Pushkin's School`,
      description: policy.summary,
      url: `/policies/${policy.slug}`,
      type: "article",
    },
  };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);

  if (!policy) {
    notFound();
  }

  const policyJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: policy.title,
    url: absoluteUrl(`/policies/${policy.slug}`),
    description: policy.summary,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "Thing",
      name: policy.documentType,
    },
    ...(policy.reviewDate ? { dateModified: policy.reviewDate } : {}),
  };
  const action = getPolicyAction(policy);
  const metadata = getPolicyMetadata(policy);
  const downloadReadiness = getPolicyDownloadReadiness(policy);
  const nextSteps = getPolicyNextSteps(policy);
  const isSafeguardingPolicy = policy.slug === "safeguarding-policy";

  return (
    <main>
      <JsonLd data={policyJsonLd} />
      <section className="border-b border-border-soft bg-surface/72 py-9 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.78fr] lg:px-8">
          <div>
            <Breadcrumbs
              items={[
                { label: "Policies", href: "/policies" },
                { label: policy.title },
              ]}
            />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              {policy.group}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance break-words text-4xl font-semibold leading-[1.06] text-brand-blue-strong sm:text-5xl">
              {policy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {policy.summary}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <span
                className={`inline-flex max-w-full items-center rounded-full border px-4 py-2 text-sm font-semibold leading-5 ${getPolicyStatusTone(policy)}`}
              >
                {policy.status}
              </span>
              {action ? (
                <a
                  href={action.href}
                  target={action.isExternal ? "_blank" : undefined}
                  rel={action.isExternal ? "noopener noreferrer" : undefined}
                  download={action.isExternal ? undefined : true}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-brand-blue px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30 sm:w-auto"
                >
                  <span>{action.label}</span>
                  {action.isExternal ? (
                    <ExternalLink aria-hidden="true" className="size-4" />
                  ) : (
                    <ArrowRight aria-hidden="true" className="size-4" />
                  )}
                </a>
              ) : (
                <span className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-border-soft bg-background px-5 py-2.5 text-center text-sm font-semibold text-muted sm:w-auto">
                  {downloadReadiness.label}
                </span>
              )}
            </div>
          </div>
          <aside className="border-y border-border-soft py-6 lg:border-l lg:border-y-0 lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
              Document guide
            </p>
            {isSafeguardingPolicy ? (
              <div className="mt-4 border-l-4 border-brand-red bg-background p-4">
                <h2 className="text-xl font-semibold leading-tight text-brand-blue-strong">
                  If you are worried about a child
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  The safeguarding concern guidance appears immediately after
                  this page summary.
                </p>
                <a
                  href="#safeguarding-concern"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
                >
                  <span>Jump to concern guidance</span>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            ) : (
              <>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-brand-blue-strong">
                  Clear guidance before downloads are available
                </h2>
                <ol className="mt-5 divide-y divide-border-soft">
                  {parentPolicyAssurance.map((item) => (
                    <li
                      key={item}
                      className="grid gap-4 py-4 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center justify-self-start rounded-full border border-brand-gold/50 bg-surface-muted text-sm font-semibold text-brand-blue-strong">
                        <ShieldCheck aria-hidden="true" className="size-4 text-brand-red" />
                      </span>
                      <span className="text-sm leading-6 text-slate-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </aside>
        </div>
      </section>

      {isSafeguardingPolicy ? (
        <section
          id="safeguarding-concern"
          className="border-b border-border-soft bg-surface py-10 sm:py-12"
        >
          <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                Safeguarding concern
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-brand-blue-strong">
                {safeguardingConcernGuidance.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {safeguardingConcernGuidance.intro}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {safeguardingConcernGuidance.items.map((item) => (
                <article
                  key={item.label}
                  className={`border-l-4 bg-background p-5 ${
                    item.href
                      ? "border-brand-red"
                      : "border-brand-gold"
                  }`}
                >
                  <h3 className="text-sm font-semibold text-brand-blue-strong">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.body}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
                    >
                      {item.linkLabel}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-background py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <aside className="border-y border-border-soft bg-surface-muted py-6 sm:py-8 lg:border-l lg:border-y-0 lg:px-8">
            <h2 className="text-xl font-semibold text-brand-blue-strong">
              Page record
            </h2>
            <dl className="mt-6 space-y-5 text-sm">
              {metadata.map((item) => (
                <div key={item.label}>
                  <dt className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                    <FileText aria-hidden="true" className="size-4 text-brand-red" />
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-slate-600">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 border-t border-border-soft pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-red">
                Download state
              </h3>
              <p className="mt-3 text-sm font-semibold text-brand-blue-strong">
                {downloadReadiness.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {downloadReadiness.description}
              </p>
            </div>
          </aside>

          <div className="border border-border-soft bg-surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Parent summary
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {policy.parentGuidance}
            </p>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-brand-red">
              Availability
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {policy.statusDescription}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {downloadReadiness.description}
            </p>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-brand-red">
              How to use this page
            </h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {nextSteps.map((step) => (
                <div
                  key={step.title}
                  className="border-l border-brand-gold bg-background px-4 py-3"
                >
                  <CheckCircle2 aria-hidden="true" className="mb-2 size-4 text-brand-red" />
                  <h4 className="text-sm font-semibold text-brand-blue-strong">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-brand-red">
              What this page gives you
            </h3>
            <ul className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
              {policyPublicationChecklist.map((item) => (
                <li
                  key={item}
                  className="border-l border-brand-gold bg-background px-4 py-3"
                >
                  <span className="flex gap-2">
                    <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
                    <span>{item}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/policies" variant="secondary">
                Back to policy index
              </ButtonLink>
              {action ? (
                <a
                  href={action.href}
                  target={action.isExternal ? "_blank" : undefined}
                  rel={action.isExternal ? "noopener noreferrer" : undefined}
                  download={action.isExternal ? undefined : true}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-brand-blue px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30 sm:w-auto"
                >
                  <span>{action.label}</span>
                  {action.isExternal ? (
                    <ExternalLink aria-hidden="true" className="size-4" />
                  ) : (
                    <ArrowRight aria-hidden="true" className="size-4" />
                  )}
                </a>
              ) : (
                <span className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-border-soft px-5 py-3 text-center text-sm font-semibold text-muted sm:w-auto">
                  {downloadReadiness.label}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Practical next steps
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This page gives families the useful summary first. Formal
              downloads appear only when they are ready for families, and the
              enquiry form stays focused on practical questions rather than
              sensitive policy details.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {policySupportLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-lg border p-5 transition focus:outline-none focus:ring-2 focus:ring-brand-red/30 ${
                  link.href === "/contact#enquiry-form"
                    ? "border-brand-blue bg-brand-blue text-white hover:bg-brand-blue-strong"
                    : "border-border-soft bg-background text-brand-blue-strong hover:border-brand-red hover:text-brand-red"
                }`}
              >
                <ArrowRight aria-hidden="true" className="mb-3 size-5" />
                <span className="block text-sm font-semibold">
                  {link.label}
                </span>
                <span
                  className={`mt-2 block text-sm leading-6 ${
                    link.href === "/contact#enquiry-form"
                      ? "text-white/75"
                      : "text-slate-600"
                  }`}
                >
                  {link.description}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
