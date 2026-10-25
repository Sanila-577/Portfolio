import { createContext, useContext, useState, type ReactNode } from 'react'
import type { TechName } from '../data/tech'

export type ProjectFilter = { kind: 'all' } | { kind: 'tech'; value: TechName }

interface Ctx {
  filter: ProjectFilter
  setFilter: (f: ProjectFilter) => void
}

const ProjectFilterContext = createContext<Ctx | null>(null)

/** Shared between Skills (click a skill) and Projects (the active-filter chip). */
export function ProjectFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<ProjectFilter>({ kind: 'all' })
  return (
    <ProjectFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </ProjectFilterContext.Provider>
  )
}

export function useProjectFilter() {
  const ctx = useContext(ProjectFilterContext)
  if (!ctx) throw new Error('useProjectFilter must be used inside ProjectFilterProvider')
  return ctx
}
