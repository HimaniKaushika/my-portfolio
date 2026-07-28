import { GraduationCap, CheckCircle, Sparkles } from "lucide-react";
import { personal, education } from "../data/portfolioData";
import SectionHeading from "../components/SectionHeading";

const stats = [
  { value: "3+", label: "Years Coding" },
  { value: "10+", label: "Projects Built" },
  { value: "10+", label: "Technologies" },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="About Me" title="The story behind the code" />

        {/* ── Top row: Bio card + Quick Facts ── */}
        <div className="grid md:grid-cols-5 gap-8 mb-14">

          {/* Bio card */}
          <div className="md:col-span-3 relative bg-white dark:bg-slate-800/50
            rounded-2xl border border-slate-200 dark:border-slate-700
            shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">

            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

            <div className="p-8">
              <div className="flex items-center gap-2 mb-5">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">About Me</h3>
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                I am currently pursuing a BSc (Hons) in Computer Science at SLIIT City University, affiliated with the University of Bedfordshire, UK. 
                My main areas of interest include mobile and web application development, cloud-based solutions, IoT systems, and Machine Learning.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                I enjoy creating innovative software solutions that address real-world challenges while focusing on usability, efficiency, and performance. 
                I am passionate about exploring emerging technologies, improving my development skills, and transforming ideas into reliable applications through clean code and thoughtful design.
              </p>

              <div className="my-7 border-t border-slate-100 dark:border-slate-700" />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map(({ value, label }) => (
                  <div key={label} className="text-center group">
                    <p className="text-3xl font-extrabold
                      bg-gradient-to-r from-indigo-600 to-violet-600
                      dark:from-indigo-400 dark:to-violet-400
                      bg-clip-text text-transparent leading-none mb-1.5
                      group-hover:scale-110 transition-transform duration-200 inline-block">
                      {value}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="md:col-span-2 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-8
            border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-5">
              <h3 className="font-bold text-slate-700 dark:text-white">Quick Facts</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Computer Science undergraduate with hands-on project experience",
                "Delivered 5+ university projects",
                "Comfortable working in both independent and team-based environments",
                "Continuously learning and applying new technologies such as the MERN stack, Flutter, Firebase, and Machine Learning",
                "Open to internships and entry-level opportunities",
              ].map((fact) => (
                <li key={fact} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Education timeline ── */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
            <GraduationCap className="text-indigo-800" size={26} />
            Education
          </h3>

          <div className="relative pl-8 border-l-2 border-indigo-100 dark:border-indigo-900 space-y-8">
            {education.map((edu, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-900" />

                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6
                  border border-slate-100 dark:border-slate-700
                  hover:border-indigo-300 dark:hover:border-indigo-700 transition">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full
                      bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-3">
                    {edu.school}
                  </p>
                  {edu.gpa && (
                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">GPA: {edu.gpa}</p>
                  )}
                  <ul className="space-y-1">
                    {edu.highlights.map((h) => (
                      <li key={h} className="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-2">
                        <span className="mt-2 w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}