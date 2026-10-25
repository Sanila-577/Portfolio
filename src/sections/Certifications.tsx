import { ExternalLink } from 'lucide-react'
import { Logo } from '../components/Logo'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SpotlightCard } from '../components/SpotlightCard'
import { certifications } from '../data/certifications'

export function Certifications() {
  return (
    <Section id="certifications" eyebrow="Certifications" title="Certifications">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 0.05}>
            <SpotlightCard className="flex h-full flex-col gap-4 p-4">
              <div className="flex items-start gap-4">
                <Logo src={c.logo} name={c.issuer} className="size-11" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug">{c.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{c.issuer}</p>
                </div>
              </div>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full border border-border px-3.5 py-2 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  View certification <ExternalLink className="size-3.5" />
                </a>
              )}
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
