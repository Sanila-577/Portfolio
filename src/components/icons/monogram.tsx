import type { TechIconComponent } from '../../data/tech'

/**
 * Builds a simple lettered mark for technologies that have no icon in react-icons
 * (e.g. WSO2, Tavily). Swap for an official SVG in src/assets/tech/ if you have one.
 */
export function monogram(letters: string): TechIconComponent {
  function Monogram({ className, size = '1em' }: { className?: string; size?: number | string }) {
    const fontSize = letters.length > 2 ? 9 : 11
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <rect
          x="1.5"
          y="1.5"
          width="21"
          height="21"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <text
          x="12"
          y="12"
          dy="0.35em"
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight="700"
          fontFamily="Space Grotesk, Inter, sans-serif"
          fill="currentColor"
        >
          {letters}
        </text>
      </svg>
    )
  }
  Monogram.displayName = `Monogram(${letters})`
  return Monogram
}
