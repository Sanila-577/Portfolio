import { ArrowLeft, Telescope } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-[1100px] flex-col items-center justify-center px-4 text-center">
      <title>Page not found · Sanila Wijesekara</title>
      <Telescope className="size-14 text-accent" strokeWidth={1.4} />
      <h1 className="mt-6 text-5xl font-bold">404</h1>
      <p className="mt-3 max-w-md text-muted">
        I searched the whole sky and couldn’t find this page. It may have drifted out of orbit.
      </p>
      <Link
        to="/"
        className="mt-8 flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-contrast"
      >
        <ArrowLeft className="size-4" /> Back home
      </Link>
    </section>
  )
}
