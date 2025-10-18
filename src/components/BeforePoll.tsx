import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface BeforePollProps {
  onSubmit: (answers: boolean[]) => void;
}

const questions = [
  "Government surveillance programs are necessary for national security",
  "The public should have access to classified information about military operations",
  "Whistleblowers who expose government secrets should be protected",
  "People who have 'nothing to hide' should not be worried about government surveillance",
  "A newspaper that publishes a leaked government secret is helping the public, not hurting the country"
];

const BeforePoll = ({ onSubmit }: BeforePollProps) => {
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
    <section id="before-poll" className="py-16">
      <Card className="max-w-3xl mx-auto p-8 bg-card border-border shadow-medium hover:shadow-neon transition-all duration-500 animate-fade-in">
        <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-pulse-glow">
          Before We Begin
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Share your initial perspective on these questions
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((question, index) => (
            <div key={index} className="space-y-4 p-4 rounded-lg bg-muted/20 border border-muted hover:border-primary/50 transition-all duration-300">
              <p className="text-lg font-medium">{index + 1}. {question}</p>
              <RadioGroup 
                onValueChange={(value) => handleAnswer(index, value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="agree" id={`before-q${index}-agree`} className="border-primary" />
                  <Label htmlFor={`before-q${index}-agree`} className="cursor-pointer hover:text-primary transition-colors">Agree</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="disagree" id={`before-q${index}-disagree`} className="border-primary" />
                  <Label htmlFor={`before-q${index}-disagree`} className="cursor-pointer hover:text-primary transition-colors">Disagree</Label>
                </div>
              </RadioGroup>
            </div>
          ))}

          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-neon transition-all duration-300 hover:scale-105"
            disabled={Object.keys(answers).length !== 5}
          >
            Continue to Content
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default BeforePoll;
