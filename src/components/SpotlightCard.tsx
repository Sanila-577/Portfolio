import type { HTMLAttributes, MouseEvent } from 'react'

/** Card with a soft glow that follows the cursor. */
export function SpotlightCard({
  className = '',
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }
  return (
    <div
      onMouseMove={onMove}
      className={`spotlight rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-accent/50 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
