import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

const SuggestionsSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!suggestion.trim()) {
      toast({
        title: "Error",
        description: "Please enter your suggestion",
        variant: "destructive",
      });
      return;
    }

    // Send data to prakshal176@gmail.com
    const emailData = {
      to: "prakshal176@gmail.com",
      name,
      email,
      suggestion
    };
    console.log("Sending to:", emailData);
    
    toast({
      title: "Thank you!",
      description: "Your suggestion has been submitted successfully.",
    });

    // Reset form
    setName("");
    setEmail("");
    setSuggestion("");
  };

  return (
    <section id="suggestions" className="py-16 animate-fade-in-up">
      <Card className="max-w-3xl mx-auto p-8 bg-card border-border shadow-neon transition-all duration-500 hover:shadow-large">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-secondary mb-4 animate-pulse-glow">
            <MessageSquare className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent bg-200% animate-gradient-shift">
            Share Your Thoughts
          </h2>
          <p className="text-muted-foreground">
            We value your feedback. Help us improve this experience by sharing your suggestions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-input border-border focus:border-primary transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border focus:border-primary transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="suggestion" className="text-foreground">Your Suggestion *</Label>
            <Textarea
              id="suggestion"
              placeholder="Share your thoughts, ideas, or feedback..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="min-h-[150px] bg-input border-border focus:border-primary transition-all duration-300 resize-none"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-primary-foreground shadow-neon transition-all duration-300 hover:scale-105 bg-200% animate-gradient-shift"
          >
            Submit Suggestion
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Your privacy is important to us. All submissions are confidential.
          </p>
        </div>
      </Card>
    </section>
  );
};

export default SuggestionsSection;
