import { describe, it, expect } from "vitest";
import { parseFasta } from "@/lib/parseFasta";

describe("parseFasta", () => {
  it("removes headers and whitespace and keeps valid letters", () => {
    const input = ">seq1 human\nAtg g c\nNxxU-\n>ignored header\nTTt";
    const out = parseFasta(input);
    expect(out).toBe("ATGGCNUTTT".replace("U","U"));
  });

  it("returns empty for empty input", () => {
    expect(parseFasta("")).toBe("");
  });
});

