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
          text: "This was a hard choice, but you thought like a real analyst. Sarah and Mike both had opportunity (they were in the building) and motive/weakness. But in counter-intelligence, you always follow the money. Ben's sudden, large, and unexplained payment (Clue 2) is the strongest piece of hard evidence. His 'casino' story is a common lie to hide payments.",
          isCorrect: true
        };
      case "sarah":
        return {
          title: "Incorrect. (A good guess, but...)",
          text: "Agent Sarah is a classic 'red herring.' She has the strongest motive (anger) and opportunity (she was there). But there is no hard evidence she was paid. The strongest clue is always the money. Agent Ben's sudden $80,000 payment is much more suspicious.",
          isCorrect: false
        };
      case "mike":
        return {
          title: "Incorrect. (A good guess, but...)",
          text: "Agent Mike is a classic 'red herring.' He has the strongest weakness (debt) and opportunity (he was there). But there is no hard evidence he was paid. The strongest clue is always the money. Agent Ben's sudden $80,000 payment is much more suspicious.",
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
          The Mole Hunt
        </h2>
        <p className="text-lg text-foreground max-w-3xl mx-auto">
          Welcome to Counter-Intelligence. A "mole" is a traitor on the inside. You are the Spy Chief. A top-secret file was just leaked. Read the intelligence reports and find the mole. Be careful, analysts who rush to judgment often fail.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        <Card className="p-8 bg-card border-border shadow-neon">
          <h3 className="text-2xl font-bold mb-4 text-primary">The Scenario</h3>
          <p className="text-lg text-foreground leading-relaxed">
            A top-secret file on our satellite program was just leaked to an enemy. The file was stolen from our internal server. We have three suspects and three key pieces of intelligence.
          </p>
        </Card>

        <Card className="p-8 bg-card border-border shadow-neon">
          <h3 className="text-2xl font-bold mb-6 text-primary">The Intelligence Clues</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">1</span>
              </div>
              <p className="text-lg text-foreground">The file was downloaded from the server between 1:00 AM and 3:00 AM on Tuesday.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">2</span>
              </div>
              <p className="text-lg text-foreground">Intelligence suggests the mole received a large, untraceable payment <span className="font-semibold">after</span> the leak.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">3</span>
              </div>
              <p className="text-lg text-foreground">The mole has a strong motive or weakness, like anger, debt, or greed.</p>
            </div>
          </div>
        </Card>

        <div>
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">Who is the <span className="italic">most likely</span> mole?</h3>
          <p className="text-center text-muted-foreground mb-6">You must read all three profiles to find the most likely suspect. Click on a card to make your choice.</p>
          
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
              <div className="text-foreground leading-relaxed space-y-2">
                <p><span className="font-semibold text-primary">Motive:</span> Very angry. Was passed over for a promotion she deserved last month.</p>
                <p><span className="font-semibold text-primary">Activity:</span> Security logs show she was working late on Tuesday. She badged out of the office at <span className="font-semibold">1:30 AM</span>.</p>
              </div>
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
              <div className="text-foreground leading-relaxed space-y-2">
                <p><span className="font-semibold text-accent">Motive:</span> No known motive.</p>
                <p><span className="font-semibold text-accent">Activity:</span> His ex-wife's $80,000 alimony debt was suddenly paid off in full on Wednesday. Ben claims he won the money at a casino.</p>
              </div>
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
              <div className="text-foreground leading-relaxed space-y-2">
                <p><span className="font-semibold text-secondary">Motive:</span> Weakness. Known to have a serious gambling problem and is deep in debt.</p>
                <p><span className="font-semibold text-secondary">Activity:</span> Security logs show he badged <span className="italic">into</span> the office at <span className="font-semibold">2:00 AM</span> on Tuesday, claiming he 'forgot his wallet.'</p>
              </div>
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
          <div className="space-y-6">
            <p className="text-foreground leading-relaxed text-lg">
              {result?.text}
            </p>
            
            <div className="pt-4 border-t border-border">
              <h4 className="text-xl font-bold mb-3 text-primary">Counter-Intelligence: The Other Side of Secrecy</h4>
              <p className="text-foreground leading-relaxed mb-4">
                Finding a mole is called 'counter-intelligence.' This game is based on the real-life case of <span className="font-semibold">Robert Hanssen</span>, an FBI agent who was a mole for Russia for over 20 years. He was caught, in part, by analyzing his finances after he made large, unexplained purchases.
              </p>
              <div className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
                <ExternalLink className="w-5 h-5" />
                <a 
                  href="https://www.fbi.gov/history/famous-cases/robert-hanssen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline"
                >
                  You can read his full story here: FBI: Robert Hanssen
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MoleHunt;
