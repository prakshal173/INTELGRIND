import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ResultsChart from "@/components/ResultsChart";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-abstract.jpg";

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
    
    // Set up real-time subscription for poll_results
    const channel = supabase
      .channel('poll-results-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'poll_results'
        },
        () => {
          // Refetch data when new results are inserted
          fetchPollData();
        }
      )
      .subscribe();
    
    // Check if user has completed the journey
    const beforeAnswers = localStorage.getItem('beforeAnswers');
    const afterAnswers = localStorage.getItem('afterAnswers');
    const completedModules = localStorage.getItem('completedModules');
    
    // Only show completed state if all three are present AND have valid data
    if (beforeAnswers && afterAnswers && completedModules === 'all') {
      try {
        const beforeData = JSON.parse(beforeAnswers);
        const afterData = JSON.parse(afterAnswers);
        // Verify the data is actually valid (not empty objects)
        if (beforeData && Object.keys(beforeData).length > 0 && 
            afterData && Object.keys(afterData).length > 0) {
          setHasCompletedJourney(true);
        } else {
          // Clear invalid data
          localStorage.removeItem('beforeAnswers');
          localStorage.removeItem('afterAnswers');
          localStorage.removeItem('completedModules');
        }
      } catch (e) {
        // If parsing fails, clear everything
        localStorage.removeItem('beforeAnswers');
        localStorage.removeItem('afterAnswers');
        localStorage.removeItem('completedModules');
      }
    }

    return () => {
      supabase.removeChannel(channel);
    };
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
    <div className="min-h-screen bg-background relative">
      {/* Hero Background Image */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iaHNsKDE4OCAxMDAlIDYyJSAvIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-6 animate-fade-in">
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-widest font-mono">
            <span className="text-primary">
              INTELGRID
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-mono">
            Cyber Intelligence Training Platform
          </p>

          <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Welcome to INTELGRID. The following modules are live simulations designed to test your skills and challenge your current analytical judgment.
          </p>

          <div className="inline-block px-6 py-3 border-2 border-primary/50 rounded-lg">
            <span className="text-primary font-mono text-sm tracking-wider">
              CLEARANCE LEVEL: CLASSIFIED • STATUS: ACTIVE
            </span>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="max-w-3xl mx-auto space-y-8">
          {!hasCompletedJourney ? (
            // First time view - Welcome interface
            <>
              <Card className="p-12 bg-card/50 backdrop-blur-sm border-primary/30 shadow-large transition-all duration-500">
                <div className="text-center space-y-6">
                  <Button 
                    onClick={handleBeginAssessment}
                    size="lg"
                    className="bg-transparent border-2 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300 text-base px-8 py-6 font-mono"
                  >
                    Start
                  </Button>
                </div>
              </Card>
              
              {/* Training Analytics Graph */}
              <div className="animate-fade-in mt-8">
                <ResultsChart data={pollData} />
              </div>
            </>
          ) : (
            <>
              {/* Completed journey view */}
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/30 shadow-large">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold text-primary font-mono">Assessment Complete</h2>
                  <p className="text-muted-foreground text-base">
                    Your analytical performance has been recorded. Review your results below.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <Button 
                      onClick={handleBeginAssessment}
                      variant="outline"
                      size="lg"
                      className="w-full py-6 text-base border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300 font-mono"
                    >
                      Start New Assessment
                    </Button>
                    
                    <Button 
                      onClick={handleReviewModules}
                      variant="outline"
                      size="lg"
                      className="w-full py-6 text-base border-accent/30 hover:bg-accent/10 hover:border-accent transition-all duration-300 font-mono"
                    >
                      Review Training Modules
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Results Chart - Shows after completion */}
              <div className="animate-fade-in mt-8">
                <ResultsChart data={pollData} />
              </div>
            </>
          )}
        </div>

        {/* Status Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-primary/20 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary/80 font-mono">SYSTEM ONLINE</span>
              </div>
              <div className="text-primary/80 font-mono">
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
