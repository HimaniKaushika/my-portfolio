# Himani Kaushika – Portfolio

Personal portfolio built with **React 19 + Vite**. Sections: Home, About, Education, Skills (technical + soft), Projects and Contact. Includes light/dark theme (remembers the visitor's choice), responsive layout, keyboard-accessible navigation and reduced-motion support.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in /dist
npm run preview   # preview the production build
```

## Edit the content

Everything you see on the page lives in **`src/data/portfolio.js`**: name, bio, education, skills, projects and contact details. You don't need to touch the components to update text.

- **Project links:** add a GitHub or demo URL to a project's `link` field and a "View project" button appears on its card.
- **CV download:** put your PDF in `/public` and set `profile.cv` (e.g. `'/Himani-Kaushika-CV.pdf'`) to show a "Download CV" button.
- **Photo:** replace `src/assets/profile.jpg` (portrait orientation works best).

## Structure

```
src/
  data/portfolio.js     all content
  components/           Navbar, Hero, About, Education, Skills, Projects, Contact, Footer, Icons
  index.css             design tokens (colours, type) + all styles
  App.jsx               page layout, theme + active-section tracking
```

## Deploy

The `dist/` folder after `npm run build` can be hosted anywhere static: Vercel, Netlify or GitHub Pages.
