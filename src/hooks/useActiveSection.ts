import { useEffect, useState } from 'react'

/**
 * Returns the id of the section the reader is in: the last of `ids` whose top has
 * passed 35% of the viewport. At the very bottom of the page the last section wins;
 * above the first section (the hero) nothing is active.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!ids.length) return
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      if (atBottom) {
        const last = [...ids].reverse().find((id) => document.getElementById(id))
        if (last) current = last
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return ids.length ? active : null
}
