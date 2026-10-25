import emailjs from '@emailjs/browser'
import { Check, Copy, LoaderCircle, Mail, MapPin, Send } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SocialLinks } from '../components/SocialLinks'
import { useToast } from '../components/Toast'
import { personal } from '../data/profile'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

type Fields = 'from_name' | 'reply_to' | 'subject' | 'message'
type Errors = Partial<Record<Fields, string>>

const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/

function isValidEmail(value: string) {
  const v = value.trim()
  return (
    v.length <= 254 &&
    EMAIL.test(v) &&
    !v.includes('..') &&
    !v.startsWith('.') &&
    !v.split('@')[0].endsWith('.')
  )
}

function validateField(k: Fields, raw: string): string | undefined {
  const v = raw.trim()
  if (k === 'from_name' && v.length < 2) return 'Please enter your name.'
  if (k === 'reply_to') {
    if (!v) return 'Please enter your email.'
    if (!isValidEmail(v)) return 'Please enter a valid email address, e.g. name@example.com.'
  }
  if (k === 'subject' && v.length < 2) return 'Please add a subject.'
  if (k === 'message' && !v) return 'Please write a message.'
}

const FIELDS: Fields[] = ['from_name', 'reply_to', 'subject', 'message']

function validate(data: FormData): Errors {
  const errors: Errors = {}
  for (const k of FIELDS) {
    const msg = validateField(k, String(data.get(k) ?? ''))
    if (msg) errors[k] = msg
  }
  return errors
}

function ErrorText({ k, errors }: { k: Fields; errors: Errors }) {
  if (!errors[k]) return null
  return (
    <p id={`${k}-error`} className="mt-1 text-xs text-red-500">
      {errors[k]}
    </p>
  )
}

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [copied, setCopied] = useState(false)
  const toast = useToast()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      toast('Email copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast('Could not copy — please copy it manually', 'error')
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: real visitors never see or fill this field.
    if (data.get('company')) return

    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length) return

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast('Contact form is not configured yet — please email me directly.', 'error')
      return
    }

    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY })
      setStatus('sent')
      form.reset()
      toast('Message sent — I’ll get back to you soon!')
    } catch {
      setStatus('idle')
      toast('Something went wrong. Please try again or email me directly.', 'error')
    }
  }

  // Validate on blur; once a field shows an error, re-check it as the visitor types.
  const check = (k: Fields, value: string, live = false) => {
    if (live && !errors[k]) return
    setErrors((prev) => ({ ...prev, [k]: validateField(k, value) }))
  }
  const handlers = (k: Fields) => ({
    onBlur: (e: { currentTarget: { value: string } }) => check(k, e.currentTarget.value),
    onChange: (e: { currentTarget: { value: string } }) => check(k, e.currentTarget.value, true),
  })

  const field =
    'w-full rounded-xl border bg-surface-2 px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-muted/70 focus:border-accent'
  const border = (k: Fields) => (errors[k] ? 'border-red-500' : 'border-border')

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s build something together"
      intro="Open to internships, research collaborations and interesting problems. Drop me a message — I usually reply within a couple of days."
    >
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="mb-1 flex items-center gap-2 text-sm text-muted">
                <Mail className="size-4 text-accent" /> Email
              </p>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="break-all font-medium hover:text-accent"
                >
                  {personal.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </button>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="mb-1 flex items-center gap-2 text-sm text-muted">
                <MapPin className="size-4 text-accent" /> Location
              </p>
              <p className="font-medium">{personal.location}</p>
            </div>
            <div>
              <p className="mb-3 text-sm text-muted">Find me online</p>
              <SocialLinks />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            className="space-y-4 rounded-2xl border border-border bg-surface p-5 md:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="from_name" className="mb-1.5 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  autoComplete="name"
                  placeholder="Your name"
                  {...handlers('from_name')}
                  aria-invalid={!!errors.from_name}
                  aria-describedby={errors.from_name ? 'from_name-error' : undefined}
                  className={`${field} ${border('from_name')}`}
                />
                <ErrorText k="from_name" errors={errors} />
              </div>
              <div>
                <label htmlFor="reply_to" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...handlers('reply_to')}
                  aria-invalid={!!errors.reply_to}
                  aria-describedby={errors.reply_to ? 'reply_to-error' : undefined}
                  className={`${field} ${border('reply_to')}`}
                />
                <ErrorText k="reply_to" errors={errors} />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                placeholder="What’s it about?"
                {...handlers('subject')}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className={`${field} ${border('subject')}`}
              />
              <ErrorText k="subject" errors={errors} />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me a little about your idea or opportunity…"
                {...handlers('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${field} ${border('message')} resize-y`}
              />
              <ErrorText k="message" errors={errors} />
            </div>
            {/* Honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label>
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-accent-contrast transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
            >
              {status === 'sending' ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" /> Sending…
                </>
              ) : status === 'sent' ? (
                <>
                  <Check className="size-4" /> Sent! Send another?
                </>
              ) : (
                <>
                  <Send className="size-4" /> Send message
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
