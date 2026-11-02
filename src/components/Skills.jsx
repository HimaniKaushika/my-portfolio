import { technicalSkills, softSkills } from '../data/portfolio.js'
import { Icon } from './Icons.jsx'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section__title" data-reveal>Skills</h2>
        <p className="section__intro" data-reveal style={{ '--reveal-delay': '80ms' }}>
          The tools I use to build, and the habits that help me work well with other people.
        </p>

        <div className="skills">
          <div className="skills__col">
            <h3 className="skills__heading" data-reveal>Technical skills</h3>
            <div className="tech">
              {technicalSkills.map((g, i) => (
                <div
                  key={g.group}
                  className="tech__group"
                  data-reveal
                  style={{ '--reveal-delay': `${i * 70}ms` }}
                >
                  <h4>{g.group}</h4>
                  <ul className="chips">
                    {g.items.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="skills__col">
            <h3 className="skills__heading" data-reveal>Soft skills</h3>
            <ul className="soft">
              {softSkills.map((s, i) => (
                <li
                  key={s.name}
                  className="soft__item"
                  data-reveal
                  style={{ '--reveal-delay': `${i * 70}ms` }}
                >
                  <span className="soft__icon">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <div>
                    <h4>{s.name}</h4>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
