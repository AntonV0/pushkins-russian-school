import Image from "next/image";
import type { MediaAsset } from "@/data/media-assets";

type AssetReadinessPanelProps = {
  title?: string;
  status: string;
  notes: string[];
};

type MediaAssetGridProps = {
  assets: MediaAsset[];
  emptyLabel?: string;
  emptyDescription?: string;
  slotCount?: number;
  variant?: "feature" | "compact";
  reviewLabel?: string;
};

function formatCategoryLabel(category: MediaAsset["category"]) {
  return category
    .split("-")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function formatReviewNumber(index: number) {
  return `${index + 1}`.padStart(2, "0");
}

export function AssetReadinessPanel({
  title = "Publication care",
  status,
  notes,
}: AssetReadinessPanelProps) {
  const headingId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`;

  return (
    <aside
      className="border border-border-soft bg-surface p-6 sm:p-8"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="text-2xl font-semibold text-brand-blue-strong">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{status}</p>
      <ul className="mt-6 space-y-3 text-sm text-slate-700">
        {notes.map((note) => (
          <li key={note} className="border-l border-brand-gold pl-4">
            {note}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function MediaAssetGrid({
  assets,
  emptyLabel = "Selected school moment",
  emptyDescription = "A selected school image can appear here after consent, caption, and accessibility checks.",
  slotCount = 4,
  variant = "feature",
  reviewLabel,
}: MediaAssetGridProps) {
  if (assets.length === 0) {
    return (
      <div
        className="grid gap-4 sm:grid-cols-2"
        aria-label="Public gallery selections"
      >
        {Array.from({ length: slotCount }, (_, index) => (
          <figure
            key={`${emptyLabel}-${index}`}
            className="relative flex aspect-[4/3] items-end overflow-hidden rounded-lg border border-dashed border-border-soft bg-surface-muted p-5"
          >
            <div
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,56,102,0.07)_1px,transparent_1px),linear-gradient(0deg,rgba(20,56,102,0.07)_1px,transparent_1px)] bg-[size:30px_30px]"
              aria-hidden="true"
            />
            <div
              className="absolute left-6 top-6 h-24 w-32 rounded-md border border-dashed border-brand-blue/25 bg-white/70"
              aria-hidden="true"
            />
            <div
              className="absolute right-8 top-10 h-20 w-28 rounded-md border border-dashed border-brand-gold/40 bg-white/60"
              aria-hidden="true"
            />
            <figcaption className="relative">
              <p className="text-sm font-semibold text-brand-blue-strong">
                {emptyLabel} {index + 1}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Selected with care
              </p>
              <p className="mt-2 max-w-xs text-xs leading-5 text-slate-600">
                {emptyDescription}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  const isCompact = variant === "compact";

  return (
    <div
      className={
        isCompact
          ? "grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
          : "grid gap-4 sm:grid-cols-2"
      }
    >
      {assets.map((asset, index) => {
        const reviewNumber = reviewLabel
          ? `${reviewLabel} ${formatReviewNumber(index)}`
          : undefined;

        return (
          <figure
            key={asset.id}
            className="overflow-hidden rounded-lg border border-border-soft bg-surface"
          >
            <div
              className={`relative bg-surface-muted ${
                isCompact ? "aspect-square min-h-44" : "aspect-[4/3] min-h-56"
              }`}
            >
              <Image
                src={asset.approvedPublicPath}
                alt={asset.altText}
                fill
                sizes={
                  isCompact
                    ? "(min-width: 1280px) 220px, (min-width: 640px) 50vw, 100vw"
                    : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                }
                className="object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {reviewNumber ? (
                <span
                  className={`absolute left-3 top-3 z-20 rounded-md border border-border-soft bg-white/95 px-2.5 py-1 font-semibold uppercase tracking-[0.08em] text-brand-blue-strong shadow-sm ${
                    isCompact ? "text-[0.625rem]" : "text-xs"
                  }`}
                >
                  {reviewNumber}
                </span>
              ) : null}
            </div>
            <figcaption className={isCompact ? "p-3" : "p-4"}>
              <div className="flex items-start justify-between gap-3">
                <p
                  className={`font-semibold text-brand-blue-strong ${
                    isCompact ? "text-xs leading-5" : "text-sm"
                  }`}
                >
                  {asset.caption}
                </p>
                {reviewNumber ? (
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.1em] text-brand-red">
                    #{formatReviewNumber(index)}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {formatCategoryLabel(asset.category)}
              </p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
