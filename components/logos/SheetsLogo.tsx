import type { LogoProps } from './types'

/** Google Sheets — verde oficial #188038, documento con grilla y esquina doblada. */
export function SheetsLogo({ size = 24, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#188038"
        d="M29 4H13a3 3 0 0 0-3 3v34a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V13z"
      />
      <path fill="#0F652F" d="M29 4l9 9h-9z" />
      <rect x="16" y="22" width="16" height="13" fill="#fff" />
      <g stroke="#188038" strokeWidth="1.4">
        <line x1="16" y1="26.3" x2="32" y2="26.3" />
        <line x1="16" y1="30.6" x2="32" y2="30.6" />
        <line x1="24" y1="22" x2="24" y2="35" />
      </g>
    </svg>
  )
}
