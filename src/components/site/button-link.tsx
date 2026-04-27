import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

const variants = {
  primary:
    "bg-brand-blue text-white shadow-sm hover:bg-brand-blue-strong focus:ring-brand-blue/30",
  secondary:
    "border border-brand-blue/20 bg-transparent text-brand-blue-strong hover:border-brand-red hover:text-brand-red focus:ring-brand-red/30",
  light:
    "border border-white/25 bg-white text-brand-blue-strong hover:bg-surface-muted focus:ring-white/40",
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
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
