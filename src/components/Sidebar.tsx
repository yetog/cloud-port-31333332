import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import SoundToggle from './SoundToggle';

interface NavLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
  isRoute?: boolean;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const navLinks: NavLink[] = [
    { name: 'About', href: '#about' },
    { name: 'Apps', href: '#apps' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
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
        className={`fixed z-40 h-screen backdrop-blur-lg border-r transition-all duration-300 
                   w-16 md:w-64 ${isOpen ? 'left-0' : '-left-full md:left-0'}`}
        style={{
          background: 'hsl(var(--card) / 0.95)',
          borderColor: 'hsl(var(--primary) / 0.2)',
        }}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-8 text-center">
            <h2 className="font-bold text-lg md:text-xl tracking-tight hidden md:block text-foreground text-glow">
              Isayah Young-Burke
            </h2>
            <p className="text-xs text-muted-foreground mt-1 hidden md:block">
              Infrastructure & Cloud Consultant
            </p>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = link.isRoute 
                  ? location.pathname === link.href
                  : activeSection === link.href.substring(1);
                
                const linkElement = (
                  <div
                    className={`flex items-center justify-center md:justify-start p-3 rounded-lg transition-all cursor-pointer hover-lift
                              ${isActive 
                                ? 'bg-primary/20 text-primary border border-primary/40' 
                                : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground border border-transparent'}`}
                    style={isActive ? { boxShadow: '0 0 15px hsl(var(--primary) / 0.2)' } : {}}
                  >
                    {link.icon && <span className="mr-3">{link.icon}</span>}
                    <span className="hidden md:block">{link.name}</span>
                  </div>
                );

                return (
                  <li key={link.name}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                      >
                        {linkElement}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                      >
                        {linkElement}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Theme and Sound Toggles */}
          <div className="flex items-center justify-center gap-2 mb-4 md:justify-start">
            <ThemeToggle />
            <SoundToggle />
          </div>
          
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
