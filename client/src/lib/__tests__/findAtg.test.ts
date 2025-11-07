import { describe, it, expect } from "vitest";
import { findAtgPositions } from "@/lib/findAtg";

describe("findAtgPositions", () => {
  it("finds ATG in uppercase and treats U as T", () => {
    expect(findAtgPositions("ATGAAATG")).toEqual([0, 5]);
    expect(findAtgPositions("AUGAA AUG".replace(/ /g, "").replace(/U/g, "U"))).toEqual([0, 5]);
  });

  it("returns empty for no ATG", () => {
    expect(findAtgPositions("AAAAAAA")).toEqual([]);
  });
});

