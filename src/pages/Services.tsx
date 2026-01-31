import { Check, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { FF7Panel, SectionHeader } from '@/components/rpg';
import { services } from '@/data/services';
import { partners } from '@/data/partners';

const Services = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-glow">
              Professional Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From AI integration to cloud infrastructure, I offer comprehensive technology services 
              to help your business thrive in the digital age.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <FF7Panel 
                  key={service.id} 
                  className="p-6 hover-lift group transition-all duration-300"
                  withCorners
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href="/#contact" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors font-medium text-sm group/btn"
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </FF7Panel>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <FF7Panel className="p-8" withCorners>
            <SectionHeader>Partners</SectionHeader>
            <p className="text-muted-foreground text-center mb-8">
              Trusted partnerships that power exceptional solutions
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center">
              {partners.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 rounded-lg hover:bg-primary/10 transition-all cursor-pointer"
                >
                  {/* Text-based placeholder until logos are added */}
                  <div className="h-12 w-full flex items-center justify-center px-3 py-2 rounded bg-muted/50 group-hover:bg-primary/20 transition-colors">
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors text-center">
                      {partner.name}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </FF7Panel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <FF7Panel className="p-8 text-center" withCorners>
            <SectionHeader>Ready to Get Started?</SectionHeader>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Let's discuss how I can help transform your infrastructure and bring your vision to life.
            </p>
            <a 
              href="/#contact" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium"
            >
              Contact Me
              <ArrowRight className="w-4 h-4" />
            </a>
          </FF7Panel>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
