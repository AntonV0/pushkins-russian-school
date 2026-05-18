import type { ReactNode } from "react";

type GoldNoteProps = {
  children: ReactNode;
  className?: string;
};

export function GoldNote({ children, className = "" }: GoldNoteProps) {
  return (
    <div
      className={`border-l border-brand-gold bg-surface px-5 py-4 text-sm leading-6 text-slate-700 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
