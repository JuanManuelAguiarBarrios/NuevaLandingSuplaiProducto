# CLAUDE.md — NuevaLandingSuplai

## Project

Next.js 15 (App Router) landing page for **Suplai** — a logistics AI platform. TypeScript + Tailwind CSS. No backend; pure static/SSG.

## Stack

- **Framework**: Next.js 15 App Router (`app/`), React 19
- **Language**: TypeScript (`.tsx` / `.ts`)
- **Styling**: Tailwind CSS v4 (CSS-first, `@theme` en `app/globals.css`)
- **Animation**: Framer Motion (`m` + `LazyMotion`) para las secciones · entrada del hero por CSS (`.intro`, y `.intro-solid` sin opacidad para el titular, que es el LCP) · smooth scroll con Lenis
- **Fonts**: `next/font/google` (Geist variable, única familia)
- **Package manager**: npm

## File Layout

```
app/             Next.js routes, layout, icon.svg, opengraph-image.tsx
components/
  Navbar.tsx
  sections/      One file per page section
  product/       Piezas de las vistas de producto (MockupPanel, StatusPill, ControlPanel, íconos)
  agents/        Mockup de cada agente
  solucion/      Diagrama de tres planos (SVG en desktop, versión vertical en mobile)
content/         Todo el copy centralizado (index.ts)
lib/             providers.tsx (Lenis + MotionConfig)
```

## Key Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npx tsc --noEmit` | Type-check only |
| `npm run lint` | ESLint (CLI) |

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

## Sistema de marca (manual v2, kit Premium-Suplai)

- **Tipografía**: Geist es la única familia. Titulares en peso 460 (`font-headline`), etiquetas en Medium, texto en Regular. Sin serif, sin itálica y sin fuente mono.
- **Titulares en dos tonos**: la primera parte en pleno y la segunda en un tono más bajo (clase `.tone-low`, Piedra sobre claro y Lavanda sobre oscuro). Se autora con `lowFrom` en `/content/`: el índice de la primera línea que baja de tono. No se usa color para enfatizar.
- **Color**: Hueso es el fondo principal y Lino el de apoyo. Noche es la tinta y el fondo de las piezas oscuras (hero, Cómo trabajamos, cierre). Azul Suplai es acción (botón principal). El acento solo informa estado: Azul o Celeste para Resuelto, Lavanda para En curso, Baliza para Escalado. Baliza nunca es fondo ni texto largo.
- **Botón principal**: clase `.btn-primary`, Azul Suplai con la esquina inferior derecha en chaflán.
- **Chaflán**: clase `.chamfer`, recorta las fotos con la silueta del isotipo.
- **Etiquetas**: clase `.eyebrow` (12px, Medium, uppercase, tracking 0.14em); el color lo pone el contexto.
- **Estados**: `StatusPill`, punto de color y texto en mayúscula chica dentro de una caja de línea fina.
- **Línea de ejecución**: `ExecutionLine`, siempre canal, sistema y estado en ese orden. Solo canales, sistemas y estados que existen en el producto.
- Numeración en la misma familia, con `tabular-nums`.
- Quiebres de línea de headlines con reveal: autorados con `\n` en `/content/` (nunca medidos en runtime).

## Coding Conventions

- Server Components by default — add `"use client"` only when needed (state, effects, browser APIs)
- No class components
- Tailwind for all styling — no CSS modules, no inline `style` except for dynamic values
- `clamp()` for fluid typography, not fixed breakpoints
- Canvas animations must respect `prefers-reduced-motion`
