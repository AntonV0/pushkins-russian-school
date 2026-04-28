import type {
  RegistrationInvitationStatus,
  RegistrationReviewState,
  RegistrationTone,
} from "@/data/registration";
import {
  registrationInvitationStatusMeta,
  registrationReviewStateMeta,
} from "@/data/registration";

const toneClasses: Record<RegistrationTone, string> = {
  neutral: "border-slate-200 bg-slate-50 text-slate-600",
  info: "border-brand-blue/20 bg-surface-blue text-brand-blue-strong",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-brand-red/20 bg-red-50 text-brand-red",
};

type RegistrationInvitationBadgeProps = {
  status: RegistrationInvitationStatus;
};

type RegistrationReviewBadgeProps = {
  state: RegistrationReviewState;
};

export function RegistrationInvitationBadge({
  status,
}: RegistrationInvitationBadgeProps) {
  const meta = registrationInvitationStatusMeta[status];

  return (
    <span
      title={meta.description}
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClasses[meta.tone]}`}
    >
      {meta.label}
    </span>
  );
}

export function RegistrationReviewBadge({
  state,
}: RegistrationReviewBadgeProps) {
  const meta = registrationReviewStateMeta[state];

  return (
    <span
      title={meta.description}
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClasses[meta.tone]}`}
    >
      {meta.label}
    </span>
  );
}
