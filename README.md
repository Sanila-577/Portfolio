# Sanila Wijesekara — Portfolio

Personal portfolio built with **React 19 + Vite + TypeScript + Tailwind CSS v4**. Frontend only — no backend. Deployed on Vercel.

## Features

- Dark mode by default, with a light-mode toggle (the choice is remembered, no flash on load)
- ⌘K / Ctrl+K command palette — jump to any section or project, switch theme, copy email, download CV
- **My Journey** (one-sided) and **Volunteering** (alternating right/left) timelines, with durations computed from the dates; both read from one data file
- Per-project tech icons inside the OCTAVE internship card, plus a combined tech row
- Project cards with **View more** detail pages at `/projects/:slug`; clicking a skill filters the projects that use it
- Achievements with photo galleries, certifications with credential links, research, Medium articles, CV download
- Nav highlight that follows the section you're reading
- EmailJS contact form with validation and a spam honeypot
- Playwright test suite across 13 phones, tablets and desktops, run in CI

## Getting started

```bash
npm install
cp .env.example .env   # add EmailJS keys (optional for local dev)
npm run dev
```

| Script                | What it does                                                 |
| --------------------- | ------------------------------------------------------------ |
| `npm run dev`         | Dev server                                                   |
| `npm run build`       | Type-check, verify tech icons, production build to `dist/`   |
| `npm run preview`     | Serve the production build                                   |
| `npm run check:tech`  | Fail if any technology in the data has no icon               |
| `npm run lint`        | oxlint                                                       |
| `npm run format`      | Prettier                                                     |
| `npm run test:e2e`    | Playwright tests on every device (run `npm run build` first) |
| `npm run test:e2e:ui` | Same, in Playwright's interactive UI                         |

## Editing content

All content lives in `src/data/` — you never need to touch the components to update the site.

| File                | Contents                                                                                                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `profile.ts`        | Name, hero role/keywords/description, bio, socials, soft skills, education (with activities and sports)                                                                                                                                 |
| `timeline.ts`       | **Every role and its description.** My Journey shows the entries top to bottom in array order; roles with `volunteer: true` also appear in Volunteering. Dates are `"YYYY-MM"`; omit `end` for Present |
| `projects.ts`       | Project cards + detail pages (array order = display order)                                                                                                                                             |
| `skills.ts`         | Skill groups                                                                                                                                                                                           |
| `awards.ts`         | Achievements (+ `photoCount`)                                                                                                                                                                          |
| `certifications.ts` | Certifications — paste each credential link into `url` to show its "View certification" button                                                                                                         |
| `research.ts`       | Publication                                                                                                                                                                                            |
| `blog.ts`           | Medium articles                                                                                                                                                                                        |
| `tech.ts`           | Icon registry — add an entry here whenever you use a new technology                                                                                                                                    |

To add a role later, add it to `timeline.ts` — both timelines and the tests pick it up automatically.

## Where to put images

Everything lives under `public/`. The folders already exist (each has a `.gitkeep`) — drop your files in with the names below. Compress photos first (e.g. [squoosh.app](https://squoosh.app)); aim for under 300 KB each.

| Website section                                                       | Folder                           | File names                             | Size / format                    | Then edit                            |
| --------------------------------------------------------------------- | -------------------------------- | -------------------------------------- | -------------------------------- | ------------------------------------ |
| About (headshot)                                                      | `public/images/profile/`         | `profile.jpg`                          | Square, ≥ 600×600, JPG           | nothing                              |
| My Journey, Volunteering, Education, Certifications, Research (logos) | `public/logos/`                  | `<name>.png` or `.svg`                 | Square, ≥ 256 px, transparent    | the `logo` field, if it's a new name |
| Projects (detail-page gallery)                                        | `public/images/projects/<slug>/` | `1.png`, `2.png`, …                    | 16:9, ≥ 1280 px wide, PNG / WebP | `screenshotCount` in `projects.ts`   |
| Achievements (card cover + gallery)                                   | `public/images/awards/<slug>/`   | `1.jpg`, `2.jpg`, … (`1` is the cover) | 16:10, ≥ 1200 px wide, JPG       | `photoCount` in `awards.ts`          |
| Resume                                                                | `public/cv/`                     | `Sanila_Wijesekara_CV.pdf`             | PDF                              | nothing                              |
| Link previews (WhatsApp, LinkedIn)                                    | `public/`                        | `og-image.png`                         | 1200×630                         | nothing                              |

**Achievement folders** and how many photos each expects (the LinkedIn media count — already set as `photoCount`):

| Folder (`public/images/awards/…`) | Photos |     | Folder            | Photos |
| --------------------------------- | ------ | --- | ----------------- | ------ |
| `cutting-edge-2026/`              | 4      |     | `slaao-2022/`     | 1      |
| `iit-excellence-2025/`            | 2      |     | `iasc-2021/`      | 1      |
| `intellihack-5/`                  | 1      |     | `iaac-2021/`      | 1      |
| `data-storm-6/`                   | 1      |     | `iasc-2020/`      | 1      |
| `ieeextreme-18/`                  | 5      |     | `slaao-2019/`     | 1      |
| `cypher-hackathon-2025/`          | 2      |     | `sljao-2018/`     | 1      |
| `haxmas-24-code-golf/`            | 4      |     | `astronomy-quiz/` | 1      |
| `haxpedition-2024/`               | 3      |     |                   |        |

**Project folders** (`public/images/projects/…`): `ricevision/`, `neuro-leaf/`, `obsergent/` (already has `1.png`, the architecture diagram), `customer-churn/`, `supplygenie/`, `estatefinder/`, `smart-campus-backend/`, `ocean-hope/`. After adding screenshots, set `screenshotCount` on that project.

Until a photo exists, cards show an icon placeholder and logos fall back to an initials badge.

## Contact form (EmailJS)

1. Create a free account at [emailjs.com](https://www.emailjs.com), add an email service and a template (start from **Contact Us**).
2. In the template use the variables `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}` (set _Reply To_ to `{{reply_to}}`).
3. Put the service ID, template ID and public key in `.env` locally and in the Vercel project's environment variables:
   `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.

Without the keys the form validates but tells visitors to email directly.

## Testing and CI

`tests/` holds two Playwright suites, run against the production build:

- **`responsive.spec.ts`** — on every device in `playwright.config.ts` (iPhone SE/15/15 Pro Max, Pixel 7, Galaxy S9+, Galaxy Fold cover, a 280 px phone, iPad Mini, iPad Pro, desktop Chrome and Safari): no sideways scrolling or elements past the screen edge on any page, a 280 → 1440 px width sweep, the mobile menu, 40 px touch targets, readable text, timeline layout, and no console errors.
- **`content.spec.ts`** — on desktop: section order and headings, the nav highlight, contact-form validation, project pages and timeline structure. Counts aren't hard-coded, so adding roles or awards won't break it.

`.github/workflows/ci.yml` runs lint, build and the full test suite on every push and pull request to `main`, and uploads the HTML report as an artifact. In GitHub, make the **CI** check required under branch protection so nothing broken reaches Vercel.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo. The Vite preset is detected (build `npm run build`, output `dist`).
3. Add the three `VITE_EMAILJS_*` environment variables, then deploy.

`vercel.json` rewrites all paths to `index.html`, so project URLs like `/projects/obsergent` work on refresh.
