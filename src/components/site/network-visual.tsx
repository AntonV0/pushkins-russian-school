import { schools } from "@/data/schools";

const positions = [
  "left-[25%] top-[63%]",
  "left-[45%] top-[38%]",
  "left-[52%] top-[63%]",
  "left-[68%] top-[42%]",
  "left-[74%] top-[68%]",
];

const statusDot = {
  open: "bg-emerald-500",
  online: "bg-sky-500",
  closed: "bg-zinc-400",
  "opening-soon": "bg-amber-500",
};

export function NetworkVisual() {
  const openCount = schools.filter((school) => school.status === "open").length;
  const interestCount = schools.length - openCount;

  return (
    <div
      className="relative min-h-[22rem] overflow-hidden rounded-lg border border-border-soft bg-surface shadow-sm"
      aria-label="Pushkin's School network status overview"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,56,102,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(20,56,102,0.08)_1px,transparent_1px)] bg-[size:34px_34px]"
        aria-hidden="true"
      />
      <div
        className="absolute left-[18%] top-[18%] h-[62%] w-[68%] rounded-[48%] border border-brand-blue/15"
        aria-hidden="true"
      />
      <div
        className="absolute left-[24%] top-[25%] h-[48%] w-[55%] rounded-[48%] border border-brand-gold/35"
        aria-hidden="true"
      />
      <div className="absolute left-10 top-10 max-w-56">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
          Network view
        </p>
        <p className="mt-3 text-2xl font-semibold leading-tight text-brand-blue-strong">
          Five network areas, one learning structure
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-muted">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
            <span className="size-2 rounded-full bg-emerald-500" />
            {openCount} current hub
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
            <span className="size-2 rounded-full bg-sky-500" />
            {interestCount} online / interest areas
          </span>
        </div>
      </div>
      {schools.map((school, index) => (
        <div
          key={school.slug}
          className={`absolute ${positions[index]} max-w-36 rounded-md border border-border-soft bg-white px-3 py-2 shadow-sm ${
            index > 1 ? "hidden sm:block" : ""
          }`}
        >
          <span
            className={`mb-2 block size-2 rounded-full ${statusDot[school.status]}`}
          />
          <p className="text-sm font-semibold leading-5 text-brand-blue-strong">
            {school.name}
          </p>
          <p className="mt-1 text-xs text-muted">{school.statusLabel}</p>
        </div>
      ))}
    </div>
  );
}
