import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type DecisionPanelAction = {
  href: string;
  label: string;
};

type DecisionPanelProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  actions?: DecisionPanelAction[];
  tone?: "light" | "blue";
  className?: string;
};

export function DecisionPanel({
  eyebrow,
  title,
  children,
  actions = [],
  tone = "light",
  className = "",
}: DecisionPanelProps) {
  const isBlue = tone === "blue";

  return (
    <aside
      className={`rounded-lg border p-5 sm:p-6 ${
        isBlue
          ? "border-white/15 bg-white/8 text-white"
          : "border-brand-blue/10 bg-surface-blue/70 text-brand-blue-strong"
      } ${className}`}
    >
      {eyebrow ? (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.16em] ${
            isBlue ? "text-brand-gold" : "text-brand-red"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-xl font-semibold leading-tight">{title}</h2>
      <div
        className={`mt-3 text-sm leading-6 ${
          isBlue ? "text-white/75" : "text-slate-700"
        }`}
      >
        {children}
      </div>
      {actions.length > 0 ? (
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {actions.map((action, index) => (
            <Link
              key={action.href}
              href={action.href}
              className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 ${
                isBlue
                  ? index === 0
                    ? "bg-white text-brand-blue-strong hover:bg-surface-muted focus:ring-white/40"
                    : "border border-white/20 text-white hover:border-white/40 hover:bg-white/10 focus:ring-white/30"
                  : index === 0
                    ? "bg-brand-blue text-white hover:bg-brand-blue-strong focus:ring-brand-blue/30"
                    : "border border-brand-blue/20 bg-white/65 text-brand-blue-strong hover:border-brand-red hover:text-brand-red focus:ring-brand-red/30"
              }`}
            >
              <span>{action.label}</span>
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
