import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Play, Volume2 } from "lucide-react";
import { generateMorseAudio } from "@/utils/morseCodeGenerator";

interface SIGINTSoundLabProps {
  onComplete?: () => void;
}

const morseCodeMap: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

const SIGINTSoundLab = ({ onComplete }: SIGINTSoundLabProps = {}) => {
  const secretMessage = "SCORC";
  const [userInput, setUserInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMorseDisplay, setCurrentMorseDisplay] = useState<string>("");
  const [playbackSpeed, setPlaybackSpeed] = useState<'slow' | 'medium' | 'fast'>('slow');
  const [showMorseVisual, setShowMorseVisual] = useState(true);
  const { toast } = useToast();
  const audioContextRef = useRef<AudioContext | null>(null);

  const morseSequence = secretMessage.split('').map(char => morseCodeMap[char]).join(' ');

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playMorseCode = async () => {
    if (!audioContextRef.current || isPlaying) return;
    
    setIsPlaying(true);
    setCurrentMorseDisplay("");
    
    const speedMultipliers = {
      slow: 0.3,
      medium: 0.6,
      fast: 1.0
    };

    try {
      await generateMorseAudio(
        audioContextRef.current,
        secretMessage,
        speedMultipliers[playbackSpeed],
        (morseChar: string) => {
          setCurrentMorseDisplay(prev => prev + morseChar + " ");
        }
      );
    } catch (error) {
      console.error("Error playing morse code:", error);
    } finally {
      setIsPlaying(false);
    }
  };

  const handleSubmit = () => {
    if (userInput.toUpperCase().trim() === secretMessage) {
      toast({
        title: "✓ Transmission Decoded!",
        description: "You've successfully decrypted the SIGINT message.",
      });
      if (onComplete) onComplete();
    } else {
      toast({
        title: "Incorrect Decoding",
        description: "Listen carefully to the Morse code patterns. Use the reference table.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Mission Brief Section */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <Volume2 className="h-8 w-8 text-primary" />
            Mission Brief
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-lg">
            Signals intelligence has intercepted an encrypted audio transmission. Our analysis indicates the message uses 
            Morse code - a classic covert communication method.
          </p>
          <p className="text-foreground font-semibold text-lg">
            Your mission: Decode the intercepted Morse transmission and identify the message.
          </p>
          
          {/* Understanding Morse Code Audio */}
          <div className="mt-6 space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h3 className="text-primary font-semibold flex items-center gap-2">
              <span className="text-lg">🔊</span> Understanding Morse Code Audio
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="text-primary font-mono">• Short beep (dot ".")</span>: Quick, brief tone</li>
              <li><span className="text-primary font-mono">• Long beep (dash "—")</span>: Extended tone (3x longer than dot)</li>
              <li><span className="text-primary font-mono">• Short pause</span>: Gap between dots/dashes in same letter</li>
              <li><span className="text-primary font-mono">• Medium pause</span>: Gap between different letters</li>
              <li><span className="text-primary font-mono">• Long pause</span>: Gap between words</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-[1fr,400px] gap-6">
        {/* Left Panel - Audio Player & Input */}
        <div className="space-y-6">
          {/* Audio Player Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Intercepted Transmission</CardTitle>
              <CardDescription>Play the audio signal to decode the message</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Play Button */}
              <div className="flex justify-center">
                <Button
                  onClick={playMorseCode}
                  disabled={isPlaying}
                  size="lg"
                  className="w-full max-w-sm h-16 text-lg gap-3 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Play className="h-6 w-6" />
                  {isPlaying ? "Transmitting..." : "Play Transmission"}
                </Button>
              </div>

              {/* Playback Speed */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Playback Speed:</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['slow', 'medium', 'fast'] as const).map((speed) => (
                    <Button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      variant={playbackSpeed === speed ? "default" : "outline"}
                      className={playbackSpeed === speed ? "bg-primary text-primary-foreground" : ""}
                    >
                      {speed.charAt(0).toUpperCase() + speed.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Visual Display Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Visual Morse Display:</label>
                <Button
                  onClick={() => setShowMorseVisual(!showMorseVisual)}
                  variant="outline"
                  size="sm"
                >
                  {showMorseVisual ? "Hide" : "Show"}
                </Button>
              </div>

              {/* Visual Display */}
              {showMorseVisual && (
                <Card className="bg-muted/30 border-primary/20 min-h-[120px] flex items-center justify-center p-6">
                  <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground font-medium">Real-time Morse Visual</p>
                    {currentMorseDisplay ? (
                      <div className="font-mono text-2xl text-primary tracking-wider">
                        {currentMorseDisplay}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Press play to see visual Morse code</p>
                    )}
                  </div>
                </Card>
              )}

              {/* Transmission Info */}
              <div className="space-y-2 text-sm text-muted-foreground font-mono">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>~{playbackSpeed === 'slow' ? '20' : playbackSpeed === 'medium' ? '12' : '8'}s</span>
                </div>
                <div className="flex justify-between">
                  <span>Frequency:</span>
                  <span>800 Hz</span>
                </div>
                <div className="flex justify-between">
                  <span>Pattern:</span>
                  <span>Morse Code</span>
                </div>
                <div className="flex justify-between">
                  <span>Speed:</span>
                  <span className="capitalize">{playbackSpeed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Origin:</span>
                  <span>Unknown</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Decoder Input Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Decode Message</CardTitle>
              <CardDescription>Enter the decoded text from the Morse transmission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter decoded text..."
                className="bg-background font-mono text-lg h-12"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button 
                onClick={handleSubmit} 
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit Decoding
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Morse Code Reference (Always Visible & Sticky) */}
        <Card className="bg-card/80 backdrop-blur-sm border-border h-fit sticky top-6">
          <CardHeader>
            <CardTitle>Morse Code Reference</CardTitle>
            <CardDescription>International Morse Code alphabet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              {Object.entries(morseCodeMap).filter(([key]) => key !== ' ').map(([letter, code]) => (
                <div key={letter} className="flex items-center justify-between p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
                  <span className="font-bold text-foreground">{letter}:</span>
                  <span className="text-primary tracking-wider">{code}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SIGINTSoundLab;
