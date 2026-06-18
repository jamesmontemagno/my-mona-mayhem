# AGENTS.md

## Project overview
- This repo is a small Astro 5 site for the Mona Mayhem workshop app: a retro arcade-style GitHub contribution battle arena.
- The app uses Astro server output with the Node adapter, so routes and API handlers run in a server context.
- The main source lives in `src/`, especially `src/pages/` for pages and API routes.
- The `workshop/` folder is instructional material only; ignore it unless the task explicitly asks to update workshop content.

## Build and development commands
Use these commands from the repository root:
- `npm install` — install dependencies
- `npm run dev` — start the local Astro development server
- `npm run build` — create a production build
- `npm run preview` — preview the built app locally

## Astro and codebase conventions
- Prefer simple, maintainable Astro pages and route files under `src/pages/`.
- For API endpoints, place handlers in `src/pages/api/...` and keep `prerender = false` when the route must run on the server.
- Follow the existing project style: minimal, readable HTML and TypeScript, with small incremental changes.
- Use the existing docs in `README.md` and the locale variants for product context; avoid duplicating that information in code changes.
- Keep changes focused on the app itself; do not introduce unrelated frameworks or large refactors.

## When making changes
- Update or add the smallest possible files needed for the task.
- Preserve the current Astro setup and Node adapter behavior.
- If a task involves the contribution API, keep the implementation consistent with the existing route placeholder in `src/pages/api/contributions/[username].ts`.
