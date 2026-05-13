import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
  short?: boolean;
};

export function BrandMark({ className = "", compact = false, short = false }: BrandMarkProps) {
  return (
    <span
      className={`inline-flex items-center ${short ? "gap-1.5" : "gap-2.5"} ${className}`}
      aria-label="Pushkin's School of Russian Language and Literature"
    >
      <span
        className={`relative block shrink-0 ${
          short ? "h-10 w-12" : "h-[3.75rem] w-[4.25rem] sm:h-[4.5rem] sm:w-[5rem]"
        }`}
        aria-hidden="true"
      >
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
        <span
          className={`flex min-w-0 flex-col justify-center leading-none ${
            short ? "h-10 translate-y-1" : "h-[3.75rem] translate-y-1 sm:h-[4.5rem]"
          }`}
          aria-hidden="true"
        >
          <span
            className={`block font-logo-display font-normal leading-[0.86] tracking-normal text-brand-blue ${
              short ? "text-[1.55rem]" : "text-[1.9rem] sm:text-[2.3rem]"
            }`}
          >
            Pushkin&apos;s School
          </span>
          {!short ? (
            <span className="block max-w-[16.5rem] -mt-0.5 text-[0.72rem] font-semibold leading-snug tracking-[0.05em] text-brand-red sm:max-w-[21.5rem] sm:text-[0.82rem]">
              of Russian Language and Literature
            </span>
          ) : (
            <span className="hidden max-w-[15rem] -mt-px text-[0.78rem] font-semibold leading-snug tracking-normal text-brand-red min-[430px]:block sm:text-[0.82rem]">
              of Russian Language and Literature
            </span>
          )}
        </span>
      ) : null}
    </span>
  );
}
