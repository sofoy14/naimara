export function Footer() {
  return (
    <footer className="bg-[#3D3D3D] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-serif text-2xl font-semibold mb-4">Lavoisier</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Centro de Medicina Integral dedicado a tu bienestar. Medicina
              tradicional y alternativa con un enfoque humano y consciente.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#D9987A] mb-4">
              Servicios
            </h4>
            <ul className="space-y-2">
              {[
                'Medicina General',
                'Homeopatía',
                'Naturopatía',
                'Nutrición Clínica',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#servicios"
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#D9987A] mb-4">
              Enlaces
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Servicios', href: '#servicios' },
                { label: 'Tratamientos', href: '#tratamientos' },
                { label: 'Testimonios', href: '#testimonios' },
                { label: 'Contacto', href: '#contacto' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#D9987A] mb-4">
              Contacto
            </h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <a
                  href="tel:+57613438817"
                  className="hover:text-white transition-colors"
                >
                  613-438-817
                </a>
              </li>
              <li>
                <a
                  href="mailto:saludintegrallavaisier@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  saludintegrallavaisier@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/573166998154"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>Calle 2C #51-12, Lomas de Granada</li>
              <li>Popayán, Cauca</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-8 text-center">
          <p className="text-white/50 text-sm">
            &copy; 2025 Centro de Medicina Integral Lavoisier. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
