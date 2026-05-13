import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className = "", compact = false }: BrandMarkProps) {
  return (
    <span
      className={`inline-flex items-center gap-3.5 ${className}`}
      aria-label="Pushkin's School of Russian Language and Literature"
    >
      <span className="relative block h-14 w-16 shrink-0 sm:h-16 sm:w-[4.5rem]" aria-hidden="true">
        <Image
          src="/images/brand/pushkin-mark.png"
          alt=""
          width={923}
          height={871}
          className="h-full w-full object-contain object-left"
          priority
        />
      </span>
      {!compact ? (
        <span className="min-w-0 leading-none" aria-hidden="true">
          <span className="block font-logo-display text-[2.15rem] font-normal leading-[0.84] tracking-normal text-[#1684d7] sm:text-[2.7rem]">
            Pushkin&apos;s School
          </span>
          <span className="block max-w-[16.5rem] pt-1.5 text-[0.66rem] font-semibold leading-snug tracking-[0.045em] text-[#0476c9] sm:max-w-[23rem] sm:text-[0.78rem]">
            of Russian Language and Literature
          </span>
        </span>
      ) : null}
    </span>
  );
}
