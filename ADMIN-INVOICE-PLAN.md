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
- Stripe invoice: future hosted invoice flow.
- Stripe payment link: future hosted payment link flow.

Stripe implementation should use hosted Stripe surfaces such as invoices,
Checkout, or payment links. The website should not collect card details itself.

## Decisions Still Needed

- Admin authentication provider and roles.
- Invoice numbering and reference format.
- Whether invoices are stored in Supabase, Stripe, or both.
- Whether invoice PDFs are generated locally, by Stripe, or by another service.
- Payment provider choice and whether PayPal is required.
- Data retention and audit logging rules.
- Live bank details and bank-transfer reference wording.

## Safety Notes

- Do not add `.env.local`, secrets, real invoices, customer records, child data,
  payment links, or bank details to the repo.
- Do not treat `/admin` as protected until real server-side authorization exists.
- Future admin routes must validate authorization in server components, route
  handlers, or server actions, not only through middleware/proxy.
