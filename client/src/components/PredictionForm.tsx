import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import type { RefObject } from "react";

interface PredictionFormProps {
  sequence: string;
  setSequence: (s: string) => void;
  selectedSpecies: string;
  setSelectedSpecies: (s: string) => void;
  loading: boolean;
  error: string | null;
  textareaRef: RefObject<HTMLTextAreaElement>;
  onPredict: () => void;
  examples: { human: string; mouse: string; plant: string };
}

export function PredictionForm({
  sequence,
  setSequence,
  selectedSpecies,
  setSelectedSpecies,
  loading,
  error,
  textareaRef,
  onPredict,
  examples,
}: PredictionFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-foreground/90 mb-2 block">Select Species</label>
        <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
          <SelectTrigger className="bg-input border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="h_sapiens">Homo sapiens (Human)</SelectItem>
            <SelectItem value="m_musculus">Mus musculus (Mouse)</SelectItem>
            <SelectItem value="d_rerio">Danio rerio (Zebrafish)</SelectItem>
            <SelectItem value="a_thaliana">Arabidopsis thaliana (Plant)</SelectItem>
            <SelectItem value="s_cerevisiae">Saccharomyces cerevisiae (Yeast)</SelectItem>
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
          className="bg-input border-border text-foreground font-mono h-32 focus-visible:ring-ring/60"
        />
        {error && (
          <p id="sequence-error" className="mt-1 text-sm text-destructive">{error}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setSequence(examples.human)} variant="outline" size="sm" className="active:scale-[0.98] transition">
          Example: Human
        </Button>
        <Button onClick={() => setSequence(examples.mouse)} variant="outline" size="sm" className="active:scale-[0.98] transition">
          Example: Mouse
        </Button>
        <Button onClick={() => setSequence(examples.plant)} variant="outline" size="sm" className="active:scale-[0.98] transition">
          Example: Plant
        </Button>
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
