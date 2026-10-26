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
    url: 'https://www.coursera.org/account/accomplishments/specialization/LXWFTKELMAEL',
  },
  // TODO: paste credential URL
  {
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI (Coursera)',
    logo: '/logos/deeplearningai.png',
    url: 'https://www.coursera.org/account/accomplishments/specialization/S0C8OHAOW3PS',
  },
  // TODO: paste credential URL
  {
    name: 'Oracle Cloud Infrastructure 2024 Certified AI Foundations Associate',
    issuer: 'Oracle',
    logo: '/logos/oracle.png',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=0D71A7D4DA205F577C02A45AE34A2E72D5A4F46204A0D354721AC5C8047A63FB',
  },
  // TODO: paste credential URL
  { name: 'Databricks Fundamentals', issuer: 'Databricks', logo: '/logos/databricks.png', url: 'https://credentials.databricks.com/d2dcde03-abf6-41fb-82cf-4fd2590dc3ba#acc.n7RkwIeD' },
  // TODO: paste credential URL
  {
    name: 'WSO2 Certified Identity Server Practitioner (V7)',
    issuer: 'WSO2',
    logo: '/logos/wso2.png',
    url: 'https://certification.wso2.com/certificate/CID-05691323/a09VM00000KqH7hYAF',
  },
  // TODO: paste credential URL
  {
    name: 'WSO2 Certified API Manager Practitioner (V4)',
    issuer: 'WSO2',
    logo: '/logos/wso2.png',
    url: 'https://certification.wso2.com/certificate/CID-05691323/a09VM00000L6TEXYA3',
  },
  // TODO: paste credential URL
  { name: 'Introduction to Generative AI', issuer: 'AWS Educate', logo: '/logos/aws.png', url: 'https://www.credly.com/badges/8f4f0cd5-f382-4839-98d3-f3dd79d7475d/public_url' },
  // TODO: paste credential URL
  {
    name: 'Docker Foundations Professional Certificate',
    issuer: 'Docker (LinkedIn Learning)',
    logo: '/logos/docker.png',
    url: 'https://www.linkedin.com/learning/certificates/55bec3d140ffde3036660e0732b8af814c924959949c7bfe28e20b27c023c957?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BpDH1FAMRSmWJdahLc2HmEA%3D%3D&accountId=76664938&u=76664938&success=true&authUUID=a%2BG5CKfGRNmAtVbLvpvAvA%3D%3D',
  },
  // TODO: paste credential URL
  {
    name: 'Introduction to Microsoft Azure',
    issuer: 'Microsoft',
    logo: '/logos/microsoft.png',
    url: '/certificates/azure.png',
  },
  // TODO: paste credential URL
  {
    name: 'Professional Certificate in Python Programming',
    issuer: 'IIT Sri Lanka',
    logo: '/logos/iit.png',
    url: '/certificates/iit-python.png',
  },
]
