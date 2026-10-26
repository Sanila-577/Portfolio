import { ExternalLink, Maximize2 } from 'lucide-react'
import { useState } from 'react'
import { LazyLightbox } from '../components/LazyLightbox'
import { Logo } from '../components/Logo'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SpotlightCard } from '../components/SpotlightCard'
import { certifications, type Certification } from '../data/certifications'

/** A certificate screenshot stored in the site (e.g. /certificates/azure.png) rather than an online credential. */
const isImage = (url: string) => url.startsWith('/') && /\.(png|jpe?g|webp)$/i.test(url)

function Panel({ c }: { c: Certification }) {
  const image = !!c.url && isImage(c.url)
  return (
    <SpotlightCard className="flex h-full flex-col gap-4 p-4 text-left">
      <div className="flex items-start gap-4">
        <Logo src={c.logo} name={c.issuer} className="size-11" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-snug">{c.name}</p>
          <p className="mt-0.5 text-xs text-muted">{c.issuer}</p>
        </div>
      </div>
      {c.url && (
        <span className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full border border-border px-3.5 py-2 text-xs font-medium transition-colors group-hover/cert:border-accent group-hover/cert:text-accent">
          View certification
          {image ? <Maximize2 className="size-3.5" /> : <ExternalLink className="size-3.5" />}
        </span>
      )}
    </SpotlightCard>
  )
}

export function Certifications() {
  const [viewing, setViewing] = useState<Certification | null>(null)

  return (
    <Section id="certifications" eyebrow="Certifications" title="Certifications">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 0.05}>
            {/* The whole panel is clickable: online credentials open in a new tab,
                certificate images open in the on-page viewer. */}
            {!c.url ? (
              <Panel c={c} />
            ) : isImage(c.url) ? (
              <button
                type="button"
                onClick={() => setViewing(c)}
                aria-label={`View certificate: ${c.name} (${c.issuer})`}
                className="group/cert block h-full w-full rounded-2xl"
              >
                <Panel c={c} />
              </button>
            ) : (
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`View certification: ${c.name} (${c.issuer})`}
                className="group/cert block h-full rounded-2xl"
              >
                <Panel c={c} />
              </a>
            )}
          </Reveal>
        ))}
      </div>
      <LazyLightbox
        open={!!viewing}
        slides={viewing?.url ? [{ src: viewing.url, alt: `${viewing.name} certificate` }] : []}
        onClose={() => setViewing(null)}
      />
    </Section>
  )
}
