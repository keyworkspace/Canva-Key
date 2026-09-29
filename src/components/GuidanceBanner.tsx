import React from 'react';
import { SiteCategory } from '../types';
import { Briefcase, UtensilsCrossed, Palette, ShoppingBag, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface GuidanceBannerProps {
  currentCategory: SiteCategory;
  onSelectCategory: (cat: SiteCategory) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const GuidanceBanner: React.FC<GuidanceBannerProps> = ({
  currentCategory,
  onSelectCategory,
  isCollapsed,
  onToggleCollapse,
}) => {
  const archetypes: {
    id: SiteCategory;
    title: string;
    description: string;
    icon: React.ReactNode;
    tag: string;
  }[] = [
    {
      id: 'business',
      title: 'Empresa o Consultoría',
      description: 'Ideal para agencias, servicios profesionales, asesorías o B2B.',
      icon: <Briefcase className="w-4 h-4 text-sky-600" />,
      tag: 'Más popular',
    },
    {
      id: 'restaurant',
      title: 'Restaurante o Café',
      description: 'Con carta interactiva, reservas de mesa y horarios.',
      icon: <UtensilsCrossed className="w-4 h-4 text-amber-600" />,
      tag: 'Gastronomía',
    },
    {
      id: 'creative',
      title: 'Portafolio o Estudio',
      description: 'Para arquitectos, fotógrafos, diseñadores o freelancers.',
      icon: <Palette className="w-4 h-4 text-purple-600" />,
      tag: 'Visual & Creativo',
    },
    {
      id: 'shop',
      title: 'Tienda Online / E-commerce',
      description: 'Catálogo de productos con carrito de compra y checkout.',
      icon: <ShoppingBag className="w-4 h-4 text-emerald-600" />,
      tag: 'Ventas directas',
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-sm sm:text-base font-bold text-slate-900 font-display">
              ¡Hola! Sí, te ayudo a crear tu página web. ¿De qué temática es tu proyecto?
            </h1>
          </div>

          <button
            onClick={onToggleCollapse}
            className="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 font-medium whitespace-nowrap"
          >
            <span>{isCollapsed ? 'Ver opciones' : 'Ocultar'}</span>
            {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {!isCollapsed && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {archetypes.map((arch) => {
              const isSelected = currentCategory === arch.id;
              return (
                <button
                  key={arch.id}
                  onClick={() => onSelectCategory(arch.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50/80 shadow-xs ring-1 ring-slate-900/10'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="p-1.5 rounded-lg bg-slate-100">{arch.icon}</div>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {arch.tag}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">{arch.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {arch.description}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
