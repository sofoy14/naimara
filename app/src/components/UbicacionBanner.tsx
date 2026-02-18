import { useState, useEffect } from 'react';
import { MapPin, Globe, Video } from 'lucide-react';

export function UbicacionBanner() {
  const [config, setConfig] = useState<{ enColombia: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/config');
        const data = await res.json();
        setConfig(data);
      } catch (error) {
        console.error('Error cargando config:', error);
        setConfig({ enColombia: true });
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  if (loading || !config) return null;

  // Si está en Colombia, no mostrar banner especial
  if (config.enColombia) return null;

  // Si está fuera de Colombia, mostrar banner de atención virtual/internacional
  return (
    <div className="bg-[#C67B5C] text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <Globe className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm sm:text-base font-medium text-center">
          🌎 Atención virtual disponible para todo el mundo | Sesiones online por video llamada
        </p>
        <Video className="w-5 h-5 flex-shrink-0 hidden sm:block" />
      </div>
    </div>
  );
}
