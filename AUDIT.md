# AUDIT — landing de Suplai

Estado real del repo al 2026-11-11, en la rama `mejora/marca-premium` (sale de `mejora/revision-integral`, que a su vez sale de `mejora/producto-conversion`).
Stack: Next.js 15.5.29 (App Router), React 19, Tailwind v4, Framer Motion 12, Lenis 1.3.
Página única, 100% estática.

## Verificación

| Chequeo | Resultado |
|---|---|
| `npx tsc --noEmit` | Pasa |
| `npm run build` | Pasa. `/` pesa 19 kB, First Load JS 152 kB |
| `npm run lint` (CLI de ESLint) | Sin errores ni warnings |
| Overflow horizontal en 375, 768 y 1440 px | Ninguno |
| Texto cortado en 375, 768 y 1440 px | Ninguno (solo los `sr-only`) |
| Consola | Limpia |
| Saltos de layout al cargar | Ninguno en cuatro corridas a 375, 1350 y 1440 px |
| Video del hero | No se pide al cargar la página en ningún ancho; se pide cuando entra en pantalla |
| `prefers-reduced-motion` | Sin animaciones corriendo, video en pausa, Lenis apagado |

### Lighthouse

Medido contra `localhost` con el build de producción y throttling simulado. No son números de producción.

| | Mobile antes | Mobile ahora | Desktop antes | Desktop ahora |
|---|---|---|---|---|
| Performance | 77 | 100 | 100 | 100 |
| Accesibilidad / Buenas prácticas / SEO | 100 / 100 / 100 | 100 / 100 / 100 | 100 / 100 / 100 | 100 / 100 / 100 |
| FCP | 0,9 s | 0,9 s | 0,3 s | 0,2 s |
| LCP | 6,4 s | 0,9 s | 0,8 s | 0,2 s |
| TBT | 10 ms | 30 a 50 ms | 0 ms | 0 ms |
| CLS | 0 | 0 | 0 | 0 |
| Peso transferido | 991 KB | 841 KB | 2.096 KB | 841 KB |

"Antes" es el estado de `mejora/producto-conversion`. No hay tests automatizados; las verificaciones se corrieron con scripts de Playwright y Lighthouse que no forman parte del repo.

## Recorrido de la página

1. **Hero** (oscuro). La propuesta como `h1`, la industria que rota como línea secundaria, CTA de demo y de WhatsApp, lista de países y, en desktop, el mapa. Segundo acto con video. En desktop el escenario queda fijo durante 180svh.
2. **Clientes y apoyos** (claro). Tres logos en fila fija y la fila "Apoyados por".
3. **Problema** (oscuro).
4. **Solución** (claro). Diagrama de tres planos (SVG en desktop, versión vertical en mobile), tres pasos y la vista de Suplai Control.
5. **Agentes** (oscuro). Seis agentes con mockup y link a WhatsApp, más la card del agente a medida a todo el ancho.
6. **Industrias** (claro). Dolores por industria y el agente con el que conviene empezar.
7. **Cómo trabajamos** (oscuro). Cuatro pasos fijos durante 300svh en desktop.
8. **Principios** (claro).
9. **Preguntas frecuentes** (blanco).
10. **Cierre y contacto** (oscuro) y footer.

## Sistema de marca v2 (kit Premium-Suplai)

Aplicado en `mejora/marca-premium` a partir de `CAMBIOS.md` y del manual de marca.

- **Color**: Hueso como fondo principal y Lino de apoyo; Noche y Marino en los oscuros; Arena en las líneas; Piedra en el texto secundario. Problema y Agentes pasaron a fondo claro.
- **Tipografía**: Geist como única familia (una sola fuente, 29 KB). Titulares en peso 460 y en dos tonos. Se fueron Inter, Newsreader y Geist Mono.
- **Estados**: Azul o Celeste para Resuelto, Lavanda para En curso y Baliza para Escalado, como etiquetas en mayúscula chica.
- **Recursos**: botón principal con esquina en chaflán, chaflán en las fotos de Industrias y del menú, y línea de ejecución en el hero y el cierre.
- **Logo**: lockups e isotipo vectoriales del kit; el favicon ya es el isotipo.
- **Documentación**: `CLAUDE.md` y `PRODUCT.md` describen el sistema nuevo.

No se aplicó, por decisión: el copy del kit ("Queda hecho. Y queda registrado.", "plataforma de agentes de IA", "Escalado a tu equipo") y la quita de logos de clientes.

Abierto:
- Los colores de estado de la landing ya no coinciden con los de Suplai Control (verde y violeta). Falta decidir si el producto adopta los del kit.
- Los puntos de Lavanda y Baliza sobre blanco tienen menos de 3 a 1 de contraste. Siempre van acompañados del texto del estado, así que no son el único indicador.
- El kit advierte que el nombre "Suplai" del logo está calcado de un PNG. Sirve para pantalla; para imprenta hace falta el vector original.
- La imagen Open Graph y el schema.org siguen usando los lockups en PNG.
- `CAMBIOS.md` dice que con Costa Oriental hay NDA y que El Naranjo no figura en el contexto del proyecto. Los tres logos de clientes siguen publicados por decisión explícita.

## Qué cambió en la revisión integral

### Performance
- El titular del hero ya no entra desde `opacity: 0`. Chrome no contaba ese texto como LCP y el LCP en mobile daba 6,4 s.
- Fuentes: Newsreader solo en itálica y Geist Mono sin precarga. Se quitó la dependencia `geist`.
- Google Analytics pasa a `lazyOnload`. Mismo ID y configuración, sin eventos nuevos.
- Calidad 75 en las fotos que van bajo una capa oscura.
- Los eventos en loop del diagrama corren solo cuando se ven.
- El video del hero se pide solo cuando tiene área visible, también en desktop.
- Corregido un parpadeo del poster del video sobre el hero al hidratar en desktop, que además producía un salto de layout intermitente.

### Mensaje
- Problema, pasos de Solución y varios bullets reescritos. "Llamadas", "Mail" y "choferes" unificados.
- Un solo CTA al final de Cómo trabajamos.
- Agente nuevo de facturas y documentos por mail, que el hero prometía y no existía.
- Cada industria enlaza al agente con el que conviene empezar.

### Diseño y animación
- Diagrama de Solución legible en mobile.
- Clientes en fila fija, sin marquee. Se borró el componente `Marquee`.
- Hero sin mapa en mobile y tablet; Industrias a dos columnas en tablet.
- La industria del hero rota con un deslizamiento, sin letras al azar.
- Cómo trabajamos pasa de 440svh a 300svh.

### Accesibilidad y SEO
- El acto del hero que no se ve queda `inert`.
- Áreas táctiles más grandes en links, header y footer.
- El botón flotante de WhatsApp en mobile aparece solo al scrollear hacia arriba.
- Datos estructurados `FAQPage` con las preguntas que tienen respuesta completa.
- `apple-icon` con el isotipo real.

### Mantenimiento
- `npm audit fix`: de 12 a 8 vulnerabilidades informadas. Next 15.5.29.
- Lint con el CLI de ESLint. `CLAUDE.md` al día.

## Pendiente

### Bloquea la publicación
- Cuatro `[COMPLETAR ...]` en `FAQ` (`content/index.ts`): sistemas con integración probada, tratamiento de datos, modelo de precios y qué se necesita del cliente. Se ven tal cual en la página.

### Para validar
- El mapeo industria → agente es una propuesta editorial: logística → voz, distribuidoras → choferes, importadoras → facturas y documentos, portuarias → agenda y turnos, flota propia → incidencias, centros de distribución → WhatsApp.
- El copy del agente de facturas y documentos sale de lo que muestra la demo.
- "Ya trabajan con Suplai" asume que los tres logos son clientes activos.

### Necesita assets o decisiones
- Logos de clientes y apoyos en vector. Hoy son PNG embebidos en SVG (512 KB en total) y son lo más pesado de la carga inicial.
- Video del producto real para el hero, en lugar del de stock.
- Link a la demo del producto, si se puede mostrar a prospectos.
- Contenido real sobre el equipo y algún caso de cliente.

### No se hizo
- Polyfills (12 KB): Next 15 ya apunta a navegadores modernos por defecto; un `browserslist` propio no cambia nada.
- Pasar secciones a Server Components: el ahorro es chico porque Framer Motion sigue haciendo falta.
- Las 8 vulnerabilidades restantes piden `npm audit fix --force`, con cambios de ruptura.
- Los pulsos del mapa y de la llamada siguen en loop aunque no se vean. Son CSS y cuestan poco.

### Deuda técnica
- Sin tests. Las reglas del repo piden TDD y 80% de cobertura; no existe la infraestructura.
- La página mide 23 pantallas en mobile. Sumar el agente nuevo y el diagrama vertical la alargó un poco.
- La imagen OG usa la fuente por defecto de `next/og`, no Geist.
