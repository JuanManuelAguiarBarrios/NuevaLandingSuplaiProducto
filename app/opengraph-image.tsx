import { ImageResponse } from 'next/og'

export const alt = 'Suplai, automatización logística con agentes de IA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0E1230', // --brand-night (ImageResponse no lee CSS)
          padding: '80px',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#2C44CC',
              display: 'flex',
            }}
          />
          <div style={{ color: '#FFFFFF', fontSize: 34, fontWeight: 600 }}>Suplai</div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            color: '#FFFFFF',
            fontSize: 72,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: 900,
          }}
        >
          La capa de IA que ejecuta tu operación&nbsp;
          <span style={{ color: '#72AFFF', fontStyle: 'italic' }}>logística.</span>
        </div>

        {/* Footer line */}
        <div style={{ color: '#BCC1DE', fontSize: 28 }}>
          Agentes que coordinan tu operación sobre los sistemas que ya usás.
        </div>
      </div>
    ),
    { ...size },
  )
}
