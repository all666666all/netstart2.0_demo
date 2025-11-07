# NetStart 2.0 — Live Demo Script (5–8 min)

Roles: 2 presenters suggested (split roughly 50/50)

## Setup (before speaking)
- Run: `pnpm dev` and open http://localhost:3000
- Zoom browser to ~110–125% for readability
- Pre‑test the three example buttons and Predict

## Flow
1) Context (30–45s)
   - “We’re demonstrating NetStart 2.0 — a tool to predict eukaryotic translation start sites using a modern protein LM (ESM‑2).”
   - “We’ll show how a biologist could use it on a new sequence.”

2) Input (30s)
   - Click “Example: Human” (or Mouse)
   - Mention supported species in dropdown; trained across ~60 eukaryotes (paper)

3) Predict (30s)
   - Click “Predict TIS”
   - Narrate: “It scans ATG and assigns a probability (demo is simulated). In the real tool, a deep model scores each site.”

4) Results (60–90s)
   - Read species, ATG count
   - Point out top 2–3 sites (position + probability)
   - Explain threshold (e.g., 0.625): checkmark = above; X = below
   - Brief interpretation: “Likely start is pos X at ~Y%.”

5) Key points (60–90s)
   - Pros: SOTA accuracy; multi‑species; open access
   - Cons: heavy to run locally; eukaryote‑only; less interpretable
   - FAIR: “Findable via DOI, accessible web server, interoperable I/O, reusable license/docs.”

6) Close (30s)
   - “Try the official web server for real predictions; repo is open (non‑commercial, no derivatives).”
   - Acknowledge authors and institutions (from slides)

## Backup
- If demo fails: show screenshots (slides) of input + results panel
- Keep a short script for narration if network/projector issues occur

