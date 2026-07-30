# Agent Notes

This is a public portfolio repository for a real business website rebuild.

- Never commit `.env.local`, secrets, private business documents, raw source screenshots, or unpublished client/staff information.
- Keep migration source material in ignored folders until it is reviewed for public use.
- Use `npm run lint`, `npm run typecheck`, and `npm run build` before opening PRs.
- Prefer small, readable commits that show the build process clearly for recruiters and collaborators.

## Dev Server Workflow

- The local dev server is pinned to `http://localhost:3023` via `npm run dev`.
- On Windows, prefer `npm.cmd run dev` from the Codex integrated terminal.
- If `3023` is already in use, check whether this project is already running and reuse that server instead of starting a second copy.
- Do not let Next.js silently pick a different port for this project; resolve the port conflict so Codex browser QA and chat references stay stable.
- Recommended Codex Local Environment action: `Run` -> `npm.cmd run dev`.
- Recommended Codex Local Environment setup script: `npm install`.
