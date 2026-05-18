import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminShellStatusCard } from "@/components/admin/admin-shell-status-card";
import { RegistrationSummaryCards } from "@/components/admin/registration-summary-cards";
import { RegistrationTable } from "@/components/admin/registration-table";
import { RegistrationWorkflowPanel } from "@/components/admin/registration-workflow-panel";
import { registrationSummary } from "@/features/admin/data/registration";
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
      <AdminPageHeader
        eyebrow="Admin registrations"
        title="Onboarding review foundation"
        status={
          <AdminShellStatusCard
            links={[
              { href: "/admin", label: "Admin overview" },
              { href: "/register/sample-token", label: "Public shell" },
            ]}
          >
            {registrationSummary.totalRecords} sample records,{" "}
            {registrationSummary.sectionCount} section definitions, and{" "}
            {registrationSummary.consentCategoryCount} consent categories.{" "}
            {access.statusLabel}.
          </AdminShellStatusCard>
        }
      >
        A non-operational shell for second-stage registration after a family
        decides to join. It contains typed sample records and no live parent,
        child, medical, safeguarding, upload, or portal functionality.
      </AdminPageHeader>

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
