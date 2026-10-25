import type { TechName } from './tech'

export const research = {
  title:
    'An Integrated Multi-Head BiLSTM Architecture for Paddy Health Monitoring, Stage Classification and Pest Outbreak Detection',
  venue: 'ADScAI 2026 Conference',
  organizer: 'University of Moratuwa',
  logo: '/logos/uom.png',
  badge: 'Accepted — Poster Presentation Round',
  summary:
    'A unified Multi-Head BiLSTM deep learning framework that integrates Sentinel-2 optical band data, CHIRPS rainfall and ERA5 temperature data to simultaneously monitor paddy health, classify growth stages, detect pest anomalies and predict yield — enabling scalable, early-warning precision agriculture in Sri Lanka.',
  url: 'https://openreview.net/forum?id=s5l3tuS8In',
  tech: ['BiLSTM', 'TensorFlow', 'Python', 'Sentinel-2', 'Remote Sensing'] as TechName[],
  project: '/projects/ricevision',
}
