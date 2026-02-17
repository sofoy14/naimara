import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Droplets, Leaf, Clock, AlertCircle, Check, Sparkles } from 'lucide-react';

const recomendacionesHomeopaticas = [
  {
    icon: Droplets,
    title: 'Evitar durante el tratamiento',
    content: 'Cremas calientes, gel adelgazantes, talcos, yodosalin, cigarrillo, perfumes, licor, carne de cerdo y res, granos, tinto, té, vinagre, tabaco, café, ají, condimentos, enlatados, paquetes, botellas, gaseosas, comida chatarra, carnes frías, embutidos, dulce (usar Stevia), cítricos, ajo y bajo de sal.',
    note: 'Todo esto anula el efecto de los medicamentos.',
  },
  {
    icon: Check,
    title: 'Sin contraindicaciones',
    content: 'Los medicamentos homeopáticos no tienen efectos tóxicos y se pueden ingerir con medicamentos de la EPS sin riesgo alguno, incluso en embarazo y lactancia.',
    note: 'Medicamentos para tensión, corazón, riñón, diabetes, estómago, gastritis, anticoagulantes, etc.',
  },
  {
    icon: Clock,
    title: 'Horario de toma',
    content: 'Los medicamentos no deben tomarse a horas de la comida. Solo media hora antes o una hora después de haber ingerido alguna bebida o alimento.',
    note: 'Siga las recomendaciones profesionales homeopáticas.',
  },
  {
    icon: Leaf,
    title: 'Conservación',
    content: 'Conservar en lugar fresco, seco y envases bien cerrados. Lejos del alcance de los niños.',
    note: 'No llevar en cartera o bolsos (cosméticos y celulares los alteran).',
  },
  {
    icon: AlertCircle,
    title: 'Aggravation - Inicio de la mejoría',
    content: 'Las medicinas tienden a acentuar o agravar los síntomas al inicio del tratamiento. No alarmarse, no tiene sobredosis.',
    note: 'Cualquier duda comunicarse al 316 699 81 54.',
  },
  {
    icon: Sparkles,
    title: 'Campos electromagnéticos',
    content: 'NO dejar cerca a campos electromagnéticos (celulares, computadores, microondas, TV). Tomar en cucharas de plástico.',
    note: 'Globulos diluirlos en la boca, gotas en un cuarto de vaso de cristal (no de la llave).',
  },
];

const recomendacionesFitoterapia = {
  desayunos: [
    'Ajonjolí – linaza – avena – chía con semilla sandia',
    'Almendras – linaza – avena con porción de piña',
    'Pecana – chía – linaza – avena – naranja',
    'Ajonjolí – linaza – chía – avena con papaya – manzana',
    'Linaza – almendras – avena con mandarina – arepa',
    'Té o aromática de flor de Jamaica con naranja',
  ],
  almuerzos: [
    'Yuca sancochada con sudado de pescado encebollado',
    'Sancocho de mazorca – alverjas – cebada – papa – habichuelas',
    'Arroz con saltaditos de brócolis con alverjas',
    'Sancocho de yuca – ollucos – frijoles verdes – mazorca',
    'Arroz con verduras: brócolis – habichuelas – alverjas – pimentón',
    'Garbanzos con arracachas, ensalada de repollo y aguacates',
  ],
  cenas: [
    'Aromática de jengibre con tres manzanas',
    'Aromática de flor de Jamaica con peras',
    'Leche vegetal con granadillas',
    'Aromática de toronjil con frutas',
  ],
};

const jugoterapias = [
  { name: 'Piña-Manzana-Pepino', time: '6AM', duration: '15 días' },
  { name: 'Ajo-Pimentón', time: '11AM', duration: '15 días' },
  { name: 'Linaza-Mora', time: '4PM', duration: '15 días' },
  { name: 'Pepino-Apio-Manzana-Linaza', time: '6AM', duration: '15 días' },
  { name: 'Brócolis-Lechuga-Zanahoria', time: '11AM', duration: '15 días' },
  { name: 'Fresa-Mora', time: '4PM', duration: '15 días' },
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
    { id: 'homeopatia', label: 'Homeopatía', icon: Droplets },
    { id: 'fitoterapia', label: 'Fitoterapia', icon: Leaf },
    { id: 'jugoterapia', label: 'Jugoterapia', icon: Sparkles },
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
          <span className="inline-block text-[#C67B5C] font-semibold text-sm uppercase tracking-widest mb-4">
            Guía del Paciente
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4D3E] mb-6">
            Recomendaciones para tu tratamiento
          </h2>
          <p className="text-lg text-[#5A5A5A]">
            Sigue estas indicaciones para obtener los mejores resultados de tu tratamiento natural.
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
          {/* Homeopatía */}
          {activeTab === 'homeopatia' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recomendacionesHomeopaticas.map((item, index) => {
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

          {/* Fitoterapia */}
          {activeTab === 'fitoterapia' && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Desayunos */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#C67B5C]/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#C67B5C]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#1B4D3E]">Desayunos</h3>
                </div>
                <ul className="space-y-3">
                  {recomendacionesFitoterapia.desayunos.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#5A5A5A]">
                      <span className="w-5 h-5 bg-[#5D8A66]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-[#5D8A66] rounded-full" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-[#F7F5F0] rounded-xl">
                  <p className="text-xs text-[#5A5A5A]">
                    <span className="font-semibold text-[#1B4D3E]">Nota:</span> Las leches licuadas en agua tibia, máximo 3 vasos por día. No hervir.
                  </p>
                </div>
              </div>

              {/* Almuerzos */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#5D8A66]/10 rounded-xl flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-[#5D8A66]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#1B4D3E]">Almuerzos</h3>
                </div>
                <ul className="space-y-3">
                  {recomendacionesFitoterapia.almuerzos.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#5A5A5A]">
                      <span className="w-5 h-5 bg-[#5D8A66]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-[#5D8A66] rounded-full" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-[#F7F5F0] rounded-xl">
                  <p className="text-xs text-[#5A5A5A]">
                    <span className="font-semibold text-[#1B4D3E]">Nota:</span> Verduras semicrudas o al vapor. Usar aceites vegetales extra virgen.
                  </p>
                </div>
              </div>

              {/* Cenas */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#1B4D3E]/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#1B4D3E]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#1B4D3E]">Cenas</h3>
                </div>
                <ul className="space-y-3">
                  {recomendacionesFitoterapia.cenas.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#5A5A5A]">
                      <span className="w-5 h-5 bg-[#5D8A66]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-[#5D8A66] rounded-full" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-[#F7F5F0] rounded-xl">
                  <p className="text-xs text-[#5A5A5A]">
                    <span className="font-semibold text-[#1B4D3E]">Nota:</span> Consumir mayor cantidad de manzana y cumplir normas de disciplina.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Jugoterapia */}
          {activeTab === 'jugoterapia' && (
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <p className="text-[#5A5A5A] mb-2">Tomar antes de cada alimento con agua tibia</p>
                <p className="text-[#C67B5C] font-semibold text-sm">Ser disciplinados con las horas exactas</p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {jugoterapias.map((jugo, index) => (
                  <div
                    key={index}
                    className="group bg-[#F7F5F0] rounded-2xl p-5 hover:bg-[#5D8A66] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-[#1B4D3E] group-hover:text-white transition-colors">
                        {jugo.time}
                      </span>
                      <span className="text-xs font-medium text-[#5A5A5A] bg-white px-2 py-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">
                        {jugo.duration}
                      </span>
                    </div>
                    <p className="text-[#3D3D3D] font-medium group-hover:text-white transition-colors">
                      {jugo.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-[#1B4D3E]/5 rounded-2xl">
                <p className="text-sm text-[#5A5A5A] text-center">
                  <span className="font-semibold text-[#1B4D3E]">Importante:</span> Tomar aceite de oliva extra virgen 2-3 cucharadas + un vaso de agua tibia con limón, en ayunas y 30 minutos antes de dormir.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
