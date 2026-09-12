"use client";

import { useSyncExternalStore } from "react";

const breakpoints = [
  { min: 1536, label: "2xl · 1536px+" },
  { min: 1280, label: "xl · 1280–1535px" },
  { min: 1100, label: "Compact desktop · 1100–1279px" },
  { min: 1024, label: "lg · 1024–1099px" },
  { min: 768, label: "md · 768–1023px" },
  { min: 640, label: "sm · 640–767px" },
  { min: 0, label: "Base · below 640px" },
] as const;

function subscribe(onResize: () => void) {
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}

function getWidth() {
  // innerWidth includes the scrollbar, matching viewport media queries.
  return window.innerWidth;
}

function getServerWidth() {
  return 0;
}

export function DevBreakpointStrip() {
  const width = useSyncExternalStore(subscribe, getWidth, getServerWidth);
  const breakpoint = breakpoints.find(({ min }) => width >= min);
  const headerMode = width >= 1280
    ? "Full navigation"
    : width >= 1100
      ? "Compact navigation"
      : "Menu navigation";

  return (
    <div
      aria-hidden="true"
      className="border-b border-border-soft bg-surface-blue py-1.5 font-mono text-xs leading-5 text-brand-blue-strong print:hidden"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-0 px-6 lg:px-8">
        <span className="font-semibold">DEV</span>
        <span className="tabular-nums">{width ? `${width}px viewport` : "Measuring viewport…"}</span>
        {width > 0 ? <>
          <span>{breakpoint?.label}</span>
          <span>{headerMode}</span>
        </> : null}
      </div>
    </div>
  );
}
