import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface Props {
  id: string
  eyebrow?: string
  title: string
  intro?: ReactNode
  children: ReactNode
  className?: string
  /** Header alignment; sections after About are centered. */
  align?: 'left' | 'center'
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = '',
  align = 'center',
}: Props) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-[1100px] px-4 py-20 sm:px-6 md:py-28 ${className}`}
    >
      <Reveal className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center' : ''}`}>
        {eyebrow && (
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
        {intro && (
          <p
            data-intro
            className={`mt-3 max-w-2xl text-muted ${align === 'center' ? 'mx-auto' : ''}`}
          >
            {intro}
          </p>
        )}
      </Reveal>
      {children}
    </section>
  )
}
