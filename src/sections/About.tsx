import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Languages, MapPin } from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { about, personal } from '../data/profile'

function Headshot() {
  const [failed, setFailed] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="relative mx-auto aspect-square w-full max-w-[300px]"
    >
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-accent to-accent-2 opacity-60 blur-md" />
      {failed ? (
        <div className="relative grid size-full place-items-center rounded-3xl border border-border bg-surface font-display text-7xl font-bold">
          <span className="text-gradient">{personal.initials}</span>
        </div>
      ) : (
        <img
          src={personal.photo}
          alt={personal.name}
          onError={() => setFailed(true)}
          className="relative size-full rounded-3xl border border-border object-cover"
        />
      )}
    </motion.div>
  )
}

export function About() {
  return (
    <Section id="about" eyebrow="About" title="About Me" align="left">
      <div className="grid items-center gap-12 md:grid-cols-[300px_1fr]">
        <Reveal>
          <Headshot />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-4 leading-relaxed text-muted">
            {about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-accent" /> {personal.location}
            </span>
            <span className="flex items-center gap-2">
              <Languages className="size-4 text-accent" />
              {personal.languages.map((l) => `${l.name} (${l.level})`).join(' · ')}
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
