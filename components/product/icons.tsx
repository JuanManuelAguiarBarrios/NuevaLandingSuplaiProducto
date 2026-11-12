import type { ChannelKey } from '@/content'

/**
 * Íconos de línea propios para las vistas de producto (16 px, stroke fino,
 * color heredado). Decorativos: el texto de al lado lleva el significado.
 */

type IconProps = { className?: string }

function Icon({ className = 'size-3.5', children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {children}
    </svg>
  )
}

export function MessageIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.5 8a5.5 5.5 0 1 1 2.6 4.67L2.5 13.5l.83-2.6A5.47 5.47 0 0 1 2.5 8Z" />
    </Icon>
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5.6 2.5H3.7a1 1 0 0 0-1 1.1c.4 5 4.4 9 9.4 9.4a1 1 0 0 0 1.1-1v-1.9l-2.6-1-1.2 1.3A7 7 0 0 1 6.3 7.3l1.3-1.2-2-3.6Z" />
    </Icon>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="3.75" width="11" height="8.5" rx="1.5" />
      <path d="m3 5 5 4 5-4" />
    </Icon>
  )
}

export function PackageIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 2 2.5 4.8v6.4L8 14l5.5-2.8V4.8L8 2Z" />
      <path d="M2.5 4.8 8 7.6l5.5-2.8M8 7.6V14" />
    </Icon>
  )
}

export function PinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 14s4-3.9 4-7.3a4 4 0 0 0-8 0C4 10.1 8 14 8 14Z" />
      <circle cx="8" cy="6.7" r="1.4" />
    </Icon>
  )
}

export function TruckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M1.5 4h8v7h-8zM9.5 6.5h3l2 2.5v2h-5" />
      <circle cx="4.5" cy="11.5" r="1.3" />
      <circle cx="11.5" cy="11.5" r="1.3" />
    </Icon>
  )
}

export function UserIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M3 13.5c.6-2.4 2.6-3.7 5-3.7s4.4 1.3 5 3.7" />
    </Icon>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m3.5 8.5 3 3 6-7" />
    </Icon>
  )
}

const CHANNEL_ICONS: Record<ChannelKey, (props: IconProps) => React.ReactNode> = {
  whatsapp: MessageIcon,
  voice: PhoneIcon,
  email: MailIcon,
}

export function ChannelIcon({ channel, className }: IconProps & { channel: ChannelKey }) {
  const ChannelGlyph = CHANNEL_ICONS[channel]
  return <ChannelGlyph className={className} />
}
