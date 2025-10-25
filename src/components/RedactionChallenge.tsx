import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const RedactionChallenge = () => {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="py-16 animate-fade-in-up">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Interactive Module 2: The Redaction Challenge
        </h2>
        <p className="text-lg text-foreground max-w-3xl mx-auto">
          Governments can control a story by hiding just a few key words. This is called <span className="font-semibold text-primary">redaction</span>. Read the official report below and make your judgment.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto p-8 bg-card border-border shadow-neon">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">Step 1: The Redacted Document</h3>
          
          <div className="bg-muted/30 p-8 rounded-lg border-2 border-border font-mono text-foreground leading-relaxed">
            <div className="text-center mb-4 text-destructive font-bold">DECLASSIFIED FIELD REPORT</div>
            <div className="space-y-4">
              <p>
                The operation{!revealed && <span className="inline-block bg-black text-black mx-1 px-8 select-none transition-all duration-700">hidden</span>}{revealed && <span className="inline-block mx-1 text-destructive font-semibold animate-fade-in">, which was based on faulty intelligence,</span>} resulted in{!revealed && <span className="inline-block bg-black text-black mx-1 px-8 select-none transition-all duration-700">hidden</span>}{revealed && <span className="inline-block mx-1 text-primary font-semibold animate-fade-in"> only minor damage to</span>} the elimination of the target. There were{!revealed && <span className="inline-block bg-black text-black mx-1 px-6 select-none transition-all duration-700">hidden</span>}{revealed && <span className="inline-block mx-1 text-destructive font-semibold animate-fade-in"> 12 confirmed</span>} civilian casualties{!revealed && <span className="inline-block bg-black text-black mx-1 px-12 select-none transition-all duration-700">hidden</span>}{revealed && <span className="inline-block mx-1 text-destructive font-semibold animate-fade-in">, including three children.</span>} The mission was{!revealed && <span className="inline-block bg-black text-black mx-1 px-6 select-none transition-all duration-700">hidden</span>}{revealed && <span className="inline-block mx-1 text-destructive font-semibold animate-fade-in"> not</span>} a success.
              </p>
            </div>
          </div>
        </div>

        {!revealed && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-center text-primary">Step 2: Based on this official report, what was the outcome?</h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => setRevealed(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-105"
              >
                It was a success.
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => setRevealed(true)}
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground shadow-glow transition-all duration-300 hover:scale-105"
              >
                The outcome is unclear.
              </Button>
            </div>
          </div>
        )}

        {revealed && (
          <div className="space-y-8 animate-fade-in">
            <Card className="p-6 bg-destructive/10 border-destructive">
              <h3 className="text-2xl font-bold mb-4 text-destructive">How Secrecy Creates a Lie</h3>
              <p className="text-foreground leading-relaxed mb-4">
                Notice how by hiding just 8 words, a report about a <span className="font-semibold text-destructive">failure</span> was changed to look like a <span className="font-semibold text-primary">success</span>. This is a real technique used to control information. A story can be 100% 'truthful' but still be a complete lie if the right context is hidden.
              </p>
              <div className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
                <ExternalLink className="w-5 h-5" />
                <a 
                  href="https://www.archives.gov/research/jfk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline"
                >
                  You can see real-world examples in heavily redacted government files, like the JFK Assassination records
                </a>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </section>
  );
};

export default RedactionChallenge;
