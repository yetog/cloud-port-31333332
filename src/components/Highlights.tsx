import { useCallback, useEffect, useState } from 'react';
import { highlights } from '@/data/highlights';
import { ExternalLink, Cloud, Presentation, Brain, Shield, Award, Calendar } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { FF7Panel, SectionHeader } from './rpg';

const iconMap: Record<string, React.ElementType> = {
  Cloud,
  Presentation,
  Brain,
  Shield,
  Award,
};

const typeLabels: Record<string, string> = {
  linkedin: 'LinkedIn Post',
  event: 'Event',
  achievement: 'Achievement',
  media: 'Media Feature',
};

const Highlights = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.05) 0%, transparent 70%)'
        }}
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <SectionHeader className="justify-center">Highlights</SectionHeader>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recent achievements, speaking engagements, and professional milestones.
            </p>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'w-6 bg-primary' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
              skipSnaps: false,
              dragFree: false,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full overflow-hidden"
          >
            <CarouselContent>
              {highlights.map((highlight) => {
                const IconComponent = iconMap[highlight.icon] || Award;
                
                return (
                  <CarouselItem 
                    key={highlight.id} 
                    className="basis-full sm:basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.667rem)]"
                  >
                    <FF7Panel className="h-full hover-lift group">
                      {/* Image with Ken Burns effect */}
                      <div className="relative h-48 mb-4 rounded-lg overflow-hidden border border-primary/20">
                        <img
                          src={highlight.image}
                          alt={highlight.title}
                          className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        
                        {/* Type Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30">
                          <IconComponent className="h-3 w-3 text-primary" />
                          <span className="text-xs text-foreground">{typeLabels[highlight.type]}</span>
                        </div>
                        
                        {/* Date */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {highlight.date}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {highlight.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {highlight.description}
                      </p>

                      {highlight.url && (
                        <a
                          href={highlight.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          View on LinkedIn
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </FF7Panel>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            <div className="flex justify-center mt-6 gap-4">
              <CarouselPrevious className="static translate-y-0 border-primary/40 hover:border-primary hover:bg-primary/10" />
              <CarouselNext className="static translate-y-0 border-primary/40 hover:border-primary hover:bg-primary/10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
