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
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Terminal className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">Cyber Trace Investigation</h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Analyze system logs and internal communications to identify the threat actor and locate the compromised beacon.
        </p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-large">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Intelligence Data
          </CardTitle>
          <CardDescription>Review the evidence to identify the insider threat</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="logs" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="logs" className="gap-2"><Terminal className="h-4 w-4" />System Logs</TabsTrigger>
              <TabsTrigger value="chat" className="gap-2"><MessageSquare className="h-4 w-4" />Internal Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="logs" className="mt-4">
              <ScrollArea className="h-[400px] w-full rounded-md border border-border p-4">
                <div className="space-y-3 font-mono text-sm">
                  {systemLogs.map((log, index) => (
                    <div key={index} className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <span className="text-muted-foreground">{log.time}</span>
                        <span className="text-primary font-semibold">{log.ip}</span>
                      </div>
                      <div className="text-foreground">{log.message}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chat" className="mt-4">
              <ScrollArea className="h-[400px] w-full rounded-md border border-border p-4">
                <div className="space-y-3">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground font-mono">{msg.time}</span>
                        <span className="font-semibold text-accent">{msg.user}</span>
                      </div>
                      <div className="text-foreground">{msg.message}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-large">
        <CardHeader>
          <CardTitle>Investigation Report</CardTitle>
          <CardDescription>Identify the threat actor username and the compromised beacon IP address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Question 1: Who mentioned "gateway 27"?</label>
            <Input 
              value={actorInput} 
              onChange={(e) => setActorInput(e.target.value)} 
              placeholder="Enter username..." 
              className="bg-background font-mono" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Question 2: Which host triggered beacon activity?</label>
            <Input 
              value={beaconInput} 
              onChange={(e) => setBeaconInput(e.target.value)} 
              placeholder="Enter IP address..." 
              className="bg-background font-mono" 
            />
          </div>
          <Button 
            onClick={handleSubmit} 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4 h-12 text-lg shadow-glow"
          >
            Submit Investigation
          </Button>
        </CardContent>
      </Card>

      {/* Mission Objectives Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-large">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Mission Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Identify the suspect who used gateway 27</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Locate the IP address generating beacon traffic</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Cross-reference logs with chat communications</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Hint Section */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <p className="text-sm text-primary">
            <span className="font-bold">Hint:</span> Look for connections between the chat messages and system logs. 
            Pay attention to timestamps and specific keywords like "gateway 27" and "beacon".
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CyberTrace;
