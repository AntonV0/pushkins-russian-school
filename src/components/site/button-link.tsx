import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  variant?: "primary" | "secondary" | "light" | "quiet" | "header";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const variants = {
  primary:
    "relative overflow-hidden bg-brand-blue text-white shadow-[var(--elevation-button)] ease-out before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] before:transition-transform before:duration-700 before:ease-out hover:-translate-y-0.5 hover:bg-brand-blue-strong hover:shadow-[var(--elevation-button-hover)] hover:before:translate-x-full focus:ring-brand-blue/30 motion-reduce:transition-none motion-reduce:before:hidden motion-reduce:hover:translate-y-0",
  secondary:
    "border border-brand-blue/20 bg-white/70 text-brand-blue-strong hover:border-brand-red hover:bg-white hover:text-brand-red focus:ring-brand-red/30",
  light:
    "border border-white/25 bg-white text-brand-blue-strong shadow-sm hover:bg-surface-muted focus:ring-white/40",
  quiet:
    "border border-transparent bg-transparent text-brand-blue-strong underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red hover:decoration-brand-red focus:ring-brand-red/30",
  header:
    "relative overflow-hidden bg-[linear-gradient(135deg,var(--brand-blue-strong)_0%,#092f5f_58%,var(--brand-blue)_100%)] text-white shadow-[var(--elevation-button)] before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)] before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:shadow-[var(--elevation-button-hover)] hover:before:translate-x-full focus:ring-brand-blue/30",
};

export const quietActionLinkClassName =
  "group min-h-0 w-auto justify-start px-0 py-1 text-left transition duration-200 hover:-translate-y-0.5 hover:scale-[1.015] hover:decoration-brand-red/80 sm:min-h-11 sm:justify-center sm:px-5 sm:py-3";

export const quietHeroLinkClassName =
  "min-h-0 w-auto justify-start px-0 py-1 text-left sm:min-h-11 sm:justify-center sm:px-5 sm:py-3";

export function ButtonLink({
  href,
  children,
  icon,
  iconPosition = "start",
  variant = "primary",
  className = "",
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex min-h-11 w-full max-w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-center text-sm font-semibold whitespace-nowrap transition duration-150 focus:outline-none focus-visible:ring-2 active:translate-y-px sm:w-auto ${variants[variant]} ${className}`}
    >
      {icon && iconPosition === "start" ? (
        <span aria-hidden="true" className="relative z-10 inline-flex shrink-0">
          {icon}
        </span>
      ) : null}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "end" ? (
        <span aria-hidden="true" className="relative z-10 inline-flex shrink-0">
          {icon}
        </span>
      ) : null}
    </Link>
  );
}
