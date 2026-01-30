import Sidebar from './Sidebar';
import Footer from './Footer';
import FloatingParticles from './FloatingParticles';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-grid-animated relative overflow-x-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      <Sidebar />
      
      <main className="flex-1 md:ml-64 relative z-10">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default PageLayout;
