import React, { useState } from 'react';
import { SiteConfig, MenuItem } from '../../types';
import { RESTAURANT_MENU, IMAGES } from '../../data/templates';
import { Clock, MapPin, Phone, Mail, CheckCircle2, Calendar, Users, UtensilsCrossed } from 'lucide-react';

interface RestaurantTemplateProps {
  config: SiteConfig;
}

export const RestaurantTemplate: React.FC<RestaurantTemplateProps> = ({ config }) => {
  const [activeCategory, setActiveCategory] = useState<'entrantes' | 'principales' | 'postres' | 'vinos'>('principales');
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservation, setReservation] = useState({
    nombre: '',
    telefono: '',
    fecha: '2026-10-15',
    hora: '21:00',
    personas: '2 comensales',
    alergias: '',
  });

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservation.nombre || !reservation.telefono) return;
    setReservationSuccess(true);
  };

  const filteredMenu = RESTAURANT_MENU.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#121111] text-stone-200 selection:bg-stone-700 selection:text-white">
      {/* Restaurant Header */}
      <header className="border-b border-stone-800 bg-[#161515]/95 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <span className="text-xl font-bold tracking-wider text-stone-100 font-serif-display">
            {config.brandName}
          </span>
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase font-medium text-stone-400">
            <a href="#carta" className="hover:text-stone-100 transition-colors">La Carta</a>
            <a href="#filosofia" className="hover:text-stone-100 transition-colors">Filosofía</a>
            <a href="#reservas" className="hover:text-stone-100 transition-colors">Reservas</a>
            <a href="#visita" className="hover:text-stone-100 transition-colors">Contacto &amp; Horarios</a>
          </nav>
          <a
            href="#reservas"
            className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-100 hover:bg-white rounded-lg transition-colors whitespace-nowrap"
          >
            {config.ctaText}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[540px] flex items-center justify-center overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0">
          <img
            src={IMAGES.restaurant}
            alt="Plato de alta cocina contemporánea en Aura"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-45 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121111] via-[#121111]/70 to-[#121111]/40" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
          <div className="text-xs uppercase tracking-widest text-amber-200/90 font-medium">
            Temporada Otoño · Invierno
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-serif-display text-balance">
            {config.tagline}
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            {config.description}
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#reservas"
              className="px-6 py-3 text-xs tracking-wider uppercase font-semibold text-stone-950 bg-amber-100 hover:bg-white rounded-lg transition-colors shadow-sm"
            >
              {config.ctaText}
            </a>
            <a
              href="#carta"
              className="px-6 py-3 text-xs tracking-wider uppercase font-semibold text-stone-200 border border-stone-700 hover:border-stone-500 rounded-lg transition-colors"
            >
              Consultar Carta Completa
            </a>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-stone-400">
            <span>Guía Repsol 2026</span>
            <span aria-hidden="true">·</span>
            <span>Producto de Proximidad (&lt; 60 km)</span>
            <span aria-hidden="true">·</span>
            <span>Maridaje Seleccionado por Sumiller</span>
          </div>
        </div>
      </section>

      {/* Menu / Carta Section */}
      <section id="carta" className="py-20 max-w-5xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <div className="text-xs uppercase tracking-widest text-amber-200/80 font-medium">
            Propuesta Sensorial
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif-display">
            Carta de Temporada
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Cada creación respeta el ciclo biológico del producto marítimo y terrestre.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 p-1.5 bg-stone-900 rounded-xl border border-stone-800 max-w-md mx-auto">
          {(['entrantes', 'principales', 'postres', 'vinos'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-1 py-2 text-xs font-semibold capitalize rounded-lg transition-all ${
                activeCategory === cat
                  ? 'bg-amber-100 text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <div className="space-y-6">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl border border-stone-800/80 bg-stone-900/40 hover:bg-stone-900/70 transition-colors flex flex-col sm:flex-row sm:items-baseline justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-3">
                  <h3 className="text-base sm:text-lg font-semibold text-white font-serif-display">
                    {item.name}
                  </h3>
                  {item.badge && (
                    <span className="text-[11px] font-medium text-amber-300">
                      [{item.badge}]
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="text-base sm:text-lg font-semibold text-amber-100 font-mono-code tabular-nums sm:text-right shrink-0">
                {item.price}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-stone-500">
          * Disponemos de menú degustación completo (9 pases) a mesa completa bajo reserva anticipada.
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservas" className="py-20 bg-[#161515] border-t border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-3xl font-bold text-white font-serif-display">
              Reserva de Mesa
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Confirmación inmediata garantizada. Rogamos puntualidad para asegurar el ritmo óptimo del servicio.
            </p>
          </div>

          <div className="bg-stone-900/80 p-8 rounded-2xl border border-stone-800 shadow-xl">
            {reservationSuccess ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 bg-amber-400/10 text-amber-300 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-serif-display">
                  Mesa Reservada con Éxito
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
                  Hemos anotado su reserva a nombre de <strong className="text-white">{reservation.nombre}</strong> para {reservation.personas} el {reservation.fecha} a las {reservation.hora}.
                </p>
                <button
                  onClick={() => setReservationSuccess(false)}
                  className="text-xs font-semibold text-amber-200 underline hover:text-amber-100"
                >
                  Modificar o realizar otra reserva
                </button>
              </div>
            ) : (
              <form onSubmit={handleReservation} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-400 mb-1">
                      Fecha deseada
                    </label>
                    <input
                      type="date"
                      value={reservation.fecha}
                      onChange={(e) => setReservation({ ...reservation, fecha: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 text-stone-200 rounded-lg focus:outline-hidden focus:border-amber-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-400 mb-1">
                      Turno / Hora
                    </label>
                    <select
                      value={reservation.hora}
                      onChange={(e) => setReservation({ ...reservation, hora: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 text-stone-200 rounded-lg focus:outline-hidden focus:border-amber-200"
                    >
                      <option>13:30 (Comida)</option>
                      <option>14:15 (Comida)</option>
                      <option>20:30 (Cena)</option>
                      <option>21:00 (Cena)</option>
                      <option>21:45 (Cena)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-400 mb-1">
                      Comensales
                    </label>
                    <select
                      value={reservation.personas}
                      onChange={(e) => setReservation({ ...reservation, personas: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 text-stone-200 rounded-lg focus:outline-hidden focus:border-amber-200"
                    >
                      <option>1 persona</option>
                      <option>2 comensales</option>
                      <option>3 comensales</option>
                      <option>4 comensales</option>
                      <option>5 comensales</option>
                      <option>6 comensales (Mesa privada)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-400 mb-1">
                      Nombre del titular *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ej. Elena Navarro"
                      value={reservation.nombre}
                      onChange={(e) => setReservation({ ...reservation, nombre: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 text-stone-200 rounded-lg focus:outline-hidden focus:border-amber-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-400 mb-1">
                      Teléfono de contacto *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+34 600 000 000"
                      value={reservation.telefono}
                      onChange={(e) => setReservation({ ...reservation, telefono: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 text-stone-200 rounded-lg focus:outline-hidden focus:border-amber-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">
                    Alergias o notas especiales para cocina
                  </label>
                  <input
                    type="text"
                    placeholder="ej. Celíacos, preferencia mesa interior..."
                    value={reservation.alergias}
                    onChange={(e) => setReservation({ ...reservation, alergias: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 text-stone-200 rounded-lg focus:outline-hidden focus:border-amber-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs tracking-wider uppercase font-semibold text-stone-950 bg-amber-100 hover:bg-white rounded-lg transition-colors mt-2"
                >
                  Confirmar Reserva Ahora
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section id="visita" className="py-16 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-stone-400">
          <div className="space-y-2">
            <div className="text-white font-semibold uppercase tracking-wider font-serif-display text-sm">
              Ubicación &amp; Aparcamiento
            </div>
            <p>{config.address}</p>
            <p>Aparcamiento concertado en Carrer Mallorca 180.</p>
          </div>
          <div className="space-y-2">
            <div className="text-white font-semibold uppercase tracking-wider font-serif-display text-sm">
              Horario de Cocina
            </div>
            <p>Martes a Sábado: 13:30 - 16:00 / 20:30 - 23:30</p>
            <p>Domingo y Lunes: Cerrado por descanso del personal.</p>
          </div>
          <div className="space-y-2">
            <div className="text-white font-semibold uppercase tracking-wider font-serif-display text-sm">
              Atención Telefónica
            </div>
            <p>Teléfono: {config.contactPhone}</p>
            <p>Email: {config.contactEmail}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 py-8 bg-[#0d0c0c] text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {config.brandName}. Gastronomía &amp; Hospitalidad.
      </footer>
    </div>
  );
};
