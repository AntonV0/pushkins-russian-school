import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Workspace",
  description:
    "Protected admin workspace shell for future Pushkin's School operations.",
};

export default function AdminPage() {
  return (
    <main className="bg-background">
      <section className="border-b border-border-soft bg-brand-blue-strong py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Admin shell
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold sm:text-5xl">
            Internal tools are planned, not live
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">
            This area is intentionally non-operational until authentication,
            roles, storage, audit logging, and payment provider decisions are
            complete.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/admin/invoices"
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              View invoice foundation
            </Link>
            <Link
              href="/"
              className="inline-flex rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Return to public site
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3 lg:px-8">
          {[
            "No real parent, student, or invoice data is stored in this shell.",
            "No bank details, payment credentials, or provider API calls are included.",
            "Do not treat this route as secure until real auth is implemented.",
          ].map((note) => (
            <div
              key={note}
              className="border-l border-brand-gold bg-surface px-5 py-4 text-sm leading-6 text-slate-700 shadow-sm"
            >
              {note}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
