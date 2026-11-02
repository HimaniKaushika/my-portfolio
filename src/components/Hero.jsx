import { useEffect, useRef } from 'react'
import { profile } from '../data/portfolio.js'
import portrait from '../assets/profile.jpg'
import { Icon, GitHubIcon, LinkedInIcon } from './Icons.jsx'

export default function Hero() {
  const visualRef = useRef(null)

  useEffect(() => {
    const el = visualRef.current
    if (!el) return

    const finePointer = window.matchMedia?.('(pointer: fine)').matches
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reducedMotion) return

    let frame = 0
    const setTilt = (x, y) => {
      el.style.setProperty('--tilt-x', `${(-y * 6).toFixed(2)}deg`)
      el.style.setProperty('--tilt-y', `${(x * 6).toFixed(2)}deg`)
    }
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setTilt(x, y))
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setTilt(0, 0))
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="hero__hello">Hello, I'm</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__role">{profile.role}</p>
          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__cta">
            <a href="#projects" className="btn btn--primary">
              See my projects
            </a>
            <a href="#contact" className="btn btn--ghost">
              Contact me
            </a>
            {profile.cv && (
              <a href={profile.cv} className="btn btn--ghost" download>
                <Icon name="download" size={18} /> Download CV
              </a>
            )}
          </div>

          <ul className="hero__social" aria-label="Profiles">
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon size={20} />
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon size={20} />
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Icon name="mail" size={20} />
              </a>
            </li>
          </ul>
        </div>

        {/* The signature element: portrait inside "safe zone" rings, a nod to GuardianSense */}
        <div className="hero__visual" ref={visualRef}>
          <div className="zone" aria-hidden="true">
            <span className="zone__ring zone__ring--1" />
            <span className="zone__ring zone__ring--2" />
            <span className="zone__ring zone__ring--3" />
            <span className="zone__pulse" />
          </div>
          <div className="portrait-frame">
            <figure className="portrait">
              <img src={portrait} alt={`Portrait of ${profile.name}`} width="413" height="531" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
