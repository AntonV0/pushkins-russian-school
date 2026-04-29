import type { FaqGroup } from "@/data/faqs";

type FaqListProps = {
  groups: FaqGroup[];
};

export function FaqList({ groups }: FaqListProps) {
  return (
    <div className="grid gap-6">
      {groups.map((group) => (
        <section
          key={group.title}
          className="premium-panel rounded-lg border border-border-soft bg-surface p-6"
        >
          <div className="grid gap-3 md:grid-cols-[0.72fr_1.28fr]">
            <div>
              <h2 className="text-2xl font-semibold text-brand-blue-strong">
                {group.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {group.summary}
              </p>
            </div>
            <div className="divide-y divide-border-soft">
              {group.items.map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-md text-left text-base font-semibold text-brand-blue-strong marker:hidden focus:outline-none focus:ring-2 focus:ring-brand-red/30">
                    <span>{item.question}</span>
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-border-soft text-sm text-brand-red transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
