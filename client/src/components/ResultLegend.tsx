import { CheckCircle2, XCircle } from "lucide-react";

export function ResultLegend() {
  return (
    <p className="text-xs text-muted-foreground flex items-center gap-3">
      <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Above threshold</span>
      <span className="flex items-center gap-1"><XCircle className="h-3 w-3" /> Below threshold</span>
      <span className="flex items-center gap-1 select-none">
        <span className="inline-block h-2 w-2 rounded-full bg-foreground/50" aria-hidden="true" />
        <span>Positions are 1‑based</span>
      </span>
    </p>
  );
}
