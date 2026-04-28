# Admin Invoice Foundation

This note documents the first admin invoice foundation. It is safe for the
public portfolio repository and intentionally contains no real parent, child,
invoice, bank, or payment-provider data.

## Current Scope

- `/admin` is a visible planning shell, not a secured admin product.
- `/admin/invoices` shows a polished non-operational invoice register.
- `src/data/invoices.ts` models invoice records, line items, payment statuses,
  payment methods, manual payment routes, and future Stripe provider references.
- Sample invoice data uses placeholder labels only.
- All live actions are disabled until authentication, storage, and payment
  decisions are made.

## Supported Payment Routes

- Cash: recorded manually after receiving payment.
- Bank transfer: recorded manually after matching the invoice reference.
- Childcare voucher: recorded manually after confirmation.
- Stripe Checkout Session: recommended first hosted payment route for a
  school-owned invoice register.
- Stripe Invoicing: fallback if the school wants Stripe to own invoice emails,
  hosted invoice pages, reminders, and PDFs.
- Stripe Payment Link: future option for simple fixed-fee items, not the main
  per-invoice workflow.

Stripe implementation should use hosted Stripe surfaces such as invoices,
Checkout, or payment links. The website should not collect card details itself.
Apple Pay and Google Pay should be enabled through Stripe where supported rather
than hard-coded into the website.

## Hosted Payment Readiness

The safe admin sequence is:

1. Keep draft invoices local and non-payable.
2. Issue an invoice only after admin review.
3. Create a hosted Stripe Checkout Session for the exact outstanding balance.
4. Store Stripe customer, session, payment intent, and hosted URL references
   without exposing secret values.
5. Treat Stripe webhooks as the payment authority; success redirects are only a
   parent-facing confirmation path.
6. Reconcile cash, bank transfer, and childcare voucher payments manually against
   the same invoice reference.

Future disabled UI states should distinguish:

- Provider setup required.
- Hosted link ready.
- Hosted link expired.
- Payment processing.
- Paid by webhook.
- Manual reconciliation required.
- Refund review required.

## Decisions Still Needed

- Admin authentication provider and roles.
- Invoice numbering and reference format.
- Whether invoices are stored in Supabase, Stripe, or both.
- Whether invoice PDFs are generated locally, by Stripe, or by another service.
- Payment provider choice and whether PayPal is required.
- Data retention and audit logging rules.
- Live bank details and bank-transfer reference wording.
- Whether Stripe Checkout or Stripe Invoicing owns the parent-facing invoice
  page for launch.
- Whether partial payments are allowed online or only through manual
  reconciliation.
- Refund, cancellation, and dispute ownership.

## Safety Notes

- Do not add `.env.local`, secrets, real invoices, customer records, child data,
  payment links, or bank details to the repo.
- Do not treat `/admin` as protected until real server-side authorization exists.
- Future admin routes must validate authorization in server components, route
  handlers, or server actions, not only through middleware/proxy.
- Keep bank details in the existing centralized payment content and do not invent
  account numbers, sort codes, or payment instructions in payment provider data.
