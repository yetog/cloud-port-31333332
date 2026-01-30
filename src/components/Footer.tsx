import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={18} />, url: 'https://github.com/' },
    { name: 'LinkedIn', icon: <Linkedin size={18} />, url: 'https://linkedin.com/in/' },
    { name: 'Twitter', icon: <Twitter size={18} />, url: 'https://twitter.com/' },
    { name: 'Email', icon: <Mail size={18} />, url: 'mailto:example@domain.com' },
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Apps', href: '/apps' },
  ];

  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Social Links & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground order-2 md:order-1">
              &copy; {currentYear} Isayah Young-Burke. All rights reserved.
            </p>
            
            <div className="flex space-x-6 order-1 md:order-2">
              {socialLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  aria-label={link.name}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
