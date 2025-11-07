# NetStart 2.0 — BINF3020 Group Presentation

Authors (Group): Chengzong Guo · Dingyi Cao

---

## 1) Project & Authors
- Name: NetStart 2.0
- Paper: BMC Bioinformatics (2025), DOI: 10.1186/s12859-025-06220-2
- Main authors: Line Sandvad Nielsen; Anders Gorm Pedersen; Ole Winther; Henrik Nielsen
- Institutions: DTU Health Tech; University of Copenhagen; DTU Compute

## 2) Purpose (What it does)
- Predicts eukaryotic Translation Initiation Sites (TIS) in gene sequences
- Uses a protein language model (ESM‑2) + local sequence context

## 3) Bioinformatics Use Cases
- Genome annotation: identify correct start codons in new genomes
- Novel protein discovery: alternate TIS and short ORFs (sORFs)
- Translational research: study TIS preference and Kozak context across species

## 4) Advantages vs Disadvantages
- Advantages
  - State‑of‑the‑art accuracy (paper benchmark) across ~60 eukaryotic species
  - Uses ESM‑2 embeddings (powerful prior) + open web service + open code
- Disadvantages
  - Heavy compute for local runs (deep model); better to use hosted service
  - Focused on eukaryotes; not intended for prokaryotic genomes
  - Model interpretability is limited vs rule‑based methods

## 5) Availability (Platform, Access, License)
- Web server: DTU Health Tech (no account required)
- Source code: https://github.com/lsandvad/netstart2
- License: CC BY‑NC‑ND 4.0 (non‑commercial; no derivatives)
- Cross‑platform via browser; repo provides code for local/DIY use

## 6) FAIR Principles (Summary)
- Findable: DOI; indexed (PubMed; BMC Bioinformatics)
- Accessible: free web server; public repo; API described
- Interoperable: standard I/O (FASTA input; CSV output)
- Reusable: clear licensing; docs; version control

## 7) AI In The Project & Outlook
- Core AI: transformer (ESM‑2) to assess coding potential
- Outlook: larger LMs + multimodal signals → better TIS calls; broader genomics tasks

## 8) Our Use of AI Tools (Reflection)
- Used ChatGPT to draft copy (FAIR/use‑cases), scaffold React UI
- Worked well for speed and structure; required fact‑checking and style tuning
- Didn’t rely on AI for final claims without verification (paper/repo cross‑checks)

## 9) Demo (What we’ll show)
- Quick local UI demo simulating TIS prediction workflow
- Input sequence (example human/mouse), pick species, run Predict, interpret outputs

## 10) Takeaways
- NetStart 2.0 is a strong, modern TIS predictor for eukaryotes
- Easy to try via web; open repo enables extension (within license constraints)

