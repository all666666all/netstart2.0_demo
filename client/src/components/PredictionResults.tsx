import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Download } from "lucide-react";
import type { PredictionResult } from "@/shared/types";
import { DEFAULT_THRESHOLD } from "@/lib/predict";

interface PredictionResultsProps {
  result: PredictionResult;
  mode: "all" | "top1" | "above";
  threshold: number;
}

function modeLabel(mode: "all" | "top1" | "above") {
  switch (mode) {
    case "all":
      return "All ATGs";
    case "top1":
      return "Top-1";
    case "above":
      return "Above threshold";
  }
}

export function PredictionResults({ result, mode, threshold }: PredictionResultsProps) {
  function downloadCsv() {
    const header = "origin,atg_pos,preds,peptide_len\n";
    const rows = result.predictions
      .map((p) => `${result.species},${p.position1},${p.probability.toFixed(3)},${p.peptideLength}`)
      .join("\n");
    const csv = header + rows + (rows ? "\n" : "");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `netstart_predictions_${result.species}_${mode}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  return (
    <div className="mt-6" aria-live="polite">
      <Card className="bg-input border border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Prediction Results</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>
              Origin = {result.species} · Output = {modeLabel(mode)} · Threshold = {threshold.toFixed(3)}
            </span>
            <Button variant="outline" size="sm" onClick={downloadCsv} className="ml-4">
              <Download className="w-4 h-4 mr-2" /> Download CSV
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-3">Position is 1‑based; ✓ means probability ≥ current threshold.</p>
          <div className="space-y-2 text-sm">
            <p className="text-foreground/90">
              <span className="text-muted-foreground">Species:</span> {result.species}
            </p>
            <p className="text-foreground/90">
              <span className="text-muted-foreground">ATG codons found:</span> {result.atgCount}
            </p>
            <div className="mt-4">
              <p className="text-muted-foreground mb-2">Top Predictions:</p>
              <div className="space-y-2">
                {result.predictions.map((pred, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded transition-opacity">
                    <span className="text-foreground/90">Position {pred.position1}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-mono">{(pred.probability * 100).toFixed(1)}%</span>
                      {pred.probability > DEFAULT_THRESHOLD ? (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground/70" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
