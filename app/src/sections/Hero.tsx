import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => {
      el.classList.add('animate-in');
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 xl:px-12 relative overflow-hidden"
    >
      {/* Background Images - Responsive */}
      {/* Mobile: Horizontal image */}
      <div 
        className="absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg-mobile.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F5F0]/95 via-[#F7F5F0]/80 to-transparent" />
      </div>
      
      {/* Desktop: Vertical image */}
      <div 
        className="absolute inset-0 hidden lg:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg-desktop.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F5F0]/95 via-[#F7F5F0]/70 to-[#F7F5F0]/40" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div
              className="reveal opacity-0 translate-y-8 blur-[2px] transition-all duration-1000 ease-out"
              style={{ transitionDelay: '0ms' }}
            >
              <span className="inline-block bg-[#5D8A66]/10 text-[#1B4D3E] px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-[#5D8A66]/20">
                Centro de Medicina Integral en Popayán
              </span>
            </div>

            <h1
              className="reveal opacity-0 translate-y-8 blur-[2px] transition-all duration-1000 ease-out font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1B4D3E] leading-tight mb-6"
              style={{ transitionDelay: '150ms' }}
            >
              Tu salud al{' '}
              <span className="text-[#C67B5C] italic">alcance de todos</span>
            </h1>

            <p
              className="reveal opacity-0 translate-y-8 blur-[2px] transition-all duration-1000 ease-out text-lg text-[#5A5A5A] max-w-xl mx-auto lg:mx-0 mb-8"
              style={{ transitionDelay: '300ms' }}
            >
              Te ofrecemos medicina tradicional y alternativa con un enfoque
              holístico. Homeopatía, naturopatía, nutrición y más para tu
              bienestar integral.
            </p>

            <div
              className="reveal opacity-0 translate-y-8 blur-[2px] transition-all duration-1000 ease-out flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              style={{ transitionDelay: '450ms' }}
            >
              <a
                href="https://wa.me/573166998154"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#C67B5C] text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#B56A4D] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Agendar por WhatsApp
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#servicios"
                className="border-2 border-[#1B4D3E] text-[#1B4D3E] px-8 py-4 rounded-full font-semibold flex items-center justify-center hover:bg-[#1B4D3E] hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                Conocer servicios
              </a>
            </div>
          </div>

          {/* Visual - Logo Image */}
          <div className="order-1 lg:order-2 flex justify-center relative">
            <div
              className="reveal opacity-0 scale-95 blur-[4px] transition-all duration-1200 ease-out relative"
              style={{ transitionDelay: '200ms' }}
            >
              {/* Logo Image instead of green circle */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl animate-breathe bg-white">
                <img
                  src="/images/logo-main.png"
                  alt="Centro de Medicina Integral Lavoisier"
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Floating Cards */}
              <div
                className="absolute -top-4 -right-4 sm:top-0 sm:right-0 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float"
                style={{ animationDelay: '0ms' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#5D8A66]/10 flex items-center justify-center">
                    <img
                      src="/images/logo.png"
                      alt="Natural"
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1B4D3E]">100% Natural</p>
                    <p className="text-sm text-[#5A5A5A]">Sin químicos</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 sm:bottom-8 sm:-left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float"
                style={{ animationDelay: '1000ms' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#C67B5C]/10 flex items-center justify-center text-2xl">
                    ⭐
                  </div>
                  <div>
                    <p className="font-semibold text-[#1B4D3E]">+15 Años</p>
                    <p className="text-sm text-[#5A5A5A]">Experiencia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .reveal {
          transition-property: opacity, transform, filter;
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
          filter: blur(0) !important;
        }
        
        @keyframes breathe {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 25px 50px -12px rgba(27, 77, 62, 0.25);
          }
          50% { 
            transform: scale(1.03);
            box-shadow: 0 30px 60px -12px rgba(27, 77, 62, 0.35);
          }
        }
        
        .animate-breathe {
          animation: breathe 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
