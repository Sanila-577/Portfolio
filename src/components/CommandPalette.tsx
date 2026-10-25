import { Command } from 'cmdk'
import { Copy, Download, ExternalLink, FolderGit2, Hash, Moon, Sun } from 'lucide-react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { personal } from '../data/profile'
import { projects } from '../data/projects'
import { ALL_SECTIONS } from '../lib/nav'
import { useTheme } from '../lib/theme'
import { activeSocials, SOCIAL_ICONS } from './SocialLinks'
import { useToast } from './Toast'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function Item({
  children,
  onSelect,
  value,
}: {
  children: ReactNode
  onSelect: () => void
  value: string
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted data-[selected=true]:bg-surface-2 data-[selected=true]:text-text"
    >
      {children}
    </Command.Item>
  )
}

const groupClass =
  '[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted'

export function CommandPalette({ open, onOpenChange }: Props) {
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()
  const toast = useToast()

  const run = (fn: () => void) => {
    onOpenChange(false)
    fn()
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command palette"
      overlayClassName="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[15vh] z-[71] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
    >
      <Command.Input
        placeholder="Jump to a section, project or action…"
        className="w-full border-b border-border bg-transparent px-4 py-3.5 text-sm text-text outline-none placeholder:text-muted"
      />
      <Command.List className="max-h-[55vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-sm text-muted">
          No results.
        </Command.Empty>

        <Command.Group heading="Actions" className={groupClass}>
          <Item value="toggle theme dark light mode" onSelect={() => run(toggle)}>
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            Switch to {theme === 'dark' ? 'light' : 'dark'} mode
          </Item>
          <Item
            value="copy email address"
            onSelect={() =>
              run(() => {
                navigator.clipboard
                  .writeText(personal.email)
                  .then(() => toast('Email copied to clipboard'))
                  .catch(() => toast('Could not copy email', 'error'))
              })
            }
          >
            <Copy className="size-4" /> Copy email ({personal.email})
          </Item>
          <Item
            value="download cv resume"
            onSelect={() =>
              run(() => {
                const a = document.createElement('a')
                a.href = personal.cv
                a.download = ''
                a.click()
              })
            }
          >
            <Download className="size-4" /> Download CV
          </Item>
        </Command.Group>

        <Command.Group heading="Sections" className={groupClass}>
          {ALL_SECTIONS.map((s) => (
            <Item
              key={s.id}
              value={`section ${s.label}`}
              onSelect={() => run(() => navigate(`/#${s.id}`))}
            >
              <Hash className="size-4" /> {s.label}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading="Projects" className={groupClass}>
          {projects.map((p) => (
            <Item
              key={p.slug}
              value={`project ${p.title} ${p.tagline}`}
              onSelect={() => run(() => navigate(`/projects/${p.slug}`))}
            >
              <FolderGit2 className="size-4" /> {p.title}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading="Links" className={groupClass}>
          {activeSocials.map((s) => {
            const Icon = SOCIAL_ICONS[s.key]
            return (
              <Item
                key={s.key}
                value={`link ${s.label}`}
                onSelect={() => run(() => window.open(s.url, '_blank', 'noopener'))}
              >
                <Icon className="size-4" /> {s.label}
                <ExternalLink className="ml-auto size-3.5" />
              </Item>
            )
          })}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
