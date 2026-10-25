import { expect, test } from '@playwright/test'
import { collectErrors, findOverflowingElements, horizontalOverflow, settle } from './helpers'

const NAV_LABELS = [
  'About',
  'Journey',
  'Education',
  'Projects',
  'Research',
  'Achievements',
  'Volunteering',
  'Articles',
  'Contact',
]

async function projectPaths(page: import('@playwright/test').Page) {
  await page.goto('/')
  const hrefs = await page
    .locator('#projects a', { hasText: 'View more' })
    .evaluateAll((as) => as.map((a) => a.getAttribute('href')!))
  return [...new Set(hrefs)]
}

test.describe('layout fits the screen', () => {
  test('home page has no horizontal overflow or console errors', async ({ page }) => {
    const errors = collectErrors(page)
    await page.goto('/')
    await settle(page)
    expect(await horizontalOverflow(page), 'page scrolls sideways').toBeLessThanOrEqual(1)
    expect(await findOverflowingElements(page), 'elements past the right edge').toEqual([])
    expect(errors).toEqual([])
  })

  test('every project page and the 404 page fit', async ({ page }) => {
    const errors = collectErrors(page)
    const paths = await projectPaths(page)
    expect(paths.length).toBeGreaterThan(0)
    for (const path of [...paths, '/this-page-does-not-exist']) {
      await page.goto(path)
      await settle(page)
      expect(await horizontalOverflow(page), `${path} scrolls sideways`).toBeLessThanOrEqual(1)
      expect(await findOverflowingElements(page), `${path} elements past the right edge`).toEqual(
        [],
      )
    }
    expect(errors).toEqual([])
  })

  test('headings are not clipped and text is readable', async ({ page }) => {
    await page.goto('/')
    await settle(page)
    const problems = await page.evaluate(() => {
      const out: string[] = []
      for (const h of Array.from(document.querySelectorAll('h1, h2, h3'))) {
        const el = h as HTMLElement
        if (el.scrollWidth > el.clientWidth + 1)
          out.push(`clipped heading: ${el.textContent?.slice(0, 40)}`)
      }
      const body = parseFloat(getComputedStyle(document.body).fontSize)
      if (body < 16) out.push(`body font-size ${body}px`)
      for (const el of Array.from(
        document.querySelectorAll('main p, main li, main a, main span'),
      )) {
        if (
          el.closest('[aria-hidden="true"], [role="tooltip"]') ||
          !(el as HTMLElement).innerText?.trim()
        )
          continue
        const size = parseFloat(getComputedStyle(el).fontSize)
        if (size < 11)
          out.push(`tiny text (${size}px): ${(el as HTMLElement).innerText.slice(0, 30)}`)
      }
      return out.slice(0, 10)
    })
    expect(problems).toEqual([])
  })
})

test.describe('timelines', () => {
  test('My Journey is one-sided: every card to the right of the spine', async ({ page }) => {
    await page.goto('/')
    await settle(page)
    const items = page.locator('#journey [data-timeline] > li')
    const count = await items.count()
    expect(count).toBeGreaterThan(0)
    const spine = (await page.locator('#journey [data-timeline] > span').boundingBox())!
    const lefts: number[] = []
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toHaveAttribute('data-side', 'right')
      // Measure the card itself, not its padded wrapper.
      const card = (await items.nth(i).locator(':scope > div > *').first().boundingBox())!
      expect(card.x, 'card sits right of the spine').toBeGreaterThan(spine.x)
      lefts.push(card.x)
    }
    expect(Math.max(...lefts) - Math.min(...lefts), 'cards share one column').toBeLessThan(2)
  })

  test('Volunteering stacks on phones and alternates right/left on wider screens', async ({
    page,
  }) => {
    await page.goto('/')
    await settle(page)
    const vw = page.viewportSize()!.width
    const items = page.locator('#volunteer [data-timeline] > li')
    const count = await items.count()
    expect(count).toBeGreaterThan(0)
    const lefts: number[] = []
    for (let i = 0; i < count; i++) {
      lefts.push((await items.nth(i).locator(':scope > div').boundingBox())!.x)
      await expect(items.nth(i)).toHaveAttribute('data-side', i % 2 === 0 ? 'right' : 'left')
    }
    if (vw < 768) {
      expect(Math.max(...lefts) - Math.min(...lefts), 'cards share one column').toBeLessThan(2)
    } else {
      const first = (await items.nth(0).locator(':scope > div').boundingBox())!
      expect(first.x, 'first card on the right').toBeGreaterThan(vw / 2 - 40)
      if (count > 1) {
        const second = (await items.nth(1).locator(':scope > div').boundingBox())!
        expect(second.x, 'second card on the left').toBeLessThan(first.x)
      }
    }
  })
})

test.describe('navigation on small screens', () => {
  test('hamburger menu lists every section and jumps to it', async ({ page }) => {
    const vw = page.viewportSize()!.width
    test.skip(vw >= 1280, 'wide screens show the full nav')
    await page.goto('/')
    await page.getByRole('button', { name: 'Open menu' }).click()
    const menu = page.locator('#mobile-menu')
    for (const label of NAV_LABELS)
      await expect(menu.getByRole('link', { name: label, exact: true })).toBeVisible()
    await menu.getByRole('link', { name: 'Projects', exact: true }).click()
    await expect(menu).toBeHidden()
    await expect
      .poll(async () =>
        page.evaluate(() =>
          Math.abs(document.getElementById('projects')!.getBoundingClientRect().top),
        ),
      )
      .toBeLessThan(120)
  })

  test('touch targets are at least 40×40 px', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'touch devices only')
    await page.goto('/')
    const selectors = [
      'header button',
      'header a[href]',
      '#top a[href]',
      '#contact input:not([tabindex="-1"])',
      '#contact textarea',
      '#contact button',
    ]
    const small = await page.evaluate((sels) => {
      const out: string[] = []
      for (const el of Array.from(document.querySelectorAll(sels.join(',')))) {
        const r = el.getBoundingClientRect()
        const cs = getComputedStyle(el)
        if (cs.display === 'none' || cs.visibility === 'hidden' || r.width === 0) continue
        if (el.closest('[aria-hidden="true"]')) continue
        if (r.width < 40 || r.height < 40)
          out.push(
            `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24)}" ${Math.round(r.width)}×${Math.round(r.height)}`,
          )
      }
      return out
    }, selectors)
    expect(small).toEqual([])
  })
})

test.describe('width sweep', () => {
  test('home page fits from 280 px to 1440 px', async ({ page, browserName, isMobile }) => {
    test.skip(browserName !== 'chromium' || isMobile, 'run once, on desktop Chrome')
    test.setTimeout(120_000)
    await page.goto('/')
    await settle(page)
    const widths = [...Array.from({ length: 11 }, (_, i) => 280 + i * 20), 768, 1024, 1440]
    for (const width of widths) {
      await page.setViewportSize({ width, height: 800 })
      await page.waitForTimeout(150)
      expect(await horizontalOverflow(page), `scrolls sideways at ${width}px`).toBeLessThanOrEqual(
        1,
      )
      expect(await findOverflowingElements(page), `elements past the edge at ${width}px`).toEqual(
        [],
      )
    }
  })
})
