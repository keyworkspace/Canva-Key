import React from 'react';
import { StudentSpace, GobHighSchoolYear, StudentProfile } from '../../types/student';
import { Building2, Award, GraduationCap, Lock, Unlock, Calendar, Clock, ChevronDown } from 'lucide-react';

interface SpaceNavigatorProps {
  profile: StudentProfile;
  onChangeSpace: (space: StudentSpace) => void;
  onChangeGobYear: (year: GobHighSchoolYear) => void;
  onChangeSaturdayWeek: (week: number) => void;
  onOpenSettings: () => void;
}

export const SpaceNavigator: React.FC<SpaceNavigatorProps> = ({
  profile,
  onChangeSpace,
  onChangeGobYear,
  onChangeSaturdayWeek,
  onOpenSettings,
}) => {
  return (
    <div className="bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* 3 Main Space Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800/80 overflow-x-auto">
          {/* Space 1: Instituto */}
          <button
            onClick={() => onChangeSpace('gob')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              profile.activeSpace === 'gob'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Instituto</span>
          </button>

          {/* Space 2: FGK */}
          <button
            onClick={() => onChangeSpace('becas')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              profile.activeSpace === 'becas'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>FGK</span>
          </button>

          {/* Space 3: UNIVO */}
          <button
            onClick={() => onChangeSpace('universidad')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              profile.activeSpace === 'universidad'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>UNIVO</span>
            {!profile.universityUnlocked ? (
              <span className="flex items-center gap-1 text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono">
                <Lock className="w-2.5 h-2.5 text-amber-400" />
                <span>{profile.universityUnlockYear}</span>
              </span>
            ) : (
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                Activa
              </span>
            )}
          </button>
        </div>

        {/* Space Context Controls */}
        <div className="flex items-center gap-2 text-xs">
          {/* GOB: Selector de 3 años de bachillerato */}
          {profile.activeSpace === 'gob' && (
            <div className="flex items-center gap-1.5 bg-slate-800/90 rounded-lg px-2.5 py-1.5 border border-slate-700">
              <span className="text-[11px] text-slate-400 font-medium">Bachillerato MINED:</span>
              <div className="flex items-center gap-1">
                {([1, 2, 3] as const).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => onChangeGobYear(yr)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                      profile.activeGobYear === yr
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {yr}º Año
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2 ml-1 hidden sm:inline">
                Horario Fijo (Lunes a Viernes)
              </span>
            </div>
          )}

          {/* BECAS: Selector de Rotación Sabatina */}
          {profile.activeSpace === 'becas' && (
            <div className="flex items-center gap-2 bg-slate-800/90 rounded-lg px-2.5 py-1.5 border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] text-slate-400 font-medium">Clases Sabatinas:</span>
              <select
                value={profile.activeSaturdayWeek}
                onChange={(e) => onChangeSaturdayWeek(Number(e.target.value))}
                className="bg-transparent font-bold text-amber-300 focus:outline-hidden text-xs cursor-pointer"
              >
                <option value={1} className="bg-slate-900 text-white">Semana 1 (Horario Rotativo A)</option>
                <option value={2} className="bg-slate-900 text-white">Semana 2 (Horario Rotativo B)</option>
                <option value={3} className="bg-slate-900 text-white">Semana 3 (Horario Rotativo C)</option>
                <option value={4} className="bg-slate-900 text-white">Semana 4 (Laboratorio Intensivo)</option>
                <option value={5} className="bg-slate-900 text-white">Semana 5 (Horario Rotativo A)</option>
                <option value={6} className="bg-slate-900 text-white">Semana 6 (Horario Rotativo B)</option>
                <option value={7} className="bg-slate-900 text-white">Semana 7 (Horario Rotativo C)</option>
                <option value={8} className="bg-slate-900 text-white">Semana 8 (Horario Rotativo D)</option>
                <option value={9} className="bg-slate-900 text-white">Semana 9 (Evaluaciones Intermedias)</option>
                <option value={10} className="bg-slate-900 text-white">Semana 10 (Cierre de Ciclo)</option>
                <option value={11} className="bg-emerald-950 text-emerald-300 font-bold">Semana 11 (🎉 Descanso Interciclo)</option>
              </select>
            </div>
          )}

          {/* UNIVERSIDAD: Estado de Bloqueo */}
          {profile.activeSpace === 'universidad' && (
            <div className="flex items-center gap-2">
              {!profile.universityUnlocked ? (
                <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Bloqueado hasta {profile.universityUnlockYear}</span>
                  <button
                    onClick={onOpenSettings}
                    className="underline text-white hover:text-amber-200 ml-1 text-[11px]"
                  >
                    Configurar desbloqueo
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800">
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Universidad Desbloqueada</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
