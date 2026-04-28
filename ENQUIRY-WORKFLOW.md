# Initial Enquiry Workflow

This document describes the lightweight public enquiry flow. It is safe for the
public repository because it contains implementation intent only, not real
parent, child, staff, medical, safeguarding, or payment records.

## Current Implementation

The contact form submits through a Next.js Server Action:

- `src/app/contact/actions.ts`
- `src/components/site/enquiry-form.tsx`
- `src/data/enquiries.ts`

The form validates:

- Parent or carer name.
- Email address.
- Optional phone number.
- Preferred school branch or related learning route.
- Child first name or children's first names.
- Child age or ages.
- Current Russian level.
- Enquiry type.
- Optional message.
- Consent that the form is only an initial enquiry.

The form deliberately does not collect:

- Medical details.
- Safeguarding information.
- Emergency contacts.
- Full addresses.
- Full registration data.
- Documents or uploads.
- Payment details.

Those belong in the later invitation-based registration workflow described in
`REGISTRATION-WORKFLOW.md`.

## Delivery and Storage Status

The Server Action validates the enquiry now, but live delivery/storage is not
enabled by default.

Reason:

- No production email provider credentials have been approved.
- Supabase table structure, row-level security, retention, staff access, and
  final privacy wording still need confirmation before storing child-related
  enquiries.

Until those decisions are made, the form returns a clear "delivery not
configured" notice in environments without storage configuration and keeps a
direct school email link visible.

## Optional Supabase Storage Path

The action can attempt Supabase storage only when explicitly configured with:

- `ENQUIRY_STORAGE_MODE=supabase`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Optional `SUPABASE_ENQUIRIES_TABLE` if the table is not named `enquiries`.

Do not commit these values. Local values belong in ignored environment files or
deployment-provider environment settings.

Suggested first table fields:

- `id`
- `created_at`
- `parent_name`
- `email`
- `phone`
- `preferred_route`
- `child_first_names`
- `child_ages`
- `russian_level`
- `enquiry_type`
- `message`
- `privacy_consent`
- `source`
- `status`

Before enabling this path, confirm:

- Row-level security and insert policy.
- Who can read and update enquiries.
- Retention period.
- Spam/rate-limit strategy.
- Whether enquiry data should later create family records.
- Privacy notice wording.

## Email Delivery Path

If email delivery is preferred before database storage, add a provider such as
Resend or another approved transactional email service later.

Implementation rules:

- Initialize provider SDKs lazily inside server-only functions.
- Store provider secrets only in ignored local env files or deployment env
  settings.
- Send the school a structured enquiry email.
- Optionally send the parent a short acknowledgement without repeating sensitive
  content.
- Keep the direct email fallback visible until production delivery is verified.

## Spam Protection

The form currently includes a hidden honeypot field. Before launch, add one or
more of:

- Rate limiting.
- Turnstile or another privacy-conscious challenge.
- Server-side origin checks.
- Logging for failed validation and suspicious submissions.

## Next Milestones

1. Confirm whether first launch uses Supabase storage, email delivery, or both.
2. Confirm privacy wording and retention.
3. Add the required provider/table configuration in deployment settings.
4. Test a real end-to-end enquiry in a staging deployment.
5. Connect accepted enquiries to the second-stage registration invitation flow.
