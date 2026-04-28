# Subagent Implementation Prompts

Use these prompts when creating focused subagents for the next implementation
phase. Each prompt assumes the agent is working in this repository:

`C:\Users\Anton\Documents\Russian-School-Projects\pushkins-russian-school-website`

General rules for every subagent:

- Follow `AGENTS.md`.
- Do not commit `.env.local`, secrets, private business documents, raw source
  screenshots, unreviewed policy documents, or unpublished client/staff
  information.
- Do not use raw screenshots as website assets.
- Keep changes data-driven and easy to extend.
- Use conventional commits at major milestones.
- Run `npm.cmd run lint`, `npm.cmd run typecheck`, and `npm.cmd run build`
  before finalizing.
- If multiple agents are active, do not revert or overwrite changes made by
  others.

## Agent 1: Cross-Project Learning Options

Prompt:

You are implementing the related-learning network for Pushkin's School, Volna
Online Russian School, and GCSERussian.com. Create a data-driven model for these
three distinct projects/businesses and surface it across the site where it helps
families choose the right Russian-learning option.

Scope:

- Add a local data file such as `src/data/learning-options.ts`.
- Model Pushkin's School as local weekend classes.
- Model Volna Online Russian School as fully online Russian learning with group
  and private lessons for students of all ages, including GCSE and A Level
  students.
- Model GCSERussian.com as a separate GCSE Russian self-study project.
- Add polished UI sections/components that can appear on homepage, schools
  overview, closed/online school pages, FAQ, and contact/admissions journeys.
- Keep the three projects interconnected but clearly distinct.
- Do not invent URLs unless already present in code/source. If uncertain, use a
  verification-safe placeholder field or note.

Recommended commit:

`feat(content): add related learning options`

## Agent 2: Server Enquiry Flow

Prompt:

You are replacing the temporary mailto enquiry flow with a production-minded
server-side enquiry flow. Keep the initial enquiry simple and privacy-aware.

Scope:

- Inspect existing Supabase helper files and env handling.
- Design a minimal enquiry schema/model for parent/carer name, contact details,
  preferred school location, child first name(s), child age(s), Russian level,
  enquiry type, and optional message.
- Implement a server action or route handler for enquiry submission.
- Add validation, accessible success/error states, spam-protection placeholder
  hooks, and consent/privacy wording.
- Decide whether to store in Supabase only if the existing environment supports
  it cleanly; otherwise keep the implementation email-ready and document the
  Supabase migration path.
- Do not collect full medical/safeguarding details in the initial enquiry form.

Recommended commits:

- `feat(contact): add server enquiry submission`
- `feat(contact): add enquiry success states`
- `docs: document enquiry data workflow`

## Agent 3: Admin Invoice Planning and First UI

Prompt:

You are designing the first admin invoice foundation for school payments. This
is an internal workflow, so avoid exposing private data publicly and avoid
committing secrets.

Scope:

- Inspect existing app structure and Supabase helpers.
- Propose and/or implement an admin route structure for invoices.
- Model invoices with parent/customer details, child/student label, school
  location, line items, due date, payment status, payment method, invoice
  reference, and notes.
- Support manual statuses for cash and bank transfer.
- Prepare the model for Stripe invoice/payment links later.
- Build a polished but protected admin UI shell if auth is not ready.
- Do not build fake authentication that looks secure. Use clear disabled/protected
  states if auth decisions are pending.

Recommended commits:

- `feat(admin): add invoice data model`
- `feat(admin): add invoice management shell`
- `docs: document invoice workflow decisions`

## Agent 4: Payment Provider Architecture

Prompt:

You are evaluating and preparing the payment architecture for invoices. Stripe is
the likely default, with card and wallet support where available. PayPal is not
confirmed.

Scope:

- Create a concise implementation note comparing Stripe-only versus Stripe plus
  PayPal.
- Prepare centralized payment provider configuration placeholders without
  secrets.
- If implementing code, add only safe scaffolding: types, provider config,
  invoice payment status mapping, and future route names.
- Do not call external APIs or require live credentials unless explicitly
  approved.

Recommended commit:

`docs(payments): outline invoice payment architecture`

## Agent 5: Digital Registration Form Architecture

Prompt:

You are planning the second-stage registration form that families complete after
they decide to join. This form may replace or complement the existing detailed
A4 paper form.

Scope:

- Create a data model or documentation plan for the full registration workflow:
  emergency contacts, medical notes, safeguarding-related consents, photo
  consent, collection permissions, and operational details.
- Keep this separate from the initial enquiry form.
- Recommend whether the parent experience should be a secure link, QR code,
  admin-created invitation, or signed-in portal.
- Do not collect real sensitive data or add live storage until privacy/security
  decisions are confirmed.

Recommended commit:

`docs(registration): plan digital onboarding workflow`

## Agent 6: Policy Document Integration

Prompt:

You are preparing professional school policy publishing: readable summary pages
plus formal PDF downloads.

Scope:

- Extend the policy data model with fields for PDF path, review date, owner or
  category, version/status, and external guidance URL where relevant.
- Keep current pending states for documents that do not yet have reviewed PDFs.
- Add download button UI that appears only when a reviewed public document path
  exists.
- Do not commit unreviewed policy documents.

Recommended commit:

`feat(content): prepare policy download model`

## Agent 7: Photo and Asset Workflow

Prompt:

You are preparing the photo and visual asset workflow without using raw source
screenshots or unreviewed assets.

Scope:

- Inspect public image folders and existing gallery model.
- Add documentation and/or code support for image metadata: source filename,
  approved public path, alt text, caption, year, branch, category, consent
  status, and quality rating.
- Prepare reusable image components or gallery data structures.
- If no approved photos are present, do not add real images. Keep placeholders
  and document the ingestion process.
- Consider generated illustrations only as a future design option unless asked
  to create them.

Recommended commit:

`feat(content): prepare approved image workflow`

## Agent 8: Curriculum and Sales Funnel Copy

Prompt:

You are improving curriculum content for conversion without inventing
headteacher-approved details.

Scope:

- Use existing `src/data/curriculum.ts`, school pages, admissions, FAQ, and home
  page copy.
- Improve the sales funnel by explaining class placement, Russian language
  progression, culture, and exam preparation at a high level.
- Add placeholders or review notes for class-by-class curriculum details that
  need headteacher approval.
- Add pathways that direct families to Pushkin's School, Volna Online Russian
  School, or GCSERussian.com depending on location and goal.

Recommended commit:

`feat(content): refine curriculum conversion copy`

## Agent 9: Trust Signals and History

Prompt:

You are adding trust signals that are safe to publish now, while preparing for
future verified proof points.

Scope:

- Inspect source audit notes/screenshots only if available locally and ignored by
  Git.
- Do not commit raw screenshots or private audit notes.
- Add a data-driven trust-signal model for network scale, policy transparency,
  curriculum structure, years established, testimonials, partnerships, and staff
  details.
- Only publish verified values. For unverified values, add review-safe fields or
  pending notes.
- Prepare UI sections for homepage/about pages.

Recommended commit:

`feat(content): add trust signal model`

## Agent 10: QA, Accessibility, and Launch Review

Prompt:

You are performing a launch-readiness QA pass after other agents finish.

Scope:

- Run `npm.cmd run lint`, `npm.cmd run typecheck`, and `npm.cmd run build`.
- Check key routes: `/`, `/about`, `/schools`, every `/schools/[slug]`,
  `/curriculum`, `/admissions`, `/faq`, `/policies`, representative policy
  detail, `/gallery`, representative gallery year, and `/contact`.
- Review keyboard navigation, focus states, headings, form labels, contrast,
  mobile layout, long text wrapping, sitemap, robots, manifest, and Open Graph
  image route.
- Fix issues in small scoped commits.

Recommended commits:

- `fix(ui): polish responsive layouts`
- `fix(a11y): improve keyboard and form accessibility`
- `fix(seo): tighten launch metadata`
