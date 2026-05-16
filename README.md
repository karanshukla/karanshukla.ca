# karanshukla.ca

Personal website. Live at [karanshukla.ca](https://karanshukla.ca).

## Project structure

```
karanshukla.ca/
├── karan-resume/           # React + TypeScript + Vite app
│   └── src/data/           # Auto-generated JSON (pulse.json, stats.json)
└── scripts/                # Python scripts run by GitHub Actions
    ├── summarize.py         # Fetches recent commits + diffs → generates pulse.json via GitHub Models
    └── generate_stats.py   # Reads Vitest coverage + Lighthouse results → generates stats.json
```

## Local development

```bash
cd karan-resume
yarn install
yarn dev        # http://localhost:5173
```

## Automated workflows

| Workflow | Schedule | What it does |
|---|---|---|
| `main.yml` | Push to `main` | Build + deploy to GitHub Pages |
| `pr-check.yml` | Pull requests | Lint, type-check, test |
| `pulse.yml` | Every 3 days | Fetch recent commits + diffs → summarise via GitHub Models (Mistral) → commit `pulse.json` |
| `stats.yml` | Weekly (Mon 02:00 UTC) | Run Vitest coverage + Lighthouse CI → commit `stats.json` |

`pulse.json` and `stats.json` are static files baked into the build at deploy time. The sidebar widgets (`GitHubPulse`, `SiteStatsWidget`) read these files at build time — no runtime API calls needed.

## Deploying

Deployment is automatic via GitHub Actions (`.github/workflows/main.yml`). Any push to `main` triggers the workflow, which:

1. Installs dependencies with Yarn
2. Builds the app with Vite (`yarn build`)
3. Writes a `CNAME` file with `karanshukla.ca` into the build output
4. Publishes the build to the `gh-pages` branch using `peaceiris/actions-gh-pages`

GitHub Pages then serves the `gh-pages` branch at the custom domain.
