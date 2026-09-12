import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Fragment } from "react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { JsonLd } from "@/components/site/json-ld";
import { PolicyContentsNav } from "@/components/site/policy-contents-nav";
import { PolicyPrintButton } from "@/components/site/policy-print-button";
import { PolicyEmailContact } from "@/components/site/policy-email-contact";
import {
  getPolicyBySlug,
  policies,
  type PolicyContentBlock,
} from "@/data/public/policies";
import { absoluteUrl, siteConfig } from "@/data/public/site";

type PolicyPageProps = {
  params: Promise<{ slug: string }>;
};

const policyEmail = "elena@pushkinsschool.co.uk";
const contactPattern = /(elena@pushkinsschool\.co\.uk|\b0(?:\d{4}\s\d{6}|\d{3}\s\d{3}\s\d{4})\b)/g;

function ContactLinkedText({ text }: { text: string }) {
  return text.split(contactPattern).map((part, index) => {
    if (part === policyEmail) {
      return (
        <a
          key={`${part}-${index}`}
          href={`mailto:${policyEmail}`}
          className="font-semibold text-brand-blue-strong underline decoration-brand-red/30 underline-offset-4 hover:text-brand-red"
        >
          {part}
        </a>
      );
    }

    if (/^0[\d\s]+$/.test(part)) {
      return (
        <a
          key={`${part}-${index}`}
          href={`tel:${part.replaceAll(" ", "")}`}
          className="font-semibold text-brand-blue-strong underline decoration-brand-red/30 underline-offset-4 hover:text-brand-red"
        >
          {part}
        </a>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({
  params,
}: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);

  if (!policy) {
    return { title: "Policy not found" };
  }

  return {
    title: policy.title,
    description: policy.description,
    alternates: {
      canonical: `/policies/${policy.slug}`,
    },
    openGraph: {
      title: `${policy.title} | Pushkin's School`,
      description: policy.description,
      url: `/policies/${policy.slug}`,
      type: "article",
    },
  };
}

function PolicyBlocks({ blocks }: { blocks: PolicyContentBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === "paragraph") {
      return (
        <p key={`${block.text}-${index}`}>
          <ContactLinkedText text={block.text} />
        </p>
      );
    }

    if (block.type === "subheading") {
      return (
        <h3
          key={`${block.text}-${index}`}
          className="pt-3 text-xl font-semibold leading-tight text-brand-blue-strong sm:text-2xl"
        >
          {block.text}
        </h3>
      );
    }

    if (block.type === "list") {
      return (
        <ul
          key={`list-${index}`}
          className="my-5 space-y-3 border-y border-border-soft bg-background px-5 py-5"
        >
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.68rem] size-1.5 shrink-0 rounded-full bg-brand-accent"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div key={`links-${index}`} className="my-5 divide-y divide-border-soft border-y border-border-soft">
        {block.items.map((item) => {
          const isExternal = item.href.startsWith("http");
          const className =
            "group grid gap-2 py-4 text-brand-blue-strong transition hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/25";
          const content = (
            <>
              <span className="inline-flex items-center gap-2 font-semibold underline decoration-brand-red/30 underline-offset-4">
                {item.label}
                {isExternal ? (
                  <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
                ) : (
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                )}
              </span>
              {item.description ? (
                <span className="text-sm leading-6 text-slate-600">
                  {item.description}
                </span>
              ) : null}
            </>
          );

          return isExternal ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {content}
            </a>
          ) : (
            <Link key={item.href} href={item.href} className={className}>
              {content}
            </Link>
          );
        })}
      </div>
    );
  });
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
    description: policy.description,
    inLanguage: "en-GB",
    dateModified: policy.lastUpdatedIso,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <main className="policy-page">
      <JsonLd data={policyJsonLd} />
      <section className="border-b border-border-soft bg-surface/72 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Policies", href: "/policies" },
              { label: policy.title },
            ]}
          />
          <div className="mt-7">
            <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.05] text-brand-blue-strong sm:text-5xl">
              {policy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              {policy.summary}
            </p>
            <dl className="mt-7 grid max-w-6xl gap-3 border-y border-border-soft py-4 text-sm leading-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-6">
              <div className="flex items-baseline gap-3">
                <dt className="w-24 shrink-0 whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-slate-500 md:w-auto">
                  Last updated
                </dt>
                <dd className="font-medium text-brand-blue-strong">
                  <time dateTime={policy.lastUpdatedIso}>{policy.lastUpdated}</time>
                </dd>
              </div>
              <div className="flex items-baseline gap-3 md:border-l md:border-border-soft md:pl-6">
                <dt className="w-24 shrink-0 whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-slate-500 md:w-auto">
                  Next review
                </dt>
                <dd className="font-medium text-brand-blue-strong">
                  {policy.nextReview}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-background py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start lg:px-8">
          <PolicyContentsNav sections={policy.sections} />

          <article className="min-w-0 divide-y divide-border-soft border-y border-border-soft bg-surface px-5 sm:px-8">
            {policy.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-28 py-8 sm:py-10 ${
                  section.emphasis
                    ? `-mx-5 border-l-4 bg-surface-blue px-5 sm:-mx-8 sm:px-[1.75rem] ${
                        section.id === "children-summary"
                          ? "border-l-brand-blue"
                          : "border-l-brand-red"
                      }`
                    : ""
                }`}
              >
                <h2
                  tabIndex={-1}
                  className="text-balance text-2xl font-semibold leading-tight text-brand-blue-strong focus:outline-none sm:text-3xl"
                >
                  {section.title}
                </h2>
                <div className="mt-5 max-w-3xl space-y-4 text-[0.98rem] leading-7 text-slate-700 sm:text-base">
                  <PolicyBlocks blocks={section.blocks} />
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>

      <section className="policy-no-print border-t border-border-soft bg-surface py-9 sm:py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-xl font-semibold text-brand-blue-strong">
              Need clarification or an accessible copy?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Email the school with the policy title and your question.
            </p>
            <div className="mt-3">
              <PolicyEmailContact />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <PolicyPrintButton />
          </div>
        </div>
      </section>
    </main>
  );
}
