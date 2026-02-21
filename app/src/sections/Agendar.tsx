import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Calendar, Clock, User, Stethoscope } from 'lucide-react';

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

const servicios = [
  'Medicina General',
  'Homeopatía',
  'Naturopatía',
  'Quiropráctica',
  'Nutrición Clínica',
  'Otro',
];

export function Agendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [patientName, setPatientName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(year, month + delta, 1));
    setSelectedDate(null);
  };

  const selectDate = (day: number) => {
    const date = new Date(year, month, day);
    if (date >= new Date(today.setHours(0, 0, 0, 0))) {
      setSelectedDate(date);
    }
  };

  const isFormValid = selectedDate && selectedTime && patientName && serviceType;

  const sendToWhatsApp = () => {
    if (!isFormValid) return;

    const dateStr = selectedDate!.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const message = `¡Hola! Quiero agendar una cita en Centro Naimara.\n\n` +
      `*Nombre:* ${patientName}\n` +
      `*Servicio:* ${serviceType}\n` +
      `*Fecha:* ${dateStr}\n` +
      `*Hora:* ${selectedTime}\n\n` +
      `Por favor confirmen mi cita. ¡Gracias!`;

    window.open(
      `https://wa.me/573166998154?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <section
      id="agendar"
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white relative overflow-hidden"
    >
      {/* Blur decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#5D8A66]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C67B5C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
          }`}
        >
          <span className="inline-block text-[#C67B5C] font-semibold text-sm uppercase tracking-widest mb-4">
            Reserva tu cita
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4D3E] mb-6">
            Agenda tu consulta online
          </h2>
          <p className="text-lg text-[#5A5A5A]">
            Selecciona la fecha y hora que mejor se ajuste a tu disponibilidad.
            Te redirigiremos a WhatsApp para confirmar tu cita.
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
            <h3 className="font-serif text-2xl font-semibold text-[#1B4D3E] mb-4">
              ¿Cómo funciona?
            </h3>
            <p className="text-[#5A5A5A] mb-8">
              Agendar tu cita es muy sencillo. Sigue estos pasos:
            </p>

            <div className="space-y-4">
              {[
                {
                  step: '1',
                  icon: Calendar,
                  title: 'Selecciona fecha y hora',
                  desc: 'Elige el día y horario que prefieras',
                },
                {
                  step: '2',
                  icon: User,
                  title: 'Completa tus datos',
                  desc: 'Ingresa tu nombre y tipo de consulta',
                },
                {
                  step: '3',
                  icon: MessageCircle,
                  title: 'Confirma por WhatsApp',
                  desc: 'Te redirigimos para finalizar la reserva',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="flex items-center gap-4 p-4 bg-[#F7F5F0] rounded-xl hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <span className="w-12 h-12 bg-[#1B4D3E] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-[#1B4D3E]">{item.title}</p>
                      <p className="text-sm text-[#5A5A5A]">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calendar */}
          <div
            ref={rightRef}
            className={`bg-[#F7F5F0] rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-1000 ${
              rightVisible ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 translate-x-16 blur-sm'
            }`}
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-serif text-xl font-semibold text-[#1B4D3E] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#5D8A66]" />
                {months[month]} {year}
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => changeMonth(-1)}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#5D8A66] hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#5D8A66] hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-[#5A5A5A] py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 mb-6">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {days.map((day) => {
                const date = new Date(year, month, day);
                const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month;
                const isToday = today.getDate() === day && today.getMonth() === month;

                return (
                  <button
                    key={day}
                    onClick={() => selectDate(day)}
                    disabled={isPast}
                    className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-all duration-300 ${
                      isPast
                        ? 'text-gray-300 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#1B4D3E] text-white shadow-md scale-105'
                        : isToday
                        ? 'border-2 border-[#C67B5C] font-semibold text-[#1B4D3E] bg-white'
                        : 'hover:bg-[#5D8A66]/20 text-[#3D3D3D] bg-white'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Time Slots */}
            <div className="mb-6">
              <h4 className="font-semibold text-[#1B4D3E] mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#5D8A66]" />
                Horarios disponibles
              </h4>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 px-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedTime === time
                        ? 'bg-[#1B4D3E] text-white shadow-md scale-105'
                        : 'bg-white text-[#3D3D3D] hover:bg-[#5D8A66]/20'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1B4D3E] mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#5D8A66]" />
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 border-transparent focus:border-[#5D8A66] focus:outline-none transition-all focus:shadow-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B4D3E] mb-2 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-[#5D8A66]" />
                  Tipo de consulta
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 border-transparent focus:border-[#5D8A66] focus:outline-none transition-all focus:shadow-md appearance-none"
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={sendToWhatsApp}
                disabled={!isFormValid}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  isFormValid
                    ? 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                Confirmar cita por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
