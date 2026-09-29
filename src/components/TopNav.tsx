import React from 'react';
import { ViewportMode, SiteCategory } from '../types';
import { Monitor, Tablet, Smartphone, Sliders, Code2, Sparkles } from 'lucide-react';

interface TopNavProps {
  currentCategory: SiteCategory;
  onSelectCategory: (cat: SiteCategory) => void;
  viewport: ViewportMode;
  onSelectViewport: (v: ViewportMode) => void;
  onToggleCustomizer: () => void;
  isCustomizerOpen: boolean;
  onOpenExport: () => void;
  onOpenGuidance: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentCategory,
  onSelectCategory,
  viewport,
  onSelectViewport,
  onToggleCustomizer,
  isCustomizerOpen,
  onOpenExport,
  onOpenGuidance,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title, one line, single text element */}
        <button
          onClick={onOpenGuidance}
          className="text-lg font-bold tracking-tight text-slate-900 font-display hover:text-slate-700 transition-colors text-left"
        >
          EstudioWeb
        </button>

        {/* Zone 2: 4 nav links, single-line text links */}
        <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectCategory('business')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap rounded-md ${
              currentCategory === 'business'
                ? 'text-slate-900 font-semibold bg-slate-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Empresa
          </button>
          <button
            onClick={() => onSelectCategory('restaurant')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap rounded-md ${
              currentCategory === 'restaurant'
                ? 'text-slate-900 font-semibold bg-slate-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Restaurante
          </button>
          <button
            onClick={() => onSelectCategory('creative')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap rounded-md ${
              currentCategory === 'creative'
                ? 'text-slate-900 font-semibold bg-slate-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Portafolio
          </button>
          <button
            onClick={() => onSelectCategory('shop')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap rounded-md ${
              currentCategory === 'shop'
                ? 'text-slate-900 font-semibold bg-slate-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tienda
          </button>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Viewport switch */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => onSelectViewport('desktop')}
              title="Vista de Escritorio"
              className={`p-1.5 rounded-md transition-colors ${
                viewport === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectViewport('tablet')}
              title="Vista de Tablet"
              className={`p-1.5 rounded-md transition-colors ${
                viewport === 'tablet' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectViewport('mobile')}
              title="Vista Móvil"
              className={`p-1.5 rounded-md transition-colors ${
                viewport === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Customizer button */}
          <button
            onClick={onToggleCustomizer}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
              isCustomizerOpen
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Personalizar</span>
          </button>

          {/* Export Code button */}
          <button
            onClick={onOpenExport}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Exportar Código</span>
          </button>
        </div>
      </div>
    </header>
  );
};
