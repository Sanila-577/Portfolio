import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { useHotkey } from './hooks/useHotkey'
import { ProjectFilterProvider } from './lib/projectFilter'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then((m) => ({ default: m.CommandPalette })),
)

/** Scrolls to #hash targets after navigation, or to the top for new pages. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }
    // Give the page a moment to render (lazy routes, page transitions).
    const id = hash.slice(1)
    let tries = 0
    let corrections = 0
    let timer = 0
    // A smooth scroll can stop short (a tap on touch devices, images loading above
    // the target). When scrolling settles, finish the move if the target isn't in place.
    const settle = (delay = 150) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        const el = document.getElementById(id)
        if (!el || corrections++ >= 3) return cleanup()
        const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
        if (Math.abs(el.getBoundingClientRect().top - offset) > 8 && !atBottom) {
          el.scrollIntoView({ behavior: 'smooth' })
          settle(1000) // re-check even if this scroll never fires an event
        } else cleanup()
      }, delay)
    }
    const onScroll = () => settle()
    const cleanup = () => window.removeEventListener('scroll', onScroll)
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        window.addEventListener('scroll', onScroll, { passive: true })
        // Some browsers start a smooth scroll late; don't correct before it has begun.
        settle(1000)
      } else if (tries++ < 20) setTimeout(tryScroll, 50)
    }
    tryScroll()
    return () => {
      cleanup()
      window.clearTimeout(timer)
    }
  }, [pathname, hash, key])
  return null
}

export default function App() {
  const location = useLocation()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const togglePalette = useCallback(() => setPaletteOpen((o) => !o), [])
  useHotkey('k', togglePalette)

  return (
    <ProjectFilterProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <ScrollManager />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      {paletteOpen && (
        <Suspense fallback={null}>
          <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
        </Suspense>
      )}
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </ProjectFilterProvider>
  )
}
