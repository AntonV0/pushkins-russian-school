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
      <section className="border-b border-border-soft bg-surface/80 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <Breadcrumbs items={[{ label: "FAQ" }]} />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              FAQ
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-brand-blue-strong sm:text-6xl">
              Clear answers for parents before they enquire
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              A parent-facing guide to choosing a school location, asking about
              placement, understanding fees, and knowing what information is
              safe to share at the first enquiry stage.
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
        </div>
      </section>

      <section className="border-b border-border-soft bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <LearningOptions
            eyebrow="Learning options"
            title="Which Russian-learning option should I ask about?"
            intro="The FAQ answers branch questions first, but the wider school offer gives families sensible alternatives when a local place is unavailable or the goal is exam-specific."
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
