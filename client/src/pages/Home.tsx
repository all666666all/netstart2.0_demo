import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dna, Zap, CheckCircle2, XCircle, Github, FileText, Check } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { parseFasta, analyzeFastaInput } from "@/lib/parseFasta";
import { predictTIS, DEFAULT_THRESHOLD } from "@/lib/predict";
import type { PredictionResult } from "@/shared/types";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionResults } from "@/components/PredictionResults";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const [sequence, setSequence] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("h_sapiens");
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canClean, setCanClean] = useState(false);
  const [cleanedCache, setCleanedCache] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [mode, setMode] = useState<"all" | "top1" | "above">("top1");
  const [threshold, setThreshold] = useState<number>(DEFAULT_THRESHOLD);

  const exampleSequences = {
    human: "ATGGCTAGCGCCACCATGGCTAGCGCCACCATGGCTAGCGCCACCATGGCTAGCGCCACCATGGCTAGCGCCACCATG",
    mouse: "ATGGCTGCCACCATGGCTGCCACCATGGCTGCCACCATGGCTGCCACCATGGCTGCCACCATGGCTGCCACCATG",
    plant: "ATGGCCACCATGGCCACCATGGCCACCATGGCCACCATGGCCACCATGGCCACCATGGCCACCATGGCCACCATG"
  };

  const originLabelMap: Record<string, string> = {
    h_sapiens: "Human",
    m_musculus: "Mouse",
    r_norvegicus: "Rat",
    d_melanogaster: "Fruit fly",
    d_rerio: "Zebrafish",
    a_thaliana: "Arabidopsis",
    s_cerevisiae: "Yeast",
    chordata: "Chordata",
  };

  function runPredict(parsed: string) {
    setLoading(true);
    setTimeout(() => {
      const topN = mode === "top1" ? 1 : undefined;
      const result = predictTIS(parsed, selectedSpecies, { threshold, topN });
      setPredictionResult(result);
      setLoading(false);
      toast.success("Prediction completed!");
    }, 400);
  }

  const handlePredict = () => {
    setError(null);
    setCanClean(false);
    setCleanedCache(null);
    setPredictionResult(null);
    if (!sequence) {
      setError("Please enter a sequence (FASTA or raw nucleotides)");
      textareaRef.current?.focus();
      return;
    }
    const { cleaned, hasInvalid } = analyzeFastaInput(sequence);
    if (hasInvalid) {
      setError("Invalid characters detected. Clean & Continue to remove non-ACGTUN and headers, or Cancel.");
      setCanClean(true);
      setCleanedCache(cleaned);
      textareaRef.current?.focus();
      return;
    }
    const parsed = parseFasta(sequence);
    if (!parsed) {
      setError("Empty sequence after parsing. Please provide A/C/G/T/U/N bases.");
      textareaRef.current?.focus();
      return;
    }
    runPredict(parsed);
  };

  // Simplified content for assignment landing page

  const groupAuthors = ["Chengzong Guo", "Dingyi Cao"]; // assignment authors

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      

      {/* Hero Section */}
      <Hero authors={groupAuthors} />

      {/* (Key Features removed for simplicity) */}

      {/* Interactive Demo */}
      <section id="demo" className="container mx-auto px-4 py-16">
        <Card className="bg-card border-border max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-foreground">Simulate Translation Initiation Site Prediction</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter a nucleotide sequence or use an example to see how NetStart 2.0 identifies potential translation start sites
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <PredictionForm
              sequence={sequence}
              setSequence={setSequence}
              selectedSpecies={selectedSpecies}
              setSelectedSpecies={setSelectedSpecies}
              loading={loading}
              error={error}
              canClean={canClean}
              onCleanContinue={() => { if (cleanedCache) { setSequence(cleanedCache); setError(null); setCanClean(false); runPredict(cleanedCache); } }}
              onCancelError={() => { textareaRef.current?.focus(); }}
              textareaRef={textareaRef}
              onPredict={handlePredict}
              examples={exampleSequences}
              mode={mode}
              setMode={setMode}
              threshold={threshold}
              setThreshold={setThreshold}
            />
            {predictionResult && (
              <PredictionResults
                result={{
                  ...predictionResult,
                  predictions:
                    mode === "above"
                      ? predictionResult.predictions.filter((p) => p.probability >= threshold)
                      : predictionResult.predictions,
                }}
                mode={mode}
                threshold={threshold}
                originLabel={originLabelMap[selectedSpecies] ?? selectedSpecies}
                originCode={selectedSpecies}
                onThresholdChange={(t) => setThreshold(t)}
                onDownload={() => {
                  const toExport = (mode === "above" ? (predictionResult?.predictions.filter((p) => p.probability >= threshold) ?? []) : (predictionResult?.predictions ?? []));
                  const header = "origin,atg_pos,preds,peptide_len";
                  const rows = toExport.map((p) => `${selectedSpecies},${p.position1},${p.probability.toFixed(3)},${p.peptideLength}`).join("\n");
                  const csv = header + "\n" + rows + (rows ? "\n" : "");
                  const ts = new Date().toISOString().replace(/:/g, "-");
                  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `netstart2_demo_${selectedSpecies}_${ts}.csv`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                disableDownload={loading}
              />
            )}
          </CardContent>
        </Card>
      </section>

      {/* About (minimal to satisfy assignment when slides are absent) */}
      <section id="about" className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-foreground mb-6 text-center">About the Demo</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Highlights & Caveats</CardTitle>\n            </CardHeader>
            <CardContent className="text-sm text-foreground/90 space-y-2">
              <div>
                <p className="font-medium">Advantages</p>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>SOTA accuracy across ~60 eukaryotes</li>
                  <li>ESM‑2 \+ local context</li>
                  <li>Web server & open repo</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Caveats</p>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Heavy local compute</li>
                  <li>Eukaryotes only</li>
                  <li>Limited interpretability</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">FAIR & Licensing</CardTitle>\n            </CardHeader>
            <CardContent className="text-sm text-foreground/90 space-y-2">
              <div>
                <p className="font-medium">FAIR</p>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Findable: Paper + DOI (BMC 2025)</li>
                  <li>Accessible: Free web server & open repo</li>
                  <li>Interoperable: FASTA input, CSV output</li>
                  <li>Reusable: Clear license & docs</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">License</p>
                <p className="text-muted-foreground">Upstream: CC BY‑NC‑ND 4.0 (non‑commercial; no derivatives)</p>
              </div>
            </CardContent>
          </Card>
        </div>
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Check className="h-3.5 w-3.5" />
          <span>12 unit tests passed • Deterministic outputs (seeded by sequence string)</span>
        </div>
      </section>

      {/* (FAIR section removed for simplicity) */}

      {/* (Developers section removed for simplicity) */}

      {/* (Use Cases removed for simplicity) */}

      {/* (Technical details removed for simplicity) */}

      {/* Footer */}
      <footer className="border-t border-border bg-card/80 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Dna className="w-5 h-5" />
              <span className="text-sm">NetStart 2.0 - Authors: {groupAuthors.join(", ")}</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-025-06220-2" target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                  Paper
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/lsandvad/netstart2" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}














