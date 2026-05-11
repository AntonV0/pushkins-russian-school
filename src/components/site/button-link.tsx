import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "quiet";
  className?: string;
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
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 w-full max-w-full items-center justify-center rounded-md px-5 py-3 text-center text-sm font-semibold transition duration-150 focus:outline-none focus:ring-2 active:translate-y-px sm:w-auto ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
