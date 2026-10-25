const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parse(ym: string) {
  const [y, m] = ym.split('-').map(Number)
  return { y, m }
}

function nowYM() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function formatYM(ym?: string) {
  if (!ym) return 'Present'
  const { y, m } = parse(ym)
  return `${MONTHS[m - 1]} ${y}`
}

export function formatRange(start?: string, end?: string) {
  if (!start) return ''
  return `${formatYM(start)} – ${formatYM(end)}`
}

/** Months between two "YYYY-MM" dates, inclusive of the start month (LinkedIn-style). */
export function monthsBetween(start: string, end?: string) {
  const a = parse(start)
  const b = parse(end ?? nowYM())
  return Math.max(1, (b.y - a.y) * 12 + (b.m - a.m) + 1)
}

export function formatDuration(months: number) {
  const y = Math.floor(months / 12)
  const m = months % 12
  const parts = []
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`)
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`)
  return parts.join(' ')
}

/** Span from the earliest start to the latest end across several roles. */
export function spanOf(roles: { start?: string; end?: string }[]) {
  const dated = roles.filter((r) => r.start)
  if (!dated.length) return null
  const start = dated.map((r) => r.start!).sort()[0]
  const end = dated.some((r) => !r.end)
    ? undefined
    : dated
        .map((r) => r.end!)
        .sort()
        .at(-1)
  return { start, end }
}

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
