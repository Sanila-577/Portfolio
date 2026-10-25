import { useState } from 'react'

function initials(name: string) {
  return name
    .replace(/[^A-Za-z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
}

/** Organization logo with an initials badge when the image is missing. */
export function Logo({
  src,
  name,
  className = 'size-10',
}: {
  src?: string
  name: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <span
        aria-hidden="true"
        className={`${className} grid shrink-0 place-items-center rounded-xl border border-border bg-surface-2 font-display text-xs font-bold text-accent`}
      >
        {initials(name)}
      </span>
    )
  }
  return (
    <img
      src={src}
      alt={`${name} logo`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} shrink-0 rounded-xl border border-border bg-white object-contain p-1.5`}
    />
  )
}
