# Pushkin's School Website Rebuild

Public portfolio repository for a professional rebuild of Pushkin's School, a
parent-facing Russian language school website.

The project demonstrates how a real business website can be rebuilt with a
modern, data-driven architecture while keeping sensitive migration material,
business details, and child-facing media under careful review.

## Project Snapshot

- **Type:** business website rebuild and portfolio case study
- **Audience:** parents, carers, school staff, recruiters, and technical reviewers
- **Framework:** Next.js App Router
- **UI:** React, TypeScript, Tailwind CSS
- **Deployment target:** Vercel
- **Data approach:** typed local content registries under `src/data/`
- **Status:** polished public-safe rebuild with launch details still awaiting
  business confirmation

## What This Repository Shows

- A route structure for a multi-location education website.
- Parent-facing admissions, curriculum, FAQ, policy, gallery, and contact flows.
- Strong separation between public-ready content and private migration material.
- Typed data files that make content review easier than scattering copy through
  page components.
- Public media handling with approved image metadata, captions, alt text, and
  usage notes.
- Vercel-ready sitemap, robots, manifest, generated Open Graph image, and
  production build checks.

## Current Route Map

- `/` - homepage with school network overview and parent journey
- `/about` - school philosophy, education principles, and public school imagery
- `/schools` - location overview, cards, and branch comparison table
- `/schools/[slug]` - reusable detail template for known network areas
- `/curriculum` - curriculum pathways and placement guidance
- `/admissions` - admissions, enquiry, fees, and payment-status guidance
- `/faq` - parent FAQ hub
- `/policies` and `/policies/[slug]` - policy index and document shells
- `/gallery` and `/gallery/[category]` - curated public gallery collections
- `/contact` - server-validated initial enquiry flow with safe disabled defaults
- `/admin/*` and `/register/*` - prototype/admin planning surfaces kept
  conservative until real authorization and business approval are in place

## Architecture For AI And Reviewers

Start here when trying to understand the project:

- `src/app/` contains App Router pages, layouts, metadata routes, and server
  actions.
- `src/components/site/` contains reusable public website components.
- `src/components/admin/` contains disabled-by-default admin workflow prototypes.
- `src/data/` is the main content and configuration layer.
- `src/lib/` contains shared helpers, including Supabase environment handling.
- `public/images/` contains approved, optimized public images used by the site.
- `docs/` is ignored locally and may contain private migration/source material.

The safest way to understand content behavior is to inspect `src/data/` before
editing page components. Most routes render typed records rather than hardcoded
business facts.

## Key Data Files

- `src/data/site.ts` - shared site metadata and absolute URL helpers
- `src/data/navigation.ts` - primary navigation and route labels
- `src/data/schools.ts` - branch status, location, timetable, and venue notes
- `src/data/curriculum.ts` - learning pathways and placement guidance
- `src/data/admissions.ts` - admissions steps, age ranges, and enquiry prompts
- `src/data/contact.ts` - public contact details and payment categories
- `src/data/policies.ts` - policy groups, publication states, and shells
- `src/data/gallery.ts` - public gallery collection structure
- `src/data/media-assets.ts` - featured approved public image registry
- `src/data/extended-gallery-assets.ts` - lower-priority archive gallery tiles
- `src/data/trust.ts` - public-safe trust signals and pending proof points

## Public Safety Rules

Do not commit:

- `.env.local`
- secrets, tokens, private keys, or service credentials
- private business documents
- raw source screenshots or migration archives
- unpublished client, child, parent, or staff information
- unreviewed policy documents, fees, timetables, or staff details
- unapproved school images

Approved public images may live under `public/images/` so GitHub and Vercel
deployments can render the website correctly. Raw originals and source material
must stay outside Git or in ignored local folders until reviewed.

## Local Setup

```powershell
npm install
npm.cmd run dev
```

The development server uses the port configured in `package.json`.

Create `.env.local` from `.env.example` only when the required services are
ready. Never commit `.env.local`.

## Quality Checks

Run these before opening a PR or publishing deployment changes:

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

The combined check is also available:

```powershell
npm.cmd run check
```

## Launch Notes

The implementation is intentionally cautious. Before a production launch, the
business still needs to confirm current branch statuses, timetable details, fee
values, policy documents, payment provider settings, and final image approval.

Public pages avoid exact unconfirmed values and use conservative wording where
the source material still needs business review.

## Supporting Docs

- `PROJECT-DECISIONS.md` - business decisions and open questions
- `CONTENT-VERIFICATION.md` - public content verification notes
- `ASSET-WORKFLOW.md` - approved public photo ingestion process
- `LAUNCH-AUDIT.md` - launch-readiness review and blockers
- `ADMIN-SECURITY.md` - admin safety model and authorization notes
- `PAYMENT-ARCHITECTURE.md` - payment integration planning
- `REGISTRATION-WORKFLOW.md` - registration flow planning
- `ENQUIRY-WORKFLOW.md` - enquiry flow planning

## License

All rights reserved. This repository is public for viewing and educational
purposes only. See `LICENSE` for the full terms.
