import Link from "next/link";
import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  status?: ReactNode;
  backLink?: {
    href: string;
    label: string;
  };
};

export function AdminPageHeader({
  eyebrow,
  title,
  children,
  status,
  backLink,
}: AdminPageHeaderProps) {
  return (
    <section className="border-b border-border-soft bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {backLink ? (
          <Link
            href={backLink.href}
            className="text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
          >
            {backLink.label}
          </Link>
        ) : null}
        <div
          className={
            backLink
              ? "mt-6 grid gap-8 lg:grid-cols-[1fr_0.38fr]"
              : "flex flex-wrap items-start justify-between gap-6"
          }
        >
          <div>
            <p
              className={
                backLink
                  ? "font-mono text-sm font-semibold text-brand-red"
                  : "text-sm font-semibold uppercase tracking-[0.18em] text-brand-red"
              }
            >
              {eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
              {title}
            </h1>
            <div className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {children}
            </div>
          </div>
          {status}
        </div>
      </div>
    </section>
  );
}
