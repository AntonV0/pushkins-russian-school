# Digital Registration and Onboarding Workflow

This plan covers the second-stage onboarding workflow after a family has
decided to join Pushkin's School. It is intentionally separate from the initial
public enquiry form.

The workflow must not collect real sensitive information until privacy,
security, retention, admin access, and safeguarding decisions are confirmed.
This document is safe to keep in the public repository because it describes
structure and implementation intent only, not real family, child, staff, medical,
payment, or safeguarding records.

## Recommended Direction

Use a staged onboarding flow built around admin-created invitations.

Recommended parent experience:

1. A family submits the simple public enquiry form.
2. Staff contact the family and confirm that they intend to join.
3. An admin creates a registration invitation for one family and one or more
   children.
4. The parent receives a secure link by email, with an optional QR code for use
   at open days or in-person registration support.
5. The parent completes the registration in sections.
6. Staff review the submission, request corrections if needed, then mark the
   registration as accepted.
7. The family can be linked to invoices, class placement, attendance, and
   operational records later.

Why this is preferable:

- It keeps the public enquiry form lightweight and conversion-friendly.
- It avoids publishing a sensitive form that anyone can fill out.
- It gives staff control over who receives the detailed registration form.
- It works before a full parent portal exists.
- It can later evolve into a signed-in portal without changing the core data
  model.

## Experience Options Considered

### Public Form

Not recommended for the full registration form.

It is easiest to build, but it exposes a sensitive data collection surface too
early. It also makes it harder to control duplicate submissions, spam, outdated
links, and families who have not yet spoken to the school.

### QR Code Only

Useful as an access method, but not enough on its own.

A QR code should point to a secure invitation URL or short-lived registration
start page. It should not be the only security boundary, and it should not expose
one shared registration form for all families.

### Admin-Created Secure Link

Recommended first implementation.

Each invitation should have a unique token, expiry date, status, and intended
recipient. The link should open the registration flow without requiring a parent
account initially.

### Signed-In Parent Portal

Recommended later, not as the first launch step.

A parent portal is better once the school has recurring needs such as updating
medical notes, paying invoices, downloading receipts, checking classes, or
managing multiple children over time.

### Staged Onboarding

Recommended.

The registration should be split into short sections with a clear completion
state. This is easier for parents and makes admin review more reliable.

## Registration Sections

### 1. Family and Parent Details

Purpose:

- Confirm the family record created after enquiry.
- Capture parent/carer names and contact channels.
- Identify the primary contact for school communication.

Example fields to model later:

- Parent/carer full name.
- Relationship to child.
- Email address.
- Mobile number.
- Home address.
- Primary contact preference.
- Additional parent/carer contact.
- Preferred language for communication, if useful.

Notes:

- The initial enquiry should keep using a smaller field set.
- Registration can collect full contact details once the family is joining.

### 2. Child Details

Purpose:

- Create one student record per child.
- Support class placement, safeguarding, and operational planning.

Example fields to model later:

- Child legal full name.
- Preferred name.
- Date of birth.
- School year or current education stage.
- Mainstream school name, if needed.
- Current Russian ability.
- Reading, writing, speaking, and listening context.
- Previous Russian learning experience.
- GCSE or A Level interest.
- Preferred branch or online option.

Notes:

- Avoid collecting more identity information than the school needs.
- If passport, ethnicity, or nationality data is ever requested, add a clear
  legal basis and review carefully before implementation.

### 3. Emergency Contacts

Purpose:

- Ensure staff can reach responsible adults if the parent/carer is unavailable.

Example fields to model later:

- Emergency contact full name.
- Relationship to child.
- Phone number.
- Secondary phone number, optional.
- Whether they can collect the child.
- Notes for urgent contact only.

Recommended validation:

- Require at least one emergency contact separate from the primary parent/carer
  where possible.
- Allow more than one emergency contact.

### 4. Medical and Health Notes

Purpose:

- Capture information staff need to keep the child safe during school sessions.

Example fields to model later:

- Medical conditions.
- Allergies.
- Medication requirements.
- Dietary needs relevant to snacks/lunch.
- Accessibility or mobility needs.
- Additional support needs relevant to weekend classes.
- GP or medical contact details only if legally and operationally necessary.

Important implementation note:

- Medical notes are sensitive special-category data. Do not add live collection
  or storage until privacy wording, retention, access control, and staff review
  procedures are confirmed.

### 5. Safeguarding and Operational Consents

Purpose:

- Record parent acknowledgements and permissions needed for safe operation.

Example consent groups to model later:

- Agreement to school rules or code of conduct.
- Permission for staff to administer basic first aid.
- Permission to contact emergency services if needed.
- Acknowledgement of safeguarding policy availability.
- Acknowledgement of privacy notice.
- Consent for necessary operational communication.
- Consent for relevant information to be shared with class teachers/admins.

Recommended approach:

- Store each consent as a separate versioned item.
- Store the consent label, wording version, timestamp, and parent identity.
- Avoid one giant checkbox for everything.

### 6. Photo and Media Consent

Purpose:

- Clarify whether the school can use photos or videos for specific contexts.

Recommended consent choices:

- Internal school records only.
- Private parent group or school community updates.
- Public website.
- Social media.
- Printed promotional materials.
- No public use.

Recommended implementation:

- Make this granular and child-specific.
- Allow parents to opt out of public use while still permitting internal school
  use if appropriate.
- Store consent version, date, and review/update history.
- Avoid storing child names in public captions unless explicitly approved later.

### 7. Collection Permissions

Purpose:

- Confirm who may collect the child at the end of the school day.

Example fields to model later:

- Named adults allowed to collect.
- Relationship to child.
- Phone number.
- Collection notes.
- Password or collection phrase, if the school chooses this process.
- Independent travel permission for older pupils, if appropriate.

Recommended implementation:

- Treat collection permissions as child-specific.
- Make updates easy for admins because collection arrangements can change.

### 8. Class Placement and Learning Needs

Purpose:

- Help teachers place pupils into the correct group and prepare support.

Example fields to model later:

- Preferred class group, if known.
- Placement assessment notes.
- Reading level.
- Writing level.
- Speaking confidence.
- Listening comprehension.
- GCSE/A Level target, if relevant.
- Teacher placement decision.
- First three weeks review outcome.

Recommended implementation:

- Parent-submitted learning context should be separate from staff placement
  notes.
- Staff-only placement fields should live in admin views, not parent forms.

### 9. Attendance, Timetable, and Branch Operations

Purpose:

- Connect a registered child to the right branch, session, and operational
  workflow.

Example fields to model later:

- Branch/location.
- Intended start date.
- Session or timetable label.
- Introductory course status.
- Class group.
- Attendance register identifier.
- Sibling relationship, if relevant for fees.

Notes:

- Branch statuses and timetables are not fully confirmed yet, so the model
  should support flexible branch/session labels rather than hardcoded times.

### 10. Registration Review and Acceptance

Purpose:

- Give admins a clear way to process registrations before a child starts.

Suggested statuses:

- `draft`
- `invited`
- `submitted`
- `needs-parent-update`
- `under-review`
- `accepted`
- `withdrawn`
- `archived`

Admin actions to support later:

- Create invitation.
- Resend invitation.
- Extend expiry.
- Review submission.
- Request parent updates.
- Accept registration.
- Archive registration.
- Export or print a registration summary, if still operationally useful.

## Practical Supabase/Admin Architecture

The first implementation should be compatible with Supabase, but should not add
live sensitive-data storage until privacy/security decisions are made.

Suggested future tables:

- `families`
- `family_contacts`
- `students`
- `registration_invitations`
- `registration_submissions`
- `registration_sections`
- `student_emergency_contacts`
- `student_medical_notes`
- `student_consents`
- `student_collection_permissions`
- `student_learning_profiles`
- `admin_registration_reviews`

Implementation principles:

- Use row-level security from the start.
- Keep parent-submitted data and staff-only notes separate.
- Version consent wording and policy acknowledgements.
- Avoid storing raw free-text sensitive notes where structured choices would be
  safer.
- Add audit fields such as `created_at`, `updated_at`, `submitted_at`,
  `reviewed_at`, and `reviewed_by`.
- Use soft archive rather than destructive deletion for operational records,
  subject to the final retention policy.
- Never expose registration records on public routes.

## Invitation Security

Recommended invitation fields:

- Unique invitation ID.
- Hashed token.
- Family ID.
- Intended email address.
- Status.
- Expiry timestamp.
- Created by admin user.
- Last sent timestamp.
- Submitted timestamp.

Recommended security rules:

- Store only a hashed token server-side.
- Expire links.
- Allow admins to revoke links.
- Rate-limit token attempts.
- Do not reveal whether a token exists.
- Require re-verification or staff help before showing submitted sensitive
  information again.

## Parent Flow

Suggested parent steps:

1. Open invitation link.
2. Confirm parent/carer identity.
3. Review child or children being registered.
4. Complete required registration sections.
5. Review summary.
6. Submit declarations and consents.
7. See confirmation screen with next steps.

Nice-to-have later:

- Save progress.
- Resume link.
- Multi-child copy-forward for shared emergency contacts.
- Print/download parent summary.
- Parent portal login for later updates.

## Admin Flow

Suggested admin steps:

1. Open enquiry or family record.
2. Create registration invitation.
3. Choose child or children to include.
4. Send secure link.
5. Track invitation status.
6. Review submitted sections.
7. Request corrections if needed.
8. Accept registration.
9. Link child to branch, class group, invoice, and attendance process.

## Data Sensitivity Notes

This workflow may include:

- Child personal data.
- Parent contact data.
- Emergency contact data.
- Medical and allergy notes.
- Safeguarding-related consents.
- Collection permissions.
- Photo and media permissions.

Before live implementation, confirm:

- Privacy notice wording.
- Lawful basis and consent handling.
- Data retention periods.
- Who can access each field.
- Whether staff need role-based permissions.
- Backup/export process.
- Deletion/archive process.
- Incident response procedure.

## What Not To Build Yet

Do not build these until decisions are confirmed:

- A public full registration form.
- Live medical/safeguarding data storage.
- Uploads of real signed forms.
- Parent portal authentication.
- Staff-only safeguarding notes.
- Automated PDF generation containing sensitive records.
- Real child or parent test data.

## Implementation Milestones

Recommended future commits:

1. `docs(registration): plan digital onboarding workflow`
2. `feat(registration): add registration workflow types`
3. `feat(admin): add registration invitation shell`
4. `feat(registration): add secure invitation route shell`
5. `feat(registration): add staged onboarding form draft`
6. `feat(admin): add registration review queue`
7. `feat(registration): connect onboarding to Supabase`

The current safe next step is documentation only. The first code milestone
should add TypeScript types and non-sensitive section metadata, not a live form.

## Coordinator Notes

Open decisions for the project owner:

- Whether the existing A4 form remains as a backup during the first launch.
- Whether parents should be able to save and resume registration.
- Whether a full parent portal is required for launch or later.
- Who is allowed to create, review, and accept registrations.
- How long registration and medical data should be retained.
- Whether photo consent should be renewed annually.
- Whether QR codes will be used for in-person registration support.
- Whether invoices should be created before or after registration acceptance.
