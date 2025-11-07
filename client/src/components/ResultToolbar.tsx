import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";

interface ResultToolbarProps {
  originLabel: string;
  originCode: string;
  mode: "all" | "top1" | "above";
  threshold: number;
  onThresholdChange: (t: number) => void;
  onDownload?: () => void;
  hasResults: boolean;
  disableDownload?: boolean;
}

export function ResultToolbar({
  originLabel,
  originCode,
  mode,
  threshold,
  onThresholdChange,
  onDownload,
  hasResults,
  disableDownload,
}: ResultToolbarProps) {
  const modeText = mode === "all" ? "All ATGs" : mode === "top1" ? "Top-1" : "Above threshold";
  return (
    <header className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <h3 id="results-heading" className="text-base font-semibold">Predictions</h3>
        <Badge variant="secondary" title={originCode}>{originLabel}</Badge>
        <Badge variant="secondary">{modeText}</Badge>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Label htmlFor="th" className="text-sm">Threshold</Label>
          <Slider id="th" className="w-40" min={0.5} max={0.9} step={0.005} value={[threshold]} onValueChange={(v) => onThresholdChange(v[0] ?? threshold)} />
          <span className="tabular-nums text-sm">{threshold.toFixed(3)}</span>
        </div>
        {hasResults && onDownload && (
          <Button variant="ghost" size="sm" onClick={onDownload} aria-label="Download CSV" disabled={!!disableDownload}>
            <Download className="mr-1 h-4 w-4" /> CSV
          </Button>
        )}
      </div>
      <span className="sr-only" aria-live="polite">Mode {modeText}, Threshold {threshold.toFixed(3)}</span>
    </header>
  );
}
