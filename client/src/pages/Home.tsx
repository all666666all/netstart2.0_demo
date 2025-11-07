import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dna, Zap, CheckCircle2, XCircle, Github, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [sequence, setSequence] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("h_sapiens");
  const [predictionResult, setPredictionResult] = useState<any>(null);

  const exampleSequences = {
    human: "ATGGCTAGCGCCACCATGGCTAGCGCCACCATGGCTAGCGCCACCATGGCTAGCGCCACCATGGCTAGCGCCACCATG",
    mouse: "ATGGCTGCCACCATGGCTGCCACCATGGCTGCCACCATGGCTGCCACCATGGCTGCCACCATGGCTGCCACCATG",
    plant: "ATGGCCACCATGGCCACCATGGCCACCATGGCCACCATGGCCACCATGGCCACCATGGCCACCATGGCCACCATG"
  };

  const handlePredict = () => {
    if (!sequence) {
      toast.error("Please enter a sequence");
      return;
    }
    
    // Simulate prediction
    const atgPositions = [];
    for (let i = 0; i < sequence.length - 2; i++) {
      if (sequence.substring(i, i + 3).toUpperCase() === "ATG") {
        atgPositions.push({
          position: i,
          probability: Math.random() * 0.5 + 0.5,
          peptideLength: Math.floor(Math.random() * 200) + 50
        });
      }
    }
    
    setPredictionResult({
      species: selectedSpecies,
      atgCount: atgPositions.length,
      predictions: atgPositions.sort((a, b) => b.probability - a.probability)
    });
    
    toast.success("Prediction completed!");
  };

  // Simplified content for assignment landing page

  const groupAuthors = ["Chengzong Guo", "Dingyi Cao"]; // assignment authors

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Dna className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">NetStart 2.0</h1>
              <p className="text-xs text-muted-foreground">Translation Initiation Site Prediction</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-025-06220-2" target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-2" />
                Paper
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/lsandvad/netstart2" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 bg-primary/15 text-primary border-primary/20">BINF3020 Group Presentation</Badge>
        <h2 className="text-5xl font-bold text-foreground mb-3">NetStart 2.0</h2>
        <p className="text-base text-foreground/90 mb-8">Authors: {groupAuthors.join(" · ")}</p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <a href="#demo">Try Demo</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-025-06220-2" target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4 mr-2" /> Paper
            </a>
          </Button>
        </div>
      </section>

      {/* (Key Features removed for simplicity) */}

      {/* Interactive Demo */}
      <section id="demo" className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Interactive TIS Prediction Demo</h3>
        <Card className="bg-card border-border max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-foreground">Simulate Translation Initiation Site Prediction</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter a nucleotide sequence or use an example to see how NetStart 2.0 identifies potential translation start sites
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <label className="text-sm text-foreground/90 mb-2 block">Nucleotide Sequence (FASTA format)</label>
              <Textarea
                value={sequence}
                onChange={(e) => setSequence(e.target.value)}
                placeholder="Enter sequence (A, T, G, C)..."
                className="bg-input border-border text-foreground font-mono h-32"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setSequence(exampleSequences.human)} variant="outline" size="sm">
                Example: Human
              </Button>
              <Button onClick={() => setSequence(exampleSequences.mouse)} variant="outline" size="sm">
                Example: Mouse
              </Button>
              <Button onClick={() => setSequence(exampleSequences.plant)} variant="outline" size="sm">
                Example: Plant
              </Button>
            </div>

            <Button onClick={handlePredict} className="w-full bg-primary hover:bg-primary/90">
              <Zap className="w-4 h-4 mr-2" />
              Predict TIS
            </Button>

            {predictionResult && (
              <div className="mt-6 p-4 bg-input rounded-lg border border-border">
                <h4 className="text-foreground font-semibold mb-3">Prediction Results</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground/90">
                    <span className="text-muted-foreground">Species:</span> {predictionResult.species}
                  </p>
                  <p className="text-foreground/90">
                    <span className="text-muted-foreground">ATG codons found:</span> {predictionResult.atgCount}
                  </p>
                  <div className="mt-4">
                    <p className="text-muted-foreground mb-2">Top Predictions:</p>
                    <div className="space-y-2">
                      {predictionResult.predictions.slice(0, 3).map((pred: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-foreground/90">Position {pred.position}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-primary font-mono">{(pred.probability * 100).toFixed(1)}%</span>
                            {pred.probability > 0.625 ? (
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
              </div>
            )}
          </CardContent>
        </Card>
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
              <span className="text-sm">NetStart 2.0 • Authors: {groupAuthors.join(" · ")}</span>
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
