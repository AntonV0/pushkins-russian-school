import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ButtonLink } from "@/components/site/button-link";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/site/json-ld";
import { faqGroups, faqs } from "@/data/faqs";
import { absoluteUrl, siteConfig } from "@/data/site";

const quietHeroLink =
  "min-h-0 w-auto justify-start px-0 py-1 text-left sm:min-h-11 sm:justify-center sm:px-5 sm:py-3";

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
  const totalQuestions = faqs.length;
  const highlightedGroups = faqGroups.slice(0, 3);

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
      <section className="border-b border-border-soft bg-surface/72 py-7 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "FAQ" }]} />
          <div className="mt-7 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                FAQ
              </p>
              <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] text-brand-blue-strong sm:text-5xl">
                Clear answers before you enquire
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                Find practical guidance on school locations, placement, fees,
                policies, gallery media, and what to include in a first
                message.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="#faq-choosing-a-branch">
                  Browse answers
                </ButtonLink>
                <ButtonLink
                  href="/contact#enquiry-form"
                  variant="quiet"
                  className={quietHeroLink}
                >
                  Ask the school
                </ButtonLink>
              </div>
            </div>
            <div className="border-y border-border-soft py-5 lg:border-l lg:border-y-0 lg:pl-8">
              <dl className="grid grid-cols-2 gap-5 text-sm sm:grid-cols-4 lg:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Answers
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-blue-strong">
                    {totalQuestions}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Groups
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-blue-strong">
                    {faqGroups.length}
                  </dd>
                </div>
              </dl>
              <div className="mt-5 grid gap-2 sm:flex sm:flex-wrap">
                {highlightedGroups.map((group) => (
                  <a
                    key={group.title}
                    href={`#faq-${group.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "")}`}
                    className="rounded-md border border-border-soft bg-background px-3 py-2.5 text-left text-sm font-semibold leading-5 text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30 sm:rounded-full sm:py-2"
                  >
                    {group.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FaqList groups={faqGroups} />
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-[1fr_auto] sm:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
              Still deciding?
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
              Send a focused enquiry and the school can point you to the right route
            </h2>
          </div>
          <ButtonLink href="/contact#enquiry-form">Ask the school</ButtonLink>
        </div>
      </section>
    </main>
  );
}
