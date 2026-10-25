import { ArrowUp } from 'lucide-react'
import { personal } from '../data/profile'
import { SocialLinks } from './SocialLinks'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p>
          © {YEAR} {personal.name}. All rights reserved.
        </p>
        <SocialLinks />
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowUp className="size-4" /> Back to top
        </button>
      </div>
    </footer>
  )
}
