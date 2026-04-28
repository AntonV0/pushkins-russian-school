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
enabled by default. In an unconfigured environment it validates input, returns a
clear "not configured" message, and does not send or store the submitted
details.

Reason:

- No production email provider credentials have been approved.
- Supabase table structure, row-level security, retention, staff access, and
  final privacy wording still need confirmation before storing child-related
  enquiries.

Until those decisions are made, the form returns a clear "delivery not
configured" notice in environments without storage configuration and keeps a
direct school email link visible.

## Runtime Configuration

All enquiry operational paths are opt-in.

- `ENQUIRY_STORAGE_MODE=disabled` keeps the form validation-only.
- `ENQUIRY_STORAGE_MODE=supabase` allows storage only when the Supabase browser
  URL, anon key, and table name are configured.
- `ENQUIRY_DELIVERY_MODE=disabled` is the only supported delivery mode today.
  Email delivery has hook points only; it does not send real emails.
- `ENQUIRY_RATE_LIMIT_MODE=off` disables server-side rate limiting.
- `ENQUIRY_RATE_LIMIT_MODE=memory` enables best-effort in-process limiting only
  when `ENQUIRY_RATE_LIMIT_SALT` is also set.

The in-memory limiter stores hashed request metadata and counters only. It does
not store form payloads, email addresses, names, or child details. Treat it as a
launch scaffold, not a durable production control, because serverless instances
and local development processes do not share memory.

## Optional Supabase Storage Path

The action can attempt Supabase storage only when explicitly configured with:

- `ENQUIRY_STORAGE_MODE=supabase`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Optional `SUPABASE_ENQUIRIES_TABLE` if the table is not named `enquiries`.

Do not commit these values. Local values belong in ignored environment files or
deployment-provider environment settings.

Suggested first table shape, for documentation only:

```sql
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  parent_name text not null,
  email text not null,
  phone text,
  preferred_route text not null,
  child_first_names text not null,
  child_ages text not null,
  russian_level text not null,
  enquiry_type text not null,
  message text,
  privacy_consent boolean not null default false,
  email_draft text,
  source text not null default 'website-contact-form',
  status text not null default 'new'
);
```

Recommended indexes:

- `created_at desc`
- `status`
- `preferred_route`

RLS documentation sketch:

```sql
alter table public.enquiries enable row level security;

-- Public inserts are optional. If enabled, allow only the insert fields used by
-- the server action and keep reads/updates denied to anonymous visitors.
create policy "Allow website enquiry inserts"
on public.enquiries
for insert
to anon
with check (
  privacy_consent = true
  and source = 'website-contact-form'
);

-- Staff read/update policies should be added only after the real auth provider,
-- role claims, audit logging, and retention model are approved.
```

Before enabling this path, confirm:

- Row-level security and insert policy.
- Who can read and update enquiries.
- Retention period.
- Spam/rate-limit strategy.
- Whether enquiry data should later create family records.
- Privacy notice wording.
- Whether public `anon` inserts are acceptable or whether inserts should run
  through a server-only service role in a protected route/action.

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
- Keep `ENQUIRY_DELIVERY_MODE=disabled` until sandbox and staging tests prove
  that no real emails can be sent accidentally.

## Spam Protection

The form currently includes a hidden honeypot field and an opt-in in-memory
rate-limit scaffold.

Before launch, replace or supplement the scaffold with one or more of:

- Durable rate limiting through an approved edge, Redis, database, or platform
  service.
- Turnstile or another privacy-conscious challenge.
- Server-side origin checks.
- Logging for failed validation and suspicious submissions.

Do not log full enquiry payloads. If security logging is needed, log event
types, timestamps, request IDs, and non-reversible request fingerprints only.

## Admin Inbox Shell

`/admin/enquiries` is a sample-only inbox surface. It is not connected to live
Supabase data, email delivery, staff assignment, or registration records. Its
purpose is to shape the future operations view:

- Review initial contact context.
- Triage branch or learning route fit.
- Move accepted families to the invitation-based registration workflow.
- Keep medical, safeguarding, document, emergency contact, and full registration
  details out of the initial enquiry workflow.

## Next Milestones

1. Confirm whether first launch uses Supabase storage, email delivery, or both.
2. Confirm privacy wording and retention.
3. Add the required provider/table configuration in deployment settings.
4. Test a real end-to-end enquiry in a staging deployment.
5. Connect accepted enquiries to the second-stage registration invitation flow.
