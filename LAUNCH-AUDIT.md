# Launch Readiness Audit

Public-safe audit for the Pushkin's School rebuild. This document avoids private
business records, raw screenshots, unpublished staff/client details, credentials,
and unreviewed policy text.

## Audit Scope

Routes reviewed:

- `/`
- `/about`
- `/schools`
- `/schools/[slug]`
- `/curriculum`
- `/admissions`
- `/faq`
- `/policies`
- `/gallery`
- `/contact`
- `/admin`
- `/admin/invoices`
- `/admin/enquiries`
- `/admin/registrations`
- `/admin/registrations/[id]`
- `/register/sample-token`

Supporting files reviewed:

- `src/data/*`
- `src/components/site/*`
- `src/components/admin/*`
- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/manifest.ts`
- `src/app/opengraph-image.tsx`
- `README.md`
- `PROJECT-DECISIONS.md`
- `CONTENT-VERIFICATION.md`
- admin, enquiry, registration, payment, and asset workflow docs

## Highest-Impact Findings

1. Public fee values needed stronger gating.
   The unresolved business decisions say exact fees and payment details are not
   confirmed for public display, but `/admissions`, `/contact`, and school detail
   pages displayed legacy GBP amounts from shared data. Public UI should show
   fee categories and confirmation wording until current amounts are approved.

2. The parent journey is structurally strong.
   Home, schools, school detail, admissions, curriculum, and contact routes
   provide a clear path from comparison to enquiry. Closed and online/status
   branches already route families toward register-interest, Volna, or GCSE
   alternatives without deleting useful local pages.

3. Some public copy was more audit-like than parent-facing.
   Several high-visibility sections used "pending", "verification", "source
   uncertainty", or "not configured" language. The underlying caution is right,
   but prominent parent copy should stay confident and route operational detail
   into docs, data notes, or lower-priority page sections.

4. Admin and registration prototypes are appropriately non-operational.
   `/admin`, invoices, enquiries, registrations, registration details, and
   `/register/sample-token` consistently say they use sample data and have no
   live auth, storage, email, portal, payment, or sensitive records. Navigation
   between admin surfaces is present and recruiter-friendly.

5. Accessibility foundations are good with small polish opportunities.
   The site has skip navigation, semantic headings, table captions, form labels,
   form errors, focus rings, and scrollable comparison tables. The main table
   scroll region is keyboard focusable. Ongoing QA should still check mobile text
   wrapping, repeated card density, and color contrast in muted text on colored
   backgrounds.

6. Technical launch basics are in place.
   Metadata, canonical URLs, JSON-LD, sitemap, robots, manifest, generated OG
   image, static params for dynamic school/gallery/policy routes, and noindex
   admin/registration prototype metadata are present. Admin routes are still
   accessible as prototypes, so robots/noindex is helpful but not a security
   measure.

## Public Parent Journey

Working well:

- Homepage presents Pushkin's School clearly and routes to schools or enquiry.
- `/schools` gives a useful open/online/closed comparison and a horizontal table.
- School detail pages have status badges, venue/timetable blocks, enquiry CTAs,
  related schools, and alternatives for non-open locations.
- `/curriculum` and `/admissions` both route naturally to school choice and
  contact.
- Closed and online/status branches retain full pages and include alternative
  learning routes instead of dead ends.

Safe improvements:

- Keep the main CTA language consistent: "Start an enquiry", "Ask about places",
  and "Register interest" should map to actual intent.
- Reduce phrases like "pending status" in parent-facing CTA sections. Use
  "not currently open", "future local classes", or "status to confirm" instead.
- Keep branch-level source notes, but make them feel like practical checks rather
  than a public audit log.

## Content And Trust

Working well:

- Unverified testimonials, founding year, partnerships, staff bios/photos, and
  exam outcomes are gated in data rather than published as claims.
- Policy and gallery routes clearly avoid publishing unreviewed documents or raw
  source screenshots.
- Trust signals use publishable structure instead of unsupported proof points.

Risks:

- Fee amounts should not be public until confirmed.
- Bank details should remain private until exact values and payment workflow are
  approved.
- Public copy should not overexpose implementation status, especially around
  enquiry storage/delivery configuration.

## Admin And Prototype Areas

Working well:

- Admin routes say they are non-operational planning surfaces.
- Sample records use labels and invalid example-style details rather than real
  family data.
- Invoice, enquiry, and registration surfaces link back to the admin overview.
- The sample registration invitation route does not echo, validate, decode, or
  store the token.

Launch blocker:

- Real admin must not go live until server-side auth, roles, RLS, audit logging,
  retention, and privacy decisions are implemented and tested.

## Accessibility And UX

Working well:

- Form fields are labelled and required fields preserve values after validation.
- Validation errors are announced with `role="alert"`.
- The school comparison table has a caption, column scopes, and a keyboard
  focusable scroll region.
- Links and buttons generally have clear targets and visible focus states.
- Long email text uses wrapping.

Follow-up QA:

- Run browser checks at mobile widths for the header menu, comparison table,
  school cards, admin tables, and form footer.
- Check muted text contrast on deep-blue sections.
- Confirm repeated cards do not dominate pages once approved photos are added.

## Technical Launch Quality

Working well:

- App Router route structure is coherent.
- Sitemap includes static routes, schools, policies, and gallery years.
- Robots disallows `/api/`; admin and registration prototype metadata noindexes
  those route groups.
- Manifest and Open Graph image exist.
- Supabase helpers are present for future work without live writes by default.

Follow-up QA:

- Consider whether `/admin/*` should be blocked at middleware or deployment
  level before public launch, even though it is noindexed.
- Confirm `siteConfig.url` matches the final production domain.
- Re-run verification after any final content import or payment/enquiry config.

## Remaining Business Decisions

- Current branch statuses, venues, and timetables.
- Exact fee values, discounts, payment methods, and bank details.
- Reviewed policy PDFs, owners, versions, review dates, and download behavior.
- Approved public photos and captions.
- Founding/opening year, testimonials, partnerships, staff bios/photos, and exam
  outcomes.
- Live enquiry delivery/storage, admin auth, Supabase RLS, payment credentials,
  registration data retention, and privacy wording.

## Recommended Prelaunch Checks

Run before opening a PR or handing to business review:

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

Then visually check:

- `/`
- `/schools`
- `/schools/high-wycombe`
- `/schools/chelmsford`
- `/curriculum`
- `/admissions`
- `/contact`
- `/admin`
- `/admin/enquiries`
- `/admin/registrations`
- `/policies`
- `/gallery`
