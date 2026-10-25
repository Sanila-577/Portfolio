export interface Article {
  title: string
  url: string
  date: string
  readTime?: string
  tags: string[]
  excerpt: string
  cover: string
  project?: string
}

export const MEDIUM_PROFILE = 'https://medium.com/@sanilamethwan'

/** Newest first. Add new Medium posts here. */
export const articles: Article[] = [
  {
    title:
      'A local recorder for MCP agents with OpenTelemetry, LangGraph and the WSO2 API Platform MCP gateway',
    url: 'https://medium.com/@sanilamethwan/a-local-recorder-for-mcp-agents-with-opentelemetry-langgraph-and-the-wso2-api-platform-mcp-gateway-d12c47615cf0',
    date: '2026-10-23',
    tags: ['Agentic AI', 'MCP', 'WSO2', 'Monitoring'],
    excerpt:
      'Introducing Obsergent — a local-first recorder that captures LangGraph agent steps, model calls, MCP tool calls and token costs in one trace, integrates with the WSO2 API Platform gateway, and can even record closed apps like Claude Desktop through a proxy.',
    cover: 'https://cdn-images-1.medium.com/max/1024/1*sNVlMTtfFKS2Az5fZBsvww.png',
    project: '/projects/obsergent',
  },
  {
    title:
      'How I Turned a Customer Churn Model into a Production-Grade Real-Time Churn Prediction System',
    url: 'https://medium.com/@sanilamethwan/how-i-turned-a-customer-churn-model-into-a-production-grade-real-time-churn-prediction-system-d414ac3c6e30',
    date: '2026-06-30',
    tags: ['Airflow', 'Kafka', 'Spark', 'MLflow'],
    excerpt:
      'From notebook to automated system: ingestion, orchestration, experiment tracking, model versioning and real-time predictions with PySpark, Kafka, Airflow, MLflow, Docker and FastAPI — plus how to handle data and concept drift over time.',
    cover: 'https://cdn-images-1.medium.com/proxy/0*R-tPI9ATWUqMEoR7.png',
    project: '/projects/customer-churn',
  },
]
