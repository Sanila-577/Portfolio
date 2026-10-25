import { ArrowUpRight, BadgeCheck, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { TechStack } from '../components/TechIcon'
import { research } from '../data/research'

export function Research() {
  return (
    <Section id="research" eyebrow="Research & Publications" title="Published research">
      <Reveal>
        <article className="relative overflow-hidden rounded-3xl border border-accent/40 bg-surface p-6 md:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-72 rounded-full bg-accent/10 blur-3xl"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
              <BadgeCheck className="size-4" /> {research.badge}
            </span>
            <h3 className="mt-5 text-2xl font-bold leading-snug md:text-3xl">{research.title}</h3>
            <div className="mt-4 flex items-center gap-3">
              <Logo src={research.logo} name={research.organizer} className="size-10" />
              <div className="text-sm">
                <p className="font-medium">{research.venue}</p>
                <p className="text-muted">{research.organizer}</p>
              </div>
            </div>
            <p className="mt-6 max-w-3xl leading-relaxed text-muted">{research.summary}</p>
            <div className="mt-6">
              <TechStack items={research.tech} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {research.url && (
                <a
                  href={research.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-contrast"
                >
                  <ExternalLink className="size-4" /> Read the paper
                </a>
              )}
              <Link
                to={research.project}
                className="flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Related project: RiceVision <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  )
}
