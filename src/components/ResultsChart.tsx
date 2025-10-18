import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ResultsChartProps {
  data: {
    changedCount: number;
    sameCount: number;
  };
}

const ResultsChart = ({ data }: ResultsChartProps) => {
  const total = data.changedCount + data.sameCount;
  const changedPercentage = total > 0 ? (data.changedCount / total) * 100 : 0;
  const samePercentage = total > 0 ? (data.sameCount / total) * 100 : 0;

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Live Results
        </h2>
        <p className="text-muted-foreground">See how perspectives are shifting in real-time</p>
        <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-secondary/20 rounded-full">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-glow" />
          <span className="text-sm font-medium text-secondary">LIVE</span>
        </div>
      </div>

      <Card className="max-w-4xl mx-auto p-8 bg-card border-border shadow-large">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-secondary" />
                <span className="font-semibold text-lg">Perspective Changed</span>
              </div>
              <span className="text-2xl font-bold text-secondary">
                {data.changedCount} <span className="text-sm text-muted-foreground">({changedPercentage.toFixed(1)}%)</span>
              </span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-secondary to-secondary/80 transition-all duration-1000 ease-out"
                style={{ width: `${changedPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <span className="font-semibold text-lg">Same Perspective</span>
              </div>
              <span className="text-2xl font-bold text-primary">
                {data.sameCount} <span className="text-sm text-muted-foreground">({samePercentage.toFixed(1)}%)</span>
              </span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-1000 ease-out"
                style={{ width: `${samePercentage}%` }}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <p className="text-center text-muted-foreground">
              <span className="font-semibold text-foreground">{total}</span> total participants
            </p>
          </div>
        </div>
      </Card>

      <div className="max-w-3xl mx-auto mt-8">
        <Card className="p-6 bg-muted/20 border-border">
          <p className="text-center leading-relaxed">
            {total === 0 ? (
              "Be the first to complete the journey and see how your perspective compares to others."
            ) : changedPercentage > 50 ? (
              <>The majority of participants have experienced a <span className="font-semibold text-secondary">shift in perspective</span> after learning about government secrecy.</>
            ) : (
              "Thank you for participating. Every perspective contributes to our understanding."
            )}
          </p>
        </Card>
      </div>
    </section>
  );
};

export default ResultsChart;
