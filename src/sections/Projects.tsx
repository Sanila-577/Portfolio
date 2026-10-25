import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProjectLinks } from '../components/ProjectLinks'
import { Section } from '../components/Section'
import { SpotlightCard } from '../components/SpotlightCard'
import { TechIcon, TechStack } from '../components/TechIcon'
import { projects, type Project } from '../data/projects'
import { useProjectFilter, type ProjectFilter } from '../lib/projectFilter'

function matches(p: Project, f: ProjectFilter) {
  if (f.kind === 'all') return true
  return p.tech.includes(f.value)
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const featured = project.featured
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className={featured && index === 0 ? 'md:col-span-2' : ''}
    >
      <SpotlightCard className="group relative flex h-full flex-col p-6 hover:-translate-y-1">
        {/* Whole card links to the detail page; inner links sit above it. */}
        <Link
          to={`/projects/${project.slug}`}
          className="absolute inset-0 z-0 rounded-2xl"
          aria-label={`${project.title} — details`}
        />
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 font-mono text-xs text-accent">
              {String(index + 1).padStart(2, '0')} · {project.domains.join(' · ')}
            </p>
            <motion.h3
              layoutId={`title-${project.slug}`}
              className={`font-bold ${featured ? 'text-2xl' : 'text-lg'}`}
            >
              {project.title}
            </motion.h3>
          </div>
        </div>
        <p className="text-sm text-muted">{project.tagline}</p>
        {featured && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted/90">
            {project.overview}
          </p>
        )}
        <div className="relative z-10 mt-5">
          <TechStack items={featured ? project.tech : project.tech.slice(0, 6)} />
        </div>
        <div className="relative z-10 mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <ProjectLinks links={project.links} />
          <Link
            to={`/projects/${project.slug}`}
            className="group/more inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            View more{' '}
            <ArrowRight className="size-4 transition-transform group-hover/more:translate-x-0.5" />
          </Link>
        </div>
      </SpotlightCard>
    </motion.li>
  )
}

export function Projects() {
  const { filter, setFilter } = useProjectFilter()
  const visible = projects.filter((p) => matches(p, filter))
  const featured = visible.filter((p) => p.featured)
  const more = visible.filter((p) => !p.featured)

  return (
    <Section id="projects" eyebrow="Projects" title="Things I’ve built">
      <AnimatePresence>
        {filter.kind === 'tech' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent/10 py-1 pl-1 pr-3 text-sm">
              <TechIcon name={filter.value} size="sm" active />
              Using {filter.value}
              <button
                type="button"
                aria-label="Clear filter"
                onClick={() => setFilter({ kind: 'all' })}
              >
                <X className="size-4 text-muted hover:text-text" />
              </button>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {visible.length === 0 && (
        <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted">
          No projects match this filter yet.
        </p>
      )}

      <motion.ul layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
          ))}
        </AnimatePresence>
      </motion.ul>

      {more.length > 0 && (
        <>
          <h3 className="mb-4 mt-12 text-lg font-semibold text-muted">More projects</h3>
          <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {more.map((p) => (
                <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </>
      )}
    </Section>
  )
}
