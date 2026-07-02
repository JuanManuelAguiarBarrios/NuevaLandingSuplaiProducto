import type { LogoProps } from './types'

/** Microsoft Excel — verde oficial #107C41 con la "X" blanca. */
export function ExcelLogo({ size = 24, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="7" y="9" width="34" height="30" rx="3.5" fill="#107C41" />
      <path
        fill="#fff"
        d="M19 17l5 6.4L29 17h5.2l-7 8.5 7.3 8.9H29l-5-6.4-5 6.4h-5.5l7.4-8.9L13.7 17z"
      />
    </svg>
  )
}
