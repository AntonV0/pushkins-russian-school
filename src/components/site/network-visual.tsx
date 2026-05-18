import { schools } from "@/data/public/schools";

const statusDot = {
  open: "bg-emerald-500",
  online: "bg-sky-500",
  closed: "bg-zinc-400",
  "opening-soon": "bg-amber-500",
};

export function NetworkVisual() {
  const openCount = schools.filter((school) => school.status === "open").length;
  const interestCount = schools.length - openCount;
  const openSchool = schools.find((school) => school.status === "open");

  return (
    <div
      className="premium-panel relative w-full min-w-0 overflow-hidden rounded-lg border border-border-soft bg-surface"
      aria-label="Pushkin's School location and class overview"
    >
      <div className="fine-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white via-white/70 to-transparent" />
      <div
        className="absolute left-[10%] top-[22%] h-[58%] w-[78%] rounded-[48%] border border-brand-blue/15"
        aria-hidden="true"
      />
      <div
        className="absolute left-[23%] top-[33%] h-[38%] w-[54%] rounded-[48%] border border-brand-gold/35"
        aria-hidden="true"
      />
      <div className="relative grid min-w-0 gap-6 p-6 sm:p-8 lg:min-h-[24rem] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              School locations
            </p>
            <p className="mt-3 text-2xl font-semibold leading-tight text-brand-blue-strong sm:text-3xl">
              Weekend Russian classes, close to family life
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The school has served families through local weekend classes in
              towns across England, often using familiar primary and secondary
              school venues.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-muted">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1 shadow-sm">
                <span className="size-2 rounded-full bg-emerald-500" />
                {openCount} current in-person school
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3 py-1 shadow-sm">
                <span className="size-2 rounded-full bg-sky-500" />
                {interestCount} locations taking interest
              </span>
            </div>
          </div>
          {openSchool ? (
            <div className="rounded-lg border border-brand-gold/40 bg-white/95 p-4 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Current listed weekend school
              </p>
              <p className="mt-2 text-xl font-semibold text-brand-blue-strong">
                {openSchool.name}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {openSchool.schedule}
              </p>
            </div>
          ) : null}
        </div>
        <div className="grid content-center gap-3 sm:grid-cols-2">
          {schools.map((school) => (
            <div
              key={school.slug}
              className="min-w-0 rounded-md border border-border-soft bg-white/95 px-4 py-3 shadow-sm"
            >
              <span
                className={`mb-2 block size-2 rounded-full ${statusDot[school.status]}`}
              />
              <p className="text-sm font-semibold leading-5 text-brand-blue-strong">
                {school.name}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                {school.statusLabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
