import { expect, test } from '@playwright/test'
import { settle } from './helpers'

const SECTION_ORDER = [
  'top',
  'about',
  'journey',
  'education',
  'projects',
  'skills',
  'research',
  'awards',
  'certifications',
  'volunteer',
  'blog',
  'resume',
  'contact',
]

const HEADINGS: Record<string, string> = {
  about: 'About Me',
  journey: 'My Journey',
  education: 'Education',
  awards: 'Achievements',
  volunteer: 'Volunteering',
  blog: 'My Articles',
  resume: 'Want to see my resume?',
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await settle(page)
})

test('sections appear in order with the right headings', async ({ page }) => {
  const ids = await page.locator('main section[id]').evaluateAll((els) => els.map((e) => e.id))
  expect(ids).toEqual(SECTION_ORDER)
  for (const [id, title] of Object.entries(HEADINGS)) {
    await expect(page.locator(`#${id} h2`).first()).toHaveText(title)
  }
})

test('only the contact section has a subline', async ({ page }) => {
  const withIntro = await page
    .locator('[data-intro]')
    .evaluateAll((els) => els.map((e) => e.closest('section')?.id))
  expect(withIntro).toEqual(['contact'])
  await expect(page.locator('#contact [data-intro]')).toContainText('Open to internships')
})

test('hero shows the static role and the typing keywords', async ({ page }) => {
  await expect(page.locator('#top')).toContainText(
    'Intern AI Engineer at OCTAVE — John Keells Group',
  )
  await expect(page.locator('#top .font-mono')).toBeVisible()
  await expect(page.locator('#about')).not.toContainText('Industry projects at OCTAVE')
})

test('dark mode is the default for new visitors', async ({ page }) => {
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('headings after About are centered; About stays left-aligned', async ({ page }) => {
  const align = (id: string) =>
    page
      .locator(`#${id} h2`)
      .first()
      .evaluate((el) => getComputedStyle(el).textAlign)
  expect(await align('about')).not.toBe('center')
  for (const id of [
    'journey',
    'education',
    'projects',
    'skills',
    'awards',
    'volunteer',
    'blog',
    'contact',
  ]) {
    expect(await align(id), `${id} heading`).toBe('center')
  }
})

test('no command-palette button in the header', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Open command palette' })).toHaveCount(0)
})

test("hovering a project tech icon shows only that icon's name", async ({ page }) => {
  const card = page.locator('#projects li').first()
  await card.hover({ position: { x: 20, y: 20 } })
  const visibleTips = () =>
    card
      .locator('[role="tooltip"]')
      .evaluateAll(
        (els) => els.filter((el) => parseFloat(getComputedStyle(el).opacity) > 0.5).length,
      )
  await expect.poll(visibleTips, { message: 'no names while hovering the card' }).toBe(0)
  await card.locator('[role="tooltip"]').first().locator('..').hover()
  await expect.poll(visibleTips, { message: 'one name on the hovered icon' }).toBe(1)
})

test.describe('nav highlight', () => {
  const current = (page: import('@playwright/test').Page) =>
    page.locator('nav[aria-label="Main"] ul a[aria-current="location"]')

  test('nothing is highlighted on the hero', async ({ page }) => {
    await expect(current(page)).toHaveCount(0)
  })

  test('follows the section being read', async ({ page }) => {
    for (const [id, label] of [
      ['journey', 'Journey'],
      ['projects', 'Projects'],
      ['awards', 'Achievements'],
      ['volunteer', 'Volunteering'],
    ]) {
      await page.evaluate((id) => {
        const el = document.getElementById(id)!
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY + 40,
          behavior: 'instant' as ScrollBehavior,
        })
      }, id)
      await expect(current(page)).toHaveText(label)
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }))
    await expect(current(page)).toHaveCount(0)
  })

  test('landing on #contact highlights Contact, and scrolling away moves it', async ({ page }) => {
    await page.goto('/#contact')
    await expect(current(page)).toHaveText('Contact')
    await page.evaluate(() =>
      document.getElementById('about')!.scrollIntoView({ behavior: 'instant' as ScrollBehavior }),
    )
    await expect(current(page)).toHaveText('About')
  })
})

test.describe('contact form', () => {
  for (const bad of ['a@b', 'a..b@c.com', 'name@site', 'name@site.c', '.name@site.com']) {
    test(`rejects ${bad}`, async ({ page }) => {
      const email = page.locator('#reply_to')
      await email.fill(bad)
      await email.blur()
      await expect(page.locator('#reply_to-error')).toBeVisible()
    })
  }

  test('accepts a valid email and a one-word message', async ({ page }) => {
    await page.locator('#from_name').fill('Ada Lovelace')
    await page.locator('#reply_to').fill('name@site.lk')
    await page.locator('#reply_to').blur()
    await expect(page.locator('#reply_to-error')).toHaveCount(0)
    await page.locator('#subject').fill('Hello')
    await page.locator('#message').fill('Hi')
    await page.getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('[id$="-error"]')).toHaveCount(0)
  })
})

test.describe('projects', () => {
  test('every card has View more, with no domain filter row', async ({ page }) => {
    const cards = page.locator('#projects li')
    const n = await cards.count()
    expect(n).toBeGreaterThan(0)
    await expect(page.locator('#projects a', { hasText: 'View more' })).toHaveCount(n)
    await expect(page.locator('#projects [role="group"]')).toHaveCount(0)
  })

  test('project pages have no Architecture or My role blocks', async ({ page }) => {
    const hrefs = await page
      .locator('#projects a', { hasText: 'View more' })
      .evaluateAll((as) => as.map((a) => a.getAttribute('href')!))
    for (const href of hrefs) {
      await page.goto(href)
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Architecture' })).toHaveCount(0)
      await expect(page.getByRole('heading', { name: 'My role' })).toHaveCount(0)
    }
  })
})

test.describe('timelines', () => {
  test('journey entries are all on the right and every role has dates and a description', async ({
    page,
  }) => {
    const items = page.locator('#journey [data-timeline] > li')
    const count = await items.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const item = items.nth(i)
      await expect(item).toHaveAttribute('data-side', 'right')
      await expect(item).toContainText(
        /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (19|20)\d{2}/,
      )
      expect(await item.locator('p.leading-relaxed').count()).toBeGreaterThan(0)
    }
  })

  test('OCTAVE shows tech icons per sub-project and a combined row', async ({ page }) => {
    const octave = page.locator('#tl-octave')
    const subprojects = await octave.locator('ul > li.rounded-xl').count()
    expect(subprojects).toBeGreaterThan(0)
    await expect(octave.getByTestId('subproject-tech')).toHaveCount(subprojects)
    await expect(octave.getByTestId('entry-tech')).toHaveCount(1)
  })

  test('volunteering links only on Kaggle and Medium', async ({ page }) => {
    const items = page.locator('#volunteer [data-timeline] > li')
    const count = await items.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const item = items.nth(i)
      await expect(item).toHaveAttribute('data-side', i % 2 === 0 ? 'right' : 'left')
      const text = (await item.innerText()).toLowerCase()
      const links = await item.locator('a').count()
      if (text.includes('kaggle')) {
        await expect(item.locator('a')).toHaveAttribute(
          'href',
          'https://www.kaggle.com/sanilawijesekara',
        )
      } else if (text.includes('medium writer')) {
        await expect(item.locator('a')).toHaveAttribute('href', '/#blog')
      } else {
        expect(links, `no link on: ${text.slice(0, 40)}`).toBe(0)
      }
    }
  })
})

test.describe('scrolling stays where the visitor puts it', () => {
  // Regression: the hash-scroll correction used to pull visitors back to the section.
  async function backwardJumps(page: import('@playwright/test').Page) {
    await page.mouse.move(640, 400)
    const ys: number[] = []
    for (let i = 0; i < 15; i++) {
      await page.mouse.wheel(0, 400)
      await page.waitForTimeout(120)
      ys.push(await page.evaluate(() => Math.round(scrollY)))
    }
    await page.waitForTimeout(1500)
    ys.push(await page.evaluate(() => Math.round(scrollY)))
    return ys.filter((y, i) => i > 0 && y < ys[i - 1] - 50)
  }

  test('after clicking a nav link', async ({ page }) => {
    await page
      .locator('nav[aria-label="Main"] ul')
      .getByRole('link', { name: 'About', exact: true })
      .click()
    await page.waitForTimeout(300)
    expect(await backwardJumps(page)).toEqual([])
  })

  test('after opening a link to a section', async ({ page }) => {
    await page.goto('/#journey')
    await page.waitForTimeout(400)
    expect(await backwardJumps(page)).toEqual([])
  })
})

test('every certification panel with a link is clickable', async ({ page }) => {
  const online = page.locator('#certifications a[href^="http"]')
  const images = page.locator('#certifications button[aria-label^="View certificate"]')
  const labels = page.locator('#certifications span', { hasText: 'View certification' })
  expect(await online.count()).toBeGreaterThan(0)
  await expect(labels).toHaveCount((await online.count()) + (await images.count()))
  for (const card of await online.all()) {
    await expect(card).toHaveAttribute('target', '_blank')
    await expect(card.locator('.spotlight')).toHaveCount(1)
  }
})

test('certificate screenshots open in the on-page viewer and load', async ({ page }) => {
  const images = page.locator('#certifications button[aria-label^="View certificate"]')
  const n = await images.count()
  test.skip(n === 0, 'no certificate screenshots')
  for (let i = 0; i < n; i++) {
    await images.nth(i).click()
    const img = page.locator('.yarl__slide_image').first()
    await expect(img).toBeVisible()
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
      .toBeGreaterThan(0)
    await page.keyboard.press('Escape')
    await expect(img).toBeHidden()
  }
})
