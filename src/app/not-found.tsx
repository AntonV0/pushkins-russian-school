import Link from "next/link";
import { ArrowRight, MapPin, MessageSquareText } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
          Page not found
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
          This page is not available
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          The new site structure is being rebuilt around clear school, policy,
          gallery, and enquiry routes. The page you followed may be from the old
          website.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/schools"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
          >
            <MapPin aria-hidden="true" className="size-4" />
            <span>View schools</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-blue/20 px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
          >
            <MessageSquareText aria-hidden="true" className="size-4" />
            <span>Contact us</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
