import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AfterPollProps {
  onSubmit: (answers: boolean[]) => void;
}

const questions = [
  "Government surveillance programs are necessary for national security",
  "The public should have access to classified information about military operations",
  "Whistleblowers who expose government secrets should be protected",
  "People who have 'nothing to hide' should not be worried about government surveillance",
  "A newspaper that publishes a leaked government secret is helping the public, not hurting the country"
];

const AfterPoll = ({ onSubmit }: AfterPollProps) => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length === 5) {
      const answerArray = [answers[0], answers[1], answers[2], answers[3], answers[4]];
      onSubmit(answerArray);
    }
  };

  const handleAnswer = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value === 'agree' }));
  };

  return (
    <section id="after-poll" className="py-16">
      <Card className="max-w-3xl mx-auto p-8 bg-card border-border shadow-medium hover:shadow-neon transition-all duration-500 animate-fade-in">
        <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent animate-pulse-glow">
          After Learning More
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Now that you've seen the evidence, how do you feel about these questions?
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((question, index) => (
            <div key={index} className="space-y-4 p-4 rounded-lg bg-muted/20 border border-muted hover:border-secondary/50 transition-all duration-300">
              <p className="text-lg font-medium">{index + 1}. {question}</p>
              <RadioGroup 
                onValueChange={(value) => handleAnswer(index, value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="agree" id={`after-q${index}-agree`} className="border-secondary" />
                  <Label htmlFor={`after-q${index}-agree`} className="cursor-pointer hover:text-secondary transition-colors">Agree</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="disagree" id={`after-q${index}-disagree`} className="border-secondary" />
                  <Label htmlFor={`after-q${index}-disagree`} className="cursor-pointer hover:text-secondary transition-colors">Disagree</Label>
                </div>
              </RadioGroup>
            </div>
          ))}

          <Button 
            type="submit" 
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-neon transition-all duration-300 hover:scale-105"
            disabled={Object.keys(answers).length !== 5}
          >
            Submit & See Results
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default AfterPoll;
