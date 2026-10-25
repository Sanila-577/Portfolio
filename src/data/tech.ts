import type { ComponentType } from 'react'
import {
  SiApacheairflow,
  SiApachekafka,
  SiApachespark,
  SiApachetomcat,
  SiCrewai,
  SiCss,
  SiDatabricks,
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiGithubpages,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiJupyter,
  SiKaggle,
  SiLangchain,
  SiLanggraph,
  SiMedium,
  SiMeta,
  SiMlflow,
  SiModelcontextprotocol,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNumpy,
  SiOpenjdk,
  SiOpentelemetry,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiRadixui,
  SiReact,
  SiReactrouter,
  SiRoboflow,
  SiScikitlearn,
  SiShadcnui,
  SiSqlite,
  SiStreamlit,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiUltralytics,
  SiVercel,
  SiVite,
  SiVitest,
} from 'react-icons/si'
import { VscAzure, VscAzureDevops, VscVscode } from 'react-icons/vsc'
import { RiOpenaiFill } from 'react-icons/ri'
import {
  Activity,
  ArrowLeftRight,
  BrainCircuit,
  ChartScatter,
  Database,
  FileSearch,
  Layers,
  Mic,
  Network,
  Repeat,
  Satellite,
  SatelliteDish,
  ScanEye,
  Trees,
} from 'lucide-react'
import { monogram } from '../components/icons/monogram'

export type TechIconComponent = ComponentType<{ className?: string; size?: number | string }>

export interface TechInfo {
  icon: TechIconComponent
  /** Brand color; used on hover (dark) and at rest (light). Omit for neutral concept icons. */
  color?: string
  url?: string
}

/**
 * Every technology named anywhere on the site must have an entry here.
 * `npm run check:tech` fails the build when one is missing.
 */
export const TECH = {
  // Languages
  Python: { icon: SiPython, color: '#3776AB', url: 'https://www.python.org' },
  Java: { icon: SiOpenjdk, color: '#ED8B00', url: 'https://openjdk.org' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  HTML: { icon: SiHtml5, color: '#E34F26' },
  CSS: { icon: SiCss, color: '#663399' },
  SQL: { icon: Database, color: '#38bdf8' },

  // Web & API
  React: { icon: SiReact, color: '#61DAFB', url: 'https://react.dev' },
  'Next.js': { icon: SiNextdotjs },
  Vite: { icon: SiVite, color: '#646CFF' },
  'React Router': { icon: SiReactrouter, color: '#CA4245' },
  Vitest: { icon: SiVitest, color: '#6E9F18' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'shadcn/ui': { icon: SiShadcnui },
  'Radix UI': { icon: SiRadixui },
  FastAPI: { icon: SiFastapi, color: '#009688', url: 'https://fastapi.tiangolo.com' },
  Streamlit: { icon: SiStreamlit, color: '#FF4B4B' },
  'JAX-RS': { icon: SiApachetomcat, color: '#F8DC75' },
  'Web Speech API': { icon: Mic, color: '#f472b6' },

  // AI / ML
  TensorFlow: { icon: SiTensorflow, color: '#FF6F00', url: 'https://www.tensorflow.org' },
  'scikit-learn': { icon: SiScikitlearn, color: '#F7931E' },
  pandas: { icon: SiPandas, color: '#150458' },
  NumPy: { icon: SiNumpy, color: '#4DABCF' },
  Matplotlib: { icon: monogram('Mpl'), color: '#11557C' },
  Seaborn: { icon: monogram('Sns'), color: '#4C72B0' },
  YOLO: { icon: SiUltralytics, color: '#0B23A9', url: 'https://docs.ultralytics.com' },
  'Hugging Face': { icon: SiHuggingface, color: '#FFD21E' },
  Roboflow: { icon: SiRoboflow, color: '#6706CE' },
  FAISS: { icon: SiMeta, color: '#0467DF', url: 'https://github.com/facebookresearch/faiss' },
  OpenAI: { icon: RiOpenaiFill },
  LSTM: { icon: BrainCircuit, color: '#a78bfa' },
  RNN: { icon: Repeat, color: '#a78bfa' },
  BiLSTM: { icon: ArrowLeftRight, color: '#a78bfa' },
  CNN: { icon: Layers, color: '#a78bfa' },
  RAG: { icon: FileSearch, color: '#34d399' },
  'Computer Vision': { icon: ScanEye, color: '#f59e0b' },
  'Random Forest': { icon: Trees, color: '#22c55e' },
  EDA: { icon: ChartScatter, color: '#38bdf8' },

  // Agentic AI
  LangGraph: {
    icon: SiLanggraph,
    color: '#1C3C3C',
    url: 'https://langchain-ai.github.io/langgraph/',
  },
  LangChain: { icon: SiLangchain, color: '#1C3C3C' },
  CrewAI: { icon: SiCrewai, color: '#FF5A50' },
  MCP: { icon: SiModelcontextprotocol, url: 'https://modelcontextprotocol.io' },
  OpenTelemetry: { icon: SiOpentelemetry, color: '#F5A800' },
  'Agentic AI': { icon: Network, color: '#22d3ee' },
  'LLM Observability': { icon: Activity, color: '#22d3ee' },
  WSO2: { icon: monogram('W2'), color: '#FF7300', url: 'https://wso2.com' },
  Tavily: { icon: monogram('Tv'), color: '#8B5CF6', url: 'https://tavily.com' },

  // Data & MLOps
  PySpark: { icon: SiApachespark, color: '#E25A1C' },
  'Azure Databricks': { icon: SiDatabricks, color: '#FF3621' },
  Databricks: { icon: SiDatabricks, color: '#FF3621' },
  Kafka: { icon: SiApachekafka },
  Airflow: { icon: SiApacheairflow, color: '#017CEE' },
  MLflow: { icon: SiMlflow, color: '#0194E2' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  Jupyter: { icon: SiJupyter, color: '#F37626' },
  Kaggle: { icon: SiKaggle, color: '#20BEFF' },

  // Databases
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  MySQL: { icon: SiMysql, color: '#4479A1' },
  Supabase: { icon: SiSupabase, color: '#3FCF8E' },
  SQLite: { icon: SiSqlite, color: '#003B57' },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  Firebase: { icon: SiFirebase, color: '#DD2C00' },

  // Cloud & DevOps
  'Microsoft Azure': { icon: VscAzure, color: '#0078D4' },
  'Azure DevOps': { icon: VscAzureDevops, color: '#0078D7' },
  Vercel: { icon: SiVercel },
  'GitHub Pages': { icon: SiGithubpages },
  Git: { icon: SiGit, color: '#F05032' },
  'VS Code': { icon: VscVscode, color: '#007ACC' },
  Postman: { icon: SiPostman, color: '#FF6C37' },
  Medium: { icon: SiMedium },

  // Earth observation
  'Sentinel-2': { icon: Satellite, color: '#0ea5e9' },
  'Remote Sensing': { icon: SatelliteDish, color: '#0ea5e9' },
} satisfies Record<string, TechInfo>

export type TechName = keyof typeof TECH
