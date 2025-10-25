import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section id="video-section" className="py-16 animate-fade-in-up">
      <Card className="max-w-4xl mx-auto p-8 bg-card border-border shadow-neon transition-all duration-500">
        <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Watch: The Reality Behind the Data
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          A short documentary revealing the human cost of surveillance programs
        </p>
        
        <div className="relative aspect-video bg-muted/30 rounded-lg overflow-hidden border border-primary/30 group hover:border-primary/60 transition-all duration-300">
          {/* Placeholder for video - User will add their own video */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                <Play className="w-10 h-10 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Add your 20-second video here
              </p>
              <p className="text-sm text-muted-foreground/70">
                Replace this placeholder with your video element
              </p>
            </div>
          </div>
          
          {/* Example video element (commented out - user will uncomment and add their video URL) */}
          {/* 
          <video 
            controls 
            className="w-full h-full"
            poster="/path-to-thumbnail.jpg"
          >
            <source src="/path-to-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          */}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground italic">
            "The greatest threat to democracy is not terrorism, but the erosion of our civil liberties in the name of security."
          </p>
        </div>
      </Card>
    </section>
  );
};

export default VideoSection;
