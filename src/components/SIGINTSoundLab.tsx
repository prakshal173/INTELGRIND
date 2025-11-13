import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Play, Pause, Volume2, Eye, EyeOff, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MorseCodeGenerator } from "@/utils/morseCodeGenerator";

const SIGINTSoundLab = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showMorseVisual, setShowMorseVisual] = useState(true);
  const [showBrief, setShowBrief] = useState(true);
  const morseGeneratorRef = useRef<MorseCodeGenerator | null>(null);
  const { toast } = useToast();

  const correctAnswer = "SOSARC";
  
  // Morse code pattern for SOSARC
  const morsePattern = [
    { letter: "S", code: "···", duration: "short-short-short" },
    { letter: "O", code: "───", duration: "long-long-long" },
    { letter: "S", code: "···", duration: "short-short-short" },
    { letter: "A", code: "·─", duration: "short-long" },
    { letter: "R", code: "·─·", duration: "short-long-short" },
    { letter: "C", code: "─·─·", duration: "long-short-long-short" },
  ];

  useEffect(() => {
    if (!morseGeneratorRef.current) {
      morseGeneratorRef.current = new MorseCodeGenerator();
    }
  }, []);

  const handlePlayPause = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const generator = morseGeneratorRef.current;
    if (generator) {
      try {
        await generator.playMorseCode(correctAnswer, playbackRate);
        setIsPlaying(false);
      } catch (error) {
        console.error("Error playing morse code:", error);
        setIsPlaying(false);
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
      
      // Scroll to next module
      setTimeout(() => {
        document.getElementById('cyber-trace')?.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
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
                  <li>• <strong>Dash (─)</strong>: A long beep sound (3x longer than a dot)</li>
                  <li>• <strong>Space between sounds</strong>: Brief silence between dots/dashes</li>
                  <li>• <strong>Space between letters</strong>: Longer silence (3x dot length)</li>
                </ul>
                <p className="text-sm mt-2">
                  Use the controls below to slow down the audio and view the visual morse pattern for assistance.
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
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBrief(true)}
          >
            <Info className="h-4 w-4 mr-2" />
            Show Morse Code Guide
          </Button>
        </div>
      )}

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Audio Transmission
          </CardTitle>
          <CardDescription>
            Intercepted signal from classified channel • Classification: TOP SECRET
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Audio Player */}
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg border border-dashed">
              <p className="text-sm text-muted-foreground text-center">
                {isPlaying ? "🔊 Playing morse code transmission..." : "Click Play to hear the morse code signal"}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button onClick={handlePlayPause} size="lg">
                {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                {isPlaying ? "Pause" : "Play"} Audio
              </Button>
              
              <Button onClick={handleSlowDown} variant="outline">
                Speed: {playbackRate}x
              </Button>

              <Button
                onClick={() => setShowMorseVisual(!showMorseVisual)}
                variant="outline"
              >
                {showMorseVisual ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showMorseVisual ? "Hide" : "Show"} Visual
              </Button>
            </div>
          </div>

          {/* Visual Morse Code Display */}
          {showMorseVisual && (
            <div className="p-6 bg-muted/50 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Visual Morse Pattern</h3>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {morsePattern.map((item, idx) => (
                  <div key={idx} className="text-center space-y-2">
                    <div className="text-3xl font-mono bg-background p-3 rounded border">
                      {item.code}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      Letter {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Each box represents one letter in the transmitted message
              </p>
            </div>
          )}

          {/* Answer Input */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Decoded Message:
              </label>
              <div className="flex gap-2">
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
                  placeholder="Enter decoded message..."
                  className="uppercase font-mono text-lg"
                  maxLength={10}
                />
                <Button onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Hint: The message is 6 characters long
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIGINTSoundLab;
