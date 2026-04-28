import { schools } from "./schools";

export type InvoicePaymentStatus =
  | "draft"
  | "sent"
  | "part-paid"
  | "paid"
  | "overdue"
  | "void";

export type InvoicePaymentMethod =
  | "not-selected"
  | "cash"
  | "bank-transfer"
  | "stripe-invoice"
  | "stripe-payment-link"
  | "childcare-voucher"
  | "other";

export type InvoiceLineItem = {
  id: string;
  description: string;
  quantity: number;
  unitAmountPence: number;
};

export type InvoiceProviderLinks = {
  stripeCustomerId?: string;
  stripeInvoiceId?: string;
  stripeCheckoutSessionId?: string;
  hostedInvoiceUrl?: string;
  paymentLinkUrl?: string;
};

export type SchoolInvoice = {
  id: string;
  reference: string;
  customerLabel: string;
  studentLabel: string;
  schoolSlug: string;
  issueDate: string;
  dueDate: string;
  paymentStatus: InvoicePaymentStatus;
  paymentMethod: InvoicePaymentMethod;
  lineItems: InvoiceLineItem[];
  amountPaidPence: number;
  notes?: string[];
  providerLinks?: InvoiceProviderLinks;
};

export const invoicePaymentStatusMeta: Record<
  InvoicePaymentStatus,
  { label: string; description: string; tone: "neutral" | "info" | "success" | "warning" | "danger" }
> = {
  draft: {
    label: "Draft",
    description: "Prepared internally and not yet sent to the parent.",
    tone: "neutral",
  },
  sent: {
    label: "Sent",
    description: "Shared with the parent and awaiting payment.",
    tone: "info",
  },
  "part-paid": {
    label: "Part paid",
    description: "A manual payment has been recorded against the invoice.",
    tone: "warning",
  },
  paid: {
    label: "Paid",
    description: "Marked as paid after manual confirmation or provider webhook.",
    tone: "success",
  },
  overdue: {
    label: "Overdue",
    description: "Past due date and still awaiting payment.",
    tone: "danger",
  },
  void: {
    label: "Void",
    description: "Cancelled internally and excluded from active follow-up.",
    tone: "neutral",
  },
};

export const invoicePaymentMethodMeta: Record<
  InvoicePaymentMethod,
  { label: string; description: string; manual: boolean; online: boolean }
> = {
  "not-selected": {
    label: "Not selected",
    description: "Payment route has not been chosen yet.",
    manual: false,
    online: false,
  },
  cash: {
    label: "Cash",
    description: "Recorded manually by an admin after receiving cash.",
    manual: true,
    online: false,
  },
  "bank-transfer": {
    label: "Bank transfer",
    description:
      "Recorded manually after matching the transfer reference to the invoice.",
    manual: true,
    online: false,
  },
  "stripe-invoice": {
    label: "Stripe invoice",
    description:
      "Future hosted invoice flow with card and wallet options configured in Stripe.",
    manual: false,
    online: true,
  },
  "stripe-payment-link": {
    label: "Stripe payment link",
    description:
      "Future hosted payment link flow for simple one-off invoice payments.",
    manual: false,
    online: true,
  },
  "childcare-voucher": {
    label: "Childcare voucher",
    description: "Recorded manually once voucher payment is confirmed.",
    manual: true,
    online: false,
  },
  other: {
    label: "Other",
    description: "Admin-only fallback for exceptional payment routes.",
    manual: true,
    online: false,
  },
};

export const invoiceReferenceGuidance = {
  prefix: "PRS",
  example: "PRS-2026-0001",
  summary:
    "Use a short unique reference on every invoice so bank transfers, cash notes, and future Stripe records can be matched reliably.",
};

export const invoiceWorkflowNotes = [
  "This foundation uses sample-only invoice records and does not contain real customer, child, or payment data.",
  "Manual cash, bank transfer, childcare voucher, and other payments should be marked by an authenticated admin only after confirmation.",
  "Future Stripe work should use hosted invoices, hosted Checkout, or payment links rather than collecting card details on the school website.",
  "Authentication, admin roles, invoice numbering, retention rules, and PDF format still need business decisions before live use.",
];

export const sampleInvoices: SchoolInvoice[] = [
  {
    id: "sample-invoice-001",
    reference: "PRS-2026-0001",
    customerLabel: "Sample Parent A",
    studentLabel: "Sample Student A",
    schoolSlug: "high-wycombe",
    issueDate: "2026-04-20",
    dueDate: "2026-05-04",
    paymentStatus: "sent",
    paymentMethod: "bank-transfer",
    amountPaidPence: 0,
    lineItems: [
      {
        id: "term-1",
        description: "Term tuition",
        quantity: 1,
        unitAmountPence: 39000,
      },
      {
        id: "enrolment",
        description: "Annual enrolment fee",
        quantity: 1,
        unitAmountPence: 3000,
      },
    ],
    notes: [
      "Sample record only.",
      "Bank transfer reference should match the invoice reference.",
    ],
  },
  {
    id: "sample-invoice-002",
    reference: "PRS-2026-0002",
    customerLabel: "Sample Parent B",
    studentLabel: "Sample Student B",
    schoolSlug: "bracknell",
    issueDate: "2026-04-18",
    dueDate: "2026-05-02",
    paymentStatus: "part-paid",
    paymentMethod: "cash",
    amountPaidPence: 4500,
    lineItems: [
      {
        id: "single-day",
        description: "Single school day",
        quantity: 2,
        unitAmountPence: 4500,
      },
    ],
    notes: ["Sample record only.", "Cash received manually for one session."],
  },
  {
    id: "sample-invoice-003",
    reference: "PRS-2026-0003",
    customerLabel: "Sample Parent C",
    studentLabel: "Sample Student C",
    schoolSlug: "chelmsford",
    issueDate: "2026-04-22",
    dueDate: "2026-05-06",
    paymentStatus: "draft",
    paymentMethod: "stripe-invoice",
    amountPaidPence: 0,
    lineItems: [
      {
        id: "intro-course",
        description: "Three-week introductory course",
        quantity: 1,
        unitAmountPence: 9000,
      },
    ],
    notes: [
      "Sample record only.",
      "Stripe fields are intentionally empty until provider setup is approved.",
    ],
    providerLinks: {},
  },
];

export function formatCurrencyFromPence(amountPence: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amountPence / 100);
}

export function getInvoiceTotal(invoice: SchoolInvoice) {
  return invoice.lineItems.reduce(
    (total, item) => total + item.quantity * item.unitAmountPence,
    0,
  );
}

export function getInvoiceBalance(invoice: SchoolInvoice) {
  return Math.max(getInvoiceTotal(invoice) - invoice.amountPaidPence, 0);
}

export function getInvoiceSchool(invoice: SchoolInvoice) {
  return schools.find((school) => school.slug === invoice.schoolSlug);
}

export const invoiceSummary = {
  totalInvoices: sampleInvoices.length,
  totalOutstandingPence: sampleInvoices.reduce(
    (total, invoice) => total + getInvoiceBalance(invoice),
    0,
  ),
  manualPaymentCount: sampleInvoices.filter(
    (invoice) => invoicePaymentMethodMeta[invoice.paymentMethod].manual,
  ).length,
  onlineReadyCount: sampleInvoices.filter(
    (invoice) => invoicePaymentMethodMeta[invoice.paymentMethod].online,
  ).length,
};
