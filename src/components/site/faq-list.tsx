import type { FaqGroup } from "@/data/faqs";

type FaqListProps = {
  groups: FaqGroup[];
};

function getGroupId(title: string) {
  return `faq-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export function FaqList({ groups }: FaqListProps) {
  const totalQuestions = groups.reduce(
    (count, group) => count + group.items.length,
    0,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:items-start">
      <aside className="premium-panel rounded-lg border border-border-soft bg-surface p-5 lg:sticky lg:top-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
          Answer index
        </p>
        <div className="mt-4 grid gap-1">
          {groups.map((group) => (
            <a
              key={group.title}
              href={`#${getGroupId(group.title)}`}
              className="rounded-md px-3 py-2 text-sm font-semibold text-brand-blue-strong transition hover:bg-surface-muted hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              {group.title}
            </a>
          ))}
        </div>
        <div className="mt-5 border-t border-border-soft pt-5">
          <p className="text-3xl font-semibold text-brand-blue-strong">
            {totalQuestions}
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            parent questions grouped by decision stage
          </p>
        </div>
      </aside>

      <div className="grid gap-6">
        {groups.map((group, groupIndex) => {
          const featured = groupIndex === 0;

          return (
            <section
              id={getGroupId(group.title)}
              key={group.title}
              className={`scroll-mt-28 overflow-hidden rounded-lg border ${
                featured
                  ? "border-brand-blue bg-brand-blue-strong"
                  : "border-border-soft bg-surface"
              }`}
            >
              <div className="grid gap-4 p-6 md:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                      featured ? "text-brand-gold" : "text-brand-red"
                    }`}
                  >
                    Question group {groupIndex + 1}
                  </p>
                  <h2
                    className={`mt-3 text-2xl font-semibold ${
                      featured ? "text-white" : "text-brand-blue-strong"
                    }`}
                  >
                    {group.title}
                  </h2>
                </div>
                <p
                  className={`text-sm leading-6 ${
                    featured ? "text-white/75" : "text-slate-600"
                  }`}
                >
                  {group.summary}
                </p>
              </div>

              <div className="divide-y divide-border-soft bg-background">
                {group.items.map((item) => (
                  <details key={item.question} className="group">
                    <summary className="grid cursor-pointer list-none gap-4 px-6 py-5 text-left marker:hidden focus:outline-none focus:ring-2 focus:ring-brand-red/30 sm:grid-cols-[1fr_auto] sm:items-start">
                      <span className="text-base font-semibold leading-6 text-brand-blue-strong">
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border-soft bg-white text-sm font-semibold text-brand-red transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-5">
                      <p className="max-w-3xl border-l border-brand-gold pl-4 text-sm leading-6 text-slate-600">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
