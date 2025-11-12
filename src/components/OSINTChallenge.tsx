import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Clock, MapPin, Target } from "lucide-react";
import clue1 from "@/assets/osint-clue-1.jpg";
import clue2 from "@/assets/osint-clue-2.jpg";
import clue3 from "@/assets/osint-clue-3.jpg";
import clue4 from "@/assets/osint-clue-4.jpg";

interface Post {
  id: number;
  author: string;
  text: string;
  image: string;
}

interface Location {
  id: number;
  name: string;
  isCorrect: boolean;
}

const posts: Post[] = [
  {
    id: 1,
    author: "Agent_Nomad",
    text: "Just arrived. The architecture here is unmistakable - those ornate balconies are everywhere. Meeting at the usual cafe.",
    image: clue1,
  },
  {
    id: 2,
    author: "Shadow_Operative",
    text: "Clock tower visible from my hotel window. The Roman numerals and golden lighting make it a perfect landmark for the exchange.",
    image: clue2,
  },
  {
    id: 3,
    author: "Agent_Nomad",
    text: "Public square with the fountain is busy today. Good cover for the handoff. The monument is quite distinctive.",
    image: clue3,
  },
  {
    id: 4,
    author: "Cipher_7",
    text: "Street names here are in the local language. This particular intersection is perfect for our purposes.",
    image: clue4,
  },
];

const locations: Location[] = [
  { id: 1, name: "Vienna, Austria", isCorrect: false },
  { id: 2, name: "Prague, Czech Republic", isCorrect: false },
  { id: 3, name: "Munich, Germany", isCorrect: true },
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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              OSINT Challenge: Location Hunt
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              Intelligence intercepts indicate an operation in progress. Analyze the social media posts and images to determine the exact location of the covert meeting.
            </p>
            
            <div className="flex justify-center gap-8 mb-8">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Target className="w-6 h-6 text-primary" />
                <span>Score: {score}</span>
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold font-mono">
                <Clock className="w-6 h-6 text-primary" />
                <span>{formatTime(timer)}</span>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Intercepted Posts
            </h3>
            <div className="grid gap-4">
              {posts.map((post) => (
                <Card key={post.id} className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-primary mb-2">@{post.author}</p>
                      <p className="text-foreground mb-3">{post.text}</p>
                    </div>
                    <img
                      src={post.image}
                      alt={`Clue ${post.id}`}
                      className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      onClick={() => setSelectedImage(post.image)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Select the Location</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {locations.map((location) => {
                const isWrong = wrongGuesses.includes(location.id);
                const isCorrect = gameOver && location.isCorrect;
                
                return (
                  <Button
                    key={location.id}
                    onClick={() => !gameOver && !isWrong && handleLocationGuess(location.id)}
                    disabled={gameOver || isWrong}
                    variant={isCorrect ? "default" : isWrong ? "destructive" : "outline"}
                    className={`h-auto py-6 text-lg ${
                      isCorrect ? "bg-green-600 hover:bg-green-700 animate-pulse" : ""
                    } ${
                      isWrong ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    {location.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {gameOver && (
            <Card className="p-6 bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/50">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Mission Complete</h3>
              <p className="text-foreground mb-4">
                Excellent work, Agent. You've successfully identified the location of the covert operation. 
                Your analytical skills and attention to detail are commendable.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-muted-foreground text-sm">Final Score</p>
                  <p className="text-3xl font-bold text-primary">{score}</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-muted-foreground text-sm">Time Taken</p>
                  <p className="text-3xl font-bold text-primary">{formatTime(timer)}</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-muted-foreground text-sm">Wrong Guesses</p>
                  <p className="text-3xl font-bold text-primary">{wrongGuesses.length}</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-2">
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
