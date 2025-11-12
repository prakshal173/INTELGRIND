import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Clock, MapPin, Image as ImageIcon, MessageSquare } from "lucide-react";
import clue1 from "@/assets/osint-clue-1.jpg";
import clue2 from "@/assets/osint-clue-2.jpg";
import clue3 from "@/assets/osint-clue-3.jpg";
import clue4 from "@/assets/osint-clue-4.jpg";

interface VisualClue {
  id: number;
  title: string;
  description: string;
  tag: string;
  image: string;
}

interface SocialPost {
  id: number;
  text: string;
  timestamp: string;
}

interface Location {
  id: number;
  name: string;
  isCorrect: boolean;
}

const visualClues: VisualClue[] = [
  {
    id: 1,
    title: "Image 1",
    description: "Photo of a distinctive building with a clock tower",
    tag: "European architecture",
    image: clue1,
  },
  {
    id: 2,
    title: "Image 2",
    description: "Screenshot of a social media check-in at a coffee shop",
    tag: "Location tag visible",
    image: clue2,
  },
  {
    id: 3,
    title: "Image 3",
    description: "Landscape photo with mountain range in background",
    tag: "Distinctive peak formation",
    image: clue3,
  },
  {
    id: 4,
    title: "Image 4",
    description: "Street sign showing intersection of two roads",
    tag: "City name partially visible",
    image: clue4,
  },
];

const socialPosts: SocialPost[] = [
  {
    id: 1,
    text: "Just arrived at the conference! Can't wait to see everyone tomorrow morning.",
    timestamp: "2024-03-15 18:30",
  },
  {
    id: 2,
    text: "Best coffee in town at Main Street Cafe. If you know, you know! ☕",
    timestamp: "2024-03-15 09:15",
  },
  {
    id: 3,
    text: "The view from my hotel room is incredible. You can see the whole downtown!",
    timestamp: "2024-03-15 20:00",
  },
  {
    id: 4,
    text: "Meeting at the riverside convention center at 10 AM sharp.",
    timestamp: "2024-03-16 07:30",
  },
  {
    id: 5,
    text: "Heading home tomorrow. This city never disappoints!",
    timestamp: "2024-03-16 19:00",
  },
];

const locations: Location[] = [
  { id: 1, name: "New York City", isCorrect: false },
  { id: 2, name: "Portland, Oregon", isCorrect: false },
  { id: 3, name: "Denver, Colorado", isCorrect: false },
];

const OSINTChallenge = () => {
  const [score, setScore] = useState(100);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [wrongGuesses, setWrongGuesses] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !gameOver) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, gameOver]);

  const handleLocationGuess = (locationId: number) => {
    const location = locations.find((l) => l.id === locationId);
    
    if (!location) return;

    if (location.isCorrect) {
      const timeBonus = timer < 60 ? 20 : 0;
      const finalScore = score + timeBonus;
      setScore(finalScore);
      setGameOver(true);
      setIsActive(false);
      setSelectedLocation(locationId);
      
      toast({
        title: "Mission Successful! 🎯",
        description: `You identified the location correctly! Final score: ${finalScore}${timeBonus > 0 ? ` (+${timeBonus} time bonus)` : ""}`,
      });
    } else {
      setWrongGuesses([...wrongGuesses, locationId]);
      setScore(Math.max(0, score - 10));
      
      toast({
        title: "Incorrect Location",
        description: "That's not the right location. Keep analyzing the clues! (-10 points)",
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-4xl font-bold mb-2">OSINT Challenge</h2>
              <p className="text-muted-foreground">Analyze clues to determine the target location</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-5xl font-bold text-primary">{score}</div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(timer)}</span>
                {timer < 60 && !gameOver && (
                  <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    Fast bonus available!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Visual Clues */}
            <Card className="p-6 bg-card/50 backdrop-blur">
              <div className="flex items-center gap-2 mb-6">
                <ImageIcon className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Visual Clues ({visualClues.length})</h3>
              </div>
              <div className="space-y-4">
                {visualClues.map((clue) => (
                  <div key={clue.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-1">{clue.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{clue.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-medium whitespace-nowrap">{clue.tag}</span>
                      <img
                        src={clue.image}
                        alt={clue.title}
                        className="w-20 h-20 object-cover rounded cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                        onClick={() => setSelectedImage(clue.image)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Social Media Posts */}
            <Card className="p-6 bg-card/50 backdrop-blur">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Social Media Posts ({socialPosts.length})</h3>
              </div>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {socialPosts.map((post) => (
                    <div key={post.id} className="pb-4 border-b border-border last:border-0">
                      <p className="text-foreground mb-2">{post.text}</p>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Map and Location Selection */}
            <Card className="p-6 bg-card/50 backdrop-blur">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Select Target Location</h3>
              </div>
              
              {/* Map Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-blue-950/50 to-purple-950/50 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Interactive Map Placeholder</p>
                </div>
                {/* Decorative pins */}
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full animate-pulse" />
                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Location Buttons */}
              <div className="space-y-3">
                {locations.map((location) => {
                  const isWrong = wrongGuesses.includes(location.id);
                  const isCorrect = gameOver && location.isCorrect;
                  
                  return (
                    <Button
                      key={location.id}
                      onClick={() => !gameOver && !isWrong && handleLocationGuess(location.id)}
                      disabled={gameOver || isWrong}
                      variant={isCorrect ? "default" : "outline"}
                      className={`w-full h-auto py-4 justify-start text-lg ${
                        isCorrect ? "bg-green-600 hover:bg-green-700" : ""
                      } ${
                        isWrong ? "opacity-50 cursor-not-allowed bg-destructive/20" : ""
                      }`}
                    >
                      <MapPin className="w-5 h-5 mr-3" />
                      {location.name}
                    </Button>
                  );
                })}
              </div>

              {/* Strategy Hint */}
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Strategy:</span> Cross-reference visual clues with social media posts. 
                  Look for location tags, landmarks, and timeline consistency. Complete within 30 seconds for a bonus!
                </p>
              </div>
            </Card>

            {/* Game Over Card */}
            {gameOver && (
              <Card className="p-6 bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/50">
                <h3 className="text-2xl font-bold mb-4 text-green-400">Mission Complete!</h3>
                <p className="text-foreground mb-4">
                  Excellent work, Agent. You've successfully identified the target location.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-background/50 rounded-lg">
                    <p className="text-muted-foreground text-xs mb-1">Final Score</p>
                    <p className="text-2xl font-bold text-primary">{score}</p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg">
                    <p className="text-muted-foreground text-xs mb-1">Time Taken</p>
                    <p className="text-2xl font-bold text-primary">{formatTime(timer)}</p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg">
                    <p className="text-muted-foreground text-xs mb-1">Wrong Guesses</p>
                    <p className="text-2xl font-bold text-primary">{wrongGuesses.length}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-2">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Clue detail"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default OSINTChallenge;
