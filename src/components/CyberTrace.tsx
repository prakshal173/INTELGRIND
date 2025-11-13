import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Terminal, MessageSquare, Search, AlertTriangle } from "lucide-react";

const CyberTrace = () => {
  const [actorInput, setActorInput] = useState("");
  const [beaconInput, setBeaconInput] = useState("");
  const { toast } = useToast();

  const correctActor = "redfox";
  const correctBeacon = "172.16.3.22";

  // System logs data
  const systemLogs = [
    { time: "2024-01-15 14:23:41", level: "INFO", ip: "192.168.1.100", message: "User login: john_admin" },
    { time: "2024-01-15 14:24:15", level: "INFO", ip: "192.168.1.100", message: "File access: /reports/quarterly.pdf" },
    { time: "2024-01-15 14:25:03", level: "WARN", ip: "172.16.3.22", message: "Unusual data transfer detected" },
    { time: "2024-01-15 14:25:47", level: "INFO", ip: "192.168.1.105", message: "User login: sarah_dev" },
    { time: "2024-01-15 14:26:12", level: "ERROR", ip: "172.16.3.22", message: "Connection attempt to external server: 45.33.21.158" },
    { time: "2024-01-15 14:27:33", level: "INFO", ip: "192.168.1.110", message: "System backup initiated" },
    { time: "2024-01-15 14:28:45", level: "CRITICAL", ip: "172.16.3.22", message: "Data exfiltration detected - 2.4GB transferred" },
    { time: "2024-01-15 14:29:01", level: "INFO", ip: "192.168.1.100", message: "User logout: john_admin" },
    { time: "2024-01-15 14:30:15", level: "WARN", ip: "172.16.3.22", message: "Encrypted tunnel established" },
    { time: "2024-01-15 14:31:28", level: "INFO", ip: "192.168.1.105", message: "Code commit: feature-update-v2.1" },
  ];

  // Chat messages data
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
      
      // Scroll to next section
      setTimeout(() => {
        document.getElementById('after-poll')?.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
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
    <div id="cyber-trace" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Cyber Trace Investigation</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Analyze system logs and chat communications to identify a cyber threat. Who is the malicious actor and what system is compromised?
        </p>
      </div>

      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Active Security Incident
          </CardTitle>
          <CardDescription>
            Incident ID: INC-2024-0115 • Status: Under Investigation • Priority: CRITICAL
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="logs" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="logs" className="gap-2">
                <Terminal className="h-4 w-4" />
                System Logs
              </TabsTrigger>
              <TabsTrigger value="chat" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat Transcript
              </TabsTrigger>
            </TabsList>

            <TabsContent value="logs" className="space-y-4">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <div className="space-y-2 font-mono text-sm">
                  {systemLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded ${
                        log.level === "CRITICAL"
                          ? "bg-destructive/10 border border-destructive/20"
                          : log.level === "ERROR"
                          ? "bg-destructive/5 border border-destructive/10"
                          : log.level === "WARN"
                          ? "bg-yellow-500/10 border border-yellow-500/20"
                          : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Badge
                          variant={
                            log.level === "CRITICAL" || log.level === "ERROR"
                              ? "destructive"
                              : log.level === "WARN"
                              ? "default"
                              : "secondary"
                          }
                          className="shrink-0"
                        >
                          {log.level}
                        </Badge>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{log.time}</span>
                            <span>•</span>
                            <span className="text-primary">{log.ip}</span>
                          </div>
                          <p className="text-foreground">{log.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <div className="space-y-3">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                        <span className="text-sm font-semibold text-primary">
                          {msg.user}
                        </span>
                      </div>
                      <div className="pl-4 py-2 border-l-2 border-border">
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-5 w-5" />
              <h3 className="font-semibold text-lg">Investigation Results</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Threat Actor Username:</label>
                <Input
                  value={actorInput}
                  onChange={(e) => setActorInput(e.target.value)}
                  placeholder="Enter username..."
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Identify the suspicious user from chat logs
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Compromised Beacon IP:</label>
                <Input
                  value={beaconInput}
                  onChange={(e) => setBeaconInput(e.target.value)}
                  placeholder="e.g., 192.168.1.1"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Identify the IP with suspicious activity
                </p>
              </div>
            </div>

            <Button onClick={handleSubmit} size="lg" className="w-full">
              Submit Investigation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CyberTrace;
