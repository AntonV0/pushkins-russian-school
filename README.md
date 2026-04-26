# Pushkins Russian School Website

Next.js rebuild workspace for the Pushkins Russian School website.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

## Local Setup

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` once the Supabase project is ready.

## Useful Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Migration Workflow

Add source material before building the final site:

- `docs/source-screenshots/` for screenshots of the existing site. This folder is ignored by Git by default.
- `docs/source-copy/` for copied page text. This folder is ignored by Git by default.
- `docs/assets/` for reviewed public references only. Put private/source material in ignored subfolders.
- `docs/site-audit/page-inventory.md` for the current page list.
- `docs/site-audit/content-map.md` for old-to-new content mapping.
- `docs/site-audit/brand-notes.md` for rebrand direction.

See `docs/public-repo-checklist.md` before pushing to the public repository.

## Integration Notes

GitHub, Supabase, and Vercel should be linked after the content audit folders are filled enough to confirm the first route plan.

Use `docs/integration-setup.md` as the setup checklist before connecting production services.
