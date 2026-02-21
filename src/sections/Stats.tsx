import { useEffect, useRef, useState } from 'react';

const stats = [
  { number: '9+', label: 'Servicios Especializados' },
  { number: '15+', label: 'Años de Experiencia' },
  { number: '100%', label: 'Natural y Seguro' },
  { number: '', label: 'Popayán, Cauca' },
];

export function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#1B4D3E] py-12 sm:py-16 -mt-8 relative z-10 overflow-hidden"
    >
      {/* Blur decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#5D8A66]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#C67B5C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0 blur-0'
                  : 'opacity-0 translate-y-8 blur-sm'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {stat.number && (
                <span className="block font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D9987A] mb-2">
                  {stat.number}
                </span>
              )}
              <span className="text-sm sm:text-base text-white/90">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
