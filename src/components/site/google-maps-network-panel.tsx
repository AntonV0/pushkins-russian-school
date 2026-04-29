import type { School } from "@/data/schools";
import { StatusBadge } from "./status-badge";

type GoogleMapsNetworkPanelProps = {
  schools: School[];
};

function getMapQuery(school: School) {
  try {
    const url = new URL(school.mapHref);

    return (
      url.searchParams.get("query") ??
      `${school.area} ${school.county} Russian school`
    );
  } catch {
    return `${school.area} ${school.county} Russian school`;
  }
}

function getMapEmbedHref(school: School) {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    getMapQuery(school),
  )}&output=embed`;
}

export function GoogleMapsNetworkPanel({
  schools,
}: GoogleMapsNetworkPanelProps) {
  const currentSchool =
    schools.find((school) => school.status === "open") ?? schools[0];
  const networkAreas = [
    ...schools.filter((school) => school.status === "open"),
    ...schools.filter((school) => school.status !== "open"),
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-border-soft bg-surface shadow-sm">
      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <div className="min-h-[24rem] bg-surface-muted">
          <iframe
            title={`Google Maps view for ${currentSchool.name}`}
            src={getMapEmbedHref(currentSchool)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[24rem] w-full border-0"
          />
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
            Google Maps view
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
            Current hub and wider network areas
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Bracknell is the current listed weekend school. Other locations stay
            visible as online-only network areas where families can register
            interest for future local classes.
          </p>
          <div className="mt-6 grid gap-3">
            {networkAreas.map((school) => (
              <a
                key={school.slug}
                href={school.mapHref}
                target="_blank"
                rel="noreferrer"
                className="grid gap-3 rounded-lg border border-border-soft bg-background p-4 transition hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <span>
                  <span className="block font-semibold text-brand-blue-strong">
                    {school.name}
                  </span>
                  <span className="mt-1 block text-sm text-slate-600">
                    {school.area}, {school.county}
                  </span>
                </span>
                <StatusBadge
                  status={school.status}
                  label={school.statusLabel}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
