import React, { useState } from 'react';
import { SiteConfig, ProjectItem } from '../../types';
import { CREATIVE_PROJECTS, IMAGES } from '../../data/templates';
import { ArrowUpRight, Compass, Layers, Sparkles, CheckCircle2, Mail, Phone } from 'lucide-react';

interface CreativeTemplateProps {
  config: SiteConfig;
}

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ config }) => {
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiry, setInquiry] = useState({
    nombre: '',
    email: '',
    tipo: 'Vivienda Unifamiliar',
    ubicacion: '',
    mensaje: '',
  });

  const filteredProjects = activeFilter === 'todos'
    ? CREATIVE_PROJECTS
    : CREATIVE_PROJECTS.filter((p) => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.nombre || !inquiry.email) return;
    setInquirySent(true);
  };

  return (
    <div className="bg-[#fcfbf9] text-stone-900 selection:bg-stone-200">
      {/* Editorial Header */}
      <header className="border-b border-stone-200/80 bg-[#fcfbf9]/95 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <span className="text-xl font-semibold tracking-tight text-stone-900 font-display">
            {config.brandName}
          </span>
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-stone-500">
            <a href="#proyectos" className="hover:text-stone-950 transition-colors">Proyectos</a>
            <a href="#manifiesto" className="hover:text-stone-950 transition-colors">Manifiesto</a>
            <a href="#contacto" className="hover:text-stone-950 transition-colors">Contacto</a>
          </nav>
          <a
            href="#contacto"
            className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap"
          >
            {config.ctaText}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              Arquitectura · Espacios Contemporáneos · Bioclimática
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-stone-900 leading-[1.1] font-display text-balance">
              {config.tagline}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-light">
              {config.description}
            </p>
          </div>

          <div className="mt-12 rounded-xl overflow-hidden border border-stone-200 aspect-16/9 bg-stone-100">
            <img
              src={IMAGES.architecture}
              alt="Estudio de arquitectura y diseño contemporáneo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500 pt-4 border-t border-stone-200/70">
            <div>Premio Arquitectura Mediterránea 2025</div>
            <div className="flex items-center gap-4">
              <span>Valencia</span>
              <span aria-hidden="true">·</span>
              <span>Madrid</span>
              <span aria-hidden="true">·</span>
              <span>Islas Baleares</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section id="proyectos" className="py-20 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">Selección de Obras</div>
            <h2 className="text-3xl font-semibold text-stone-900 font-display">
              Proyectos Destacados
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'residencial', label: 'Residencial' },
              { id: 'cultural', label: 'Cultural' },
              { id: 'hospitalidad', label: 'Hospitalidad' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  activeFilter === f.id
                    ? 'bg-stone-900 text-white font-medium'
                    : 'text-stone-600 hover:text-stone-900 bg-stone-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer space-y-4"
            >
              <div className="rounded-lg overflow-hidden border border-stone-200 aspect-4/3 bg-stone-200 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-stone-900" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] text-stone-500 flex items-center gap-2">
                  <span>{project.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.area}</span>
                </div>
                <h3 className="text-base font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
                  {project.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
              <span className="text-xs uppercase tracking-wider text-stone-500">{selectedProject.category} · {selectedProject.year}</span>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-stone-400 hover:text-stone-900 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>
            <div className="aspect-16/9 rounded-lg overflow-hidden mb-4 bg-stone-100">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold text-stone-900 mb-2 font-display">{selectedProject.title}</h3>
            <p className="text-sm text-stone-600 leading-relaxed mb-4">{selectedProject.description}</p>
            <div className="flex justify-between items-center pt-4 border-t border-stone-100 text-xs text-stone-500">
              <span>Superficie construida: <strong className="text-stone-800">{selectedProject.area}</strong></span>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-stone-900 text-white rounded-md text-xs font-medium"
              >
                Volver a la galería
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manifesto Section */}
      <section id="manifiesto" className="py-20 bg-stone-100/70 border-t border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="text-xs uppercase tracking-widest text-stone-500">Filosofía Constructiva</div>
          <h2 className="text-2xl sm:text-4xl font-normal text-stone-900 leading-snug font-display">
            "La buena arquitectura no grita; organiza la luz, cobija la vida y dialoga con el territorio sin imponerse."
          </h2>
          <p className="text-sm text-stone-600 max-w-xl mx-auto font-light leading-relaxed">
            Priorizamos materiales nobles y locales como el barro cocido, maderas certificadas y morteros de cal para minimizar la huella de carbono y maximizar la inercia térmica natural.
          </p>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="contacto" className="py-20 max-w-4xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="text-3xl font-semibold text-stone-900 font-display">
            Consulta sobre tu Proyecto
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Aceptamos un número limitado de encargos al año para garantizar supervisión directa por parte de los arquitectos principales.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-stone-200">
          {inquirySent ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900">Consulta Enviada</h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Estudiaremos la viabilidad inicial del encargo y nos pondremos en contacto contigo en breve.
              </p>
              <button
                onClick={() => setInquirySent(false)}
                className="text-xs underline text-stone-800"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={inquiry.nombre}
                    onChange={(e) => setInquiry({ ...inquiry, nombre: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-hidden focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={inquiry.email}
                    onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-hidden focus:border-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Tipología</label>
                  <select
                    value={inquiry.tipo}
                    onChange={(e) => setInquiry({ ...inquiry, tipo: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-hidden focus:border-stone-900 bg-white"
                  >
                    <option>Vivienda Unifamiliar Nueva</option>
                    <option>Rehabilitación Integral</option>
                    <option>Espacio Comercial / Hostelería</option>
                    <option>Diseño de Interiores</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Ubicación del Terreno o Parcela</label>
                  <input
                    type="text"
                    placeholder="ej. Jávea, Denia, Madrid centro..."
                    value={inquiry.ubicacion}
                    onChange={(e) => setInquiry({ ...inquiry, ubicacion: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-hidden focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Notas sobre el encargo</label>
                <textarea
                  rows={3}
                  value={inquiry.mensaje}
                  onChange={(e) => setInquiry({ ...inquiry, mensaje: e.target.value })}
                  placeholder="Superficie aproximada, fechas previstas, aspiraciones estéticas..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-hidden focus:border-stone-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs uppercase tracking-wider font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors"
              >
                Enviar Solicitud de Proyecto
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-10 bg-white text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} {config.brandName}. Arquitectura &amp; Diseño.</div>
          <div className="flex items-center gap-6">
            <span>{config.contactPhone}</span>
            <span>{config.contactEmail}</span>
            <span>{config.address}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
