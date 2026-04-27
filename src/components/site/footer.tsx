import Link from "next/link";
import { contactDetails, paymentDetails } from "@/data/contact";
import { primaryNavigation } from "@/data/navigation";
import { schools } from "@/data/schools";

export function Footer() {
  return (
    <footer className="border-t border-border-soft bg-brand-blue-strong text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold">{contactDetails.schoolName}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
            A parent-facing Russian language school network with weekend
            classes, exam preparation, culture, and community across local
            branches.
          </p>
          <a
            href={`mailto:${contactDetails.email}`}
            className="mt-5 inline-flex text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
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
                <Link href={`/schools/${school.slug}`} className="hover:text-white">
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
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
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
    </footer>
  );
}
