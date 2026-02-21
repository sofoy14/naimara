import { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const tratamientos = [
  {
    title: 'Homeopatía',
    description: 'La ciencia homeopática trata enfermedades patológicas, oncológicas y más, con un enfoque humano, respetuoso y consciente.',
    features: [
      'Compatible con medicamentos de EPS',
      'Seguro en embarazo y lactancia',
      'Sin efectos tóxicos ni adictivos',
      'Medicamentos registrados ante la Secretaría de Salud',
    ],
    image: '/images/tratamiento-homeopatia.png',
    cta: 'Consultar Homeopatía',
    reverse: false,
  },
  {
    title: 'Fitoterapia',
    description: 'Planes alimenticios personalizados que incluyen leches vegetales, desayunos nutritivos, almuerzos balanceados y cenas saludables.',
    features: [
      'Leches vegetales (avena, almendras, linaza, chía)',
      'Planes de desayuno, almuerzo y cena',
      'Aceites vegetales extra virgenes',
      'Aromáticas medicinales terapéuticas',
    ],
    image: '/images/tratamiento-fitoterapia.png',
    cta: 'Plan Nutricional',
    reverse: true,
  },
  {
    title: 'Jugoterapia',
    description: 'Licuados y batidos terapéuticos programados para potenciar tu salud con ingredientes naturales en horarios específicos.',
    features: [
      'Licuados 6am - 11am - 4pm',
      'Combinaciones frutales y vegetales',
      'Preparados con agua tibia',
      'Planes de 15 a 20 días personalizados',
    ],
    image: '/images/tratamiento-jugoterapia.png',
    cta: 'Programa de Jugos',
    reverse: false,
  },
];

export function Tratamientos() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const itemsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);

    itemsRef.current.forEach((item) => {
      if (item) itemsObserver.observe(item);
    });

    return () => {
      headerObserver.disconnect();
      itemsObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="tratamientos"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#F7F5F0] relative overflow-hidden"
    >
      {/* Blur decorations */}
      <div className="absolute top-[10%] left-[-5%] w-72 h-72 bg-[#C67B5C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-96 h-96 bg-[#5D8A66]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 sm:mb-20 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'
          }`}
        >
          <span className="inline-block text-[#C67B5C] font-semibold text-sm uppercase tracking-widest mb-4">
            Tratamientos Especializados
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4D3E] mb-6">
            Medicina alternativa certificada
          </h2>
          <p className="text-lg text-[#5A5A5A]">
            Nuestros tratamientos están avalados por el Ministerio de Salud y no
            presentan contraindicaciones ni efectos tóxicos.
          </p>
        </div>

        {/* Tratamientos */}
        <div className="space-y-20 sm:space-y-28">
          {tratamientos.map((tratamiento, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              data-index={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-1000 ${
                visibleItems.has(index)
                  ? 'opacity-100 translate-y-0 blur-0'
                  : 'opacity-0 translate-y-20 blur-sm'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {/* Content */}
              <div className={tratamiento.reverse ? 'lg:order-2' : ''}>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B4D3E] mb-4">
                  {tratamiento.title}
                </h3>
                <p className="text-[#5A5A5A] text-base sm:text-lg mb-6 leading-relaxed">
                  {tratamiento.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {tratamiento.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-[#3D3D3D]">
                      <span className="w-6 h-6 rounded-full bg-[#5D8A66] flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </span>
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/573166998154"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-[#C67B5C] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[#B56A4D] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {tratamiento.cta}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* Image */}
              <div className={`flex justify-center ${tratamiento.reverse ? 'lg:order-1' : ''}`}>
                <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl w-full max-w-md flex items-center justify-center min-h-[280px] sm:min-h-[350px] relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
                  <div className="absolute w-40 h-40 sm:w-52 sm:h-52 bg-[#5D8A66]/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                  <img
                    src={tratamiento.image}
                    alt={tratamiento.title}
                    className="w-48 h-48 sm:w-64 sm:h-64 object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
