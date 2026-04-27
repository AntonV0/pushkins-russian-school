import type { SchoolStatus } from "@/data/schools";

const statusStyles: Record<SchoolStatus, string> = {
  open: "border-emerald-200 bg-emerald-50 text-emerald-800",
  closed: "border-zinc-200 bg-zinc-100 text-zinc-700",
  online: "border-sky-200 bg-sky-50 text-sky-800",
  "opening-soon": "border-amber-200 bg-amber-50 text-amber-800",
};

type StatusBadgeProps = {
  status: SchoolStatus;
  label: string;
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${statusStyles[status]}`}
    >
      {label}
    </span>
  );
}
