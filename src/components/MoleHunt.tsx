import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

type Agent = "sarah" | "ben" | "mike" | null;

const MoleHunt = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(null);

  const getResultContent = (agent: Agent) => {
    switch (agent) {
      case "mike":
        return {
          title: "Correct.",
          text: "You looked past the obvious clues. Sarah's anger and Ben's debt are classic vulnerabilities, but Mike's secret trips are the strongest anomaly. Unexplained foreign travel is a huge red flag. It's the only clue that points to a \"secret life\" that an enemy could truly exploit for high-level blackmail (Clue 2).",
          isCorrect: true
        };
      case "sarah":
        return {
          title: "Incorrect. (The Obvious Trap)",
          text: "Agent Sarah is the most \"obvious\" suspect, which is why she's the perfect red herring. Her anger (Clue 3) is public, not secret. A good spy chief knows that the agent who looks the guiltiest is often just the unhappiest. Her \"nervous calls\" were likely just her complaining about her job.",
          isCorrect: false
        };
      case "ben":
        return {
          title: "Incorrect. (A Logical Guess)",
          text: "A gambling debt is a classic \"red herring.\" While debt (Clue 2) is a real vulnerability, it's also a common and often manageable problem. It's a plausible motive, but in this case, it's not the strongest evidence. Look closer at the other files.",
          isCorrect: false
        };
      default:
        return null;
    }
  };

  const result = getResultContent(selectedAgent);

  return (
    <section id="mole-hunt" className="py-16 animate-fade-in-up">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          The Mole Hunt
        </h2>
        <p className="text-lg text-foreground max-w-3xl mx-auto">
          Welcome to Counter-Intelligence. Finding a mole is the hardest job in a spy agency. You are the Spy Chief. A top-secret file was just leaked. Read the intelligence reports carefully. The clues may be conflicting. Your job is to find the mole.
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
              <p className="text-lg text-foreground"><span className="font-semibold">Clue 1 (The Method):</span> The file was downloaded on Tuesday at 2:15 AM from an office terminal. All three suspects were working late and were in the building at this time.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">2</span>
              </div>
              <p className="text-lg text-foreground"><span className="font-semibold">Clue 2 (The Motive):</span> Intercepted enemy chatter suggests the mole was not paid, but was <span className="font-semibold">coerced</span> (blackmailed) into cooperating. The intel suggests the mole has a "secret vulnerability" to hide.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">3</span>
              </div>
              <p className="text-lg text-foreground"><span className="font-semibold">Clue 3 (The Observation):</span> An anonymous note left on your desk says one of the agents has been "acting nervous" for weeks, "making strange, quiet calls" in the hallway.</p>
            </div>
          </div>
        </Card>

        <div>
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">All three suspects are plausible. Who is the mole?</h3>
          <p className="text-center text-muted-foreground mb-6">You must read all three profiles to find the most likely suspect. Remember the clues. Click on a card to make your choice.</p>
          
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
              <div className="text-foreground leading-relaxed space-y-3">
                <p className="text-sm"><span className="font-semibold text-primary">Profile:</span> Our best codebreaker. Very ambitious and was furious after being passed over for a promotion last month. She has a strong <span className="font-semibold">ego</span> and <span className="font-semibold">motive for revenge</span>.</p>
                <p className="text-sm"><span className="font-semibold text-primary">Notes:</span> She fits <span className="font-semibold">Clue 3</span> perfectly. She has been seen making "angry, quiet calls" (likely to her family or friends, complaining) and has been "nervous" and upset around the office.</p>
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
              <div className="text-foreground leading-relaxed space-y-3">
                <p className="text-sm"><span className="font-semibold text-accent">Profile:</span> A quiet, reliable analyst. He is a model employee, but a deep financial check shows he has a hidden <span className="font-semibold">gambling debt</span> of $90,000.</p>
                <p className="text-sm"><span className="font-semibold text-accent">Notes:</span> He has a classic <span className="font-semibold">vulnerability</span> for blackmail (Clue 2). An enemy could have discovered his debt and threatened to expose him, forcing him to cooperate.</p>
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
              <div className="text-foreground leading-relaxed space-y-3">
                <p className="text-sm"><span className="font-semibold text-secondary">Profile:</span> A mid-level agent with top-level access. He is happily married with two kids. His record is perfect, <span className="italic">but</span> travel records show 3 unexplained weekend trips to Geneva in the last six months.</p>
                <p className="text-sm"><span className="font-semibold text-secondary">Notes:</span> He has no known motive. However, the Geneva trips are a major anomaly. This could be where he is meeting someone (like a secret family or a handler), which is a "secret vulnerability" that fits <span className="font-semibold">Clue 2</span> perfectly.</p>
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
                This puzzle was hard because you had to decide which clue was most important. Real-life counter-intelligence is not about finding one "smoking gun," but about finding the <span className="font-semibold">anomaly</span>—the one piece of data that doesn't fit. This is based on real-life spy cases like <span className="font-semibold">Robert Hanssen</span>, whose secret activities went unnoticed for years because he seemed like a normal, if unhappy, agent.
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
