import {
  invoicePaymentMethodMeta,
  invoicePaymentStatusMeta,
  type InvoicePaymentMethod,
  type InvoicePaymentStatus,
} from "@/features/admin/data/invoices";
import { ToneBadge, type ToneBadgeTone } from "@/components/shared/tone-badge";

const statusToneMap = {
  neutral: "neutral",
  info: "info",
  success: "success",
  warning: "warning",
  danger: "danger",
};

type InvoiceStatusBadgeProps = {
  status: InvoicePaymentStatus;
};

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const meta = invoicePaymentStatusMeta[status];

  return (
    <ToneBadge
      tone={statusToneMap[meta.tone] as ToneBadgeTone}
      title={meta.description}
      aria-label={`${meta.label}: ${meta.description}`}
      dot
    >
      {meta.label}
    </ToneBadge>
  );
}

type PaymentMethodBadgeProps = {
  method: InvoicePaymentMethod;
};

export function PaymentMethodBadge({ method }: PaymentMethodBadgeProps) {
  const meta = invoicePaymentMethodMeta[method];
  const tone = meta.online ? "brand" : meta.manual ? "gold" : "neutral";

  return (
    <ToneBadge
      tone={tone}
      title={meta.description}
      aria-label={`${meta.label}: ${meta.description}`}
      dot
    >
      {meta.label}
    </ToneBadge>
  );
}
