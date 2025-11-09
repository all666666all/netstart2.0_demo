# NetStart 2.0 — TIS Prediction Demo

An interactive front-end demo of NetStart 2.0 (Translation Initiation Site prediction), created for the BINF3020 group presentation.

- Live demo: https://netstart.me

## Features
- Interactive prediction: paste FASTA or raw nucleotides, choose species, and view results
- Output modes: All ATGs / Top‑1 / ≥ Threshold (adjustable threshold; shows check or cross for above/below)
- CSV export: download the currently visible results (honors the selected mode)
- Explainability: Species, total ATG count, visible count under threshold/mode, and 1‑based position hint

## Tech Stack
- Build: Vite + React + TypeScript
- Styling: Tailwind CSS v4, shadcn/ui components
- Hosting: Vercel (static output in dist/public)

## Local Development
- Requirements: Node.js 18+ (LTS recommended)
- Package manager: pnpm (declared in package.json)

`
pnpm i
pnpm dev     # starts Vite dev server (default port 3000)
`

## Build
`
pnpm run build  # outputs to dist/public (frontend static) and dist/index.js (optional server entry)
`

## Deploy (Vercel)
- Option A: deploy the static output directory
`
npx vercel --prod --yes --cwd dist/public
`
- Option B: prebuild locally, then deploy the prebuilt output
`
npx vercel pull --yes --environment=production
npx vercel build --prod
npx vercel deploy --prebuilt --prod --yes
`

> Note: ite.config.ts sets oot to client/, and outputs static files to dist/public. Vercel will auto-detect this, or you can specify --cwd dist/public explicitly.

## Environment Variables
- client/index.html contains %VITE_*% placeholders (e.g., %VITE_APP_TITLE%). If not provided, you may see build warnings, but the demo still works.

## Author / Acknowledgements
- Author: all666666all
- Upstream: NetStart 2.0 — Nielsen et al. (2025)

## License
- MIT (see package.json)
