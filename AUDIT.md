# AUDIT — getsuplai.com (NuevaLandingSuplai)

Auditoría en tres fases: (1) errores y bugs, (2) performance, (3) recomendaciones de UI.
Fecha: 2026-06-30 · Stack real: **Next.js 15.5 (App Router) · React 19 · Tailwind v4 · Framer Motion 12 · Lenis 1.3**.

> Nota de método: la auditoría visual en vivo (responsive real en el browser, hydration en runtime)
> no pudo ejecutarse porque la extensión de Chrome no estaba conectada. El relevamiento de responsive,
> consola y hydration se hizo por **análisis estático + inspección del HTML del SSR** (`curl`).
> Los ítems marcados _(verificar en browser)_ conviene confirmarlos visualmente.

Leyenda severidad: 🔴 alta · 🟡 media · 🟢 baja
Estado: ✅ aplicado · 🕓 propuesto (pendiente de tu revisión) · 📝 solo marcado (copy / no tocar)

---

## Resumen ejecutivo

- **Build, type-check y lint pasan** (sin warnings tras la limpieza). Build 100% estático.
- **[RESUELTO] Hallazgo más importante (🔴):** el hero (elemento LCP) se servía con `opacity:0;clip-path` y solo aparecía tras hidratar Framer; sin JS la página quedaba en blanco. Ahora el hero es Server Component con entrada CSS visible desde el primer paint.
- **[RESUELTO] Bundle:** página `/` **51.7 kB → 14 kB**, First Load **154 kB → 131 kB** (LazyMotion + hero sin Framer).
- **[RESUELTO] Código y assets muertos:** eliminados ~23 MB de videos, 2 hooks y 2 componentes sin usar + CSS muerto.
- **[RESUELTO] Documentación:** `CLAUDE.md` actualizado a Next 15 / React 19 / Tailwind v4.
- Nota: el "video del hero" que pedía la consigna **no existía** — el hero es un fondo estático (grid + glow); los MP4 estaban muertos y se eliminaron.

---

## FASE 1 — Errores y bugs

### 1.1 · SEO / Metadata — 🔴 → ✅ (parcial)
**Antes:** solo `title` + `description`. Sin Open Graph, sin Twitter Card, sin `metadataBase`, sin canonical, sin favicon.
- ✅ **Aplicado** en `app/layout.tsx`: `metadataBase`, `title.template`, `openGraph`, `twitter` (summary_large_image),
  `alternates.canonical`, `robots`, `keywords`, `applicationName`. Verificado en el HTML del SSR.
- `lang="es"` ya estaba correcto ✅ · viewport `width=device-width, initial-scale=1` correcto ✅.
- 🕓 **Pendiente (requiere assets):**
  - **Favicon / app icon** — no existe ningún `app/icon.*`, `app/favicon.ico` ni `public/favicon`. Falta el ícono del sitio.
  - **Imagen Open Graph** (`app/opengraph-image.*` o `public/og.jpg`, 1200×630) — sin ella, al compartir el link no hay preview.
  - Opcional: `app/sitemap.ts` y `app/robots.ts`.

### 1.2 · Hero y secciones invisibles sin JS / LCP diferido — 🔴 → 🕓
El `<h1>` del hero llega al cliente como
`style="…;opacity:0;clip-path:inset(0 0 100% 0)"` y el subtítulo como `opacity:0;transform:translateY(28px)`
(confirmado en el HTML del SSR). **Todas** las secciones usan `initial="hidden"` / `whileInView`.
Consecuencias:
- **LCP:** el elemento más grande (titular del hero) se pinta a `opacity:0`; el LCP no “cuenta” hasta que hidrata + corre la animación (~0.9 s). En redes lentas el hero se ve vacío.
- **Sin JS / si la hidratación falla:** la página queda **completamente en blanco** (todo a `opacity:0`).
- **Propuesta** (no aplicada por afectar la animación — decisión tuya):
  - Hero: que el estado inicial sea **visible** y animar solo un matiz (p. ej. `y` pequeño) — o servir el titular visible y aplicar la animación solo si hay JS.
  - Global: envolver en `<MotionConfig reducedMotion="user">` y/o usar `whileInView` con un fallback CSS visible.
  - Alternativa de bajo costo: el proyecto **ya tiene** `lib/useReveal.ts` (IntersectionObserver + CSS) que revela sin dejar el contenido oculto de base. Reutilizarlo elimina el problema y de paso reduce dependencia de Framer (ver 2.3).

### 1.3 · Lenis ignora `prefers-reduced-motion` — 🟡 → ✅
`lib/providers.tsx` afirmaba en un comentario que “Lenis respeta el valor nativo del browser”. **Falso**: Lenis no lo hace por su cuenta.
- ✅ **Aplicado:** ahora no se inicializa Lenis si `prefers-reduced-motion: reduce`, y reacciona a cambios del setting en vivo (deja el scroll nativo).

### 1.4 · Código muerto (componentes / hooks / CSS) — 🟡 → 🕓
Sin referencias en todo el árbol (confirmado por grep). **No los borré** porque el repo **no está bajo git** (no hay red de seguridad para revertir) y algunos parecen “estacionados” para reincorporar. Recomendado eliminar tras tu OK:
| Archivo | Estado | Nota |
|---|---|---|
| `components/sections/SuplaiHeroBackground.jsx` (~355 líneas) | sin importar | Canvas del hero que se reemplazó por el fondo estático. Genera el único warning de lint. |
| `components/sections/ConfianzaSection.tsx` | sin montar | No está en `app/page.tsx`. Consume `CONFIANZA` (copy). |
| `lib/useCountUp.ts` | sin usar | Hook de count-up nunca invocado. |
| `lib/useReveal.ts` | sin usar | Útil: candidato a **reutilizar** para 1.2 / 2.3 en vez de borrar. |
| `@keyframes suphub` en `app/globals.css` | sin usar | No hay `animation: suphub` en el código. |

### 1.5 · Assets muertos: videos del hero (~23 MB) — 🟡 → 🕓
`public/videos/` contiene 4 MP4 + 4 posters JPG + README, **ninguno referenciado**:
```
logistics-ship-hero.mp4    8.9M
logistics-plane-hero.mp4   4.9M
logistics-truck-hero.mp4   4.1M
logistics-ai-hero.mp4      4.1M
+ 4 posters JPG (~820K)     ·  TOTAL ≈ 23 MB
```
No afectan el bundle JS, pero inflan el repo y el deploy. Eliminar tras tu OK (o mover fuera del repo si son para un hero con video a futuro).

### 1.6 · Links / anchors / botones — 🟢
- Todos los CTA “Agendá una demo” resuelven a `mailto:admin@getsuplai.com` → **tienen acción** (no están rotos).
  - 🕓 Sugerencia menor: agregar `?subject=` para pre-rellenar el asunto (ver Fase 3).
- ✅ Logo del Navbar: `href="#"` → **`href="#inicio"`** (el hero tiene `id="inicio"`) + `aria-label`. Evita saltar a un hash vacío.
- Footer: links externos con `target="_blank" rel="noopener noreferrer"` correctos ✅; `tel:`/`mailto:` correctos ✅.

### 1.7 · Responsive — 🔴 / 🟡 → 🕓 _(verificar en browser)_
- 🔴 **`SolucionSection` en mobile.** Es `height:280vh` con contenido en un `sticky top-0 h-screen flex items-center`.
  Debajo de `lg` el grid colapsa a **1 columna**: titular + `OperationsHub` (bloque cuadrado ~ancho completo) + strip de integraciones + los 3 pasos con rail. Todo eso **no entra en 100vh**; al estar centrado con `items-center`, se **recorta arriba y abajo** en teléfonos (360–414 px). Necesita layout mobile propio (hub más chico u oculto, o scroll no-sticky en mobile).
- 🟡 **`EmpresasSection`, descriptor con `sm:whitespace-nowrap`.** En tablets angostas (≈640–860 px) los textos largos (“Muchas entregas por día, confirmaciones que traban el cierre.”) fuerzan `nowrap` en la columna derecha → riesgo de **overflow horizontal / texto pegado**. Revisar breakpoint o permitir wrap.
- 🟢 Hero, Problema, Agentes, Cómo trabajamos, Visión: usan `clamp()` y grids que colapsan bien; sin overflow evidente.

### 1.8 · Accesibilidad — 🟡 → mezcla
- ✅ Foco visible: CTAs, navbar y footer tienen `focus-visible:ring`. Bien.
- ✅ Jerarquía de headings: `h1` único en hero, `h2` por sección, `h3` en cards. Correcta.
- ✅ SVGs decorativos con `aria-hidden`. Bien.
- 🕓 **Contraste (WCAG AA).** Mucho texto blanco a baja opacidad sobre `#0A0A0A` queda por debajo de 4.5:1:
  `text-white/50` (subtítulos), `/40`, `/35` (labels de categoría), `/30` (descriptores Empresas / footer), `/25` (“Scroll”), `/20` (copyright).
  Recomiendo subir los de texto informativo a ≥ `white/65–70`. Es un cambio visual → lo dejo propuesto (Fase 3).
- 🕓 **Tap targets mobile.** CTA del navbar (`py-2` ≈ 32 px) y links del footer (`text-[12px]` inline) quedan por debajo de los 44×44 px recomendados. Aumentar padding/hit-area en mobile.
- 🕓 **Skip link.** No hay “saltar al contenido”. Aporta poco en una landing de una sola columna, pero es fácil de sumar.

### 1.9 · Hydration — 🟢
- No se detectaron mismatches en el SSR. `new Date().getFullYear()` en el footer es estable server/client (salvo el instante exacto de Año Nuevo; impacto nulo).
- Todas las secciones son `"use client"`: no hay error de hydration, pero implica que **toda** la página se hidrata en cliente (ver Fase 2).

### 1.10 · Config / documentación — 🟢 → 🕓
- `CLAUDE.md` dice “Next.js 14 / Tailwind v3 / `SuplaiHeroBackground.jsx` (Canvas)”. Real: **Next 15 / Tailwind v4** y el canvas está **muerto**. Actualizar el doc.
- `package.json` tiene `"type": "commonjs"` conviviendo con `next.config.ts` y `*.mjs`. Funciona, pero es incoherente para un proyecto ESM/Next 15. Bajo.

---

## FASE 2 — Performance

### 2.1 · Imágenes — 🟢 (N/A en la página viva)
La página **no renderiza imágenes raster**: todo es SVG inline + CSS. No hay `<img>` ni `next/image`, así que el requisito de “pasar todo por `next/image` con `sizes`” **no aplica** al contenido actual. Los únicos raster (posters de video) están muertos (1.5). ✅ Sin deuda de imágenes.

### 2.2 · Fuentes — 🟢 (bien resuelto)
- `next/font` self-host para **Inter**, **Newsreader** (fallback editorial de PP Editorial New) y **Geist Mono**, todas con `display: swap`. En el SSR se **preloadean** 4 `woff2`. Correcto y sin FOIT.
- `next/font` inyecta métricas de fallback → **CLS por fuentes mínimo**.
- 🕓 Menor: se cargan Newsreader en `300/400/500 × normal+italic`. Si en la práctica solo se usa la itálica, subsetear a los pesos/estilos realmente usados ahorra unos KB.
- 📝 Recordatorio: cuando tengas licencia de **PP Editorial New**, reemplazar Newsreader por `localFont()` (ya documentado en `layout.tsx`).

### 2.3 · Framer Motion / JavaScript — 🟡 → 🕓
- **First Load JS `/` = 154 kB** (page-specific 51.7 kB). El peso dominante es **Framer Motion**, importado en casi todas las secciones.
- Las animaciones ya usan casi solo `transform`/`opacity` ✅ (bien para el compositor). Excepción: el `clip-path` del hero no es tan barato como `transform`.
- 🕓 **Propuestas de reducción de bundle:**
  1. **`LazyMotion` + componente `m`** en vez de `motion` → carga diferida del motor de features; puede recortar decenas de KB.
  2. **Reemplazar Framer por CSS + `useReveal`** (que ya existe en el repo) para las secciones que solo hacen fade/slide de entrada (Problema, Agentes, Empresas, Cómo trabajamos, Visión, Confianza). El `OperationsHub` y el rail de Solución sí justifican Framer.
  3. `dynamic()` con `ssr:false` para el `OperationsHub` (SVG animado, no crítico, fuera del primer viewport).

### 2.4 · Lenis — 🟡 → ✅/🕓
- ✅ Ya respeta `prefers-reduced-motion` (1.3).
- 🕓 _(verificar en browser)_ Convivencia con las secciones `sticky` de scroll (`Manifiesto` 200vh, `Solución` 280vh): confirmar que no haya jank. `lenis.raf` + los listeners de scroll conviven; medir INP al hacer scroll sobre esas secciones.

### 2.5 · Scroll listeners / INP — 🟡 → ✅ (parcial)
- ✅ **`ManifiestoSection`**: el handler leía `getBoundingClientRect()` en **cada** evento de scroll (layout thrashing) y hacía `setState` por frame. Ahora está **throttleado con `requestAnimationFrame`** (una medición por frame) y con guarda `scrollable <= 0`.
- 🕓 **`SolucionSection`** usa `useScroll` de Framer + `useMotionSnapshot` que hace `setState` en cada cambio de progreso → re-render de la sección durante todo el scroll de 280vh. Considerar derivar los estilos con `useTransform`/`style` de MotionValues (sin `setState`) para evitar re-renders de React.
- ✅ `Navbar` usa listener `passive` con un solo `setState` booleano (barato).

### 2.6 · Core Web Vitals (estimado)
| Métrica | Estimación | Qué la empuja | Acción |
|---|---|---|---|
| **LCP** | ⚠️ En riesgo | Titular del hero servido a `opacity:0` hasta hidratar + animar (1.2) | Hero visible de entrada (1.2) |
| **CLS** | ✅ Bajo | `next/font` con métricas de fallback; sin imágenes; hero con `min-h-[100dvh]` | Mantener |
| **INP** | 🟡 Medio | `setState` por frame en Manifiesto (ya mitigado) y Solución; Lenis + sticky | 2.5 / 2.3 |

---

## FASE 3 — Recomendaciones de UI (propuestas, NO aplicadas)

Cada una: **qué · por qué · impacto**.

### 3.1 · Hero visible y con foco en los primeros 3 s — 🔴 impacto alto
- **Qué:** que el titular se vea de inmediato (sin gate de JS) y reforzar una sola idea. Hoy el hero abre **en negro/vacío** hasta que anima.
- **Por qué:** es el momento de mayor deserción; además el problema técnico de 1.2 hace que el mensaje llegue tarde.
- **Impacto:** alto en comprensión + LCP + conversión.

### 3.2 · Disciplina del azul de acento — 🟡 impacto medio
- **Qué:** el `#2563EB` aparece en itálicas de firma, números, líneas, hover de íconos, rails, CTAs y strips. Se **diluye**.
- **Por qué:** cuando el acento está en todo, deja de jerarquizar; el ojo no sabe qué es lo importante.
- **Impacto:** reservar el azul para (a) la palabra-firma en itálica y (b) el CTA primario; bajar el resto a grises. Sube el peso percibido del CTA.

### 3.3 · Itálica PP Editorial New (hoy Newsreader) como firma intencional — 🟡 medio
- **Qué:** la itálica azul se usa en hero, agentes, empresas y visión. Definir una regla: **una** palabra-remate por sección, no decorativa.
- **Por qué:** repetida en cada título pierde el efecto “firma”.
- **Impacto:** más intención editorial, menos “plantilla”.

### 3.4 · CTA “Agendá una demo”: fricción y jerarquía — 🟡 medio
- **Qué:** hoy es un `mailto:` crudo. Opciones: (a) `mailto:` con `?subject=Quiero%20una%20demo%20de%20Suplai`; (b) link a un scheduler (Calendly/Cal.com); (c) form corto.
- **Por qué:** abrir el cliente de mail vacío es alta fricción y muchos navegadores web no tienen handler de `mailto`.
- **Impacto:** directo en la tasa de agendamiento. (Cambiar el destino puede tocar copy/flow → tu decisión.)

### 3.5 · Ritmo y densidad — 🟢/🟡
- **Qué:** `Manifiesto` (200vh) + `Solución` (280vh) son **dos** secciones sticky largas casi seguidas → mucho scroll “atado”. Además `PROBLEMA.anchor` repite casi textual el mensaje del `Manifiesto` (“Tener los datos no alcanza / Alguien tiene que actuar sobre ellos”).
- **Por qué:** dos scroll-jacks consecutivos cansan; el mensaje repetido resta en vez de sumar.
- **Impacto:** considerar acortar una de las dos secciones sticky y diferenciar el copy del ancla de Problema. _(Copy: solo marcado, no lo toqué.)_

### 3.6 · Micro-interacciones que sumen sin costo — 🟢
- **Qué:** estados `hover`/`focus` de cards ya son buenos. Sumar: subrayado animado en links del footer, y en el CTA un desplazamiento sutil de flecha (como ya hace `ExpansionCard`).
- **Por qué:** refuerzan “producto cuidado” sin peso.
- **Impacto:** bajo esfuerzo, buen retorno percibido. Mantener todo en `transform`/`opacity`.

### 3.7 · Consistencia de espaciados — 🟢
- **Qué:** los paddings verticales de sección varían (`py-24`, `py-28`, `py-32`, `py-36`, `py-40`, `py-44`). Definir una escala (p. ej. 24/32/40) y aplicarla.
- **Por qué:** ritmo vertical más predecible = se siente más pro.
- **Impacto:** cosmético pero acumulativo.

---

## Checklist — aplicado vs pendiente

> **Segunda pasada:** se aplicaron TODOS los cambios técnicos del relevamiento. Solo quedan pendientes
> los ítems de **art-direction puramente subjetivos** que necesitan iteración visual en el browser (que no estaba disponible).
> Resultado de bundle: **página `/` 51.7 kB → 14 kB · First Load 154 kB → 131 kB**. Build 100% estático, sin warnings.

### ✅ Aplicado
**SEO / assets**
- [x] `metadataBase`, OpenGraph, Twitter Card, canonical, robots, keywords, title template (`app/layout.tsx`). Verificado en SSR.
- [x] Favicon / app-icon: `app/icon.svg` (logo Suplai) → `<link rel="icon">` automático.
- [x] Imagen Open Graph 1200×630 con `next/og`: `app/opengraph-image.tsx` → `og:image` + `twitter:image` automáticos, generada estática en build.

**Bugs / LCP / a11y**
- [x] 🔴 Hero: reescrito como **Server Component** con entrada por CSS (`.hero-rise`). El `<h1>` ahora se sirve **visible** (sin `opacity:0`/`clip-path`): arregla LCP y el “blanco sin JS”. Verificado en SSR.
- [x] Global: `<LazyMotion features={domAnimation}>` + `<MotionConfig reducedMotion="user">` en `lib/providers.tsx` → todas las secciones respetan `prefers-reduced-motion`.
- [x] Lenis respeta `prefers-reduced-motion` y reacciona a cambios en vivo (`lib/providers.tsx`).
- [x] Navbar logo `href="#"` → `#inicio` + `aria-label`.
- [x] Contraste AA: subidas las opacidades de texto informativo en secciones oscuras (Hero, Agentes, Empresas, Visión, footer).
- [x] Tap targets: padding del CTA del Navbar y de los links del footer.

**Performance**
- [x] 🔴→ Bundle Framer Motion: `LazyMotion` + `motion`→`m` en las 6 secciones que lo usan. Hero ya no importa Framer.
- [x] `ManifiestoSection`: scroll throttleado con `rAF` (evita layout thrashing).

**Responsive** (verificado con screenshots reales en 360/768/1440 vía Chrome headless — no hay overflow horizontal en ningún ancho)
- [x] 🔴 `SolucionSection`: el scroll-jack (sticky 280vh) es ahora **solo `lg`**; en mobile fluye normal con los pasos siempre visibles (ya no se recorta). `matchMedia('(min-width:1024px)')`.
- [x] 🔴 `ManifiestoSection`: mismo tratamiento — el scroll-jack de 200vh es **solo `lg`**; en mobile es una sección compacta con el texto ya en su color final (antes eran 2 pantallas de scroll “muerto” para 2 líneas).
- [x] 🟡 `OperationsHub`: **bug de posiciones** — dos nodos estaban en el mismo ángulo (210° = −150°) y se superponían (VOZ/XLS) en todos los tamaños. Corregido. Hub también acotado en mobile (`max-w-[300px] sm:max-w-[380px] lg:max-w-[420px]`).
- [x] 🟡 `EmpresasSection`: descriptor sin `whitespace-nowrap`, con `sm:max-w-[46%] sm:text-right` (no desborda en tablet).

**Limpieza / docs**
- [x] Eliminado código muerto: `SuplaiHeroBackground.jsx`, `ConfianzaSection.tsx`, `lib/useCountUp.ts`, `lib/useReveal.ts`, CSS `.reveal`/`.in-view` y `@keyframes suphub`.
- [x] Eliminados ~23 MB de videos sin usar (`public/videos/`).
- [x] CTA `mailto:` con `?subject=` en Hero, Navbar, Visión y card de expansión de Agentes.
- [x] Normalizada la escala de padding vertical de secciones (`py-28 md:py-36`; Visión mantiene `py-32 md:py-44` como cierre intencional).
- [x] `CLAUDE.md` actualizado al stack real (Next 15 / React 19 / Tailwind v4 / Framer + Lenis).
- [x] `tsc --noEmit` limpio · build estático sin warnings.

### 🕓 Pendiente — art-direction (necesita iteración visual en browser, propuesto)
- [ ] **Disciplina del azul de acento** (3.2): reservar `#2563EB` para firma + CTA primario, bajar el resto a grises. Es un rediseño con criterio; conviene verlo en pantalla antes de aplicar.
- [ ] **Itálica como firma intencional** (3.3): regla de una palabra-remate por sección.
- [ ] **Ritmo de las dos secciones sticky** (3.5): evaluar acortar `Manifiesto` o `Solución` (scroll-jack doble). Toca UX de scroll → mejor decidir viéndolo.
- [ ] Micro-interacción menor: subrayado animado en links del footer (3.6).
- [ ] `useTransform` en `SolucionSection` para evitar re-render por frame (2.5): optimización fina de bajo impacto (4 pasos); se dejó el `useMotionSnapshot` actual para no arriesgar el efecto de atenuado sin verificación visual.

### 📝 Solo marcado (copy en `/content/` — NO tocado, requiere tu decisión)
- [ ] `PROBLEMA.anchor` casi idéntico a `MANIFIESTO.subcopy` (mensaje repetido en secciones consecutivas).
- [ ] Copy ahora huérfano: `CONFIANZA` (su sección se eliminó por estar sin montar), `AGENTES.badge`, `AGENTES.highlights`, `agent.live` (no se consumen en `AgentesSection`). Se pueden borrar del `content/index.ts` o cablearse a la UI — tu decisión.
