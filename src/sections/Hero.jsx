import { Github, Linkedin, Mail, ArrowDown, Camera } from "lucide-react";
import { personal } from "../data/portfolioData";

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 px-6
        bg-gradient-to-br from-slate-50 via-white to-indigo-50/60
        dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40
        transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-10 items-center py-20">

        {/* Photo */}
        <div className="flex justify-center order-1 md:order-1">
          <div className="relative inline-flex flex-col items-center">
            {/* Animated dotted ring decoration */}
            <div aria-hidden="true" className="hero-dotted-ring absolute -inset-3 rounded-full border-[3px] border-dashed border-indigo-300 dark:border-indigo-500" />

            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden p-2
              border-2 border-white dark:border-slate-800 shadow-lg bg-white dark:bg-slate-950
              flex items-center justify-center">
              {personal.photo ? (
                <img
                  src={personal.photo}
                  alt={personal.name}
                  className="w-full h-full rounded-full object-cover object-[center_20%]" //Center and move the image lil bit upward
                />
              ) : (
                <>
                  <Camera size={36} className="text-indigo-400 dark:text-indigo-500" />
                  <div className="text-center px-3">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Your Photo Here</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                      Set photo in portfolioData.js
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-800 shadow-md rounded-lg px-3 py-2 border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">Available for hire</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Open to offers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="order-2 md:order-2 space-y-6">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase
              text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40
              px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {personal.role}
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight
              text-slate-900 dark:text-white tracking-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600
                dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400
                bg-clip-text text-transparent">
                {personal.name}
              </span>
            </h1>
          </div>

          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            {personal.tagline}
          </p>

          <p className="text-base text-slate-500 dark:text-slate-500 leading-relaxed">
            {personal.bio}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => scrollTo("projects")}
              className="px-7 py-3 rounded-xl font-semibold text-sm
                bg-indigo-600 hover:bg-indigo-700 text-white
                shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40
                transition transform hover:scale-105 active:scale-95"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-7 py-3 rounded-xl font-semibold text-sm
                border-2 border-indigo-600 dark:border-indigo-500
                text-indigo-600 dark:text-indigo-400
                hover:bg-indigo-50 dark:hover:bg-indigo-900/30
                transition transform hover:scale-105 active:scale-95"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex items-center gap-4 pt-2">
            {[
              { href: personal.github, Icon: Github, label: "GitHub" },
              { href: personal.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:" + personal.email, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700
                  text-slate-500 dark:text-slate-400
                  hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400
                  hover:bg-indigo-50 dark:hover:bg-indigo-900/30
                  transition"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2
          flex flex-col items-center text-slate-400 hover:text-indigo-500 transition animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} />
      </button>
    </section>
  );
}
