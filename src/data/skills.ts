import type { TechName } from './tech'

export const skillGroups: { title: string; items: TechName[] }[] = [
  {
    title: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL'],
  },
  { title: 'Web & API', items: ['React', 'FastAPI', 'Next.js', 'Streamlit'] },
  {
    title: 'AI & Machine Learning',
    items: [
      'pandas',
      'NumPy',
      'scikit-learn',
      'TensorFlow',
      'YOLO',
      'Hugging Face',
      'RAG',
      'FAISS',
      'Computer Vision',
    ],
  },
  { title: 'Agentic AI', items: ['LangGraph', 'CrewAI', 'MCP', 'OpenTelemetry', 'Agentic AI'] },
  {
    title: 'Data & MLOps',
    items: ['PySpark', 'Azure Databricks', 'Kafka', 'Airflow', 'MLflow', 'Docker'],
  },
  { title: 'Visualization & Annotation', items: ['Matplotlib', 'Seaborn', 'Roboflow'] },
  { title: 'Databases', items: ['PostgreSQL', 'MySQL', 'Supabase'] },
  { title: 'Cloud & DevOps', items: ['Microsoft Azure', 'Azure DevOps', 'Vercel', 'GitHub Pages'] },
  { title: 'API Testing', items: ['Postman'] },
]
