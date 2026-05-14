# karan-resume

## Stack

- React 18 + TypeScript
- Vite
- MUI (Material UI v5)
- Styled Components + Emotion
- Zustand
- React Router v6

## Local development

```bash
yarn install    # install dependencies
yarn dev        # start dev server at http://localhost:3000
```

## Build

```bash
yarn build      # compiles TypeScript and bundles to dist/
yarn preview    # serve the dist/ build locally to verify
```

## Other commands

```bash
yarn lint       # ESLint
yarn deploy     # build + deploy to GitHub Pages
```

## Deploy

Deployment is automatic via the GitHub Actions workflow at `.github/workflows/main.yml`. Any push to `main`:

1. Installs dependencies with Yarn
2. Builds with Vite (`yarn build`)
3. Writes a `CNAME` file with `karanshukla.ca` into the build output
4. Publishes to the `gh-pages` branch using `peaceiris/actions-gh-pages`

GitHub Pages serves the `gh-pages` branch at the custom domain.
