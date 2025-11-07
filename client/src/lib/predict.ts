import { findAtgPositions } from "./findAtg";
import type { AtgPrediction, PredictionResult } from "@/shared/types";

export const DEFAULT_THRESHOLD = 0.625;

// Simple deterministic hash for a string → 32-bit unsigned
function hash32(s: string): number {
  let h = 2166136261 >>> 0; // FNV-1a basis
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

// Deterministic pseudo-random in [0,1) seeded by integer
function seededRandom(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    // xorshift32
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17; s >>>= 0;
    s ^= s << 5;  s >>>= 0;
    return (s >>> 0) / 0xffffffff;
  };
}

// Minimal Kozak-like scoring around ATG (deterministic)
// gccRccATGG — award for purine at -3 and G at +4
function kozakScore(seq: string, atgPos0: number): number {
  const s = seq.replace(/U/g, "T");
  const minus3 = atgPos0 - 3 >= 0 ? s[atgPos0 - 3] : "";
  const plus4 = atgPos0 + 3 + 1 < s.length ? s[atgPos0 + 4] : ""; // +4 relative to 'A' of ATG
  let score = 0;
  if (minus3 === "A" || minus3 === "G") score += 1; // purine at -3
  if (plus4 === "G") score += 1;
  return score / 2; // 0, 0.5, 1.0
}

export interface PredictOptions {
  threshold?: number; // default 0.625
  topN?: number; // if provided, limit to top N after sorting
  seedBy?: "sequence" | "species" | "both"; // default both
}

export function predictTIS(seqRaw: string, species: string, opts: PredictOptions = {}): PredictionResult {
  const threshold = opts.threshold ?? DEFAULT_THRESHOLD;
  const atgPositions = findAtgPositions(seqRaw);
  const seed = (opts.seedBy ?? "both") === "sequence"
    ? hash32(seqRaw)
    : (opts.seedBy ?? "both") === "species"
      ? hash32(species)
      : (hash32(seqRaw) ^ (hash32(species) << 1)) >>> 0;
  const rnd = seededRandom(seed);

  const predictions: AtgPrediction[] = atgPositions.map((p0) => {
    // Base from deterministic randomness + Kozak bonus, map to [0.5, 1.0]
    const base = rnd();
    const kozak = kozakScore(seqRaw, p0); // 0, 0.5, 1.0
    const prob = 0.5 + 0.5 * Math.min(1, 0.6 * base + 0.4 * kozak);
    const peptideLength = 50 + Math.floor(200 * rnd());
    return {
      position0: p0,
      position1: p0 + 1,
      probability: prob,
      peptideLength,
    };
  }).sort((a, b) => b.probability - a.probability);

  const limited = opts.topN ? predictions.slice(0, opts.topN) : predictions;

  return {
    species,
    atgCount: atgPositions.length,
    predictions: limited,
  };
}

