import type { ReactNode } from "react";
import { CtaGroup } from "./cta-group";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  prelude?: ReactNode;
  variant?: "home" | "standard" | "compact";
  asideAlign?: "center" | "start";
  className?: string;
};

const sectionPadding = {
  home: "py-10 sm:py-12 lg:py-14",
  standard: "py-11 sm:py-14 lg:py-16",
  compact: "py-9 sm:py-12",
};

const titleSize = {
  home: "text-4xl sm:text-5xl lg:text-6xl",
  standard: "text-3xl sm:text-4xl lg:text-5xl",
  compact: "text-3xl sm:text-4xl",
};

export function PageHero({
  eyebrow,
  title,
  children,
  actions,
  aside,
  prelude,
  variant = "standard",
  asideAlign = "center",
  className = "",
}: PageHeroProps) {
  const isHome = variant === "home";
  const asideAlignment = asideAlign === "start" ? "lg:items-start" : "lg:items-center";

  return (
    <section
      className={`border-b border-border-soft bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(255,255,255,0.58))] ${sectionPadding[variant]} ${className}`}
    >
      <div
        className={`mx-auto grid max-w-7xl gap-8 px-6 lg:px-8 ${
          aside
            ? isHome
              ? `lg:min-h-[clamp(30rem,calc(100svh-18rem),38rem)] lg:grid-cols-[0.92fr_1.08fr] ${asideAlignment}`
              : `lg:grid-cols-[0.96fr_1.04fr] ${asideAlignment}`
            : ""
        }`}
      >
        <div className="min-w-0">
          {prelude ? <div className="mb-5">{prelude}</div> : null}
          <p className="max-w-2xl text-xs font-semibold uppercase tracking-[0.16em] text-brand-red sm:tracking-[0.2em]">
            {eyebrow}
          </p>
          <h1
            className={`mt-4 max-w-4xl text-balance break-words font-semibold leading-[1.04] text-brand-blue-strong ${titleSize[variant]}`}
          >
            {title}
          </h1>
          <div
            className={`mt-5 max-w-3xl leading-8 text-slate-700 ${
              isHome ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {children}
          </div>
          {actions ? (
            <CtaGroup className="mt-7 sm:mt-8">{actions}</CtaGroup>
          ) : null}
        </div>
        {aside ? <div className="min-w-0">{aside}</div> : null}
      </div>
    </section>
  );
}
