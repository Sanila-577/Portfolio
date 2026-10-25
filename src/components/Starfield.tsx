import { useEffect, useRef } from 'react'
import { useTheme } from '../lib/theme'

interface Star {
  x: number
  y: number
  z: number // depth 0..1 — nearer stars are bigger, brighter and move more with the mouse
  phase: number
}

/** Twinkling starfield with mouse parallax. Static under prefers-reduced-motion. */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rgb = getComputedStyle(document.documentElement)
      .getPropertyValue('--star')
      .trim()
      .replace(/\s+/g, ',')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let stars: Star[] = []
    let raf = 0
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((width * height) / (theme === 'dark' ? 5000 : 9000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05

      const near: { x: number; y: number }[] = []
      for (const s of stars) {
        const px = s.x + mouse.x * s.z * 18
        const py = s.y + mouse.y * s.z * 18
        const twinkle = reduce ? 1 : 0.55 + 0.45 * Math.sin(t / 900 + s.phase)
        const alpha = (theme === 'dark' ? 0.25 + s.z * 0.75 : 0.15 + s.z * 0.35) * twinkle
        ctx.beginPath()
        ctx.arc(px, py, 0.4 + s.z * 1.3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${alpha})`
        ctx.fill()
        if (theme === 'light' && s.z > 0.8) near.push({ x: px, y: py })
      }

      // Light mode: faint constellation lines between nearby foreground stars.
      if (theme === 'light') {
        ctx.strokeStyle = `rgba(${rgb},0.12)`
        ctx.lineWidth = 0.6
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const dx = near[i].x - near[j].x
            const dy = near[i].y - near[j].y
            if (dx * dx + dy * dy < 120 * 120) {
              ctx.beginPath()
              ctx.moveTo(near[i].x, near[i].y)
              ctx.lineTo(near[j].x, near[j].y)
              ctx.stroke()
            }
          }
        }
      }

      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const onMouse = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    if (!reduce) window.addEventListener('mousemove', onMouse)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [theme])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-10 size-full" />
}
