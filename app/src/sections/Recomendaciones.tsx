import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Droplets, Leaf, Clock, AlertCircle, Check, Sparkles, GraduationCap, Heart, Apple, BookOpen } from 'lucide-react';

const consejosSalud = [
  {
    icon: Heart,
    title: 'Escucha tu cuerpo',
    content: 'Tu cuerpo envía señales constantes. Aprende a identificar cuando necesita descanso, movimiento o alimentación sana. La prevención es la mejor medicina.',
    note: 'Sé consciente de tus sensaciones diarias.',
  },
  {
    icon: Apple,
    title: 'Alimentación consciente',
    content: 'Come para nutrir, no solo para llenar. Prioriza alimentos naturales, evita procesados y escucha las necesidades reales de tu organismo.',
    note: 'Cada alimento es información para tus células.',
  },
  {
    icon: BookOpen,
    title: 'Conocimiento es poder',
    content: 'Entiende cómo funciona tu cuerpo. Saber por qué comes, cómo te mueves y qué te afecta te da el control de tu propia salud.',
    note: 'Eres tu mejor médico cuando estás informado.',
  },
  {
    icon: Leaf,
    title: 'Regreso a lo natural',
    content: 'La naturaleza tiene todo lo que necesitas. Hierbas, alimentos frescos, movimiento al aire libre y conexión con lo elemental.',
    note: 'Menos química, más naturaleza.',
  },
  {
    icon: Clock,
    title: 'Constancia sobre intensidad',
    content: 'Pequeños hábitos saludables mantenidos en el tiempo generan grandes cambios. No busques la perfección, busca la constancia.',
    note: 'La salud es un estilo de vida, no un destino.',
  },
  {
    icon: Sparkles,
    title: 'Mente sana, cuerpo sano',
    content: 'Tu actitud y emociones impactan directamente tu bienestar físico. Cultiva pensamientos positivos, gratitud y paz interior.',
    note: 'Sanar es más que tratar síntomas.',
  },
];

const habitosSaludables = {
  alimentacion: [
    'Come conscientemente: mastica bien y disfruta cada bocado',
    'Prioriza alimentos de temporada y cercanía',
    'Reduce azúcares y procesados gradualmente',
    'Hidrátate con agua tibia entre comidas',
    'Incluye vegetales de todos los colores',
    'Escucha tu hambre real vs. ansiedad emocional',
  ],
  movimiento: [
    'Camine 30 minutos diarios al aire libre',
    'Estira tu cuerpo al despertar y antes de dormir',
    'Evita estar sentado más de 1 hora seguida',
    'Encuentra una actividad que disfrutes: bailar, nadar, yoga',
    'Fortalece tu núcleo abdominal gradualmente',
    'Respira profundamente varias veces al día',
  ],
  descanso: [
    'Duerme 7-8 horas en horarios regulares',
    'Desconecta pantallas 1 hora antes de dormir',
    'Crea una rutina de relajación nocturna',
    'Toma siestas cortas si tu cuerpo las pide',
    'Respeta tus ritmos naturales de energía',
    'El descanso es tan importante como la actividad',
  ],
};

const rutinasSalud = [
  { 
    title: 'Mañana energizante', 
    time: '6:00 - 8:00 AM',
    habits: ['Agua tibia con limón', 'Estiramientos suaves', 'Desayuno nutritivo']
  },
  { 
    title: 'Mediodía activo', 
    time: '11:00 AM - 2:00 PM',
    habits: ['Almuerzo balanceado', 'Paseo corto', 'Momento de pausa']
  },
  { 
    title: 'Tarde renovadora', 
    time: '4:00 - 6:00 PM',
    habits: ['Snack saludable', 'Movimiento o ejercicio', 'Hidratación']
  },
  { 
    title: 'Noche restauradora', 
    time: '7:00 - 9:00 PM',
    habits: ['Cena ligera', 'Desconexión digital', 'Meditación o lectura']
  },
];

export function Recomendaciones() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'homeopatia' | 'fitoterapia' | 'jugoterapia'>('homeopatia');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const tabs = [
    { id: 'homeopatia', label: 'Filosofía', icon: Heart },
    { id: 'fitoterapia', label: 'Hábitos', icon: Leaf },
    { id: 'jugoterapia', label: 'Rutinas', icon: Clock },
  ] as const;

  return (
    <section
      id="recomendaciones"
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#F7F5F0] relative overflow-hidden"
    >
      {/* Blur decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#5D8A66]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#C67B5C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
          }`}
        >
          {/* Escuela Nacional de Salud Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1B4D3E] text-white px-5 py-2.5 rounded-full mb-6 shadow-lg">
            <GraduationCap className="w-5 h-5" />
            <span className="font-semibold text-sm">Escuela Nacional de Salud</span>
          </div>
          
          <span className="inline-block text-[#C67B5C] font-semibold text-sm uppercase tracking-widest mb-4">
            Sé tu propia medicina
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4D3E] mb-6">
            Educa tu cuerpo, sana tu vida
          </h2>
          <p className="text-lg text-[#5A5A5A]">
            Te damos las herramientas para que tomes el control de tu salud. 
            Aprende a prevenir y sanar de manera natural.
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
          }`}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setExpandedIndex(0);
                }}
                className={`group flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#1B4D3E] text-white shadow-lg'
                    : 'bg-white text-[#1B4D3E] hover:bg-[#5D8A66] hover:text-white shadow-sm'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div
          className={`transition-all duration-500 ${
            isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          }`}
        >
          {/* Consejos de Salud */}
          {activeTab === 'homeopatia' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {consejosSalud.map((item, index) => {
                const Icon = item.icon;
                const isExpanded = expandedIndex === index;
                
                return (
                  <div
                    key={index}
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className={`group bg-white rounded-2xl p-5 cursor-pointer transition-all duration-500 hover:shadow-xl ${
                      isExpanded ? 'shadow-xl ring-2 ring-[#5D8A66]/30 md:col-span-2 lg:col-span-1' : 'shadow-sm hover:-translate-y-1'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 50}ms`,
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isExpanded ? 'bg-[#1B4D3E]' : 'bg-[#5D8A66]/10 group-hover:bg-[#5D8A66]'
                      }`}>
                        <Icon className={`w-6 h-6 transition-colors ${
                          isExpanded ? 'text-white' : 'text-[#5D8A66] group-hover:text-white'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-lg font-semibold text-[#1B4D3E]">
                            {item.title}
                          </h3>
                          <ChevronDown className={`w-5 h-5 text-[#5A5A5A] transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`} />
                        </div>
                        
                        <div className={`overflow-hidden transition-all duration-500 ${
                          isExpanded ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                        }`}>
                          <p className="text-[#5A5A5A] text-sm leading-relaxed mb-2">
                            {item.content}
                          </p>
                          <p className="text-[#C67B5C] text-xs font-medium">
                            {item.note}
                          </p>
                        </div>
                        
                        {!isExpanded && (
                          <p className="text-[#5A5A5A] text-sm mt-2 line-clamp-2">
                            {item.content.substring(0, 80)}...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Hábitos Saludables */}
          {activeTab === 'fitoterapia' && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Alimentación */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#C67B5C]/10 rounded-xl flex items-center justify-center">
                    <Apple className="w-5 h-5 text-[#C67B5C]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#1B4D3E]">Alimentación</h3>
                </div>
                <ul className="space-y-3">
                  {habitosSaludables.alimentacion.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#5A5A5A]">
                      <span className="w-5 h-5 bg-[#5D8A66]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-[#5D8A66] rounded-full" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Movimiento */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#5D8A66]/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#5D8A66]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#1B4D3E]">Movimiento</h3>
                </div>
                <ul className="space-y-3">
                  {habitosSaludables.movimiento.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#5A5A5A]">
                      <span className="w-5 h-5 bg-[#5D8A66]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-[#5D8A66] rounded-full" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Descanso */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#1B4D3E]/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#1B4D3E]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#1B4D3E]">Descanso</h3>
                </div>
                <ul className="space-y-3">
                  {habitosSaludables.descanso.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#5A5A5A]">
                      <span className="w-5 h-5 bg-[#5D8A66]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-[#5D8A66] rounded-full" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Rutinas de Salud */}
          {activeTab === 'jugoterapia' && (
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <p className="text-[#5A5A5A] mb-2">Estructura tu día para potenciar tu bienestar</p>
                <p className="text-[#C67B5C] font-semibold text-sm">Pequeños hábitos que transforman tu salud</p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {rutinasSalud.map((rutina, index) => (
                  <div
                    key={index}
                    className="group bg-[#F7F5F0] rounded-2xl p-5 hover:bg-[#5D8A66] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-[#1B4D3E] group-hover:text-white transition-colors">
                        {rutina.time}
                      </span>
                    </div>
                    <h4 className="text-[#3D3D3D] font-semibold mb-2 group-hover:text-white transition-colors">
                      {rutina.title}
                    </h4>
                    <ul className="space-y-1">
                      {rutina.habits.map((habit, i) => (
                        <li key={i} className="text-sm text-[#5A5A5A] group-hover:text-white/90 transition-colors flex items-center gap-1">
                          <span className="w-1 h-1 bg-[#5D8A66] group-hover:bg-white rounded-full" />
                          {habit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-[#1B4D3E]/5 rounded-2xl">
                <p className="text-sm text-[#5A5A5A] text-center">
                  <span className="font-semibold text-[#1B4D3E]">Recuerda:</span> No se trata de perfección, sino de progreso. Comienza con un hábito y construye desde ahí.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
