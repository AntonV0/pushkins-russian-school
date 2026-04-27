import Link from "next/link";
import { primaryNavigation } from "@/data/navigation";
import { BrandMark } from "./brand-mark";
import { ButtonLink } from "./button-link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border-soft bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="group">
          <BrandMark />
        </Link>

        <nav
          aria-label="Main navigation desktop"
          className="hidden items-center gap-x-5 gap-y-3 text-sm font-medium text-slate-700 lg:flex"
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
          <ButtonLink href="/contact#enquiry-form" className="px-4 py-2">
            Enquire
          </ButtonLink>
        </nav>

        <details className="group relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-center rounded-full border border-brand-blue/20 px-4 py-2 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30">
            Menu
          </summary>
          <nav
            aria-label="Main navigation mobile"
            className="absolute right-0 top-12 w-[min(20rem,calc(100vw-3rem))] rounded-lg border border-border-soft bg-surface p-3 shadow-xl"
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
