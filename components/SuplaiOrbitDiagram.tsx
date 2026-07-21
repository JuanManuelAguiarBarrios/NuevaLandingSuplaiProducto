/**
 * Diagrama "Órbita viva": anillo externo de integraciones + anillo interno de
 * sistemas, girando alrededor del logo de Suplai. CSS puro (sin Framer Motion)
 * para separar esta animación perpetua del reveal de entrada, que se maneja
 * desde el motion.div que envuelve a este componente en SolucionSection.
 */
type Item = { label: string; icon: (px: number) => React.ReactNode }

const stroke = (px: number, children: React.ReactNode) => (
  <svg
    width={px}
    height={px}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const OUTER: Item[] = [
  {
    label: 'WhatsApp',
    icon: (px) => (
      <svg width={px} height={px} viewBox="0 0 48 48" aria-hidden="true">
        <path
          fill="#25D366"
          d="M24 4C12.95 4 4 12.95 4 24c0 3.53.93 6.84 2.55 9.71L4 44l10.53-2.5A19.9 19.9 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4z"
        />
        <path
          fill="#fff"
          d="M19.1 14.3c-.36-.8-.74-.82-1.08-.83l-.92-.01c-.32 0-.84.12-1.28.6s-1.68 1.64-1.68 4 1.72 4.64 1.96 4.96 3.34 5.34 8.24 7.28c4.08 1.6 4.9 1.28 5.78 1.2.88-.08 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56s-2.84-1.4-3.28-1.56-.76-.24-1.08.24-1.24 1.56-1.52 1.88-.56.36-1.04.12-2.02-.74-3.85-2.37c-1.42-1.27-2.38-2.83-2.66-3.31s-.03-.74.21-.98c.22-.22.48-.56.72-.84s.32-.48.48-.8.08-.6-.04-.84-1.06-2.62-1.5-3.58z"
        />
      </svg>
    ),
  },
  {
    label: 'Outlook',
    icon: (px) => (
      <svg width={px} height={px} viewBox="0 0 48 48" aria-hidden="true">
        <rect x="24" y="12" width="19" height="24" rx="2" fill="#28A8EA" />
        <path fill="#0F6CBD" d="M24 12h19L33.5 24 24 18z" opacity=".55" />
        <rect x="5" y="9" width="26" height="30" rx="3" fill="#0F6CBD" />
        <circle cx="18" cy="24" r="8" fill="none" stroke="#fff" strokeWidth="4" />
      </svg>
    ),
  },
  {
    label: 'Gmail',
    icon: (px) => (
      <svg width={px} height={px} viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#4CAF50" d="M45 16.2l-5 2.75-5 4.75L35 40h7c1.657 0 3-1.343 3-3z" />
        <path fill="#1E88E5" d="M3 16.2l3.614 1.71L13 23.7V40H6c-1.657 0-3-1.343-3-3z" />
        <polygon fill="#E53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
        <path
          fill="#C62828"
          d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859C9.132 8.301 8.228 8 7.298 8 4.924 8 3 9.924 3 12.298z"
        />
        <path
          fill="#FBC02D"
          d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341C38.868 8.301 39.772 8 40.702 8 43.076 8 45 9.924 45 12.298z"
        />
      </svg>
    ),
  },
  {
    label: 'Voz',
    icon: (px) =>
      stroke(
        px,
        <>
          <path d="M4 12v0" />
          <path d="M7 9v6" />
          <path d="M10 6v12" />
          <path d="M13 8v8" />
          <path d="M16 5v14" />
          <path d="M19 10v4" />
        </>
      ),
  },
  {
    label: 'Google Drive',
    icon: (px) => (
      <svg width={px} height={px} viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M16.5 6h15L45 29.5H30z" />
        <path fill="#4CAF50" d="M14.7 9 3 29.5 10.5 42 22.2 21.5z" />
        <path fill="#1976D2" d="M10.8 42h26.7L45 29.5H18.3z" />
      </svg>
    ),
  },
  {
    label: 'Google Sheets',
    icon: (px) => (
      <svg width={px} height={px} viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#188038" d="M29 4H13a3 3 0 0 0-3 3v34a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V13z" />
        <path fill="#0F652F" d="M29 4l9 9h-9z" />
        <rect x="16" y="22" width="16" height="13" fill="#fff" />
        <g stroke="#188038" strokeWidth="1.4">
          <line x1="16" y1="26.3" x2="32" y2="26.3" />
          <line x1="16" y1="30.6" x2="32" y2="30.6" />
          <line x1="24" y1="22" x2="24" y2="35" />
        </g>
      </svg>
    ),
  },
  {
    label: 'Microsoft Teams',
    icon: (px) => (
      <svg width={px} height={px} viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="35" cy="13" r="5" fill="#7B83EB" />
        <path fill="#7B83EB" d="M27 20h14a2 2 0 0 1 2 2v9a9 9 0 0 1-9 9h-1a9 9 0 0 1-6-2.3z" />
        <rect x="4" y="13" width="26" height="26" rx="3" fill="#4B53BC" />
        <path fill="#fff" d="M11 20h12v3.6h-4.2V32h-3.6v-8.4H11z" />
      </svg>
    ),
  },
  {
    label: 'Microsoft Excel',
    icon: (px) => (
      <svg width={px} height={px} viewBox="0 0 48 48" aria-hidden="true">
        <rect x="7" y="9" width="34" height="30" rx="3.5" fill="#107C41" />
        <path fill="#fff" d="M19 17l5 6.4L29 17h5.2l-7 8.5 7.3 8.9H29l-5-6.4-5 6.4h-5.5l7.4-8.9L13.7 17z" />
      </svg>
    ),
  },
  {
    label: 'SharePoint',
    icon: (px) => (
      <svg width={px} height={px} viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="19" cy="17" r="11" fill="#036C70" />
        <circle cx="31" cy="27" r="9" fill="#1A9BA1" />
        <circle cx="21" cy="36" r="7" fill="#37C6D0" />
        <path
          fill="#fff"
          d="M23.3 13.6c-.4-2-2.2-3.3-4.6-3.3-2.7 0-4.6 1.5-4.6 3.7 0 1.8 1.1 2.9 3.5 3.5l1.7.4c1.4.3 2 .8 2 1.6 0 1-1 1.7-2.5 1.7-1.6 0-2.7-.7-2.9-1.9h-2.6c.2 2.3 2.3 3.9 5.4 3.9 3.1 0 5.2-1.6 5.2-4 0-1.9-1.1-3-3.6-3.6l-1.5-.3c-1.5-.4-2.1-.9-2.1-1.6 0-.9.9-1.6 2.3-1.6 1.4 0 2.4.7 2.6 1.8z"
        />
      </svg>
    ),
  },
  {
    label: 'Base de datos',
    icon: (px) =>
      stroke(
        px,
        <>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
          <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
        </>
      ),
  },
]

const INNER: Item[] = [
  {
    label: 'TMS',
    icon: (px) =>
      stroke(
        px,
        <>
          <circle cx="5" cy="6" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M5 8v4a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4" />
        </>
      ),
  },
  {
    label: 'CRM',
    icon: (px) =>
      stroke(
        px,
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0" />
          <path d="M16 6.5a3 3 0 0 1 0 6" />
          <path d="M18 20a6 6 0 0 0-3-5.2" />
        </>
      ),
  },
  {
    label: 'WMS',
    icon: (px) =>
      stroke(
        px,
        <>
          <path d="M3 10l9-6 9 6v10H3V10z" />
          <path d="M8 20v-6h8v6" />
          <path d="M8 17h8" />
        </>
      ),
  },
  {
    label: 'ERP',
    icon: (px) =>
      stroke(
        px,
        <>
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M3 13l9 5 9-5" />
        </>
      ),
  },
]

type SuplaiOrbitDiagramProps = {
  size?: number
  className?: string
}

export default function SuplaiOrbitDiagram({ size = 440, className }: SuplaiOrbitDiagramProps) {
  const s = size / 440
  const rOuter = 158 * s
  const rInner = 96 * s
  const chip = 44 * s
  const node = 88 * s
  const iconPx = Math.round(23 * s)

  const chipStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: chip,
    height: chip,
    borderRadius: '26%',
    background: '#fff',
    color: 'rgba(10,10,10,0.68)',
    boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 6px 16px -8px rgba(15,23,42,0.35)',
  }

  const ray = (angle: number, len: number, dur: number, delay: number) => (
    <div
      key={`ray-${angle}-${len}`}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: 1,
        height: len,
        marginLeft: -0.5,
        transformOrigin: '50% 0',
        transform: `rotate(${angle + 180}deg)`,
        background: 'linear-gradient(to bottom, rgba(37,99,235,0), rgba(147,197,253,0.75))',
        animation: `sup-linkblink ${dur}s ease-in-out ${delay}s infinite`,
      }}
    />
  )

  const orbitItem = (it: Item, angle: number, ringDur: number, reverse: boolean) => (
    <div
      key={it.label}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `rotate(${angle}deg) translateY(-${reverse ? rInner : rOuter}px)`,
      }}
    >
      <div style={{ animation: `${reverse ? 'sup-spin' : 'sup-spinrev'} ${ringDur}s linear infinite` }}>
        <div style={{ transform: `rotate(${-angle}deg)` }}>
          <div style={{ position: 'absolute', transform: 'translate(-50%,-50%)' }}>
            <div style={chipStyle} title={it.label}>
              {it.icon(iconPx)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div
      data-sup-orbit
      className={className}
      style={{ position: 'relative', width: size, height: size }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes sup-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes sup-spinrev{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes sup-breathe{from{box-shadow:0 10px 30px -8px rgba(37,99,235,.55)}to{box-shadow:0 14px 46px -6px rgba(37,99,235,.85)}}
        @keyframes sup-linkblink{0%,100%{opacity:.05}50%{opacity:1}}
        @media (prefers-reduced-motion: reduce){[data-sup-orbit] *{animation:none !important}}
      `}</style>

      {/* halo + órbitas guía */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          width: 230 * s,
          height: 230 * s,
          borderRadius: '50%',
          background: 'radial-gradient(closest-side, rgba(219,234,254,0.55), rgba(219,234,254,0))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          width: rOuter * 2,
          height: rOuter * 2,
          borderRadius: '50%',
          border: '1px dashed #DBEAFE',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          width: rInner * 2,
          height: rInner * 2,
          borderRadius: '50%',
          border: '1px dashed #DBEAFE',
        }}
      />

      {/* puntos viajeros sobre las guías */}
      <div style={{ position: 'absolute', inset: 0, animation: 'sup-spin 16s linear infinite' }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 5,
            height: 5,
            margin: '-2.5px 0 0 -2.5px',
            borderRadius: '50%',
            background: '#60A5FA',
            transform: `translateY(-${rOuter}px)`,
          }}
        />
      </div>
      <div style={{ position: 'absolute', inset: 0, animation: 'sup-spinrev 11s linear infinite' }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 5,
            height: 5,
            margin: '-2.5px 0 0 -2.5px',
            borderRadius: '50%',
            background: '#93C5FD',
            transform: `translateY(-${rInner}px)`,
          }}
        />
      </div>

      {/* órbita externa: 10 integraciones + líneas que parpadean */}
      <div style={{ position: 'absolute', inset: 0, animation: 'sup-spin 90s linear infinite' }}>
        {OUTER.map((_, i) => ray(i * 36, rOuter - chip / 2, 3.2 + (i % 4) * 0.45, i * 0.37))}
        {OUTER.map((it, i) => orbitItem(it, i * 36, 90, false))}
      </div>

      {/* órbita interna: 4 sistemas + líneas */}
      <div style={{ position: 'absolute', inset: 0, animation: 'sup-spinrev 55s linear infinite' }}>
        {INNER.map((_, i) => ray(45 + i * 90, rInner - chip / 2, 3.8, 0.2 + i * 0.9))}
        {INNER.map((it, i) => orbitItem(it, 45 + i * 90, 55, true))}
      </div>

      {/* nodo central */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: node,
          height: node,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
          animation: 'sup-breathe 3s ease-in-out infinite alternate',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/suplai-lockup-white.png"
          alt=""
          style={{ width: 60 * s, height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  )
}
