/**
 * Fails if any technology named in the site's data has no icon in src/data/tech.ts.
 * TypeScript already enforces this for typed fields; this also catches casts and
 * anything added through untyped data. Run with `npm run check:tech`.
 */
import { projects } from '../src/data/projects'
import { research } from '../src/data/research'
import { skillGroups } from '../src/data/skills'
import { TECH } from '../src/data/tech'
import { timeline } from '../src/data/timeline'

const used = new Map<string, string[]>()
const add = (name: string, where: string) => used.set(name, [...(used.get(name) ?? []), where])

projects.forEach((p) => p.tech.forEach((t) => add(t, `project:${p.slug}`)))
timeline.forEach((e) => {
  e.tech?.forEach((t) => add(t, `timeline:${e.id}`))
  e.subProjects?.forEach((sp) => sp.tech.forEach((t) => add(t, `timeline:${e.id}:${sp.name}`)))
})
skillGroups.forEach((g) => g.items.forEach((t) => add(t, `skills:${g.title}`)))
research.tech.forEach((t) => add(t, 'research'))

const missing = [...used.keys()].filter((name) => !(name in TECH))

if (missing.length) {
  console.error('✗ Technologies without an icon in src/data/tech.ts:')
  for (const name of missing) console.error(`  - ${name}  (used in ${used.get(name)!.join(', ')})`)
  process.exit(1)
}

console.log(`✓ All ${used.size} technologies have icons.`)
