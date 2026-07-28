import { useState } from "react";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useActiveSection } from "../hooks/useActiveSection";
import { navLinks, personal } from "../data/portfolioData";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const ids = navLinks.map((l) => l.id);
  const active = useActiveSection(ids);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300
      bg-white/90 dark:bg-slate-950/90 backdrop-blur-md
      border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="text-xl font-bold tracking-tight
            text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          {personal.name.split(" ")[0]}
          <span className="text-indigo-600 dark:text-indigo-400">.</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
                  ${active === id
                    ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href={personal.resumeUrl}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg
              bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition"
          >
            <Download size={14} />
            Resume
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg transition
              text-slate-600 dark:text-slate-400
              hover:bg-slate-100 dark:hover:bg-slate-800
              hover:text-slate-900 dark:hover:text-white"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg transition
              text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`block w-full text-left px-6 py-3.5 text-sm font-medium transition
                ${active === id
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
            >
              {label}
            </button>
          ))}
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800">
            <a
              href={personal.resumeUrl}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
                bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition"
            >
              <Download size={14} /> Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
