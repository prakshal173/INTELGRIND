import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SecretOperation = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          The Secret Operation
        </h2>
        <p className="text-muted-foreground">The Drone Papers: Official Story vs. Real Impact</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-muted-foreground" />
            <h3 className="text-2xl font-bold">Official Story</h3>
          </div>
          
          <div className="space-y-4 text-foreground">
            <p className="leading-relaxed">
              <span className="font-semibold text-primary">"Precision strikes"</span> targeting high-value terrorist targets with minimal collateral damage.
            </p>
            
            <p className="leading-relaxed">
              Advanced intelligence and surveillance capabilities ensure accurate target identification.
            </p>
            
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
              "We only strike when we have near-certainty of no civilian casualties."
            </blockquote>
            
            <p className="leading-relaxed">
              Operations conducted with extensive oversight and adherence to international law.
            </p>
          </div>
        </Card>

        <Card className="p-8 bg-card border-border hover:border-destructive/50 transition-all duration-300 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <h3 className="text-2xl font-bold">Real Impact</h3>
          </div>
          
          <div className="space-y-4 text-foreground">
            <p className="leading-relaxed">
              <span className="font-semibold text-destructive">Nearly 90%</span> of people killed in drone strikes were not the intended targets.
            </p>
            
            <p className="leading-relaxed">
              Intelligence often relied on unreliable metadata and flawed targeting mechanisms.
            </p>
            
            <blockquote className="border-l-4 border-destructive pl-4 italic text-muted-foreground">
              "We had no idea who most of the people we killed were." - Former drone operator
            </blockquote>
            
            <p className="leading-relaxed">
              Thousands of civilian casualties, including children, with minimal accountability.
            </p>
            
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Source: The Drone Papers, The Intercept (2015)
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <Card className="p-8 bg-muted/20 border-border">
          <p className="text-center text-lg leading-relaxed">
            The classified documents revealed a stark disconnect between public statements and operational reality. 
            The program operated with <span className="font-semibold text-primary">minimal oversight</span>, relying on 
            unreliable intelligence that led to the deaths of <span className="font-semibold text-destructive">thousands of innocent people</span>.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default SecretOperation;
