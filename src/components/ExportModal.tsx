import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { Code2, Copy, Check, ExternalLink, Globe, Server, MessageSquare, Sparkles } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, config }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'guide'>('code');

  if (!isOpen) return null;

  const sampleHtmlCode = `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${config.brandName} — ${config.tagline}</title>
  <meta name="description" content="${config.description}" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 antialiased font-sans">
  <!-- Navegación -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <span class="text-xl font-bold tracking-tight text-slate-900">${config.brandName}</span>
      <a href="#contacto" class="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg">
        ${config.ctaText}
      </a>
    </div>
  </header>

  <!-- Sección Principal -->
  <main class="py-20 max-w-6xl mx-auto px-6">
    <div class="max-w-3xl space-y-6">
      <h1 class="text-4xl sm:text-5xl font-bold text-slate-900">${config.tagline}</h1>
      <p class="text-lg text-slate-600">${config.description}</p>
      <div class="pt-4 flex gap-4">
        <a href="#contacto" class="px-6 py-3 font-semibold text-white bg-slate-900 rounded-lg">
          ${config.ctaText}
        </a>
      </div>
    </div>
  </main>

  <!-- Contacto -->
  <footer id="contacto" class="bg-white border-t border-slate-200 py-12 text-sm text-slate-600">
    <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>© ${new Date().getFullYear()} ${config.brandName}</div>
      <div>Teléfono: ${config.contactPhone}</div>
      <div>Email: ${config.contactEmail}</div>
    </div>
  </footer>
</body>
</html>`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-slate-900" />
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Exportar y Publicar tu Página Web
              </h3>
              <p className="text-xs text-slate-500">
                Código fuente listo para producción y guía práctica para subirla a internet.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 text-sm font-bold p-1 rounded-md"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 border-b border-slate-100 flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('code')}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === 'code' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Código HTML &amp; Estilos
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === 'guide' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Guía Paso a Paso para Publicar
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'code' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Estructura HTML5 autocontenida con Tailwind CSS vía CDN</span>
                <button
                  onClick={copyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-xs font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '¡Copiado al portapapeles!' : 'Copiar Código'}</span>
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4 text-xs text-slate-300 font-mono-code leading-relaxed max-h-96 overflow-y-auto">
                <pre>{sampleHtmlCode}</pre>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-xs text-slate-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="font-bold text-slate-900 text-sm">Tu Dominio Web</div>
                  <p>Registra un nombre como <code>tuempresa.es</code> o <code>.com</code> en proveedores como Namecheap, Porkbun o DonDominio (~10 €/año).</p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="font-bold text-slate-900 text-sm">Alojamiento Gratuito</div>
                  <p>Sube tu proyecto a <strong>Vercel</strong>, <strong>Netlify</strong> o <strong>Cloudflare Pages</strong>. Ofrecen certificados SSL (https://) gratis y CDN global ultrarrápida.</p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="font-bold text-slate-900 text-sm">Formularios y WhatsApp</div>
                  <p>Conecta el formulario con servicios como <strong>Formspree</strong> (llega a tu email directo) o enlaza un botón directo a tu número de WhatsApp para atender clientes al instante.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1">¿Tienes una idea específica o negocio propio?</div>
                <p>
                  Solo dime en el chat los detalles de tu actividad (ej. "Tengo un taller mecánico en Sevilla", "Quiero una web para mi consulta de psicología", "Quiero vender velas aromáticas artesanales") y adaptaré textos, secciones y fotos a medida.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
};
