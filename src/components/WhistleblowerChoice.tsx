import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";

const WhistleblowerChoice = () => {
  const [revealedChoice, setRevealedChoice] = useState<'stay' | 'expose' | null>(null);

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          The Whistleblower's Choice
        </h2>
        <p className="text-muted-foreground">Two paths. Different consequences.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          <Button
            onClick={() => setRevealedChoice(revealedChoice === 'stay' ? null : 'stay')}
            className="w-full h-auto py-8 bg-muted hover:bg-muted/80 text-foreground border-2 border-border hover:border-primary transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-4">
              <Shield className="w-12 h-12 text-primary" />
              <span className="text-xl font-bold">Stay Silent</span>
            </div>
          </Button>

          {revealedChoice === 'stay' && (
            <Card className="p-6 bg-card border-primary animate-fade-in-up space-y-4">
              <h4 className="font-bold text-lg text-primary">Consequences of Silence</h4>
              <ul className="space-y-3 text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Keep your security clearance and career advancement</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Maintain your pension and government benefits</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Avoid legal prosecution and imprisonment</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive">•</span>
                  <span className="text-destructive">Live with the knowledge that illegal programs continue</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive">•</span>
                  <span className="text-destructive">Citizens remain unaware of violations of their rights</span>
                </li>
              </ul>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Button
            onClick={() => setRevealedChoice(revealedChoice === 'expose' ? null : 'expose')}
            className="w-full h-auto py-8 bg-muted hover:bg-muted/80 text-foreground border-2 border-border hover:border-destructive transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-4">
              <AlertTriangle className="w-12 h-12 text-destructive" />
              <span className="text-xl font-bold">Expose the Truth</span>
            </div>
          </Button>

          {revealedChoice === 'expose' && (
            <Card className="p-6 bg-card border-destructive animate-fade-in-up space-y-4">
              <h4 className="font-bold text-lg text-destructive">Consequences of Disclosure</h4>
              <ul className="space-y-3 text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-secondary">•</span>
                  <span className="text-secondary">Inform the public about illegal surveillance programs</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary">•</span>
                  <span className="text-secondary">Spark global debate about privacy and security</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary">•</span>
                  <span className="text-secondary">Potentially change policy and increase oversight</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive">•</span>
                  <span className="text-destructive">Face prosecution under the Espionage Act</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive">•</span>
                  <span className="text-destructive">Live in exile, separated from family and country</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive">•</span>
                  <span className="text-destructive">Become labeled as a traitor by some, hero by others</span>
                </li>
              </ul>
            </Card>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12">
        <Card className="p-8 bg-muted/20 border-border">
          <p className="text-center text-lg leading-relaxed">
            This is the real choice faced by whistleblowers like Edward Snowden, Chelsea Manning, and Daniel Hale. 
            There is no easy answer, only <span className="font-semibold text-primary">difficult decisions</span> with 
            profound <span className="font-semibold text-destructive">personal consequences</span>.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default WhistleblowerChoice;
