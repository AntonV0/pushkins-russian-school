# Pushkin's School Website Rebuild

Public portfolio repository for a professional rebuild of Pushkin's School, a
Russian language school network website.

The rebuild is intentionally data-driven and parent-facing: school locations,
status wording, curriculum pathways, admissions content, policy shells, gallery
archives, and contact details live in local TypeScript data files so the site can
be reviewed and extended safely.

## Current Site Shape

- `/` - homepage with school network overview and parent journey
- `/about` - school philosophy and content review notes
- `/schools` - school overview, cards, and branch comparison table
- `/schools/[slug]` - reusable school detail template for five known locations
- `/curriculum` - curriculum pathways and placement guidance
- `/admissions` - admissions, enquiry, fees, and payment-status guidance
- `/faq` - parent FAQ hub
- `/policies` and `/policies/[slug]` - polished policy index and document shells
- `/gallery` and `/gallery/[year]` - approved-media archive shells
- `/contact` - mail-ready enquiry flow

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase client/server helpers are installed for future integrations
- Vercel-ready metadata, sitemap, robots, manifest, and generated OG image

## Local Setup

```powershell
npm install
npm.cmd run dev
```

Create `.env.local` from `.env.example` once the Supabase project is ready.
Never commit `.env.local`.

## Useful Scripts

```powershell
npm.cmd run dev
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

## Public Repo Safety

Do not commit:

- `.env.local`
- secrets or private service credentials
- private business documents
- raw source screenshots
- unpublished client, child, parent, or staff information
- unreviewed policy documents

Source screenshots and audit notes should stay in ignored local folders. Public
site images should come only from approved assets.

## Data Model

Core content is centralized under `src/data/`:

- `schools.ts` - branches, statuses, venues, schedules, maps, notes
- `curriculum.ts` - pathways, placement, materials, review notes
- `admissions.ts` - enquiry route, checklist, age/level options
- `contact.ts` - public contact and centralized payment placeholders
- `policies.ts` - policy groups, document states, publication checklist
- `gallery.ts` - archive shells and approved-media readiness notes
- `navigation.ts` and `site.ts` - shared navigation and site metadata

## Launch Blockers

The current implementation is polished but deliberately cautious. Before public
launch, the business still needs to confirm current branch statuses, timetable
details, fee/payment values, policy documents, and approved public images.
