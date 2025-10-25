import { Card } from "@/components/ui/card";
import { ExternalLink, FileText, Video } from "lucide-react";

const sources = [
  {
    title: "JFK Assassination Records",
    publisher: "National Archives",
    year: "1963-Present",
    description: "Heavily redacted government files on the Kennedy assassination, showing how strategic redaction can hide critical information.",
    url: "https://www.archives.gov/research/jfk",
    icon: FileText
  },
  {
    title: "The Snowden NSA Files",
    publisher: "The Guardian",
    year: "2013",
    description: "Documents revealing domestic surveillance programs and mass data collection on citizens.",
    url: "https://www.theguardian.com/us-news/the-nsa-files",
    icon: FileText
  },
  {
    title: "Robert Hanssen Case",
    publisher: "FBI",
    year: "2001",
    description: "The story of the FBI agent who was a Russian mole for over 20 years, caught through financial analysis and counter-intelligence work.",
    url: "https://www.fbi.gov/history/famous-cases/robert-hanssen",
    icon: FileText
  },
  {
    title: "Citizenfour",
    publisher: "Documentary Film",
    year: "2014",
    description: "Academy Award-winning documentary following Edward Snowden's disclosure of classified NSA documents.",
    url: "https://www.imdb.com/title/tt4044364/",
    icon: Video
  }
];

const ArchiveSection = () => {
  return (
    <section id="archive" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Source Archive
        </h2>
        <p className="text-muted-foreground">Explore the original documents and materials</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {sources.map((source) => {
          const IconComponent = source.icon;
          return (
            <a
              key={source.title}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="p-6 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-glow h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {source.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {source.publisher} • {source.year}
                    </p>
                    
                    <p className="text-sm leading-relaxed">
                      {source.description}
                    </p>
                  </div>
                </div>
              </Card>
            </a>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto mt-12">
        <Card className="p-8 bg-muted/20 border-border">
          <p className="text-center leading-relaxed">
            These sources represent just a fraction of the classified information that has been disclosed by whistleblowers. 
            We encourage you to explore these materials and <span className="font-semibold text-primary">form your own conclusions</span> about 
            the balance between security and transparency.
          </p>
        </Card>
      </div>

      <footer className="mt-24 pt-12 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            © 2025 The Gray Zone. An educational project exploring government secrecy.
          </p>
          <p className="text-xs text-muted-foreground">
            This website is for educational purposes only. All information is sourced from publicly available documents and journalism.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default ArchiveSection;
