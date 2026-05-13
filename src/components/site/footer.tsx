import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Compass, ExternalLink, Mail, MapPin } from "lucide-react";
import { contactDetails } from "@/data/contact";
import { footerNavigation } from "@/data/navigation";
import { schools } from "@/data/schools";
import { siteSocialLinks } from "@/data/site";
import { BrandMark } from "./brand-mark";
import { FooterAccordion } from "./footer-accordion";

type FooterLink = {
  label: string;
  href: string;
};

const schoolLinks: FooterLink[] = schools.map((school) => ({
  label: school.name,
  href: `/schools/${school.slug}`,
}));

function FooterLinkList({
  items,
  className = "",
}: {
  items: FooterLink[];
  className?: string;
}) {
  return (
    <ul
      className={`mt-3 space-y-2 text-sm text-white/80 ${className}`}
    >
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
  );
}

function FooterLinkSection({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: FooterLink[];
  icon: LucideIcon;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 border-b border-white/10 pb-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
        <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.9} />
        <span>{title}</span>
      </p>
      <FooterLinkList
        items={items}
        className="md:[&>li]:break-words"
      />
    </div>
  );
}

function FacebookPageLink() {
  const facebookLink = siteSocialLinks.find((link) => link.label === "Facebook");

  if (!facebookLink) {
    return null;
  }

  return (
    <a
      href={facebookLink.href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 hidden max-w-md items-center gap-3 rounded-md border border-white/12 bg-white/[0.04] px-3.5 py-3 text-left transition hover:border-white/22 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/40 md:flex"
      aria-label="Open Pushkin's School Facebook page in a new tab"
    >
      <span
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded bg-white text-lg font-bold text-brand-blue-strong"
      >
        f
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
          <span>Follow Pushkin&apos;s School on Facebook</span>
          <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" />
        </span>
        <span className="mt-0.5 block text-xs leading-5 text-white/62">
          {facebookLink.description}
        </span>
      </span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-blue-strong text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-11 sm:gap-9 sm:py-12 md:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] md:gap-8 md:py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-10 lg:px-8">
        <div>
          <BrandMark className="[&_*]:text-white" />
          <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
            Weekend supplementary Russian language and literature classes for
            children, with culture, exam preparation, and local school
            communities across England.
          </p>
          <a
            href={`mailto:${contactDetails.email}`}
            className="mt-5 inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <Mail aria-hidden="true" className="size-4 shrink-0" />
            {contactDetails.email}
          </a>
          <FacebookPageLink />
        </div>

        <div className="md:hidden">
          <FooterAccordion title="School locations" items={schoolLinks} />
          <FooterAccordion title="Site" items={footerNavigation} />
        </div>

        <div className="hidden md:grid md:grid-cols-[minmax(12rem,1fr)_minmax(6.75rem,0.58fr)] md:gap-5 lg:contents">
          <FooterLinkSection title="School locations" items={schoolLinks} icon={MapPin} />
          <FooterLinkSection title="Site" items={footerNavigation} icon={Compass} />
        </div>
      </div>
      <div className="border-t border-white/18 bg-black/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs leading-5 text-white/55 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>Weekend Russian language, literature, and culture classes for children aged 3-18.</p>
          <p>&copy; {new Date().getFullYear()} Pushkin&apos;s School</p>
        </div>
      </div>
    </footer>
  );
}
