import { MapPin } from 'lucide-react'
import { AltTimeline } from '../components/AltTimeline'
import { Logo } from '../components/Logo'
import { RoleDates, RoleLinkButton } from '../components/RoleBits'
import { Section } from '../components/Section'
import { TechStack } from '../components/TechIcon'
import { timeline, type TimelineEntry } from '../data/timeline'
import { formatDuration, monthsBetween, spanOf } from '../lib/date'

function EntryCard({ entry }: { entry: TimelineEntry }) {
  const span = spanOf(entry.roles)
  const grouped = entry.roles.length > 1
  const single = entry.roles[0]

  return (
    <article
      id={entry.id}
      className="scroll-mt-28 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/40 sm:p-5"
    >
      <header className="flex items-start gap-3 sm:gap-4">
        <Logo src={entry.logo} name={entry.org} className="size-11" />
        <div className="min-w-0 flex-1">
          {grouped ? (
            <>
              <h3 className="font-semibold leading-snug">{entry.org}</h3>
              {span && (
                <p className="mt-1 text-xs text-muted">
                  <span className="text-accent">
                    {formatDuration(monthsBetween(span.start, span.end))}
                  </span>{' '}
                  total
                </p>
              )}
            </>
          ) : (
            <>
              <h3 className="font-semibold leading-snug">
                {single.event ? `${single.event} — ${single.title}` : single.title}
              </h3>
              <p className="text-sm text-muted">{entry.org}</p>
              <div className="mt-1">
                <RoleDates role={single} />
              </div>
              {single.location && (
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                  <MapPin className="size-3" /> {single.location}
                </p>
              )}
            </>
          )}
        </div>
      </header>

      {grouped ? (
        <ol className="ml-[22px] mt-4 space-y-4 border-l border-border pl-5">
          {entry.roles.map((r) => (
            <li key={`${r.event}-${r.title}`} className="relative">
              <span className="absolute -left-[25px] top-1.5 size-2 rounded-full bg-accent" />
              <p className="flex items-center gap-2 text-sm font-medium">
                {r.logo && (
                  <Logo
                    src={r.logo}
                    name={r.event ?? r.title}
                    className="size-6 !rounded-md !p-0.5"
                  />
                )}
                {r.event ? `${r.event} — ${r.title}` : r.title}
              </p>
              <RoleDates role={r} />
              <p className="pt-1 text-sm leading-relaxed text-muted">{r.description}</p>
              {r.link && (
                <div className="pt-1">
                  <RoleLinkButton link={r.link} />
                </div>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <p className="pt-4 text-sm leading-relaxed text-muted">{single.description}</p>
      )}

      {entry.subProjects && (
        <ul className="mt-4 grid gap-3 lg:grid-cols-2">
          {entry.subProjects.map((sp) => (
            <li key={sp.name} className="rounded-xl border border-border bg-surface-2 p-3 sm:p-4">
              <div className="mb-2 flex items-center gap-3">
                <Logo src={sp.logo} name={sp.client ?? sp.name} className="size-8" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{sp.name}</p>
                  {sp.client && <p className="text-xs text-muted">{sp.client}</p>}
                </div>
              </div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted marker:text-accent">
                {sp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mt-3" data-testid="subproject-tech">
                <TechStack items={sp.tech} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {(entry.tech || entry.link || (!grouped && single.link)) && (
        <footer className="mt-4 space-y-2">
          {entry.tech && (
            <div data-testid="entry-tech">
              {entry.subProjects && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  Tech stack
                </p>
              )}
              <TechStack items={entry.tech} />
            </div>
          )}
          {entry.link && <RoleLinkButton link={entry.link} />}
          {!grouped && single.link && <RoleLinkButton link={single.link} />}
        </footer>
      )}
    </article>
  )
}

export function Journey() {
  return (
    <Section id="journey" eyebrow="Journey" title="My Journey">
      <AltTimeline
        label="My Journey"
        layout="right"
        items={timeline}
        getKey={(e) => e.id}
        render={(e) => <EntryCard entry={e} />}
      />
    </Section>
  )
}
