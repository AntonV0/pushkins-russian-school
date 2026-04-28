import {
  invoicePaymentMethodMeta,
  invoicePaymentStatusMeta,
  type InvoicePaymentMethod,
  type InvoicePaymentStatus,
} from "@/data/invoices";

const statusToneClasses = {
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
  info: "border-blue-200 bg-blue-50 text-blue-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-red-200 bg-red-50 text-red-800",
};

type InvoiceStatusBadgeProps = {
  status: InvoicePaymentStatus;
};

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const meta = invoicePaymentStatusMeta[status];

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusToneClasses[meta.tone]}`}
      title={meta.description}
    >
      {meta.label}
    </span>
  );
}

type PaymentMethodBadgeProps = {
  method: InvoicePaymentMethod;
};

export function PaymentMethodBadge({ method }: PaymentMethodBadgeProps) {
  const meta = invoicePaymentMethodMeta[method];
  const className = meta.online
    ? "border-brand-blue/20 bg-surface-blue text-brand-blue-strong"
    : meta.manual
      ? "border-brand-gold/40 bg-[#fff8e8] text-brand-blue-strong"
      : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${className}`}
      title={meta.description}
    >
      {meta.label}
    </span>
  );
}
