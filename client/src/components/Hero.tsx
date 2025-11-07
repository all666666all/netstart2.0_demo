import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface HeroProps {
  authors: string[];
}

export function Hero({ authors }: HeroProps) {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <Badge className="mb-4 bg-primary/15 text-primary border-primary/20">BINF3020 Group Presentation</Badge>
      <h2 className="text-5xl font-bold text-foreground mb-3">NetStart 2.0</h2>
      <p className="text-base text-foreground/90 mb-8">Authors: {authors.join(" · ")}</p>
      <div className="flex gap-4 justify-center">
        <Button size="lg" className="bg-primary hover:bg-primary/90 active:scale-[0.98] transition">
          <a href="#demo">Try Demo</a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a
            href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-025-06220-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="w-4 h-4 mr-2" /> Paper
          </a>
        </Button>
      </div>
    </section>
  );
}

