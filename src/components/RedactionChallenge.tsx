import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type GameState = "intro" | "case1" | "case1-revealed" | "case2" | "case2-revealed" | "complete";

const RedactionChallenge = () => {
  const [gameState, setGameState] = useState<GameState>("intro");

  const scrollToNextModule = () => {
    document.getElementById('mole-hunt')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 animate-fade-in-up">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          The Redaction Challenge
        </h2>
      </div>

      {/* INTRO STATE */}
      {gameState === "intro" && (
        <Card className="max-w-4xl mx-auto p-8 bg-card border-border shadow-neon animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">How to Play: The Redaction Challenge</h3>
          <p className="text-lg text-foreground leading-relaxed mb-8">
            Governments can control a story by hiding just a few key words. This is called <span className="font-semibold text-primary">redaction</span>. You will see two "declassified" reports. Read the incomplete text and make your judgment. After you choose, the hidden words will be revealed. Click "Start Game" to begin.
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg"
              onClick={() => setGameState("case1")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-105"
            >
              Start Game
            </Button>
          </div>
        </Card>
      )}

      {/* CASE 1 - INITIAL STATE */}
      {gameState === "case1" && (
        <Card className="max-w-4xl mx-auto p-8 bg-card border-border shadow-neon animate-fade-in">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">Case 01: The Field Report</h3>
            <p className="text-lg text-foreground text-center mb-6">Read the official report below and make your judgment.</p>
            
            <div className="bg-muted/30 p-8 rounded-lg border-2 border-border font-mono text-foreground leading-relaxed">
              <div className="text-center mb-4 text-destructive font-bold">DECLASSIFIED FIELD REPORT</div>
              <div className="space-y-4">
                <p>
                  The operation<span className="inline-block bg-black text-black mx-1 px-8 select-none">hidden</span>resulted in<span className="inline-block bg-black text-black mx-1 px-8 select-none">hidden</span>the elimination of the target. There were<span className="inline-block bg-black text-black mx-1 px-6 select-none">hidden</span>civilian casualties<span className="inline-block bg-black text-black mx-1 px-12 select-none">hidden</span>The mission was a success.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-primary">Based on this official report, what was the outcome?</h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => setGameState("case1-revealed")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-105"
              >
                It was a success.
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => setGameState("case1-revealed")}
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground shadow-glow transition-all duration-300 hover:scale-105"
              >
                The outcome is unclear.
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* CASE 1 - REVEALED STATE */}
      {gameState === "case1-revealed" && (
        <Card className="max-w-4xl mx-auto p-8 bg-card border-border shadow-neon animate-fade-in">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">Case 01: The Field Report - Revealed</h3>
            
            <div className="bg-muted/30 p-8 rounded-lg border-2 border-border font-mono text-foreground leading-relaxed">
              <div className="text-center mb-4 text-destructive font-bold">DECLASSIFIED FIELD REPORT</div>
              <div className="space-y-4">
                <p>
                  The operation<span className="inline-block mx-1 text-destructive font-semibold animate-fade-in">, which was based on faulty intelligence,</span> resulted in<span className="inline-block mx-1 text-primary font-semibold animate-fade-in"> only minor damage to</span> the elimination of the target. There were<span className="inline-block mx-1 text-destructive font-semibold animate-fade-in"> 12 confirmed</span> civilian casualties<span className="inline-block mx-1 text-destructive font-semibold animate-fade-in">, including three children.</span> The mission was<span className="inline-block mx-1 text-destructive font-semibold animate-fade-in"> not</span> a success.
                </p>
              </div>
            </div>
          </div>

          <Card className="p-6 bg-destructive/10 border-destructive mb-6">
            <h3 className="text-2xl font-bold mb-4 text-destructive">How Secrecy Creates a Lie</h3>
            <p className="text-foreground leading-relaxed mb-4">
              Notice how by hiding just 8 words, a report about a <span className="font-semibold text-destructive">failure</span> was changed to look like a <span className="font-semibold text-primary">success</span>. This is a real technique used to control information.
            </p>
            <div className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
              <ExternalLink className="w-5 h-5" />
              <a 
                href="https://www.archives.gov/research/jfk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline"
              >
                You can see real-world examples of this in heavily redacted government files, like the JFK Assassination records
              </a>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button 
              size="lg"
              onClick={() => setGameState("case2")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-105"
            >
              Continue to Case 02
            </Button>
          </div>
        </Card>
      )}

      {/* CASE 2 - INITIAL STATE */}
      {gameState === "case2" && (
        <Card className="max-w-4xl mx-auto p-8 bg-card border-border shadow-neon animate-fade-in">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">Case 02: The Surveillance Memo</h3>
            <p className="text-lg text-foreground text-center mb-6">Sometimes, redaction is used to hide <span className="font-semibold italic">who</span> is being spied on. Read this memo and make your judgment.</p>
            
            <div className="bg-muted/30 p-8 rounded-lg border-2 border-border font-mono text-foreground leading-relaxed">
              <div className="text-center mb-4 text-destructive font-bold">MEMORANDUM FOR THE DIRECTOR</div>
              <div className="text-center mb-2 font-bold">SUBJECT: Surveillance Operations</div>
              <div className="space-y-4 mt-6">
                <p>
                  Our investigation into<span className="inline-block bg-black text-black mx-1 px-12 select-none">hidden</span>threats<span className="inline-block bg-black text-black mx-1 px-8 select-none">hidden</span>has been successful. We are monitoring the communications of<span className="inline-block bg-black text-black mx-1 px-8 select-none">hidden</span>all key subjects<span className="inline-block bg-black text-black mx-1 px-16 select-none">hidden</span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-primary">Based on this memo, who is being spied on?</h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => setGameState("case2-revealed")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-105"
              >
                Foreign threats.
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => setGameState("case2-revealed")}
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground shadow-glow transition-all duration-300 hover:scale-105"
              >
                It's impossible to tell.
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* CASE 2 - REVEALED STATE */}
      {gameState === "case2-revealed" && (
        <Card className="max-w-4xl mx-auto p-8 bg-card border-border shadow-neon animate-fade-in">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">Case 02: The Surveillance Memo - Revealed</h3>
            
            <div className="bg-muted/30 p-8 rounded-lg border-2 border-border font-mono text-foreground leading-relaxed">
              <div className="text-center mb-4 text-destructive font-bold">MEMORANDUM FOR THE DIRECTOR</div>
              <div className="text-center mb-2 font-bold">SUBJECT: Surveillance Operations</div>
              <div className="space-y-4 mt-6">
                <p>
                  Our investigation into<span className="inline-block mx-1 text-destructive font-semibold animate-fade-in"> domestic political</span> threats<span className="inline-block mx-1 text-destructive font-semibold animate-fade-in">, not foreign,</span> has been successful. We are monitoring the communications of<span className="inline-block mx-1 text-destructive font-semibold animate-fade-in"> citizens</span> all key subjects<span className="inline-block mx-1 text-destructive font-semibold animate-fade-in"> inside our own country.</span>
                </p>
              </div>
            </div>
          </div>

          <Card className="p-6 bg-destructive/10 border-destructive mb-6">
            <h3 className="text-2xl font-bold mb-4 text-destructive">Hiding the Real Target</h3>
            <p className="text-foreground leading-relaxed mb-4">
              By hiding just 8 words, a report about spying on its <span className="font-semibold text-destructive">own citizens</span> was changed to look like a normal report on <span className="font-semibold text-primary">foreign</span> threats. This is how redaction can be used to hide illegal or controversial programs.
            </p>
            <div className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
              <ExternalLink className="w-5 h-5" />
              <a 
                href="https://www.theguardian.com/us-news/the-nsa-files" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline"
              >
                Read about real-life examples of domestic surveillance in The Snowden Leaks files
              </a>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button 
              size="lg"
              onClick={() => setGameState("complete")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-105"
            >
              Finish Module
            </Button>
          </div>
        </Card>
      )}

      {/* COMPLETE STATE */}
      {gameState === "complete" && (
        <Card className="max-w-4xl mx-auto p-8 bg-card border-border shadow-neon animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">Module Complete</h3>
          <p className="text-lg text-foreground text-center mb-8">
            You have seen how redaction can change a failure into a "success" and hide the real targets of an investigation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setGameState("intro")}
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground shadow-glow transition-all duration-300 hover:scale-105"
            >
              Reset This Module
            </Button>
            <Button 
              size="lg"
              onClick={scrollToNextModule}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-105"
            >
              Continue to the Next Module
            </Button>
          </div>
        </Card>
      )}
    </section>
  );
};

export default RedactionChallenge;
