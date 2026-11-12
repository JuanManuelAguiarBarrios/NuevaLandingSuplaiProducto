import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { POSITIONING } from '@/content'

export const alt = POSITIONING.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Lockup real de la marca (public/brand), 426×116. */
const LOGO = { path: 'public/brand/suplai-lockup-white.png', width: 220, height: 60 }

/** ImageResponse no lee CSS: espejo de las primitivas de marca de globals.css. */
const COLOR = { night: '#0A0D24', bone: '#F4F2EC', lavender: '#8F96C2', muted: '#BCC1DE' }

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), LOGO.path))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`
  const { text, lowFrom } = POSITIONING.headline
  // Misma propuesta que el hero, con sus quiebres de línea y sus dos tonos.
  const lines = text.split('\n')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: COLOR.night,
          padding: '80px',
        }}
      >
        <img src={logoSrc} width={LOGO.width} height={LOGO.height} alt="" />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: COLOR.bone,
            fontSize: 66,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
          }}
        >
          {lines.map((line, i) => (
            <div key={line} style={{ display: 'flex', color: i >= lowFrom ? COLOR.lavender : COLOR.bone }}>
              {line}
            </div>
          ))}
        </div>

        <div style={{ color: COLOR.muted, fontSize: 28 }}>{POSITIONING.support}</div>
      </div>
    ),
    { ...size },
  )
}
