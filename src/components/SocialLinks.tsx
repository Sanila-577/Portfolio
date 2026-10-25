import { FaGithub, FaKaggle, FaLinkedin, FaMedium } from 'react-icons/fa6'
import { socials, type SocialKey } from '../data/profile'

const ICONS: Record<SocialKey, typeof FaGithub> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  medium: FaMedium,
  kaggle: FaKaggle,
}

export const activeSocials = socials.filter((s) => s.url)

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {activeSocials.map((s) => {
        const Icon = ICONS[s.key]
        return (
          <a
            key={s.key}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="grid size-10 place-items-center rounded-full border border-border text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            <Icon className="size-[18px]" />
          </a>
        )
      })}
    </div>
  )
}

export { ICONS as SOCIAL_ICONS }
