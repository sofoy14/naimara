import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const servicios = [
  {
    icon: '/images/servicio-medicina.png',
    title: 'Medicina General',
    description: 'Cuidamos tu salud con atención integral, diagnóstico y seguimiento personalizado.',
  },
  {
    icon: '/images/servicio-ginecologia.png',
    title: 'Ginecología',
    description: 'Atención especializada en salud femenina con enfoque preventivo y natural.',
  },
  {
    icon: '/images/servicio-naturopatia.png',
    title: 'Naturopatía',
    description: 'Medicina natural que potencia la capacidad de autocuración de tu cuerpo.',
  },
  {
    icon: '/images/servicio-homeopatia.png',
    title: 'Homeopatía',
    description: 'Tratamiento suave y efectivo para enfermedades patológicas, oncológicas y más.',
  },
  {
    icon: '/images/servicio-osteopatia.png',
    title: 'Osteopatía',
    description: 'Técnicas manuales para restaurar la movilidad y aliviar dolores musculoesqueléticos.',
  },
  {
    icon: '/images/servicio-quiropractica.png',
    title: 'Quiropráctica',
    description: 'Ajustes vertebrales para aliviar dolores y mejorar tu calidad de vida.',
  },
  {
    icon: '/images/servicio-fisioterapia.png',
    title: 'Fisioterapia y Rehabilitación',
    description: 'Recupera tu movilidad y funcionalidad con terapias personalizadas.',
  },
  {
    icon: '/images/servicio-reflexoterapia.png',
    title: 'Reflexoterapia',
    description: 'Estimulación de puntos reflejos en los pies para mejorar tu bienestar general.',
  },
  {
    icon: '/images/servicio-nutricion.png',
    title: 'Nutrición Clínica',
    description: 'Planes alimenticios personalizados: fitoterapia, jugoterapia y más.',
  },
  {
    icon: '/images/servicio-psicologia.png',
    title: 'Psicología',
    description: 'Apoyo emocional y mental para lograr tu equilibrio integral.',
  },
];

export function Servicios() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    const headerEl = sectionRef.current?.querySelector('.section-header');
    if (headerEl) headerObserver.observe(headerEl);

    cardsRef.current.forEach((card) => {
      if (card) cardsObserver.observe(card);
    });

    return () => {
      headerObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white relative overflow-hidden"
    >
      {/* Blur decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#5D8A66]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#C67B5C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div 
          className={`section-header text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'
          }`}
        >
          <span className="inline-block text-[#C67B5C] font-semibold text-sm uppercase tracking-widest mb-4">
            Nuestros Servicios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4D3E] mb-6">
            Atención integral para tu salud
          </h2>
          <p className="text-lg text-[#5A5A5A]">
            Contamos con un equipo de profesionales certificados listos para
            atenderte con los más altos estándares de calidad.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              data-index={index}
              className={`group bg-[#F7F5F0] rounded-3xl p-6 sm:p-8 transition-all duration-700 hover:-translate-y-3 hover:shadow-xl relative overflow-hidden ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0 blur-0'
                  : 'opacity-0 translate-y-16 blur-sm'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Top line animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5D8A66] to-[#C67B5C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                <img
                  src={servicio.icon}
                  alt={servicio.title}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1B4D3E] mb-3 group-hover:text-[#5D8A66] transition-colors">
                {servicio.title}
              </h3>
              <p className="text-[#5A5A5A] text-sm sm:text-base leading-relaxed mb-4">
                {servicio.description}
              </p>

              {/* Link */}
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 text-[#C67B5C] font-semibold text-sm group/link hover:text-[#1B4D3E] transition-colors"
              >
                Ver más
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
