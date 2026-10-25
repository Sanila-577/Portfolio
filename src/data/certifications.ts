export interface Certification {
  name: string
  issuer: string
  logo?: string
  /** Credential URL — the "View certification" button appears when set. */
  url?: string
}

export const certifications: Certification[] = [
  // TODO: paste credential URL
  {
    name: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI · Stanford (Coursera)',
    logo: '/logos/deeplearningai.png',
    url: '',
  },
  // TODO: paste credential URL
  {
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI (Coursera)',
    logo: '/logos/deeplearningai.png',
    url: '',
  },
  // TODO: paste credential URL
  {
    name: 'Oracle Cloud Infrastructure 2024 Certified AI Foundations Associate',
    issuer: 'Oracle',
    logo: '/logos/oracle.png',
    url: '',
  },
  // TODO: paste credential URL
  { name: 'Databricks Fundamentals', issuer: 'Databricks', logo: '/logos/databricks.png', url: '' },
  // TODO: paste credential URL
  {
    name: 'WSO2 Certified Identity Server Practitioner (V7)',
    issuer: 'WSO2',
    logo: '/logos/wso2.png',
    url: '',
  },
  // TODO: paste credential URL
  {
    name: 'WSO2 Certified API Manager Practitioner (V4)',
    issuer: 'WSO2',
    logo: '/logos/wso2.png',
    url: '',
  },
  // TODO: paste credential URL
  { name: 'Introduction to Generative AI', issuer: 'AWS Educate', logo: '/logos/aws.png', url: '' },
  // TODO: paste credential URL
  {
    name: 'Docker Foundations Professional Certificate',
    issuer: 'Docker (LinkedIn Learning)',
    logo: '/logos/docker.png',
    url: '',
  },
  // TODO: paste credential URL
  {
    name: 'Introduction to Microsoft Azure',
    issuer: 'Microsoft',
    logo: '/logos/microsoft.png',
    url: '',
  },
  // TODO: paste credential URL
  {
    name: 'Professional Certificate in Python Programming',
    issuer: 'IIT Sri Lanka',
    logo: '/logos/iit.png',
    url: '',
  },
]
