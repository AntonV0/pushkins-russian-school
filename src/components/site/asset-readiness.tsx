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
};

export function AssetReadinessPanel({
  title = "Asset readiness",
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
  emptyLabel = "Approved image slot",
  emptyDescription = "Reserved for an approved, optimised public image.",
  slotCount = 4,
}: MediaAssetGridProps) {
  if (assets.length === 0) {
    return (
      <div
        className="grid gap-4 sm:grid-cols-2"
        aria-label="Approved media placeholders"
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
                Caption pending
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

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {assets.map((asset) => (
        <figure
          key={asset.id}
          className="overflow-hidden rounded-lg border border-border-soft bg-surface"
        >
          <div className="relative aspect-[4/3] bg-surface-muted">
            <Image
              src={asset.approvedPublicPath}
              alt={asset.altText}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="p-4">
            <p className="text-sm font-semibold text-brand-blue-strong">
              {asset.caption}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {asset.year ?? "Year pending"} - {asset.category}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
