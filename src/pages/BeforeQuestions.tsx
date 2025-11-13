import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const questions = [
  "A government's duty to protect its citizens from foreign threats is more important than an individual's absolute right to privacy.",
  "In an investigation, a person's character and known motives (like anger, debt, or greed) are the most reliable guides to finding the truth.",
  "The 'truth' of a historical event is best understood by reading the official government reports released after the fact.",
  "To protect national security, it is necessary for intelligence agencies to operate with a level of suspicion and secrecy that would be considered 'unethical' in normal, everyday life.",
  "It is an acceptable part of national security for a government to 'control the narrative' of a secret operation, as long as they don't tell a direct, provable lie."
];

const BeforeQuestions = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value === 'agree' }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === 5) {
      const answerArray = [answers[0], answers[1], answers[2], answers[3], answers[4]];
      localStorage.setItem('beforeAnswers', JSON.stringify(answerArray));
      navigate('/training-hub');
    }
  };

  const isCurrentAnswered = answers[currentQuestion] !== undefined;
  const allAnswered = Object.keys(answers).length === 5;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNjIsIDg5LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
      </div>

      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="px-4 py-1 bg-primary/20 border border-primary/30 rounded-full">
              <span className="text-xs font-mono tracking-wider text-primary">PRE-ASSESSMENT</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Initial Perspective
          </h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border shadow-large hover:shadow-neon transition-all duration-500 animate-fade-in">
          <div className="space-y-8">
            <div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">{currentQuestion + 1}</span>
                </div>
                <p className="text-xl leading-relaxed pt-1">
                  {questions[currentQuestion]}
                </p>
              </div>
            </div>

            <RadioGroup 
              value={answers[currentQuestion] !== undefined ? (answers[currentQuestion] ? 'agree' : 'disagree') : undefined}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-muted hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="agree" id="agree" className="border-primary" />
                <Label htmlFor="agree" className="flex-1 cursor-pointer text-lg hover:text-primary transition-colors">
                  Agree
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-muted hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="disagree" id="disagree" className="border-primary" />
                <Label htmlFor="disagree" className="flex-1 cursor-pointer text-lg hover:text-primary transition-colors">
                  Disagree
                </Label>
              </div>
            </RadioGroup>
          </div>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={currentQuestion === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentQuestion
                    ? 'bg-primary w-6'
                    : answers[idx] !== undefined
                    ? 'bg-primary/50'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!isCurrentAnswered}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="gap-2 bg-primary hover:bg-primary/90 shadow-glow"
            >
              Proceed to Training
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeforeQuestions;
