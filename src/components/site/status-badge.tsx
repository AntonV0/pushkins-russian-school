import type { SchoolStatus } from "@/data/public/schools";
import { ToneBadge, type ToneBadgeTone } from "@/components/shared/tone-badge";

const statusTones: Record<SchoolStatus, ToneBadgeTone> = {
  open: "success",
  closed: "neutral",
  online: "info",
  "opening-soon": "warning",
};

type StatusBadgeProps = {
  status: SchoolStatus;
  label: string;
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <ToneBadge
      tone={statusTones[status]}
      uppercase
      dot
      className={status === "closed" ? "bg-zinc-100 text-zinc-700" : "shadow-sm"}
    >
      {label}
    </ToneBadge>
  );
}
