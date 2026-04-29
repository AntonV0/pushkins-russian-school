import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ButtonLink } from "@/components/site/button-link";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/site/json-ld";
import { LearningOptions } from "@/components/site/learning-options";
import { faqGroups, faqs } from "@/data/faqs";
import { absoluteUrl, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common parent questions about Pushkin's School branches, class placement, fees, policies, gallery media, and enquiries.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | Pushkin's School",
    description:
      "Common parent questions about branches, placement, fees, documents, and enquiries.",
    url: "/faq",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <main>
      <JsonLd
        data={{
          ...faqJsonLd,
          url: absoluteUrl("/faq"),
          isPartOf: {
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
          },
        }}
      />
      <section className="border-b border-border-soft bg-surface/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "FAQ" }]} />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            FAQ
          </p>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-brand-blue-strong sm:text-6xl">
            Clear answers for parents before they enquire
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
            These answers use the current rebuild data and deliberately keep
            business-sensitive or unverified details out until they are
            confirmed.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact#enquiry-form">
              Start an enquiry
            </ButtonLink>
            <ButtonLink href="/schools" variant="secondary">
              Compare schools
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <LearningOptions
            eyebrow="Learning routes"
            title="Which Russian-learning option should I ask about?"
            intro="The FAQ answers branch questions first, but the wider network gives families sensible alternatives when a local place is unavailable or the goal is exam-specific."
            compact
          />
        </div>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FaqList groups={faqGroups} />
        </div>
      </section>
    </main>
  );
}
