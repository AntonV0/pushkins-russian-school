"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";

type PolicyContentsSection = {
  id: string;
  title: string;
};

type PolicyContentsNavProps = {
  sections: PolicyContentsSection[];
};

function contentsLinkClassName(isActive: boolean, mobile = false) {
  const inactiveSurface = mobile ? "hover:bg-background" : "hover:bg-surface";

  return [
    "block min-h-10 rounded-md border-l-2 px-3 py-2 font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/25",
    isActive
      ? "border-l-brand-blue bg-surface text-brand-blue-strong ring-1 ring-inset ring-border-soft"
      : `border-l-transparent text-slate-600 ${inactiveSurface} hover:text-brand-blue-strong`,
  ].join(" ");
}

export function PolicyContentsNav({ sections }: PolicyContentsNavProps) {
  const sectionIds = useMemo(
    () => sections.map((section) => section.id),
    [sections],
  );
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const desktopList = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = desktopList.current;
    const activeLink = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !activeLink || list.clientHeight === 0) return;

    // Move only the contents list, never the document, as the reader scrolls.
    const listBounds = list.getBoundingClientRect();
    const linkBounds = activeLink.getBoundingClientRect();
    if (linkBounds.top < listBounds.top + 4) {
      list.scrollTop += linkBounds.top - listBounds.top - 4;
    } else if (linkBounds.bottom > listBounds.bottom - 4) {
      list.scrollTop += linkBounds.bottom - listBounds.bottom + 4;
    }
  }, [activeId]);

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    let animationFrame = 0;

    const updateActiveSection = () => {
      const headerHeight =
        document.querySelector<HTMLElement>("body > header")?.getBoundingClientRect()
          .height ?? 0;
      const readingLine = headerHeight + 72;
      let nextActiveId = sectionIds[0];

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);

        if (!section || section.getBoundingClientRect().top > readingLine) {
          break;
        }

        nextActiveId = sectionId;
      }

      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      ) {
        nextActiveId = sectionIds.at(-1) ?? nextActiveId;
      }

      setActiveId((currentActiveId) =>
        currentActiveId === nextActiveId ? currentActiveId : nextActiveId,
      );
    };

    const queueUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, [sectionIds]);

  const activeTitle =
    sections.find((section) => section.id === activeId)?.title ??
    sections[0]?.title ??
    "Sections";

  const handleSectionLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    setActiveId(sectionId);

    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const nextHash = `#${sectionId}`;

    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const shouldMoveFocus = event.detail === 0;
    const heading = target.querySelector<HTMLElement>("h2");

    if (shouldMoveFocus && !reduceMotion && heading) {
      let focusFallback = 0;

      const focusHeading = () => {
        window.clearTimeout(focusFallback);
        window.removeEventListener("scrollend", focusHeading);
        heading.focus({ preventScroll: true });
      };

      window.addEventListener("scrollend", focusHeading, { once: true });
      focusFallback = window.setTimeout(focusHeading, 1_200);
    }

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });

    if (shouldMoveFocus && reduceMotion) {
      heading?.focus({ preventScroll: true });
    }
  };

  return (
    <>
      <details className="group border-y border-border-soft bg-surface lg:hidden">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 marker:hidden focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-red/25 [&::-webkit-details-marker]:hidden">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue-strong">
            On this page
          </span>
          <span
            className="min-w-0 truncate text-right text-sm font-medium text-slate-600 group-open:hidden"
            title={activeTitle}
          >
            {activeTitle}
          </span>
          <span className="hidden text-sm font-medium text-slate-600 group-open:inline">
            Close
          </span>
        </summary>
        <nav
          aria-label="Policy contents mobile"
          className="border-t border-border-soft px-4 py-4"
        >
          <ol className="space-y-1 text-sm leading-5">
            {sections.map((section) => {
              const isActive = section.id === activeId;

              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={contentsLinkClassName(isActive, true)}
                    onClick={(event) =>
                      handleSectionLinkClick(event, section.id)
                    }
                  >
                    {section.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </details>

      <aside className="hidden lg:sticky lg:top-28 lg:flex lg:max-h-[calc(100dvh-8rem)] lg:flex-col">
        <nav aria-label="Policy contents" className="flex min-h-0 flex-col border-y border-border-soft py-5">
          <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue-strong">
            On this page
          </h2>
          <ol ref={desktopList} className="-mx-1 mt-4 min-h-0 space-y-1 overflow-y-auto overscroll-contain px-1 py-1 text-sm leading-5 [scrollbar-width:thin]">
            {sections.map((section) => {
              const isActive = section.id === activeId;

              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={contentsLinkClassName(isActive)}
                    onClick={(event) =>
                      handleSectionLinkClick(event, section.id)
                    }
                  >
                    {section.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
        <Link
          href="/policies"
          className="mt-5 inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-brand-blue-strong underline decoration-brand-blue/30 underline-offset-4 hover:decoration-brand-blue"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All policies
        </Link>
      </aside>
    </>
  );
}
