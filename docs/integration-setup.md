# Integration Setup

Use this as the handoff checklist for GitHub, Supabase, and Vercel. Keep secrets in provider dashboards or local ignored files only.

## GitHub

1. Create the public repository only after `docs/public-repo-checklist.md` is satisfied.
2. Keep `main` protected once the repository is connected:
   - require the `CI / Verify` check,
   - require pull requests before merge,
   - block force pushes.
3. Use the pull request template for every setup or content migration change.
4. Keep source screenshots, copied draft copy, and private assets in ignored folders until reviewed.

## Supabase

1. Create the Supabase project.
2. Add these values to `.env.local` for local work and to Vercel project environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
3. Add `SUPABASE_SERVICE_ROLE_KEY` only when a server-only admin workflow needs it. Never expose it in client components or browser code.
4. When authentication is introduced, configure allowed redirect URLs in Supabase after the Vercel preview and production URLs are known.
5. Record schema and storage decisions in this document before adding migrations or buckets.

## Vercel

1. Import the GitHub repository into Vercel as a Next.js project.
2. Use default install and build commands unless the project scripts change:
   - install: `npm ci`
   - build: `npm run build`
3. Add the Supabase environment variables for Production, Preview, and Development.
4. Do not commit `.vercel/`; use `vercel link` locally if CLI access is needed.
5. Pull local environment variables with `vercel env pull .env.local` after the project is linked.

## Local Verification

Run these before opening a PR or linking production deployment:

```bash
npm run lint
npm run typecheck
npm run build
```

The CI workflow runs the same checks on pull requests and pushes to `main`.
