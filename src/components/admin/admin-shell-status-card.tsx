import Link from "next/link";
import type { ReactNode } from "react";

type AdminShellStatusCardProps = {
  label?: string;
  children: ReactNode;
  links?: Array<{
    href: string;
    label: string;
  }>;
};

export function AdminShellStatusCard({
  label = "Shell status",
  children,
  links,
}: AdminShellStatusCardProps) {
  return (
    <div className="grid min-w-64 gap-3 border-l-4 border-brand-gold bg-background p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
        {label}
      </p>
      <div className="text-sm leading-6 text-slate-600">{children}</div>
      {links ? (
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
