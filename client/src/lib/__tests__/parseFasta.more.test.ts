import { describe, it, expect } from "vitest";
import { parseFasta } from "@/lib/parseFasta";

describe("parseFasta (more cases)", () => {
  it("handles lowercase and weird symbols", () => {
    const input = ">seq\naaa-ttt___ggg***ccc\nXXXyyy\n";
    expect(parseFasta(input)).toBe("AAATTTGGGCCC");
  });

  it("keeps U and N, strips digits and spaces", () => {
    const input = ">rRNA\n uu u n n 1234 atg ";
    expect(parseFasta(input)).toBe("UUUNNATG");
  });

  it("returns empty for only headers", () => {
    expect(parseFasta(">only\n>headers\n")).toBe("");
  });
});

