# Personal Portfolio — React + Vite + Tailwind CSS

A clean, fully responsive portfolio with Light/Dark mode toggle, smooth scroll navigation, and easy-to-update data files.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📁 Project Structure

```
portfolio/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite config
├── tailwind.config.js          # Tailwind (darkMode: "class")
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component — assembles all sections
    ├── index.css               # Global styles + Tailwind directives
    │
    ├── context/
    │   └── ThemeContext.jsx    # Light/Dark theme provider + toggle
    │
    ├── hooks/
    │   └── useActiveSection.js # Highlights active nav link on scroll
    │
    ├── data/
    │   └── portfolioData.js    # ✏️  ALL your content lives here
    │
    ├── components/             # Reusable UI pieces
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── SectionHeading.jsx
    │   └── ScrollToTop.jsx
    │
    └── sections/               # Full-page sections
        ├── Hero.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Projects.jsx
        └── Contact.jsx
```

---

## ✏️ How to Customize

**Everything you need to change is in one file:**

```
src/data/portfolioData.js
```

Edit these exported objects:

| Export | What it controls |
|---|---|
| `personal` | Name, role, bio, email, social links, photo path |
| `education` | Degree, school, year, highlights |
| `skillGroups` | Skill categories and items |
| `projects` | Project cards (title, description, tags, links, accent color) |
| `navLinks` | Navigation items |

### Adding your photo
Set `photo` in the `personal` object to your image path:
```js
photo: "/assets/your-photo.jpg",
```
Then place your image in the `public/assets/` folder.

### Wiring up the contact form
The form currently logs to the console. To send real emails, add [EmailJS](https://www.emailjs.com/) or [Formspree](https://formspree.io/) in `src/sections/Contact.jsx` inside the `handleSubmit` function.

---

## 🎨 Theme

- **Light mode** is the default.
- Users can toggle Dark mode via the **Sun/Moon button** in the navbar. The preference is saved to `localStorage`.
- Theme is controlled by `src/context/ThemeContext.jsx` using Tailwind's `darkMode: "class"` strategy.
