import type { VisualPlaceholderSlot } from "@/data/media-assets";

type VisualStoryPanelProps = {
  slot: VisualPlaceholderSlot;
  compact?: boolean;
};

export function VisualStoryPanel({ slot, compact = false }: VisualStoryPanelProps) {
  const headingId = `${slot.id}-heading`;

  return (
    <figure
      className="premium-panel overflow-hidden rounded-lg border border-border-soft bg-surface"
      aria-labelledby={headingId}
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden bg-surface-muted ${
          compact ? "min-h-56" : "min-h-72 sm:min-h-80"
        }`}
      >
        <div className="fine-grid absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/55 to-transparent" />
        <div
          className="absolute right-8 top-8 h-24 w-36 rotate-3 rounded-md border border-brand-gold/30 bg-white/40"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 left-8 h-20 w-44 -rotate-2 rounded-md border border-brand-blue/15 bg-white/45"
          aria-hidden="true"
        />
        <VisualMotif slot={slot} />
      </div>
      <figcaption className="p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
          {slot.eyebrow}
        </p>
        <h2
          id={headingId}
          className="mt-3 text-xl font-semibold leading-tight text-brand-blue-strong sm:text-2xl"
        >
          {slot.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{slot.summary}</p>
        <p className="mt-5 border-l border-brand-gold pl-4 text-sm font-semibold leading-6 text-brand-blue-strong">
          {slot.statusLabel}
        </p>
      </figcaption>
    </figure>
  );
}

function VisualMotif({ slot }: { slot: VisualPlaceholderSlot }) {
  switch (slot.motif) {
    case "language-table":
      return <LanguageTableMotif />;
    case "culture-shelf":
      return <CultureShelfMotif />;
    case "learning-journey":
      return <LearningJourneyMotif />;
    case "archive-grid":
      return <ArchiveGridMotif />;
  }
}

function LanguageTableMotif() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute bottom-8 left-8 right-8 h-24 rounded-lg border border-brand-blue/10 bg-white shadow-sm" />
      <div className="absolute bottom-20 left-[18%] h-32 w-28 rotate-[-5deg] rounded-md border border-border-soft bg-white shadow-md">
        <div className="mx-auto mt-5 h-2 w-16 rounded-full bg-brand-gold/45" />
        <div className="mx-auto mt-4 h-16 w-16 rounded-md bg-surface-blue text-center text-5xl font-semibold leading-[4rem] text-brand-blue-strong">
          {"\u042f"}
        </div>
      </div>
      <div className="absolute bottom-24 right-[18%] h-28 w-24 rotate-[7deg] rounded-md border border-border-soft bg-white shadow-md">
        <div className="mx-auto mt-4 h-2 w-14 rounded-full bg-brand-red/25" />
        <div className="mx-auto mt-4 h-14 w-14 rounded-md bg-brand-gold/15 text-center text-4xl font-semibold leading-[3.5rem] text-brand-red">
          {"\u0410"}
        </div>
      </div>
      <div className="absolute bottom-14 left-[44%] h-3 w-36 rotate-[-12deg] rounded-full bg-brand-red/70 shadow-sm" />
      <div className="absolute bottom-11 left-[41%] h-3 w-10 rotate-[-12deg] rounded-full bg-brand-gold" />
      <div className="absolute right-12 top-12 rounded-full border border-brand-gold/50 bg-white px-4 py-2 text-sm font-semibold text-brand-blue-strong shadow-sm">
        Reading
      </div>
    </div>
  );
}

function CultureShelfMotif() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute left-10 right-10 top-20 h-3 rounded-full bg-brand-blue/15" />
      <div className="absolute left-16 top-10 h-28 w-10 rounded-t-md bg-brand-blue shadow-sm" />
      <div className="absolute left-[7.5rem] top-16 h-[5.5rem] w-9 rounded-t-md bg-brand-red shadow-sm" />
      <div className="absolute left-44 top-8 h-[7.5rem] w-10 rounded-t-md bg-brand-gold shadow-sm" />
      <div className="absolute left-60 top-14 h-24 w-9 rounded-t-md bg-white shadow-sm" />
      <div className="absolute bottom-12 left-14 right-14 h-28 rounded-lg border border-border-soft bg-white shadow-md">
        <div className="absolute left-6 top-6 h-16 w-28 rounded-md bg-surface-blue" />
        <div className="absolute left-12 top-10 text-4xl font-semibold text-brand-blue-strong">
          {"\u0416"}
        </div>
        <div className="absolute right-8 top-7 grid grid-cols-3 gap-2">
          <span className="size-7 rounded-sm bg-brand-red" />
          <span className="size-7 rounded-sm bg-brand-gold" />
          <span className="size-7 rounded-sm bg-brand-blue" />
          <span className="size-7 rounded-sm bg-brand-gold" />
          <span className="size-7 rounded-sm bg-brand-blue" />
          <span className="size-7 rounded-sm bg-brand-red" />
        </div>
      </div>
    </div>
  );
}

function LearningJourneyMotif() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute left-[20%] top-[52%] h-1 w-[60%] rounded-full bg-brand-gold/60" />
      {[0, 1, 2].map((step) => (
        <div
          key={step}
          className="absolute top-[44%] size-16 -translate-x-1/2 rounded-full border border-brand-blue/15 bg-white text-center text-xl font-semibold leading-[4rem] text-brand-blue-strong shadow-md"
          style={{ left: `${20 + step * 30}%` }}
        >
          {step + 1}
        </div>
      ))}
      <div className="absolute left-10 top-10 h-24 w-32 rotate-[-4deg] rounded-md border border-border-soft bg-white shadow-sm">
        <div className="mx-4 mt-4 h-2 rounded-full bg-brand-red/30" />
        <div className="mx-4 mt-3 h-2 rounded-full bg-brand-blue/20" />
        <div className="mx-4 mt-3 h-2 w-16 rounded-full bg-brand-gold/45" />
      </div>
      <div className="absolute bottom-8 right-12 h-28 w-36 rotate-[5deg] rounded-md border border-border-soft bg-white shadow-sm">
        <div className="mx-auto mt-5 size-14 rounded-md bg-surface-blue text-center text-4xl font-semibold leading-[3.5rem] text-brand-red">
          {"\u0411"}
        </div>
        <div className="mx-auto mt-4 h-2 w-20 rounded-full bg-brand-gold/45" />
      </div>
    </div>
  );
}

function ArchiveGridMotif() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-x-10 top-10 grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((slot) => (
          <div
            key={slot}
            className="aspect-[4/3] rounded-md border border-dashed border-brand-blue/25 bg-white/75 shadow-sm"
          >
            <div className="m-4 h-2 rounded-full bg-brand-gold/35" />
            <div className="mx-4 mt-3 h-2 w-1/2 rounded-full bg-brand-blue/15" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 left-10 right-10 rounded-md border border-brand-gold/35 bg-white px-5 py-4 shadow-sm">
        <div className="h-2 w-28 rounded-full bg-brand-red/30" />
        <div className="mt-3 h-2 w-44 rounded-full bg-brand-blue/15" />
      </div>
    </div>
  );
}
