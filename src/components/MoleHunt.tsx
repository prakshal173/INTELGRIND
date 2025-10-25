import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

type Agent = "sarah" | "ben" | "mike" | null;

const MoleHunt = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(null);

  const getResultContent = (agent: Agent) => {
    switch (agent) {
      case "ben":
        return {
          title: "Correct!",
          text: "Agent Ben's secret cash purchase is the strongest clue. While Agent Sarah had a motive (unhappy) and Agent Mike had a weakness (debt), only Agent Ben showed evidence of receiving a large, unexplained payment—a classic sign of being a paid spy. This game is based on the real-life case of FBI agent Robert Hanssen.",
          isCorrect: true
        };
      case "sarah":
        return {
          title: "Incorrect",
          text: "While Agent Sarah had a motive (unhappy), she didn't show evidence of receiving a payment. The strongest clue was Agent Ben's secret cash purchase. This game is based on the real-life case of FBI agent Robert Hanssen.",
          isCorrect: false
        };
      case "mike":
        return {
          title: "Incorrect",
          text: "While Agent Mike had a weakness (debt), he didn't show evidence of receiving a payment. The strongest clue was Agent Ben's secret cash purchase. This game is based on the real-life case of FBI agent Robert Hanssen.",
          isCorrect: false
        };
      default:
        return null;
    }
  };

  const result = getResultContent(selectedAgent);

  return (
    <section className="py-16 animate-fade-in-up">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Interactive Module 3: The Mole Hunt
        </h2>
        <p className="text-lg text-foreground max-w-3xl mx-auto">
          Sometimes, the biggest secret is a person. In spy agencies, a "mole" is a traitor on the inside. You are the Spy Chief. Read the clues and find the mole in your agency.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        <Card className="p-8 bg-card border-border shadow-neon">
          <h3 className="text-2xl font-bold mb-4 text-primary">The Scenario</h3>
          <p className="text-lg text-foreground leading-relaxed">
            A top-secret file on our satellite program was just leaked to an enemy. The leak had to come from one of these three agents. We have gathered some clues.
          </p>
        </Card>

        <Card className="p-8 bg-card border-border shadow-neon">
          <h3 className="text-2xl font-bold mb-6 text-primary">The Clues</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">1</span>
              </div>
              <p className="text-lg text-foreground">The mole recently made a large, secret cash purchase.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">2</span>
              </div>
              <p className="text-lg text-foreground">The mole has been complaining about being passed over for a promotion.</p>
            </div>
          </div>
        </Card>

        <div>
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">Who is the most likely mole?</h3>
          <p className="text-center text-muted-foreground mb-6">Click on a suspect to make your choice</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card 
              className="p-6 bg-card border-border hover:border-primary hover:shadow-glow transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => setSelectedAgent("sarah")}
            >
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl font-bold text-primary">S</span>
                </div>
                <h4 className="text-xl font-bold text-primary">Agent Sarah</h4>
              </div>
              <p className="text-foreground leading-relaxed">
                Top of her class. Ambitious, but was recently passed over for a promotion. Lives in a small apartment.
              </p>
            </Card>

            <Card 
              className="p-6 bg-card border-border hover:border-accent hover:shadow-glow transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => setSelectedAgent("ben")}
            >
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl font-bold text-accent">B</span>
                </div>
                <h4 className="text-xl font-bold text-accent">Agent Ben</h4>
              </div>
              <p className="text-foreground leading-relaxed">
                A quiet, reliable analyst. Never complains, but also just bought a new luxury sports car in cash. Said it was a 'family inheritance.'
              </p>
            </Card>

            <Card 
              className="p-6 bg-card border-border hover:border-secondary hover:shadow-glow transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => setSelectedAgent("mike")}
            >
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl font-bold text-secondary">M</span>
                </div>
                <h4 className="text-xl font-bold text-secondary">Agent Mike</h4>
              </div>
              <p className="text-foreground leading-relaxed">
                A bit of a gambler. Openly complains about his low pay, but his finances show he is in debt.
              </p>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className={`text-3xl ${result?.isCorrect ? 'text-primary' : 'text-destructive'}`}>
              {result?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed text-lg">
              {result?.text}
            </p>
            <div className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
              <ExternalLink className="w-5 h-5" />
              <a 
                href="https://www.fbi.gov/history/famous-cases/robert-hanssen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline"
              >
                Read more about Robert Hanssen
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MoleHunt;
