import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { School } from "@/data/public/schools";
import { StatusBadge } from "./status-badge";

type RelatedSchoolsProps = {
  currentSlug: string;
  schools: School[];
};

export function RelatedSchools({ currentSlug, schools }: RelatedSchoolsProps) {
  const relatedSchools = schools.filter((school) => school.slug !== currentSlug);

  return (
    <section className="border-t border-border-soft bg-background site-section-compact">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Explore more locations
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-blue-strong">
              Other Pushkin&apos;s School branches
            </h2>
          </div>
          <Link
            href="/schools"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40 hover:text-brand-red"
          >
            <span>Compare all schools</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {relatedSchools.map((school) => (
            <article
              key={school.slug}
              className="premium-panel rounded-lg border border-border-soft bg-surface p-5"
            >
              <StatusBadge status={school.status} label={school.statusLabel} />
              <h3 className="mt-4 text-xl font-semibold">
                <Link
                  href={`/schools/${school.slug}`}
                  className="text-brand-blue-strong hover:text-brand-red"
                >
                  {school.name}
                </Link>
              </h3>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                {school.county}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {school.availabilitySummary}
              </p>
              <Link
                href={school.bestNextSteps[0]?.href ?? `/schools/${school.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/35 hover:text-brand-red"
              >
                <span>{school.bestNextSteps[0]?.ctaLabel ?? "View branch"}</span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
