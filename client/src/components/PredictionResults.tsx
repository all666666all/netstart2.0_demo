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
  disableDownload?: boolean;
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

export function PredictionResults({ result, mode, threshold, originLabel, originCode, onThresholdChange, onDownload, disableDownload }: PredictionResultsProps) {
  const totalAtg = result.atgCount;
  const visibleCount = result.predictions.length;
  const showList = visibleCount > 0;
  const detailSuffix = mode === "top1"
    ? (totalAtg > 1 ? ` (displaying ${visibleCount})` : "")
    : (mode === "above" ? ` (≥ threshold: ${visibleCount})` : "");

  return (
    <section aria-labelledby="results-heading" className="space-y-2" aria-live="polite">
      <ResultToolbar
        originLabel={originLabel}
        originCode={originCode}
        mode={mode}
        threshold={threshold}
        onThresholdChange={onThresholdChange}
        onDownload={onDownload}
        hasResults={result.predictions.length > 0}
        disableDownload={disableDownload}
      />
      <Card className="bg-input border border-border">
        <CardContent className="pt-2">
          <div className="text-xs text-muted-foreground leading-tight tabular-nums mb-2" aria-live="polite">
            {totalAtg === 0 ? (
              <p>No ATG found in input.</p>
            ) : (
              <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1">
                  <span className="font-semibold text-foreground">Species:</span> {originLabel} ({originCode})
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1">
                  <span className="font-semibold text-foreground">ATG codons found:</span> {totalAtg}{detailSuffix}
                </span>
              </div>
            )}
          </div>
          {showList ? (
            <ResultsList items={result.predictions} threshold={threshold} />
          ) : (
            <p className="text-sm text-muted-foreground">
              {totalAtg === 0 ? "No ATG found in input" : (mode === "above" ? "No ATG at or above threshold." : "No items to display.")}
            </p>
          )}
        </CardContent>
      </Card>
      <ResultLegend />
      <span className="sr-only" aria-live="polite">Species {originLabel}; ATG codons found {totalAtg}.</span>
    </section>
  );
}
