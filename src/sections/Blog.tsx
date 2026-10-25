import { ArrowUpRight, Calendar, FolderGit2 } from 'lucide-react'
import { useState } from 'react'
import { FaMedium } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SpotlightCard } from '../components/SpotlightCard'
import { articles, MEDIUM_PROFILE, type Article } from '../data/blog'
import { formatDate } from '../lib/date'

function BlogCard({ article }: { article: Article }) {
  const [coverFailed, setCoverFailed] = useState(false)
  return (
    <SpotlightCard className="group relative flex h-full flex-col overflow-hidden">
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 z-0"
        aria-label={`Read “${article.title}” on Medium`}
      />
      <div className="aspect-[2/1] overflow-hidden bg-surface-2">
        {coverFailed ? (
          <div className="grid size-full place-items-center">
            <FaMedium className="size-12 text-muted" />
          </div>
        ) : (
          <img
            src={article.cover}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setCoverFailed(true)}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs text-muted">
          <Calendar className="size-3.5" /> {formatDate(article.date)}
          {article.readTime && <> · {article.readTime}</>}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-accent">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{article.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {article.tags.map((t) => (
            <span key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
          <span className="flex items-center gap-1 text-accent">
            Read on Medium <ArrowUpRight className="size-4" />
          </span>
          {article.project && (
            <Link
              to={article.project}
              className="relative z-10 flex items-center gap-1 text-muted hover:text-text"
            >
              <FolderGit2 className="size-4" /> Project
            </Link>
          )}
        </div>
      </div>
    </SpotlightCard>
  )
}

export function Blog() {
  return (
    <Section id="blog" eyebrow="Articles" title="My Articles">
      <div className="grid gap-5 md:grid-cols-2">
        {articles.map((a, i) => (
          <Reveal key={a.url} delay={i * 0.08}>
            <BlogCard article={a} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 text-center">
        <a
          href={MEDIUM_PROFILE}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          <FaMedium className="size-4" /> View all on Medium
        </a>
      </Reveal>
    </Section>
  )
}
