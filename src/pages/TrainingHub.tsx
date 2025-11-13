import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, Radio, Terminal, CheckCircle, Lock } from "lucide-react";

interface ModuleStatus {
  osint: boolean;
  sigint: boolean;
  cybint: boolean;
}

const TrainingHub = () => {
  const navigate = useNavigate();
  const [completedModules, setCompletedModules] = useState<ModuleStatus>({
    osint: false,
    sigint: false,
    cybint: false
  });

  useEffect(() => {
    // Check which modules are completed
    const stored = localStorage.getItem('completedModules');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCompletedModules(parsed);
      } catch (e) {
        console.error('Failed to parse completed modules', e);
      }
    }
  }, []);

  const allModulesComplete = completedModules.osint && completedModules.sigint && completedModules.cybint;

  const handleProceedToAfter = () => {
    localStorage.setItem('completedModules', 'all');
    navigate('/after-questions');
  };

  const modules = [
    {
      id: 'osint',
      title: 'OSINT Case Files',
      subtitle: 'Open Source Intelligence',
      description: 'Analyze visual clues, social media posts, and geographic data to identify a target location.',
      icon: Search,
      route: '/module/osint',
      color: 'from-primary to-primary/80',
      completed: completedModules.osint
    },
    {
      id: 'sigint',
      title: 'SIGINT Sound Lab',
      subtitle: 'Signals Intelligence',
      description: 'Decode intercepted Morse code transmissions to extract classified information.',
      icon: Radio,
      route: '/module/sigint',
      color: 'from-accent to-accent/80',
      completed: completedModules.sigint
    },
    {
      id: 'cybint',
      title: 'CYBINT Trace Terminal',
      subtitle: 'Cyber Intelligence',
      description: 'Investigate system logs and chat communications to identify malicious actors and C2 infrastructure.',
      icon: Terminal,
      route: '/module/cybint',
      color: 'from-secondary to-secondary/80',
      completed: completedModules.cybint
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNjIsIDg5LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="px-6 py-2 bg-primary/20 border border-primary/30 rounded-full">
              <span className="text-sm font-mono tracking-wider text-primary">TRAINING MODULES</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-wider mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Intelligence Operations Hub
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete all three training modules in any order. Each module tests different analytical skills.
          </p>

          {/* Progress Indicator */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <div className="text-sm text-muted-foreground">Progress:</div>
            <div className="flex gap-2">
              {[completedModules.osint, completedModules.sigint, completedModules.cybint].map((completed, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    completed ? 'bg-primary shadow-glow' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm font-mono text-primary">
              {Object.values(completedModules).filter(Boolean).length}/3
            </div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Card
                key={module.id}
                className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 hover:shadow-neon group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(module.route)}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Completed badge */}
                {module.completed && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                )}

                <div className="relative p-6 space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground font-mono">{module.subtitle}</div>
                    <h3 className="text-2xl font-bold">{module.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  {/* Button */}
                  <Button
                    className="w-full mt-4 bg-primary/10 hover:bg-primary hover:text-primary-foreground border border-primary/30 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(module.route);
                    }}
                  >
                    {module.completed ? 'Replay Module' : 'Start Module'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Proceed Button */}
        {allModulesComplete && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/30 shadow-large">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">All Modules Complete</h3>
                <p className="text-muted-foreground">
                  Excellent work, analyst. You've completed all training modules. 
                  Proceed to the post-assessment to finalize your evaluation.
                </p>
                <Button
                  onClick={handleProceedToAfter}
                  size="lg"
                  className="mt-4 bg-primary hover:bg-primary/90 shadow-glow hover:shadow-neon transition-all duration-300"
                >
                  Proceed to Post-Assessment
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-muted hover:border-primary/50"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainingHub;
