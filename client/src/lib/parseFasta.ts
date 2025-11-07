/**
 * Parse FASTA or raw nucleotide sequence.
 * - Removes header lines starting with '>'
 * - Removes all whitespace
 * - Keeps only A/C/G/T/U/N (case-insensitive)
 * - Returns uppercase string
 */
export function parseFasta(input: string): string {
  if (!input) return "";
  const lines = input.split(/\r?\n/);
  const seq = lines
    .filter((l) => !/^>/.test(l.trim()))
    .join("")
    .toUpperCase()
    .replace(/\s+/g, "");
  // Keep only valid nucleotide letters
  return seq.replace(/[^ACGTUN]/g, "");
}

