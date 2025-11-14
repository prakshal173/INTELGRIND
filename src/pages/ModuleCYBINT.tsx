import CyberTrace from "@/components/CyberTrace";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const ModuleCYBINT = () => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    // Mark module as complete
    const stored = localStorage.getItem('completedModules');
    const completedModules = stored ? JSON.parse(stored) : { osint: false, sigint: false, cybint: false };
    completedModules.cybint = true;
    localStorage.setItem('completedModules', JSON.stringify(completedModules));
    setIsCompleted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate('/training-hub')}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </Button>
          
          {isCompleted && (
            <Button
              onClick={() => navigate('/training-hub')}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Next Module
            </Button>
          )}
        </div>
        
        <CyberTrace onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default ModuleCYBINT;
