import type { LogoProps } from './types'

/** Microsoft Outlook — azul oficial: tile con la "O" + panel de sobre. */
export function OutlookLogo({ size = 24, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Panel de sobre (derecha) */}
      <path fill="#0F78D4" d="M43 12H23v24h20a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2z" />
      <path fill="#fff" fillOpacity="0.9" d="M45 15.5L34 23l-11-7.1V14a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2z" />
      {/* Tile con la "O" (izquierda) */}
      <rect x="3" y="8" width="26" height="32" rx="3" fill="#0364B8" />
      <path
        fill="#fff"
        d="M16 16c-4.4 0-7.5 3.4-7.5 8s3.1 8 7.5 8 7.5-3.4 7.5-8-3.1-8-7.5-8zm0 12.6c-2.3 0-3.8-1.9-3.8-4.6s1.5-4.6 3.8-4.6 3.8 1.9 3.8 4.6-1.5 4.6-3.8 4.6z"
      />
    </svg>
  )
}
