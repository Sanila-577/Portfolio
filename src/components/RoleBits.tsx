import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Role, RoleLink } from '../data/timeline'
import { formatDuration, formatRange, monthsBetween } from '../lib/date'

export function RoleLinkButton({ link }: { link: RoleLink }) {
  const className = 'inline-flex items-center gap-1 text-sm text-accent hover:underline'
  const body = (
    <>
      {link.label} <ArrowUpRight className="size-4" />
    </>
  )
  return link.external ? (
    <a href={link.href} target="_blank" rel="noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <Link to={link.href} className={className}>
      {body}
    </Link>
  )
}

export function RoleDates({ role }: { role: Role }) {
  return (
    <p className="text-xs text-muted">
      {formatRange(role.start, role.end)} ·{' '}
      <span className="text-accent">{formatDuration(monthsBetween(role.start, role.end))}</span>
    </p>
  )
}
