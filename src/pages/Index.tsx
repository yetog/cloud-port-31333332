import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import About from '../components/About';
import Projects from '../components/Projects';
import Apps from '../components/Apps';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingParticles from '../components/FloatingParticles';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-grid-animated relative overflow-x-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      <Sidebar />
      
      <main className="flex-1 md:ml-64 relative z-10">
        {/* Main content */}
        <Hero />
        <Highlights />
        <About />
        <Apps />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
