import Sidebar from './Sidebar';
import Footer from './Footer';
import FloatingParticles from './FloatingParticles';
import { useSidebarContext } from '@/contexts/SidebarContext';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { isCollapsed } = useSidebarContext();
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-grid-animated relative overflow-x-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      <Sidebar />
      
      <main className={`flex-1 relative z-10 transition-all duration-300 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default PageLayout;
