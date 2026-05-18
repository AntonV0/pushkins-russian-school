import type { ReactNode } from "react";

type AdminTablePanelProps = {
  title: string;
  description: ReactNode;
  actions?: ReactNode;
  scrollLabel: string;
  titleClassName?: string;
  footer?: ReactNode;
  children: ReactNode;
};

export function AdminTablePanel({
  title,
  description,
  actions,
  scrollLabel,
  titleClassName = "text-lg",
  footer,
  children,
}: AdminTablePanelProps) {
  return (
    <div className="overflow-hidden border border-border-soft bg-surface shadow-sm">
      <div className="border-b border-border-soft px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className={`${titleClassName} font-semibold text-brand-blue-strong`}>
              {title}
            </h2>
            <div className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
              {description}
            </div>
          </div>
          {actions}
        </div>
      </div>
      <div
        className="overflow-x-auto focus:outline-none focus:ring-2 focus:ring-brand-red/30"
        tabIndex={0}
        aria-label={scrollLabel}
      >
        {children}
      </div>
      {footer ? (
        <div className="border-t border-border-soft bg-background px-5 py-4 sm:px-6">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
