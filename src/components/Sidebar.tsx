import { useState, useEffect } from 'react';
import { Menu, User, AppWindow, FolderOpen, Briefcase, FileText, Mail as MailIcon, Github, Linkedin, Twitter } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import SoundToggle from './SoundToggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  isRoute?: boolean;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const navLinks: NavLink[] = [
    { name: 'About', href: '#about', icon: <User size={20} /> },
    { name: 'Apps', href: '#apps', icon: <AppWindow size={20} /> },
    { name: 'Projects', href: '#projects', icon: <FolderOpen size={20} /> },
    { name: 'Services', href: '/services', icon: <Briefcase size={20} />, isRoute: true },
    { name: 'Blog', href: '/blog', icon: <FileText size={20} />, isRoute: true },
    { name: 'Contact', href: '#contact', icon: <MailIcon size={20} /> },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Github size={18} />, url: 'https://github.com/' },
    { name: 'LinkedIn', icon: <Linkedin size={18} />, url: 'https://linkedin.com/in/' },
    { name: 'Twitter', icon: <Twitter size={18} />, url: 'https://twitter.com/' },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    sections.forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const NavItem = ({ link }: { link: NavLink }) => {
    const isActive = link.isRoute 
      ? location.pathname === link.href
      : activeSection === link.href.substring(1);
    
    const linkContent = (
      <div
        className={`flex items-center justify-center md:justify-start gap-3 p-3 rounded-lg transition-all cursor-pointer hover-lift
                  ${isActive 
                    ? 'bg-primary/20 text-primary border border-primary/40' 
                    : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground border border-transparent'}`}
        style={isActive ? { boxShadow: '0 0 15px hsl(var(--primary) / 0.2)' } : {}}
      >
        <span className="flex-shrink-0">{link.icon}</span>
        <span className="hidden md:block">{link.name}</span>
      </div>
    );

    // Wrap in tooltip for mobile collapsed view
    const tooltipWrapped = (
      <Tooltip>
        <TooltipTrigger asChild>
          {link.isRoute ? (
            <Link to={link.href} onClick={() => setIsOpen(false)}>
              {linkContent}
            </Link>
          ) : (
            <a href={link.href} onClick={() => setIsOpen(false)}>
              {linkContent}
            </a>
          )}
        </TooltipTrigger>
        <TooltipContent side="right" className="md:hidden">
          {link.name}
        </TooltipContent>
      </Tooltip>
    );

    return <li>{tooltipWrapped}</li>;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 ff7-panel"
          aria-label="Toggle menu"
        >
          <Menu size={24} className="text-primary" />
        </button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={`fixed z-40 h-screen backdrop-blur-lg border-r transition-transform duration-300 
                   w-16 md:w-64 left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{
          background: 'hsl(var(--card) / 0.95)',
          borderColor: 'hsl(var(--primary) / 0.2)',
        }}
      >
        <div className="flex flex-col h-full p-4">
          {/* Branding */}
          <div className="mb-8 text-center">
            <Link to="/" className="block">
              <h2 className="font-bold text-lg md:text-xl tracking-tight hidden md:block text-foreground text-glow hover:text-primary transition-colors">
                Isayah Young-Burke
              </h2>
              <div className="w-10 h-10 mx-auto rounded-lg bg-primary/20 flex items-center justify-center md:hidden">
                <span className="text-primary font-bold text-lg">IY</span>
              </div>
            </Link>
            <p className="text-xs text-muted-foreground mt-1 hidden md:block">
              Infrastructure & Cloud Consultant
            </p>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <NavItem key={link.name} link={link} />
              ))}
            </ul>
          </nav>
          
          {/* Separator */}
          <div className="h-px bg-border/50 my-4" />
          
          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {socialLinks.map((link) => (
              <Tooltip key={link.name}>
                <TooltipTrigger asChild>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {link.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          
          {/* Theme and Sound Toggles */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <ThemeToggle />
            <SoundToggle />
          </div>
          
          {/* Copyright */}
          <div className="mt-auto text-center hidden md:block">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Isayah Young-Burke
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
