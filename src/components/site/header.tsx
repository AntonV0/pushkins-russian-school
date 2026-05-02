"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/data/navigation";
import { BrandMark } from "./brand-mark";
import { ButtonLink } from "./button-link";

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-20 border-b border-border-soft bg-background/92 shadow-[0_1px_0_rgba(255,255,255,0.75)_inset] backdrop-blur-xl">
      <div className="mx-auto hidden max-w-7xl items-center justify-between gap-6 border-b border-border-soft/70 px-6 py-2 text-xs font-medium text-slate-600 lg:flex lg:px-8">
        <span>Weekend Russian classes for children aged 3-18</span>
        <span>Enquire about current places or future local classes</span>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5 lg:px-8">
        <Link href="/" className="group min-w-0">
          <span className="hidden sm:inline">
            <BrandMark className="min-w-0" />
          </span>
          <span className="sm:hidden">
            <BrandMark compact />
          </span>
        </Link>

        <nav
          aria-label="Main navigation desktop"
          className="hidden items-center gap-x-1 gap-y-3 text-sm font-semibold text-slate-700 lg:flex"
        >
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-md px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-brand-red/30 ${
                isActive(item.href)
                  ? "bg-surface-muted text-brand-red shadow-[0_1px_0_rgba(255,255,255,0.75)_inset]"
                  : "hover:bg-white/65 hover:text-brand-red"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/contact#enquiry-form" className="px-4 py-2">
            Enquire
          </ButtonLink>
        </nav>

        <details className="group relative shrink-0 lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-center gap-2 rounded-md border border-brand-blue/20 bg-white/75 px-3 py-2 text-sm font-semibold text-brand-blue-strong shadow-[0_1px_0_rgba(255,255,255,0.75)_inset] transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30">
            <span aria-hidden="true" className="grid h-4 w-4 content-center gap-1">
              <span className="h-0.5 rounded-full bg-current transition group-open:translate-y-1.5 group-open:rotate-45" />
              <span className="h-0.5 rounded-full bg-current transition group-open:opacity-0" />
              <span className="h-0.5 rounded-full bg-current transition group-open:-translate-y-1.5 group-open:-rotate-45" />
            </span>
            <span>Menu</span>
          </summary>
          <nav
            aria-label="Main navigation mobile"
            className="premium-panel absolute right-0 top-12 w-[min(21rem,calc(100vw-3rem))] rounded-lg border border-border-soft bg-surface p-3 shadow-xl"
          >
            <div className="grid gap-1">
              {primaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-md px-3 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-red/30 ${
                    isActive(item.href)
                      ? "bg-surface-muted text-brand-red"
                      : "text-brand-blue-strong hover:bg-surface-muted hover:text-brand-red"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <ButtonLink href="/contact#enquiry-form" className="mt-2">
                Enquire
              </ButtonLink>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
