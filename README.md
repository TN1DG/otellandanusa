# TN1DCreator — Portfolio

Personal portfolio site for **Oluwatobi Tella Ndanusa** — builder, innovator, and QA engineer. A glitch/graphic-design-inspired take on the personal portfolio, built on Next.js 16.

**Live:** [otellandanusa.vercel.app](https://otellandanusa.vercel.app)

## Features

- **Glitch/duotone design system** — angular clipped-corner shapes, cyan/magenta accents, scanline overlays, and a chromatic-aberration hover effect, all layered on a near-black ground. See [Design System](#design-system) below.
- **Responsive per-page backgrounds** — a dedicated desktop/mobile photo pair per route, swapped via CSS breakpoints and dimmed with a scrim so foreground text stays legible ([`PageBackground`](src/components/PageBackground.tsx)).
- **QA & AI positioning** — dedicated home-page sections covering QA engineering (Playwright, manual test design, Jira/TestRail) and AI/agentic development (Claude Code, LLM API integration), alongside the builder/innovator identity.
- **Live GitHub activity feed** — the portfolio page pulls recent public repos straight from the GitHub REST API server-side, no auth required, cached for an hour ([`src/lib/github.ts`](src/lib/github.ts)).
- **"Let's Talk" contact modal** — an animated modal (not a separate page) with a real Server Action behind the form. Email delivery is stubbed pending a provisioned sending domain — see [Environment Variables](#environment-variables).
- **Motion throughout** — staggered entrances, scroll-triggered reveals, and an animated mobile nav, built on the [`motion`](https://motion.dev) library.

## Tech Stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript |
| UI | React 19 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config, no `tailwind.config.*`) |
| Animation | [`motion`](https://motion.dev) |
| Icons | [`lucide-react`](https://lucide.dev) |
| Hosting | [Vercel](https://vercel.com) |

## Project Structure

```
src/
  app/
    page.tsx              Home — hero, QA section, AI section
    portfolio/page.tsx     Portfolio — case studies + live GitHub feed
    actions/
      send-contact-email.ts  Server Action behind the contact form
    layout.tsx             Root layout, fonts, metadata, JSON-LD
    globals.css             Design tokens, glitch utilities, keyframes
    sitemap.ts, robots.ts
  components/
    HeroSection, QASection, AISection    Home-page sections
    Navbar, Footer                        Site chrome
    ProjectSection, ProjectPreview        Portfolio page: one full-width section per project
    project-scenes/                       The looping animation in each project section
    GitHubActivity(Grid)                  Portfolio page: live GitHub feed
    ContactModal, ContactForm             "Let's Talk" flow
    GlitchText                            Reusable RGB-split text effect
    PageBackground                        Responsive per-page background
  context/ContactModalContext.tsx  Global modal open/close state
  data/projects.ts                  Curated case-study data, incl. each project's theme and accent
  lib/github.ts                     GitHub REST API fetch + cache
  hooks/useScrollPosition.ts
public/images/
  backgrounds/    Desktop + mobile background photos, per page
  profile/         Avatar
  projects/        Live-demo screenshots used on the portfolio page
```

## Getting Started

Requires Node 20+.

```bash
npm install
cp .env.example .env.local   # optional — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See [`.env.example`](.env.example). Everything is optional for local dev:

| Variable | Purpose |
|---|---|
| `GITHUB_TOKEN` | Raises the GitHub API rate limit (60/hr → 5,000/hr) for the recent-activity feed. Unauthenticated works fine at low traffic. |
| `CONTACT_RECEIVER_EMAIL` | Where contact-form submissions should go once email sending is wired up. |

Real email delivery isn't wired up yet — it needs an email-sending integration (Resend, via the Vercel Marketplace) provisioned against a domain you own. Until then, submissions are logged server-side and the form tells the visitor to reach out directly.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Deployment

Deployed on Vercel, linked to this repo's GitHub remote. Vercel's Git integration auto-builds and promotes to production on every push to `master` — no manual deploy step needed. A one-off manual deploy (e.g. to preview local-only changes) can still be run with:

```bash
vercel deploy         # preview
vercel deploy --prod  # production
```

## Design System

Defined in [`src/app/globals.css`](src/app/globals.css) as Tailwind v4 theme tokens and plain CSS:

- **Colors** — `--color-glitch-cyan` (`#00fff2`), `--color-glitch-magenta` (`#ff00c8`), `--color-glitch-yellow` (`#f6ff00`), `--color-ground` (`#0a0a0c`)
- **Type** — Geist Sans (body), Space Grotesk (`font-display`, headings), JetBrains Mono (`font-mono`, labels/badges/nav)
- **Shape** — `clip-angular` / `clip-angular-sm` utilities replace rounded corners everywhere with angular clipped-corner polygons
- **Texture** — `.scanline-overlay` (CRT-style scanlines) and `.rgb-split-hover` (chromatic-aberration hover on the profile photo)
- **Project previews** — [`ProjectPreview`](src/components/ProjectPreview.tsx) puts every screenshot on the same dot-grid stage (`.preview-stage`): tall screenshots in a phone frame, wide ones in a browser frame. With a mouse the frame tilts toward the pointer and splits into cyan/magenta fringes; clicking or tapping opens the full-size screenshot in a dialog. Reduced-motion users get no tilt.
- **Project sections** — [`ProjectSection`](src/components/ProjectSection.tsx) gives every project its own full-width section, themed from what the project is about. Each project in [`projects.ts`](src/data/projects.ts) sets an `accent` (taken from the product's own UI) and a `theme`, which picks three things:

  | Project | Background | How the section arrives | Looping scene |
  |---|---|---|---|
  | Supstaff | Lit windows of a building at night | Written in, like log entries | A night shift's checks landing in the log, 22:00 to 07:00 |
  | BoardReady | Ruled ledger paper | Resolves out of a blur | `[[placeholders]]` replaced by figures filled in by code |
  | Swole | Barbell knurling | Springy, like a rep | Bench-press sets rising to a new PR |
  | BiSRide | Street grid | Rides in from the side | Delivery posted, accepted, rider travels to drop-off |
  | Get More Diners | Gingham tablecloth | Slow, warm rise | An AI-written offer sent by SMS and email |
  | YTG | Leaderboard columns | Drops into place | Your portfolio climbing a ranking |
  | Nexus Todo | Neon horizon grid | Short glitch | Adding and filtering tasks on a neon command line |

  Scenes live in [`src/components/project-scenes/`](src/components/project-scenes) and only run while on screen. With reduced motion, sections fade in without movement and each scene shows its finished state.

## License

© 2026 Oluwatobi Tella Ndanusa. All rights reserved.
