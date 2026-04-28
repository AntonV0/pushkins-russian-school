# Payment Architecture Notes

This note prepares future invoice payments without adding credentials, calling
external APIs, or committing real invoices/customer data.

## Current Direction

Pushkin's School should move away from manually created PDF invoices as the
primary workflow. The target model is:

- Admin creates or edits an invoice in the protected school admin workflow.
- Each invoice has a stable reference for bank-transfer reconciliation.
- Cash and bank-transfer payments can be marked manually.
- Online payment uses a provider-hosted payment page when available.
- Stripe is the likely default provider for online invoice payment.
- PayPal remains optional and unconfirmed.

Bank details are intentionally not included here. They should stay centralized
and only be published after final verification.

## Product Surface Recommendation

Recommended first build: **Stripe Checkout Sessions** for one-off invoice
payments.

Why this fits the school workflow:

- The website can keep a school-owned invoice register, invoice reference, and
  admin audit trail.
- Each approved invoice can create one Stripe-hosted Checkout Session for the
  exact outstanding balance.
- Stripe collects card details on its hosted page; the school website does not.
- Apple Pay and Google Pay can appear through Stripe where the account, payment
  method settings, customer device, browser, currency, and region support them.
- Webhooks can update local invoice payment status after Stripe confirms the
  terminal payment state.

Use **Stripe Invoicing** instead if the school wants Stripe to own invoice
emails, hosted invoice pages, reminder emails, automatic collection settings, and
invoice PDFs. This is a strong fallback, but it requires a clearer decision
about whether Stripe or the website is the source of truth for invoice numbers,
PDFs, and parent-facing invoice history.

Use **Stripe Payment Links** only for simple fixed-price or reusable payments,
such as an introductory course or annual enrolment fee. Payment Links are less
natural for unique invoice balances unless every generated link is carefully
matched back to the local invoice reference.

## Stripe-Only Option

Stripe-only is the recommended default for the first online payment milestone.

Practical benefits:

- One provider to configure, test, support, and reconcile.
- Stripe Checkout can handle payment collection through a hosted payment page.
- Wallet methods such as Apple Pay and Google Pay can be available where the
  Stripe account, device, browser, and region support them.
- Webhooks can update invoice status after successful or failed payment.
- The admin invoice model can store one provider payment reference and one
  checkout URL.

Practical tradeoffs:

- Families who strongly prefer PayPal would not have that route at launch.
- The school still needs manual reconciliation for cash and bank transfer.
- Stripe account setup, verification, webhook secrets, and production go-live
  checks remain future operational tasks.

Recommended first implementation:

- Use Stripe Checkout Sessions for one-off invoice payment links.
- Avoid custom card forms for the first version.
- Enable payment methods in the Stripe Dashboard rather than hard-coding a
  narrow card-only list.
- Store the local invoice reference in Stripe metadata so webhooks can safely
  reconcile the payment to one school invoice.
- Keep invoice PDFs separate from Checkout unless the admin workflow later needs
  generated PDFs.

## Implementation Shape

No Stripe APIs should be called until credentials, admin authorization, and
storage are approved. The safe implementation sequence is:

1. Finalize invoice numbering and reference format.
2. Add authenticated admin storage for invoices, line items, payment method,
   provider references, status history, and audit events.
3. Add a server-only Stripe client behind environment variables.
4. Add a `POST /api/payments/stripe/checkout` route that creates a Checkout
   Session only for an authorized, issued invoice with a positive balance.
5. Include local invoice ID, invoice reference, and expected amount in Stripe
   metadata.
6. Add a Stripe webhook route that verifies signatures and updates invoices
   idempotently.
7. Add success and cancelled parent routes that read local state; do not rely on
   the redirect alone as payment proof.

## Webhook Event Mapping

For Checkout Sessions and Payment Links:

- `checkout.session.completed`: mark paid only after matching metadata and
  expected amount.
- `checkout.session.async_payment_succeeded`: mark paid for delayed methods.
- `checkout.session.async_payment_failed`: keep issued and show failed payment
  follow-up.
- `checkout.session.expired`: keep issued and allow a new session.
- `payment_intent.processing`: show processing and prevent duplicate payment
  actions.
- `payment_intent.payment_failed`: keep issued and show failed payment follow-up.
- `charge.refunded`: move to a refund review state before closing locally.

For Stripe Invoicing:

- `invoice.finalized`: mark issued with hosted payment pending.
- `invoice.paid`: mark paid after matching the school invoice reference.
- `invoice.payment_failed`: keep issued and show failed payment follow-up.
- `invoice.voided`: void locally only after the same admin decision is confirmed.
- `invoice.marked_uncollectible`: keep a manual review state for business
  approval.

The source-of-truth mappings live in `src/data/payment-providers.ts` so future UI
and route handlers can share the same labels and planning states.

## Stripe Plus PayPal Option

Stripe plus PayPal can be considered later if parent demand justifies the extra
support burden.

Practical benefits:

- Gives families a familiar PayPal route.
- May improve conversion for parents who do not want to enter card details.

Practical tradeoffs:

- Two provider dashboards, webhook flows, payout records, refunds, and support
  paths.
- More complex invoice status reconciliation.
- More edge cases in admin UI, reporting, and customer communication.
- Requires clear rules for which provider owns fees, refunds, disputes, and
  payment links.

Recommendation:

- Do not block the first invoice system on PayPal.
- Model PayPal as an optional future provider so the data shape does not need a
  rewrite.

## Proposed Invoice Payment States

The admin invoice model should distinguish invoice lifecycle from payment
provider lifecycle.

Suggested invoice statuses:

- `draft`: invoice is being prepared and should not be sent.
- `issued`: invoice has been sent or is ready for payment.
- `partially_paid`: one or more payments recorded, balance remains.
- `paid`: full invoice amount has been recorded.
- `overdue`: due date passed and balance remains.
- `void`: invoice cancelled before payment.
- `refunded`: invoice was paid and later refunded.

Suggested payment statuses:

- `not_started`: no payment attempt or manual payment recorded.
- `checkout_pending`: online checkout link created but not paid.
- `processing`: provider has a payment in progress or manual review is needed.
- `paid`: payment confirmed.
- `failed`: online attempt failed.
- `cancelled`: checkout abandoned or payment cancelled.
- `refunded`: payment returned.
- `requires_manual_reconciliation`: cash or bank-transfer record needs admin
  review.

Suggested payment methods:

- `cash`
- `bank_transfer`
- `stripe_checkout`
- `paypal_checkout`
- `childcare_voucher`
- `other_manual`

## Future Route and Config Names

These names are placeholders for future workers. They do not exist yet.

Admin routes:

- `/admin/invoices`
- `/admin/invoices/new`
- `/admin/invoices/[invoiceId]`
- `/admin/invoices/[invoiceId]/payments`

Public or parent payment routes:

- `/invoices/[invoiceReference]`
- `/invoices/[invoiceReference]/pay`
- `/invoices/[invoiceReference]/success`
- `/invoices/[invoiceReference]/cancelled`

Server/API routes:

- `/api/payments/stripe/checkout`
- `/api/payments/stripe/webhook`
- `/api/payments/paypal/checkout`
- `/api/payments/paypal/webhook`

Future environment variable names:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_WEBHOOK_ID`

Do not add these values to the repository. Local values belong in ignored
environment files or deployment-provider environment settings.

`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is only needed if a future client-side
Stripe surface is added. A pure redirect-to-hosted-Checkout flow can usually keep
Stripe work server-side.

## Coordinator Notes

Decisions still needed:

- Whether Stripe-only is approved for the first launch.
- Whether PayPal is required, optional, or out of scope.
- Invoice numbering pattern and required reference format.
- Whether invoices need generated PDFs at launch.
- Whether online payment fees are absorbed by the school or surfaced in prices.
- Refund, cancellation, and dispute process ownership.
- Admin authentication and role model.
