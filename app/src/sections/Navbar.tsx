import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
}

const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#tratamientos', label: 'Tratamientos' },
  { href: '#productos', label: 'Productos' },
  { href: '#recomendaciones', label: 'Recomendaciones' },
  { href: '#agendar', label: 'Agendar' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#contacto', label: 'Contacto' },
];

export function Navbar({ scrolled }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-[#F7F5F0]/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5D8A66] to-[#1B4D3E] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
              <img
                src="/images/logo.png"
                alt="Naimara"
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="font-serif text-xl font-semibold text-[#1B4D3E]">
              Naimara
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#3D3D3D] hover:text-[#1B4D3E] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#C67B5C] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/573128087003"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5D8A66] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1B4D3E] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Agendar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 rounded-xl flex items-center justify-center transition-colors hover:bg-[#5D8A66]/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#1B4D3E]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1B4D3E]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[60px] bg-white z-40 transition-transform duration-400 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-lg font-medium text-[#3D3D3D] py-3 border-b border-gray-100 hover:text-[#1B4D3E] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/573128087003"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="mt-4 bg-[#5D8A66] text-white px-5 py-3 rounded-full text-center font-semibold hover:bg-[#1B4D3E] transition-colors"
          >
            Agendar Cita
          </a>
        </div>
      </div>
    </nav>
  );
}
