import { useState } from "react";
import { Mail, Linkedin, Github, Send, CheckCircle } from "lucide-react";
import { personal } from "../data/portfolioData";
import SectionHeading from "../components/SectionHeading";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up your preferred submission method (EmailJS, Formspree, etc.)
    console.log("Form submitted:", form);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 4000);
  };

  const contacts = [
    { Icon: Mail, label: "Email", value: personal.email, href: "mailto:" + personal.email },
    { Icon: Linkedin, label: "LinkedIn", value: "Connect with me", href: personal.linkedin },
    { Icon: Github, label: "GitHub", value: "See my code", href: personal.github },
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6
        bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's work together"
          center
        />

        <div className="grid md:grid-cols-5 gap-10">
          {/* Left — contact info */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Have a project in mind, a role to fill, or just want to say hi?
              Send me a message — I typically respond within 24 hours.
            </p>

            <div className="space-y-4">
              {contacts.map(({ Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-xl
                    bg-white dark:bg-slate-900
                    border border-slate-100 dark:border-slate-800
                    hover:border-indigo-300 dark:hover:border-indigo-700
                    hover:shadow-md transition group"
                >
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/40
                    text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8
              border border-slate-100 dark:border-slate-800 shadow-sm">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
                  <CheckCircle size={48} className="text-emerald-500" />
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Message sent!</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Thanks for reaching out. I'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Jane Smith"
                        className="w-full px-4 py-2.5 rounded-xl text-sm
                          bg-slate-50 dark:bg-slate-800
                          border border-slate-200 dark:border-slate-700
                          text-slate-900 dark:text-white placeholder-slate-400
                          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                          transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@example.com"
                        className="w-full px-4 py-2.5 rounded-xl text-sm
                          bg-slate-50 dark:bg-slate-800
                          border border-slate-200 dark:border-slate-700
                          text-slate-900 dark:text-white placeholder-slate-400
                          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                          transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-2.5 rounded-xl text-sm resize-none
                        bg-slate-50 dark:bg-slate-800
                        border border-slate-200 dark:border-slate-700
                        text-slate-900 dark:text-white placeholder-slate-400
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                        transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2
                      py-3 px-6 rounded-xl font-semibold text-sm text-white
                      bg-indigo-600 hover:bg-indigo-700
                      shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40
                      transition transform hover:scale-[1.02] active:scale-95"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
