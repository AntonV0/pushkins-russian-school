"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { primaryNavigation, supportNavigation } from "@/data/public/navigation";
import { BrandMark } from "./brand-mark";
import { ButtonLink } from "./button-link";
import styles from "./header.module.css";

export function Header() {
  const pathname = usePathname();
  const homeLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const registerInterestHref = pathname === "/contact" ? "#enquiry-form" : "/contact#enquiry-form";

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const updateScrolled = () => {
      // Separate thresholds prevent toggling as the header changes height.
      setIsScrolled((current) => window.scrollY > (current ? 8 : 40));
    };

    const frame = window.requestAnimationFrame(updateScrolled);
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrolled);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 68.75rem)");
    const closeOnDesktop = () => {
      if (!desktop.matches) return;

      // Keep keyboard focus visible when the mobile controls disappear.
      if (mobileMenuRef.current?.contains(document.activeElement)) {
        homeLinkRef.current?.focus({ preventScroll: true });
      }
      setIsMenuOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
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
    <header data-scrolled={isScrolled} className={`${styles.header} sticky top-0 z-40 border-b border-border-soft/80 bg-background/94 shadow-[0_1px_0_rgba(255,255,255,0.75)_inset] backdrop-blur-xl`}>
      <div className={`${styles.row} site-header-row mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2 sm:gap-4 sm:py-2.5 min-[1100px]:px-8 min-[1100px]:py-1.5`}>
        <Link
          ref={homeLinkRef}
          href="/"
          aria-label="Pushkin's School home"
          className="group min-w-0"
        >
          <span className="hidden min-[1100px]:inline">
            <BrandMark variant="header" className={`${styles.brand} min-w-0`} />
          </span>
          <span className="min-[1100px]:hidden">
            <BrandMark short className={`${styles.tabletBrand} min-w-0`} />
          </span>
        </Link>

        <nav
          aria-label="Main navigation desktop"
          className="hidden items-center gap-x-2 gap-y-3 text-sm font-semibold text-slate-700 min-[1280px]:flex"
        >
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative flex min-h-11 items-center px-2.5 py-2 transition-colors duration-200 after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-brand-red after:transition after:duration-200 focus:outline-none focus-visible:text-brand-red ${
                isActive(item.href)
                  ? "text-brand-blue-strong after:scale-x-100 after:opacity-100"
                  : "hover:text-brand-red after:scale-x-0 after:opacity-0 hover:after:scale-x-100 hover:after:opacity-45 focus-visible:after:scale-x-100 focus-visible:after:opacity-70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav
          aria-label="Main navigation compact desktop"
          className="hidden items-center gap-x-0 gap-y-3 text-[0.82rem] font-semibold text-slate-700 min-[1100px]:flex min-[1280px]:!hidden"
        >
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative flex min-h-10 items-center px-1.5 py-2 transition-colors duration-200 after:absolute after:inset-x-1.5 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-brand-red after:transition after:duration-200 focus:outline-none focus-visible:text-brand-red ${
                isActive(item.href)
                  ? "text-brand-blue-strong after:scale-x-100 after:opacity-100"
                  : "hover:text-brand-red after:scale-x-0 after:opacity-0 hover:after:scale-x-100 hover:after:opacity-45 focus-visible:after:scale-x-100 focus-visible:after:opacity-70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={`${styles.actions} flex shrink-0 items-center gap-3`}>
          <ButtonLink
            href={registerInterestHref}
            variant="header"
            className={`${styles.tabletCta} !min-h-11 !px-3.5 !py-2 text-xs`}
            icon={<ArrowRight className="size-3.5" />}
            iconPosition="end"
          >
            Join Pushkin&apos;s School
          </ButtonLink>
          <div
            ref={mobileMenuRef}
            className={`${styles.menuWrap} relative min-[1100px]:hidden`}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsMenuOpen(false);
              }
            }}
          >
            <button
              ref={mobileMenuButtonRef}
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls={mobileMenuId}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              className={styles.menuTrigger}
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
                className={styles.menuPanel}
              >
                <div className={`${styles.menuIntro} border-b border-border-soft/80 px-1 pb-3`}>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-red">
                    Join Pushkin&apos;s School
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    Share your child&apos;s age, Russian confidence, and preferred route.
                  </p>
                  <ButtonLink
                    href={registerInterestHref}
                    variant="header"
                    className="mt-2.5"
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
                      className={styles.menuLink}
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
                      className={`${styles.menuLink} ${styles.supportLink}`}
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
