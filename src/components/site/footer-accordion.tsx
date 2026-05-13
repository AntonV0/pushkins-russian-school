"use client";

import Link from "next/link";
import { ChevronDown, Compass, MapPin } from "lucide-react";
import { useId, useState } from "react";

type FooterAccordionItem = {
  label: string;
  href: string;
};

type FooterAccordionProps = {
  title: string;
  items: FooterAccordionItem[];
};

export function FooterAccordion({ title, items }: FooterAccordionProps) {
  const contentId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const TitleIcon = title.toLowerCase().includes("school") ? MapPin : Compass;

  return (
    <div className="border-b border-white/10 py-4">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-sm font-semibold uppercase tracking-[0.16em] text-white/65 focus:outline-none focus:ring-2 focus:ring-white/40"
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
        <ul id={contentId} className="mt-3 space-y-2 text-sm text-white/80">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
