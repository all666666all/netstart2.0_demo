import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dna, Zap, CheckCircle2, XCircle, Github, FileText } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { parseFasta } from "@/lib/parseFasta";
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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [mode, setMode] = useState<"all" | "top1" | "above">("top1");
  const [threshold, setThreshold] = useState<number>(DEFAULT_THRESHOLD);

  const exampleSequences = {
    human: "ATGGCTAGCGCCACCATGGCTAGCGCCACCATGGCTAGCGCCACCATGGCTAGCGCCACCATGGCTAGCGCCACCATG",
    mouse: "ATGGCTGCCACCATGGCTGCCACCATGGCTGCCACCATGGCTGCCACCATGGCTGCCACCATGGCTGCCACCATG",
    plant: "ATGGCCACCATGGCCACCATGGCCACCATGGCCACCATGGCCACCATGGCCACCATGGCCACCATGGCCACCATG"
  };

  const handlePredict = () => {
    setError(null);
    setPredictionResult(null);
    const parsed = parseFasta(sequence);
    if (!parsed) {
      setError("Please enter a sequence (FASTA or raw nucleotides)");
      textareaRef.current?.focus();
      return;
    }
    setLoading(true);
    // Brief delay for UX polish; then compute deterministically
    setTimeout(() => {
      const topN = mode === "top1" ? 1 : undefined;
      const result = predictTIS(parsed, selectedSpecies, { threshold, topN });
      setPredictionResult(result);
      setLoading(false);
      toast.success("Prediction completed!");
    }, 400);
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
              />
            )}
          </CardContent>
        </Card>
      </section>

      {/* About (minimal to satisfy assignment when slides are absent) */}
      <section id="about" className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-foreground mb-6 text-center">About This Project</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Highlights & Limitations</CardTitle>
              <CardDescription className="text-muted-foreground">Key takeaways for the presentation</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-foreground/90 space-y-2">
              <div>
                <p className="font-medium">Advantages</p>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>State-of-the-art accuracy across ~60 eukaryotic species</li>
                  <li>Protein language model (ESM‑2) + local context</li>
                  <li>Open web server and public repository</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Disadvantages</p>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Heavy compute for local runs; hosted use preferred</li>
                  <li>Eukaryotes focused; not for prokaryotic genomes</li>
                  <li>Limited interpretability vs rule-based approaches</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">FAIR & Licensing</CardTitle>
              <CardDescription className="text-muted-foreground">Summary for compliance</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-foreground/90 space-y-2">
              <div>
                <p className="font-medium">FAIR</p>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Findable: paper + DOI (BMC Bioinformatics 2025)</li>
                  <li>Accessible: free web server + open repo</li>
                  <li>Interoperable: FASTA input, CSV output</li>
                  <li>Reusable: clear license and documentation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">License</p>
                <p className="text-muted-foreground">Upstream: CC BY‑NC‑ND 4.0 (non‑commercial; no derivatives)</p>
              </div>
            </CardContent>
          </Card>
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



