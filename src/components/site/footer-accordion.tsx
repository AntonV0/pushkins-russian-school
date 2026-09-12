"use client";

import Link from "next/link";
import { ChevronDown, Compass, MapPin } from "lucide-react";
import { useId, useState } from "react";

type FooterAccordionItem = {
  label: string;
  href: string;
  isCurrent?: boolean;
};

type FooterAccordionGroup = {
  title: string;
  items: FooterAccordionItem[];
};

type FooterAccordionProps = {
  title: string;
  items?: FooterAccordionItem[];
  groups?: FooterAccordionGroup[];
};

function AccordionLinkList({ items }: { items: FooterAccordionItem[] }) {
  return (
    <ul className="space-y-2 text-sm text-white/80">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="inline-flex items-center gap-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            {item.isCurrent ? (
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full bg-emerald-400"
              />
            ) : null}
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterAccordion({
  title,
  items = [],
  groups,
}: FooterAccordionProps) {
  const contentId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const TitleIcon = title.toLowerCase().includes("school") ? MapPin : Compass;

  return (
    <nav
      aria-label={`${title} footer navigation`}
      className="border-b border-white/10 py-4 md:py-1"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-sm font-semibold uppercase tracking-[0.16em] text-white/65 focus:outline-none focus:ring-2 focus:ring-white/40 md:min-h-11"
      >
        <span className="flex items-center gap-2">
          <TitleIcon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.9} />
          <span>{title}</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 shrink-0 text-white/65 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen ? (
        <div id={contentId} className="mt-4">
          {groups ? (
            <div className="space-y-4">
              {groups.map((group) => (
                <div key={group.title}>
                  <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/45">
                    {group.title}
                  </p>
                  <AccordionLinkList items={group.items} />
                </div>
              ))}
            </div>
          ) : (
            <AccordionLinkList items={items} />
          )}
        </div>
      ) : null}
    </nav>
  );
}
