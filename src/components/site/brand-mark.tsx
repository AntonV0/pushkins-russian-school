type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className = "", compact = false }: BrandMarkProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="relative flex size-11 items-center justify-center rounded-full border border-brand-blue/20 bg-brand-blue text-sm font-semibold text-white">
        PS
        <span className="absolute -right-1 -top-1 size-3 rounded-full bg-brand-red ring-2 ring-background" />
      </span>
      {!compact ? (
        <span className="min-w-0 leading-tight">
          <span className="block max-w-[15rem] text-sm font-semibold text-brand-blue-strong sm:max-w-[22rem] sm:text-base">
            Pushkin&apos;s School of Russian Language and Literature
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-[0.16em] text-muted lg:block">
            Weekend supplementary school
          </span>
        </span>
      ) : null}
    </span>
  );
}
