import { useState, useEffect } from 'react';
import { LogOut, MapPin, Globe, Trash2, Plus, Calendar, User, Phone, Mail } from 'lucide-react';

interface Consulta {
  id: number;
  nombre: string;
  telefono: string;
  email?: string;
  tipo: string;
  fecha: string;
  notas?: string;
}

interface Config {
  enColombia: boolean;
}

export function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [config, setConfig] = useState<Config>({ enColombia: true });
  const [loading, setLoading] = useState(true);

  // Formulario nueva consulta
  const [showForm, setShowForm] = useState(false);
  const [nuevaConsulta, setNuevaConsulta] = useState({
    nombre: '',
    telefono: '',
    email: '',
    tipo: 'Homeopatía',
    notas: '',
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth', { method: 'GET' });
      if (res.ok) {
        setIsLoggedIn(true);
        loadData();
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const [consultasRes, configRes] = await Promise.all([
        fetch('/api/consultas'),
        fetch('/api/config'),
      ]);
      const consultasData = await consultasRes.json();
      const configData = await configRes.json();
      setConsultas(consultasData);
      setConfig(configData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        loadData();
      } else {
        setError('Credenciales incorrectas');
      }
    } catch {
      setError('Error en el servidor');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const toggleUbicacion = async () => {
    const newConfig = { ...config, enColombia: !config.enColombia };
    setConfig(newConfig);
    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });
    } catch (error) {
      console.error('Error guardando config:', error);
    }
  };

  const agregarConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaConsulta),
      });
      const data = await res.json();
      if (data.success) {
        setConsultas([data.consulta, ...consultas]);
        setNuevaConsulta({ nombre: '', telefono: '', email: '', tipo: 'Homeopatía', notas: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error agregando consulta:', error);
    }
  };

  const eliminarConsulta = async (id: number) => {
    if (!confirm('¿Eliminar esta consulta?')) return;
    try {
      await fetch('/api/consultas', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setConsultas(consultas.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Error eliminando consulta:', error);
    }
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <p className="text-[#5A5A5A]">Cargando...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl font-bold text-[#1B4D3E] mb-2">Lavoisier Admin</h1>
            <p className="text-[#5A5A5A] text-sm">Panel de administración</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1B4D3E] mb-1">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5D8A66] focus:outline-none"
                placeholder="naimara"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B4D3E] mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5D8A66] focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#1B4D3E] text-white py-3 rounded-xl font-semibold hover:bg-[#5D8A66] transition-colors"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold text-[#1B4D3E]">Lavoisier Dashboard</h1>
            <p className="text-sm text-[#5A5A5A]">Panel de administración</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#5A5A5A] hover:text-[#1B4D3E] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Cerrar sesión</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Configuración de Ubicación */}
        <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="font-serif text-lg font-semibold text-[#1B4D3E] mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Configuración de Ubicación
          </h2>

          <div className="flex items-center justify-between bg-[#F7F5F0] rounded-xl p-4">
            <div className="flex items-center gap-3">
              {config.enColombia ? (
                <>
                  <MapPin className="w-5 h-5 text-[#5D8A66]" />
                  <span className="text-[#1B4D3E] font-medium">Atención en Colombia</span>
                </>
              ) : (
                <>
                  <Globe className="w-5 h-5 text-[#C67B5C]" />
                  <span className="text-[#1B4D3E] font-medium">Atención Internacional / Virtual</span>
                </>
              )}
            </div>
            <button
              onClick={toggleUbicacion}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                config.enColombia ? 'bg-[#5D8A66]' : 'bg-[#C67B5C]'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  config.enColombia ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <p className="text-sm text-[#5A5A5A] mt-3">
            {config.enColombia
              ? 'Se mostrará la dirección de Popayán y el horario local.'
              : 'Se mostrará que las sesiones son virtuales e internacionales.'}
          </p>
        </section>

        {/* Histórico de Consultas */}
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg font-semibold text-[#1B4D3E] flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Histórico de Consultas
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-[#1B4D3E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#5D8A66] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nueva Consulta
            </button>
          </div>

          {/* Formulario nueva consulta */}
          {showForm && (
            <form onSubmit={agregarConsulta} className="bg-[#F7F5F0] rounded-xl p-4 mb-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B4D3E] mb-1">Nombre</label>
                  <input
                    type="text"
                    required
                    value={nuevaConsulta.nombre}
                    onChange={(e) => setNuevaConsulta({ ...nuevaConsulta, nombre: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#5D8A66] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B4D3E] mb-1">Teléfono</label>
                  <input
                    type="tel"
                    required
                    value={nuevaConsulta.telefono}
                    onChange={(e) => setNuevaConsulta({ ...nuevaConsulta, telefono: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#5D8A66] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B4D3E] mb-1">Email (opcional)</label>
                  <input
                    type="email"
                    value={nuevaConsulta.email}
                    onChange={(e) => setNuevaConsulta({ ...nuevaConsulta, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#5D8A66] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B4D3E] mb-1">Tipo de consulta</label>
                  <select
                    value={nuevaConsulta.tipo}
                    onChange={(e) => setNuevaConsulta({ ...nuevaConsulta, tipo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#5D8A66] focus:outline-none"
                  >
                    <option>Homeopatía</option>
                    <option>Naturopatía</option>
                    <option>Osteopatía</option>
                    <option>Nutrición</option>
                    <option>Medicina General</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#1B4D3E] mb-1">Notas</label>
                <textarea
                  value={nuevaConsulta.notas}
                  onChange={(e) => setNuevaConsulta({ ...nuevaConsulta, notas: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#5D8A66] focus:outline-none"
                  rows={2}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-[#5D8A66] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1B4D3E] transition-colors"
                >
                  Guardar Consulta
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {/* Lista de consultas */}
          {consultas.length === 0 ? (
            <p className="text-center text-[#5A5A5A] py-8">No hay consultas registradas</p>
          ) : (
            <div className="space-y-3">
              {consultas.map((consulta) => (
                <div
                  key={consulta.id}
                  className="bg-[#F7F5F0] rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-[#5D8A66]" />
                        <span className="font-semibold text-[#1B4D3E]">{consulta.nombre}</span>
                        <span className="text-xs bg-[#5D8A66]/10 text-[#5D8A66] px-2 py-0.5 rounded-full">
                          {consulta.tipo}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-[#5A5A5A] mb-2">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {consulta.telefono}
                        </span>
                        {consulta.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {consulta.email}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatearFecha(consulta.fecha)}
                        </span>
                      </div>
                      {consulta.notas && (
                        <p className="text-sm text-[#5A5A5A] mt-2">{consulta.notas}</p>
                      )}
                    </div>
                    <button
                      onClick={() => eliminarConsulta(consulta.id)}
                      className="text-red-400 hover:text-red-600 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
