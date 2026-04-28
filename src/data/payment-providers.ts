export type PaymentProviderId = "stripe" | "paypal";

export type PaymentProviderStatus =
  | "recommended-first"
  | "optional-future"
  | "disabled-placeholder";

export type HostedPaymentSurface =
  | "stripe_invoicing"
  | "stripe_checkout_sessions"
  | "stripe_payment_links"
  | "paypal_checkout";

export type ProviderReadinessStatus =
  | "ready-for-planning"
  | "blocked-by-credentials"
  | "blocked-by-operations"
  | "not-in-scope";

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
  recommendedSurface?: HostedPaymentSurface;
  fallbackSurfaces: HostedPaymentSurface[];
  intendedUse: string;
  publicDescription: string;
  supportsHostedCheckout: boolean;
  supportsWallets: boolean;
  requiresFutureCredentials: boolean;
  readiness: ProviderReadinessStatus;
  notes: string[];
};

export const paymentProviders = [
  {
    id: "stripe",
    label: "Stripe",
    status: "recommended-first",
    recommendedSurface: "stripe_checkout_sessions",
    fallbackSurfaces: ["stripe_invoicing", "stripe_payment_links"],
    intendedUse:
      "Hosted online invoice payment links for card and supported wallet payments.",
    publicDescription:
      "Online invoice payment by card or supported wallet methods where available.",
    supportsHostedCheckout: true,
    supportsWallets: true,
    requiresFutureCredentials: true,
    readiness: "blocked-by-credentials",
    notes: [
      "Use Stripe Checkout Sessions for the first custom invoice payment milestone.",
      "Use Stripe Invoicing if the school wants Stripe to own invoice emails, hosted invoice pages, reminders, and invoice PDFs.",
      "Use Payment Links only for reusable or very simple fixed-price payments, not as the main per-invoice register.",
      "Enable payment methods in the Stripe Dashboard rather than hard-coding a card-only flow.",
      "Webhook handling should update invoice payment status after provider confirmation.",
    ],
  },
  {
    id: "paypal",
    label: "PayPal",
    status: "optional-future",
    fallbackSurfaces: ["paypal_checkout"],
    intendedUse:
      "Optional future online invoice payment route if parent demand justifies it.",
    publicDescription:
      "Optional PayPal checkout route, not confirmed for the first launch.",
    supportsHostedCheckout: true,
    supportsWallets: false,
    requiresFutureCredentials: true,
    readiness: "not-in-scope",
    notes: [
      "Do not block the first invoice system on PayPal.",
      "Add only after provider support, reconciliation, refunds, and admin workflow are agreed.",
    ],
  },
] satisfies PaymentProviderConfig[];

export type HostedPaymentSurfaceConfig = {
  id: HostedPaymentSurface;
  label: string;
  provider: PaymentProviderId;
  fit: "recommended" | "fallback" | "future-option";
  summary: string;
  bestFor: string[];
  watchouts: string[];
};

export const hostedPaymentSurfaces = [
  {
    id: "stripe_checkout_sessions",
    label: "Stripe Checkout Sessions",
    provider: "stripe",
    fit: "recommended",
    summary:
      "Programmatic Stripe-hosted checkout for one-off invoice payments generated from the school's invoice register.",
    bestFor: [
      "Creating one hosted checkout URL per invoice after an admin approves the invoice.",
      "Keeping the school website as the invoice source of truth while Stripe handles card and wallet collection.",
      "Mapping webhook events back to local invoice references through metadata.",
    ],
    watchouts: [
      "Requires a server route, Stripe secret key, webhook secret, and idempotent fulfillment logic before launch.",
      "Checkout Sessions expire, so the admin UI needs a regenerate-link state.",
    ],
  },
  {
    id: "stripe_invoicing",
    label: "Stripe Invoicing",
    provider: "stripe",
    fit: "fallback",
    summary:
      "Stripe-owned invoice creation, hosted invoice pages, invoice emails, reminders, and invoice PDFs.",
    bestFor: [
      "Letting Stripe own more of the billing lifecycle and parent-facing invoice page.",
      "Using Stripe automatic collection, hosted invoice page, and reminder features.",
      "Teams that prefer dashboard-first billing operations.",
    ],
    watchouts: [
      "Requires deciding whether Stripe or the website is the source of truth for invoice numbers and PDFs.",
      "Can duplicate admin work if the school also maintains a separate local invoice register.",
    ],
  },
  {
    id: "stripe_payment_links",
    label: "Stripe Payment Links",
    provider: "stripe",
    fit: "future-option",
    summary:
      "No-code or low-code hosted links for fixed products or simple reusable payment routes.",
    bestFor: [
      "Simple fixed-fee items such as an introductory course or enrolment fee.",
      "Temporary payment collection before a custom admin workflow is ready.",
    ],
    watchouts: [
      "Less suitable for unique invoice balances unless links are generated and tracked carefully.",
      "Reusable links need extra reconciliation rules so payments still match invoice references.",
    ],
  },
  {
    id: "paypal_checkout",
    label: "PayPal Checkout",
    provider: "paypal",
    fit: "future-option",
    summary:
      "Optional second provider if parent demand outweighs the operational overhead.",
    bestFor: [
      "Parents who strongly prefer PayPal.",
      "A later milestone after Stripe reconciliation is stable.",
    ],
    watchouts: [
      "Adds a second dashboard, webhook model, refund path, and reconciliation process.",
      "Not confirmed for the first online invoice payment launch.",
    ],
  },
] satisfies HostedPaymentSurfaceConfig[];

export type StripeWebhookEvent =
  | "checkout.session.completed"
  | "checkout.session.async_payment_succeeded"
  | "checkout.session.async_payment_failed"
  | "checkout.session.expired"
  | "payment_intent.processing"
  | "payment_intent.payment_failed"
  | "charge.refunded"
  | "invoice.finalized"
  | "invoice.paid"
  | "invoice.payment_failed"
  | "invoice.voided"
  | "invoice.marked_uncollectible";

export type StripeWebhookEventMapping = {
  event: StripeWebhookEvent;
  surface: HostedPaymentSurface[];
  invoiceStatus: InvoiceStatus;
  paymentStatus: InvoicePaymentStatus;
  adminMeaning: string;
};

export const stripeWebhookEventMappings = [
  {
    event: "checkout.session.completed",
    surface: ["stripe_checkout_sessions", "stripe_payment_links"],
    invoiceStatus: "paid",
    paymentStatus: "paid",
    adminMeaning:
      "Checkout completed with a paid session; mark the matching local invoice paid once totals and metadata match.",
  },
  {
    event: "checkout.session.async_payment_succeeded",
    surface: ["stripe_checkout_sessions", "stripe_payment_links"],
    invoiceStatus: "paid",
    paymentStatus: "paid",
    adminMeaning:
      "Delayed payment succeeded after checkout; close the matching invoice only once.",
  },
  {
    event: "checkout.session.async_payment_failed",
    surface: ["stripe_checkout_sessions", "stripe_payment_links"],
    invoiceStatus: "issued",
    paymentStatus: "failed",
    adminMeaning:
      "Delayed payment failed; leave the invoice open and show a follow-up state.",
  },
  {
    event: "checkout.session.expired",
    surface: ["stripe_checkout_sessions"],
    invoiceStatus: "issued",
    paymentStatus: "cancelled",
    adminMeaning:
      "Hosted checkout expired before payment; keep the invoice payable and allow a new session to be created.",
  },
  {
    event: "payment_intent.processing",
    surface: ["stripe_checkout_sessions", "stripe_payment_links"],
    invoiceStatus: "issued",
    paymentStatus: "processing",
    adminMeaning:
      "Payment is not final yet; prevent duplicate fulfillment and wait for a terminal webhook.",
  },
  {
    event: "payment_intent.payment_failed",
    surface: ["stripe_checkout_sessions", "stripe_payment_links"],
    invoiceStatus: "issued",
    paymentStatus: "failed",
    adminMeaning:
      "Payment attempt failed; keep the invoice balance open for another attempt or manual reconciliation.",
  },
  {
    event: "charge.refunded",
    surface: ["stripe_checkout_sessions", "stripe_payment_links", "stripe_invoicing"],
    invoiceStatus: "refunded",
    paymentStatus: "refunded",
    adminMeaning:
      "Stripe refund was recorded; admin review should confirm whether the local invoice is fully or partially refunded.",
  },
  {
    event: "invoice.finalized",
    surface: ["stripe_invoicing"],
    invoiceStatus: "issued",
    paymentStatus: "checkout_pending",
    adminMeaning:
      "Stripe invoice is finalized and ready for the hosted invoice page or email workflow.",
  },
  {
    event: "invoice.paid",
    surface: ["stripe_invoicing"],
    invoiceStatus: "paid",
    paymentStatus: "paid",
    adminMeaning:
      "Stripe invoice was paid; mark the local invoice paid once the invoice reference matches.",
  },
  {
    event: "invoice.payment_failed",
    surface: ["stripe_invoicing"],
    invoiceStatus: "issued",
    paymentStatus: "failed",
    adminMeaning:
      "Stripe invoice payment failed; keep the local invoice open and surface an admin follow-up state.",
  },
  {
    event: "invoice.voided",
    surface: ["stripe_invoicing"],
    invoiceStatus: "void",
    paymentStatus: "cancelled",
    adminMeaning:
      "Stripe invoice was voided; local invoice should be voided only after an admin confirms the same business decision.",
  },
  {
    event: "invoice.marked_uncollectible",
    surface: ["stripe_invoicing"],
    invoiceStatus: "overdue",
    paymentStatus: "requires_manual_reconciliation",
    adminMeaning:
      "Stripe marked the invoice uncollectible; keep a local review state for business approval.",
  },
] satisfies StripeWebhookEventMapping[];

export type StripeInvoiceProviderStatus =
  | "draft"
  | "open"
  | "paid"
  | "void"
  | "uncollectible";

export const stripeInvoiceStatusMappings: Record<
  StripeInvoiceProviderStatus,
  {
    invoiceStatus: InvoiceStatus;
    paymentStatus: InvoicePaymentStatus;
    label: string;
  }
> = {
  draft: {
    invoiceStatus: "draft",
    paymentStatus: "not_started",
    label: "Stripe draft invoice",
  },
  open: {
    invoiceStatus: "issued",
    paymentStatus: "checkout_pending",
    label: "Stripe invoice open",
  },
  paid: {
    invoiceStatus: "paid",
    paymentStatus: "paid",
    label: "Stripe invoice paid",
  },
  void: {
    invoiceStatus: "void",
    paymentStatus: "cancelled",
    label: "Stripe invoice void",
  },
  uncollectible: {
    invoiceStatus: "overdue",
    paymentStatus: "requires_manual_reconciliation",
    label: "Stripe invoice uncollectible",
  },
};

export const paymentEnvironmentPlaceholders = [
  {
    name: "STRIPE_SECRET_KEY",
    scope: "server",
    purpose: "Create Checkout Sessions, Stripe invoices, or payment links from secure server code.",
  },
  {
    name: "STRIPE_WEBHOOK_SECRET",
    scope: "server",
    purpose: "Verify Stripe webhook signatures before updating invoice status.",
  },
  {
    name: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    scope: "browser",
    purpose: "Only needed if a future client-side Stripe surface is added.",
  },
  {
    name: "PAYPAL_CLIENT_ID",
    scope: "server",
    purpose: "Optional future PayPal setup; not required for the Stripe-first milestone.",
  },
  {
    name: "PAYPAL_CLIENT_SECRET",
    scope: "server",
    purpose: "Optional future PayPal setup; keep server-only.",
  },
  {
    name: "PAYPAL_WEBHOOK_ID",
    scope: "server",
    purpose: "Optional future PayPal webhook verification.",
  },
] as const;

export const hostedPaymentReadinessItems = [
  {
    label: "Provider decision",
    status: "Stripe Checkout preferred",
    detail: "Use Stripe-hosted checkout first unless the school wants Stripe to own invoicing.",
  },
  {
    label: "Credentials",
    status: "Not included",
    detail: "Add only through ignored local env files or deployment environment settings.",
  },
  {
    label: "Bank details",
    status: "Centralized elsewhere",
    detail: "Do not duplicate or invent bank account values in provider config.",
  },
  {
    label: "Webhooks",
    status: "Planned",
    detail: "Treat webhooks as authoritative for paid, failed, refunded, and expired states.",
  },
  {
    label: "Wallets",
    status: "Dashboard-controlled",
    detail: "Apple Pay and Google Pay should be enabled through Stripe where supported.",
  },
  {
    label: "PayPal",
    status: "Optional",
    detail: "Model as a later provider, not a launch blocker.",
  },
] as const;

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
