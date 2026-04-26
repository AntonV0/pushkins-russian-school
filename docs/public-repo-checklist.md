# Public Repository Checklist

Use this before every public push.

## Safe to Commit

- Source code, configuration, and tests.
- `.env.example` with variable names only.
- Polished public assets approved for the live site.
- High-level planning docs that do not expose private business details.

## Do Not Commit

- `.env.local`, Supabase keys, Vercel tokens, database URLs, or service-role keys.
- Raw source screenshots or copied site content before review.
- Private business records, unpublished staff/client details, invoices, analytics exports, or credentials.
- Large unoptimized originals unless they are intentionally public website assets.

## Pre-Push Commands

```bash
npm run lint
npm run typecheck
npm run build
```

## Useful Git Check

```bash
git status --short
git diff --cached --stat
```

## Provider Setup Check

- GitHub branch protection requires the CI check before merging to `main`.
- Supabase environment variables are added in Vercel, not committed.
- Vercel project settings do not expose private business material through public assets.
