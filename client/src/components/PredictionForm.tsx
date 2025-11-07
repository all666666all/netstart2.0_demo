import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import type { RefObject } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { User, Sprout } from "lucide-react";
import { RatIcon } from "@/components/icons/Rat";

interface PredictionFormProps {
  sequence: string;
  setSequence: (s: string) => void;
  selectedSpecies: string;
  setSelectedSpecies: (s: string) => void;
  loading: boolean;
  error: string | null;
  canClean?: boolean;
  onCleanContinue?: () => void;
  onCancelError?: () => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
  onPredict: () => void;
  examples: { human: string; mouse: string; plant: string };
  mode: "all" | "top1" | "above";
  setMode: (m: "all" | "top1" | "above") => void;
  threshold: number;
  setThreshold: (t: number) => void;
}

export function PredictionForm({
  sequence,
  setSequence,
  selectedSpecies,
  setSelectedSpecies,
  loading,
  error,
  canClean,
  onCleanContinue,
  onCancelError,
  textareaRef,
  onPredict,
  examples,
  mode,
  setMode,
  threshold,
  setThreshold,
}: PredictionFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-foreground/90 mb-2 block">Select Species</label>
        <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
          <SelectTrigger className="bg-input/60 border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="h_sapiens">Homo sapiens (Human)</SelectItem>
            <SelectItem value="m_musculus">Mus musculus (Mouse)</SelectItem>
            <SelectItem value="r_norvegicus">Rattus norvegicus (Rat)</SelectItem>
            <SelectItem value="d_melanogaster">Drosophila melanogaster (Fruit fly)</SelectItem>
            <SelectItem value="d_rerio">Danio rerio (Zebrafish)</SelectItem>
            <SelectItem value="a_thaliana">Arabidopsis thaliana (Plant)</SelectItem>
            <SelectItem value="s_cerevisiae">Saccharomyces cerevisiae (Yeast)</SelectItem>
            <SelectItem value="chordata">Chordata (Phylum)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm text-foreground/90 mb-2 block">Nucleotide Sequence (FASTA or raw)</label>
        <Textarea
          ref={textareaRef}
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="Paste FASTA (with >header) or raw A/C/G/T/U/N..."
          aria-invalid={!!error}
          aria-describedby={error ? "sequence-error" : undefined}
          className="bg-input/60 border-border text-foreground font-mono h-32 focus-visible:ring-ring/60"
        />
        {error && (
          <div className="mt-1 space-y-2">
            <p id="sequence-error" className="text-sm text-destructive">{error}</p>
            {canClean && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={onCleanContinue} aria-label="Clean and continue with sanitized sequence">Clean & Continue</Button>
                <Button size="sm" variant="ghost" onClick={onCancelError} aria-label="Cancel and return to input">Cancel</Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Examples toolbar */}
      <div className="space-y-2">
        <Label className="text-sm text-foreground/90">Examples</Label>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" size="sm" className="h-7 rounded-full px-3" onClick={() => setSequence(examples.human)}>
            <User className="w-3.5 h-3.5 mr-1" /> Human
          </Button>
          <Button type="button" variant="secondary" size="sm" className="h-7 rounded-full px-3" onClick={() => setSequence(examples.mouse)}>
            <RatIcon className="w-3.5 h-3.5 mr-1" /> Mouse
          </Button>
          <Button type="button" variant="secondary" size="sm" className="h-7 rounded-full px-3" onClick={() => setSequence(examples.plant)}>
            <Sprout className="w-3.5 h-3.5 mr-1" /> Plant
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Tip: Human example contains 6 ATGs — handy for comparing Top-1 vs threshold.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm text-foreground/90 mb-2 block">Output Mode</Label>
          <RadioGroup value={mode} onValueChange={(v) => setMode(v as any)} className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem id="mode-all" value="all" />
              <Label htmlFor="mode-all">All ATGs</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="mode-top1" value="top1" />
              <Label htmlFor="mode-top1">Top-1</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="mode-above" value="above" />
              <Label htmlFor="mode-above">Above threshold</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <Button onClick={onPredict} disabled={loading} className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition">
        {loading ? (
          <>
            <Spinner className="w-4 h-4 mr-2" /> Predicting...
          </>
        ) : (
          <>Predict TIS</>
        )}
      </Button>
    </div>
  );
}





