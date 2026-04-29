import Link from "next/link";
import { primaryNavigation } from "@/data/navigation";
import { BrandMark } from "./brand-mark";
import { ButtonLink } from "./button-link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border-soft bg-background/92 shadow-[0_1px_0_rgba(255,255,255,0.75)_inset] backdrop-blur-xl">
      <div className="mx-auto hidden max-w-7xl items-center justify-between gap-6 border-b border-border-soft/70 px-6 py-2 text-xs font-medium text-slate-600 lg:flex lg:px-8">
        <span>Current in-person route: Bracknell</span>
        <span>Online and register-interest routes remain open across the network</span>
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
              className="rounded-md px-3 py-2 transition hover:bg-white/65 hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/contact#enquiry-form" className="px-4 py-2">
            Enquire
          </ButtonLink>
        </nav>

        <details className="group relative shrink-0 lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-center rounded-md border border-brand-blue/20 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30">
            Menu
          </summary>
          <nav
            aria-label="Main navigation mobile"
            className="premium-panel absolute right-0 top-12 w-[min(20rem,calc(100vw-3rem))] rounded-lg border border-border-soft bg-surface p-3 shadow-xl"
          >
            <div className="grid gap-1">
              {primaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-3 text-sm font-semibold text-brand-blue-strong hover:bg-surface-muted hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
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
