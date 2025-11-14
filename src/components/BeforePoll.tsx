import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface BeforePollProps {
  onSubmit: (answers: boolean[]) => void;
}

const questions = [
  "A government's duty to protect its citizens from foreign threats is more important than an individual's absolute right to privacy.",
  "In an investigation, a person's character and known motives (like anger, debt, or greed) are the most reliable guides to finding the truth.",
  "The 'truth' of a historical event is best understood by reading the official government reports released after the fact.",
  "To protect national security, it is necessary for intelligence agencies to operate with a level of suspicion and secrecy that would be considered 'unethical' in normal, everyday life.",
  "It is an acceptable part of national security for a government to 'control the narrative' of a secret operation, as long as they don't tell a direct, provable lie."
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
            <div key={index} className="space-y-4 p-5 rounded-lg bg-muted/20 border border-muted hover:border-primary/50 transition-all duration-300">
              <p className="text-lg font-medium mb-3">{index + 1}. {question}</p>
              <p className="text-sm text-muted-foreground mb-4">
                Please select your response by clicking on the option below.
              </p>
              <RadioGroup 
                onValueChange={(value) => handleAnswer(index, value)}
                value={answers[index] !== undefined ? (answers[index] ? 'agree' : 'disagree') : undefined}
                className="flex flex-col gap-3"
              >
                <Label 
                  htmlFor={`before-q${index}-agree`} 
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    answers[index] === true 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <RadioGroupItem value="agree" id={`before-q${index}-agree`} className="border-primary" />
                  <span className="font-medium">Agree</span>
                </Label>
                <Label 
                  htmlFor={`before-q${index}-disagree`} 
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    answers[index] === false 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <RadioGroupItem value="disagree" id={`before-q${index}-disagree`} className="border-primary" />
                  <span className="font-medium">Disagree</span>
                </Label>
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
