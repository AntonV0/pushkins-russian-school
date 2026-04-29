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

## Deep Audit Update - 2026-04-29

This pass rechecked the tracked site against the ignored local source audit,
source screenshot inventory, and public-safe planning notes. Raw source material
was used only for comparison; no private screenshots, policy bodies, bank
details, staff/client data, or unreviewed business copy were copied into tracked
content.

### Highest-Impact Findings From This Pass

1. The biggest launch blocker is still business verification, not code shape.
   The original site contains useful depth around school history, branch pages,
   lesson structures, policies, galleries, prices, calendars, payment notes, and
   contact details, but most of that material is stale or approval-sensitive.

2. The current public journey is coherent and conversion-oriented, especially
   from `/`, `/schools`, `/schools/bracknell`, `/admissions`, and `/contact`.
   Online-only areas now feel intentional when the wording avoids showing old
   venue and timetable details as if they are current.

3. The site still needs more approved proof before it can feel fully established:
   founding year, approved photos, policy PDFs, testimonials, staff/teacher
   credibility, partnership wording, and exam outcomes are all withheld for good
   reasons but leave the public experience lighter than the original.

4. Admin prototypes remain clearly non-operational and recruiter-friendly. The
   main prelaunch concern is exposure, not behavior: admin and invitation
   prototype routes should stay noindexed, blocked from robots, and protected or
   removed before a real public launch.

5. Technical launch foundations are solid. Metadata, route generation, sitemap,
   JSON-LD, robots, manifest, OG image, and data-driven content structures are in
   place. The remaining technical risk is stale wording after business decisions
   change.

### Original-Site Content Missing Or Incomplete

- School history and mission: the rebuild captures the broad philosophy, but
  founding timeline, institutional history, named collaborators, trips, and
  certificate/testing claims need approval before publication.
- Branch detail depth: old pages had venues, maps, day schedules, class groups,
  calendars, pricing, payment, and galleries. Only Bracknell is currently
  represented as active in-person; other locations are intentionally
  online-only/register-interest until confirmed.
- Devon active school: known to exist but intentionally absent until approved
  details are supplied.
- Fees and payments: old amounts, discounts, childcare voucher notes, payment
  references, registration identifiers, and bank details remain blocked.
- Policies: the original site exposed many policy pages/documents. The rebuild
  has public-safe summaries and current external guidance links, but formal
  school PDFs are not published.
- Gallery and visual storytelling: year archive routes exist, but old child and
  event images are excluded until consent, caption, quality, and asset review
  are complete.
- Trust proof: testimonials, staff names/photos, parent quotes, exam outcomes,
  and partner logos/names are still missing because approval evidence is not yet
  in tracked data.

### Public Journey Notes

- `/` clearly introduces the school and leads to branch comparison or enquiry.
- `/schools` is the strongest parent-decision page; it explains the active hub
  versus online-only network areas without deleting geographic reach.
- `/schools/bracknell` is the only active branch page with venue and timetable
  detail. Online-only pages should keep local interest and alternatives visible
  but avoid legacy school-day times.
- `/curriculum` and `/admissions` are useful, though still high-level until
  headteacher-approved curriculum detail and current fee decisions are supplied.
- `/faq`, `/policies`, and `/gallery` are honest about gated content. They build
  trust structurally, but will feel stronger once approved documents and media
  exist.
- `/contact` has a strong low-risk initial enquiry model. It deliberately avoids
  collecting medical, safeguarding, emergency contact, document, or registration
  details.

### Safe Fixes Made In This Pass

- Removed public claims that bank transfer or childcare vouchers are currently
  accepted methods; payment method now says it is confirmed after enquiry.
- Online-only school detail pages no longer present legacy session times as a
  current school-day rhythm.
- Robots now disallows `/admin/` and `/register/` in addition to `/api/`.
- Open Graph image copy now says "Learning routes" and "Current classes and
  register-interest routes" rather than implying all network pages are active
  weekend schools.
- `CONTENT-VERIFICATION.md` now matches the Bracknell-only active in-person
  direction and records the unpublished Devon school as blocked pending details.
- `PROJECT-DECISIONS.md` now explicitly records the current Bracknell-only public
  model and Devon publication gate.

### Business Decisions Still Blocked

- Confirm branch statuses, including Bracknell, online-only areas, and the Devon
  school details.
- Confirm venues, addresses, maps, public timetable visibility, and whether old
  venues should remain hidden for inactive areas.
- Confirm fees, discounts, payment methods, voucher acceptance, invoice wording,
  and whether any bank/payment details should ever be public.
- Supply reviewed policy PDFs with owner, version, review date, next review
  date, and publication approval.
- Approve photo/video assets, captions, consent posture, and whether children are
  shown prominently.
- Confirm founding year, testimonials, staff/public bio approach, partnerships,
  exam outcomes, trip wording, and social links.
- Decide real enquiry delivery/storage, admin authentication, RLS, audit logs,
  retention, and registration privacy wording.

## Highest-Impact Findings

1. Public fee values needed stronger gating.
   The unresolved business decisions say exact fees and payment details are not
   confirmed for public display, but `/admissions`, `/contact`, and school detail
   pages displayed legacy GBP amounts from shared data. Public UI should show
   fee categories and confirmation wording until current amounts are approved.

2. The parent journey is structurally strong.
   Home, schools, school detail, admissions, curriculum, and contact routes
   provide a clear path from comparison to enquiry. Online-only and interest
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
- `/schools` gives a useful current-hub/online-interest comparison and a horizontal table.
- School detail pages have status badges, venue/timetable blocks, enquiry CTAs,
  related schools, and alternatives for non-open locations.
- `/curriculum` and `/admissions` both route naturally to school choice and
  contact.
- Online-only and interest branches retain full pages and include alternative
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
- Admin invoice, enquiry, and registration tables have captions and keyboard
  focusable horizontal scroll regions.
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
- Sitemap includes static routes, schools, policies, and only gallery years with
  approved media.
- Robots disallows `/api/`; admin and registration prototype metadata noindexes
  those route groups.
- Manifest and Open Graph image exist.
- Supabase helpers are present for future work without live writes by default.
- Prototype registration is restricted to the documented `sample-token` route,
  and gallery year archives stay out of navigation and the sitemap until
  approved public media exists.

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
