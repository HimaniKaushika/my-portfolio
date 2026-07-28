import profilePhoto from "../assets/myPhoto.jpg";

//  PERSONAL INFO  - update these to customize

export const personal = {
  name: "Himani Kaushika",
  role: "Computer Science Undergraduate | Aspiring Software Engineer",
  tagline: "I design and develop, user-focused applications with clean design and efficient performance.",
  bio: "With hands-on experience in software development, I combine thoughtful design with effective engineering to create meaningful digital solutions. I enjoy transforming ideas into functional, maintainable applications — from academic projects to innovative systems involving web development, mobile applications, IoT, and Machine Learning.",
  bio2: "When I'm not coding, I'm exploring new technologies, improving my development skills, and working on personal and academic projects. I enjoy learning through experimentation, solving challenges, and continuously building better software solutions.",
  email: "h.kaushi49@gmail.com",
  linkedin: "https://www.linkedin.com/in/himani-kaushika-b62165370/",
  github: "https://github.com/HimaniKaushika",
  resumeUrl: "#",

  photo: profilePhoto,
};

//  EDUCATION
export const education = [
  {
    degree: "B.Sc. (Hons) in Computer Science",
    school: "SLIIT City Uni affiliated with the University of Bedfordshire",
    year: "2026 - 2027",
    gpa: "-",
    highlights: [
      "Research: On creating An IoT-based Intelligent multi-feature system for child safety monitoring. This proposed system will integrate a smart wearable band with a mobile application to provide real-time monitoring, environmental sensing, child’s relatime location tracking and AI-based predictive risk analysis",
      "Key courses: Research Methodologies, Distributed Service Architectures, Agile Project Management and Undergraduate Project",
    ],
  },
  {
    degree: "Higher National Diploma in Computer Science and Software Engineering",
    school: "SLIIT City Uni",
    year: "2024-2025",
    gpa: null,

    highlights: [
      "Developed multiple full-stack applications using modern technologies",
      "Designed and developed software projects (web/mobile systems) and high-level prototypes",
      "Gained hands-on experience in full-stack development and databases",
      "Applied object-oriented programming principles in multiple projects",
      "Collaborated in Agile-based team software development projects",
    ],

    academicPerformance: {
      title: "Academic Performance",
      overallGPA: 3.28,
      semesters: [
        { name: "Year 1", gpa: 3.31 },
        { name: "Year 2", gpa: 3.25 },
      ],
    },
  },

  {
    degree: "Foundation Certificate in Information Technology",
    school: "SLIIT City Uni",
    year: "2023",
    gpa: null,
    highlights: [
      "Gained a strong foundation in computer science and software engineering principles",
      "Knowledgeable in programming languages, data structures, algorithms",
      "Knowledgeable in project management and software development methodologies",
    ],
    academicPerformance: {
      title: "Academic Performance",
      overallGPA: 3.58,
      semesters: [
        { name: "Semester 1", gpa: 3.56 },
        { name: "Semester 2", gpa: 3.60 },
      ],
    },
  },
];

//  SKILLS

export const skillGroups = [
  {
    category: "Frontend",
    icon: "🖥️",
    items: ["HTML", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: "⚙️",
    items: ["PHP", "Node.js", "Python", "Express", "FastAPI", "GraphQL"],
  },
  {
    category: "Data & Cloud",
    icon: "☁️",
    items: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker"],
  },
  {
    category: "Workflow",
    icon: "🛠️",
    items: ["Git", "CI/CD", "Figma", "Agile / Scrum", "Jest"],
  },
];


//  PROJECTS
export const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack store with real-time inventory, Stripe checkout, and an admin dashboard — handling 10k+ SKUs across 3 warehouses.",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    accent: "#6366F1",
    github: "#",
    live: "#",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative workspace with live cursors, drag-and-drop Kanban, and threaded comments synced via WebSockets.",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
    accent: "#0EA5E9",
    github: "#",
    live: "#",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Configurable BI dashboard rendering 50+ chart types over live data streams with sub-100 ms refresh rates.",
    tags: ["React", "D3.js", "Express", "PostgreSQL"],
    accent: "#10B981",
    github: "#",
    live: "#",
  },
  {
    title: "Social Metrics Tracker",
    description:
      "Aggregates data from 5 social platforms, surfaces trending content, and exports weekly PDF reports automatically.",
    tags: ["Python", "FastAPI", "React", "Celery"],
    accent: "#F59E0B",
    github: "#",
    live: "#",
  },
];

//  NAV LINKS
export const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];
