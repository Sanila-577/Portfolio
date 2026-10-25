import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

interface Props<T> {
  items: T[]
  getKey: (item: T) => string
  render: (item: T, index: number) => ReactNode
  label: string
  /** "alternate": right, left, right… on desktop. "right": every card to the right of the spine. */
  layout?: 'alternate' | 'right'
}

/**
 * Vertical timeline with a single left spine on mobile. With `layout="alternate"`
 * the desktop spine is centered and cards alternate right, left, right… from the
 * top; each card spans two grid rows and the next starts one row later, so the
 * two sides interlock instead of leaving a gap beside every tall card.
 */
export function AltTimeline<T>({ items, getKey, render, label, layout = 'alternate' }: Props<T>) {
  const reduce = useReducedMotion()
  const alternate = layout === 'alternate'
  return (
    <ol
      className={`relative grid grid-cols-1 gap-y-8 ${alternate ? 'md:grid-cols-2 md:gap-x-20 md:gap-y-6' : ''}`}
      aria-label={label}
      data-timeline
      data-layout={layout}
    >
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-[7px] top-0 w-px bg-border ${alternate ? 'md:left-1/2' : ''}`}
      />
      {items.map((item, i) => {
        const right = !alternate || i % 2 === 0
        return (
          <motion.li
            key={getKey(item)}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            data-side={right ? 'right' : 'left'}
            style={alternate ? ({ '--row': `${i + 1} / span 2` } as CSSProperties) : undefined}
            className={`relative ${alternate ? `md:[grid-row:var(--row)] ${right ? 'md:col-start-2' : 'md:col-start-1'}` : ''}`}
          >
            <span
              aria-hidden="true"
              className={`absolute left-0 top-6 size-[15px] rounded-full border-4 border-bg bg-accent ${
                alternate ? (right ? 'md:-left-[47.5px]' : 'md:-right-[47.5px] md:left-auto') : ''
              }`}
            />
            <div className={alternate ? 'pl-8 md:pl-0' : 'pl-8 md:pl-12'}>{render(item, i)}</div>
          </motion.li>
        )
      })}
    </ol>
  )
}
