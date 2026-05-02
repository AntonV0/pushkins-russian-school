"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { School, SchoolStatus } from "@/data/schools";
import { StatusBadge } from "./status-badge";

type GoogleMapsNetworkPanelProps = {
  schools: School[];
};

type LocationFilter = "all" | "open" | "interest";

const statusTone: Record<SchoolStatus, string> = {
  open: "border-emerald-200 bg-emerald-50 text-emerald-800",
  closed: "border-zinc-200 bg-zinc-100 text-zinc-700",
  online: "border-sky-200 bg-sky-50 text-sky-800",
  "opening-soon": "border-amber-200 bg-amber-50 text-amber-800",
};

const filters: { label: string; value: LocationFilter }[] = [
  { label: "All", value: "all" },
  { label: "Weekend", value: "open" },
  { label: "Interest", value: "interest" },
];

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

function getAvailabilityCopy(school: School) {
  if (school.status === "open") {
    return {
      label: "Current parent option",
      body: school.availabilitySummary,
    };
  }

  return {
    label: "Register-interest option",
    body: school.availabilitySummary,
  };
}

export function GoogleMapsNetworkPanel({
  schools,
}: GoogleMapsNetworkPanelProps) {
  const orderedSchools = useMemo(
    () => [
      ...schools.filter((school) => school.status === "open"),
      ...schools.filter((school) => school.status !== "open"),
    ],
    [schools],
  );
  const [selectedSlug, setSelectedSlug] = useState(
    orderedSchools[0]?.slug ?? "",
  );
  const [filter, setFilter] = useState<LocationFilter>("all");
  const selectedSchool =
    orderedSchools.find((school) => school.slug === selectedSlug) ??
    orderedSchools[0];
  const filteredSchools = orderedSchools.filter((school) => {
    if (filter === "open") {
      return school.status === "open";
    }

    if (filter === "interest") {
      return school.status !== "open";
    }

    return true;
  });
  const openCount = schools.filter((school) => school.status === "open").length;
  const interestCount = schools.length - openCount;
  const availability = selectedSchool
    ? getAvailabilityCopy(selectedSchool)
    : null;

  if (!selectedSchool) {
    return null;
  }

  return (
    <div className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface">
      <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)]">
        <div className="relative min-h-[28rem] bg-surface-muted lg:min-h-[43rem]">
          <div className="absolute inset-x-0 top-0 z-10 border-b border-white/60 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
                  Location explorer
                </p>
                <h2 className="mt-2 text-2xl font-semibold leading-tight text-brand-blue-strong sm:text-3xl">
                  Pushkin&apos;s School locations
                </h2>
              </div>
              <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-border-soft bg-background text-center text-xs font-semibold text-brand-blue-strong">
                <div className="border-r border-border-soft px-4 py-3">
                  <span className="block text-lg">{openCount}</span>
                  Current
                </div>
                <div className="px-4 py-3">
                  <span className="block text-lg">{interestCount}</span>
                  Interest
                </div>
              </div>
            </div>
          </div>
          <iframe
            title={`Google Maps view for ${selectedSchool.name}`}
            src={getMapEmbedHref(selectedSchool)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[28rem] w-full border-0 lg:min-h-[43rem]"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur sm:inset-x-5 sm:bottom-5 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <StatusBadge
                  status={selectedSchool.status}
                  label={selectedSchool.statusLabel}
                />
                <h3 className="mt-3 text-2xl font-semibold text-brand-blue-strong">
                  {selectedSchool.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selectedSchool.venueName}
                  {selectedSchool.postcode ? `, ${selectedSchool.postcode}` : ""}
                </p>
              </div>
              <a
                href={selectedSchool.mapHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-md border border-brand-blue/20 bg-white px-4 py-2 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              >
                Open map
              </a>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="border-b border-border-soft p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Parent decision view
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Current weekend provision, register-interest areas, timetable
              notes, and enquiry actions are kept in one place so families can
              choose the most useful next step.
            </p>
            <div
              className="mt-5 flex flex-wrap gap-2"
              role="group"
              aria-label="Location filters"
            >
              {filters.map((item) => {
                const isActive = filter === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFilter(item.value)}
                    className={`min-h-10 rounded-md border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-red/30 ${
                      isActive
                        ? "border-brand-blue bg-brand-blue text-white"
                        : "border-border-soft bg-white text-brand-blue-strong hover:border-brand-red hover:text-brand-red"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid max-h-[24rem] gap-3 overflow-y-auto border-b border-border-soft bg-background/65 p-4 sm:p-5 lg:max-h-[21rem]">
            {filteredSchools.map((school) => {
              const isSelected = school.slug === selectedSchool.slug;

              return (
                <button
                  key={school.slug}
                  type="button"
                  onClick={() => setSelectedSlug(school.slug)}
                  className={`grid w-full gap-3 rounded-lg border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-brand-red/30 ${
                    isSelected
                      ? "border-brand-red bg-white shadow-sm"
                      : "border-border-soft bg-white/75 hover:border-brand-gold"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="flex flex-wrap items-start justify-between gap-3">
                    <span>
                      <span className="block text-base font-semibold text-brand-blue-strong">
                        {school.name}
                      </span>
                      <span className="mt-1 block text-sm text-slate-600">
                        {school.area}, {school.county}
                      </span>
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] ${statusTone[school.status]}`}
                    >
                      {school.status === "open" ? "Current" : "Interest"}
                    </span>
                  </span>
                  <span className="block text-sm leading-6 text-slate-600">
                    {school.availabilitySummary}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-5 p-5 sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {availability?.label}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-brand-blue-strong">
                {selectedSchool.name} classes
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {availability?.body}
              </p>
            </div>

            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-lg border border-border-soft bg-background p-4">
                <dt className="font-semibold text-brand-blue-strong">Venue</dt>
                <dd className="mt-1 leading-6 text-slate-600">
                  {selectedSchool.venueName}
                </dd>
              </div>
              <div className="rounded-lg border border-border-soft bg-background p-4">
                <dt className="font-semibold text-brand-blue-strong">Schedule</dt>
                <dd className="mt-1 leading-6 text-slate-600">
                  {selectedSchool.schedule}
                </dd>
              </div>
              <div className="rounded-lg border border-border-soft bg-background p-4 sm:col-span-2">
                <dt className="font-semibold text-brand-blue-strong">
                  Class pathway
                </dt>
                <dd className="mt-1 leading-6 text-slate-600">
                  {selectedSchool.classGroups[0]} through to GCSE and A Level
                  preparation where suitable.
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={selectedSchool.bestNextSteps[0]?.href ?? "/contact#enquiry-form"}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              >
                {selectedSchool.bestNextSteps[0]?.ctaLabel ?? "Start an enquiry"}
              </Link>
              {selectedSchool.status !== "open" && selectedSchool.bestNextSteps[1] ? (
                <Link
                  href={selectedSchool.bestNextSteps[1].href}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-blue/20 bg-white px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                >
                  {selectedSchool.bestNextSteps[1].ctaLabel}
                </Link>
              ) : null}
              <Link
                href={`/schools/${selectedSchool.slug}`}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-blue/20 bg-white px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              >
                Branch details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
