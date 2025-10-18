import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Eye, Satellite, Shield, Radio, Smartphone, Mail, MapPin, Wifi } from "lucide-react";

const timelineEvents = [
  {
    year: "2001",
    title: "PATRIOT Act",
    icon: Shield,
    trackingIcon: Mail,
    trackingMethod: "Email & Financial Records",
    description: "The USA PATRIOT Act expanded government surveillance capabilities",
    details: "Following 9/11, the act granted unprecedented surveillance powers including the ability to collect phone records, emails, and financial information with minimal oversight. Section 215 allowed the FBI to order any person or entity to turn over 'any tangible things' for an investigation."
  },
  {
    year: "2007",
    title: "PRISM Program",
    icon: Eye,
    trackingIcon: Wifi,
    trackingMethod: "Internet Communications",
    description: "NSA begins collecting internet communications",
    details: "PRISM allowed the NSA to collect internet communications from major tech companies including Microsoft, Yahoo, Google, Facebook, and Apple. The program operated in secret until Edward Snowden's revelations in 2013, affecting millions of users worldwide."
  },
  {
    year: "2013",
    title: "Snowden Revelations",
    icon: Satellite,
    trackingIcon: Smartphone,
    trackingMethod: "Phone Metadata",
    description: "Mass surveillance programs exposed to the public",
    details: "Edward Snowden revealed the extent of global surveillance programs, including the collection of phone metadata from millions of Americans and foreign citizens. The revelations sparked a global debate about privacy, security, and government overreach."
  },
  {
    year: "2015",
    title: "Drone Program Exposed",
    icon: Radio,
    trackingIcon: MapPin,
    trackingMethod: "Location & Metadata",
    description: "The Intercept publishes The Drone Papers",
    details: "Classified documents revealed that nearly 90% of people killed in drone strikes were not the intended targets. The program operated with minimal oversight, and operators relied on metadata and unreliable intelligence, leading to numerous civilian casualties."
  }
];

const InteractiveTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof timelineEvents[0] | null>(null);

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          How We Are Being Spied On
        </h2>
        <p className="text-muted-foreground">Click on each event to learn more</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {timelineEvents.map((event, index) => {
          const IconComponent = event.icon;
          const TrackingIcon = event.trackingIcon;
          return (
            <Card
              key={event.year}
              onClick={() => setSelectedEvent(event)}
              className="p-6 cursor-pointer bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-neon hover:-translate-y-2 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary group-hover:text-secondary transition-colors">{event.year}</div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                
                <div className="flex items-center gap-2 pt-2 border-t border-muted/30 w-full justify-center">
                  <TrackingIcon className="w-4 h-4 text-accent" />
                  <span className="text-xs text-accent font-medium">{event.trackingMethod}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="bg-card border-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              {selectedEvent && <selectedEvent.icon className="w-6 h-6 text-primary" />}
              {selectedEvent?.year} - {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed pt-4">
              {selectedEvent?.details}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default InteractiveTimeline;
