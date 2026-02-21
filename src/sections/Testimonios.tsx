import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

const testimonios = [
  {
    quote: 'El tratamiento homeopático ha sido maravilloso. Me sentí acompañada durante todo el proceso y los resultados fueron excelentes. Totalmente recomendado.',
    name: 'Maria Bonifacia Mosquera',
    location: 'Turbo, Antioquia',
    initial: 'M',
  },
  {
    quote: 'El plan nutricional cambió mi vida. Aprendí a alimentarme correctamente y mi energía aumentó notablemente. El equipo de Lavoisier es muy profesional.',
    name: 'José Gulfo',
    location: 'Popayán, Cauca',
    initial: 'J',
  },
  {
    quote: 'Excelente atención en todas mis consultas. La homeopatía me ayudó muchísimo con mi condición y el trato humano hace toda la diferencia.',
    name: 'Paciente Satisfecho',
    location: 'Popayán, Cauca',
    initial: 'P',
  },
];

export function Testimonios() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setCardsVisible((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
    );

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    cardsRef.current.forEach((card) => {
      if (card) cardsObserver.observe(card);
    });

    return () => {
      sectionObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#1B4D3E] relative overflow-hidden"
    >
      {/* Blur decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#5D8A66]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C67B5C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
          }`}
        >
          <span className="inline-block text-[#D9987A] font-semibold text-sm uppercase tracking-widest mb-4">
            Testimonios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="text-lg text-white/80">
            Historias reales de personas que han mejorado su calidad de vida con
            nuestros tratamientos.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonios.map((testimonio, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              data-index={index}
              className={`bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/10 transition-all duration-700 hover:-translate-y-3 hover:bg-white/15 hover:shadow-2xl ${
                cardsVisible.has(index)
                  ? 'opacity-100 translate-y-0 blur-0'
                  : 'opacity-0 translate-y-12 blur-sm'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <Quote className="w-10 h-10 text-[#D9987A] mb-4" />

              <p className="font-serif text-lg sm:text-xl italic text-white mb-6 leading-relaxed">
                "{testimonio.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C67B5C] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonio.initial}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonio.name}</p>
                  <p className="text-sm text-white/70">{testimonio.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
