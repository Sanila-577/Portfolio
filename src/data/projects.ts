import type { TechName } from './tech'

export type Domain = 'Agentic AI' | 'Computer Vision' | 'MLOps & Data' | 'Full-stack'

export interface Project {
  slug: string
  title: string
  tagline: string
  dates?: string
  featured: boolean
  domains: Domain[]
  tech: TechName[]
  links: { github?: string; live?: string; article?: string; research?: string }
  overview: string
  features: string[]
  evolution?: { name: string; href: string; note: string }[]
  /** Number of images in public/images/projects/<slug>/ named 1.png, 2.png… */
  screenshotCount?: number
}

export function screenshotsOf(p: Project) {
  return Array.from({ length: p.screenshotCount ?? 0 }, (_, i) => ({
    src: `/images/projects/${p.slug}/${i + 1}.png`,
    alt: `${p.title} screenshot ${i + 1}`,
  }))
}

/** Display order on the site follows array order. */
export const projects: Project[] = [
  {
    slug: 'ricevision',
    title: 'RiceVision',
    tagline: 'Satellite-based paddy crop monitoring system',
    dates: 'Oct 2025 – Present',
    featured: true,
    domains: ['MLOps & Data', 'Full-stack'],
    tech: [
      'Python',
      'scikit-learn',
      'pandas',
      'NumPy',
      'Matplotlib',
      'TensorFlow',
      'LSTM',
      'RNN',
      'Supabase',
      'PostgreSQL',
      'React',
      'Tailwind CSS',
    ],
    links: {
      github: 'https://github.com/Sanila-577/RiceVision-Demo',
      live: 'https://www.ricevisionlanka.com/',
      research: '/#research',
    },
    overview:
      'Rice is the heart of Sri Lankan agriculture, yet it faces constant threats from climate instability, pests and yield uncertainty. RiceVision is a satellite-based paddy monitoring and yield prediction platform built to transform data-driven agriculture in Sri Lanka — moving from manual field inspections to automated, satellite-based assessment.',
    features: [
      'LSTM model for paddy growth-stage and health prediction using Sentinel-2 band datasets (B1–B12) across multiple districts in Sri Lanka.',
      'Multi-source data fusion: Sentinel-2 MSI imagery, CHIRPS rainfall/humidity and ERA5 temperature.',
      'Health monitoring from spectral indices (NDVI, NDWI, NDRE) to assess plant vigour.',
      'Yield prediction and forecasting at district and national level to support policy planning.',
      'Anomaly and pest-outbreak detection for abiotic (flood, drought) and biotic (BPH, rice blast, paddy bug) stress.',
    ],
  },
  {
    slug: 'neuro-leaf',
    title: 'Neuro Leaf',
    tagline: 'Tomato leaf disease consultant',
    dates: 'Dec 2025 – Present',
    featured: true,
    domains: ['Computer Vision', 'Agentic AI'],
    tech: [
      'Python',
      'TensorFlow',
      'CNN',
      'YOLO',
      'Computer Vision',
      'RAG',
      'FAISS',
      'LangGraph',
      'Hugging Face',
      'FastAPI',
      'Streamlit',
      'Docker',
    ],
    links: {
      github: 'https://github.com/Sanila-577/yolo-tomato-disease-detector',
      live: 'https://neuroleaf.streamlit.app/',
    },
    overview:
      'Farmers need fast, trustworthy answers when a crop shows signs of disease. Neuro Leaf combines a real-time vision model with a conversational, research-backed consultant to diagnose tomato leaf diseases and guide treatment.',
    features: [
      'Real-time tomato leaf disease detection across 7 disease classes using YOLO11 Large.',
      'LangGraph-based multi-agent consultation system with intelligent routing and web fallback.',
      'Research-driven question answering using Retrieval-Augmented Generation (RAG) with FAISS as the vector database.',
      'Deployed as a Streamlit app, with a FastAPI service and Docker packaging.',
    ],
  },
  {
    slug: 'obsergent',
    title: 'Obsergent',
    tagline: 'Open-source observability tool for AI agents and MCPs',
    dates: 'Oct 2026 – Present',
    featured: true,
    domains: ['Agentic AI'],
    tech: [
      'Python',
      'OpenTelemetry',
      'MCP',
      'WSO2',
      'LangGraph',
      'SQLite',
      'React',
      'TypeScript',
      'Vite',
      'LLM Observability',
    ],
    links: {
      github: 'https://github.com/Sanila-577/Obsergent',
      article:
        'https://medium.com/@sanilamethwan/a-local-recorder-for-mcp-agents-with-opentelemetry-langgraph-and-the-wso2-api-platform-mcp-gateway-d12c47615cf0',
    },
    overview:
      'When an agent misbehaves, it is hard to see why: which tool it called, with what input, how long it took and what it cost. Obsergent is a local-first recorder and debugger for MCP agents that captures every LangGraph step, model call and MCP tool call in one trace, and flags problems automatically.',
    features: [
      'OpenTelemetry-based tracing of agent execution end to end — tool calls, inputs/outputs, execution flow, latency, and token usage and cost.',
      'MCP proxy (stdio and HTTP) that records closed apps such as Claude Desktop and Cursor with no code changes; an SDK instruments your own agents.',
      'WSO2 API Platform MCP Gateway integration showing gateway decisions, refused calls and time spent in the gateway.',
      'Agent behaviour analysis that detects tool-call loops, prompt-injection patterns and tool-description drift.',
      'Everything stored locally in a single SQLite file; works with Ollama, OpenAI, Anthropic, Groq, OpenRouter and any OpenAI-compatible server.',
    ],
    screenshotCount: 1,
  },
  {
    slug: 'customer-churn',
    title: 'Customer Churn — Production Pipeline',
    tagline: 'Real-time telco churn prediction with Kafka, Airflow, PySpark and MLflow',
    featured: true,
    domains: ['MLOps & Data'],
    tech: [
      'Python',
      'PySpark',
      'Kafka',
      'Airflow',
      'MLflow',
      'scikit-learn',
      'Random Forest',
      'pandas',
      'NumPy',
      'Docker',
    ],
    links: {
      github: 'https://github.com/Sanila-577/Customer-Churn-Production',
      article:
        'https://medium.com/@sanilamethwan/how-i-turned-a-customer-churn-model-into-a-production-grade-real-time-churn-prediction-system-d414ac3c6e30',
    },
    overview:
      'A churn model in a notebook helps nobody. This project turns one into an automated, event-driven system that trains, tracks and scores customers continuously — combining orchestration, streaming and distributed ML in a single pipeline.',
    features: [
      'PySpark Random Forest training pipeline with an 80/20 train/test split.',
      'Apache Kafka in KRaft mode with topics telco.raw.customers → telco.churn.predictions, plus a dead-letter topic.',
      'Batch and continuous (streaming) inference consumers.',
      'Airflow DAGs for hourly batch scoring and per-minute streaming scoring.',
      'MLflow experiment tracking and model-artifact versioning.',
      'Every stage runnable through Make targets (with a PowerShell equivalent for Windows).',
    ],
    evolution: [
      {
        name: 'pyspark-churn-analytics',
        href: 'https://github.com/Sanila-577/pyspark-churn-analytics',
        note: 'PySpark pipeline with MLflow tracking',
      },
      {
        name: 'Airflow-churn-orchestration',
        href: 'https://github.com/Sanila-577/Airflow-churn-orchestration',
        note: 'Airflow orchestration of training and scoring',
      },
      {
        name: 'churn-prediction-with-kafka-streaming',
        href: 'https://github.com/Sanila-577/churn-prediction-with-kafka-streaming',
        note: 'Kafka streaming inference',
      },
      {
        name: 'Customer-Churn-Production',
        href: 'https://github.com/Sanila-577/Customer-Churn-Production',
        note: 'Unified production pipeline',
      },
    ],
  },
  {
    slug: 'supplygenie',
    title: 'SupplyGenie',
    tagline: 'AI-powered supply chain supplier discovery',
    featured: true,
    domains: ['Agentic AI', 'Full-stack'],
    tech: [
      'Python',
      'FastAPI',
      'LangChain',
      'LangGraph',
      'OpenAI',
      'MongoDB',
      'Tavily',
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'Firebase',
      'Docker',
      'Vercel',
    ],
    links: {
      github: 'https://github.com/Sanila-577/SupplyGenie',
      live: 'https://supplygenie-metamorphs-idealize-fro-six.vercel.app/',
    },
    overview:
      'Finding the right supplier means digging through scattered listings and comparing price, lead time, certifications and MOQ by hand. SupplyGenie lets businesses describe what they need in plain language and get ranked, contactable suppliers back.',
    features: [
      'LangGraph supplier-discovery agent that combines MongoDB queries with real-time Tavily web research.',
      'Ranks suppliers by location, price range, certifications, lead time, MOQ and response time.',
      'Next.js 15 chat interface with Firebase authentication and speech-to-text voice input.',
      'FastAPI backend with a REST API and interactive Swagger/ReDoc docs.',
      'Dockerised backend optimised for Cloud Run; frontend deployed on Vercel.',
    ],
  },
  {
    slug: 'estatefinder',
    title: 'EstateFinder',
    tagline: 'React property search SPA with favourites',
    featured: false,
    domains: ['Full-stack'],
    tech: ['React', 'Vite', 'React Router', 'JavaScript', 'HTML', 'CSS', 'Vitest', 'Vercel'],
    links: {
      github: 'https://github.com/Sanila-577/EstateFinder',
      live: 'https://estate-finder-theta.vercel.app/',
    },
    overview:
      'A client-side single-page application built with React 19 and Vite for searching, exploring and favouriting residential properties.',
    features: [
      'Search by property type, price range and bedrooms.',
      'Detail pages with gallery, description, floor plan and map tabs.',
      'Favourites with add/remove, duplicate prevention, clear-all and drag-and-drop.',
      'Responsive layouts; client-side security via CSP; tested with Vitest and React Testing Library.',
    ],
  },
  {
    slug: 'smart-campus-backend',
    title: 'Smart Campus Backend',
    tagline: 'JAX-RS REST API for campus rooms and sensors',
    featured: false,
    domains: ['Full-stack'],
    tech: ['Java', 'JAX-RS'],
    links: { github: 'https://github.com/Sanila-577/Smart-Campus-Backend' },
    overview:
      'A Smart Campus sensor and room management API built for the Client-Server Architectures module, managing rooms, sensors (CO2, occupancy) and their readings.',
    features: [
      'Resource-based REST design with nested resources for rooms, sensors and readings.',
      'HATEOAS discovery endpoint with API versioning and links to collections.',
      'Business-rule checks, e.g. 409 Conflict when deleting a room that still has sensors.',
      'Query filtering such as /sensors?type=CO2 and resilient error handling.',
    ],
  },
  {
    slug: 'ocean-hope',
    title: 'Ocean Hope',
    tagline: 'UN SDG 14 "Life Below Water" awareness website',
    featured: false,
    domains: ['Full-stack'],
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    links: {
      github: 'https://github.com/Sanila-577/Ocean-Hope',
      live: 'https://sanila-577.github.io/Ocean-Hope/',
    },
    overview:
      'An interactive multi-page website raising awareness of marine conservation and encouraging action toward UN Sustainable Development Goal 14.',
    features: [
      'Splash screen, informative content pages, data tables and a sitemap.',
      'Volunteer sign-up and feedback forms with validation.',
      'Fully responsive layout, deployed on GitHub Pages.',
    ],
  },
]
