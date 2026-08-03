import Image from "next/image";
import {
  getPublicImageDevChooserAssets,
  type MediaAsset,
} from "@/features/gallery/data/media-assets";
import { HeroImageDevChooser } from "./hero-image-dev-chooser";

type LocationMediaShowcaseProps = {
  assets: MediaAsset[];
  devPageId: string;
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
  devPageId,
  title,
  intro,
}: LocationMediaShowcaseProps) {
  if (assets.length === 0) {
    return null;
  }

  const [leadAsset, ...supportingAssets] = assets;
  const devChooserEnabled = process.env.NODE_ENV === "development";
  const devChooserAssets = getPublicImageDevChooserAssets(assets);
  const imageCountLabel = `${assets.length} school-life ${
    assets.length === 1 ? "image" : "images"
  }`;

  return (
    <section className="border-b border-border-soft bg-background site-section-compact">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
              School life
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-brand-blue-strong">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              {intro}
            </p>
            <p className="mt-5 border-l border-brand-accent pl-4 text-sm font-semibold leading-6 text-brand-blue-strong">
              {imageCountLabel}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              These images help families picture the learning environment,
              classroom materials, performances, and culture around the school.
            </p>
          </div>

          <div className="grid gap-4">
            <figure className="overflow-hidden rounded-lg border border-border-soft bg-surface">
              <div className="relative aspect-[4/3] min-h-64 bg-surface-muted">
                {devChooserEnabled ? (
                  <HeroImageDevChooser
                    assets={devChooserAssets}
                    initialAssetId={leadAsset.id}
                    pageId={devPageId}
                    slotId="location-lead"
                    slotLabel="Location lead"
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <Image
                    src={leadAsset.approvedPublicPath}
                    alt={leadAsset.altText}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                    loading="eager"
                  />
                )}
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
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {supportingAssets.map((asset, index) => (
                  <figure
                    key={asset.id}
                    className="overflow-hidden rounded-lg border border-border-soft bg-surface"
                  >
                    <div className="relative aspect-[4/3] min-h-32 bg-surface-muted sm:min-h-40">
                      {devChooserEnabled ? (
                        <HeroImageDevChooser
                          assets={devChooserAssets}
                          initialAssetId={asset.id}
                          pageId={devPageId}
                          slotId={`location-small-${index + 1}`}
                          slotLabel={`Location small ${index + 1}`}
                          sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <Image
                          src={asset.approvedPublicPath}
                          alt={asset.altText}
                          fill
                          sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <figcaption className="p-3">
                      <p className="line-clamp-2 text-xs font-semibold leading-5 text-brand-blue-strong sm:text-sm">
                        {asset.caption}
                      </p>
                      <p className="mt-1 hidden text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted sm:block">
                        {formatCategoryLabel(asset.category)}
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
