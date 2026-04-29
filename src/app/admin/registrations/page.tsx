import type { Metadata } from "next";
import Link from "next/link";
import { RegistrationSummaryCards } from "@/components/admin/registration-summary-cards";
import { RegistrationTable } from "@/components/admin/registration-table";
import { RegistrationWorkflowPanel } from "@/components/admin/registration-workflow-panel";
import { registrationSummary } from "@/data/registration";
import { getAdminAccessDecision } from "@/lib/admin/access";

export const metadata: Metadata = {
  title: "Registrations",
  description:
    "Static admin registration scaffold for Pushkin's School onboarding. Prototype only; not connected to live data.",
};

export default async function AdminRegistrationsPage() {
  const access = await getAdminAccessDecision("admin:registrations");

  return (
    <main className="bg-background">
      <section className="border-b border-border-soft bg-surface py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                Admin registrations
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-brand-blue-strong sm:text-5xl">
                Onboarding review foundation
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                A non-operational shell for second-stage registration after a
                family decides to join. It contains typed sample records and no
                live parent, child, medical, safeguarding, upload, or portal
                functionality.
              </p>
            </div>
            <div className="grid min-w-64 gap-3 border-l-4 border-brand-gold bg-background p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                Shell status
              </p>
              <p className="text-sm leading-6 text-slate-600">
                {registrationSummary.totalRecords} sample records,{" "}
                {registrationSummary.sectionCount} section definitions, and{" "}
                {registrationSummary.consentCategoryCount} consent categories.{" "}
                {access.statusLabel}.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admin"
                  className="text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                >
                  Admin overview
                </Link>
                <Link
                  href="/register/sample-token"
                  className="text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                >
                  Public shell
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:px-8">
          <RegistrationSummaryCards />
          <RegistrationTable />
          <RegistrationWorkflowPanel />
        </div>
      </section>
    </main>
  );
}
