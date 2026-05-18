"use client";

import Link from "next/link";
import { ArrowRight, Clock, ExternalLink, GraduationCap, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import type { School, SchoolStatus } from "@/data/public/schools";
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
  { label: "All locations", value: "all" },
  { label: "Current weekend", value: "open" },
  { label: "Register interest", value: "interest" },
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
  const filteredSchools = orderedSchools.filter((school) => {
    if (filter === "open") {
      return school.status === "open";
    }

    if (filter === "interest") {
      return school.status !== "open";
    }

    return true;
  });
  const selectedSchool =
    filteredSchools.find((school) => school.slug === selectedSlug) ??
    filteredSchools[0] ??
    orderedSchools[0];
  const openCount = schools.filter((school) => school.status === "open").length;
  const interestCount = schools.length - openCount;
  const availability = selectedSchool
    ? getAvailabilityCopy(selectedSchool)
    : null;

  if (!selectedSchool) {
    return null;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            Parent location guide
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-blue-strong">
            Start with what is available now
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Bracknell is shown first because it is the current in-person
            weekend branch. Other locations stay visible for families who want
            to register demand locally or ask about online learning.
          </p>
        </div>

        <div className="grid gap-3 border-y border-border-soft py-4 sm:grid-cols-2">
          <div>
            <p className="text-2xl font-semibold text-brand-blue-strong">
              {openCount}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Current weekend branch
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-brand-blue-strong">
              {interestCount}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Register-interest or online areas
            </p>
          </div>
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Location filters"
        >
          {filters.map((item) => {
            const isActive = filter === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setFilter(item.value);
                  const nextSchools = orderedSchools.filter((school) => {
                    if (item.value === "open") {
                      return school.status === "open";
                    }

                    if (item.value === "interest") {
                      return school.status !== "open";
                    }

                    return true;
                  });

                  if (
                    nextSchools.length > 0 &&
                    !nextSchools.some((school) => school.slug === selectedSlug)
                  ) {
                    setSelectedSlug(nextSchools[0].slug);
                  }
                }}
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

        <div className="grid max-h-[28rem] gap-2 overflow-y-auto pr-1">
          {filteredSchools.map((school) => {
            const isSelected = school.slug === selectedSchool.slug;

            return (
              <button
                key={school.slug}
                type="button"
                onClick={() => setSelectedSlug(school.slug)}
                className={`w-full border-l-4 px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-brand-red/30 ${
                  isSelected
                    ? "border-brand-red bg-white shadow-sm"
                    : "border-transparent bg-transparent hover:border-brand-gold hover:bg-white/70"
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
                <span className="mt-2 block text-sm leading-6 text-slate-600">
                  {school.availabilitySummary}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface">
        <div className="relative bg-surface-muted">
          <iframe
            title={`Google Maps view for ${selectedSchool.name}`}
            src={getMapEmbedHref(selectedSchool)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-[24rem] w-full border-0 sm:min-h-[30rem]"
          />
        </div>

        <div className="p-5 sm:p-6">
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
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-brand-blue/20 bg-white px-4 py-2 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              <ExternalLink aria-hidden="true" className="size-4" />
              Open map
            </a>
          </div>

          <div className="mt-5 grid gap-4 border-y border-border-soft py-5 text-sm sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                <Clock aria-hidden="true" className="size-4 shrink-0 text-brand-red" />
                Schedule
              </p>
              <p className="mt-1 leading-6 text-slate-600">
                {selectedSchool.schedule}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 font-semibold text-brand-blue-strong">
                <GraduationCap aria-hidden="true" className="size-4 shrink-0 text-brand-red" />
                Class pathway
              </p>
              <p className="mt-1 leading-6 text-slate-600">
                {selectedSchool.classGroups[0]} through exam preparation where
                suitable.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {availability?.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {availability?.body}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={selectedSchool.bestNextSteps[0]?.href ?? "/contact#enquiry-form"}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            >
              {selectedSchool.bestNextSteps[0]?.ctaLabel ?? "Start an enquiry"}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            {selectedSchool.status !== "open" && selectedSchool.bestNextSteps[1] ? (
              <Link
                href={selectedSchool.bestNextSteps[1].href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-brand-blue/20 bg-white px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              >
                {selectedSchool.bestNextSteps[1].ctaLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            ) : null}
            <Link
              href={`/schools/${selectedSchool.slug}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-brand-blue/20 bg-white px-5 py-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              <MapPin aria-hidden="true" className="size-4" />
              Branch details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
