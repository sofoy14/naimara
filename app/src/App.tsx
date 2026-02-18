import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { Dashboard } from './dashboard/Dashboard';
import { UbicacionBanner } from './components/UbicacionBanner';

function HomePage() {
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
      <UbicacionBanner />
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
