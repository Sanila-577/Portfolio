import type { CSSProperties } from 'react'
import { TECH, type TechName } from '../data/tech'
import { useTheme } from '../lib/theme'

interface Props {
  name: TechName
  /** "icon" = icon with tooltip; "labeled" = icon with the name underneath. */
  variant?: 'icon' | 'labeled'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  active?: boolean
}

const SIZES = { sm: 'size-4', md: 'size-5', lg: 'size-7' }
const BOX = { sm: 'size-8', md: 'size-10', lg: 'size-14' }

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
}

/**
 * Very dark brand colors disappear on the dark background, so they fall back to the
 * text color there. Pale ones (React, JavaScript, Airflow…) wash out on white, so in
 * light mode they are darkened just enough to read.
 */
function brandColor(hex: string | undefined, theme: 'dark' | 'light') {
  if (!hex) return 'var(--text)'
  const lum = luminance(hex)
  if (theme === 'dark') return lum < 0.25 ? 'var(--text)' : hex
  if (lum > 0.72) return `color-mix(in srgb, ${hex} 55%, #0f172a)`
  if (lum > 0.55) return `color-mix(in srgb, ${hex} 75%, #0f172a)`
  return hex
}

export function TechIcon({ name, variant = 'icon', size = 'md', onClick, active }: Props) {
  const { theme } = useTheme()
  const info = TECH[name] as { icon: (typeof TECH)[TechName]['icon']; color?: string }
  const Icon = info.icon
  const brand = brandColor(info.color, theme)
  const style = { '--brand': brand } as CSSProperties
  const iconClass = `${SIZES[size]} text-[var(--brand)] transition-transform duration-200 group-hover/tech:scale-110`

  const Tag = onClick ? 'button' : 'span'

  if (variant === 'labeled') {
    return (
      <Tag
        type={onClick ? 'button' : undefined}
        onClick={onClick}
        style={style}
        className="group/tech flex w-20 flex-col items-center gap-2 text-center"
      >
        <span
          className={`${BOX[size]} grid place-items-center rounded-xl border bg-surface-2 transition-all duration-200 group-hover/tech:-translate-y-0.5 ${
            active ? 'border-accent' : 'border-border group-hover/tech:border-[var(--brand)]'
          }`}
        >
          <Icon className={iconClass} />
        </span>
        <span className="text-[11px] leading-tight text-muted group-hover/tech:text-text">
          {name}
        </span>
      </Tag>
    )
  }

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      style={style}
      aria-label={name}
      className={`group/tech relative grid ${BOX[size]} shrink-0 place-items-center rounded-lg border bg-surface-2 transition-all duration-200 hover:-translate-y-0.5 ${
        active ? 'border-accent' : 'border-border hover:border-[var(--brand)]'
      }`}
    >
      <Icon className={iconClass} />
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-xs text-text opacity-0 shadow-md transition-opacity duration-150 group-hover/tech:opacity-100 group-focus-visible/tech:opacity-100"
      >
        {name}
      </span>
    </Tag>
  )
}

export function TechStack({
  items,
  variant = 'icon',
  size = 'sm',
}: {
  items: TechName[]
  variant?: Props['variant']
  size?: Props['size']
}) {
  return (
    <div className={`flex flex-wrap ${variant === 'labeled' ? 'gap-4' : 'gap-2'}`}>
      {items.map((t) => (
        <TechIcon key={t} name={t} variant={variant} size={size} />
      ))}
    </div>
  )
}
