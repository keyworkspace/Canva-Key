import React from 'react';
import { Institution, AcademicPeriod, StudentProfile } from '../../types/student';
import { School, Calendar, SlidersHorizontal, Award, Sparkles, ChevronDown } from 'lucide-react';

interface AcademicContextBarProps {
  institutions: Institution[];
  periods: AcademicPeriod[];
  profile: StudentProfile;
  onChangeProfile: (profile: StudentProfile) => void;
  onOpenManageModal: () => void;
  scholarshipGpa?: number;
}

export const AcademicContextBar: React.FC<AcademicContextBarProps> = ({
  institutions,
  periods,
  profile,
  onChangeProfile,
  onOpenManageModal,
  scholarshipGpa,
}) => {
  // Find scholarship institution if student is in one
  const scholarshipInst = institutions.find((i) => i.isScholarship);

  // Available periods for the selected institution (or all)
  const availablePeriods = profile.activeInstitutionId === 'all'
    ? periods
    : periods.filter((p) => p.institutionId === profile.activeInstitutionId);

  // Available unique years
  const availableYears = Array.from(new Set(periods.map((p) => p.year))).sort((a, b) => b - a);

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Institution Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2.5 py-1.5 border border-slate-200">
            <School className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Institución:</span>
            <select
              value={profile.activeInstitutionId}
              onChange={(e) =>
                onChangeProfile({
                  ...profile,
                  activeInstitutionId: e.target.value,
                  // reset period if not matching
                  activePeriodId: 'all',
                })
              }
              className="bg-transparent font-semibold text-slate-900 focus:outline-hidden text-xs cursor-pointer"
            >
              <option value="all">Todas las Instituciones</option>
              {institutions.map((inst) => (
                <option key={inst.id} value={inst.id}>
                  {inst.shortName} ({inst.type === 'beca_fgk' ? 'Beca' : inst.type === 'publico' ? 'Público' : 'Univ'})
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2.5 py-1.5 border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Año:</span>
            <select
              value={profile.activeYear}
              onChange={(e) =>
                onChangeProfile({
                  ...profile,
                  activeYear: Number(e.target.value),
                })
              }
              className="bg-transparent font-semibold text-slate-900 focus:outline-hidden text-xs cursor-pointer font-mono"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Period / Cycle Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2.5 py-1.5 border border-slate-200">
            <span className="text-[11px] text-slate-500 font-medium">Ciclo/Período:</span>
            <select
              value={profile.activePeriodId}
              onChange={(e) =>
                onChangeProfile({
                  ...profile,
                  activePeriodId: e.target.value,
                })
              }
              className="bg-transparent font-semibold text-slate-900 focus:outline-hidden text-xs cursor-pointer max-w-[140px] truncate"
            >
              <option value="all">Todos los Períodos</option>
              {availablePeriods.map((per) => (
                <option key={per.id} value={per.id}>
                  {per.name}
                </option>
              ))}
            </select>
          </div>

          {/* Manage Modal Trigger */}
          <button
            onClick={onOpenManageModal}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
          >
            <SlidersHorizontal className="w-3 h-3 text-slate-500" />
            <span>Gestionar Instituciones</span>
          </button>
        </div>

        {/* Scholarship Status Badge (e.g. Oportunidades FGK) */}
        {scholarshipInst && scholarshipInst.scholarshipDetails && (
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-50/90 border border-amber-200/80 rounded-lg text-xs text-amber-950">
            <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-semibold text-amber-900">
              {scholarshipInst.shortName}:
            </span>
            <span className="text-slate-600 hidden sm:inline">
              Mínimo {scholarshipInst.scholarshipDetails.minGpaRequired.toFixed(1)}
            </span>
            {scholarshipGpa !== undefined && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="font-mono font-bold text-slate-900">
                  {scholarshipGpa.toFixed(2)} pts
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    scholarshipGpa >= scholarshipInst.scholarshipDetails.minGpaRequired
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {scholarshipGpa >= scholarshipInst.scholarshipDetails.minGpaRequired
                    ? 'Beca Segura'
                    : 'Atención Requerida'}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
