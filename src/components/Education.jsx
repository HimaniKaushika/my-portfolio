import { education } from '../data/portfolio.js'

export default function Education() {
  return (
    <section id="education" className="section section--tint">
      <div className="container">
        <h2 className="section__title" data-reveal>Education</h2>
        <ol className="timeline">
          {education.map((e, i) => (
            <li
              key={e.degree}
              className={`timeline__item ${e.current ? 'is-current' : ''}`}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <span className="timeline__dot" aria-hidden="true" />
              <div className="timeline__card" data-tilt>
                <div className="timeline__head">
                  <div>
                    <h3>{e.degree}</h3>
                    <p className="timeline__school">{e.school}</p>
                  </div>
                  <span className="timeline__period">{e.period}</span>
                </div>
                <ul className="timeline__points">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
