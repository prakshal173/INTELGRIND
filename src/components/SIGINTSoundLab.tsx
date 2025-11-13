import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Play, Pause, Volume2, Eye, EyeOff, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MorseCodeGenerator } from "@/utils/morseCodeGenerator";

interface SIGINTSoundLabProps {
  onComplete?: () => void;
}

const morseCodeReference: Record<string, string> = {
  'A': '·─', 'B': '─···', 'C': '─·─·', 'D': '─··', 'E': '·',
  'F': '··─·', 'G': '──·', 'H': '····', 'I': '··', 'J': '·───',
  'K': '─·─', 'L': '·─··', 'M': '──', 'N': '─·', 'O': '───',
  'P': '·──·', 'Q': '──·─', 'R': '·─·', 'S': '···', 'T': '─',
  'U': '··─', 'V': '···─', 'W': '·──', 'X': '─··─', 'Y': '─·──',
  'Z': '──··', '0': '─────', '1': '·────', '2': '··───',
  '3': '···──', '4': '····─', '5': '·····', '6': '─····',
  '7': '──···', '8': '───··', '9': '────·'
};

const SIGINTSoundLab = ({ onComplete }: SIGINTSoundLabProps = {}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showMorseVisual, setShowMorseVisual] = useState(true);
  const [showBrief, setShowBrief] = useState(true);
  const [showReference, setShowReference] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1);
  const morseGeneratorRef = useRef<MorseCodeGenerator | null>(null);
  const stopPlayingRef = useRef(false);
  const { toast } = useToast();

  const correctAnswer = "SOSARC";
  
  const morsePattern = [
    { letter: "S", code: "···" },
    { letter: "O", code: "───" },
    { letter: "S", code: "···" },
    { letter: "A", code: "·─" },
    { letter: "R", code: "·─·" },
    { letter: "C", code: "─·─·" },
  ];

  useEffect(() => {
    if (!morseGeneratorRef.current) {
      morseGeneratorRef.current = new MorseCodeGenerator();
    }
  }, []);

  const handlePlayPause = async () => {
    if (isPlaying) {
      stopPlayingRef.current = true;
      setIsPlaying(false);
      setCurrentPlayingIndex(-1);
      return;
    }

    stopPlayingRef.current = false;
    setIsPlaying(true);
    const generator = morseGeneratorRef.current;
    if (generator) {
      try {
        for (let i = 0; i < correctAnswer.length; i++) {
          if (stopPlayingRef.current) break;
          setCurrentPlayingIndex(i);
          await generator.playMorseCode(correctAnswer[i], playbackRate);
          await new Promise(resolve => setTimeout(resolve, 300 / playbackRate));
        }
        setIsPlaying(false);
        setCurrentPlayingIndex(-1);
      } catch (error) {
        console.error("Error playing morse code:", error);
        setIsPlaying(false);
        setCurrentPlayingIndex(-1);
        toast({
          title: "Audio Error",
          description: "Failed to play morse code. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSlowDown = () => {
    const newRate = playbackRate === 1 ? 0.5 : playbackRate === 0.5 ? 0.25 : 1;
    setPlaybackRate(newRate);
    toast({
      title: `Playback speed: ${newRate}x`,
      description: newRate < 1 ? "Audio slowed down for easier analysis" : "Normal speed",
    });
  };

  const handleSubmit = () => {
    if (userAnswer.toUpperCase().trim() === correctAnswer) {
      toast({
        title: "✓ Correct!",
        description: "You've successfully decoded the SIGINT transmission!",
      });
      
      if (onComplete) {
        onComplete();
      }
    } else {
      toast({
        title: "Incorrect",
        description: "Try listening to the audio again and analyzing the morse code pattern.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">SIGINT Sound Lab</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Intercept and decode classified audio transmissions. Listen carefully to the morse code signal and identify the message.
        </p>
      </div>

      {showBrief && (
        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <p className="font-semibold">Understanding Morse Code Audio:</p>
                <p className="text-sm">
                  Morse code consists of <strong>dots (·)</strong> and <strong>dashes (─)</strong>:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• <strong>Dot (·)</strong>: A short beep sound</li>
                  <li>• <strong>Dash (─)</strong>: A longer beep sound (3x the length of a dot)</li>
                  <li>• <strong>Gaps</strong>: Short pauses between dots/dashes, longer pauses between letters</li>
                </ul>
                <p className="text-sm">
                  Listen carefully to distinguish between short and long beeps. Use the reference table below to match sounds to letters.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBrief(false)}
                className="ml-4"
              >
                <EyeOff className="h-4 w-4" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {!showBrief && (
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBrief(true)}
            className="gap-2"
          >
            <Info className="h-4 w-4" />
            Show Morse Code Brief
          </Button>
        </div>
      )}

      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-large">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Audio Transmission
          </CardTitle>
          <CardDescription>
            Intercepted signal from unknown source. Decode the message.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handlePlayPause}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause" : "Play Audio"}
            </Button>
            
            <Button
              onClick={handleSlowDown}
              variant="outline"
              className="gap-2"
            >
              <Volume2 className="h-4 w-4" />
              Speed: {playbackRate}x
            </Button>

            <Button
              onClick={() => setShowMorseVisual(!showMorseVisual)}
              variant="outline"
              className="gap-2"
            >
              {showMorseVisual ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showMorseVisual ? "Hide" : "Show"} Visual
            </Button>

            <Button
              onClick={() => setShowReference(!showReference)}
              variant="outline"
              className="gap-2"
            >
              {showReference ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showReference ? "Hide" : "Show"} Reference
            </Button>
          </div>

          {showMorseVisual && (
            <div className="p-6 bg-muted/20 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground mb-3 font-mono">TRANSMISSION:</div>
              <div className="flex flex-wrap gap-4 items-center justify-center min-h-[60px]">
                {morsePattern.map((item, index) => (
                  <div 
                    key={index}
                    className={`transition-all duration-300 ${
                      currentPlayingIndex === index 
                        ? 'scale-110 opacity-100' 
                        : currentPlayingIndex > index
                        ? 'opacity-100'
                        : 'opacity-30'
                    }`}
                  >
                    <div className="text-center space-y-2">
                      <div className={`text-3xl font-mono tracking-wider ${
                        currentPlayingIndex === index ? 'text-primary animate-pulse' : 'text-foreground'
                      }`}>
                        {item.code}
                      </div>
                      <div className={`text-xs font-mono ${
                        currentPlayingIndex >= index ? 'text-muted-foreground' : 'text-transparent'
                      }`}>
                        {currentPlayingIndex >= index ? item.letter : '?'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showReference && (
            <div className="p-6 bg-muted/20 rounded-lg border border-border">
              <div className="text-sm font-semibold mb-4">Morse Code Reference Table:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
                {Object.entries(morseCodeReference).map(([letter, code]) => (
                  <div key={letter} className="text-center p-2 bg-background/50 rounded border border-border/50">
                    <div className="font-bold text-lg">{letter}</div>
                    <div className="font-mono text-sm text-muted-foreground">{code}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-sm font-medium">Your Decoded Message:</label>
            <div className="flex gap-2">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter decoded message..."
                className="flex-1 bg-background font-mono uppercase"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button 
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90"
              >
                Submit
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Hint: The message is 6 letters long
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIGINTSoundLab;
