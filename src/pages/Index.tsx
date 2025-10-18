import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Layers, Sparkles, Compass } from "lucide-react";
import heroImage from "@/assets/hero-abstract.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Gray zone</h1>
            <div className="flex items-center gap-8">
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <Button variant="default" size="sm">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-secondary/50 backdrop-blur-sm rounded-full border border-border">
              <p className="text-sm font-medium text-muted-foreground">Navigate the In-Between</p>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
              The{" "}
              <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                Gray zone
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Where boundaries blur and possibilities emerge. Explore the liminal spaces between certainty and ambiguity.
            </p>
            
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button size="lg" className="group">
                Explore Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Embrace Uncertainty
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the power of existing between extremes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 bg-card hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Layers className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Layered Perspectives</h3>
              <p className="text-muted-foreground leading-relaxed">
                Navigate complexity with nuanced understanding. See beyond binary choices to discover richer solutions.
              </p>
            </Card>

            <Card className="p-8 bg-card hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Creative Ambiguity</h3>
              <p className="text-muted-foreground leading-relaxed">
                Find inspiration in the undefined. Where clarity meets mystery, innovation thrives.
              </p>
            </Card>

            <Card className="p-8 bg-card hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Compass className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Guided Exploration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Journey through liminal spaces with purpose. Balance intuition with insight.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-accent/10 rounded-full">
                  <p className="text-sm font-medium text-accent">About</p>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  The Space Between
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Gray zone exists in the liminal—the threshold between what was and what will be. 
                  It's where transformation happens, where new perspectives emerge, and where the 
                  most interesting questions live.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe that the most valuable insights come not from choosing sides, 
                  but from exploring the rich terrain that exists between them.
                </p>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-muted to-muted/50 border border-border shadow-xl" />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Gray zone. Embracing the in-between.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
