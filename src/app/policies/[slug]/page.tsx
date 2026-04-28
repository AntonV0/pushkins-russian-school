import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ButtonLink } from "@/components/site/button-link";
import { JsonLd } from "@/components/site/json-ld";
import {
  getPolicyAction,
  getPolicyBySlug,
  getPolicyDownloadReadiness,
  getPolicyMetadata,
  getPolicyStatusTone,
  policies,
  policyAssetConvention,
  policyPublicationChecklist,
  policySupportLinks,
} from "@/data/policies";
import { absoluteUrl, siteConfig } from "@/data/site";

type PolicyPageProps = {
  params: Promise<{ slug: string }>;
};

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

  return (
    <main>
      <JsonLd data={policyJsonLd} />
      <section className="border-b border-border-soft bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Policies", href: "/policies" },
              { label: policy.title },
            ]}
          />
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
            {policy.group}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
            {policy.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {policy.summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${getPolicyStatusTone(policy)}`}
            >
              {policy.status}
            </span>
            {action ? (
              <a
                href={action.href}
                target={action.isExternal ? "_blank" : undefined}
                rel={action.isExternal ? "noopener noreferrer" : undefined}
                download={action.isExternal ? undefined : true}
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              >
                {action.label}
              </a>
            ) : (
              <span className="inline-flex items-center justify-center rounded-full border border-border-soft bg-background px-5 py-2.5 text-sm font-semibold text-muted">
                {downloadReadiness.label}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <aside className="bg-surface-muted p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-brand-blue-strong">
              Document metadata
            </h2>
            <dl className="mt-6 space-y-5 text-sm">
              {metadata.map((item) => (
                <div key={item.label}>
                  <dt className="font-semibold text-brand-blue-strong">
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
              <p className="mt-4 text-xs leading-5 text-muted">
                Approved PDFs must be stored in{" "}
                <code className="rounded bg-background px-1.5 py-0.5 text-[0.7rem] text-brand-blue-strong">
                  {policyAssetConvention.publicFolder}
                </code>{" "}
                and linked as{" "}
                <code className="rounded bg-background px-1.5 py-0.5 text-[0.7rem] text-brand-blue-strong">
                  {policyAssetConvention.publicPathPrefix}*.pdf
                </code>
                .
              </p>
            </div>
          </aside>

          <div className="rounded-lg border border-border-soft bg-surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Parent summary
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {policy.parentGuidance}
            </p>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-brand-red">
              Publication status
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {policy.statusDescription}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {policy.reviewCadence}
            </p>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-brand-red">
              Publication checklist
            </h3>
            <ul className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
              {policyPublicationChecklist.map((item) => (
                <li key={item} className="border-l border-brand-gold pl-4">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/policies" variant="secondary">
                Back to policy index
              </ButtonLink>
              {action ? (
                <a
                  href={action.href}
                  target={action.isExternal ? "_blank" : undefined}
                  rel={action.isExternal ? "noopener noreferrer" : undefined}
                  download={action.isExternal ? undefined : true}
                  className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                >
                  {action.label}
                </a>
              ) : (
                <span className="inline-flex items-center justify-center rounded-full border border-border-soft px-5 py-3 text-sm font-semibold text-muted">
                  {downloadReadiness.label}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Practical next steps
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This page is public-safe while the formal document workflow is
              completed. Families can still use the enquiry and school routes
              for current practical information.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {policySupportLinks.map((link) => (
              <ButtonLink
                key={link.href}
                href={link.href}
                variant={link.href === "/contact#enquiry-form" ? "primary" : "secondary"}
                className="h-full items-start text-left"
              >
                {link.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
