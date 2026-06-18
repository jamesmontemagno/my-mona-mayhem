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

## Accessibility best practices
- Use semantic HTML first (`header`, `main`, `section`, `article`, `button`, labeled `input`) before adding ARIA.
- Ensure every form control has a visible label and a stable `id`/`for` association.
- Keep keyboard-first behavior: visible focus styles, logical tab order, and Enter/Space support for primary actions.
- Announce dynamic UI updates with live regions (`role="status"` + `aria-live`), and use assertive announcements for blocking errors.
- For data visualizations, provide a text alternative (summary, totals, ranges, and meaningful `aria-label`) and do not rely on color alone.
- Avoid screen-reader noise in dense visual grids by marking decorative cells `aria-hidden="true"` and exposing a concise container description.
- During loading states, disable relevant controls, expose busy state (`aria-busy`), and restore focus to helpful content when errors occur.
- Run an accessibility pass for every UI change: keyboard-only check, live-region check, contrast sanity check, and quick screen-reader tree check.

## Design guide (retro arcade theme)
- Visual direction: lean into a high-contrast retro arcade vibe with neon accents, CRT-inspired glow, and playful competition energy.
- Color system: use deep navy/near-black backgrounds (`#0a0a1a`) with electric accent colors like arcade green (`#5fed83`) and vivid violet (`#8a2be2`); reserve bright warm accents for alerts, highlights, and winner moments.
- Color usage: keep text and key UI controls at accessible contrast; do not rely on color alone to communicate state in graphs, winner indicators, or status messaging.
- Typography: use expressive, arcade-style display type for major headings (for example Press Start 2P) and pair it with a highly legible sans-serif for body text, labels, and supporting copy.
- Type hierarchy: keep headings bold and stylized, but keep body text readable at small sizes with comfortable spacing on both desktop and mobile.
- Animation style: favor punchy, game-like motion (flicker, glow pulse, scanlines, celebratory bursts) over subtle corporate transitions.
- Motion pacing: use short, energetic durations with clear easing; animations should support feedback and delight without blocking interaction.
- Motion safety: honor `prefers-reduced-motion` by reducing or disabling non-essential animation while preserving clarity of state changes.
