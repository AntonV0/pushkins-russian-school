# Pushkin's School Rebuild Decisions

This document captures current product and business decisions for the website
rebuild. It intentionally avoids private records, unpublished staff/client
details, credentials, raw screenshots, and unreviewed business documents.

## Primary Goal

The main conversion goal is for parents to register interest or contact the
school, then join the nearest suitable Russian school location.

If a local branch is online-only, too far away, or not the right fit, the wider
learning network should give families clear alternatives:

- Pushkin's School: in-person weekend school locations where available.
- Volna Online Russian School: fully online Russian lessons with group and
  private options for students of all ages, including GCSE and A Level students.
- GCSERussian.com: a separate GCSE Russian self-study project.

These should be interconnected as related Russian-learning options, but remain
distinct businesses/projects.

## Branch Statuses

Current branch statuses are not fully confirmed yet. The website should keep all
known school locations and pages, including online-only or interest-gathering
network areas, because the broader network footprint is valuable.

Current direction:

- Only Bracknell is currently represented as an active in-person school in the
  public data model.
- Keep full pages for every known location.
- Keep transparent wording for online-only or interest-gathering branches.
- Use register-interest CTAs where local in-person provision is not confirmed.
- Preserve verification notes until current operating information is confirmed.
- Support adding more locations through the school data model.
- A further active Devon school is known to exist but should not be published
  until approved details are supplied.

Future decision needed:

- Confirm each branch's current open/online/opening-soon/closed status.
- Confirm whether any new locations should be added before launch.

## Timetables and Venues

Timetables and venues are not fully confirmed yet.

Current direction:

- Keep known legacy venues and schedules visible with verification notes.
- Do not remove school pages just because a location is not currently open
  in-person.
- Avoid overstating exact times until confirmed.

Future decision needed:

- Confirm current venue and timetable per branch.
- Decide which branch pages should show exact schedules versus "times to be
  confirmed."

## Online-Only Network Areas

Locations without current in-person classes should keep full pages.

Rationale:

- They make the school network feel established and geographically broader.
- They allow families to register interest for future local classes.
- They create a natural path toward Volna Online Russian School or
  GCSERussian.com where local classes are unavailable.

Recommended implementation:

- Keep online-only pages visually equal in quality to active pages.
- Use clear status badges and register-interest CTAs.
- Add related-learning alternatives on online-only branch pages.

## Payment and Invoicing

The old workflow used manually created PDF invoices with bank details. That was
slow and should be replaced with a more automated and logical system.

Current direction:

- Keep public fee/payment copy centralized and editable.
- Show fee categories rather than exact amounts until current academic-year
  values are confirmed for publication.
- Do not publish exact bank details until final values and workflow are
  confirmed.
- Build toward an admin invoice section.

Target payment model:

- Admin users can generate, add, edit, remove, and mark invoices as paid.
- Cash payments can be recorded manually.
- Bank transfers can be recorded manually, using a clear invoice reference.
- Online invoice payment should be supported, with Stripe as the likely best
  default.
- Online payment options may include card payments and wallet methods supported
  through the chosen provider, such as Apple Pay or Google Pay where available.

Future decision needed:

- Confirm payment provider and fee handling.
- Confirm whether PayPal is required or optional.
- Confirm invoice numbering, references, invoice PDF format, and data retention.
- Confirm admin roles and access control.

## Contact and Registration Workflow

The launch recommendation remains a server-side enquiry form with spam
protection and clear consent/privacy wording.

Supabase-backed storage may be useful if it improves follow-up, auditability, or
admin workflow. However, storing children's data requires careful privacy and
safeguarding consideration.

Initial enquiry form should stay simple:

- Parent/carer name.
- Parent/carer contact details.
- Preferred school location.
- Child or children's first names.
- Child ages.
- Current Russian level or learning context.
- Interest area: local classes, future classes, online learning, GCSE/A Level,
  or general enquiry.
- Optional message.

After enquiry:

- The school contacts the family.
- If the child joins, the school collects fuller registration information for
  health and safety, safeguarding, emergency contacts, medical notes, consents,
  and operational records.

Future decision needed:

- Decide whether the full A4 registration form remains PDF/manual or becomes a
  digital form.
- Decide whether digital registration uses QR codes, secure form links, an admin
  portal, or a staged parent onboarding flow.
- Confirm privacy wording and retention for stored enquiries and registrations.

## Photos and Gallery

There is a large historic photo collection with parent consent, but many older
photos may look dated or low quality. Newer photos are fewer, especially for
newer locations.

Current direction:

- Do not use raw screenshots as assets.
- Future photo batches can be added to project files for selection and
  optimization.
- Use the best approved photos selectively rather than overloading the site.
- Decide later whether a full gallery improves the site or whether photos are
  better used mainly on home, school, curriculum, and about pages.
- Generated illustrations or high-quality visual assets may be used to warm up
  text-heavy pages where real approved photos are unavailable.

Future decision needed:

- Provide approved photo folders.
- Confirm whether children's faces should be used prominently or sparingly.
- Confirm caption style and whether names should be avoided entirely.

## Policies

Policy publishing should follow professional school website best practice.

Recommended direction:

- Keep a policy summary page for readability.
- Add PDF downloads for formal documents.
- Show review dates, document owner or category, and version/status where
  appropriate.

Future decision needed:

- Provide reviewed policy documents.
- Confirm which policies should be PDFs, web pages, or both.
- Confirm review dates and document ownership labels.

## Tone and Brand

Chosen direction:

- Trustworthy, established, academic, and warm.
- Deep blue as the primary brand color.
- Red as an accent.
- White and soft neutral space.
- Avoid the old bright red/blue blocky visual style as the design target.

Implementation direction:

- Keep the current refined visual language.
- Add warmth with approved imagery, restrained illustration, and parent-focused
  copy.
- Avoid generic marketing-page patterns.

## Curriculum Detail

Curriculum detail needs headteacher input before it becomes too specific.

Current direction:

- Use high-level pathways that support the sales funnel.
- Emphasize progression, placement, culture, language confidence, and exam
  preparation.
- Avoid overpromising exact outcomes until reviewed.

Future decision needed:

- Confirm how much class-by-class curriculum should be public.
- Confirm GCSE/A Level detail.
- Confirm how Pushkin's School curriculum relates to Volna Online Russian School
  and GCSERussian.com without blurring the separate brands.

## Trust Signals

Trust signals are important. The strongest likely proof point is how long the
school has been open, to be verified from source screenshots or business
records.

Current direction:

- Use policy transparency, clear branch status, curriculum structure, and network
  scale as trust signals now.
- Add years established after verification.
- Add partnerships, staff details, testimonials, exam outcomes, or named proof
  points only after explicit review.
- Keep unverified trust claims in a data-driven pending state so the public UI can
  improve now without overstating proof points.

Future decision needed:

- Confirm founding/opening year.
- Confirm approved testimonials, partnerships, staff bios, and exam/result
  claims.

## Recommended Implementation Order

1. Add cross-project learning options for Pushkin's School, Volna Online Russian
   School, and GCSERussian.com.
2. Upgrade enquiry flow to server-side email and optional Supabase storage.
3. Design admin invoice architecture and initial admin UI.
4. Prepare digital registration form architecture.
5. Prepare policy summary plus PDF download model.
6. Prepare photo/asset ingestion and gallery selection workflow.
7. Expand curriculum and trust sections once headteacher/business decisions are
   available.
