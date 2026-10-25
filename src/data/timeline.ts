import { socials } from './profile'
import type { TechName } from './tech'

const KAGGLE = socials.find((s) => s.key === 'kaggle')?.url

export interface RoleLink {
  label: string
  href: string
  /** Opens in a new tab; otherwise an in-site route or hash. */
  external?: boolean
}

/** "YYYY-MM"; `end` omitted means Present. */
export interface Role {
  title: string
  /** Event or programme the role belongs to, e.g. "MicroMaze 2.0". */
  event?: string
  /** Logo for the event, shown beside grouped roles. */
  logo?: string
  start: string
  end?: string
  location?: string
  description: string
  /** Also listed in the Volunteering section. */
  volunteer?: boolean
  link?: RoleLink
}

export interface SubProject {
  name: string
  client?: string
  logo?: string
  bullets: string[]
  tech: TechName[]
}

export interface TimelineEntry {
  id: string
  org: string
  logo?: string
  roles: Role[]
  subProjects?: SubProject[]
  /** Combined tech row shown at the bottom of the card. */
  tech?: TechName[]
  link?: RoleLink
}

/**
 * The single source for every role description. Journey renders this list
 * top to bottom in array order; Volunteering renders the roles marked `volunteer`.
 */
export const timeline: TimelineEntry[] = [
  {
    id: 'tl-octave',
    org: 'OCTAVE — John Keells Group',
    logo: '/logos/octave.svg',
    roles: [
      {
        title: 'Intern AI Engineer',
        start: '2026-05',
        location: 'Sri Lanka',
        description:
          'Working across agentic AI, computer vision and data engineering projects for John Keells Group businesses on Azure Databricks.',
      },
    ],
    subProjects: [
      {
        name: 'AI Concierge',
        client: 'Cinnamon Hotels',
        logo: '/logos/cinnamon.png',
        bullets: [
          'GenAI-powered chatbot built on a multi-agent system for Cinnamon Hotels across Sri Lanka and the Maldives.',
          'Jailbreak testing and edge-case testing on WhatsApp (360sms).',
          'Fixed bugs in WhatsApp answer formatting and markdown rendering.',
        ],
        tech: ['LangGraph', 'Agentic AI', 'Python', 'Microsoft Azure'],
      },
      {
        name: 'MAS SPI (Stitches Per Inch) Evaluation',
        client: 'MAS Intimates',
        logo: '/logos/mas.png',
        bullets: [
          'Computer-vision system that detects stitches in real time from raw textile images taken from MAS Intimates.',
          'Built a kernel-density-based clustering model to detect multiple stitch lines.',
          'Built and improved YOLO models for different stitch patterns.',
        ],
        tech: ['YOLO', 'Computer Vision', 'Python', 'scikit-learn'],
      },
      {
        name: 'Energy Consumption Use Case',
        client: 'Cinnamon Grand',
        logo: '/logos/cinnamon.png',
        bullets: [
          'Exploratory Data Analysis (EDA) on Cinnamon Grand energy-consumption data to find patterns for optimizing chiller temperature setpoints.',
          'Goal: improve energy efficiency and reduce overall power consumption.',
        ],
        tech: ['Python', 'pandas', 'Matplotlib', 'EDA', 'Azure Databricks'],
      },
      {
        name: 'Git Tracking Dashboard',
        bullets: [
          'ETL pipeline tracking Git commit history, number of Databricks notebooks and source files, total lines of code across scripts/notebooks, and total pull requests.',
        ],
        tech: ['PySpark', 'Azure Databricks', 'Azure DevOps'],
      },
      {
        name: 'Onboarding Environment',
        bullets: [
          'Onboarding environment that helps OCTAVE technical staff build foundational knowledge of PySpark and Databricks, with guidance on setting up and configuring VS Code for development.',
        ],
        tech: ['PySpark', 'Azure Databricks', 'VS Code'],
      },
    ],
    tech: [
      'LangGraph',
      'Agentic AI',
      'Python',
      'Microsoft Azure',
      'YOLO',
      'Computer Vision',
      'scikit-learn',
      'pandas',
      'Matplotlib',
      'EDA',
      'PySpark',
      'Azure Databricks',
      'Azure DevOps',
      'VS Code',
    ],
  },
  {
    id: 'tl-open-source',
    org: 'Open Source Contributor',
    roles: [
      {
        title: 'Contributor',
        event: 'GirlScript Summer of Code 2026',
        logo: '/logos/gssoc.png',
        start: '2026-05',
        description:
          "Contributor in GSSoC 2026, GirlScript Foundation's nationwide open-source programme. Contributing merged pull requests, issue fixes and code reviews to selected open-source projects under mentor guidance.",
      },
      {
        title: 'Contributor',
        event: 'Nexus Spring of Code 2026',
        logo: '/logos/nexus.png',
        start: '2026-04',
        description:
          'Contributor in Nexus Spring of Code, a mentored open-source programme by the Nirmaan Organization that pairs contributors with real-world projects. Resolving issues and submitting pull requests tracked on GitHub.',
      },
    ],
  },
  {
    id: 'tl-ricevision',
    org: 'RiceVision',
    logo: '/logos/ricevision.png',
    roles: [
      {
        title: 'Co-Founder',
        start: '2025-12',
        location: 'Colombo, Sri Lanka',
        description:
          'Satellite-based paddy crop monitoring, yield prediction and forecasting platform built to transform data-driven agriculture in Sri Lanka. Combines remote sensing and machine learning to deliver crop-health monitoring, early stress detection, and reliable yield forecasts at district and national level.',
      },
    ],
    tech: ['Remote Sensing', 'Sentinel-2', 'LSTM', 'TensorFlow', 'React'],
    link: { label: 'View project', href: '/projects/ricevision' },
  },
  {
    id: 'tl-ieee-cis',
    org: 'IEEE Computational Intelligence Society of IIT',
    logo: '/logos/ieee.png',
    roles: [
      {
        title: 'Program Committee Member',
        event: 'Model X',
        start: '2025-11',
        location: 'Colombo, Sri Lanka',
        description:
          'Model X is an island-wide AI/ML hackathon organized by the IEEE Computational Intelligence Society of IIT. As a Program Committee Member, I supported problem-statement design and programme logistics.',
        volunteer: true,
      },
    ],
  },
  {
    id: 'tl-ieee-cs',
    org: 'IEEE Computer Society of IIT',
    logo: '/logos/ieee.png',
    roles: [
      {
        title: 'Secretarial Vice Chairperson',
        event: "HackSphere'25",
        start: '2025-09',
        location: 'Colombo, Sri Lanka',
        description:
          "HackSphere is the pathway event to IEEEXtreme 19.0, the IEEE's global 24-hour programming competition, organized by the IEEE Computer Society of IIT. Served as Secretarial Vice Chairperson.",
        volunteer: true,
      },
      {
        title: 'Secretarial Team Member',
        event: 'CodeRally 6.0',
        start: '2025-06',
        location: 'Colombo, Sri Lanka',
        description:
          "Secretarial team member for the sixth edition of CodeRally, the IEEE Computer Society of IIT's 24-hour competitive-programming hackathon: documentation, correspondence and participant communications.",
        volunteer: true,
      },
    ],
  },
  {
    id: 'tl-ieee-ras',
    org: 'IEEE Robotics and Automation Society of IIT',
    logo: '/logos/ieee.png',
    roles: [
      {
        title: 'Secretarial Team Member',
        event: 'MicroMaze 2.0',
        start: '2025-06',
        location: 'Colombo, Sri Lanka',
        description:
          'MicroMaze is a maze-solving robotics competition organized by the IEEE Robotics and Automation Society of IIT. Volunteered as a secretarial team member.',
        volunteer: true,
      },
      {
        title: 'Secretarial Team Member',
        event: 'Tracktion',
        start: '2025-04',
        location: 'Colombo, Sri Lanka',
        description:
          'Tracktion is a line-following-robot building workshop series by the IEEE Robotics and Automation Society of IIT. Volunteered as a secretarial team member.',
        volunteer: true,
      },
    ],
  },
  {
    id: 'tl-kaggle',
    org: 'Kaggle',
    logo: '/logos/kaggle.svg',
    roles: [
      {
        title: 'Kaggle Contributor',
        start: '2025-02',
        description:
          'Publishing notebooks and datasets: exploratory data analysis and machine-learning experiments in Python.',
        volunteer: true,
        link: KAGGLE ? { label: 'View Kaggle profile', href: KAGGLE, external: true } : undefined,
      },
    ],
    tech: ['Kaggle', 'Python', 'pandas', 'Jupyter'],
  },
  {
    id: 'tl-medium',
    org: 'Medium',
    logo: '/logos/medium.png',
    roles: [
      {
        title: 'Medium Writer',
        // LinkedIn has no start date; this is the first article's month.
        start: '2026-06',
        description:
          'Technical articles on agent observability (MCP, OpenTelemetry, WSO2) and production MLOps (Kafka, Airflow, MLflow).',
        volunteer: true,
        link: { label: 'Read my articles', href: '/#blog' },
      },
    ],
  },
  {
    id: 'tl-toastmasters',
    org: 'Smedley Toastmasters Club · Area 4 · Division E · District 82',
    logo: '/logos/toastmasters.png',
    roles: [
      {
        title: 'Speechcraft Coordinator',
        start: '2025-02',
        end: '2025-05',
        location: 'Colombo, Sri Lanka',
        description:
          'Conducted the Smedley Speechcraft Program at CA Sri Lanka and worked as Speechcraft Coordinator.',
        volunteer: true,
      },
      {
        title: 'Toastmaster',
        start: '2024-01',
        location: 'Sri Lanka',
        description:
          'Active Toastmaster in the Smedley Toastmasters Club with an additional focus on presenting.',
        volunteer: true,
      },
    ],
  },
  {
    id: 'tl-rcas',
    org: 'Royal College Astronomical Society',
    logo: '/logos/royal-college.png',
    roles: [
      {
        title: 'Project Chairman',
        start: '2022-01',
        end: '2022-12',
        description:
          'Coordinated Project Artemis, an asteroid search campaign run with the International Asteroid Search Collaboration (IASC), and Project Celestron, a sunspot observation campaign. Led the team in planning and executing both.',
      },
      {
        title: 'Chief Organizer',
        start: '2022-01',
        end: '2022-12',
        description:
          'Contributed to club activities and guided the club to an A grade at the annual Clubs and Societies Felicitation Ceremony.',
      },
      {
        title: 'Quiz Team Member',
        start: '2018-01',
        end: '2022-12',
        description:
          'Led the team to many victories — champions of interschool astronomy quizzes including the Sir Arthur C. Clarke Challenge Trophy, Interstellar’22, the Hilda Kulerathne Challenge Trophy and the Universal Night Competition.',
      },
    ],
  },
  {
    id: 'tl-nasa',
    org: 'NASA — International Asteroid Search Collaboration',
    logo: '/logos/nasa.png',
    roles: [
      {
        title: 'Citizen Scientist',
        start: '2020-06',
        end: '2022-06',
        location: 'United States (remote)',
        description:
          'Worked as a citizen scientist in the International Asteroid Search Campaign and the Royal College Asteroid Search Campaign run by IASC. Hands-on experience making astronomical discoveries — our team found several preliminary objects using Astrometrica.',
      },
    ],
  },
]

export interface VolunteerRole {
  id: string
  org: string
  logo?: string
  role: Role
}

/** Volunteering roles in timeline order, drawn from the timeline so descriptions live in one place. */
export const volunteerRoles: VolunteerRole[] = timeline.flatMap((e) =>
  e.roles
    .filter((r) => r.volunteer)
    .map((role) => ({
      id: `${e.id}-${(role.event ?? role.title).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      org: e.org,
      logo: e.logo,
      role,
    })),
)
