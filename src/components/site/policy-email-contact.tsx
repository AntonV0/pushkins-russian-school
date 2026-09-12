"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contactDetails } from "@/data/public/contact";

export function PolicyEmailContact() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copyEmail = async () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);

    try {
      await navigator.clipboard.writeText(contactDetails.email);
      setStatus("copied");
      resetTimer.current = setTimeout(() => setStatus("idle"), 4_000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={`mailto:${contactDetails.email}`}
          className="inline-flex min-h-11 items-center rounded-sm break-all text-sm font-medium leading-6 text-brand-blue-strong underline decoration-brand-blue/30 underline-offset-4 transition-colors hover:decoration-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/25"
        >
          {contactDetails.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex min-h-11 w-32 shrink-0 items-center justify-center gap-2 rounded-md border border-brand-blue/25 bg-surface px-3 py-2 text-sm font-semibold text-brand-blue-strong transition-colors hover:border-brand-blue hover:bg-surface-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/25"
        >
          {status === "copied" ? (
            <Check aria-hidden="true" className="size-4" />
          ) : (
            <Copy aria-hidden="true" className="size-4" />
          )}
          {status === "copied" ? "Copied" : "Copy email"}
        </button>
      </div>
      <p
        role="status"
        className={status === "error" ? "mt-2 text-sm leading-6 text-slate-600" : "sr-only"}
      >
        {status === "copied"
          ? "School email address copied."
          : status === "error"
            ? "Unable to copy automatically. Select the email address above and copy it manually."
            : ""}
      </p>
    </div>
  );
}
