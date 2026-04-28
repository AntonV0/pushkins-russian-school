import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="border-b border-brand-red/20 bg-brand-blue-strong text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 text-sm lg:px-8">
          <p className="font-semibold">Admin prototype: static shell only</p>
          <nav aria-label="Admin navigation" className="flex gap-4">
            <Link
              href="/admin"
              className="text-blue-50 underline decoration-brand-gold/60 underline-offset-4 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Overview
            </Link>
            <Link
              href="/admin/invoices"
              className="text-blue-50 underline decoration-brand-gold/60 underline-offset-4 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Invoices
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </>
  );
}
