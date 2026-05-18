import Image from "next/image";
import type { MediaAsset } from "@/features/gallery/data/media-assets";

type LocationMediaShowcaseProps = {
  assets: MediaAsset[];
  title: string;
  intro: string;
};

function formatCategoryLabel(category: MediaAsset["category"]) {
  return category
    .split("-")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

export function LocationMediaShowcase({
  assets,
  title,
  intro,
}: LocationMediaShowcaseProps) {
  if (assets.length === 0) {
    return null;
  }

  const [leadAsset, ...supportingAssets] = assets;

  return (
    <section className="border-b border-border-soft bg-background site-section-compact">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              Location context
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-brand-blue-strong">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              {intro}
            </p>
            <p className="mt-5 border-l border-brand-gold pl-4 text-sm leading-6 text-slate-700">
              These images remain supporting context only; final public image
              selection can still be reviewed separately.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <figure className="overflow-hidden rounded-lg border border-border-soft bg-surface">
              <div className="relative aspect-[4/3] min-h-64 bg-surface-muted">
                <Image
                  src={leadAsset.approvedPublicPath}
                  alt={leadAsset.altText}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                  loading="eager"
                />
              </div>
              <figcaption className="p-4">
                <p className="text-sm font-semibold text-brand-blue-strong">
                  {leadAsset.caption}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  {formatCategoryLabel(leadAsset.category)}
                </p>
              </figcaption>
            </figure>

            {supportingAssets.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {supportingAssets.slice(0, 3).map((asset) => (
                  <figure
                    key={asset.id}
                    className="overflow-hidden rounded-lg border border-border-soft bg-surface"
                  >
                    <div className="relative aspect-[4/3] min-h-40 bg-surface-muted">
                      <Image
                        src={asset.approvedPublicPath}
                        alt={asset.altText}
                        fill
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="p-3">
                      <p className="text-sm font-semibold leading-5 text-brand-blue-strong">
                        {asset.caption}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
