import { Github, ExternalLink } from "lucide-react";
import { projects } from "../data/portfolioData";
import SectionHeading from "../components/SectionHeading";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 px-6
        bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Things I've built and shipped"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <article
              key={idx}
              className="group bg-slate-50 dark:bg-slate-800/60 rounded-2xl overflow-hidden
                border border-slate-100 dark:border-slate-700
                hover:border-indigo-300 dark:hover:border-indigo-600
                hover:shadow-2xl hover:shadow-indigo-100/60 dark:hover:shadow-indigo-950/60
                transition-all duration-300"
            >
              {/* Accent bar */}
              <div
                className="h-1.5 w-full"
                style={{ background: project.accent }}
              />

              {/* Card body */}
              <div className="p-7">
                {/* Title row */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white
                    group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={project.github}
                      aria-label="GitHub"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900
                        dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={project.live}
                      aria-label="Live site"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900
                        dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-md
                        bg-white dark:bg-slate-700
                        text-slate-600 dark:text-slate-300
                        border border-slate-200 dark:border-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
