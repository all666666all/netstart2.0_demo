import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import type { PredictionResult } from "@/shared/types";
import { DEFAULT_THRESHOLD } from "@/lib/predict";

interface PredictionResultsProps {
  result: PredictionResult;
}

export function PredictionResults({ result }: PredictionResultsProps) {
  return (
    <div className="mt-6" aria-live="polite">
      <Card className="bg-input border border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Prediction Results</CardTitle>
        </CardHeader>
        <CardContent>
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

