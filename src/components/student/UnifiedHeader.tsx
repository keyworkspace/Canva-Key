import React from 'react';
import {
  StudentProfile,
  StudentSpace,
  GobHighSchoolYear,
  Institution,
  AcademicPeriod,
} from '../../types/student';
import {
  Building2,
  Award,
  GraduationCap,
  Lock,
  Sparkles,
  Plus,
  HelpCircle,
  Calendar,
  Clock,
  Layers,
  Settings,
  Coffee,
  CheckCircle2,
  Compass,
} from 'lucide-react';

export type StudentTab = 'dashboard' | 'subjects' | 'schedule' | 'tasks' | 'professors' | 'tools';

interface UnifiedHeaderProps {
  currentTab: StudentTab;
  onSelectTab: (tab: StudentTab) => void;
  profile: StudentProfile;
  onChangeSpace: (space: StudentSpace) => void;
  onChangeGobYear: (year: GobHighSchoolYear) => void;
  onChangeSaturdayWeek: (week: number) => void;
  onOpenTour: () => void;
  onOpenQuickAdd: () => void;
  onOpenProfileModal: () => void;
  onOpenInstitutionsModal: () => void;
  institutions: Institution[];
  periods: AcademicPeriod[];
  scholarshipGpa?: number;
}

export const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  currentTab,
  onSelectTab,
  profile,
  onChangeSpace,
  onChangeGobYear,
  onChangeSaturdayWeek,
  onOpenTour,
  onOpenQuickAdd,
  onOpenProfileModal,
  onOpenInstitutionsModal,
  institutions,
  periods,
  scholarshipGpa,
}) => {
  const isGeneral = profile.activeSpace === 'general';
  const isBecas = profile.activeSpace === 'becas';
  const isGob = profile.activeSpace === 'gob';
  const isUni = profile.activeSpace === 'universidad';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      {/* Tier 1: Main Navigation, Spaces Switcher, Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm shadow-xs font-display">
              CK
            </div>
            <div className="hidden sm:block">
              <span className="text-base font-bold tracking-tight text-slate-900 font-display block leading-none">
                Canvas Key
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Portal Estudiantil
              </span>
            </div>
          </button>
        </div>

        {/* Center: The Academic Spaces Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 max-w-xl w-full justify-between gap-1 overflow-x-auto">
          {/* Space 0: General */}
          <button
            onClick={() => onChangeSpace('general')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              isGeneral
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            <span>General</span>
          </button>

          {/* Space 1: Instituto */}
          <button
            onClick={() => onChangeSpace('gob')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              isGob
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span>Instituto</span>
          </button>

          {/* Space 2: FGK */}
          <button
            onClick={() => onChangeSpace('becas')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              isBecas
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span>FGK</span>
          </button>

          {/* Space 3: UNIVO */}
          <button
            onClick={() => onChangeSpace('universidad')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              isUni
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span>UNIVO</span>
            {!profile.universityUnlocked && (
              <Lock className="w-2.5 h-2.5 shrink-0 text-amber-500" />
            )}
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Tour / Guide button */}
          <button
            onClick={onOpenTour}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all shadow-2xs cursor-pointer"
            title="Abrir Asistente y Guía"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline">¿Cómo funciona?</span>
          </button>

          {/* Quick Add Button */}
          <button
            onClick={onOpenQuickAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Añadir</span>
          </button>

          {/* Settings / Profile Button */}
          <button
            onClick={onOpenProfileModal}
            className="p-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-slate-700"
            title="Configuración y Perfil"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tier 2: Space Context Controls & Main Views Tab Bar */}
      <div className="bg-slate-50/80 border-t border-slate-200/80 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Space Specific Controls */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs py-0.5">
            {/* GENERAL: Indicador */}
            {isGeneral && (
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-slate-200 text-xs shadow-2xs">
                <Compass className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="font-bold text-slate-900">General</span>
                <span className="text-slate-500 hidden sm:inline">· Monitoreo conjunto de Instituto y FGK</span>
              </div>
            )}

            {/* INSTITUTO: Selector de 1º, 2º, 3º Año */}
            {isGob && (
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-slate-500 px-2">
                  Instituto:
                </span>
                {([1, 2, 3] as const).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => onChangeGobYear(yr)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      profile.activeGobYear === yr
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {yr}º Año
                  </button>
                ))}
                <span className="text-[10px] text-slate-400 pl-1 pr-2 hidden sm:inline">
                  (Horario Lunes a Viernes)
                </span>
              </div>
            )}

            {/* FGK: Ciclo de 10 Semanas Sabatinas + Descanso */}
            {isBecas && (
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-amber-600 ml-1.5" />
                <span className="text-[11px] font-semibold text-slate-500 pr-1">
                  Sábado:
                </span>
                <select
                  value={profile.activeSaturdayWeek}
                  onChange={(e) => onChangeSaturdayWeek(Number(e.target.value))}
                  className="bg-amber-50 text-amber-950 font-bold px-2 py-1 rounded-lg text-xs border border-amber-200 cursor-pointer focus:outline-hidden"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((wk) => (
                    <option key={wk} value={wk}>
                      Semana {wk} de 10 (Clases FGK)
                    </option>
                  ))}
                  <option value={11}>Semana 11 (☕ Descanso Interciclo)</option>
                </select>
                {profile.activeSaturdayWeek === 11 ? (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md hidden sm:inline">
                    Semana Libre
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 hidden sm:inline pr-1">
                    Horario Rotativo
                  </span>
                )}
              </div>
            )}

            {/* UNIVO: Estado */}
            {isUni && (
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-slate-200 text-xs">
                {!profile.universityUnlocked ? (
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                    <span>UNIVO bloqueada hasta {profile.universityUnlockYear}</span>
                    <button
                      onClick={onOpenProfileModal}
                      className="text-blue-600 font-semibold underline text-[11px] ml-1"
                    >
                      Ajustar
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Espacio UNIVO Activo</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Primary View Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === 'dashboard'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              📊 Resumen
            </button>
            <button
              onClick={() => onSelectTab('subjects')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === 'subjects'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              📚 Materias &amp; Notas
            </button>
            <button
              onClick={() => onSelectTab('schedule')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === 'schedule'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              📅 Horario
            </button>
            <button
              onClick={() => onSelectTab('tasks')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === 'tasks'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              ✅ Tareas
            </button>
            <button
              onClick={() => onSelectTab('professors')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === 'professors'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              👨‍🏫 Docentes
            </button>
            <button
              onClick={() => onSelectTab('tools')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === 'tools'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              🧰 Extras
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
