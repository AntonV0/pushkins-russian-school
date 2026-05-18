import Image from "next/image";
import { CheckCircle2, Images } from "lucide-react";
import type { MediaAsset } from "@/features/gallery/data/media-assets";
import { SiteIconBadge } from "./site-icon-badge";

type SchoolEvidencePanelProps = {
  eyebrow: string;
  title: string;
  summary: string;
  assets: MediaAsset[];
  notes: string[];
};

export function SchoolEvidencePanel({
  eyebrow,
  title,
  summary,
  assets,
  notes,
}: SchoolEvidencePanelProps) {
  const visibleAssets = assets.slice(0, 3);

  return (
    <aside className="border-y border-border-soft bg-background py-5 sm:py-6">
      <div className="flex items-start gap-4">
        <SiteIconBadge icon={Images} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-xl font-semibold leading-tight text-brand-blue-strong sm:text-2xl">
            {title}
          </h2>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{summary}</p>

      {visibleAssets.length > 0 ? (
        <div className="mt-5 grid grid-cols-3 gap-1 overflow-hidden border border-border-soft bg-surface-muted p-1">
          {visibleAssets.map((asset, index) => (
            <figure
              key={asset.id}
              className={`relative min-h-32 overflow-hidden bg-surface ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={asset.approvedPublicPath}
                alt={asset.altText}
                fill
                sizes={
                  index === 0
                    ? "(min-width: 1024px) 32vw, 66vw"
                    : "(min-width: 1024px) 14vw, 33vw"
                }
                className="object-cover"
                priority={index === 0}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-brand-blue-strong/78 px-3 py-2 text-[0.68rem] font-semibold leading-4 text-white">
                {asset.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}

      <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-700">
        {notes.map((note) => (
          <li key={note} className="flex gap-2 border-l border-brand-gold pl-4">
            <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-red" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
