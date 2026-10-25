import { BookOpen, ExternalLink, FileText } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

const base =
  'relative z-10 flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent'

export function ProjectLinks({
  links,
  size = 'sm',
}: {
  links: Project['links']
  size?: 'sm' | 'md'
}) {
  const cls = size === 'md' ? base.replace('px-3 py-1.5 text-xs', 'px-4 py-2 text-sm') : base
  return (
    <div className="flex flex-wrap gap-2">
      {links.github && (
        <a href={links.github} target="_blank" rel="noreferrer" className={cls}>
          <FaGithub className="size-3.5" /> GitHub
        </a>
      )}
      {links.live && (
        <a href={links.live} target="_blank" rel="noreferrer" className={cls}>
          <ExternalLink className="size-3.5" /> Live demo
        </a>
      )}
      {links.article && (
        <a href={links.article} target="_blank" rel="noreferrer" className={cls}>
          <BookOpen className="size-3.5" /> Article
        </a>
      )}
      {links.research && (
        <Link to={links.research} className={cls}>
          <FileText className="size-3.5" /> Research
        </Link>
      )}
    </div>
  )
}
