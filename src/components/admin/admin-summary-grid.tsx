import type { ReactNode } from "react";

export type AdminSummaryCard = {
  label: string;
  value: string;
  detail: string;
  accent?: string;
};

type AdminSummaryGridProps = {
  ariaLabel: string;
  cards: AdminSummaryCard[];
  columnsClassName?: string;
  srOnly?: ReactNode;
};

export function AdminSummaryGrid({
  ariaLabel,
  cards,
  columnsClassName = "md:grid-cols-2 xl:grid-cols-5",
  srOnly,
}: AdminSummaryGridProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={`grid gap-4 ${columnsClassName}`}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          className={`border bg-surface p-5 shadow-sm ${
            card.accent ? `border-l-4 ${card.accent}` : "border-border-soft"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
            {card.label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-brand-blue-strong">
            {card.value}
          </p>
          <p className="mt-2 text-sm text-slate-600">{card.detail}</p>
        </div>
      ))}
      {srOnly ? <p className="sr-only">{srOnly}</p> : null}
    </section>
  );
}
