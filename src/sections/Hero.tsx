import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown, Download, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Starfield } from '../components/Starfield'
import { SocialLinks } from '../components/SocialLinks'
import { Typewriter } from '../components/Typewriter'
import { personal } from '../data/profile'

export function Hero() {
  const reduce = useReducedMotion()
  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <Starfield />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />
      <div className="mx-auto w-full max-w-[1100px] px-4 pt-16 sm:px-6">
        <motion.p {...item(0)} className="mb-4 flex items-center gap-2 text-sm text-muted">
          <MapPin className="size-4 text-accent" /> {personal.location}
        </motion.p>
        <motion.h1
          {...item(1)}
          className="text-4xl font-bold leading-[1.05] min-[360px]:text-5xl sm:text-6xl md:text-7xl"
        >
          Hi, I’m <span className="text-gradient">{personal.firstName}</span>
          <br />
          <span className="text-text">Wijesekara.</span>
        </motion.h1>
        <motion.p
          {...item(2)}
          className="mt-5 font-display text-xl font-semibold text-text sm:text-3xl"
        >
          {personal.role} at <span className="text-gradient">{personal.company}</span>
        </motion.p>
        <motion.p
          {...item(3)}
          className="mt-3 flex min-h-6 items-center gap-2 font-mono text-sm text-accent sm:text-base"
        >
          <span aria-hidden="true" className="text-muted">
            &gt;
          </span>
          <Typewriter words={personal.keywords} />
        </motion.p>
        <motion.p {...item(4)} className="mt-5 max-w-2xl leading-relaxed text-muted">
          {personal.description}
        </motion.p>

        <motion.div {...item(5)} className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/#projects"
            className="group flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-contrast transition-transform hover:-translate-y-0.5"
          >
            View projects{' '}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={personal.cv}
            download
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <Download className="size-4" /> Download CV
          </a>
          <Link
            to="/#contact"
            className="flex items-center gap-2 rounded-full px-4 py-2.5 font-medium text-muted transition-colors hover:text-accent"
          >
            <Mail className="size-4" /> Contact
          </Link>
        </motion.div>

        <motion.div {...item(6)} className="mt-8">
          <SocialLinks />
        </motion.div>
      </div>

      <Link
        to="/#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 grid size-11 -translate-x-1/2 place-items-center text-muted transition-colors hover:text-accent"
      >
        <ChevronDown className="size-6 motion-safe:animate-bounce" />
      </Link>
    </section>
  )
}
