import { AltTimeline } from '../components/AltTimeline'
import { Logo } from '../components/Logo'
import { RoleDates, RoleLinkButton } from '../components/RoleBits'
import { Section } from '../components/Section'
import { volunteerRoles, type VolunteerRole } from '../data/timeline'

function VolunteerCard({ item }: { item: VolunteerRole }) {
  const { role } = item
  return (
    <article className="rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/40 sm:p-5">
      <header className="flex items-start gap-3">
        <Logo src={item.logo} name={item.org} className="size-10" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-snug">{role.event ?? role.title}</h3>
          <p className="text-sm text-muted">
            {role.event ? `${role.title} · ` : ''}
            {item.org}
          </p>
          <div className="mt-1">
            <RoleDates role={role} />
          </div>
        </div>
      </header>
      <p className="pt-3 text-sm leading-relaxed text-muted">{role.description}</p>
      {role.link && (
        <div className="pt-2">
          <RoleLinkButton link={role.link} />
        </div>
      )}
    </article>
  )
}

export function Volunteer() {
  return (
    <Section id="volunteer" eyebrow="Volunteer" title="Volunteering">
      <AltTimeline
        label="Volunteering"
        items={volunteerRoles}
        getKey={(v) => v.id}
        render={(v) => <VolunteerCard item={v} />}
      />
    </Section>
  )
}
