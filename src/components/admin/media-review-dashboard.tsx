"use client";

import Image from "next/image";
import {
  CheckCircle2,
  Clipboard,
  Filter,
  Images,
  Maximize2,
  Search,
  Video,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { MediaAsset } from "@/features/gallery/data/media-assets";
import type { WixImportedVideoAsset } from "@/features/gallery/data/wix-imported-video-assets";

type MediaReviewDashboardProps = {
  assets: MediaReviewAsset[];
  videos: WixImportedVideoAsset[];
  selectedReviewKeys: string[];
  excludedVariants: ExcludedReviewVariant[];
};

type FilterValue = "all" | string;
type ReviewScope = "selected" | "needs-review" | "all" | "excluded";
type ReviewSource =
  | "approved-featured"
  | "extended-archive"
  | "wix-import"
  | "bracknell-import";
export type MediaReviewAsset = MediaAsset & {
  reviewKey: string;
  reviewSource: ReviewSource;
};
type ExcludedReviewVariant = {
  id: string;
  keptId: string;
  reason: string;
  variantKey: string;
};
type ReviewDecision = "hero" | "location-page" | "gallery" | "archive" | "skip";
type ReviewRecord = {
  decision: ReviewDecision;
  targetPath: string;
  eligibleUses?: string[];
};
type ReviewDecisions = Record<string, ReviewRecord>;

const allValue = "all";
const storageKey = "pushkins:all-media-review:v4";
const pageSize = 24;

const decisionLabels: Record<ReviewDecision, string> = {
  hero: "Hero",
  "location-page": "Location",
  gallery: "Gallery",
  archive: "Archive",
  skip: "Skip",
};

const decisionEligibilityLabels: Record<ReviewDecision, string> = {
  hero: "Hero, location pages, gallery",
  "location-page": "Location pages, gallery",
  gallery: "Gallery only",
  archive: "Keep archived",
  skip: "Do not use",
};

const decisionOptions: ReviewDecision[] = [
  "hero",
  "location-page",
  "gallery",
  "archive",
  "skip",
];
const reviewScopeOptions: Array<{
  scope: ReviewScope;
  label: string;
  description: string;
}> = [
  {
    scope: "selected",
    label: "Selected only",
    description: "Deduped images ready for page/gallery assignment.",
  },
  {
    scope: "needs-review",
    label: "Needs review",
    description: "New candidates awaiting a use decision and consent check.",
  },
  {
    scope: "all",
    label: "All reviewed",
    description: "Every image from the full review pass.",
  },
  {
    scope: "excluded",
    label: "Excluded variants",
    description: "Crop/size variants kept out of public page selection.",
  },
];

function getUniqueOptions(values: Array<string | undefined>) {
  return Array.from(new Set(values.filter(Boolean) as string[])).sort((a, b) =>
    a.localeCompare(b),
  );
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getSuggestedTarget(asset: MediaAsset) {
  if (asset.recommendedUse === "hero" || asset.recommendedUse === "about") {
    return "/public/images/site/";
  }

  if (asset.recommendedUse === "location-page" && asset.branchSlug) {
    return `/public/images/locations/${asset.branchSlug}/`;
  }

  if (asset.galleryCategorySlug) {
    return `/public/images/archive/${asset.galleryCategorySlug}/`;
  }

  return "/public/images/archive/";
}

function assetMatchesSearch(asset: MediaReviewAsset, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [
    asset.id,
    asset.sourceFilename,
    asset.sourceRelativePath,
    asset.approvedPublicPath,
    asset.altText,
    asset.caption,
    asset.branchSlug,
    asset.galleryCategorySlug,
    asset.qualityRating,
    asset.recommendedUse,
    asset.reviewSource,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function getDecisionTarget(asset: MediaReviewAsset, decision: ReviewDecision) {
  if (decision === "skip" || decision === "archive") {
    return asset.approvedPublicPath;
  }

  return getSuggestedTarget({ ...asset, recommendedUse: decision });
}

function getEligibleUses(decision: ReviewDecision) {
  if (decision === "hero") {
    return ["hero", "location-page", "gallery"];
  }

  if (decision === "location-page") {
    return ["location-page", "gallery"];
  }

  return [decision];
}

function getSuggestedDecision(asset: MediaReviewAsset): ReviewDecision | null {
  if (
    asset.consentStatus === "needs-review"
  ) {
    return null;
  }

  if (
    asset.consentStatus === "do-not-use" ||
    asset.qualityRating === "replace"
  ) {
    return "skip";
  }

  if (asset.reviewSource === "extended-archive") {
    return "archive";
  }

  if (asset.qualityRating === "hero" || asset.recommendedUse === "hero") {
    return "hero";
  }

  if (asset.recommendedUse === "location-page") {
    return "location-page";
  }

  if (
    asset.qualityRating === "feature" ||
    asset.recommendedUse === "about" ||
    asset.recommendedUse === "supporting"
  ) {
    return "gallery";
  }

  return "archive";
}

function buildSuggestedDecisions(assets: MediaReviewAsset[]) {
  return assets.reduce<ReviewDecisions>((suggestions, asset) => {
    const decision = getSuggestedDecision(asset);

    if (!decision) {
      return suggestions;
    }

    suggestions[asset.reviewKey] = {
      decision,
      targetPath: getDecisionTarget(asset, decision),
      eligibleUses: getEligibleUses(decision),
    };

    return suggestions;
  }, {});
}

export function MediaReviewDashboard({
  assets,
  videos,
  selectedReviewKeys,
  excludedVariants,
}: MediaReviewDashboardProps) {
  const [reviewScope, setReviewScope] = useState<ReviewScope>("selected");
  const [branch, setBranch] = useState<FilterValue>(allValue);
  const [category, setCategory] = useState<FilterValue>(allValue);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [stickyOffset, setStickyOffset] = useState(72);
  const [previewAsset, setPreviewAsset] = useState<MediaReviewAsset | null>(
    null,
  );
  const [preResetDecisions, setPreResetDecisions] =
    useState<ReviewDecisions | null>(null);
  const [decisions, setDecisions] = useState<ReviewDecisions>(() =>
    buildSuggestedDecisions(assets),
  );
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadStoredDecisions = () => {
      const storedDecisions = window.localStorage.getItem(storageKey);

      if (!storedDecisions) {
        setIsStorageLoaded(true);
        return;
      }

      try {
        setDecisions(JSON.parse(storedDecisions) as ReviewDecisions);
      } catch {
        window.localStorage.removeItem(storageKey);
        setDecisions(buildSuggestedDecisions(assets));
      } finally {
        setIsStorageLoaded(true);
      }
    };
    const animationFrameId = window.requestAnimationFrame(loadStoredDecisions);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [assets]);

  useEffect(() => {
    if (!isStorageLoaded) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(decisions));
  }, [decisions, isStorageLoaded]);

  useEffect(() => {
    const siteHeader = document.querySelector("body > header");

    if (!siteHeader) {
      return;
    }

    const updateStickyOffset = () => {
      setStickyOffset(Math.ceil(siteHeader.getBoundingClientRect().height));
    };

    updateStickyOffset();

    const resizeObserver = new ResizeObserver(updateStickyOffset);
    resizeObserver.observe(siteHeader);
    window.addEventListener("resize", updateStickyOffset);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateStickyOffset);
    };
  }, []);

  useEffect(() => {
    if (!previewAsset) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewAsset(null);
      }
    };
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [previewAsset]);

  const branchOptions = useMemo(
    () => getUniqueOptions(assets.map((asset) => asset.branchSlug)),
    [assets],
  );
  const categoryOptions = useMemo(
    () => getUniqueOptions(assets.map((asset) => asset.galleryCategorySlug)),
    [assets],
  );
  const selectedReviewKeySet = useMemo(
    () => new Set(selectedReviewKeys),
    [selectedReviewKeys],
  );
  const excludedVariantMap = useMemo(
    () =>
      new Map(excludedVariants.map((variant) => [variant.id, variant])),
    [excludedVariants],
  );
  const filteredAssets = useMemo(
    () =>
      assets.filter(
        (asset) =>
          (reviewScope === "all" ||
            (reviewScope === "needs-review" &&
              asset.consentStatus === "needs-review") ||
            (reviewScope === "selected" &&
              selectedReviewKeySet.has(asset.reviewKey)) ||
            (reviewScope === "excluded" &&
              excludedVariantMap.has(asset.reviewKey))) &&
          (branch === allValue || asset.branchSlug === branch) &&
          (category === allValue || asset.galleryCategorySlug === category) &&
          assetMatchesSearch(asset, query),
      ),
    [
      assets,
      branch,
      category,
      excludedVariantMap,
      query,
      reviewScope,
      selectedReviewKeySet,
    ],
  );
  const scopedAssetCount = useMemo(
    () =>
      assets.filter(
        (asset) =>
          reviewScope === "all" ||
          (reviewScope === "needs-review" &&
            asset.consentStatus === "needs-review") ||
          (reviewScope === "selected" &&
            selectedReviewKeySet.has(asset.reviewKey)) ||
          (reviewScope === "excluded" &&
            excludedVariantMap.has(asset.reviewKey)),
      ).length,
    [assets, excludedVariantMap, reviewScope, selectedReviewKeySet],
  );
  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const pageStartIndex = (activePage - 1) * pageSize;
  const pageEndIndex = Math.min(pageStartIndex + pageSize, filteredAssets.length);
  const paginatedAssets = filteredAssets.slice(pageStartIndex, pageEndIndex);

  const decisionCounts = decisionOptions.map((decision) => ({
    decision,
    count: filteredAssets.filter(
      (asset) => decisions[asset.reviewKey]?.decision === decision,
    ).length,
  }));
  const reviewedCount = Object.keys(decisions).length;
  const suggestedDecisions = useMemo(
    () => buildSuggestedDecisions(assets),
    [assets],
  );
  const reviewExport = useMemo(
    () =>
      JSON.stringify(
        Object.entries(decisions).map(([id, record]) => ({
          id,
          ...record,
          eligibleUses: record.eligibleUses ?? getEligibleUses(record.decision),
          assetPath:
            assets.find((asset) => asset.reviewKey === id)?.approvedPublicPath ??
            "",
        })),
        null,
        2,
      ),
    [assets, decisions],
  );

  const updateDecision = (asset: MediaReviewAsset, decision: ReviewDecision) => {
    setPreResetDecisions(null);
    setDecisions((currentDecisions) => ({
      ...currentDecisions,
      [asset.reviewKey]: {
        decision,
        targetPath: getDecisionTarget(asset, decision),
        eligibleUses: getEligibleUses(decision),
      },
    }));
  };

  const clearDecision = (assetId: string) => {
    setPreResetDecisions(null);
    setDecisions((currentDecisions) => {
      const nextDecisions = { ...currentDecisions };
      delete nextDecisions[assetId];
      return nextDecisions;
    });
  };

  const copyReviewExport = async () => {
    await navigator.clipboard.writeText(reviewExport);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const scrollToReviewGrid = () => {
    window.requestAnimationFrame(() => {
      document
        .getElementById("media-review-grid")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
    scrollToReviewGrid();
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
    scrollToReviewGrid();
  };

  const applySuggestedDecisions = () => {
    setPreResetDecisions(decisions);
    setDecisions(suggestedDecisions);
  };

  const undoSuggestedDecisions = () => {
    if (!preResetDecisions) {
      return;
    }

    setDecisions(preResetDecisions);
    setPreResetDecisions(null);
  };

  const clearAllDecisions = () => {
    setPreResetDecisions(null);
    setDecisions({});
  };

  return (
    <div className="bg-background">
      <textarea
        readOnly
        aria-label="Media review JSON export"
        className="sr-only"
        value={reviewExport}
      />
      <section className="border-b border-border-soft bg-surface py-8">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            {
              label: "Selected images",
              value: selectedReviewKeys.length,
              icon: Images,
            },
            {
              label: "Full review",
              value: assets.length,
              icon: CheckCircle2,
            },
            {
              label: "Excluded variants",
              value: excludedVariants.length,
              icon: X,
            },
            {
              label: "Recovered videos",
              value: videos.length,
              icon: Video,
            },
          ].map((metric) => (
            <div
              key={metric.label}
              className="border border-border-soft bg-background p-5 shadow-sm"
            >
              <metric.icon
                aria-hidden="true"
                className="size-5 text-brand-red"
              />
              <p className="mt-3 text-3xl font-semibold text-brand-blue-strong">
                {metric.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border-soft bg-background py-5">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-blue-strong">
              <CheckCircle2 aria-hidden="true" className="size-4 text-brand-red" />
              {reviewedCount} review decisions saved in this browser
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This is the main editorial pass for all manifest-backed project
              media. Choose the highest approved use for each image: hero also
              stays eligible for location pages and gallery, while location also
              stays eligible for gallery.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="grid grid-cols-5 gap-2 text-center">
              {decisionCounts.map((item) => (
                <div
                  key={item.decision}
                  className="border border-border-soft bg-surface px-2 py-2"
                >
                  <p className="text-lg font-semibold text-brand-blue-strong">
                    {item.count}
                  </p>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted">
                    {decisionLabels[item.decision]}
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={copyReviewExport}
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-border-soft px-4 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/25"
            >
              <Clipboard aria-hidden="true" className="size-4" />
              {copied ? "Copied" : "Copy review JSON"}
            </button>
            <button
              type="button"
              onClick={applySuggestedDecisions}
              className="inline-flex min-h-11 items-center justify-center border border-border-soft px-4 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/25 sm:col-start-2"
            >
              Reset to suggestions
            </button>
            {preResetDecisions ? (
              <button
                type="button"
                onClick={undoSuggestedDecisions}
                className="inline-flex min-h-11 items-center justify-center border border-brand-red px-4 text-sm font-semibold text-brand-red transition hover:bg-brand-red hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-red/25 sm:col-start-2"
              >
                Undo reset
              </button>
            ) : null}
            <button
              type="button"
              onClick={clearAllDecisions}
              className="inline-flex min-h-11 items-center justify-center border border-border-soft px-4 text-sm font-semibold text-muted transition hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/25 sm:col-start-2"
            >
              Clear all
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-surface py-5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-3 md:grid-cols-4">
            {reviewScopeOptions.map((option) => {
              const isSelected = reviewScope === option.scope;

              return (
                <button
                  key={option.scope}
                  type="button"
                  onClick={() => {
                    setReviewScope(option.scope);
                    setCurrentPage(1);
                  }}
                  className={`min-h-20 border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-brand-red/25 ${
                    isSelected
                      ? "border-brand-red bg-background text-brand-blue-strong shadow-sm"
                      : "border-border-soft bg-surface text-slate-600 hover:border-brand-red"
                  }`}
                >
                  <span className="block text-sm font-semibold">
                    {option.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border-soft bg-background py-5">
        <div className="mx-auto grid max-w-7xl gap-3 px-6 lg:grid-cols-[1.35fr_repeat(2,minmax(0,0.72fr))] lg:px-8">
          <label className="relative block">
            <span className="sr-only">Search media</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search filename, caption, path, or id"
              className="h-11 w-full border border-border-soft bg-surface pl-10 pr-3 text-sm text-brand-blue-strong outline-none transition placeholder:text-muted focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
            />
          </label>
          <FilterSelect
            label="Branch"
            value={branch}
            onChange={(value) => {
              setBranch(value);
              setCurrentPage(1);
            }}
            options={branchOptions}
          />
          <FilterSelect
            label="Category"
            value={category}
            onChange={(value) => {
              setCategory(value);
              setCurrentPage(1);
            }}
            options={categoryOptions}
          />
        </div>
      </section>

      <section className="py-8">
        <div
          id="media-review-grid"
          className="mx-auto max-w-7xl scroll-mt-28 px-6 lg:px-8"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border-soft pb-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-blue-strong">
                <Filter aria-hidden="true" className="size-4 text-brand-red" />
                {filteredAssets.length} of {scopedAssetCount} images
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Your selections are still the source of truth. The selected
                view hides deduped crop and size variants from the working pass.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setBranch(allValue);
                setCategory(allValue);
                setQuery("");
                setCurrentPage(1);
              }}
              className="min-h-10 border border-border-soft px-4 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/25"
            >
              Reset filters
            </button>
          </div>

          <PaginationControls
            activePage={activePage}
            totalPages={totalPages}
            pageStartIndex={pageStartIndex}
            pageEndIndex={pageEndIndex}
            totalItems={filteredAssets.length}
            onPrevious={goToPreviousPage}
            onNext={goToNextPage}
            sticky
            stickyOffset={stickyOffset}
          />

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedAssets.map((asset, index) => (
              <article
                key={asset.reviewKey}
                className="overflow-hidden border border-border-soft bg-surface shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-surface-muted">
                  <Image
                    src={asset.approvedPublicPath}
                    alt={asset.altText}
                    fill
                    loading={index < 6 ? "eager" : "lazy"}
                    unoptimized
                    sizes="(min-width: 1280px) 30vw, (min-width: 640px) 48vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="grid gap-4 p-4">
                  <div>
                    <p className="font-mono text-xs font-semibold text-brand-red">
                      {asset.id}
                    </p>
                    <h2 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-brand-blue-strong">
                      {asset.caption}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                      {asset.altText}
                    </p>
                  </div>

                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <ReviewFact label="Branch" value={asset.branchSlug ?? "network"} />
                    <ReviewFact
                      label="Category"
                      value={asset.galleryCategorySlug ?? "archive"}
                    />
                  </dl>

                  <div className="grid gap-2 border-t border-border-soft pt-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
                      Highest approved use
                    </p>
                    <div className="grid grid-cols-5 gap-1.5">
                      {decisionOptions.map((decision) => {
                        const isSelected =
                          decisions[asset.reviewKey]?.decision === decision;

                        return (
                          <button
                            key={decision}
                            type="button"
                            onClick={() => updateDecision(asset, decision)}
                            className={`min-h-9 border px-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-red/25 ${
                              isSelected
                                ? "border-brand-red bg-brand-red text-white"
                                : "border-border-soft bg-background text-brand-blue-strong hover:border-brand-red"
                            }`}
                          >
                            {decisionLabels[decision]}
                          </button>
                        );
                      })}
                    </div>
                    {decisions[asset.reviewKey] ? (
                      <div className="flex flex-wrap items-center justify-between gap-2 bg-background px-3 py-2 text-xs">
                        <div className="min-w-0">
                          <p className="font-semibold text-brand-blue-strong">
                            {
                              decisionEligibilityLabels[
                                decisions[asset.reviewKey].decision
                              ]
                            }
                          </p>
                          <p className="truncate font-mono text-muted">
                            {decisions[asset.reviewKey].targetPath}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => clearDecision(asset.reviewKey)}
                          className="font-semibold text-brand-red underline decoration-brand-red/40 underline-offset-4"
                        >
                          Clear
                        </button>
                      </div>
                    ) : null}
                    {excludedVariantMap.has(asset.reviewKey) ? (
                      <div className="border border-brand-accent bg-brand-accent/10 px-3 py-2 text-xs leading-5 text-brand-blue-strong">
                        <p className="font-semibold">Excluded variant</p>
                        <p>
                          Kept{" "}
                          <span className="font-mono">
                            {excludedVariantMap.get(asset.reviewKey)?.keptId}
                          </span>{" "}
                          instead.
                        </p>
                        <p className="font-mono text-muted">
                          {formatLabel(
                            excludedVariantMap.get(asset.reviewKey)?.reason ??
                              "variant",
                          )}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  <div className="grid gap-2 border-t border-border-soft pt-3">
                    <p className="truncate font-mono text-xs text-muted">
                      {asset.sourceFilename}
                    </p>
                    <button
                      type="button"
                      onClick={() => setPreviewAsset(asset)}
                      className="inline-flex min-h-10 items-center justify-center gap-2 border border-border-soft px-3 text-sm font-semibold text-brand-blue-strong transition hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/25"
                    >
                      Open image
                      <Maximize2 aria-hidden="true" className="size-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6">
            <PaginationControls
              activePage={activePage}
              totalPages={totalPages}
              pageStartIndex={pageStartIndex}
              pageEndIndex={pageEndIndex}
              totalItems={filteredAssets.length}
              onPrevious={goToPreviousPage}
              onNext={goToNextPage}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-2">
            <Video aria-hidden="true" className="size-5 text-brand-red" />
            <h2 className="text-2xl font-semibold text-brand-blue-strong">
              Recovered videos
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {videos.map((video) => (
              <article
                key={video.id}
                className="grid gap-4 border border-border-soft bg-background p-4 sm:grid-cols-[12rem_1fr]"
              >
                <video
                  src={video.approvedPublicPath}
                  controls
                  preload="metadata"
                  className="aspect-video w-full bg-brand-blue-strong object-cover"
                />
                <div>
                  <p className="font-mono text-xs font-semibold text-brand-red">
                    {video.id}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-brand-blue-strong">
                    {video.sourceFilename}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {video.recommendedUse === "review-for-page-video"
                      ? "Review a representative frame before using this on a page."
                      : "Archive video candidate for gallery context."}
                  </p>
                  <p className="mt-3 font-mono text-xs text-muted">
                    {video.approvedPublicPath}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {previewAsset ? (
        <button
          type="button"
          aria-label={`Close preview for ${previewAsset.caption}`}
          onClick={() => setPreviewAsset(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-brand-blue-strong/92 p-4 text-left backdrop-blur-sm sm:p-8"
        >
          <span className="absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center border border-white/25 bg-white/12 text-white shadow-sm sm:right-6 sm:top-6">
            <X aria-hidden="true" className="size-5" />
          </span>
          <Image
            src={previewAsset.approvedPublicPath}
            alt={previewAsset.altText}
            fill
            unoptimized
            sizes="100vw"
            className="pointer-events-none object-contain p-4 sm:p-8"
          />
        </button>
      ) : null}
    </div>
  );
}

function PaginationControls({
  activePage,
  totalPages,
  pageStartIndex,
  pageEndIndex,
  totalItems,
  onPrevious,
  onNext,
  sticky = false,
  stickyOffset = 0,
}: {
  activePage: number;
  totalPages: number;
  pageStartIndex: number;
  pageEndIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
  sticky?: boolean;
  stickyOffset?: number;
}) {
  return (
    <div
      className={`mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border-soft pb-4 text-sm ${
        sticky
          ? "sticky top-[var(--media-review-sticky-offset)] z-10 -mx-6 border-t bg-background/95 px-6 py-3 shadow-sm backdrop-blur lg:-mx-8 lg:px-8"
          : ""
      }`}
      style={
        sticky
          ? ({
              "--media-review-sticky-offset": `${stickyOffset}px`,
            } as CSSProperties)
          : undefined
      }
    >
      <p className="font-semibold text-brand-blue-strong">
        Showing {totalItems === 0 ? 0 : pageStartIndex + 1}-{pageEndIndex} of{" "}
        {totalItems}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={activePage === 1}
          className="min-h-10 border border-border-soft px-4 font-semibold text-brand-blue-strong transition hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/25 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Previous
        </button>
        <span className="px-2 font-semibold text-muted">
          Page {activePage} of {totalPages}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={activePage === totalPages}
          className="min-h-10 border border-border-soft px-4 font-semibold text-brand-blue-strong transition hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/25 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  formatOption = formatLabel,
}: {
  label: string;
  value: FilterValue;
  options: string[];
  onChange: (value: FilterValue) => void;
  formatOption?: (value: string) => string;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full border border-border-soft bg-surface px-3 text-sm font-semibold text-brand-blue-strong outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
      >
        <option value={allValue}>All {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {formatOption(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function ReviewFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-l border-brand-accent pl-3">
      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-semibold text-brand-blue-strong">
        {formatLabel(value)}
      </dd>
    </div>
  );
}
