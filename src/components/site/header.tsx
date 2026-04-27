import Link from "next/link";
import { primaryNavigation } from "@/data/navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border-soft bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full border border-brand-blue/20 bg-brand-blue text-sm font-semibold text-white">
            PS
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold text-brand-blue-strong">
              Pushkin&apos;s School
            </span>
            <span className="block text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Russian language network
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-slate-700"
        >
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-red px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-red/30"
          >
            Enquire
          </Link>
        </nav>
      </div>
    </header>
  );
}
