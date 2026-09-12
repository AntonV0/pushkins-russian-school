import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Compass, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { contactDetails } from "@/data/public/contact";
import { footerNavigation, legalNavigation } from "@/data/public/navigation";
import { schoolStory } from "@/data/public/school-story";
import { schools } from "@/data/public/schools";
import { siteConfig, siteSocialLinks } from "@/data/public/site";
import { BrandMark } from "./brand-mark";
import { FooterAccordion } from "./footer-accordion";
import styles from "./footer.module.css";

type FooterLink = {
  label: string;
  href: string;
  isCurrent?: boolean;
};

type FooterLinkGroup = {
  title: string;
  items: FooterLink[];
};

const currentSchoolLinks: FooterLink[] = schools
  .filter((school) => school.status === "open")
  .map((school) => ({
    label: school.name,
    href: `/schools/${school.slug}`,
    isCurrent: true,
  }));

const otherSchoolLinks: FooterLink[] = schools
  .filter((school) => school.status !== "open")
  .map((school) => ({
    label: school.name,
    href: `/schools/${school.slug}`,
  }));

const schoolLinkGroups: FooterLinkGroup[] = [
  { title: "Current in-person schools", items: currentSchoolLinks },
  { title: "Other locations", items: otherSchoolLinks },
];

function FooterLinkList({
  items,
  className = "",
}: {
  items: FooterLink[];
  className?: string;
}) {
  return (
    <ul className={`space-y-2 text-sm text-white/80 ${className}`}>
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
    <nav aria-label={`${title} footer navigation`}>
      <p className="flex items-center gap-2 border-b border-white/10 pb-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
        <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.9} />
        <span>{title}</span>
      </p>
      <FooterLinkList
        items={items}
        className="mt-3 md:[&>li]:break-words"
      />
    </nav>
  );
}

function FooterSchoolLinksSection() {
  return (
    <nav aria-label="School locations footer navigation">
      <p className="flex items-center gap-2 border-b border-white/10 pb-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
        <MapPin aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.9} />
        <span>School locations</span>
      </p>
      <div className="mt-3 space-y-4">
        {schoolLinkGroups.map((group) => (
          <div key={group.title}>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/55">
              {group.title}
            </p>
            <FooterLinkList items={group.items} className="mt-2" />
          </div>
        ))}
      </div>
    </nav>
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
      className="mt-4 flex w-fit items-center gap-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white focus:outline-none focus:ring-2 focus:ring-white/40"
      aria-label="Open Pushkin's School Facebook page in a new tab"
    >
      <span
        aria-hidden="true"
        className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-white text-sm font-bold text-brand-blue-strong"
      >
        f
      </span>
      <span>Follow us on Facebook</span>
      <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-blue-strong text-white">
      <div className="mx-auto grid grid-cols-1 max-w-7xl gap-8 px-6 py-11 sm:gap-9 sm:py-12 md:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] md:gap-8 md:py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-10 lg:px-8">
        <div className="min-w-0">
          <BrandMark className={`${styles.brand} [&_*]:text-white`} />
          <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
            Weekend classes for children aged 3–18, helping them build
            confident spoken and written Russian through language, literature,
            and culture.
          </p>
          <div className="mt-5 flex flex-col items-start gap-2.5">
            <a
              href={`mailto:${contactDetails.email}`}
              className="inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <Mail aria-hidden="true" className="size-4 shrink-0" />
              {contactDetails.email}
            </a>
            <a
              href={`tel:${contactDetails.phone}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <Phone aria-hidden="true" className="size-4 shrink-0" />
              {contactDetails.phoneDisplay}
            </a>
          </div>
          <FacebookPageLink />
        </div>

        <div className="lg:hidden">
          <FooterAccordion title="School locations" groups={schoolLinkGroups} />
          <FooterAccordion title="Site" items={footerNavigation} />
        </div>

        <div className="hidden lg:contents">
          <FooterSchoolLinksSection />
          <FooterLinkSection title="Site" items={footerNavigation} icon={Compass} />
        </div>
      </div>
      <div className="border-t border-white/18 bg-black/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-3 text-xs leading-5 text-white/55 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <nav aria-label="Legal information" className="flex flex-wrap gap-x-4 gap-y-2">
            {legalNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="underline decoration-white/25 underline-offset-4 transition hover:text-white hover:decoration-white focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-balance sm:text-right">
            &copy; {schoolStory.foundedYear}–{new Date().getFullYear()}{" "}
            {siteConfig.fullName}
          </p>
        </div>
      </div>
    </footer>
  );
}
