import { useEffect, useRef, useState, useMemo } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';

const tabs = [
  { id: 'jarabes', label: 'Jarabes 500ml' },
  { id: 'gotas', label: 'Gotas' },
  { id: 'purgantes', label: 'Purgantes' },
  { id: 'destacados', label: 'Destacados' },
];

const allProductos = {
  jarabes: [
    { name: '44 Plantas + Clorofila', size: '500 ml', description: 'Vesícula, hígado, tumores, riñón, indigestión, ácido úrico, hemorroides, estreñimiento, gastritis.', tags: ['Hígado', 'Riñón', 'Digestión'], badge: 'POPULAR' },
    { name: '133 Herbs / 133 Plantas', size: '500 ml', description: 'Alivia tumores, próstata, prolapso, ideal para hepatitis, cirrosis, ácido úrico. Anti-cancerígeno.', tags: ['Próstata', 'Anti-cancer', 'Hepático'] },
    { name: 'Alcachofa', size: '500 ml', description: 'Protege el hígado y ayuda a su recuperación. Favorece la función biliar y digestión de grasas.', tags: ['Hígado', 'Vesícula', 'Digestión'] },
    { name: 'Aloe Xin / Aloe Vera', size: '500 ml', description: 'Cicatrizante natural, ideal para úlceras gástricas, desórdenes digestivos. Regenerador y humectante.', tags: ['Cicatrizante', 'Estómago', 'Piel'], badge: 'NUEVO' },
    { name: 'Colágeno + Biotina', size: '500 ml', description: 'Mejora y protege el colágeno del organismo. Elasticidad y textura a la piel. Regenerador de articulaciones.', tags: ['Piel', 'Articular', 'Antiedad'] },
    { name: 'Broncomiel', size: '500 ml', description: 'Tratamiento de vías respiratorias, alivia catarros nasales, tos, asma y bronquitis.', tags: ['Respiratorio', 'Tos', 'Asma'] },
    { name: 'Circulen Forte', size: '500 ml', description: 'Activa la circulación, adelgaza la sangre, evita trombosis, regula el corazón y presión arterial.', tags: ['Circulación', 'Corazón', 'Presión'] },
    { name: 'Cola de Caballo Gold', size: '500 ml', description: 'Disminuye retención de líquidos, cálculos renales, infecciones urinarias. Fortalece huesos y uñas.', tags: ['Riñón', 'Huesos', 'Diurético'] },
    { name: 'Ancolistrog / Anti Colesterol', size: '500 ml', description: 'Elimina el colesterol y triglicéridos. Eficaz en diabetes, purifica la sangre.', tags: ['Colesterol', 'Diabetes', 'Sangre'] },
    { name: 'Artridol Duo Forte', size: '500 ml', description: 'Tratamiento del dolor e inflamación postraumática de tendones, ligamentos y articulaciones.', tags: ['Articular', 'Antiinflamatorio', 'Dolor'] },
    { name: 'Glucosamina + Condroitina', size: '500 ml', description: 'Coadyuvante en artrosis primaria y secundaria. Edifica cartílago articular y tejido conectivo.', tags: ['Artrosis', 'Cartílago', 'Rodilla'] },
    { name: 'Neuroforzan / Vino Nutri Cerebral', size: '500 ml', description: 'Aporta nutrientes para coordinar neurotransmisores cerebrales. Rico en DHA (Omega 3).', tags: ['Cerebro', 'Memoria', 'Concentración'] },
    { name: 'Moringa Oleifera', size: '500 ml', description: 'Conocida como el "Árbol de la Vida". Más de 100 nutrientes, 300 enfermedades. Antioxidante, energizante.', tags: ['Energía', 'Nutritivo', 'Antioxidante'], badge: 'TOP VENTAS' },
    { name: 'Vitacerebrina Francesa', size: '500 ml', description: 'Cansancio cerebral e insomnio, mareos, desvanecimientos, pérdida de memoria, agotamiento visual.', tags: ['Cerebro', 'Memoria', 'Estudiantes'], badge: 'RECOMENDADO' },
    { name: 'Maca / Mac-K', size: '500 ml', description: 'Ginseng de los Andes. Aumenta energía, libido, vitalidad. Rica en vitaminas y minerales.', tags: ['Energía', 'Libido', 'Vitalidad'] },
    { name: 'Melatonina Complex', size: '500 ml', description: 'Tratamiento para control del sueño. Contiene pasiflora, valeriana, melisa y amapola.', tags: ['Insomnio', 'Relajante', 'Sueño'] },
    { name: 'Cartílago de Tiburón', size: '500 ml', description: 'Refuerza sistema inmunológico, antiinflamatorio, previene osteoporosis, anti-cancerígeno.', tags: ['Inmunidad', 'Huesos', 'Anti-cancer'] },
    { name: 'Uña de Gato', size: '500 ml', description: 'Antiinflamatorio, cicatrizante, ayuda con problemas gástricos, úlceras, artritis, anticancerígeno.', tags: ['Inmunidad', 'Antiinflamatorio', 'Cicatrizante'] },
    { name: 'Sábila / Aloe Vera', size: '500 ml', description: 'Regenerador celular, cicatrizante, laxante natural, antiinflamatorio.', tags: ['Piel', 'Digestión', 'Natural'] },
    { name: 'Noni', size: '500 ml', description: 'Fortalece el sistema inmunológico, analgésico natural, regula la presión arterial.', tags: ['Inmunidad', 'Dolor', 'Presión'] },
    { name: 'Mangostino', size: '500 ml', description: 'Antioxidante, antiinflamatorio, refuerza el sistema inmunológico.', tags: ['Antioxidante', 'Inmunidad', 'Antiinflamatorio'] },
    { name: 'Graviola', size: '500 ml', description: 'Anti-cancerígeno, refuerza el sistema inmunológico, regula el azúcar en sangre.', tags: ['Anti-cancer', 'Inmunidad', 'Diabetes'] },
    { name: 'Curcuma / Cúrcuma', size: '500 ml', description: 'Antiinflamatorio natural, antioxidante, ayuda a la digestión.', tags: ['Antiinflamatorio', 'Digestión', 'Antioxidante'] },
    { name: 'Jengibre', size: '500 ml', description: 'Antiinflamatorio, ayuda a la digestión, alivia náuseas, mejora circulación.', tags: ['Digestión', 'Circulación', 'Natural'] },
  ],
  gotas: [
    { name: 'Raíz de Valeriana Gotas', size: '40 ml', description: 'Reconstituyente cerebral y visual. Elimina estrés, amnesia, insomnio. Tonifica el sistema nervioso.', tags: ['Relajante', 'Sueño', 'Nervios'] },
    { name: 'Sangre de Drago Gotas', size: '40 ml', description: 'Para úlceras pépticas, gastritis, colitis. Uso externo: heridas, quemaduras, faringitis, psoriasis.', tags: ['Cicatrizante', 'Heridas', 'Digestivo'] },
    { name: 'Cannabis Tintura', size: '40 ml', description: 'Epilepsia, migraña, ansiedad, cólicos menstruales, control de diabetes.', tags: ['Dolor', 'Ansiedad', 'Relax'], badge: 'POPULAR' },
    { name: 'Gotas Milagrosas', size: '40 ml', description: 'Tratamiento eficaz en cataratas, carnosidades, nubes, conjuntivitis e inflamaciones.', tags: ['Ocular', 'Visión', 'Cataratas'] },
    { name: 'Nasalin Descongestionante', size: '40 ml', description: 'Descongestionante nasal de acción rápida. Para resfrío, rinitis alérgica, sinusitis.', tags: ['Nasal', 'Alergia', 'Sinusitis'] },
    { name: 'Oil of Oregano', size: '59 ml', description: 'Potente extracto natural con propiedades antibacterianas, antifúngicas y antioxidantes.', tags: ['Antibacterial', 'Inmunidad', 'Natural'] },
    { name: 'Propóleo Gotas', size: '30 ml', description: 'Antibiótico natural, refuerza el sistema inmunológico, cicatrizante.', tags: ['Inmunidad', 'Antibiótico', 'Natural'] },
    { name: 'Extracto de Echinacea', size: '30 ml', description: 'Estimulante del sistema inmunológico, previene resfriados.', tags: ['Inmunidad', 'Resfriado', 'Defensas'] },
    { name: 'Ginkgo Biloba Gotas', size: '30 ml', description: 'Mejora la circulación cerebral, memoria y concentración.', tags: ['Cerebro', 'Memoria', 'Circulación'] },
    { name: 'Extracto de Milk Thistle', size: '30 ml', description: 'Protector hepático, desintoxicante, regenerador del hígado.', tags: ['Hígado', 'Desintoxicante', 'Protector'] },
  ],
  purgantes: [
    { name: 'Piperzan', size: '60 ml', description: 'Antihelmíntico. Contiene: Piperazina Hexahidrato 25%, Ácido cítrico 7%, Leche de Higuerón 10%.', tags: ['Antiparasitario', 'Intestinal'] },
    { name: 'Purgante 123 en Polvo', size: 'Sobre', description: 'Apendicitis, estados dolorosos e inflamatorios del aparato digestivo. Antibilious eficaz.', tags: ['Digestivo', 'Limpieza', 'Natural'], badge: 'EFICAZ' },
    { name: 'Cascara Sagrada', size: '500 ml', description: 'Laxante natural suave, regula el tránsito intestinal.', tags: ['Laxante', 'Intestinal', 'Natural'] },
    { name: 'Senna / Sen', size: '500 ml', description: 'Laxante natural, alivia el estreñimiento ocasional.', tags: ['Laxante', 'Estreñimiento', 'Natural'] },
  ],
  destacados: [
    { name: 'Moringa Oleifera', size: '500 ml', description: 'Conocida como el "Árbol de la Vida". Más de 100 nutrientes, 300 enfermedades. Antioxidante, energizante.', tags: ['Energía', 'Nutritivo', 'Antioxidante'], badge: 'TOP VENTAS' },
    { name: 'Vitacerebrina Francesa', size: '500 ml', description: 'Cansancio cerebral e insomnio, mareos, desvanecimientos, pérdida de memoria, agotamiento visual.', tags: ['Cerebro', 'Memoria', 'Estudiantes'], badge: 'RECOMENDADO' },
    { name: 'Maca / Mac-K', size: '500 ml', description: 'Ginseng de los Andes. Aumenta energía, libido, vitalidad. Rica en vitaminas y minerales.', tags: ['Energía', 'Libido', 'Vitalidad'] },
    { name: 'Melatonina Complex', size: '500 ml', description: 'Tratamiento para control del sueño. Contiene pasiflora, valeriana, melisa y amapola.', tags: ['Insomnio', 'Relajante', 'Sueño'] },
    { name: 'Cartílago de Tiburón', size: '500 ml', description: 'Refuerza sistema inmunológico, antiinflamatorio, previene osteoporosis, anti-cancerígeno.', tags: ['Inmunidad', 'Huesos', 'Anti-cancer'] },
    { name: 'Uña de Gato', size: '500 ml', description: 'Antiinflamatorio, cicatrizante, ayuda con problemas gástricos, úlceras, artritis, anticancerígeno.', tags: ['Inmunidad', 'Antiinflamatorio', 'Cicatrizante'] },
    { name: 'Spirulina', size: '500 ml', description: 'Alga supernutritiva, proteína vegetal completa, desintoxicante.', tags: ['Nutrición', 'Proteína', 'Energía'] },
    { name: 'Chlorella', size: '500 ml', description: 'Desintoxicante natural, rica en clorofila, fortalece el sistema inmunológico.', tags: ['Desintoxicante', 'Clorofila', 'Inmunidad'] },
    { name: 'Clorofila Líquida', size: '500 ml', description: 'Desintoxicante, alcalinizante, oxigena la sangre.', tags: ['Desintoxicante', 'Oxigenante', 'Alcalinizante'] },
    { name: 'Omega 3 / Aceite de Pescado', size: '500 ml', description: 'Beneficia el corazón, cerebro, articulaciones y vista.', tags: ['Corazón', 'Cerebro', 'Articular'] },
    { name: 'Vitamina D3 + K2', size: '500 ml', description: 'Fortalece huesos, dientes, sistema inmunológico.', tags: ['Huesos', 'Inmunidad', 'Vitamina'] },
    { name: 'Complejo B', size: '500 ml', description: 'Energía, sistema nervioso, metabolismo celular.', tags: ['Energía', 'Nervios', 'Metabolismo'] },
  ],
};

export function Productos() {
  const [activeTab, setActiveTab] = useState('jarabes');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
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

  // Buscar en TODOS los productos
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const allProducts = Object.values(allProductos).flat();
    
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Productos a mostrar (limitados inicialmente)
  const displayProducts = searchQuery.trim() 
    ? searchResults 
    : allProductos[activeTab as keyof typeof allProductos].slice(0, showAll ? undefined : 12);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchQuery('');
    setShowAll(false);
  };

  const totalProducts = Object.values(allProductos).flat().length;

  return (
    <section
      id="productos"
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white relative overflow-hidden"
    >
      {/* Blur decorations */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-[#5D8A66]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#C67B5C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-[#C67B5C] font-semibold text-sm uppercase tracking-widest mb-4">
            Nuestros Productos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4D3E] mb-6">
            Catálogo de medicina natural
          </h2>
          <p className="text-lg text-[#5A5A5A]">
            Más de {totalProducts} productos naturales de alta calidad. Jarabes, gotas y suplementos elaborados con ingredientes seleccionados.
          </p>
        </div>

        {/* Search */}
        <div
          className={`max-w-xl mx-auto mb-8 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A5A5A] group-focus-within:text-[#5D8A66] transition-colors" />
            <input
              type="text"
              placeholder="Buscar productos (ej: moringa, vitamina, dolor...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-[#F7F5F0] rounded-full border-2 border-transparent focus:border-[#5D8A66] focus:outline-none transition-all focus:shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-[#C67B5C] hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-center text-sm text-[#5D8A66] mt-2 font-medium">
              {searchResults.length} producto{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Tabs - only show when not searching */}
        {!searchQuery && (
          <div
            className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#5D8A66] text-white shadow-lg'
                    : 'border-2 border-[#5D8A66] text-[#1B4D3E] hover:bg-[#5D8A66] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product, index) => (
            <div
              key={product.name}
              className={`group bg-[#F7F5F0] rounded-2xl p-5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${300 + index * 40}ms` }}
            >
              {/* Top line animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5D8A66] to-[#C67B5C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Badge */}
              {product.badge && (
                <span className="absolute top-3 right-3 bg-[#C67B5C] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {product.badge}
                </span>
              )}

              {/* Icon */}
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/images/producto-jarabe.webp"
                  alt=""
                  loading="lazy"
                  className="w-9 h-9 object-contain"
                />
              </div>

              {/* Content */}
              <h4 className="font-serif text-lg font-semibold text-[#1B4D3E] mb-1 group-hover:text-[#5D8A66] transition-colors">
                {product.name}
              </h4>
              <p className="text-[#C67B5C] font-semibold text-sm mb-3">
                {product.size}
              </p>
              <p className="text-[#5A5A5A] text-sm leading-relaxed mb-4 line-clamp-3">
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#5D8A66]/10 text-[#1B4D3E] text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less */}
        {!searchQuery && allProductos[activeTab as keyof typeof allProductos].length > 12 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 bg-[#F7F5F0] text-[#1B4D3E] px-6 py-3 rounded-full font-semibold hover:bg-[#5D8A66] hover:text-white transition-all duration-300"
            >
              {showAll ? 'Ver menos' : 'Ver más productos'}
              <ChevronDown className={`w-5 h-5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#5A5A5A] mb-4">¿No encuentras lo que buscas?</p>
          <a
            href="https://wa.me/573166998154?text=Hola,%20quiero%20ver%20el%20catálogo%20completo%20de%20productos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C67B5C] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#B56A4D] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            Ver catálogo completo por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
