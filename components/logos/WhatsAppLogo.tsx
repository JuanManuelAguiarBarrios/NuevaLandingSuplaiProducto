import type { LogoProps } from './types'

/** WhatsApp — marca oficial (verde #25D366). No recolorear ni deformar. */
export function WhatsAppLogo({ size = 24, className }: LogoProps) {
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
        fill="#25D366"
        d="M24 4C12.95 4 4 12.95 4 24c0 3.53.93 6.84 2.55 9.71L4 44l10.53-2.5A19.9 19.9 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4z"
      />
      <path
        fill="#fff"
        d="M19.1 14.3c-.36-.8-.74-.82-1.08-.83l-.92-.01c-.32 0-.84.12-1.28.6s-1.68 1.64-1.68 4 1.72 4.64 1.96 4.96 3.34 5.34 8.24 7.28c4.08 1.6 4.9 1.28 5.78 1.2.88-.08 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56s-2.84-1.4-3.28-1.56-.76-.24-1.08.24-1.24 1.56-1.52 1.88-.56.36-1.04.12-2.02-.74-3.85-2.37c-1.42-1.27-2.38-2.83-2.66-3.31s-.03-.74.21-.98c.22-.22.48-.56.72-.84s.32-.48.48-.8.08-.6-.04-.84-1.06-2.62-1.5-3.58z"
      />
    </svg>
  )
}
