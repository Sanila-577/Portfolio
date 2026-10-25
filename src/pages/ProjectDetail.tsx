import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, ChevronRight, GitBranch } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LazyLightbox } from '../components/LazyLightbox'
import { ProjectLinks } from '../components/ProjectLinks'
import { Reveal } from '../components/Reveal'
import { TechStack } from '../components/TechIcon'
import { personal } from '../data/profile'
import { projects, screenshotsOf } from '../data/projects'
import NotFound from './NotFound'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal className="mt-14">
      <h2 className="mb-5 text-2xl font-bold">{title}</h2>
      {children}
    </Reveal>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (index === -1) return <NotFound />

  const p = projects[index]
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const gallery = screenshotsOf(p)

  return (
    <article className="mx-auto w-full max-w-[900px] px-4 pb-20 pt-28 sm:px-6">
      <title>{`${p.title} · ${personal.name}`}</title>
      <meta name="description" content={`${p.title} — ${p.tagline}`} />
      <meta property="og:title" content={`${p.title} · ${personal.name}`} />
      <meta property="og:description" content={p.tagline} />

      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1 text-sm text-muted">
        <Link to="/" className="hover:text-text">
          Home
        </Link>
        <ChevronRight className="size-4" />
        <Link to="/#projects" className="hover:text-text">
          Projects
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-text">{p.title}</span>
      </nav>

      <header>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {p.domains.join(' · ')}
        </p>
        <motion.h1 layoutId={`title-${p.slug}`} className="text-4xl font-bold md:text-5xl">
          {p.title}
        </motion.h1>
        <p className="mt-3 text-lg text-muted">{p.tagline}</p>
        {p.dates && (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
            <Calendar className="size-4" /> {p.dates}
          </p>
        )}
        <div className="mt-6">
          <ProjectLinks links={p.links} size="md" />
        </div>
      </header>

      <Block title="Tech stack">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <TechStack items={p.tech} variant="labeled" size="lg" />
        </div>
      </Block>

      <Block title="Overview">
        <p className="leading-relaxed text-muted">{p.overview}</p>
      </Block>

      <Block title="Key features">
        <ul className="space-y-3">
          {p.features.map((f) => (
            <li
              key={f}
              className="flex gap-3 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {f}
            </li>
          ))}
        </ul>
      </Block>

      {p.evolution && (
        <Block title="Evolution">
          <ol className="relative ml-2 space-y-5 border-l border-border pl-6">
            {p.evolution.map((e, i) => (
              <li key={e.name} className="relative">
                <span className="absolute -left-[31px] grid size-4 place-items-center rounded-full border-2 border-bg bg-accent" />
                <a
                  href={e.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-medium hover:text-accent"
                >
                  <GitBranch className="size-4" /> {e.name}
                </a>
                <p className="text-sm text-muted">
                  Step {i + 1} · {e.note}
                </p>
              </li>
            ))}
          </ol>
        </Block>
      )}

      {gallery.length > 0 && (
        <Block title="Screenshots">
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((g, i) => (
              <button
                key={g.src}
                type="button"
                onClick={() => setLightbox(i)}
                className="overflow-hidden rounded-xl border border-border bg-white"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full transition-transform hover:scale-105"
                />
              </button>
            ))}
          </div>
        </Block>
      )}

      <nav
        aria-label="More projects"
        className="mt-20 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
      >
        <Link
          to={`/projects/${prev.slug}`}
          className="group rounded-2xl border border-border p-5 transition-colors hover:border-accent/50"
        >
          <span className="flex items-center gap-1 text-xs text-muted">
            <ArrowLeft className="size-3.5" /> Previous
          </span>
          <span className="mt-1 block font-semibold group-hover:text-accent">{prev.title}</span>
        </Link>
        <Link
          to={`/projects/${next.slug}`}
          className="group rounded-2xl border border-border p-5 text-right transition-colors hover:border-accent/50"
        >
          <span className="flex items-center justify-end gap-1 text-xs text-muted">
            Next <ArrowRight className="size-3.5" />
          </span>
          <span className="mt-1 block font-semibold group-hover:text-accent">{next.title}</span>
        </Link>
      </nav>
      <div className="mt-6 text-center">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent"
        >
          <ArrowLeft className="size-4" /> Back to all projects
        </Link>
      </div>

      <LazyLightbox
        open={lightbox !== null && lightbox >= 0}
        index={lightbox ?? 0}
        slides={gallery.map((g) => ({ src: g.src, alt: g.alt }))}
        onClose={() => setLightbox(null)}
      />
    </article>
  )
}
