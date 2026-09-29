import React, { useState } from 'react';
import { SiteConfig } from '../../types';
import { BUSINESS_SERVICES, IMAGES } from '../../data/templates';
import { ArrowRight, CheckCircle2, ChevronRight, Mail, Phone, MapPin, Send, ShieldCheck, TrendingUp, Users } from 'lucide-react';

interface BusinessTemplateProps {
  config: SiteConfig;
}

export const BusinessTemplate: React.FC<BusinessTemplateProps> = ({ config }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    mensaje: '',
    presupuesto: '€5.000 - €15.000',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email) return;
    setFormSubmitted(true);
  };

  const activeService = BUSINESS_SERVICES.find((s) => s.id === selectedService);

  return (
    <div className="bg-slate-50 text-slate-800 selection:bg-slate-200">
      {/* Top Banner / Local Header */}
      <nav className="bg-white border-b border-slate-200/80 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
            {config.brandName}
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#servicios" className="hover:text-slate-900 transition-colors">Servicios</a>
            <a href="#resultados" className="hover:text-slate-900 transition-colors">Resultados</a>
            <a href="#metodologia" className="hover:text-slate-900 transition-colors">Metodología</a>
            <a href="#contacto" className="hover:text-slate-900 transition-colors">Contacto</a>
          </div>
          <a
            href="#contacto"
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            {config.ctaText}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Consultoría Estratégica &amp; Crecimiento Corporativo
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] text-balance font-display">
                {config.tagline}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {config.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contacto"
                  className="px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-2 whitespace-nowrap shadow-xs"
                >
                  <span>{config.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#servicios"
                  className="px-5 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  Explorar Servicios
                </a>
              </div>

              {/* Unboxed Metadata Proof Row */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-500">
                <span>+240 Proyectos Auditados</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>98.6% Tasa de Satisfacción</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>12 Años en Madrid &amp; Barcelona</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 aspect-16/9 lg:aspect-4/3">
                <img
                  src={IMAGES.business}
                  alt="Espacio de trabajo y consultoría estratégica"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                  <p className="text-xs text-slate-200 font-medium">
                    Sede corporativa y sala de comités estratégicos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Metrics (if enabled) */}
      {config.showStats && (
        <section id="resultados" className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-slate-900 font-mono-code tabular-nums">€48M+</div>
                <div className="text-xs text-slate-500 mt-1">Valor auditado en transacciones y M&amp;A</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 font-mono-code tabular-nums">+35%</div>
                <div className="text-xs text-slate-500 mt-1">Incremento medio de EBITDA anual</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 font-mono-code tabular-nums">18 Días</div>
                <div className="text-xs text-slate-500 mt-1">Tiempo medio de diagnóstico operativo</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 font-mono-code tabular-nums">100%</div>
                <div className="text-xs text-slate-500 mt-1">Confidencialidad bajo estricto NDA</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section id="servicios" className="py-16 lg:py-24 max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Soluciones Diseñadas para la Alta Dirección
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Intervenciones prácticas orientadas a rentabilidad, control de costes y ventajas de mercado duraderas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BUSINESS_SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-xl border border-slate-200/90 hover:border-slate-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span>0{idx + 1}. Servicio Especializado</span>
                  {service.highlight && (
                    <span className="font-semibold text-slate-700">{service.highlight}</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {service.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Plazo estimado: <strong className="text-slate-800">{service.duration}</strong>
                </span>
                <button
                  onClick={() => setSelectedService(service.id)}
                  className="text-xs font-semibold text-slate-900 hover:text-slate-600 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Ver metodología</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Detail Modal */}
      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <span className="text-xs font-medium text-slate-500 uppercase">Detalle del Servicio</span>
              <button
                onClick={() => setSelectedService(null)}
                className="text-slate-400 hover:text-slate-800 p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{activeService.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{activeService.detail}</p>
            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Tiempo de ejecución:</span>
                <span className="font-semibold text-slate-800">{activeService.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Impacto esperado:</span>
                <span className="font-semibold text-slate-800">{activeService.highlight}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cerrar
              </button>
              <a
                href="#contacto"
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
              >
                Solicitar este Servicio
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials (if enabled) */}
      {config.showTestimonials && (
        <section id="metodologia" className="py-16 bg-white border-t border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                La Confianza de Nuestros Clientes
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Casos verificados con impacto financiero y operativo medible en los últimos 24 meses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "El diagnóstico de Vanguardia nos permitió identificar una pérdida de margen del 18% en nuestras líneas secundarias. En seis meses logramos reestructurar la unidad comercial con un impacto neto inmediato."
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200/70 text-xs">
                  <div className="font-semibold text-slate-900">Eduardo Armenteros</div>
                  <div className="text-slate-500">Director General · Grupo Logístico Iberia</div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "Rigor analítico excepcional y un trato directo sin rodeos teóricos. Nos asesoraron en la venta del 40% de la compañía asegurando los mejores múltiplos de valoración del sector industrial."
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200/70 text-xs">
                  <div className="font-semibold text-slate-900">Mercedes Valenzuela</div>
                  <div className="text-slate-500">Fundadora &amp; CEO · TechMatters Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      {config.showContactForm && (
        <section id="contacto" className="py-20 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                Hablemos de su Próximo Objetivo
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cuéntenos el estado actual de su compañía o el desafío estratégico que desea resolver. Responderemos en menos de 24 horas laborables.
              </p>

              <div className="space-y-4 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-800" />
                  <span>{config.contactEmail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-800" />
                  <span>{config.contactPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-800" />
                  <span>{config.address}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Solicitud Recibida Correctamente</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Gracias por contactar con {config.brandName}. Uno de nuestros socios directores revisará su información y se comunicará a {formData.email}.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ nombre: '', empresa: '', email: '', mensaje: '', presupuesto: '€5.000 - €15.000' });
                    }}
                    className="text-xs font-semibold text-slate-900 underline hover:text-slate-700"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="ej. Carlos Mendoza"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Empresa / Organización
                      </label>
                      <input
                        type="text"
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        placeholder="ej. Innova Retail S.L."
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Correo corporativo *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="carlos@empresa.com"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Rango de Presupuesto
                      </label>
                      <select
                        value={formData.presupuesto}
                        onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
                      >
                        <option>€3.000 - €8.000</option>
                        <option>€8.000 - €20.000</option>
                        <option>€20.000 - €50.000</option>
                        <option>+€50.000 (Gran Corporación)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Descripción breve de su proyecto o reto actual
                    </label>
                    <textarea
                      rows={3}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="Indíquenos el objetivo principal, cronograma deseado y cualquier contexto relevante..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{config.ctaText}</span>
                    </button>
                    <p className="text-center text-[11px] text-slate-400 mt-2">
                      Protegido por acuerdo de confidencialidad estándar. Sin compromisos.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 bg-white text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {config.brandName}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <a href="#servicios" className="hover:text-slate-900">Aviso Legal</a>
            <a href="#servicios" className="hover:text-slate-900">Privacidad</a>
            <a href="#contacto" className="hover:text-slate-900">Contacto Directo</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
