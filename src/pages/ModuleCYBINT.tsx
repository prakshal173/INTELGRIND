import CyberTrace from "@/components/CyberTrace";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ModuleCYBINT = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    // Mark module as complete
    const stored = localStorage.getItem('completedModules');
    const completedModules = stored ? JSON.parse(stored) : { osint: false, sigint: false, cybint: false };
    completedModules.cybint = true;
    localStorage.setItem('completedModules', JSON.stringify(completedModules));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => navigate('/training-hub')}
          variant="outline"
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub
        </Button>
        
        <CyberTrace onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default ModuleCYBINT;
