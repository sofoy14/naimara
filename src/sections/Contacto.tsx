import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: '/images/contacto-ubicacion.webp',
    title: 'Dirección',
    content: 'Calle 2C #51-12, Barrio Lomas de Granada\nPopayán, Cauca',
    link: null,
  },
  {
    icon: '/images/contacto-email.webp',
    title: 'Email',
    content: 'saludintegrallavaisier@gmail.com',
    link: 'mailto:saludintegrallavaisier@gmail.com',
  },
  {
    icon: '/images/contacto-telefono.webp',
    title: 'Teléfono',
    content: '613-438-817',
    link: 'tel:+57613438817',
  },
  {
    icon: '/images/contacto-certificado.webp',
    title: 'Registro',
    content: 'Resolución N. 07130\nLey 1164/2007 - MinSalud',
    link: null,
  },
  {
    icon: '/images/contacto-horario.webp',
    title: 'Horario',
    content: 'Domingo a Viernes\n8:00 AM - 6:00 PM',
    link: null,
  },
];

const servicios = [
  'Medicina General',
  'Ginecología',
  'Naturopatía',
  'Homeopatía',
  'Osteopatía',
  'Quiropráctica',
  'Quiropaxia',
  'Fisioterapia y Rehabilitación',
  'Reflexoterapia',
  'Nutrición Clínica',
  'Psicología',
];

export function Contacto() {
  const [isVisible, setIsVisible] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const leftObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLeftVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const rightObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRightVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);
    if (leftRef.current) leftObserver.observe(leftRef.current);
    if (rightRef.current) rightObserver.observe(rightRef.current);

    return () => {
      sectionObserver.disconnect();
      leftObserver.disconnect();
      rightObserver.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hola, soy ${formData.nombre}. ` +
      (formData.servicio ? `Estoy interesado(a) en el servicio de ${formData.servicio}. ` : '') +
      (formData.mensaje ? `${formData.mensaje} ` : '') +
      `Mi teléfono es ${formData.telefono}.`;

    window.open(
      `https://wa.me/573128087003?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#F7F5F0] relative overflow-hidden"
    >
      {/* Blur decorations */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#5D8A66]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#C67B5C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
          }`}
        >
          <span className="inline-block text-[#C67B5C] font-semibold text-sm uppercase tracking-widest mb-4">
            Contacto
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4D3E] mb-6">
            Agenda tu cita hoy
          </h2>
          <p className="text-lg text-[#5A5A5A]">
            Estamos listos para atenderte. Escríbenos por WhatsApp o completa el
            formulario.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Info */}
          <div
            ref={leftRef}
            className={`transition-all duration-1000 ${
              leftVisible ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 -translate-x-16 blur-sm'
            }`}
          >
            <h3 className="font-serif text-2xl font-semibold text-[#1B4D3E] mb-6">
              Información de Contacto
            </h3>

            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <img
                      src={item.icon}
                      alt={item.title}
                      loading="lazy"
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1B4D3E]">{item.title}</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-[#5A5A5A] hover:text-[#C67B5C] transition-colors whitespace-pre-line"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-[#5A5A5A] whitespace-pre-line">
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-2xl p-6 text-white shadow-lg">
              <h4 className="font-serif text-xl font-semibold mb-2">
                WhatsApp Directo
              </h4>
              <p className="text-white/90 mb-4">
                Responde más rápido y agenda tu cita al instante
              </p>
              <a
                href="https://wa.me/573128087003"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#25D366] px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div
            ref={rightRef}
            className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-1000 ${
              rightVisible ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 translate-x-16 blur-sm'
            }`}
          >
            <h3 className="font-serif text-2xl font-semibold text-[#1B4D3E] mb-2">
              Enviar Mensaje
            </h3>
            <p className="text-[#5A5A5A] mb-6">
              Completa el formulario y te contactaremos pronto.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1B4D3E] mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 bg-[#F7F5F0] rounded-xl border-2 border-transparent focus:border-[#5D8A66] focus:outline-none transition-all focus:shadow-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B4D3E] mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="Tu número de teléfono"
                  className="w-full px-4 py-3 bg-[#F7F5F0] rounded-xl border-2 border-transparent focus:border-[#5D8A66] focus:outline-none transition-all focus:shadow-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B4D3E] mb-2">
                  Servicio de interés
                </label>
                <select
                  value={formData.servicio}
                  onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F7F5F0] rounded-xl border-2 border-transparent focus:border-[#5D8A66] focus:outline-none transition-all focus:shadow-md appearance-none"
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B4D3E] mb-2">
                  Mensaje
                </label>
                <textarea
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#F7F5F0] rounded-xl border-2 border-transparent focus:border-[#5D8A66] focus:outline-none transition-all focus:shadow-md resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B4D3E] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#5D8A66] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Enviar mensaje
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
