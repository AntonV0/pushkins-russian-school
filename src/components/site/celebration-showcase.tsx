"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import styles from "./celebration-showcase.module.css";

export type CelebrationSlide = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  objectPosition?: string;
};

type CelebrationShowcaseProps = {
  slides: readonly CelebrationSlide[];
};

export function CelebrationShowcase({ slides }: CelebrationShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isInViewport, setIsInViewport] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { rootMargin: "-20% 0px -20% 0px" },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsPlaying(false);
      }
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const updatePageVisibility = () => setIsPageVisible(!document.hidden);

    updatePageVisibility();
    document.addEventListener("visibilitychange", updatePageVisibility);

    return () =>
      document.removeEventListener("visibilitychange", updatePageVisibility);
  }, []);

  useEffect(() => {
    if (
      slides.length < 2 ||
      !isPlaying ||
      !isInViewport ||
      isHovered ||
      isFocusWithin ||
      !isPageVisible ||
      prefersReducedMotion
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [
    isFocusWithin,
    isHovered,
    isInViewport,
    isPageVisible,
    isPlaying,
    prefersReducedMotion,
    slides.length,
  ]);

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = slides[activeIndex] ?? slides[0];
  const mountedSlideIndexes = new Set([
    activeIndex,
    (activeIndex - 1 + slides.length) % slides.length,
    (activeIndex + 1) % slides.length,
  ]);
  const showPrevious = () =>
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () =>
    setActiveIndex((current) => (current + 1) % slides.length);

  const introduction = (
    <h2
      id={titleId}
      className={`${styles.title} max-w-2xl text-balance font-semibold tracking-tight text-white`}
    >
      Language through creative work, performance and celebration
    </h2>
  );

  const supportingCopy = (
    <p className="max-w-md text-base leading-7 text-white/72">
      Children use Russian with classmates while making art and crafts,
      rehearsing and performing during end-of-term celebrations.
    </p>
  );

  const galleryAction = (
    <Link
      href="/gallery"
      className="group inline-flex min-h-11 w-fit items-center gap-2 py-2 text-base font-semibold text-white underline decoration-brand-red underline-offset-4 transition hover:-translate-y-0.5 hover:text-white hover:decoration-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-brand-blue-strong"
    >
      <span>Explore our gallery</span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );

  const carousel = (
    <div
      ref={carouselRef}
      className="min-w-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="School celebrations and creative work"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!carouselRef.current?.contains(event.relatedTarget as Node | null)) {
          setIsFocusWithin(false);
        }
      }}
    >
      <figure className="relative overflow-hidden rounded-lg border border-white/15 bg-[#0f3158] shadow-[var(--elevation-dark-media)]">
        <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[2/1] xl:aspect-[8/3]">
            {slides.map((slide, index) => {
              if (!mountedSlideIndexes.has(index)) {
                return null;
              }

              const isActive = index === activeIndex;

              return (
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={isActive ? slide.alt : ""}
                  fill
                  sizes="(min-width: 1280px) 1216px, (min-width: 1024px) calc(100vw - 64px), (min-width: 720px) 672px, calc(100vw - 48px)"
                  quality={88}
                  className={`object-cover ${
                    prefersReducedMotion
                      ? "transition-none"
                      : "transition-opacity duration-700 ease-out"
                  } ${isActive ? "opacity-100" : "opacity-0"}`}
                  style={{ objectPosition: slide.objectPosition ?? "center" }}
                  aria-hidden={!isActive}
                />
              );
            })}

            <div
              aria-hidden="true"
              className="hidden sm:block pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#071d36]/95 via-[#071d36]/50 to-transparent"
            />
        </div>
        <figcaption>
            <div
              className="hidden sm:absolute sm:inset-x-0 sm:bottom-0 sm:flex items-end justify-between gap-5 px-6 pb-6 pt-14"
              aria-live={isPlaying ? "off" : "polite"}
            >
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#b8d4e5]">
                  {activeSlide.label}
                </p>
                <p className="mt-1 max-w-lg text-sm font-medium leading-6 text-white sm:text-base">
                  {activeSlide.caption}
                </p>
              </div>
              <p className="shrink-0 font-mono text-xs text-white/65">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </p>
            </div>
        <div className={styles.mobileCaption} aria-live={isPlaying ? "off" : "polite"}>
          {slides.map((slide, index) => (
            <div key={slide.src} className={styles.captionSlide} style={{ visibility: index === activeIndex ? "visible" : "hidden" }} aria-hidden={index !== activeIndex}>
              <div className={styles.captionHeading}>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#b8d4e5]">{slide.label}</p>
                <p className="shrink-0 font-mono text-xs text-white/65">{String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</p>
              </div>
              <p className="mt-2 text-sm font-medium leading-6 text-white">{slide.caption}</p>
            </div>
          ))}
        </div>
        </figcaption>
      </figure>

      <div className={styles.controls}>
            <div className={styles.mobileAction}>
              {galleryAction}
            </div>

            <div
              className={styles.indicators}
              role="group"
              aria-label="Choose a slide"
            >
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={slide.src}
                    type="button"
                    aria-label={`Show ${slide.label.toLowerCase()}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setActiveIndex(index)}
                    className="group/indicator inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue-strong"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out motion-reduce:transition-none ${
                        isActive
                          ? "w-7 bg-white/90 sm:w-9"
                          : "w-4 bg-white/35 group-hover/indicator:w-7 group-hover/indicator:bg-white/65 group-focus-visible/indicator:w-7 group-focus-visible/indicator:bg-white/65 sm:w-5"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className={styles.desktopAction}>
              {galleryAction}
            </div>

            <div className={styles.arrows}>
              <button
                type="button"
                onClick={showPrevious}
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue-strong"
                aria-label="Show previous image"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying((current) => !current)}
                disabled={prefersReducedMotion}
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue-strong disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-white/30 disabled:hover:bg-white/10"
                aria-label={
                  prefersReducedMotion
                    ? "Automatic slideshow is disabled by reduced-motion settings"
                    : isPlaying
                      ? "Pause automatic slideshow"
                      : "Play automatic slideshow"
                }
              >
                {isPlaying && !prefersReducedMotion ? (
                  <Pause
                    aria-hidden="true"
                    className="size-[1.125rem]"
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                ) : (
                  <Play
                    aria-hidden="true"
                    className="size-[1.125rem]"
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                )}
              </button>
              <button
                type="button"
                onClick={showNext}
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue-strong"
                aria-label="Show next image"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
          </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="border-y border-white/10 bg-brand-blue-strong py-12 text-white lg:py-14"
      aria-labelledby={titleId}
    >
      <div className="home-content-container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-5 min-[1180px]:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)] min-[1180px]:items-end min-[1180px]:gap-0 min-[1180px]:pr-20">
          <div className="min-[1180px]:pr-10">{introduction}</div>
          <div className="min-[1180px]:border-l min-[1180px]:border-white/20 min-[1180px]:pl-10">
            {supportingCopy}
          </div>
        </div>
        <div className="mt-6">{carousel}</div>
      </div>
    </section>
  );
}
