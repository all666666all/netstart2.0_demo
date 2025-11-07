import { CheckCircle2, XCircle } from "lucide-react";
import type { AtgPrediction } from "@/shared/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ResultsListProps {
  items: AtgPrediction[];
  threshold: number;
}

export function ResultsList({ items, threshold }: ResultsListProps) {
  return (
    <div className="space-y-2">
      {items.map((pred, idx) => (
        <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded">
          <div className="flex items-center gap-2 text-foreground/90">
            <span>Position {pred.position1}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-block h-2 w-2 rounded-full bg-foreground/50" aria-label="positions-hint" />
              </TooltipTrigger>
              <TooltipContent>Positions are 1‑based</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-mono">{(pred.probability * 100).toFixed(1)}%</span>
            {pred.probability >= threshold ? (
              <CheckCircle2 className="w-4 h-4 text-primary" />
            ) : (
              <XCircle className="w-4 h-4 text-muted-foreground/70" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

