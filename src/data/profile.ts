export const personal = {
  name: 'Sanila Wijesekara',
  firstName: 'Sanila',
  initials: 'SW',
  headline: 'AI Engineer · Agentic AI · Data Engineering',
  role: 'Intern AI Engineer',
  company: 'OCTAVE — John Keells Group',
  keywords: [
    'Multi-Agent Systems',
    'Model Context Protocol (MCP)',
    'Agentic AI',
    'RAG',
    'Machine Learning',
    'Deep Learning',
    'Neural Networks',
    'Data Science',
    'Computer Vision',
    'LLM Observability',
    'Data Engineering',
    'MLOps',
    'Astrophysics',
  ],
  description:
    'I design and engineer multi-agent AI systems, integrating large language models with external tools and data through the Model Context Protocol (MCP), with a focus on reliability, observability and production readiness.',
  location: 'Colombo, Sri Lanka',
  email: 'sanilamethwan@gmail.com',
  photo: '/images/profile/profile.jpg',
  cv: '/cv/Sanila_Wijesekara_CV.pdf',
  languages: [
    { name: 'Sinhala', level: 'Native' },
    { name: 'English', level: 'Professional' },
  ],
}

export type SocialKey = 'linkedin' | 'github' | 'medium' | 'kaggle'

/** Leave a url empty to hide that link everywhere on the site. */
export const socials: { key: SocialKey; label: string; url: string }[] = [
  { key: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/sanila-wijesekara/' },
  { key: 'github', label: 'GitHub', url: 'https://github.com/Sanila-577' },
  { key: 'medium', label: 'Medium', url: 'https://medium.com/@sanilamethwan' },
  { key: 'kaggle', label: 'Kaggle', url: 'https://www.kaggle.com/sanilawijesekara' },
]

export const about = [
  "I'm a Computer Science undergraduate at the University of Westminster (IIT Sri Lanka) and an Intern AI Engineer at OCTAVE — John Keells Group, where I work on multi-agent GenAI systems, computer vision and data pipelines on Azure Databricks.",
  'I build production-grade AI: LangGraph agents, YOLO-based vision models, MLOps pipelines with Kafka, Airflow and MLflow, and observability tooling for MCP agents. I co-founded RiceVision, a satellite-based paddy monitoring platform built for Sri Lanka.',
  "Before code, there was the sky. I'm a multiple astronomy olympiad medalist, a former NASA/IASC citizen scientist, and a public presenter in astronomy. I love to explore the universe, and I bring that curiosity and rigor to my work in AI.",
]

export const softSkills = [
  'Public Speaking',
  'Communication',
  'Leadership',
  'Teamwork',
  'Project Management',
  'Adaptability',
  'Critical Thinking',
  'Problem Solving',
  'Analytical Thinking',
  'Time Management',
  'Collaboration',
  'Mentoring',
  'Presentation Skills',
  'Event Organizing',
  'Creativity',
  'Attention to Detail',
  'Continuous Learning',
  'Research',
]

export interface Education {
  school: string
  logo?: string
  degree: string
  dates: string
  details?: string[]
  /** Labelled lists, e.g. activities and sports. */
  groups?: { label: string; items: string[] }[]
  modules?: { year: string; items: string[] }[]
}

export const education: Education[] = [
  {
    school: 'University of Westminster, UK | IIT Sri Lanka',
    logo: '/logos/westminster.png',
    degree: 'BSc (Hons) Computer Science',
    dates: 'Sep 2024 – Sep 2028',
    modules: [
      {
        year: '2nd year',
        items: [
          'Machine Learning and Data Mining',
          'Advanced Client Side Development',
          'Client Server Architectures',
          'Object Oriented Programming',
          'Database Systems',
          'Software Development Group Project',
        ],
      },
      {
        year: '1st year',
        items: [
          'Software Development I',
          'Software Development II',
          'Mathematics for Computing',
          'Trends in Computer Science',
          'Computer System Fundamentals',
          'Web Design and Development',
        ],
      },
    ],
  },
  {
    school: 'University of Sri Jayewardenepura',
    logo: '/logos/usj.png',
    degree: 'Bachelor of Applied Science, Physical Sciences',
    dates: 'May 2025 – May 2029',
  },
  {
    school: 'Royal College, Colombo 7',
    logo: '/logos/royal-college.png',
    degree: 'Maths Stream',
    dates: 'Feb 2010 – Jan 2024',
    groups: [
      {
        label: 'Activities and societies',
        items: ['Astronomical Society', 'Science Association', 'Oriental Music Society'],
      },
      { label: 'Sports', items: ['Swimming', 'Squash', 'Basketball', 'Badminton'] },
    ],
  },
]
