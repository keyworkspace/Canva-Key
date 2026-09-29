import React from 'react';
import { StudentProfile } from '../../types/student';
import { Lock, Unlock, GraduationCap, CheckCircle2, Calendar, Award, ArrowRight } from 'lucide-react';

interface UniversityLockedViewProps {
  profile: StudentProfile;
  onUnlockUniversity: () => void;
  onOpenSettings: () => void;
}

export const UniversityLockedView: React.FC<UniversityLockedViewProps> = ({
  profile,
  onUnlockUniversity,
  onOpenSettings,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      {/* Main Locked Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center space-y-6 relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
          <Lock className="w-8 h-8" />
        </div>

        <div className="max-w-xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-700">
            Espacio en Preparación Académica
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
            El Módulo UNIVO se desbloquea en {profile.universityUnlockYear}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Actualmente estás cursando tu bachillerato en el Instituto y tu formación de excelencia en FGK con proyección hacia la UNIVO.
          </p>
        </div>

        {/* Preparation Milestones */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto pt-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Paso 1: Bachillerato en Instituto</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Completar los 3 años lectivos con notas aprobatorias.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Paso 2: Formación FGK</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Mantener promedio &ge; 8.0 y 60h de voluntariado para calificar a beca universitaria en UNIVO.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Calendar className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Paso 3: Admisión UNIVO</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Admisión e inscripción de materias para tus ciclos universitarios en UNIVO.
            </p>
          </div>
        </div>

        {/* Unlock Action Button */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onUnlockUniversity}
            className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm inline-flex items-center justify-center gap-2"
          >
            <Unlock className="w-4 h-4 text-amber-400" />
            <span>Desbloquear Espacio UNIVO Ahora</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cambiar Año de Desbloqueo en Configuración
          </button>
        </div>
      </div>
    </div>
  );
};
