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
  "Whistleblowers who expose government secrets should be protected"
];

const AfterPoll = ({ onSubmit }: AfterPollProps) => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length === 3) {
      const answerArray = [answers[0], answers[1], answers[2]];
      onSubmit(answerArray);
    }
  };

  const handleAnswer = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value === 'agree' }));
  };

  return (
    <section id="after-poll" className="py-16">
      <Card className="max-w-3xl mx-auto p-8 bg-card border-border shadow-medium hover:shadow-large transition-all duration-300">
        <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          After Learning More
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Now that you've seen the evidence, how do you feel about these questions?
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((question, index) => (
            <div key={index} className="space-y-4">
              <p className="text-lg font-medium">{index + 1}. {question}</p>
              <RadioGroup 
                onValueChange={(value) => handleAnswer(index, value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="agree" id={`after-q${index}-agree`} className="border-secondary" />
                  <Label htmlFor={`after-q${index}-agree`} className="cursor-pointer">Agree</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="disagree" id={`after-q${index}-disagree`} className="border-secondary" />
                  <Label htmlFor={`after-q${index}-disagree`} className="cursor-pointer">Disagree</Label>
                </div>
              </RadioGroup>
            </div>
          ))}

          <Button 
            type="submit" 
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow transition-all duration-300 hover:scale-105"
            disabled={Object.keys(answers).length !== 3}
          >
            Submit & See Results
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default AfterPoll;
