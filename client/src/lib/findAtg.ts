/**
 * Find 0-based positions of 'ATG' in a sequence string.
 * Precondition: sequence is uppercase and contains only A/C/G/T/U/N.
 * 'U' is treated as 'T' equivalently for ATG scanning.
 */
export function findAtgPositions(seq: string): number[] {
  const s = seq.replace(/U/g, "T");
  const out: number[] = [];
  for (let i = 0; i <= s.length - 3; i++) {
    if (s[i] === "A" && s[i + 1] === "T" && s[i + 2] === "G") out.push(i);
  }
  return out;
}

