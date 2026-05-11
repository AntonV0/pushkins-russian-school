import type { ReactNode } from "react";
import { CtaGroup } from "./cta-group";

type PageCtaProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  tone?: "light" | "dark";
};

export function PageCta({
  eyebrow,
  title,
  children,
  actions,
  tone = "dark",
}: PageCtaProps) {
  const isDark = tone === "dark";

  return (
    <section
      className={`border-t ${
        isDark
          ? "border-brand-blue/40 bg-brand-blue-strong text-white"
          : "border-border-soft bg-surface text-brand-blue-strong"
      } py-14 sm:py-16`}
    >
      <div className="mx-auto grid max-w-7xl gap-7 px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                isDark ? "text-brand-gold" : "text-brand-red"
              }`}
            >
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            {title}
          </h2>
          {children ? (
            <div
              className={`mt-4 max-w-2xl text-sm leading-6 ${
                isDark ? "text-white/75" : "text-slate-600"
              }`}
            >
              {children}
            </div>
          ) : null}
        </div>
        {actions ? (
          <CtaGroup align="right" className="md:justify-self-end">
            {actions}
          </CtaGroup>
        ) : null}
      </div>
    </section>
  );
}
