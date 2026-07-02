# CLAUDE.md — NuevaLandingSuplai

## Project

Next.js 15 (App Router) landing page for **Suplai** — a logistics AI platform. TypeScript + Tailwind CSS. No backend; pure static/SSG.

## Stack

- **Framework**: Next.js 15 App Router (`app/`), React 19
- **Language**: TypeScript (`.tsx` / `.ts`)
- **Styling**: Tailwind CSS v4 (CSS-first, `@theme` en `app/globals.css`)
- **Animation**: Framer Motion (`m` + `LazyMotion`) para las secciones · entrada del hero por CSS (`.hero-rise`) · smooth scroll con Lenis
- **Fonts**: `next/font` (Inter, Newsreader como fallback de PP Editorial New, Geist Mono)
- **Package manager**: npm

## File Layout

```
app/             Next.js routes, layout, icon.svg, opengraph-image.tsx
components/
  Navbar.tsx
  sections/      One file per page section
content/         Todo el copy centralizado (index.ts)
lib/             providers.tsx (Lenis + MotionConfig)
```

## Key Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npx tsc --noEmit` | Type-check only |

## Slash Commands (ECC)

| Command | When to use |
|---|---|
| `/plan` | Before implementing any non-trivial feature |
| `/react-review` | Review React/TSX changes |
| `/react-build` | Fix build or type errors |
| `/react-test` | TDD for new components |
| `/code-review` | General quality review |
| `/build-fix` | Fix broken builds |
| `/security-scan` | Audit before shipping |
| `/pr` | Create a GitHub pull request |
| `/feature-dev` | Full feature development workflow |
| `/refactor-clean` | Clean up without behavior change |
| `/checkpoint` | Save session state |

## Active Rules

Rules in `.claude/rules/` apply automatically by file glob:

- `rules/common/` — coding style, patterns, security, testing, performance
- `rules/react/` — React component shape, hooks, RSC boundaries, security
- `rules/typescript/` — types, interfaces, patterns, security

## Coding Conventions

- Server Components by default — add `"use client"` only when needed (state, effects, browser APIs)
- No class components
- Tailwind for all styling — no CSS modules, no inline `style` except for dynamic values
- `clamp()` for fluid typography, not fixed breakpoints
- Canvas animations must respect `prefers-reduced-motion`
