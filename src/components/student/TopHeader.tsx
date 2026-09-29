import React from 'react';
import { StudentProfile } from '../../types/student';
import { GraduationCap, Timer, Plus, UserCheck, Sparkles, HelpCircle } from 'lucide-react';

export type StudentTab = 'dashboard' | 'subjects' | 'schedule' | 'professors' | 'tasks' | 'tools';

interface TopHeaderProps {
  currentTab: StudentTab;
  onSelectTab: (tab: StudentTab) => void;
  profile: StudentProfile;
  onOpenQuickAdd: () => void;
  onOpenProfileModal: () => void;
  onOpenTour: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentTab,
  onSelectTab,
  profile,
  onOpenQuickAdd,
  onOpenProfileModal,
  onOpenTour,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs">
              CK
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 font-display">
                Canvas Key
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean 5-6 navigation links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'dashboard'
                ? 'text-slate-950 font-semibold bg-slate-100'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Panel General
          </button>
          <button
            onClick={() => onSelectTab('subjects')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'subjects'
                ? 'text-slate-950 font-semibold bg-slate-100'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Materias &amp; Notas
          </button>
          <button
            onClick={() => onSelectTab('schedule')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'schedule'
                ? 'text-slate-950 font-semibold bg-slate-100'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Horario
          </button>
          <button
            onClick={() => onSelectTab('tasks')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'tasks'
                ? 'text-slate-950 font-semibold bg-slate-100'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Tareas &amp; Exámenes
          </button>
          <button
            onClick={() => onSelectTab('professors')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'professors'
                ? 'text-slate-950 font-semibold bg-slate-100'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Docentes
          </button>
          <button
            onClick={() => onSelectTab('tools')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'tools'
                ? 'text-slate-950 font-semibold bg-slate-100'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Herramientas &amp; Extras
          </button>
        </nav>

        {/* Zone 3: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tour / Guide button */}
          <button
            onClick={onOpenTour}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
            title="Abrir Asistente Guía de Canvas Key"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Guía del Sistema</span>
          </button>

          <button
            onClick={onOpenQuickAdd}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nuevo Registro</span>
          </button>

          <button
            onClick={onOpenProfileModal}
            className="flex items-center gap-2 p-1 pl-2 sm:pr-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
          >
            <img
              src={profile.avatarUrl || '/src/assets/images/student_avatar_profile_1790642966980.jpg'}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover border border-slate-300"
            />
            <span className="hidden sm:inline text-xs font-semibold text-slate-800 truncate max-w-[110px]">
              {profile.name}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile secondary tab bar */}
      <div className="md:hidden border-t border-slate-200 px-4 py-2 overflow-x-auto flex items-center gap-2 bg-slate-50/50">
        {[
          { id: 'dashboard', label: 'Inicio' },
          { id: 'subjects', label: 'Materias & Notas' },
          { id: 'schedule', label: 'Horario' },
          { id: 'tasks', label: 'Tareas' },
          { id: 'professors', label: 'Docentes' },
          { id: 'tools', label: 'Herramientas' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => onSelectTab(t.id as StudentTab)}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
              currentTab === t.id ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white border border-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </header>
  );
};
