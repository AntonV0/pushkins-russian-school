import type { LucideIcon } from "lucide-react";

type SiteIconBadgeProps = {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
};

export function SiteIconBadge({
  icon: Icon,
  className = "",
  iconClassName = "size-5",
}: SiteIconBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-brand-blue/10 bg-surface-blue text-brand-blue-strong ${className}`}
    >
      <Icon className={iconClassName} strokeWidth={1.9} />
    </span>
  );
}
