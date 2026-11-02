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

export default function Projects() {
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="section section--tint">
      <div className="container">
        <h2 className="section__title" data-reveal>My projects</h2>
        <p className="section__intro" data-reveal style={{ '--reveal-delay': '80ms' }}>
          A few things I've designed and built, from wearable hardware to web platforms.
        </p>

        <article className="project project--featured" data-reveal data-tilt>
          <div className="project__media">
            <GeofenceMap />
          </div>
          <div className="project__body">
            <p className="project__kind">{featured.kind}</p>
            <h3 className="project__title">{featured.title}</h3>
            <p>{featured.summary}</p>
            <ul className="project__highlights">
              {featured.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <ul className="chips chips--small">
              {featured.tags.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
            <ProjectLink link={featured.link} />
          </div>
        </article>

        <div className="project-grid">
          {rest.map((p, i) => (
            <article
              key={p.title}
              className="project"
              data-reveal
              data-tilt
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <div className="project__body">
                <p className="project__kind">{p.kind}</p>
                <h3 className="project__title">{p.title}</h3>
                <p>{p.summary}</p>
                <ul className="chips chips--small">
                  {p.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                <ProjectLink link={p.link} />
              </div>
            </article>
          ))}
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
