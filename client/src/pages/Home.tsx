import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dna, Zap, Database, Users, CheckCircle2, XCircle, Globe, Download, Github, ExternalLink, Sparkles, Brain, TrendingUp, Shield, Search, Link as LinkIcon, Repeat, FileText, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
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

  const fairPrinciples = [
    {
      letter: "F",
      title: "Findable",
      color: "text-primary",
      icon: Search,
      items: [
        "Unique DOI: 10.1186/s12859-025-06220-2",
        "Indexed in PubMed, BMC Bioinformatics",
        "Rich metadata in bio.tools registry",
        "Searchable via Google Scholar, PubMed"
      ]
    },
    {
      letter: "A",
      title: "Accessible",
      color: "text-primary",
      icon: Globe,
      items: [
        "Free web server (no registration required)",
        "Open-source GitHub repository",
        "RESTful API available",
        "Clear documentation and examples"
      ]
    },
    {
      letter: "I",
      title: "Interoperable",
      color: "text-primary",
      icon: LinkIcon,
      items: [
        "Standard FASTA input format",
        "CSV output format",
        "Python API for integration",
        "Compatible with bioinformatics pipelines"
      ]
    },
    {
      letter: "R",
      title: "Reusable",
      color: "text-primary",
      icon: Repeat,
      items: [
        "Open-source license",
        "Comprehensive documentation",
        "Reproducible training data available",
        "Version-controlled on GitHub"
      ]
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "Protein Language Model",
      description: "Integrates ESM-2 for assessing coding potential",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Database,
      title: "60 Species Coverage",
      description: "Trained on phylogenetically diverse eukaryotes",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: TrendingUp,
      title: "State-of-the-art",
      description: "Outperforms existing TIS prediction tools",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Zap,
      title: "Fast Prediction",
      description: "Process up to 50 sequences simultaneously",
      color: "bg-primary/10 text-primary"
    }
  ];

  const developers = [
    { name: "Line Sandvad Nielsen", role: "Lead Developer", affiliation: "University of Copenhagen" },
    { name: "Anders Gorm Pedersen", role: "Co-author", affiliation: "DTU Health Tech" },
    { name: "Ole Winther", role: "Co-author", affiliation: "DTU Compute" },
    { name: "Henrik Nielsen", role: "Principal Investigator", affiliation: "DTU Health Tech" }
  ];

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
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="gap-2">
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4" />
                  <span className="hidden sm:inline">Day Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  <span className="hidden sm:inline">Night Mode</span>
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://services.healthtech.dtu.dk/services/NetStart-2.0/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Web Server
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
        <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
          <Sparkles className="w-3 h-3 mr-1" />
          Published in BMC Bioinformatics 2025
        </Badge>
        <h2 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          NetStart 2.0
        </h2>
        <p className="text-xl text-foreground/90 mb-4 max-w-3xl mx-auto">
          Prediction of Eukaryotic Translation Initiation Sites Using a Protein Language Model
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          State-of-the-art deep learning model that integrates ESM-2 protein language model with local sequence context to predict translation initiation sites across 60 phylogenetically diverse eukaryotic species.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <a href="#demo">Try Demo</a>
          </Button>
          <Button size="lg" variant="outline">
            <a href="#fair">FAIR Principles</a>
          </Button>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Key Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="bg-card border-border">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-foreground">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

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

      {/* FAIR Principles */}
      <section id="fair" className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-foreground mb-4 text-center">FAIR Principles Implementation</h3>
        <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          NetStart 2.0 adheres to FAIR (Findable, Accessible, Interoperable, Reusable) data principles, ensuring maximum research impact and reproducibility.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fairPrinciples.map((principle, idx) => (
            <Card key={idx} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-input flex items-center justify-center ${principle.color} text-2xl font-bold`}>
                    {principle.letter}
                  </div>
                  <principle.icon className={`w-6 h-6 ${principle.color}`} />
                </div>
                <CardTitle className="text-foreground">{principle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {principle.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Developers */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Development Team</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {developers.map((dev, idx) => (
            <Card key={idx} className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground text-base">{dev.name}</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">{dev.role}</CardDescription>
                <p className="text-xs text-muted-foreground/70 mt-2">{dev.affiliation}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Badge className="bg-input text-foreground/90 border-border">
            <Shield className="w-3 h-3 mr-1" />
            Technical University of Denmark (DTU) & University of Copenhagen
          </Badge>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Applications & Use Cases</h3>
        <Tabs defaultValue="annotation" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="annotation">Gene Annotation</TabsTrigger>
            <TabsTrigger value="discovery">Protein Discovery</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>
          <TabsContent value="annotation" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Genome Annotation</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Identify correct translation start sites in newly sequenced genomes
                </CardDescription>
              </CardHeader>
              <CardContent className="text-foreground/90">
                <p className="mb-4">
                  NetStart 2.0 helps annotators distinguish true translation initiation sites from false positives, improving the accuracy of gene models in eukaryotic genome projects.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>Identifies main ORF start codons with high accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>Detects upstream ORFs (uORFs) for regulatory analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>Works across 60 phylogenetically diverse species</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="discovery" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Novel Protein Discovery</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Discover alternative translation products and short ORFs
                </CardDescription>
              </CardHeader>
              <CardContent className="text-foreground/90">
                <p className="mb-4">
                  Identify previously unannotated proteins by detecting alternative translation initiation sites and short open reading frames that may encode functional peptides.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>Predicts alternative TIS in protein isoforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>Identifies short ORFs (sORFs) with coding potential</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>Supports ribosome profiling data interpretation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="research" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Translational Research</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Study translation regulation and mutation impacts
                </CardDescription>
              </CardHeader>
              <CardContent className="text-foreground/90">
                <p className="mb-4">
                  Analyze how sequence variations affect translation initiation and understand species-specific differences in start codon recognition.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>Assess mutation impact on translation initiation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>Compare TIS preferences across species</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>Study Kozak sequence context variations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Technical Details */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Technical Architecture</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Model Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground/90">
              <div>
                <p className="text-muted-foreground mb-1">Protein Language Model</p>
                <p>ESM-2 (pretrained on protein sequences)</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Architecture</p>
                <p>Transformer with self-attention mechanism</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Training Data</p>
                <p>9.9M sequences from 60 eukaryotic species</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Performance</p>
                <p>State-of-the-art accuracy (default threshold: 0.625)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Input/Output
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground/90">
              <div>
                <p className="text-muted-foreground mb-1">Input Format</p>
                <p>FASTA (A, C, G, T, U, N allowed)</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Output Format</p>
                <p>CSV with position, probability, peptide length</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Limits</p>
                <p>50 sequences, 1M nucleotides per submission</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Processing</p>
                <p>Sequences kept confidential, deleted after processing</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/80 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Dna className="w-5 h-5" />
              <span className="text-sm">NetStart 2.0 © 2025 DTU Health Tech</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-025-06220-2" target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                  Paper
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://services.healthtech.dtu.dk/services/NetStart-2.0/" target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4 mr-2" />
                  Web Server
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/lsandvad/netstart2" target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
