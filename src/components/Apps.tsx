import { apps } from '../data/apps';
import { 
  ExternalLink, Download, Github, ArrowRight,
  GraduationCap, Leaf, Music, Bot, Mic, BrainCircuit,
  Headphones, PenLine, Gamepad2, Palette, BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { FF7Panel, SectionHeader } from './rpg';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Leaf,
  Music,
  Bot,
  Mic,
  BrainCircuit,
  Headphones,
  PenLine,
  Gamepad2,
  Palette,
  BookOpen,
};

const Apps = () => {
  const featuredApps = apps.slice(0, 5);

  return (
    <section id="apps" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-glow">Featured Apps</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">
            I've created custom tools and platforms designed to enhance productivity, creativity, and digital workflows. These personal apps reflect my passion for automation, AI integration, and user-first design.
          </p>
          
          {/* View All Apps Button */}
          <div className="flex justify-center mb-12">
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="group border-primary/40 hover:border-primary hover:bg-primary/10 text-foreground"
            >
              <Link to="/apps" className="flex items-center">
                View All Apps ({apps.length})
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: false,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredApps.map((app, index) => (
                <CarouselItem
                  key={app.id}
                  className="basis-full md:basis-1/3 lg:basis-1/4 p-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <FF7Panel className="h-full hover-lift">
                    <div className="flex items-center gap-2 mb-2">
                      {iconMap[app.icon] && (
                        <span className="text-primary">
                          {(() => {
                            const IconComponent = iconMap[app.icon];
                            return <IconComponent className="h-5 w-5" />;
                          })()}
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-foreground">{app.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{app.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {app.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-auto pt-3 border-t border-primary/20">
                      {app.appUrl && (
                        <a
                          href={app.appUrl}
                          className="flex items-center text-xs text-primary hover:text-primary/80 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Open App
                        </a>
                      )}
                      {app.githubUrl && (
                        <a
                          href={app.githubUrl}
                          className="flex items-center text-xs text-primary hover:text-primary/80 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={14} className="mr-1" />
                          GitHub
                        </a>
                      )}
                      {app.storeUrl && (
                        <a
                          href={app.storeUrl}
                          className="flex items-center text-xs text-primary hover:text-primary/80 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download size={14} className="mr-1" />
                          Download
                        </a>
                      )}
                    </div>
                  </FF7Panel>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="static translate-y-0 mr-4 border-primary/40 hover:border-primary hover:bg-primary/10" />
              <CarouselNext className="static translate-y-0 border-primary/40 hover:border-primary hover:bg-primary/10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Apps;
