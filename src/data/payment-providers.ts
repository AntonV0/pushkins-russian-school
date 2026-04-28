export type PaymentProviderId = "stripe" | "paypal";

export type PaymentProviderStatus = "likely-default" | "optional" | "disabled";

export type InvoiceStatus =
  | "draft"
  | "issued"
  | "partially_paid"
  | "paid"
  | "overdue"
  | "void"
  | "refunded";

export type InvoicePaymentStatus =
  | "not_started"
  | "checkout_pending"
  | "processing"
  | "paid"
  | "failed"
  | "cancelled"
  | "refunded"
  | "requires_manual_reconciliation";

export type InvoicePaymentMethod =
  | "cash"
  | "bank_transfer"
  | "stripe_checkout"
  | "paypal_checkout"
  | "childcare_voucher"
  | "other_manual";

export type PaymentProviderConfig = {
  id: PaymentProviderId;
  label: string;
  status: PaymentProviderStatus;
  intendedUse: string;
  publicDescription: string;
  supportsHostedCheckout: boolean;
  supportsWallets: boolean;
  requiresFutureCredentials: boolean;
  notes: string[];
};

export const paymentProviders = [
  {
    id: "stripe",
    label: "Stripe",
    status: "likely-default",
    intendedUse:
      "Hosted online invoice payment links for card and supported wallet payments.",
    publicDescription:
      "Online invoice payment by card or supported wallet methods where available.",
    supportsHostedCheckout: true,
    supportsWallets: true,
    requiresFutureCredentials: true,
    notes: [
      "Use Stripe Checkout Sessions for the first online invoice payment milestone.",
      "Enable payment methods in the Stripe Dashboard rather than hard-coding a card-only flow.",
      "Webhook handling should update invoice payment status after provider confirmation.",
    ],
  },
  {
    id: "paypal",
    label: "PayPal",
    status: "optional",
    intendedUse:
      "Optional future online invoice payment route if parent demand justifies it.",
    publicDescription:
      "Optional PayPal checkout route, not confirmed for the first launch.",
    supportsHostedCheckout: true,
    supportsWallets: false,
    requiresFutureCredentials: true,
    notes: [
      "Do not block the first invoice system on PayPal.",
      "Add only after provider support, reconciliation, refunds, and admin workflow are agreed.",
    ],
  },
] satisfies PaymentProviderConfig[];

export const invoiceStatusLabels: Record<InvoiceStatus, string> = {
  draft: "Draft",
  issued: "Issued",
  partially_paid: "Partially paid",
  paid: "Paid",
  overdue: "Overdue",
  void: "Void",
  refunded: "Refunded",
};

export const invoicePaymentStatusLabels: Record<InvoicePaymentStatus, string> = {
  not_started: "Not started",
  checkout_pending: "Checkout pending",
  processing: "Processing",
  paid: "Paid",
  failed: "Failed",
  cancelled: "Cancelled",
  refunded: "Refunded",
  requires_manual_reconciliation: "Requires manual reconciliation",
};

export const invoicePaymentMethodLabels: Record<InvoicePaymentMethod, string> = {
  cash: "Cash",
  bank_transfer: "Bank transfer",
  stripe_checkout: "Stripe Checkout",
  paypal_checkout: "PayPal Checkout",
  childcare_voucher: "Childcare voucher",
  other_manual: "Other manual payment",
};

export const futurePaymentRoutes = {
  adminInvoices: "/admin/invoices",
  parentInvoice: "/invoices/[invoiceReference]",
  parentPay: "/invoices/[invoiceReference]/pay",
  success: "/invoices/[invoiceReference]/success",
  cancelled: "/invoices/[invoiceReference]/cancelled",
  stripeCheckoutApi: "/api/payments/stripe/checkout",
  stripeWebhookApi: "/api/payments/stripe/webhook",
  paypalCheckoutApi: "/api/payments/paypal/checkout",
  paypalWebhookApi: "/api/payments/paypal/webhook",
} as const;
