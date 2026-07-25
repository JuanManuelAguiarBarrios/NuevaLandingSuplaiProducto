import Image from 'next/image'
import { COMO_TRABAJAMOS } from '@/content'

/**
 * Visuales de los paneles de "Así trabajamos" (ref. Centinel): construidos
 * en código — divs + SVG, sin imágenes raster. Esqueletos grises, tarjetas
 * blancas con sombra suave, azul como único acento. Los valores numéricos
 * son ilustrativos y viven en content (COMO_TRABAJAMOS.paneles).
 * Altura fija compartida: el panel no salta al cambiar de tab.
 */

const { paneles } = COMO_TRABAJAMOS

const CARD =
  'rounded-lg border border-border bg-white shadow-[0_8px_24px_-12px_rgba(10,10,10,0.14)]'

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-primary">
      {children}
    </span>
  )
}

/** Filas grises de esqueleto — el "contenido" difuso de un panel. */
function SkeletonRows({ rows = 3 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className="h-2.5 rounded bg-[#EEF0F3]"
          style={{ width: `${100 - i * 14}%` }}
        />
      ))}
    </div>
  )
}

/* ── 01 · Integración: Suplai conectado a los sistemas ──────── */
function VisualIntegracion() {
  const { sistemas, badge } = paneles.integracion
  const cardYs = [8, 34, 60, 86]
  return (
    <div className="relative h-[260px] w-full md:h-[300px]" aria-hidden="true">
      {/* Dashboard esqueleto de fondo, desenfocado */}
      <div
        className={`${CARD} absolute inset-y-6 right-0 hidden w-[42%] p-4 opacity-50 blur-[2px] sm:block`}
      >
        <div className="mb-3 h-3 w-1/2 rounded bg-[#E5E7EB]" />
        <SkeletonRows rows={4} />
      </div>

      {/* Líneas conectoras */}
      <svg
        viewBox="0 0 600 300"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {cardYs.map((y, i) => (
          <path
            key={i}
            d={`M150 150 C 260 150, 300 ${y * 3}, 390 ${y * 3}`}
            fill="none"
            stroke="#D1D5DB"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Nodo Suplai + badge */}
      <div className="absolute left-[6%] top-1/2 flex -translate-y-1/2 flex-col items-start gap-2.5">
        <div className={`${CARD} px-4 py-3`}>
          <Image
            src="/brand/suplai-lockup-black.png"
            alt=""
            width={72}
            height={19}
            className="h-4 w-auto"
          />
        </div>
        <Chip>{badge}</Chip>
      </div>

      {/* Sistemas del cliente */}
      {sistemas.map((sistema, i) => (
        <div
          key={sistema}
          className={`${CARD} absolute left-[65%] -translate-y-1/2 px-3.5 py-2 font-mono text-[11px] tracking-[0.06em] text-ink`}
          style={{ top: `${cardYs[i]}%` }}
        >
          {sistema}
        </div>
      ))}
    </div>
  )
}

/* ── 02 · Diagnóstico: hallazgos sobre un panel esqueleto ───── */
function VisualDiagnostico() {
  const { hallazgos, chip } = paneles.diagnostico
  const offsets = ['0%', '10%', '4%']
  return (
    <div className="relative h-[260px] w-full md:h-[300px]" aria-hidden="true">
      <div className={`${CARD} absolute inset-y-2 left-0 hidden w-[46%] p-4 opacity-60 sm:block`}>
        <div className="mb-3 h-3 w-2/3 rounded bg-[#E5E7EB]" />
        <SkeletonRows rows={5} />
      </div>

      <div className="absolute inset-y-0 right-0 flex w-full flex-col justify-center gap-3 sm:w-[58%]">
        {hallazgos.map((hallazgo, i) => (
          <div
            key={hallazgo}
            className={`${CARD} flex items-center justify-between gap-3 px-4 py-3`}
            style={{ marginLeft: offsets[i] }}
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`size-1.5 shrink-0 rounded-full ${i === 0 ? 'bg-primary' : 'bg-[#D1D5DB]'}`}
              />
              <span className="font-sans text-[12.5px] font-light text-ink">{hallazgo}</span>
            </span>
            {i === 0 && <Chip>{chip}</Chip>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 03 · Operación: el agente ejecuta, el equipo supervisa ─── */
function VisualOperacion() {
  const { chips } = paneles.operacion
  return (
    <div className="relative h-[260px] w-full md:h-[300px]" aria-hidden="true">
      {/* Panel de operación esqueleto */}
      <div className={`${CARD} absolute inset-y-2 left-0 w-[70%] p-4 sm:w-[62%]`}>
        <div className="mb-4 flex items-center justify-between">
          <div className="h-3 w-2/5 rounded bg-[#E5E7EB]" />
          <div className="size-6 rounded-full bg-[#EEF0F3]" />
        </div>
        <SkeletonRows rows={5} />
        <div className="mt-4 h-16 rounded-md bg-[#F4F5F7]" />
      </div>

      {/* Chips de actividad flotando sobre el panel */}
      {chips.map((chipItem, i) => (
        <div
          key={chipItem.texto}
          className={`${CARD} absolute flex items-center gap-3 px-4 py-3`}
          style={{
            right: i === 0 ? '0%' : '6%',
            top: i === 0 ? '22%' : '58%',
          }}
        >
          {/* Avatares: el equipo mirando lo que el agente hizo */}
          <span className="flex -space-x-1.5" aria-hidden="true">
            <span className="size-5 rounded-full border-2 border-white bg-[#D1D5DB]" />
            <span className="size-5 rounded-full border-2 border-white bg-[#E5E7EB]" />
            <span className="size-5 rounded-full border-2 border-white bg-primary/25" />
          </span>
          <span>
            <span className="block font-sans text-[16px] font-semibold leading-tight text-ink">
              {chipItem.valor}
            </span>
            <span className="block font-sans text-[11px] font-light text-muted">
              {chipItem.texto}
            </span>
          </span>
          <span className="ml-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
            {chipItem.actor}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── 04 · Mejora continua: curva ascendente, sin métrica nombrada ── */
function VisualMejora() {
  const { chip, ejes } = paneles.mejora
  return (
    <div className="relative h-[260px] w-full md:h-[300px]" aria-hidden="true">
      <div className={`${CARD} absolute inset-0 flex flex-col p-5`}>
        <div className="flex items-center justify-between">
          <div className="h-3 w-1/3 rounded bg-[#E5E7EB]" />
          <Chip>{chip}</Chip>
        </div>

        <svg
          viewBox="0 0 480 180"
          preserveAspectRatio="none"
          className="mt-4 w-full flex-1"
        >
          {[45, 90, 135].map((y) => (
            <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#F3F4F6" strokeWidth="1" />
          ))}
          <line x1="0" y1="170" x2="480" y2="170" stroke="#E5E7EB" strokeWidth="1" />
          <path
            d="M12 158 C 90 152, 150 128, 220 104 S 380 46, 462 26"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="462" cy="26" r="4" fill="#2563EB" />
        </svg>

        <div className="mt-3 flex justify-between px-1">
          {ejes.map((eje) => (
            <span
              key={eje}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted"
            >
              {eje}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const VISUALS = [VisualIntegracion, VisualDiagnostico, VisualOperacion, VisualMejora]

export default function StepVisual({ index }: { index: number }) {
  const Visual = VISUALS[index] ?? VisualIntegracion
  return <Visual />
}
