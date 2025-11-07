import { describe, it, expect } from "vitest";
import { predictTIS } from "@/lib/predict";

describe("predictTIS scoring behavior", () => {
  it("prefers Kozak-like context (R@-3 and G@+4)", () => {
    // Sequence with two ATGs: first has GCCACC upstream and G at +4; second is plain
    const seq = "GCCACCATGGAAAAAATGAAAA"; // ATG at pos 7 (1-based 8), then later
    const result = predictTIS(seq, "h_sapiens", { topN: undefined, threshold: 0.625 });
    const [p0, p1] = result.predictions.sort((a, b) => a.position0 - b.position0);
    // Ensure first ATG (with motif) scores >= second
    expect(p0.position0).toBeLessThan(p1.position0);
    expect(p0.probability).toBeGreaterThanOrEqual(p1.probability);
  });

  it("species bonus yields human > mouse > chordata when motif present", () => {
    const seq = "GCCACCATGGAAAAAA"; // single ATG with motif
    const h = predictTIS(seq, "h_sapiens", { topN: 1, seedBy: "sequence" });
    const m = predictTIS(seq, "m_musculus", { topN: 1, seedBy: "sequence" });
    const c = predictTIS(seq, "chordata", { topN: 1, seedBy: "sequence" });
    expect(h.predictions[0].probability).toBeGreaterThan(m.predictions[0].probability);
    expect(m.predictions[0].probability).toBeGreaterThan(c.predictions[0].probability);
  });
});


