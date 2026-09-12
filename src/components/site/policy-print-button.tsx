"use client";

import { Printer } from "lucide-react";

export function PolicyPrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-md border border-border-soft bg-background px-5 py-2.5 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-blue hover:bg-surface-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/25"
    >
      <Printer aria-hidden="true" className="size-4" />
      Print or save as PDF
    </button>
  );
}
