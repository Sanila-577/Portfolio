export type Tier = 'gold' | 'silver' | 'bronze' | 'finalist' | 'place' | 'honour'

export interface AwardItem {
  slug: string
  title: string
  result: string
  tier: Tier
  issuer?: string
  /** "YYYY-MM" */
  date?: string
  /** Shown instead of `date` when there is no single month. */
  period?: string
  associatedWith?: string
  description?: string
  team?: { name: string; members?: string[] }
  /** Rank chips, e.g. { label: 'University', value: '54' }. */
  stats?: { label: string; value: string }[]
  /**
   * Number of photos in public/images/awards/<slug>/ named 1.png, 2.png…
   * The first is the card cover. Missing files fall back to an icon.
   */
  photoCount: number
}

export function photosOf(a: AwardItem) {
  return Array.from({ length: a.photoCount }, (_, i) => `/images/awards/${a.slug}/${i + 1}.png`)
}

/** Newest first, from LinkedIn Honors & Awards plus the CV. */
export const awards: AwardItem[] = [
  {
    slug: 'cutting-edge-2026',
    title: 'Cutting Edge 2026',
    result: 'Gold Medalist',
    tier: 'gold',
    issuer: 'IIT',
    date: '2026-07',
    associatedWith: 'University of Westminster',
    description:
      'Awarded the Gold Medal for RiceVision, a satellite-based paddy crop monitoring system developed for Sri Lanka. It was recognized as the Best Software Development Group Project in the Computer Science category at Cutting Edge 2026. RiceVision leverages satellite optical data, remote sensing and AI to enable large-scale paddy monitoring and support data-driven agricultural decision-making.',
    photoCount: 3,
  },
  {
    slug: 'iit-excellence-2025',
    title: 'IIT Excellence Awards',
    result: 'Excellence Award',
    tier: 'gold',
    issuer: 'IIT',
    date: '2025-10',
    associatedWith: 'University of Westminster',
    description:
      'Honoured with an Excellence Award for winning the Cypher competition organized by the IET On-Campus Club of IIT.',
    photoCount: 2,
  },
  {
    slug: 'intellihack-5',
    title: 'Intellihack 5.0',
    result: 'Top 10 Finalist',
    tier: 'finalist',
    issuer: 'IEEE Computer Society of UCSC',
    date: '2025-06',
    associatedWith: 'University of Westminster',
    description:
      "Intellihack 5.0 is Sri Lanka's premier machine-learning hackathon. Our team secured a top 10 spot among 50+ competing teams.",
    team: { name: 'Outlier Rejects' },
    photoCount: 1,
  },
  {
    slug: 'data-storm-6',
    title: 'Data Storm 6.0',
    result: 'Top 10 Finalist',
    tier: 'finalist',
    issuer: 'OCTAVE',
    date: '2025-05',
    associatedWith: 'University of Westminster',
    description:
      "Data Storm 6.0 is Sri Lanka's premier advanced analytics competition, powered by OCTAVE. Our team secured a spot within the top 10 teams.",
    team: { name: 'Deep Cell' },
    photoCount: 1,
  },
  {
    slug: 'ieeextreme-18',
    title: 'IEEEXtreme 18.0',
    result: 'University Rank 54',
    tier: 'honour',
    issuer: 'IEEE',
    date: '2025-03',
    associatedWith: 'University of Westminster',
    description:
      'IEEEXtreme 18.0 is a global 24-hour programming competition that hosted over 5,800 teams and more than 19,000 participants worldwide.',
    team: { name: 'Unsorted Arrays', members: ['Samindi Umesha Liyanage', 'Umar Arsath'] },
    stats: [
      { label: 'University', value: '54' },
      { label: 'Country', value: '255' },
      { label: 'Region', value: '1,582' },
      { label: 'Global', value: '2,882' },
    ],
    photoCount: 2,
  },
  {
    slug: 'cypher-hackathon-2025',
    title: 'Cypher Hackathon',
    result: 'Winner — 1st Place',
    tier: 'gold',
    issuer: 'IET On-Campus Club of IIT',
    date: '2025-03',
    associatedWith: 'University of Westminster',
    description:
      'Secured 1st place in an intense individual programming competition filled with problem-solving challenges.',
    photoCount: 2,
  },
  {
    slug: 'haxmas-24-code-golf',
    title: "Haxmas'24 Code Golf",
    result: '5th Place',
    tier: 'place',
    issuer: 'Rotaract Club of IIT',
    date: '2024-11',
    associatedWith: 'University of Westminster',
    description: 'Code Golf is a 6-hour coding competition organized by the Rotaract Club of IIT.',
    team: {
      name: 'CODE SPROUTS',
      members: [
        'Samindi Umesha Liyanage',
        'Nilana Silva',
        'Imashan Wewalage',
        'Sabir Sahdi Mohamed Siraj',
      ],
    },
    photoCount: 1,
  },
  {
    slug: 'haxpedition-2024',
    title: 'Haxpedition',
    result: '7th Place of 44 Teams',
    tier: 'place',
    issuer: 'IEEE Student Branch of IIT',
    date: '2024-10',
    associatedWith: 'University of Westminster',
    description:
      'Haxpedition is a 6-hour coding hackathon organized by the IEEE Student Branch of IIT.',
    team: { name: 'Unsorted Arrays', members: ['Umar Arsath', 'Samindi Umesha Liyanage'] },
    photoCount: 2,
  },
  {
    slug: 'slaao-2022',
    title: 'Sri Lankan Astronomy and Astrophysics Olympiad (SLAAO) 2022',
    result: 'Silver Medalist',
    tier: 'silver',
    issuer: 'Institute of Physics Sri Lanka',
    date: '2023-03',
    associatedWith: 'Royal College Colombo',
    photoCount: 1,
  },
  {
    slug: 'iasc-2021',
    title: 'International Asteroid Search Collaboration (IASC)',
    result: 'Asteroid Search Campaign',
    tier: 'honour',
    issuer: 'IASC',
    date: '2021-08',
    associatedWith: 'NASA — National Aeronautics and Space Administration',
    photoCount: 1,
  },
  {
    slug: 'iaac-2021',
    title: 'International Astronomy and Astrophysics Competition (IAAC) 2021',
    result: 'Gold Honour',
    tier: 'gold',
    date: '2021-07',
    description:
      'Awarded a Gold Honour and placed among the top 5% of all participants around the world.',
    photoCount: 1,
  },
  {
    slug: 'iasc-2020',
    title: 'International Asteroid Search Collaboration (IASC)',
    result: 'Asteroid Search Campaign',
    tier: 'honour',
    issuer: 'IASC',
    date: '2020-10',
    associatedWith: 'NASA — National Aeronautics and Space Administration',
    photoCount: 1,
  },
  {
    slug: 'slaao-2019',
    title: 'Sri Lankan Astronomy and Astrophysics Olympiad (SLAAO) 2019',
    result: 'Bronze Medalist',
    tier: 'bronze',
    issuer: 'Institute of Physics Sri Lanka',
    date: '2019-11',
    associatedWith: 'Royal College Colombo',
    photoCount: 1,
  },
  {
    slug: 'sljao-2018',
    title: 'Sri Lankan Junior Astronomy Olympiad (SLJAO) 2018',
    result: 'Bronze Medalist',
    tier: 'bronze',
    issuer: 'Institute of Physics Sri Lanka',
    date: '2018-11',
    associatedWith: 'Royal College Colombo',
    photoCount: 1,
  },
  {
    slug: 'astronomy-quiz',
    title: 'Interschool Astronomy Quiz Championships',
    result: 'Champions',
    tier: 'gold',
    period: '2018 – 2022',
    associatedWith: 'Royal College Colombo',
    description:
      'Sir Arthur C. Clarke Challenge Trophy · Interstellar’22 · Hilda Kulerathne Challenge Trophy · Universal Night Competition.',
    photoCount: 3,
  },
]
