import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '../components/Logo'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { education, type Education as EducationItem } from '../data/profile'

function EducationCard({ item }: { item: EducationItem }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <Logo src={item.logo} name={item.school} className="size-12" />
      <h3 className="mt-4 font-semibold leading-snug">{item.school}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-accent">
        <GraduationCap className="size-4" /> {item.degree}
      </p>
      <p className="mt-1 font-mono text-xs text-muted">{item.dates}</p>
      {item.details && (
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {item.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}
      {item.groups?.map((g) => (
        <div key={g.label} className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">{g.label}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {g.items.map((x) => (
              <li
                key={x}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs"
              >
                {x}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {item.modules && (
        <>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-4 flex items-center gap-1 self-start text-sm text-muted hover:text-text"
          >
            {open ? 'Hide' : 'Show'} modules
            <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {item.modules.map((m) => (
                  <div key={m.year} className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {m.year}
                    </p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-muted marker:text-accent">
                      {m.items.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education">
      <div className="grid items-start gap-5 md:grid-cols-3">
        {education.map((e, i) => (
          <Reveal key={e.school} delay={i * 0.08}>
            <EducationCard item={e} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
