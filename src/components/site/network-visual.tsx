import { schools } from "@/data/schools";

const positions = [
  "left-[25%] top-[63%]",
  "left-[45%] top-[38%]",
  "left-[52%] top-[63%]",
  "left-[68%] top-[42%]",
  "left-[74%] top-[68%]",
];

export function NetworkVisual() {
  return (
    <div className="relative min-h-[22rem] overflow-hidden rounded-lg border border-border-soft bg-surface shadow-sm">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,56,102,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(20,56,102,0.08)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <div className="absolute left-[18%] top-[18%] h-[62%] w-[68%] rounded-[48%] border border-brand-blue/15" />
      <div className="absolute left-[24%] top-[25%] h-[48%] w-[55%] rounded-[48%] border border-brand-gold/35" />
      <div className="absolute left-10 top-10 max-w-56">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
          Network view
        </p>
        <p className="mt-3 text-2xl font-semibold leading-tight text-brand-blue-strong">
          Five locations, one learning structure
        </p>
      </div>
      {schools.map((school, index) => (
        <div
          key={school.slug}
          className={`absolute ${positions[index]} max-w-36 rounded-md border border-border-soft bg-white px-3 py-2 shadow-sm ${
            index > 1 ? "hidden sm:block" : ""
          }`}
        >
          <span className="mb-2 block size-2 rounded-full bg-brand-red" />
          <p className="text-sm font-semibold leading-5 text-brand-blue-strong">
            {school.name}
          </p>
          <p className="mt-1 text-xs text-muted">{school.statusLabel}</p>
        </div>
      ))}
    </div>
  );
}
