# Admin Security Architecture

This document is safe for the public portfolio repository. It contains no
secrets, real staff records, parent records, child records, invoices, bank
details, or unpublished policy material.

## Current Admin Surface

Routes audited on 2026-04-28:

- `/admin`: visible planning shell for future internal tools.
- `/admin/invoices`: sample invoice register with disabled operational controls.

The current admin routes are prototypes. They are not authenticated, do not load
live admin data, and must not be described to users as secure until server-side
authorization is implemented.

Current Supabase helper files:

- `src/lib/supabase/env.ts`: validates public Supabase URL and anon key only.
- `src/lib/supabase/server.ts`: lazily creates a server Supabase client from
  request cookies and the anon key.
- `src/lib/supabase/client.ts`: creates a browser Supabase client from public
  environment variables.

Current live Supabase usage is limited to the contact enquiry server action when
`ENQUIRY_STORAGE_MODE=supabase` and the public Supabase environment variables
are configured. The admin shell does not currently query Supabase.

## Access Boundary

`src/lib/admin/access.ts` defines the first guard boundary for admin work:

- `AdminRole` lists the planned roles.
- `AdminAccessScope` names protected admin areas.
- `adminAccessRequirements` maps each area to roles that may access it later.
- `getAdminAccessDecision(scope)` currently returns `allowed: false` with
  `mode: "prototype"` and the required role list so the UI can be honest about
  the current state.
- `assertAuthorizedAdmin(decision)` is the future fail-closed assertion to call
  before enabling server actions, route handlers, or live data reads.

Future admin pages should call the access helper from a Server Component, Route
Handler, or Server Action before reading private data or performing mutations.
Client-side checks may improve UX, but they must never be the authorization
source of truth.

## Recommended Auth Provider Path

Because the project already uses Supabase helpers, the simplest future path is:

- Use Supabase Auth for admin sessions.
- Store admin profile metadata in a private `admin_users` table keyed by auth
  user id.
- Store roles in server-readable data, not in client-controlled form fields.
- Enable Row Level Security on every admin data table.
- Keep service-role keys out of browser code and out of the repository.
- Use Supabase Auth hooks, policies, or database triggers only after reviewing
  the impact on real parent, child, and payment data.

If the school later chooses another identity provider, use the same application
boundary: exchange the provider identity for a trusted server-side role lookup,
then keep Supabase access behind RLS and server-side authorization checks.

## Planned Roles

- `owner`: full access to configuration, users, invoices, payments, audit logs,
  and exceptional corrections.
- `finance`: invoice creation, payment reconciliation, refunds, payment-provider
  records, and invoice audit history.
- `operations`: admissions, registration follow-up, class logistics, and
  parent communications that do not expose payment operations.
- `viewer`: read-only access to approved operational dashboards.

Use least privilege. A user should receive only the roles needed for their
current work, and every role change should be auditable.

## Server-Side Authorization Rules

- Default every admin route, server action, and route handler to deny.
- Validate the session and role on the server for every private read.
- Re-check authorization on every mutation, even if the page already checked it.
- Scope reads by role and business purpose; do not return broad datasets to the
  browser and rely on UI filtering.
- Never use hardcoded passwords, shared admin links, or fake login forms.
- Never store secrets or service-role credentials in `NEXT_PUBLIC_*` variables.
- Keep admin data out of static generation and public JSON.
- Treat payment actions, invoice edits, refunds, contact exports, and child data
  access as high-risk operations that require explicit role checks.

## Why Middleware Or Proxy Alone Is Not Enough

Middleware/proxy can redirect unauthenticated visitors early and improve the
navigation experience, but it is not a complete authorization layer. It can be
misconfigured, skipped for some execution paths, or bypassed by future route
handlers and server actions if those handlers trust the redirect alone.

Use middleware/proxy only as a first gate. The real permission decision must be
repeated where private data is read or changed: Server Components, Server
Actions, Route Handlers, and database policies.

## Audit Logging Requirements

Before `/admin` becomes live, record an append-only audit event for:

- Sign-in, sign-out, failed sign-in, and session revocation.
- Role grants, role removals, and account disablement.
- Invoice creation, edits, status changes, PDF generation, and deletion/voiding.
- Manual payment reconciliation and hosted payment link creation.
- Refunds, payment disputes, and provider webhook events.
- Registration record reads, edits, exports, and deletion requests.
- Access to sensitive parent, child, contact, payment, or safeguarding fields.
- Configuration changes and environment/provider mode changes.

Each event should include time, actor user id, actor role, action, resource type,
resource id, request id or correlation id, result, and a minimal before/after
summary for changed fields. Do not log full free-text messages, bank details,
card data, or unnecessary child data.

## Before Going Live

- Add real authentication and server-side role lookup.
- Replace prototype admin data with guarded server reads.
- Add RLS policies and test them independently from the UI.
- Add audit logging before enabling any mutation.
- Add rate limiting and alerting for admin auth failures.
- Review privacy, retention, and safeguarding requirements with the school.
- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
