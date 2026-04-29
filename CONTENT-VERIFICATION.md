# Content Verification Pack

Public-safe checklist for business review before launch. This pack is intended
to help the school confirm what can be published; it is not a source of approved
public claims by itself.

## Review Rules

- Do not publish branch status, venues, addresses, timetables, prices, payment
  instructions, staff names, testimonials, partnerships, exam outcomes, or photo
  assets until the business confirms them.
- Do not copy raw screenshots, bank details, private policy text, unpublished
  staff details, parent/client details, or child-identifying information into
  tracked files.
- Keep source screenshots and migration notes in ignored folders until reviewed.
- Use this document to collect confirmation, then update public data in a
  separate content change.

## Audit Inputs Checked

Tracked data and decisions:

- `src/data/schools.ts`
- `src/data/trust.ts`
- `src/data/curriculum.ts`
- `src/data/contact.ts` for central pricing/payment notes referenced by school
  summaries
- `PROJECT-DECISIONS.md`

Ignored local audit material was also checked for review context only:

- `docs/site-audit/content-map.md`
- `docs/site-audit/page-inventory.md`
- `docs/site-audit/source-content.md`
- `docs/public-repo-checklist.md`
- `docs/source-screenshots/` file inventory

## Branch Verification Checklist

Use the "Business confirmation" columns during review. "Currently modelled"
means the value is present in the rebuild data now, not that it has been
confirmed for launch.

| Branch | Currently modelled status | Business status to confirm | Venue to confirm | Address to confirm | Timetable to confirm | Enquiry CTA to confirm | Pricing notes | Exact schedule public? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| High Wycombe | Online only / register interest | [ ] Open [ ] Closed [ ] Online [ ] Opening soon [ ] Other | Local venue not published while in-person provision is unconfirmed | Buckinghamshire network area | Register interest for future local classes. Legacy audit notes contain conflicting Saturday times and should not be treated as current. | Register interest in High Wycombe classes | [ ] Use central fees [ ] Hide fees [ ] Branch-specific fees needed [ ] Confirm no public bank details | [ ] Yes, publish exact times [ ] No, use "times to be confirmed" |
| Hemel Hempstead | Online only / register interest | [ ] Open [ ] Closed [ ] Online [ ] Opening soon [ ] Other | Local venue not published while in-person provision is unconfirmed | Hertfordshire network area | Register interest for future local classes. Legacy audit notes include Saturday afternoon provision and old payment/calendar material. | Register interest in Hemel Hempstead classes | [ ] Use central fees [ ] Hide fees [ ] Branch-specific fees needed [ ] Confirm no public bank details | [ ] Yes, publish exact times [ ] No, use "times to be confirmed" |
| Bracknell | Open / weekend school | [ ] Open [ ] Closed [ ] Online [ ] Opening soon [ ] Other | Saint Joseph's Primary School | Gipsy Lane, RG12 9AP | Sundays, 10:00 to 13:00 | Enquire about Bracknell places | [ ] Use central fees [ ] Hide fees [ ] Branch-specific fees needed [ ] Confirm no public bank details | [ ] Yes, publish exact times [ ] No, use "times to be confirmed" |
| Chelmsford | Online only / register interest | [ ] Open [ ] Closed [ ] Online [ ] Opening soon [ ] Other | Local venue not published while in-person provision is unconfirmed | Essex network area | Register interest for future local classes. Legacy source also contains Covid-era Volna wording and old Sunday venue details. | Register interest in Chelmsford classes | [ ] Use central fees [ ] Hide fees [ ] Branch-specific fees needed [ ] Confirm Volna pricing/free-trial wording separately | [ ] Yes, publish exact times [ ] No, use "times to be confirmed" |
| Southend-on-Sea | Online only / register interest | [ ] Open [ ] Closed [ ] Online [ ] Opening soon [ ] Other | Local venue not published while in-person provision is unconfirmed | Essex network area | Register interest for future local classes; old source included an online-only/planned-opening note. | Register interest in Southend-on-Sea classes | [ ] Use central fees [ ] Hide fees [ ] Branch-specific fees needed [ ] Confirm no public bank details | [ ] Yes, publish exact times [ ] No, use "times to be confirmed" |

### Branch Review Notes

- Current data keeps every known branch page, including online-only or
  interest-gathering locations, so families can register interest without the
  site implying a local venue is active.
- Only Bracknell is currently represented as an active in-person school in the
  public data model.
- High Wycombe has a timetable conflict in source material and needs a clear
  final answer before exact public times are shown.
- Chelmsford has Covid-era online wording and Volna references in the audit
  material. Confirm current status, relationship, links, pricing, and whether
  any in-person venue details should remain public.
- Southend-on-Sea should remain transparent if closed or future-only. Confirm
  whether the old venue/address should stay public while classes are not active.
- Old calendars, pricing, childcare voucher notes, registration identifiers, and
  payment instructions should be treated as stale until reviewed.
- Another active school in Devon is known to exist but is intentionally not
  modelled or published until details are supplied and approved.

## Central Pricing And Payment Review

The rebuild currently keeps fee/payment categories in `src/data/contact.ts`, but
does not publish exact fee amounts or bank details. Confirm what should become
public before launch.

| Item | Currently modelled | Business confirmation needed |
| --- | --- | --- |
| Accepted payment methods | Bank transfer; childcare vouchers listed as methods to confirm | [ ] Confirm [ ] Replace [ ] Hide until after enquiry |
| Annual enrolment fee | Category shown; exact amount withheld from public UI | [ ] Confirm amount [ ] Remove from public copy [ ] Branch-specific |
| Introductory course | Category shown; exact amount and availability withheld from public UI | [ ] Confirm amount and availability [ ] Remove from public copy |
| Term fees | Category shown; exact term amounts withheld from public UI | [ ] Confirm current academic-year fees [ ] Replace with "ask on enquiry" |
| Single school day | Category shown; exact rate withheld from public UI | [ ] Confirm [ ] Remove from public copy |
| Sibling discount | Category shown; exact discount withheld from public UI | [ ] Confirm discount [ ] Remove from public copy |
| Bank details | Exact account details are not in public data | [ ] Keep private [ ] Publish only after final approval |

## Trust Signal Verification

The trust data intentionally separates publishable structural signals from
claims needing evidence. Confirm the following before adding stronger public
proof points.

| Trust signal | Current state | Business confirmation needed | Public wording decision |
| --- | --- | --- | --- |
| Founding year | Pending review; no official year confirmed in tracked data | [ ] Official founding/opening year: ______ [ ] Evidence checked | [ ] "Since YYYY" [ ] "Established for X years" [ ] Do not publish yet |
| Years established wording | Pending review | [ ] Confirm whether to calculate years dynamically [ ] Confirm launch-year wording | [ ] Use exact year [ ] Use approximate wording [ ] Hide |
| Testimonials | Awaiting approved copy | [ ] Wording approved [ ] Consent approved [ ] Attribution style approved | [ ] Full name [ ] First name [ ] Initials [ ] Anonymous |
| Partnerships/collaborators | Historic references require review | [ ] Relationship current [ ] Logo/name permission approved [ ] Wording approved | [ ] Publish named partners [ ] General wording only [ ] Hide |
| Staff bios/photos | Review before publishing | [ ] Roles approved [ ] Bios approved [ ] Photos approved [ ] Privacy approach approved | [ ] Named bios [ ] Role-only bios [ ] No staff section |
| Exam outcomes | Evidence needed | [ ] Results evidence approved [ ] Anonymisation approved [ ] Date range approved | [ ] Statistics [ ] Case studies [ ] Exam-preparation wording only |
| Policy transparency | Publishable structure; formal PDFs pending | [ ] Reviewed policy documents supplied [ ] Owners/dates/versions approved | [ ] Link PDFs [ ] Keep summaries only |
| Curriculum structure | High-level public scaffolding is ready | [ ] Headteacher confirms class-by-class details [ ] Materials and outcomes approved | [ ] High-level only [ ] Add detailed class pages |
| Network scale | Website has five known location pages | [ ] Confirm whether all five should be described as a current network | [ ] "Locations" [ ] "Known branches" [ ] Avoid scale claim |

## Curriculum Verification

Current curriculum data is high-level and avoids detailed outcome claims. Use
this checklist before adding more specific curriculum content.

| Area | Current public-safe approach | Confirmation needed |
| --- | --- | --- |
| Curriculum pillars | Language confidence, culture and identity, exam-aware progression | [ ] Confirm wording [ ] Add/remove pillars |
| Placement process | Parent shares context; teachers discuss starting point; review after first weeks | [ ] Confirm process [ ] Confirm whether trial period should be mentioned |
| Class groups | Junior, Middle, Senior, Grade Zero, Grades 1-4, GCSE and A Level Exam Preparation | [ ] Confirm group names [ ] Confirm active groups by branch |
| Lesson plans | Shared Saturday morning, Saturday afternoon, and Sunday structures | [ ] Confirm timing by branch [ ] Confirm whether lesson labels are accurate |
| Textbooks/materials | Kept generic | [ ] Confirm named textbooks/materials before publication |
| Assessment/outcomes | Kept high-level | [ ] Confirm certificates, testing, progress wording, and exam support claims |
| Related routes | Pushkin's School, Volna Online Russian School, GCSERussian.com treated as distinct options | [ ] Confirm relationships [ ] Confirm external URLs and CTAs |

## Policy And Audit-Sensitive Content

- Formal school policies should not be copied from ignored audit notes into
  public pages until reviewed for legal currency, staff privacy, document owner,
  version, and review date.
- External guidance links should point to current official publication pages and
  be checked before launch.
- Gallery and historic event photos should stay out of public assets until image
  quality, consent, captions, and child/staff privacy are approved.
- Contact details and named staff roles should be confirmed before launch, even
  when they appeared on the old public site.

## Business Sign-Off

| Review area | Reviewer | Date | Decision / notes |
| --- | --- | --- | --- |
| Branch statuses |  |  |  |
| Venues and addresses |  |  |  |
| Timetables and exact schedule visibility |  |  |  |
| Prices, discounts, vouchers, and payment visibility |  |  |  |
| Contact/enquiry CTAs and public contact details |  |  |  |
| Trust signals and founding-year wording |  |  |  |
| Testimonials, partnerships, staff bios/photos, exam outcomes |  |  |  |
| Curriculum detail and exam-preparation wording |  |  |  |
| Policies and downloadable documents |  |  |  |
| Gallery/media publication |  |  |  |
