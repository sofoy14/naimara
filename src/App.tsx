import { useEffect, useState } from 'react';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { Stats } from './sections/Stats';
import { Servicios } from './sections/Servicios';
import { Tratamientos } from './sections/Tratamientos';
import { Productos } from './sections/Productos';
import { Recomendaciones } from './sections/Recomendaciones';
import { Agendar } from './sections/Agendar';
import { Testimonios } from './sections/Testimonios';
import { Contacto } from './sections/Contacto';
import { Footer } from './sections/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <Stats />
        <Servicios />
        <Tratamientos />
        <Productos />
        <Recomendaciones />
        <Agendar />
        <Testimonios />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
