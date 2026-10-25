import { AnimatePresence, motion } from 'framer-motion'
import { Command, Download, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { personal } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { NAV_ITEMS, SECTION_IDS } from '../lib/nav'
import { ThemeToggle } from './ThemeToggle'

const NO_IDS: string[] = []
const NAV_ID_SET = new Set(NAV_ITEMS.map((n) => n.id))

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  // Track every section so the highlight clears on the hero and on sections that aren't in the nav.
  const current = useActiveSection(onHome ? SECTION_IDS : NO_IDS)
  const active = current && NAV_ID_SET.has(current) ? current : null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-border bg-bg/75 backdrop-blur-lg'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1100px] items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Main"
      >
        <Link
          to="/"
          className="flex h-10 min-w-10 items-center font-display text-lg font-bold"
          onClick={() => onHome && window.scrollTo({ top: 0 })}
        >
          <span className="text-gradient">{personal.initials}</span>
          <span className="hidden text-text sm:inline xl:hidden"> · {personal.name}</span>
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                to={`/#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
                className={`relative rounded-full px-2.5 py-1.5 text-sm transition-colors ${
                  active === item.id ? 'text-text' : 'text-muted hover:text-text'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={personal.cv}
            download
            className="hidden h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-medium text-accent-contrast transition-transform hover:-translate-y-0.5 sm:flex"
          >
            <Download className="size-4" /> Resume
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-border xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden xl:hidden"
          >
            <ul className="mx-auto flex max-w-[1100px] flex-col gap-1 px-4 pb-4 sm:px-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2 ${active === item.id ? 'bg-surface-2 text-text' : 'text-muted'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="flex gap-2 pt-2">
                <a
                  href={personal.cv}
                  download
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-contrast"
                >
                  <Download className="size-4" /> Resume
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onOpenPalette()
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-muted"
                >
                  <Command className="size-4" /> Search
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
