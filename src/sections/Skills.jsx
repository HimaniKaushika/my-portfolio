import { skillGroups } from "../data/portfolioData";
import SectionHeading from "../components/SectionHeading";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 px-6
        bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Skills & Expertise"
          title="What I bring to your project"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6
                border border-slate-100 dark:border-slate-800
                hover:border-indigo-300 dark:hover:border-indigo-700
                hover:shadow-xl hover:shadow-indigo-50 dark:hover:shadow-indigo-950
                transition-all duration-300"
            >
              <div className="text-3xl mb-3">{group.icon}</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4
                group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-3 py-1.5 rounded-full
                      bg-indigo-50 dark:bg-indigo-900/30
                      text-indigo-700 dark:text-indigo-400
                      border border-indigo-100 dark:border-indigo-800
                      hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
