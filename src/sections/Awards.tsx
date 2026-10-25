import { Award, Building2, Hash, ImageIcon, Medal, Star, Trophy, Users } from 'lucide-react'
import { useState } from 'react'
import { LazyLightbox } from '../components/LazyLightbox'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { awards, photosOf, type AwardItem, type Tier } from '../data/awards'
import { formatYM } from '../lib/date'

const TIER: Record<Tier, { label: string; ring: string; text: string; Icon: typeof Medal }> = {
  gold: { label: 'Gold', ring: 'ring-gold/60', text: 'text-gold', Icon: Trophy },
  silver: { label: 'Silver', ring: 'ring-silver/60', text: 'text-silver', Icon: Medal },
  bronze: { label: 'Bronze', ring: 'ring-bronze/60', text: 'text-bronze', Icon: Medal },
  finalist: { label: 'Finalist', ring: 'ring-accent/50', text: 'text-accent', Icon: Award },
  place: { label: 'Placed', ring: 'ring-accent-2/50', text: 'text-accent-2', Icon: Hash },
  honour: { label: 'Honour', ring: 'ring-accent-2/50', text: 'text-accent-2', Icon: Star },
}

function AwardCard({ award, onOpen }: { award: AwardItem; onOpen: (photos: string[]) => void }) {
  const photos = photosOf(award)
  const [failed, setFailed] = useState(false)
  const tier = TIER[award.tier]
  const cover = photos[0]
  const hasPhoto = !!cover && !failed
  const when = award.date ? formatYM(award.date) : award.period

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface ring-1 ring-inset ${tier.ring}`}
    >
      <button
        type="button"
        disabled={!hasPhoto}
        onClick={() => onOpen(photos)}
        aria-label={hasPhoto ? `View photos: ${award.title}` : undefined}
        className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2 enabled:cursor-zoom-in"
      >
        {hasPhoto ? (
          <>
            <img
              src={cover}
              alt={`${award.title} — ${award.result}`}
              loading="lazy"
              onError={() => setFailed(true)}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {photos.length > 1 && (
              <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                <ImageIcon className="size-3" /> {photos.length}
              </span>
            )}
          </>
        ) : (
          <div className="grid size-full place-items-center">
            <tier.Icon className={`size-14 ${tier.text} opacity-80`} strokeWidth={1.4} />
          </div>
        )}
      </button>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span
            className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${tier.text}`}
          >
            <tier.Icon className="size-3.5" /> {tier.label}
          </span>
          {when && <span className="shrink-0 font-mono text-xs text-muted">{when}</span>}
        </div>
        <h3 className="font-semibold leading-snug">{award.title}</h3>
        <p className={`mt-1 text-sm font-medium ${tier.text}`}>{award.result}</p>
        {award.issuer && <p className="mt-1 text-xs text-muted">Issued by {award.issuer}</p>}
        {award.associatedWith && (
          <p className="mt-0.5 flex items-start gap-1 text-xs text-muted">
            <Building2 className="mt-px size-3 shrink-0" /> {award.associatedWith}
          </p>
        )}
        {award.description && (
          <p className="mt-3 text-sm leading-relaxed text-muted">{award.description}</p>
        )}
        {award.stats && (
          <dl className="mt-3 grid grid-cols-2 gap-2">
            {award.stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-surface-2 px-3 py-2">
                <dt className="text-[11px] uppercase tracking-wider text-muted">{s.label}</dt>
                <dd className="font-display text-lg font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {award.team && (
          <p className="mt-auto flex items-start gap-1.5 pt-3 text-sm">
            <Users className="mt-0.5 size-3.5 shrink-0 text-accent" />
            <span>
              Team <span className="font-medium">{award.team.name}</span>
              {award.team.members && (
                <span className="text-muted"> · with {award.team.members.join(', ')}</span>
              )}
            </span>
          </p>
        )}
      </div>
    </article>
  )
}

export function Awards() {
  const [slides, setSlides] = useState<string[] | null>(null)

  return (
    <Section id="awards" eyebrow="Honours & Awards" title="Achievements">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((a, i) => (
          <Reveal key={a.slug} delay={(i % 3) * 0.06}>
            <AwardCard award={a} onOpen={setSlides} />
          </Reveal>
        ))}
      </div>
      <LazyLightbox
        open={!!slides}
        slides={(slides ?? []).map((src) => ({ src }))}
        onClose={() => setSlides(null)}
      />
    </Section>
  )
}
