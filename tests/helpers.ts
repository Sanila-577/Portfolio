import type { Page } from '@playwright/test'

/** Errors the suite should fail on. Missing photos (404s until you add them) are expected and ignored. */
export function collectErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return
    const text = msg.text()
    if (/Failed to load resource|404|ERR_NAME_NOT_RESOLVED|fonts\.g/.test(text)) return
    errors.push(`console: ${text}`)
  })
  return errors
}

/** Scroll through the whole page so every scroll-triggered animation has run, then return to the top. */
export async function settle(page: Page) {
  await page.waitForLoadState('load')
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8))
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior })
      await new Promise((r) => setTimeout(r, 40))
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  })
  await page.waitForTimeout(600)
}

/**
 * Elements that stick out past the right edge of the viewport and are not clipped
 * by an overflow-hidden ancestor. Decorative (aria-hidden) and tooltip subtrees are skipped.
 */
export function findOverflowingElements(page: Page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const out: string[] = []
    const clipped = (el: Element, right: number) => {
      for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        const cs = getComputedStyle(a)
        if (
          /(hidden|clip|auto|scroll)/.test(cs.overflowX) &&
          a.getBoundingClientRect().right < right
        )
          return true
      }
      return false
    }
    for (const el of Array.from(document.body.querySelectorAll('*'))) {
      if (el.closest('[aria-hidden="true"], [role="tooltip"], script, style')) continue
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      if (r.right > vw + 1 && !clipped(el, r.right)) {
        const id = el.id ? `#${el.id}` : ''
        const cls =
          typeof el.className === 'string'
            ? `.${el.className.trim().split(/\s+/).slice(0, 3).join('.')}`
            : ''
        out.push(`${el.tagName.toLowerCase()}${id}${cls} right=${Math.round(r.right)} vw=${vw}`)
      }
    }
    return out.slice(0, 10)
  })
}

export async function horizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
}
