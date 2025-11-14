import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ResultsChart from "@/components/ResultsChart";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [pollData, setPollData] = useState({ changedCount: 0, sameCount: 0 });
  const [hasCompletedJourney, setHasCompletedJourney] = useState(false);

  useEffect(() => {
    // Fetch aggregated poll data from Supabase
    const fetchPollData = async () => {
      const { data, error } = await supabase
        .from('poll_results' as any)
        .select('perspective_changed');
      
      if (error) {
        console.error('Error fetching poll data:', error);
      } else if (data) {
        const changedCount = data.filter((r: any) => r.perspective_changed).length;
        const sameCount = data.filter((r: any) => !r.perspective_changed).length;
        setPollData({ changedCount, sameCount });
      }
    };

    fetchPollData();
    
    // Check if user has completed the journey
    const beforeAnswers = localStorage.getItem('beforeAnswers');
    const afterAnswers = localStorage.getItem('afterAnswers');
    const completedModules = localStorage.getItem('completedModules');
    
    if (beforeAnswers && afterAnswers && completedModules === 'all') {
      setHasCompletedJourney(true);
    }
  }, []);

  const handleBeginAssessment = () => {
    // Reset journey
    localStorage.removeItem('beforeAnswers');
    localStorage.removeItem('afterAnswers');
    localStorage.removeItem('completedModules');
    navigate('/before-questions');
  };

  const handleReviewModules = () => {
    navigate('/training-hub');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNjIsIDg5LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              INTELGRID OPS CENTER
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Intelligence Training Simulation
          </p>
        </div>

        {/* Main Dashboard Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {!hasCompletedJourney ? (
            // First time view - Welcome interface
            <Card className="p-12 bg-card/50 backdrop-blur-sm border-border shadow-large hover:shadow-neon transition-all duration-500">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/40 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary animate-pulse" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold">Welcome, Analyst</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  You are about to enter a classified intelligence training simulation. 
                  This assessment will test your analytical skills across three operational domains: 
                  OSINT, SIGINT, and CYBINT.
                </p>

                <div className="pt-6">
                  <Button 
                    onClick={handleBeginAssessment}
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-neon transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
                  >
                    Begin Assessment
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <>
              {/* Completed journey view */}
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/30 shadow-large">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-primary">Assessment Complete</h2>
                  <p className="text-muted-foreground text-lg">
                    Your analytical performance has been recorded. Review your results below.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 pt-6">
                    <Button 
                      onClick={handleBeginAssessment}
                      variant="outline"
                      size="lg"
                      className="w-full py-6 text-lg border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                    >
                      Start New Assessment
                    </Button>
                    
                    <Button 
                      onClick={handleReviewModules}
                      variant="outline"
                      size="lg"
                      className="w-full py-6 text-lg border-accent/30 hover:bg-accent/10 hover:border-accent transition-all duration-300"
                    >
                      Review Training Modules
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Results Chart - Shows after completion */}
              <div className="animate-fade-in">
                <ResultsChart data={pollData} />
              </div>
            </>
          )}
        </div>

        {/* Status Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-muted-foreground font-mono">SYSTEM ONLINE</span>
              </div>
              <div className="text-muted-foreground font-mono">
                CLEARANCE: TOP SECRET
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
