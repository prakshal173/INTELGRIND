import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/HeroSection";
import BeforePoll from "@/components/BeforePoll";
import InteractiveTimeline from "@/components/InteractiveTimeline";
import SecretOperation from "@/components/SecretOperation";
import WhistleblowerChoice from "@/components/WhistleblowerChoice";
import AfterPoll from "@/components/AfterPoll";
import ResultsChart from "@/components/ResultsChart";
import ArchiveSection from "@/components/ArchiveSection";

const Index = () => {
  const [beforeAnswers, setBeforeAnswers] = useState<boolean[]>([]);
  const [pollData, setPollData] = useState({ changedCount: 0, sameCount: 0 });
  const { toast } = useToast();

  const handleBeforePollSubmit = (answers: boolean[]) => {
    setBeforeAnswers(answers);
    // Scroll to content modules
    document.getElementById('content-modules')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAfterPollSubmit = (afterAnswers: boolean[]) => {
    // Compare answers
    const userChanged = beforeAnswers.some((ans, idx) => ans !== afterAnswers[idx]);
    
    // Update local poll data (simulating backend)
    setPollData(prev => ({
      changedCount: prev.changedCount + (userChanged ? 1 : 0),
      sameCount: prev.sameCount + (userChanged ? 0 : 1)
    }));

    toast({
      title: "Poll submitted successfully",
      description: userChanged 
        ? "Your perspective has shifted. Thank you for participating!" 
        : "Your perspective remained consistent. Thank you for participating!",
    });

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-16 space-y-32">
        <BeforePoll onSubmit={handleBeforePollSubmit} />
        
        <div id="content-modules" className="space-y-32">
          <InteractiveTimeline />
          <SecretOperation />
          <WhistleblowerChoice />
        </div>

        {beforeAnswers.length > 0 && (
          <AfterPoll onSubmit={handleAfterPollSubmit} />
        )}

        <div id="results">
          <ResultsChart data={pollData} />
        </div>

        <ArchiveSection />
      </div>
    </div>
  );
};

export default Index;
