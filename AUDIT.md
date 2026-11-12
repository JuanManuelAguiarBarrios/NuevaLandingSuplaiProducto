# AUDIT — landing de Suplai

Estado real del repo al 2026-11-11, en la rama `mejora/producto-conversion`.
Stack: Next.js 15.5.21 (App Router), React 19, Tailwind v4, Framer Motion 12, Lenis 1.3.
Página única, 100% estática.

## Verificación

| Chequeo | Resultado |
|---|---|
| `npx tsc --noEmit` | Pasa |
| `npm run build` | Pasa. `/` pesa 18 kB, First Load JS 150 kB |
| `npx next lint` | Sin errores ni warnings |
| Overflow horizontal en 360, 768 y 1440 px | Ninguno (medido en el build de producción con Chromium headless) |
| Texto cortado en 360, 768 y 1440 px | Ninguno (los únicos elementos recortados son los `sr-only`) |
| Video del hero en mobile | No se pide en la carga inicial; se pide al acercarse a la pantalla |

No hay tests automatizados en el repo. Las verificaciones de arriba se corrieron a mano con scripts de Playwright que no forman parte del repo.

## Recorrido de la página

1. **Hero** (oscuro). Primer acto: la propuesta como `h1`, la industria que rota como línea secundaria, CTA de demo y de WhatsApp, lista de países y mapa. Segundo acto: video con el titular "Mientras tu equipo opera, los agentes responden". En desktop el escenario queda fijo durante 180svh; en mobile y con `prefers-reduced-motion` los dos actos se apilan.
2. **Clientes y apoyos** (claro). Marquee de logos y fila "Apoyados por".
3. **Problema** (oscuro).
4. **Solución** (claro). Diagrama de tres planos, tres pasos y la vista de Suplai Control con los estados En curso, Resuelto y Escalación.
5. **Agentes** (oscuro). Grilla de 1, 2 y 3 columnas, sin pin. Cada card lleva un mockup de producto y un link a WhatsApp con mensaje precargado.
6. **Industrias** (claro). Tabs en desktop, acordeón en mobile.
7. **Cómo trabajamos** (oscuro). Cuatro pasos fijos con wipe en desktop. Pasos 01 y 02 con foto, 03 y 04 con mockup.
8. **Principios** (claro).
9. **Preguntas frecuentes** (blanco). Acordeón con `<details>` nativo.
10. **Cierre y contacto** (oscuro) y footer.

Además hay un botón flotante de WhatsApp que se oculta sobre el hero y sobre el cierre.

## Qué cambió en esta rama

### Producto
- `components/product/`: piezas base de las vistas de producto (`MockupPanel`, `StatusPill`, `ControlPanel`, íconos propios).
- `components/agents/mockups/`: conversación de WhatsApp, llamada con transcripción, entrega confirmada, agenda de turnos e incidencia escalada.
- Los mockups usan los datos ficticios de la demo (Andarivel Logística, envío AND-1042). Se exponen como imagen con descripción y su contenido queda oculto para lectores de pantalla.
- El azul quedó reservado a la palabra en itálica y al CTA primario. Los estados de Control usan `--color-state-*` solo en el punto de la píldora.
- Escala vertical unificada en `py-24 lg:py-36` y titulares de sección en `text-h1` (Solución y FAQ en `text-h2` por el ancho de su columna).

### Mensaje
- `POSITIONING` en `content/index.ts` es la única fuente del titular del hero, el `<title>`, la description, el schema.org y la imagen Open Graph.
- Imagen OG con el lockup real de `public/brand`.
- `lang="es-UY"`.

### Scroll
- Hero de 240svh a 180svh. Agentes sin scroll horizontal. Sigue habiendo una sección fija además del hero: Cómo trabajamos (440svh en desktop).

### Conversión
- WhatsApp en el hero, botón flotante y mensaje precargado por agente (`agentWhatsappUrl` en `content/index.ts`).
- FAQ con cinco preguntas. Cuatro respuestas tienen placeholders para completar.

### Performance y limpieza
- Video del hero: `public/hero/operacion.mp4`, 1,1 MB (antes 4,2 MB), sin audio, con poster del primer cuadro y `preload="none"`.
- `public/` pasó de unos 29 MB a 2,6 MB al borrar siete videos y dos fotos sin uso.
- Caché de `public/`: `max-age` de un día con `stale-while-revalidate` de una semana (antes `immutable` por un año sobre archivos sin hash).
- `eslint-config-next` 15.5.21, igual que Next, con `FlatCompat`.

## Pendiente

### Para completar por el equipo
- Placeholders `[COMPLETAR ...]` en `FAQ` (`content/index.ts`): sistemas con integración probada, tratamiento de datos, modelo de precios y qué se necesita del cliente. Hoy se ven tal cual en la página, así que hay que completarlos antes de publicar.

### Logos (no resuelto)
- Los seis SVG de `public/clientes` y `public/apoyos` no son vectores: cada uno envuelve dos PNG en base64 (imagen y máscara). SVGO les saca entre 0,2% y 0,5%, y en `costa-oriental.svg` alteró el render, así que quedaron sin tocar (36 a 136 KB cada uno, 512 KB en total).
- La mejora real es conseguir los logos en vector, o reexportarlos como PNG o WebP del tamaño en que se muestran (44 px de alto).

### Decisiones abiertas
- `public/hero/poster.webp` es la foto de un depósito y el video muestra un playón de camiones. Como poster habría producido un salto de imagen al arrancar el video, así que el poster es el primer cuadro del video (`operacion-poster.webp`). `poster.webp` sigue en uso en el menú.
- El botón flotante de WhatsApp en mobile ocupa 48 px sobre el margen derecho. Mientras está visible puede superponerse al signo de abrir de las preguntas frecuentes y de Industrias.
- El verde de WhatsApp no es un token de la marca, por eso el botón flotante y los links de WhatsApp van en tono neutro.
- Las horas (10:42) y los códigos de envío (AND-1042) de los mockups conservan los dos puntos y el guion por ser datos de interfaz. La regla de copy sin dos puntos ni guiones se mantiene en el resto del texto.
- La demo no tiene pantallas de agenda de turnos ni de incidencias. Esos dos mockups están compuestos con las piezas de Control, no copiados de una vista existente.
- La imagen OG no carga una fuente serif, así que la palabra en acento va en celeste pero no en itálica.

### Deuda técnica
- Sin tests. Las reglas del repo piden TDD y 80% de cobertura; no existe la infraestructura.
- `next lint` está deprecado y desaparece en Next 16. Al migrar hay que pasar al CLI de ESLint.
- `npm audit` informa 12 vulnerabilidades en dependencias. No se tocaron en esta rama.
- `CLAUDE.md` todavía describe la entrada del hero con `.hero-rise` (la clase real es `.intro`) y dice que no hay `inline style` salvo valores dinámicos, que se cumple.
- PP Editorial New sigue sin licencia; Newsreader es el reemplazo.
- Google Analytics no se tocó ni se agregaron eventos.
