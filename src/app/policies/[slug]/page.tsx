import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ButtonLink } from "@/components/site/button-link";
import {
  getPolicyBySlug,
  policies,
  policyPublicationChecklist,
} from "@/data/policies";

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
    description: `${policy.title} shell for Pushkin's School. Reviewed document upload pending.`,
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

  return (
    <main>
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
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <aside className="bg-surface-muted p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-brand-blue-strong">
              Document status
            </h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="font-semibold text-brand-blue-strong">Audience</dt>
                <dd className="mt-1 text-slate-600">{policy.audience}</dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-blue-strong">
                  Document type
                </dt>
                <dd className="mt-1 text-slate-600">{policy.documentType}</dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-blue-strong">Status</dt>
                <dd className="mt-1 text-slate-600">{policy.status}</dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-blue-strong">
                  Review note
                </dt>
                <dd className="mt-1 text-slate-600">{policy.reviewCadence}</dd>
              </div>
            </dl>
          </aside>

          <div className="rounded-lg border border-border-soft bg-surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              What this page will include
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              This shell is ready for the approved document, a short parent-safe
              summary, the review date, and the final download or external
              guidance link.
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
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
              <span className="inline-flex items-center justify-center rounded-full border border-border-soft px-5 py-3 text-sm font-semibold text-muted">
                Download pending review
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
