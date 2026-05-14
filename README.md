# karanshukla.ca

Personal website. Live at [karanshukla.ca](https://karanshukla.ca).

## Project structure

```
karanshukla.ca/
└── karan-resume/   # React + TypeScript + Vite app
```

## Local development

```bash
cd karan-resume
yarn install
yarn dev        # http://localhost:5173
```

## Deploying

Deployment is automatic via GitHub Actions (`.github/workflows/main.yml`). Any push to `main` triggers the workflow, which:

1. Installs dependencies with Yarn
2. Builds the app with Vite (`yarn build`)
3. Writes a `CNAME` file with `karanshukla.ca` into the build output
4. Publishes the build to the `gh-pages` branch using `peaceiris/actions-gh-pages`

GitHub Pages then serves the `gh-pages` branch at the custom domain.
