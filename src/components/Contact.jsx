import { useState } from 'react'
import { profile } from '../data/portfolio.js'
import { Icon, GitHubIcon, LinkedInIcon } from './Icons.jsx'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', message: '' })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  // No server needed: opens the visitor's email app with the message filled in
  const sendMessage = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Hello from ${form.name || 'your portfolio'}`)
    const body = encodeURIComponent(`${form.message}\n\n${form.name}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const tel = profile.phone.replace(/[^+\d]/g, '')

  return (
    <section id="contact" className="section contact">
      <div className="container contact__grid">
        <div data-reveal>
          <h2 className="section__title contact__title">Let's build something together</h2>
          <p className="contact__lead">
            I'm looking for internships and project collaborations in mobile, IoT and AI. If you
            have an opportunity or just want to talk tech, my inbox is open.
          </p>

          <div className="contact__email">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button type="button" className="icon-btn" onClick={copyEmail} aria-label="Copy email address">
              <Icon name={copied ? 'check' : 'copy'} size={18} />
            </button>
            <span className="contact__copied" role="status">
              {copied ? 'Email copied' : ''}
            </span>
          </div>

          <ul className="contact__list">
            <li>
              <a href={`tel:${tel}`}>
                <Icon name="phone" size={19} /> {profile.phone}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon size={19} /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon size={19} /> GitHub
              </a>
            </li>
            <li>
              <span>
                <Icon name="pin" size={19} /> {profile.location}
              </span>
            </li>
          </ul>
        </div>

        <form
          className="contact__form"
          onSubmit={sendMessage}
          data-reveal
          style={{ '--reveal-delay': '120ms' }}
        >
          <h3>Send a quick message</h3>
          <label>
            Your name
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="5"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <button type="submit" className="btn btn--primary">
            <Icon name="send" size={18} /> Send message
          </button>
          <p className="contact__note">This opens your email app with the message ready to send.</p>
        </form>
      </div>
    </section>
  )
}
