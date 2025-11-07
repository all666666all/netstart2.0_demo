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

/**
 * Analyze input to determine whether cleaning would modify content.
 * - hasInvalid = true if non FASTA/non-ACGTUN chars (beyond headers/whitespace) exist
 * - cleaned = parseFasta(input)
 */
export function analyzeFastaInput(input: string): { cleaned: string; hasInvalid: boolean } {
  const cleaned = parseFasta(input);
  if (!input) return { cleaned, hasInvalid: false };
  const lines = input.split(/\r?\n/);
  const nonHeader = lines.filter((l) => !/^>/.test(l.trim())).join("");
  const upper = nonHeader.toUpperCase();
  const noWs = upper.replace(/\s+/g, "");
  const invalid = /[^ACGTUN]/.test(noWs);
  return { cleaned, hasInvalid: invalid };
}
