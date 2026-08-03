"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Clipboard, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { MediaAsset } from "@/features/gallery/data/media-assets";

type HeroImageDevChooserProps = {
  assets: MediaAsset[];
  initialAssetId: string;
  pageId: string;
  slotId: string;
  slotLabel: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

function formatLabel(value?: string) {
  return value ? value.replaceAll("-", " ") : "unlabelled";
}

export function HeroImageDevChooser({
  assets,
  initialAssetId,
  pageId,
  slotId,
  slotLabel,
  sizes,
  className = "",
  priority = false,
}: HeroImageDevChooserProps) {
  const storageKey = `pushkins-dev-image-${pageId}-${slotId}`;
  const initialIndex = useMemo(() => {
    const foundIndex = assets.findIndex((asset) => asset.id === initialAssetId);
    return foundIndex >= 0 ? foundIndex : 0;
  }, [assets, initialAssetId]);
  const [index, setIndex] = useState(() => {
    if (typeof window === "undefined") {
      return initialIndex;
    }

    const storedAssetId = window.localStorage.getItem(storageKey);
    const storedIndex = assets.findIndex(
      (candidate) => candidate.id === storedAssetId,
    );

    return storedIndex >= 0 ? storedIndex : initialIndex;
  });
  const [copied, setCopied] = useState(false);
  const asset = assets[index] ?? assets[0];

  useEffect(() => {
    if (asset) {
      window.localStorage.setItem(storageKey, asset.id);
    }
  }, [asset, storageKey]);

  if (!asset) {
    return null;
  }

  const move = (step: number) => {
    setCopied(false);
    setIndex((currentIndex) => {
      const nextIndex = (currentIndex + step + assets.length) % assets.length;
      return nextIndex;
    });
  };

  const reset = () => {
    setCopied(false);
    setIndex(initialIndex);
  };

  const copySelection = async () => {
    const text = `${pageId} / ${slotLabel}: ${asset.id} | ${asset.approvedPublicPath}`;
    await window.navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div className="group absolute inset-0 z-20">
      <button
        type="button"
        onClick={() => move(1)}
        className="absolute inset-0 z-0 cursor-pointer"
        aria-label={`Show next image for ${slotLabel}`}
      >
        <Image
          src={asset.approvedPublicPath}
          alt={asset.altText}
          fill
          sizes={sizes}
          className={className}
          priority={priority}
        />
      </button>

      <div className="absolute inset-x-2 top-2 z-20 flex items-start justify-between gap-2 text-white">
        <div className="max-w-[70%] rounded-md bg-brand-blue-strong/88 px-2.5 py-2 text-[0.68rem] font-semibold leading-tight shadow-lg backdrop-blur">
          <p className="uppercase tracking-[0.16em] text-white/70">
            {slotLabel}
          </p>
          <p className="mt-1 font-mono text-[0.8rem] text-white">
            {asset.id}
          </p>
          <p className="mt-1 truncate text-white/78">
            {index + 1} / {assets.length} · {formatLabel(asset.category)} ·{" "}
            {formatLabel(asset.branchSlug)}
          </p>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={reset}
            className="inline-flex size-8 items-center justify-center rounded-full bg-white/92 text-brand-blue-strong shadow-lg transition hover:bg-white"
            aria-label={`Reset ${slotLabel} image`}
            title="Reset to current site image"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={copySelection}
            className="inline-flex size-8 items-center justify-center rounded-full bg-white/92 text-brand-blue-strong shadow-lg transition hover:bg-white"
            aria-label={`Copy ${slotLabel} image identifier`}
            title={copied ? "Copied" : "Copy image ID"}
          >
            <Clipboard aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <div className="absolute inset-x-2 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between">
        <button
          type="button"
          onClick={() => move(-1)}
          className="inline-flex size-9 items-center justify-center rounded-full bg-white/92 text-brand-blue-strong shadow-lg transition hover:bg-white"
          aria-label={`Show previous image for ${slotLabel}`}
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          className="inline-flex size-9 items-center justify-center rounded-full bg-white/92 text-brand-blue-strong shadow-lg transition hover:bg-white"
          aria-label={`Show next image for ${slotLabel}`}
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
