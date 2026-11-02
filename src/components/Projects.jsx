import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
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
const AUTO_SLIDE_INTERVAL = 4000

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
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const isPlaying = hovered || focused

  useEffect(() => {
    if (!active || !isPlaying || reducedMotion || count < 2) return

    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % count)
    }, GALLERY_INTERVAL)

    return () => window.clearInterval(id)
  }, [active, isPlaying, reducedMotion, count, index])

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
      )}
    </div>
  )
}

function ProjectDescription({ project, expanded, onToggle }) {
  const paragraphs = Array.isArray(project.description)
    ? project.description.filter(Boolean)
    : [project.summary].filter(Boolean)
  const highlights = Array.isArray(project.highlights)
    ? project.highlights.filter(Boolean)
    : []
  const canExpand = paragraphs.length > 1 || highlights.length > 0
  const panelId = useId()

  if (paragraphs.length === 0 && highlights.length === 0) return null

  return (
    <div className={`project-description${canExpand && !expanded ? ' is-collapsed' : ''}`}>
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
        <div className="project-description__actions">
          <button
            type="button"
            className={`project-description__toggle${expanded ? ' is-expanded' : ''}`}
            onClick={onToggle}
            onPointerDown={(event) => event.stopPropagation()}
            aria-expanded={expanded}
            aria-controls={panelId}
          >
            {expanded ? 'Show less' : 'Read more'}
            <Icon name="chevronDown" size={16} />
          </button>
        </div>
      )}

      {expanded && highlights.length > 0 && (
        <ul className="project__highlights">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Projects() {
  const count = projects.length
  const [index, setIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const reducedMotion = usePrefersReducedMotion()
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const dragRef = useRef({ pointerId: null, startX: 0, startY: 0, dx: 0, active: false, horizontal: null })
  const suppressClickRef = useRef(false)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const card = track.children[index]?.querySelector('.projects-slider__card')
    if (!card) return

    const update = () => {
      viewport.style.height = `${card.offsetHeight}px`
    }

    update()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(update)
    observer.observe(card)
    return () => observer.disconnect()
  }, [index])

  const goTo = useCallback(
    (next) => {
      setExpandedIndex(null)
      setIndex(((next % count) + count) % count)
    },
    [count]
  )

  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const next = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    if (
      hovered ||
      focusWithin ||
      dragging ||
      reducedMotion ||
      count < 2 ||
      expandedIndex !== null
    ) {
      return
    }

    const id = window.setInterval(() => {
      if (!document.hidden) {
        setIndex((current) => (current + 1) % count)
      }
    }, AUTO_SLIDE_INTERVAL)

    return () => window.clearInterval(id)
  }, [hovered, focusWithin, dragging, reducedMotion, count, expandedIndex, index])

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

  const trackTransform = `translateX(calc(var(--center-offset) - ${index} * (var(--slide-w) + var(--slide-gap))${
    dragging ? ` + ${dragX}px` : ''
  }))`
  const trackStyle = dragging
    ? { transform: trackTransform, transition: 'none' }
    : { transform: trackTransform }

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
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocusWithin(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false)
          }}
          data-reveal
          style={{ '--reveal-delay': '160ms' }}
        >
          <div ref={viewportRef} className="projects-slider__viewport">
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
                  <div className="projects-slider__card">
                    <div className="projects-slider__media">
                      <ProjectGallery project={project} active={i === index} />
                    </div>
                    <div className="projects-slider__body">
                      <p className="project__kind">{project.kind}</p>
                      <h3 className="projects-slider__title">{project.title}</h3>
                      <ProjectDescription
                        project={project}
                        expanded={expandedIndex === i}
                        onToggle={() =>
                          setExpandedIndex((current) => (current === i ? null : i))
                        }
                      />
                      <ul className="chips chips--small">
                        {project.tags.map((tag) => (
                          <li key={tag} className="chip">
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <ProjectLink link={project.link} />
                    </div>
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

          <p
            className="sr-only"
            aria-live={hovered || focusWithin || expandedIndex !== null || reducedMotion ? 'polite' : 'off'}
          >
            {projects[index].title}, project {index + 1} of {count}
          </p>
        </div>
      </div>
    </section>
  )
}
