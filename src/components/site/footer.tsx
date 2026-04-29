import Link from "next/link";
import { contactDetails, paymentDetails } from "@/data/contact";
import { footerNavigation } from "@/data/navigation";
import { schools } from "@/data/schools";
import { BrandMark } from "./brand-mark";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-blue-strong text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <BrandMark className="[&_*]:text-white" />
          <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
            A parent-facing Russian language school network with weekend
            classes, exam preparation, culture, and community across local
            branches.
          </p>
          <a
            href={`mailto:${contactDetails.email}`}
            className="mt-5 inline-flex max-w-full break-all text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            {contactDetails.email}
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
            Schools
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {schools.map((school) => (
              <li key={school.slug}>
                <Link
                  href={`/schools/${school.slug}`}
                  className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  {school.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
            Site
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {footerNavigation.map((item) => (
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
          <p className="mt-5 text-xs leading-5 text-white/55">
            {paymentDetails.bankDetailsStatus}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs leading-5 text-white/55 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>Public rebuild content is reviewed before sensitive details are published.</p>
          <p>© {new Date().getFullYear()} Pushkin&apos;s School</p>
        </div>
      </div>
    </footer>
  );
}
