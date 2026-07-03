# karanshukla.ca

[![Build & Deploy](https://github.com/karanshukla/karanshukla.ca/actions/workflows/main.yml/badge.svg)](https://github.com/karanshukla/karanshukla.ca/actions/workflows/main.yml)
[![Coverage Status](https://coveralls.io/repos/github/karanshukla/karanshukla.ca/badge.svg?branch=main)](https://coveralls.io/github/karanshukla/karanshukla.ca?branch=main)
[![PR Checks](https://github.com/karanshukla/karanshukla.ca/actions/workflows/pr-check.yml/badge.svg)](https://github.com/karanshukla/karanshukla.ca/actions/workflows/pr-check.yml)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

Personal website and resume. Live at [karanshukla.ca](https://karanshukla.ca).

---

## What makes this site unusual

Most personal sites are a static page with a bio and some project links. This one is a bit weirder.

### Now Playing via Last.fm

A widget polls the Last.fm API every 30 seconds and shows whatever is currently playing, including album art, track name, and the top genre tags scraped from the track metadata. If nothing is playing, it falls back to the most recently scanned track. Respects `prefers-reduced-motion` for the blinking "live" indicator. 

### AI-Generated Commit Summaries

Every 3 days, a GitHub Actions workflow runs a Python script that fetches recent commits and their diffs, sends them to the GitHub Models API (Mistral), and gets back a short natural-language summary of what changed. That summary is committed as `pulse.json` and baked into the static build. No backend, no runtime LLM calls.

### Stats Baked at Build Time

Weekly, another workflow runs the full Vitest coverage suite and a Lighthouse CI audit, then a Python script aggregates the numbers into `stats.json`. That file is also committed and served statically. The sidebar widget reads it at build time, so performance and coverage scores are always up to date without any runtime API calls.

### GitHub Repo Cards

Project cards fetch live star counts, fork counts, primary language, and last-updated timestamps from the GitHub API. The data is fetched at runtime in the browser, so the cards stay current without a redeploy.

### Keyboard Navigation

Numpad keys 1 through 4 navigate between the main sections of the site. You probably have a numpad. Now you know what to do with it.

---

## Tech stack

| Layer | Tools |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| UI | Material UI v9 + Emotion |
| Routing | React Router v7 |
| State | Zustand v5 |
| Testing | Vitest + React Testing Library |
| Linting | ESLint + TypeScript ESLint + Prettier |
| Automation | GitHub Actions + Python scripts |
| AI | GitHub Models API (Mistral) |

---

## Project structure

```
karanshukla.ca/
├── src/                    # React + TypeScript + Vite app
│   └── data/               # Auto-generated JSON (pulse.json, stats.json)
└── scripts/                # Python scripts run by GitHub Actions
    ├── summarize.py         # Fetches recent commits + diffs, generates pulse.json via GitHub Models
    └── generate_stats.py   # Reads Vitest coverage + Lighthouse results, generates stats.json
```

---

## Local development

```bash
yarn install
yarn dev        # http://localhost:5173
```

---

## Automated workflows

| Workflow | Schedule | What it does |
|---|---|---|
| `main.yml` | Push to `main` | Build + deploy to GitHub Pages |
| `pr-check.yml` | Pull requests | Lint, type-check, test |
| `pulse.yml` | Every 3 days | Fetch recent commits, summarise via Mistral, commit `pulse.json` |
| `stats.yml` | Weekly (Mon 02:00 UTC) | Run Vitest coverage + Lighthouse CI, commit `stats.json` |
| `standard-site.yml` | Push touching `src/data/posts/**` | Publish [Standard.site](https://standard.site) publication/document records to the `pds.karanshukla.ca` PDS |

`pulse.json` and `stats.json` are static files baked into the build at deploy time. The sidebar widgets (`GitHubPulse`, `SiteStatsWidget`) read these files at build time with no runtime API calls needed.

---

## Standard.site

Blog posts are published as [Standard.site](https://standard.site) records so they're discoverable in Standard.site readers such as [standard-reader.app](https://standard-reader.app). Whenever a post is added, edited, or removed under `src/data/posts/`, `standard-site.yml` runs `scripts/publish_standard_site.py`, which:

1. Creates the `site.standard.publication` record on the `pds.karanshukla.ca` PDS (once) and writes its AT-URI to `public/.well-known/site.standard.publication` for domain verification.
2. Creates, updates, or deletes a `site.standard.document` record per post, keyed by a content hash tracked in `src/data/standardSiteRecords.json` so unchanged posts are skipped.

This requires a `PDS_APP_PASSWORD` repo secret (an app password for the `karanshukla.ca` PDS account) and, optionally, a `PDS_IDENTIFIER` secret (handle or DID to log in with - defaults to the `karanshukla.ca` handle; set it to the account's DID so this keeps working if the handle ever changes). It does not require any changes to how posts are written or rendered on the site itself.

---

## Deploying

Deployment is automatic via GitHub Actions (`.github/workflows/main.yml`). Any push to `main` triggers the workflow, which:

1. Installs dependencies with Yarn
2. Builds the app with Vite (`yarn build`)
3. Writes a `CNAME` file with `karanshukla.ca` into the build output
4. Publishes the build to the `gh-pages` branch using `peaceiris/actions-gh-pages`

GitHub Pages serves the `gh-pages` branch at the custom domain.

---

## Credits

- [Last.fm Hook](https://github.com/alii/use-last-fm) for music scrobbling data
- [GitHub Models](https://github.com/marketplace/models) for LLM-powered commit summaries (Mistral)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) for automated performance auditing
- [Material UI](https://mui.com/) for components and theming
- [shields.io](https://shields.io/) for badges
