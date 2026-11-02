import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { projects, profile } from '../data/portfolio.js'
import { Icon, GitHubIcon } from './Icons.jsx'

function ProjectLink({ link }) {
  if (!link) return null
  return (
    <a className="project__link" href={link} target="_blank" rel="noopener noreferrer">
      View project <Icon name="arrowUpRight" size={16} />
    </a>
  )
}

// A small illustrative map for GuardianSense: a child marker inside a geofence
function GeofenceMap() {
  return (
    <svg className="geomap" viewBox="0 0 320 220" role="img" aria-label="Illustration of a geofenced safe zone with a tracked location">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity=".08" />
        </pattern>
      </defs>
      <rect width="320" height="220" fill="url(#grid)" />
      <path d="M0 150 C60 130 90 170 150 150 S250 110 320 130" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="10" strokeLinecap="round" />
      <path d="M90 0 C100 60 80 120 110 220" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="7" />
      <circle className="geomap__zone" cx="168" cy="104" r="70" />
      <circle className="geomap__zone geomap__zone--inner" cx="168" cy="104" r="40" />
      <rect x="140" y="80" width="28" height="22" rx="3" fill="currentColor" fillOpacity=".14" />
      <rect x="176" y="118" width="24" height="18" rx="3" fill="currentColor" fillOpacity=".14" />
      <circle className="geomap__ping" cx="186" cy="92" r="9" />
      <circle className="geomap__dot" cx="186" cy="92" r="6" />
    </svg>
  )
}

function initials(title) {
  return title
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

const GALLERY_INTERVAL = 2000

function normalizeImages(project) {
  if (Array.isArray(project.images) && project.images.length > 0) {
    return project.images.map((img) =>
      typeof img === 'string' ? { src: img, alt: project.title } : img
    )
  }
  if (project.image) {
    return [{ src: project.image, alt: project.imageAlt || project.title }]
  }
  return []
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!query) return
    const onChange = (event) => setReduced(event.matches)
    query.addEventListener?.('change', onChange)
    return () => query.removeEventListener?.('change', onChange)
  }, [])

  return reduced
}

function ProjectGallery({ project, active }) {
  const images = normalizeImages(project)
  const count = images.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!active || paused || hovered || focused || reducedMotion || count < 2) return

    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % count)
    }, GALLERY_INTERVAL)

    return () => window.clearInterval(id)
  }, [active, paused, hovered, focused, reducedMotion, count])

  if (count === 0) {
    if (project.title === 'GuardianSense') return <GeofenceMap />
    return (
      <div className="projects-slider__placeholder" aria-hidden="true">
        <span>{initials(project.title)}</span>
      </div>
    )
  }

  return (
    <div
      className="project-gallery"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
    >
      {images.map((image, i) => (
        <div
          key={`${image.src}-${i}`}
          className={`project-gallery__layer${i === index ? ' is-active' : ''}`}
          aria-hidden={i !== index}
          style={{ '--img': `url("${image.src}")` }}
        >
          <img
            src={image.src}
            alt={image.alt || project.title}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            className="project-gallery__pause"
            onClick={() => setPaused((value) => !value)}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            aria-pressed={paused}
          >
            <Icon name={paused ? 'play' : 'pause'} size={16} />
          </button>

          <div className="project-gallery__dots" role="group" aria-label={`${project.title} images`}>
            {images.map((image, i) => (
              <button
                key={`${image.src}-dot-${i}`}
                type="button"
                className={`project-gallery__dot${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
                onPointerDown={(event) => event.stopPropagation()}
                aria-label={`Show image ${i + 1} of ${count}: ${image.alt || project.title}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ProjectDescription({ project }) {
  const paragraphs = Array.isArray(project.description)
    ? project.description.filter(Boolean)
    : [project.summary].filter(Boolean)
  const canExpand = paragraphs.length > 1
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()

  if (paragraphs.length === 0) return null

  return (
    <div className="project-description">
      <div id={panelId} className="project-description__body">
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className={
              canExpand && !expanded
                ? i === 0
                  ? 'project-description__lead'
                  : 'project-description__extra'
                : undefined
            }
          >
            {paragraph}
          </p>
        ))}
      </div>

      {canExpand && (
        <button
          type="button"
          className={`project-description__toggle${expanded ? ' is-expanded' : ''}`}
          onClick={() => setExpanded((value) => !value)}
          onPointerDown={(event) => event.stopPropagation()}
          aria-expanded={expanded}
          aria-controls={panelId}
        >
          {expanded ? 'Show less' : 'Read more'}
          <Icon name="chevronDown" size={16} />
        </button>
      )}
    </div>
  )
}

export default function Projects() {
  const count = projects.length
  const [index, setIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  const trackRef = useRef(null)
  const dragRef = useRef({ pointerId: null, startX: 0, startY: 0, dx: 0, active: false, horizontal: null })
  const suppressClickRef = useRef(false)

  const goTo = useCallback(
    (next) => {
      setIndex(((next % count) + count) % count)
    },
    [count]
  )

  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const next = useCallback(() => goTo(index + 1), [goTo, index])

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    }
  }

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      dx: 0,
      active: true,
      horizontal: null,
    }
    suppressClickRef.current = false
    setDragging(true)
    setDragX(0)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const onPointerMove = (event) => {
    const drag = dragRef.current
    if (!drag.active || event.pointerId !== drag.pointerId) return

    const dx = event.clientX - drag.startX
    const dy = event.clientY - drag.startY

    if (drag.horizontal === null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      drag.horizontal = Math.abs(dx) > Math.abs(dy)
    }
    if (!drag.horizontal) return

    if (event.cancelable) event.preventDefault()
    drag.dx = dx
    if (Math.abs(dx) > 6) suppressClickRef.current = true
    setDragX(dx)
  }

  const endDrag = (event) => {
    const drag = dragRef.current
    if (!drag.active) return
    if (event && drag.pointerId !== null && event.pointerId !== drag.pointerId) return

    const width = trackRef.current?.clientWidth || 1
    const threshold = Math.min(80, width * 0.15)

    if (drag.horizontal && Math.abs(drag.dx) > threshold) {
      goTo(index + (drag.dx < 0 ? 1 : -1))
    }

    drag.active = false
    drag.horizontal = null
    drag.dx = 0
    setDragging(false)
    setDragX(0)

    try {
      event?.currentTarget?.releasePointerCapture?.(drag.pointerId)
    } catch {
      /* pointer already released */
    }

    window.setTimeout(() => {
      suppressClickRef.current = false
    }, 0)
  }

  const onClickCapture = (event) => {
    if (suppressClickRef.current) {
      event.preventDefault()
      event.stopPropagation()
      suppressClickRef.current = false
    }
  }

  const trackStyle = dragging
    ? { transform: `translateX(calc(${-index * 100}% + ${dragX}px))`, transition: 'none' }
    : { transform: `translateX(${-index * 100}%)` }

  return (
    <section id="projects" className="section section--tint">
      <div className="container">
        <h2 className="section__title" data-reveal>My projects</h2>
        <p className="section__intro" data-reveal style={{ '--reveal-delay': '80ms' }}>
          A few things I've designed and built, from wearable hardware to web platforms.
        </p>

        <div
          className="projects-slider"
          role="region"
          aria-roledescription="carousel"
          aria-label="My projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
          data-reveal
          style={{ '--reveal-delay': '160ms' }}
        >
          <div className="projects-slider__viewport">
            <div
              ref={trackRef}
              className={`projects-slider__track${dragging ? ' is-dragging' : ''}`}
              style={trackStyle}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onClickCapture={onClickCapture}
            >
              {projects.map((project, i) => (
                <article
                  key={project.title}
                  className={`projects-slider__slide${i === index ? ' is-active' : ''}`}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}: ${project.title}`}
                  inert={i !== index ? true : undefined}
                >
                  <div className="projects-slider__media">
                    <ProjectGallery project={project} active={i === index} />
                  </div>
                  <div className="projects-slider__body">
                    <p className="project__kind">{project.kind}</p>
                    <h3 className="projects-slider__title">{project.title}</h3>
                    <ProjectDescription project={project} />
                    <ul className="chips chips--small">
                      {project.tags.map((tag) => (
                        <li key={tag} className="chip">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <ProjectLink link={project.link} />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="projects-slider__controls">
            <button
              type="button"
              className="projects-slider__btn"
              onClick={prev}
              aria-label="Previous project"
            >
              <Icon name="chevronLeft" size={20} />
            </button>

            <div className="projects-slider__dots">
              {projects.map((project, i) => (
                <button
                  key={project.title}
                  type="button"
                  className={`projects-slider__dot${i === index ? ' is-active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to project ${i + 1}: ${project.title}`}
                  aria-current={i === index ? 'true' : undefined}
                />
              ))}
            </div>

            <button
              type="button"
              className="projects-slider__btn"
              onClick={next}
              aria-label="Next project"
            >
              <Icon name="chevronRight" size={20} />
            </button>
          </div>

          <p className="sr-only" aria-live="polite">
            {projects[index].title}, project {index + 1} of {count}
          </p>
        </div>

        <p className="projects__more" data-reveal>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon size={18} /> More of my work on GitHub
          </a>
        </p>
      </div>
    </section>
  )
}
