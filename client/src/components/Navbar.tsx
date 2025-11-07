import { Button } from "@/components/ui/button";
import { Dna, FileText, Github, Info } from "lucide-react";

export function Navbar() {
  return (
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
            <a href="#about">
              <Info className="w-4 h-4 mr-2" />
              About
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-025-06220-2"
              target="_blank"
              rel="noopener noreferrer"
            >
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
  );
}
