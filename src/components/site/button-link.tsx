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
    "bg-brand-blue text-white shadow-[0_10px_24px_rgba(20,56,102,0.18)] hover:bg-brand-blue-strong focus:ring-brand-blue/30",
  secondary:
    "border border-brand-blue/20 bg-white/70 text-brand-blue-strong hover:border-brand-red hover:bg-white hover:text-brand-red focus:ring-brand-red/30",
  light:
    "border border-white/25 bg-white text-brand-blue-strong shadow-sm hover:bg-surface-muted focus:ring-white/40",
  quiet:
    "border border-transparent bg-transparent text-brand-blue-strong underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red hover:decoration-brand-red focus:ring-brand-red/30",
  header:
    "relative overflow-hidden bg-[linear-gradient(135deg,var(--brand-blue-strong)_0%,#092f5f_58%,var(--brand-blue)_100%)] text-white shadow-[0_14px_30px_rgba(0,32,72,0.2)] before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)] before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(0,32,72,0.28)] hover:before:translate-x-full focus:ring-brand-blue/30",
};

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
