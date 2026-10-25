import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Types and deletes each word in turn. */
export function Typewriter({ words }: { words: string[] }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return
    const word = words[index % words.length]
    let delay = deleting ? 40 : 80
    if (!deleting && text === word) delay = 1600
    if (deleting && text === '') delay = 300

    const timer = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => clearTimeout(timer)
  }, [text, deleting, index, words, reduce])

  if (reduce) return <span>{words.join(' · ')}</span>

  return (
    <span aria-label={words.join(', ')}>
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block w-[2px] animate-pulse bg-accent align-middle"
        style={{ height: '1em' }}
      />
    </span>
  )
}
