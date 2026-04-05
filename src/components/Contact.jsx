import { useEffect, useState } from 'react'
import { hasSupabaseConfig, supabase } from '../lib/supabaseClient'

const STORAGE_KEY = 'velvanAgroContactMessages'

function loadMessages() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [saved, setSaved] = useState(false)
  const [messages, setMessages] = useState(() => loadMessages())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (saved) {
      const timeout = window.setTimeout(() => setSaved(false), 4000)
      return () => window.clearTimeout(timeout)
    }
  }, [saved])

  async function saveMessageToSupabase(entry) {
    const { error } = await supabase
      .from('contact_messages')
      .insert([entry])
      .select()

    if (error) throw error
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !message.trim()) return

    const entry = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      submitted_at: new Date().toISOString(),
    }

    setSaving(true)

    try {
      if (hasSupabaseConfig()) {
        await saveMessageToSupabase(entry)
      }

      const next = [
        {
          id: Date.now(),
          ...entry,
        },
        ...messages,
      ]

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setMessages(next)
      setName('')
      setEmail('')
      setMessage('')
      setSaved(true)
    } catch (err) {
      setError('Could not save your message right now. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const usingSupabase = hasSupabaseConfig()

  return (
    <section className="contact">
      <h1>Contact Us</h1>
      <p className="section__lead">
        Send us a message and we will get back to you shortly.
        {usingSupabase
          ? ' Your message is stored securely in the cloud.'
          : ' Messages are stored locally in your browser.'}
      </p>

      <form className="contact__form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            placeholder="Your name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="you@example.com"
          />
        </label>
        <label>
          Message
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            placeholder="How can we help?"
          />
        </label>
        <button type="submit" className="button" disabled={saving}>
          {saving ? 'Saving…' : 'Send message'}
        </button>
        {saved && <p className="success">Message saved successfully.</p>}
        {error && <p className="error">{error}</p>}
      </form>

      {messages.length > 0 && (
        <section className="contact__history">
          <h2>Your saved messages</h2>
          <ul>
            {messages.map((entry) => (
              <li key={entry.id}>
                <div className="contact__meta">
                  <strong>{entry.name}</strong> • {entry.email}
                </div>
                <div className="contact__body">{entry.message}</div>
                <div className="contact__time">
                  {new Date(entry.submitted_at || entry.submittedAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}
