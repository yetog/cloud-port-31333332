import { useState, useEffect } from 'react';
import { projects } from '../data/projects';
import { ExternalLink, Code, Cloud, Globe, Image as ImageIcon, Headphones, Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PasswordModal from './PasswordModal';
import { FF7Panel } from './rpg';

const categoryIcons = {
  cloud: <Cloud className="h-5 w-5" />,
  webhosting: <Globe className="h-5 w-5" />,
  artcurating: <ImageIcon className="h-5 w-5" />,
  audioengineering: <Headphones className="h-5 w-5" />
};

const categoryTitles = {
  cloud: 'Cloud Infrastructure',
  webhosting: 'Web Hosting',
  artcurating: 'Art Curation',
  audioengineering: 'Audio Engineering'
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('cloud');
  const [loaded, setLoaded] = useState(false);
  const [passwordModal, setPasswordModal] = useState<{
    isOpen: boolean;
    projectTitle: string;
    demoUrl: string | null;
  }>({
    isOpen: false,
    projectTitle: '',
    demoUrl: null
  });

  const categories = [...new Set(projects.map(project => project.category))];
  const filteredProjects = projects.filter(project => project.category === activeCategory);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const handleDemoClick = (project: typeof projects[0]) => {
    setPasswordModal({
      isOpen: true,
      projectTitle: project.title,
      demoUrl: project.demoUrl || null
    });
  };

  const handlePasswordSuccess = () => {
    if (passwordModal.demoUrl && passwordModal.demoUrl !== '#') {
      window.open(passwordModal.demoUrl, '_blank');
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="section-title text-glow">Projects</h2>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-warning/20 text-warning text-sm border border-warning/30">
              <Construction className="h-4 w-4" />
              Under Maintenance
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mb-12">
            Here are selected infrastructure and hosting projects I've helped develop or manage. From scalable server architectures to sleek, client-ready websites — each project reflects a blend of efficiency, modern design, and long-term sustainability.
          </p>
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border ${
                  activeCategory === category
                    ? 'bg-primary/20 text-primary border-primary/40'
                    : 'bg-secondary/50 hover:bg-secondary text-muted-foreground border-transparent hover:border-primary/20'
                }`}
                style={activeCategory === category ? { boxShadow: '0 0 15px hsl(var(--primary) / 0.2)' } : {}}
              >
                {categoryIcons[category as keyof typeof categoryIcons]}
                {categoryTitles[category as keyof typeof categoryTitles]}
              </button>
            ))}
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
              {filteredProjects.map((project, index) => (
                <CarouselItem 
                  key={project.id} 
                  className="basis-full md:basis-1/2 p-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <FF7Panel 
                    className={`h-full transition-all duration-700 hover-lift ${
                      loaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {/* Project Image */}
                    <div className="mb-4 rounded-lg overflow-hidden border border-primary/20">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </AspectRatio>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-primary">
                        {categoryIcons[project.category as keyof typeof categoryIcons]}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {categoryTitles[project.category as keyof typeof categoryTitles]}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 mt-4 pt-4 border-t border-primary/20">
                      <Link
                        to={`/projects/${project.id}`}
                        className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        View Details
                      </Link>
                      <button
                        onClick={() => handleDemoClick(project)}
                        className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        🔐 View Demo
                      </button>
                      {project.codeUrl && (
                        <a
                          href={project.codeUrl}
                          className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Code size={16} className="mr-1" />
                          View Code
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

      <PasswordModal
        isOpen={passwordModal.isOpen}
        onClose={() => setPasswordModal(prev => ({ ...prev, isOpen: false }))}
        onSuccess={handlePasswordSuccess}
        projectTitle={passwordModal.projectTitle}
      />
    </section>
  );
};

export default Projects;
