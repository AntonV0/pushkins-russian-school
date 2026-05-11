import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ButtonLink } from "@/components/site/button-link";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/site/json-ld";
import { LearningOptions } from "@/components/site/learning-options";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
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

const parentAnswerMap = [
  {
    label: "Choosing a school",
    detail: "Compare current classes, online options, and register-interest areas.",
  },
  {
    label: "Starting point",
    detail: "Understand class placement, Russian level, age, and first enquiry details.",
  },
  {
    label: "Practical trust",
    detail: "Check fees, documents, gallery care, privacy, and next steps.",
  },
];

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
  const totalQuestions = faqs.length;

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
      <PageHero
        eyebrow="FAQ"
        title="Clear answers for parents before they enquire"
        prelude={<Breadcrumbs items={[{ label: "FAQ" }]} />}
        actions={
          <>
            <ButtonLink href="/contact#enquiry-form">Start an enquiry</ButtonLink>
            <ButtonLink href="/schools" variant="secondary">
              Compare schools
            </ButtonLink>
          </>
        }
        aside={
          <div className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-background">
            <div className="border-b border-border-soft bg-brand-blue-strong p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
                Parent answer map
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-4xl font-semibold">{totalQuestions}</p>
                  <p className="mt-1 text-sm text-white/70">answers</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold">{faqGroups.length}</p>
                  <p className="mt-1 text-sm text-white/70">groups</p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-border-soft">
              {parentAnswerMap.map((item, index) => (
                <div
                  key={item.label}
                  className="grid gap-4 px-6 py-5 sm:grid-cols-[3rem_1fr]"
                >
                  <span className="flex h-10 w-10 items-center justify-center justify-self-start rounded-full border border-brand-gold/50 bg-surface-muted text-sm font-semibold text-brand-blue-strong">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-brand-blue-strong">
                      {item.label}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600">
                      {item.detail}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <p>
          A parent-facing guide to choosing a school location, asking about
          placement, understanding fees, and knowing what information is safe to
          share at the first enquiry stage.
        </p>
      </PageHero>

      <section className="border-b border-border-soft bg-background site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <LearningOptions
            eyebrow="Learning options"
            title="Which Russian-learning option should I ask about?"
            intro="The FAQ answers branch questions first, but the wider school offer gives families sensible alternatives when a local place is unavailable or the goal is exam-specific."
            compact
          />
        </div>
      </section>

      <section className="bg-background site-section-compact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FaqList groups={faqGroups} />
        </div>
      </section>

      <PageCta
        eyebrow="Still deciding?"
        title="Send a focused enquiry and the school can point you to the right route"
        actions={
          <ButtonLink href="/contact#enquiry-form" variant="light">
            Ask the school
          </ButtonLink>
        }
      />
    </main>
  );
}
