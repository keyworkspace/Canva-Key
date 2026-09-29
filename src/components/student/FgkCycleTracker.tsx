import React from 'react';
import { ScholarshipConfig } from '../../types/student';
import { Calendar, Coffee, Sparkles, CheckCircle2, ChevronRight, Clock } from 'lucide-react';

interface FgkCycleTrackerProps {
  scholarshipDetails?: ScholarshipConfig;
  activeSaturdayWeek: number;
  onSelectSaturdayWeek: (week: number) => void;
  onUpdateCycleWeek?: (week: number) => void;
}

export const FgkCycleTracker: React.FC<FgkCycleTrackerProps> = ({
  scholarshipDetails,
  activeSaturdayWeek,
  onSelectSaturdayWeek,
  onUpdateCycleWeek,
}) => {
  const totalWeeks = scholarshipDetails?.cycleWeeksTotal || 10;
  const currentWeek = activeSaturdayWeek || 1;
  const isBreakWeek = currentWeek === 11;
  const currentCycle = scholarshipDetails?.currentCycle || 1;

  const weeksRemainingForBreak = Math.max(0, 10 - currentWeek);

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-slate-900/40 rounded-2xl border border-amber-500/30 p-5 space-y-4">
      {/* Header of Cycle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Estructura de Ciclos Oportunidades FGK
              </span>
              <span className="text-[10px] font-bold bg-amber-200/80 text-amber-950 px-2 py-0.2 rounded-full font-mono">
                Ciclo {currentCycle}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Cada ciclo consta de <strong>10 semanas de clases sabatinas</strong>, seguido de <strong>1 semana de descanso</strong>.
            </p>
          </div>
        </div>

        {/* Status pill */}
        <div className="self-start sm:self-auto">
          {isBreakWeek ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
              <Coffee className="w-4 h-4 text-emerald-700" />
              <span>Semana de Descanso Activa (Sin Clases)</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-xs text-amber-900 shadow-2xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {weeksRemainingForBreak === 0
                  ? '¡Próxima semana: Descanso FGK!'
                  : `Faltan ${weeksRemainingForBreak} sábados para la semana de descanso`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Week Selector Strip (1 to 10 + Week 11 Descanso) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
          <span>Selecciona la semana para ver el horario sabatino rotativo correspondiente:</span>
          <span className="font-mono text-slate-800">
            {isBreakWeek ? 'Semana 11: Descanso' : `Semana ${currentWeek} de 10`}
          </span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((wk) => {
            const isSelected = currentWeek === wk;
            return (
              <button
                key={wk}
                onClick={() => onSelectSaturdayWeek(wk)}
                className={`py-2 px-1 rounded-xl text-center border transition-all text-xs font-mono font-bold ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs ring-2 ring-amber-400/50'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                <div className="text-[10px] font-sans font-medium opacity-70">Sem</div>
                <div>{wk}</div>
              </button>
            );
          })}

          {/* Week 11: Semana de Descanso */}
          <button
            onClick={() => onSelectSaturdayWeek(11)}
            title="Semana 11: Descanso Interciclo FGK"
            className={`col-span-2 sm:col-span-1 py-2 px-1 rounded-xl text-center border transition-all text-xs font-bold ${
              isBreakWeek
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-400/50'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <div className="text-[10px] font-sans font-medium flex items-center justify-center gap-0.5">
              <Coffee className="w-3 h-3" />
            </div>
            <div className="text-[11px]">Descanso</div>
          </button>
        </div>
      </div>
    </div>
  );
};
