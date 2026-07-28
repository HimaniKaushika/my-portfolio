import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { personal } from "../data/portfolioData";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { href: personal.github, Icon: Github, label: "GitHub" },
    { href: personal.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:" + personal.email, Icon: Mail, label: "Email" },
  ];

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const links = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800
      transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
              {personal.name.split(" ")[0]}
              <span className="text-indigo-600 dark:text-indigo-400">.</span>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {personal.role} — building things for the web.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l}>
                  <button
                    onClick={() => scrollTo(l.toLowerCase())}
                    className="text-sm text-slate-500 dark:text-slate-400
                      hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Connect
            </p>
            <div className="flex gap-3">
              {socials.map(({ href, Icon, label }) => (
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
                  <Icon size={17} />
                </a>
              ))}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              {personal.email}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row
          items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
          <p>© {year} {personal.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} className="text-rose-500 fill-rose-500" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
