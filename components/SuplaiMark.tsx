/**
 * Isotipo de Suplai. Fuente única — antes estaba duplicado inline en
 * Navbar y VisionSection. Server Component (SVG puro, sin interacción).
 */
type Props = {
  size?: number
  className?: string
}

export default function SuplaiMark({ size = 28, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="7" fill="#2563EB" />
      <path
        d="M8 14C8 10.686 10.686 8 14 8C17.314 8 20 10.686 20 14"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M20 14C20 17.314 17.314 20 14 20C10.686 20 8 17.314 8 14"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
    </svg>
  )
}
