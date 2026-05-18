import type {
  RegistrationInvitationStatus,
  RegistrationReviewState,
  RegistrationTone,
} from "@/features/admin/data/registration";
import {
  registrationInvitationStatusMeta,
  registrationReviewStateMeta,
} from "@/features/admin/data/registration";
import { ToneBadge, type ToneBadgeTone } from "@/components/shared/tone-badge";

const toneMap: Record<RegistrationTone, ToneBadgeTone> = {
  neutral: "neutral",
  info: "brand",
  success: "success",
  warning: "warning",
  danger: "danger",
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
    <ToneBadge
      tone={toneMap[meta.tone]}
      title={meta.description}
      aria-label={`${meta.label}: ${meta.description}`}
      className={`px-2.5 ${
        meta.tone === "danger" ? "border-brand-red/20 text-brand-red" : ""
      }`}
    >
      {meta.label}
    </ToneBadge>
  );
}

export function RegistrationReviewBadge({
  state,
}: RegistrationReviewBadgeProps) {
  const meta = registrationReviewStateMeta[state];

  return (
    <ToneBadge
      tone={toneMap[meta.tone]}
      title={meta.description}
      aria-label={`${meta.label}: ${meta.description}`}
      className={`px-2.5 ${
        meta.tone === "danger" ? "border-brand-red/20 text-brand-red" : ""
      }`}
    >
      {meta.label}
    </ToneBadge>
  );
}
