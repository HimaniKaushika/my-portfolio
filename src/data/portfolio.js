// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: 'Himani Kaushika',
  firstName: 'Himani',
  role: 'Computer Science Graduate',
  tagline:
    'Turning Ideas into Practical Solutions Through Technology.',
  location: 'Sri Lanka',
  email: 'h.kaushi49@gmail.com',
  // TODO: replace with your real number
  phone: '+94 71 234 5678',
  github: 'https://github.com/himanikaushika',
  linkedin: 'https://linkedin.com/in/himanikaushika',
  // Optional: put your CV in /public and set this to '/Himani-Kaushika-CV.pdf'
  cv: '',
  currentlyBuilding: 'GuardianSense',
  openTo: 'Opportunities to Grow, Learn and Contribute in the Technology Industry',
}

export const about = {
  intro:
    "Hi, I’m Himani. I’m a Computer Science Graduate with a BSc (Hons) in Computer Science from the University of Bedfordshire, UK, delivered through SLIIT City UNI. I’m passionate about technology, software development, and exploring innovative ways to turn ideas into meaningful, real-world solutions.",
  paragraphs: [
    'Through my academic projects, I have gained practical experience in software development, quality assurance, project coordination, and collaborative problem-solving. I enjoy learning new technologies, taking on challenges, and turning ideas into practical solutions.',
    "Alongside my interest in IT and emerging technologies, I am particularly interested in digital banking, information systems, and how technology can improve business operations and customer experiences. I am eager to continue expanding my knowledge, strengthening my technical skills, and contributing to meaningful projects in a professional environment.",
  ],
  values: [
    {
      title: 'Safety by design',
      text: 'I think about what could go wrong first, from data privacy to dead batteries.',
    },
    {
      title: 'Hardware meets software',
      text: 'Sensors, microcontrollers and apps designed as one system, not three.',
    },
    {
      title: 'Clean, readable code',
      text: 'Code the next person can understand, test and build on.',
    },
    {
      title: 'Built for real people',
      text: 'A feature only earns its place if it solves a real problem — so I start with the person, not the technology.',
    },
  ],
  facts: [
    { label: 'Studied', value: 'BSc (Hons) Computer Science' },
    { label: 'University', value: 'University of Bedfordshire, UK\nDelivered through SLIIT City UNI' },
    { label: 'Technical Interests', value: 'Software Development, Flutter, IoT, AI/ML, Quality Assurance' },
    { label: 'Experience', value: '3+ years coding, 10+ projects' },
    { label: 'Based in', value: 'Sri Lanka' },
  ],
}

// A real sequence (most recent first), so it's shown as a timeline.
export const education = [
  {
    degree: 'BSc (Hons) Computer Science',
    school: 'University of Bedfordshire, UK — Delivered through SLIIT City UNI',
    period: '2026',
    current: true,
    points: [
      'Completed an honours degree in Computer Science',
      'Conducted an undergraduate research project, GuardianSense, an AI-enabled IoT child safety monitoring system integrating wearable sensors, real-time monitoring, and risk assessment',
      'Coursework included Research Methodologies, Distributed Service Architectures, Undergraduate Project, Agile Project Management, Data Structures, Algorithms, and Database Systems',
      'Gained practical experience in software development, IoT systems, AI/ML, and software quality assurance through academic projects',
    ],
  },
  {
    degree: 'Higher Diploma in Information Technology',
    school: 'SLIIT City Uni',
    period: '2024 – 2025',
    current: true,
    points: [
      'Built a strong technical foundation in programming, software development, database management, and web technologies',
      'Applied problem-solving and analytical thinking to practical IT assignments and software development tasks',
      'Developed an understanding of software engineering principles, system design, and the software development life cycle (SDLC)',
      'Strengthened technical documentation, teamwork, and collaborative project development skills',
    ],
  },
  {
    degree: 'Foundation Certificate in Information Technology',
    school: 'SLIIT City Uni',
    period: '2023',
    current: true,
    points: [
      'Built foundational knowledge of information technology and computing',
      'Developed an initial understanding of programming and computer applications',
    ],
  },
  {
    degree: 'G.C.E. Ordinary Level (O/L)',
    school: 'WP/KE Vishaka Balika Vidyalaya',
    period: '2021 (2022)',
    current: true,
    points: [
      'Completed the General Certificate of Education Ordinary Level examination',
    ],
  },
]

export const technicalSkills = [
  { group: 'Mobile', items: ['Flutter', 'Dart', 'Android', 'Responsive UI'] },
  { group: 'Web', items: ['HTML & CSS','PHP', 'JavaScript','React', 'REST APIs'] },
  { group: 'Back end & Database', items: ['SQL', 'MySQL', 'Firebase', 'Node.js', 'MongoDB'] },
  { group: 'IoT & hardware', items: ['ESP32', 'Arduino', 'Raspberry Pi', 'MQTT', 'GPS modules'] },
  { group: 'AI & data', items: ['Python', 'Machine learning', 'TensorFlow'] },
  { group: 'Tools', items: ['Git & GitHub', 'Figma', 'VS Code', 'Android Studio'] },
]

export const softSkills = [
  {
    name: 'Problem solving',
    text: 'Breaking a vague problem into small, testable steps and working through them calmly.',
    icon: 'puzzle',
  },
  {
    name: 'Teamwork',
    text: 'Comfortable in group projects: sharing work fairly, reviewing code and keeping everyone in sync.',
    icon: 'team',
  },
  {
    name: 'Communication',
    text: 'Explaining technical ideas clearly to lecturers, teammates and non-technical users.',
    icon: 'chat',
  },
  {
    name: 'Time management',
    text: 'Balancing coursework, project deadlines and self-learning without dropping quality.',
    icon: 'clock',
  },
  {
    name: 'Adaptability',
    text: 'Picking up new frameworks, boards and tools quickly when a project needs them.',
    icon: 'shuffle',
  },
  {
    name: 'Attention to detail',
    text: 'Testing edge cases and polishing the small things users actually notice.',
    icon: 'focus',
  },
]

// Add a `link` (GitHub repo or live demo) to show a button on the card.
export const projects = [
  {
    title: 'GuardianSense',
    featured: true,
    kind: 'Mobile + IoT + AI',
    summary:
      'A child safety monitoring system that pairs a wearable wristband with a parent app, live GPS tracking and smart geofence alerts.',
    highlights: [
      'ESP32 wristband streams location to the cloud in real time',
      'Parents get instant alerts when a child leaves a safe zone',
      'Machine learning suggests safe zones from movement patterns',
    ],
    tags: ['Flutter', 'ESP32', 'Firebase', 'Node.js', 'Python', 'ML'],
    link: '',
  },
  {
    title: 'AgroConnect',
    kind: 'Web platform',
    summary:
      'Connects farmers directly with buyers, with live market prices, simple inventory management and data-driven pricing insights.',
    tags: ['React', 'Node.js', 'Firebase', 'REST API'],
    link: '',
  },
  {
    title: 'Smart Home Hub',
    kind: 'IoT dashboard',
    summary:
      'A home automation dashboard with live sensor readings, energy usage analytics and voice-controlled devices from a mobile app.',
    tags: ['Flutter', 'ESP32', 'MQTT', 'IoT'],
    link: '',
  },
]

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
