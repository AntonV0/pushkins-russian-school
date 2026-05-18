import type { ReactNode } from "react";

export type ToneBadgeTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "brand"
  | "gold";

const toneClasses: Record<ToneBadgeTone, string> = {
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
  info: "border-blue-200 bg-blue-50 text-blue-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-red-200 bg-red-50 text-red-800",
  brand: "border-brand-blue/20 bg-surface-blue text-brand-blue-strong",
  gold: "border-brand-gold/40 bg-[#fff8e8] text-brand-blue-strong",
};

type ToneBadgeProps = {
  children: ReactNode;
  tone?: ToneBadgeTone;
  title?: string;
  ariaLabel?: string;
  uppercase?: boolean;
  dot?: boolean;
  className?: string;
};

export function ToneBadge({
  children,
  tone = "neutral",
  title,
  ariaLabel,
  uppercase = false,
  dot = false,
  className = "",
}: ToneBadgeProps) {
  return (
    <span
      title={title}
      aria-label={ariaLabel}
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
        uppercase ? "uppercase tracking-[0.12em]" : ""
      } ${toneClasses[tone]} ${className}`}
    >
      {dot ? <span className="size-1.5 rounded-full bg-current" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
