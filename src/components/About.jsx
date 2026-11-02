import { about, profile } from '../data/portfolio.js'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section__title" data-reveal>About me</h2>

        <div className="about">
          <div className="about__story" data-reveal>
            <p className="about__lead">{about.intro}</p>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <aside
            className="about__card"
            aria-label="Quick facts"
            data-reveal
            style={{ '--reveal-delay': '100ms' }}
          >
            <dl className="facts">
              {about.facts.map((f) => (
                <div key={f.label} className="facts__row">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="about__open">
              <span className="status-chip__dot" aria-hidden="true" />
              <p>
                <strong>Seeking:</strong> {profile.openTo}
              </p>
            </div>
          </aside>
        </div>

        <div className="values">
          <h3 className="values__title" data-reveal>What I care about when I build</h3>
          <div className="values__grid">
            {about.values.map((v, i) => (
              <div
                key={v.title}
                className="value"
                data-reveal
                style={{ '--reveal-delay': `${i * 80}ms` }}
              >
                <h4>{v.title}</h4>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
