import React from 'react';
import { SiteConfig, ColorTheme, FontChoice } from '../types';
import { Sliders, X, Palette, Type, Check, LayoutTemplate, Phone } from 'lucide-react';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onChangeConfig: (newConfig: SiteConfig) => void;
  onResetToDefault: () => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  onResetToDefault,
}) => {
  if (!isOpen) return null;

  const updateField = <K extends keyof SiteConfig>(field: K, value: SiteConfig[K]) => {
    onChangeConfig({
      ...config,
      [field]: value,
    });
  };

  const themes: { id: ColorTheme; label: string; bgClass: string }[] = [
    { id: 'slate', label: 'Pizarra & Carbón', bgClass: 'bg-slate-900' },
    { id: 'navy', label: 'Azul Corporativo', bgClass: 'bg-sky-900' },
    { id: 'forest', label: 'Verde Botánico', bgClass: 'bg-emerald-900' },
    { id: 'terracotta', label: 'Terracota Cálido', bgClass: 'bg-amber-800' },
    { id: 'burgundy', label: 'Borgoña Vino', bgClass: 'bg-rose-950' },
  ];

  const fonts: { id: FontChoice; label: string; family: string }[] = [
    { id: 'outfit', label: 'Outfit Moderno', family: 'Sans Contemporáneo' },
    { id: 'playfair', label: 'Playfair Display', family: 'Serif Clásico & Elegante' },
    { id: 'jakarta', label: 'Plus Jakarta Sans', family: 'Geométrico Minimalista' },
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between">
      {/* Drawer Header */}
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-slate-800" />
          <h2 className="text-sm font-bold text-slate-900 font-display">
            Personalizador en Tiempo Real
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
        {/* Brand Information */}
        <div className="space-y-3">
          <div className="font-semibold text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wider text-[10px] text-slate-500">
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Identidad &amp; Textos</span>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Nombre del Proyecto / Marca</label>
            <input
              type="text"
              value={config.brandName}
              onChange={(e) => updateField('brandName', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Titular Principal / Eslogan</label>
            <input
              type="text"
              value={config.tagline}
              onChange={(e) => updateField('tagline', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Texto del Botón Principal (CTA)</label>
            <input
              type="text"
              value={config.ctaText}
              onChange={(e) => updateField('ctaText', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Descripción Breve</label>
            <textarea
              rows={3}
              value={config.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 resize-none"
            />
          </div>
        </div>

        {/* Color Palettes */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="font-semibold text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wider text-[10px] text-slate-500">
            <Palette className="w-3.5 h-3.5" />
            <span>Paleta de Acento</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {themes.map((th) => (
              <button
                key={th.id}
                onClick={() => updateField('theme', th.id)}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                  config.theme === th.id
                    ? 'border-slate-900 bg-slate-50 font-semibold'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-3.5 h-3.5 rounded-full ${th.bgClass}`} />
                  <span className="text-slate-800">{th.label}</span>
                </div>
                {config.theme === th.id && <Check className="w-3.5 h-3.5 text-slate-900" />}
              </button>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="font-semibold text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wider text-[10px] text-slate-500">
            <Type className="w-3.5 h-3.5" />
            <span>Tipografía</span>
          </div>

          <div className="space-y-2">
            {fonts.map((f) => (
              <button
                key={f.id}
                onClick={() => updateField('font', f.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                  config.font === f.id
                    ? 'border-slate-900 bg-slate-50 font-semibold'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-slate-900">{f.label}</div>
                  <div className="text-[11px] text-slate-500">{f.family}</div>
                </div>
                {config.font === f.id && <Check className="w-3.5 h-3.5 text-slate-900" />}
              </button>
            ))}
          </div>
        </div>

        {/* Contact details */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="font-semibold text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wider text-[10px] text-slate-500">
            <Phone className="w-3.5 h-3.5" />
            <span>Datos de Contacto</span>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Email</label>
            <input
              type="email"
              value={config.contactEmail}
              onChange={(e) => updateField('contactEmail', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Teléfono o WhatsApp</label>
            <input
              type="text"
              value={config.contactPhone}
              onChange={(e) => updateField('contactPhone', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Dirección o Ciudad</label>
            <input
              type="text"
              value={config.address}
              onChange={(e) => updateField('address', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-[10px] text-slate-500">
            Secciones Visibles
          </div>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 cursor-pointer">
            <span className="text-slate-700">Métricas &amp; Estadísticas</span>
            <input
              type="checkbox"
              checked={config.showStats}
              onChange={(e) => updateField('showStats', e.target.checked)}
              className="rounded text-slate-900 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 cursor-pointer">
            <span className="text-slate-700">Testimonios &amp; Confianza</span>
            <input
              type="checkbox"
              checked={config.showTestimonials}
              onChange={(e) => updateField('showTestimonials', e.target.checked)}
              className="rounded text-slate-900 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 cursor-pointer">
            <span className="text-slate-700">Formulario de Contacto / Reserva</span>
            <input
              type="checkbox"
              checked={config.showContactForm}
              onChange={(e) => updateField('showContactForm', e.target.checked)}
              className="rounded text-slate-900 focus:ring-0"
            />
          </label>
        </div>
      </div>

      {/* Drawer Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
        <button
          onClick={onResetToDefault}
          className="text-xs text-slate-500 hover:text-slate-900 underline"
        >
          Restablecer Valores
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
        >
          Aplicar y Cerrar
        </button>
      </div>
    </div>
  );
};
