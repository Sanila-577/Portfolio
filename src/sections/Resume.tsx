import { Download, ExternalLink, FileText } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { personal } from '../data/profile'

export function Resume() {
  return (
    <section id="resume" className="mx-auto w-full max-w-[1100px] px-4 py-10 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/15 via-surface to-accent-2/15 p-8 md:p-12">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            {/* Stylised CV thumbnail */}
            <div
              aria-hidden="true"
              className="hidden w-32 shrink-0 rotate-[-4deg] rounded-lg border border-border bg-surface p-3 shadow-xl md:block"
            >
              <FileText className="mb-2 size-6 text-accent" />
              <div className="space-y-1.5">
                {[90, 70, 80, 55, 75, 60, 85].map((w, i) => (
                  <div key={i} className="h-1.5 rounded bg-border" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Resume
              </p>
              <h2 className="text-3xl font-bold">Want to see my resume?</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={personal.cv}
                download
                className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-contrast transition-transform hover:-translate-y-0.5"
              >
                <Download className="size-4" /> Download CV
              </a>
              <a
                href={personal.cv}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <ExternalLink className="size-4" /> Open in new tab
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
