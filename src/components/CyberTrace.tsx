import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Terminal, MessageSquare, Search, Target } from "lucide-react";

interface CyberTraceProps {
  onComplete?: () => void;
}

const CyberTrace = ({ onComplete }: CyberTraceProps = {}) => {
  const [actorInput, setActorInput] = useState("");
  const [beaconInput, setBeaconInput] = useState("");
  const { toast } = useToast();

  const correctActor = "redfox";
  const correctBeacon = "172.16.3.22";

  const systemLogs = [
    { time: "2024-01-15 14:23:41", ip: "192.168.1.100", message: "User login: john_admin" },
    { time: "2024-01-15 14:24:15", ip: "192.168.1.100", message: "File access: /reports/quarterly.pdf" },
    { time: "2024-01-15 14:25:03", ip: "172.16.3.22", message: "Unusual data transfer detected" },
    { time: "2024-01-15 14:25:47", ip: "192.168.1.105", message: "User login: sarah_dev" },
    { time: "2024-01-15 14:26:12", ip: "172.16.3.22", message: "Connection attempt to external server: 45.33.21.158" },
    { time: "2024-01-15 14:27:33", ip: "192.168.1.110", message: "System backup initiated" },
    { time: "2024-01-15 14:28:45", ip: "172.16.3.22", message: "Data exfiltration detected - 2.4GB transferred" },
    { time: "2024-01-15 14:29:01", ip: "192.168.1.100", message: "User logout: john_admin" },
    { time: "2024-01-15 14:30:15", ip: "172.16.3.22", message: "Encrypted tunnel established" },
    { time: "2024-01-15 14:31:28", ip: "192.168.1.105", message: "Code commit: feature-update-v2.1" },
  ];

  const chatMessages = [
    { time: "14:20", user: "admin_team", message: "Everyone remember we have the security audit today" },
    { time: "14:21", user: "redfox", message: "Got it, working on the quarterly reports" },
    { time: "14:23", user: "blue_whale", message: "I'll be in the meeting room if anyone needs me" },
    { time: "14:26", user: "redfox", message: "Hey, anyone know why the network is so slow?" },
    { time: "14:27", user: "admin_team", message: "No issues reported. Running fine on my end." },
    { time: "14:29", user: "redfox", message: "Hmm, must be my workstation then. Gonna restart it" },
    { time: "14:32", user: "blue_whale", message: "Security team just pinged me about unusual activity" },
    { time: "14:33", user: "admin_team", message: "What kind of activity?" },
    { time: "14:34", user: "blue_whale", message: "Large data transfer from internal network" },
    { time: "14:35", user: "admin_team", message: "Everyone check your systems NOW" },
  ];

  const handleSubmit = () => {
    const actorCorrect = actorInput.toLowerCase().trim() === correctActor;
    const beaconCorrect = beaconInput.trim() === correctBeacon;

    if (actorCorrect && beaconCorrect) {
      toast({
        title: "✓ Investigation Complete!",
        description: "You've successfully identified the threat actor and compromised beacon.",
      });
      if (onComplete) onComplete();
    } else if (actorCorrect) {
      toast({
        title: "Partially Correct",
        description: "Actor identification is correct, but check the beacon IP again.",
        variant: "destructive",
      });
    } else if (beaconCorrect) {
      toast({
        title: "Partially Correct",
        description: "Beacon IP is correct, but review the chat logs for the actor.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Review the logs and chat messages carefully. Look for suspicious patterns.",
        variant: "destructive",
      });
    }
  };

  return (
    <div id="cyber-trace" className="space-y-6">
      {/* Investigation Report Header */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <Terminal className="h-8 w-8 text-primary" />
            Investigation Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <h3 className="font-semibold text-lg mb-2">Question 1: Who mentioned "gateway 27"?</h3>
              <Input
                value={actorInput}
                onChange={(e) => setActorInput(e.target.value)}
                placeholder="Enter username..."
                className="bg-background font-mono"
              />
            </div>

            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <h3 className="font-semibold text-lg mb-2">Question 2: Which host triggered beacon activity?</h3>
              <Input
                value={beaconInput}
                onChange={(e) => setBeaconInput(e.target.value)}
                placeholder="Enter IP address..."
                className="bg-background font-mono"
              />
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Submit Investigation
          </Button>
        </CardContent>
      </Card>

      {/* Mission Objectives */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl">Mission Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Identify the suspect who used gateway 27</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Locate the IP address generating beacon traffic</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Cross-reference logs with chat communications</span>
            </li>
          </ul>
          
          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-primary font-semibold mb-2">💡 Hint:</p>
            <p className="text-sm text-muted-foreground">
              Look for connections between the chat messages and system logs. Pay attention to timestamps and 
              specific keywords like "gateway 27" and "beacon".
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat Logs
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-2">
            <Terminal className="h-4 w-4" />
            System Logs
          </TabsTrigger>
        </TabsList>
...
      </Tabs>
    </div>
  );
};

export default CyberTrace;
