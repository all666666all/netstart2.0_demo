import { Card, CardContent } from "@/components/ui/card";
import type { PredictionResult } from "@/shared/types";
import { DEFAULT_THRESHOLD } from "@/lib/predict";
import { ResultToolbar } from "@/components/ResultToolbar";
import { ResultLegend } from "@/components/ResultLegend";
import { ResultsList } from "@/components/ResultsList";

interface PredictionResultsProps {
  result: PredictionResult;
  mode: "all" | "top1" | "above";
  threshold: number;
  originLabel: string;
  originCode: string;
  onThresholdChange: (t: number) => void;
  onDownload?: () => void;
}

function modeLabel(mode: "all" | "top1" | "above") {
  switch (mode) {
    case "all":
      return "All ATGs";
    case "top1":
      return "Top-1";
    case "above":
      return "Threshold";
  }
}

export function PredictionResults({ result, mode, threshold, originLabel, originCode, onThresholdChange, onDownload }: PredictionResultsProps) {
  return (
    <section aria-labelledby="results-heading" className="space-y-3" aria-live="polite">
      <ResultToolbar
        originLabel={originLabel}
        originCode={originCode}
        modeLabel={modeLabel(mode)}
        threshold={threshold}
        onThresholdChange={onThresholdChange}
        onDownload={onDownload}
        hasResults={result.predictions.length > 0}
      />
      <Card className="bg-input border border-border">
        <CardContent className="pt-4">
          <ResultsList items={result.predictions} threshold={threshold} />
        </CardContent>
      </Card>
      <ResultLegend />
    </section>
  );
}
