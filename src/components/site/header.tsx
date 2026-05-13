"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { primaryNavigation, supportNavigation } from "@/data/navigation";
import { BrandMark } from "./brand-mark";
import { ButtonLink } from "./button-link";

export function Header() {
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const registerInterestHref = pathname === "/contact" ? "#enquiry-form" : "/contact#enquiry-form";

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        mobileMenuRef.current &&
        event.target instanceof Node &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-20 border-b border-border-soft/80 bg-background/94 shadow-[0_1px_0_rgba(255,255,255,0.75)_inset] backdrop-blur-xl">
      <div className="mx-auto hidden max-w-7xl items-center justify-between gap-6 border-b border-border-soft/70 px-6 py-2 text-xs font-medium text-slate-600 min-[1180px]:flex lg:px-8">
        <span>Weekend Russian classes for children aged 3-18</span>
        <span>Tell us your child&apos;s age, level, and preferred location</span>
      </div>
      <div className="site-header-row mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2 sm:gap-4 sm:py-2.5 lg:px-8 lg:py-2.5 min-[1180px]:py-3">
        <Link href="/" className="group min-w-0">
          <span className="hidden lg:inline">
            <BrandMark className="min-w-0" />
          </span>
          <span className="lg:hidden">
            <BrandMark short className="min-w-0" />
          </span>
        </Link>

        <nav
          aria-label="Main navigation desktop"
          className="hidden items-center gap-x-2 gap-y-3 text-sm font-semibold text-slate-700 min-[1180px]:flex"
        >
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative px-2.5 py-2 transition-colors duration-200 after:absolute after:inset-x-2.5 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-brand-red after:transition after:duration-200 focus:outline-none focus-visible:text-brand-red ${
                isActive(item.href)
                  ? "text-brand-blue-strong after:scale-x-100 after:opacity-100"
                  : "hover:text-brand-red after:scale-x-0 after:opacity-0 hover:after:scale-x-100 hover:after:opacity-45 focus-visible:after:scale-x-100 focus-visible:after:opacity-70"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink
            href={registerInterestHref}
            variant="header"
            className="ml-4 !px-3.5 py-2"
            icon={<ArrowRight className="size-4" />}
            iconPosition="end"
          >
            Join Pushkin&apos;s School
          </ButtonLink>
        </nav>

        <nav
          aria-label="Main navigation compact desktop"
          className="hidden items-center gap-x-1 gap-y-3 text-[0.82rem] font-semibold text-slate-700 lg:flex min-[1180px]:!hidden"
        >
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative px-1.5 py-2 transition-colors duration-200 after:absolute after:inset-x-1.5 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-brand-red after:transition after:duration-200 focus:outline-none focus-visible:text-brand-red ${
                isActive(item.href)
                  ? "text-brand-blue-strong after:scale-x-100 after:opacity-100"
                  : "hover:text-brand-red after:scale-x-0 after:opacity-0 hover:after:scale-x-100 hover:after:opacity-45 focus-visible:after:scale-x-100 focus-visible:after:opacity-70"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink
            href={registerInterestHref}
            variant="header"
            className="ml-2 !min-h-10 !px-3 py-2 text-xs"
            icon={<ArrowRight className="size-3.5" />}
            iconPosition="end"
          >
            Join Pushkin&apos;s School
          </ButtonLink>
        </nav>

        <div className="flex shrink-0 items-center gap-3 lg:hidden">
          <ButtonLink
            href={registerInterestHref}
            variant="header"
            className="site-header-tablet-cta !min-h-10 !px-3.5 !py-2 text-xs"
            icon={<ArrowRight className="size-3.5" />}
            iconPosition="end"
          >
            Join Pushkin&apos;s School
          </ButtonLink>
          <div ref={mobileMenuRef} className="relative">
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls={mobileMenuId}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              className={`relative flex min-h-10 cursor-pointer list-none items-center justify-center gap-2 rounded-full border border-border-soft/85 bg-white/92 px-3 py-1.5 text-[0.83rem] font-semibold text-brand-blue-strong shadow-[0_7px_18px_rgba(0,32,72,0.09),0_1px_0_rgba(255,255,255,0.92)_inset] transition duration-200 hover:border-brand-blue/20 hover:bg-white hover:text-brand-red hover:shadow-[0_10px_22px_rgba(0,32,72,0.12),0_1px_0_rgba(255,255,255,0.92)_inset] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/20 ${
                isMenuOpen
                  ? "border-brand-blue/20 bg-white shadow-[0_7px_18px_rgba(0,32,72,0.1),0_1px_0_rgba(255,255,255,0.92)_inset]"
                  : ""
              }`}
            >
              {isMenuOpen ? (
                <X aria-hidden="true" className="size-4" strokeWidth={2.2} />
              ) : (
                <Menu aria-hidden="true" className="size-4" strokeWidth={2.2} />
              )}
              <span>{isMenuOpen ? "Close" : "Menu"}</span>
            </button>
            {isMenuOpen ? (
              <nav
                id={mobileMenuId}
                aria-label="Main navigation mobile"
                className="absolute right-0 top-[3rem] z-30 max-h-[calc(100dvh-5.5rem)] w-[min(24.5rem,calc(100vw-1.5rem))] overflow-y-auto rounded-xl border border-border-soft/90 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbfe_100%)] p-3 shadow-[0_24px_54px_rgba(0,32,72,0.18),0_1px_0_rgba(255,255,255,0.9)_inset]"
              >
                <div className="site-header-menu-intro border-b border-border-soft/80 px-1 pb-3">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-red">
                    Join Pushkin&apos;s School
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    Tell us your child&apos;s age, level, and preferred location.
                  </p>
                  <ButtonLink
                    href={registerInterestHref}
                    variant="header"
                    className="site-header-menu-cta mt-2.5"
                    onClick={() => setIsMenuOpen(false)}
                    icon={<ArrowRight className="size-4" />}
                    iconPosition="end"
                  >
                    Join Pushkin&apos;s School
                  </ButtonLink>
                </div>
                <div className="grid gap-0.5 py-2">
                  {primaryNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className={`relative rounded-md px-3.5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:text-brand-red focus-visible:ring-2 focus-visible:ring-brand-blue/20 before:absolute before:left-1.5 before:top-1/2 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-brand-red before:transition after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-brand-red after:transition ${
                        isActive(item.href)
                          ? "bg-surface-blue/72 pl-4 text-brand-blue-strong before:opacity-100 after:scale-x-100 after:opacity-100"
                          : "text-brand-blue-strong before:opacity-0 after:scale-x-0 after:opacity-0 hover:bg-surface-blue/45 hover:text-brand-red hover:before:opacity-45 hover:after:scale-x-100 hover:after:opacity-35 focus-visible:before:opacity-70 focus-visible:after:scale-x-100 focus-visible:after:opacity-65"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 border-t border-border-soft/80 px-1 pt-2.5">
                  {supportNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className={`rounded-md px-3 py-2.5 text-center text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/20 ${
                        isActive(item.href)
                          ? "bg-surface-blue text-brand-blue-strong shadow-[0_1px_0_rgba(255,255,255,0.72)_inset]"
                          : "text-slate-600 hover:bg-surface-blue/55 hover:text-brand-red"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
