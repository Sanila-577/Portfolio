import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { TechIcon } from '../components/TechIcon'
import { projects } from '../data/projects'
import { softSkills } from '../data/profile'
import { skillGroups } from '../data/skills'
import type { TechName } from '../data/tech'
import { useProjectFilter } from '../lib/projectFilter'

const usedInProjects = new Set(projects.flatMap((p) => p.tech))

export function Skills() {
  const { filter, setFilter } = useProjectFilter()

  const pick = (name: TechName) => {
    setFilter({ kind: 'tech', value: name })
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section id="skills" eyebrow="Skills" title="Tools I work with">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={(i % 3) * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-surface p-5">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
                {g.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {g.items.map((name) => {
                  const clickable = usedInProjects.has(name)
                  return (
                    <span key={name} className="relative">
                      <TechIcon
                        name={name}
                        variant="labeled"
                        size="md"
                        active={filter.kind === 'tech' && filter.value === name}
                        onClick={clickable ? () => pick(name) : undefined}
                      />
                      {clickable && (
                        <span
                          aria-hidden="true"
                          title="Used in projects"
                          className="absolute right-4 top-0 size-2 rounded-full bg-accent ring-2 ring-surface"
                        />
                      )}
                    </span>
                  )
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
          Soft skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {softSkills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
