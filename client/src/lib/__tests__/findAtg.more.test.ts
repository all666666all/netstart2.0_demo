import { describe, it, expect } from "vitest";
import { findAtgPositions } from "@/lib/findAtg";

describe("findAtgPositions (more cases)", () => {
  it("finds positions in long strings and adjacent ATGs", () => {
    expect(findAtgPositions("ATGATG")).toEqual([0, 3]);
  });

  it("treats lowercase u as U->T by upstream parseFasta", () => {
    // Here we assume upstream parseFasta will uppercase and keep U.
    // The finder itself maps U->T before scanning.
    expect(findAtgPositions("augATG".toUpperCase())).toEqual([0, 3]);
  });

  it("returns [] for empty input", () => {
    expect(findAtgPositions("")).toEqual([]);
  });
});

