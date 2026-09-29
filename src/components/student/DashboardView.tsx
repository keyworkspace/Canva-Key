import React from 'react';
import {
  Subject,
  ScheduleClass,
  TaskItem,
  StudentProfile,
  Professor,
  Institution,
  AcademicPeriod,
  StudentSpace,
} from '../../types/student';
import {
  calculateSemesterGPA,
  calculateSubjectGrade,
  getNextUpcomingClass,
} from '../../utils/studentCalculations';
import {
  Award,
  BookOpen,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Calendar,
  Sparkles,
  HeartHandshake,
  Plus,
  ArrowRight,
  Coffee,
  CheckSquare,
  Building2,
  GraduationCap,
  Layers,
  Compass,
  ArrowUpRight,
  Zap,
} from 'lucide-react';
import { StudentTab } from './UnifiedHeader';
import { FgkCycleTracker } from './FgkCycleTracker';

interface DashboardViewProps {
  profile: StudentProfile;
  subjects: Subject[];
  schedule: ScheduleClass[];
  tasks: TaskItem[];
  professors: Professor[];
  institutions: Institution[];
  periods: AcademicPeriod[];
  onNavigateTab: (tab: StudentTab) => void;
  onToggleTaskStatus: (taskId: string) => void;
  onOpenQuickAdd: () => void;
  onOpenInstitutionsModal: () => void;
  onAddVolunteerHours?: (hours: number) => void;
  onChangeSaturdayWeek?: (week: number) => void;
  onLoadTemplateSubjects?: () => void;
  onOpenTour?: () => void;
  onSelectSpace?: (space: StudentSpace) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  subjects,
  schedule,
  tasks,
  professors,
  institutions,
  periods,
  onNavigateTab,
  onToggleTaskStatus,
  onOpenQuickAdd,
  onOpenInstitutionsModal,
  onAddVolunteerHours,
  onChangeSaturdayWeek,
  onLoadTemplateSubjects,
  onOpenTour,
  onSelectSpace,
}) => {
  const isGeneral = profile.activeSpace === 'general';
  const isBecas = profile.activeSpace === 'becas';
  const isGob = profile.activeSpace === 'gob';
  const isUni = profile.activeSpace === 'universidad';

  const scaleMax = profile.scale === '100' ? 100 : profile.scale === '5' ? 5 : 10;

  // Space-filtered or global subjects
  const spaceSubjects = subjects;
  const gobSubjects = subjects.filter((s) => s.space === 'gob');
  const becasSubjects = subjects.filter((s) => s.space === 'becas');

  const { gpa, totalCredits, passingCount, failingCount } = calculateSemesterGPA(
    spaceSubjects,
    profile.passingGrade,
    scaleMax
  );

  const gobGpa = gobSubjects.length > 0
    ? calculateSemesterGPA(gobSubjects, profile.passingGrade, scaleMax).gpa
    : 0;

  const scholarshipInst = institutions.find((i) => i.isScholarship);
  const minScholarshipGpa = scholarshipInst?.scholarshipDetails?.minGpaRequired || 8.0;
  const becasGpa = becasSubjects.length > 0
    ? calculateSemesterGPA(becasSubjects, minScholarshipGpa, 10).gpa
    : 0;

  const { nextClass, subject: nextSubject, day: nextDay } = getNextUpcomingClass(schedule, spaceSubjects);

  // Overall attendance
  const totalAbsences = spaceSubjects.reduce((sum, s) => sum + s.absences, 0);
  const totalMaxAbsences = spaceSubjects.reduce((sum, s) => sum + s.maxAbsences, 0);
  const attendanceRate = totalMaxAbsences > 0 ? Math.round(((totalMaxAbsences - totalAbsences) / totalMaxAbsences) * 100) : 100;

  // Pending tasks
  const pendingTasks = tasks
    .filter((t) => t.status !== 'completada')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 6);

  // Empty State: when no subjects exist in a specific space (gob, becas, universidad)
  if (!isGeneral && spaceSubjects.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-4 space-y-6">
        {/* Onboarding Welcome Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800">
                {isGob && '🏫 Espacio Instituto'}
                {isBecas && '🌟 Espacio FGK'}
                {isUni && '🎓 Espacio UNIVO'}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                ¡Tu espacio está limpio y listo para rellenar!
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                {isGob &&
                  `Espacio para tus asignaturas del Instituto en ${profile.activeGobYear}º Año de Bachillerato (Horario fijo de Lunes a Viernes).`}
                {isBecas &&
                  'Espacio para tus asignaturas de FGK (Sábados rotativos de 10 semanas + 1 de descanso, promedio mínimo ≥ 8.0).'}
                {isUni &&
                  'Espacio UNIVO para planificar o registrar tus ciclos universitarios.'}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              {onOpenTour && (
                <button
                  onClick={onOpenTour}
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>¿Dudas? Ver Guía</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Demo Kit Loader Hero Button */}
          {onLoadTemplateSubjects && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-amber-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold text-blue-950 flex items-center justify-center sm:justify-start gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>¿Quieres probar la plataforma con materias de muestra?</span>
                </div>
                <p className="text-xs text-slate-600">
                  Carga el <strong>Kit Oficial de Materias</strong> de muestra para este espacio.
                </p>
              </div>

              <button
                onClick={onLoadTemplateSubjects}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Cargar Materias de Muestra</span>
              </button>
            </div>
          )}
        </div>

        {/* 3 Step Action Cards */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            O empieza registrando tu propia información:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-blue-400 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Registra tus Materias
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Añade tus asignaturas para llevar el control de notas y ponderaciones.
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('subjects')}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Primera Materia</span>
              </button>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-amber-400 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Configura tu Horario
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Lunes a Viernes para el instituto público o Sábados rotativos de 10 semanas para la beca.
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('schedule')}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Ver / Armar Horario</span>
              </button>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-emerald-400 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Tareas &amp; Entregas
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Anota proyectos, guías y fechas de exámenes parciales para no atrasarte.
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('tasks')}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>Ir a Tareas</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Dashboard: PANORAMA GENERAL
  if (isGeneral) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* If subjects is empty, show the welcoming guidance header */}
        {spaceSubjects.length === 0 && (
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-blue-800/60 shadow-md space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tu módulo General está listo y limpio</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                  ¡Bienvenido a tu Centro de Mando Estudiantil!
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Toda la plataforma inicia vacía para que registres tus datos reales del Instituto y de FGK. Abajo puedes ver cómo se organizará tu información.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                {onLoadTemplateSubjects && (
                  <button
                    onClick={onLoadTemplateSubjects}
                    className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                    <span>Cargar Materias Oficiales de Muestra</span>
                  </button>
                )}
                <button
                  onClick={() => onNavigateTab('subjects')}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Primera Materia</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* General Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 sm:p-8 shadow-sm border border-slate-800">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
                <Compass className="w-4 h-4" />
                <span>MÓDULO GENERAL CONSOLIDADO</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300">Instituto 3º Año &amp; FGK</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Centro de Mando: {profile.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Aquí tienes la visión integral de tus calificaciones, tu horario de la semana completa (Lunes a Sábado) y tus requisitos de permanencia en FGK.
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
              <button
                onClick={() => onNavigateTab('tools')}
                className="px-4 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Salvar el Semestre</span>
              </button>
              <button
                onClick={onOpenQuickAdd}
                className="px-4 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nuevo Registro</span>
              </button>
            </div>
          </div>
        </div>

        {/* FGK Saturday 10-Week Cycle & Break Week Strip in General */}
        <FgkCycleTracker
          scholarshipDetails={scholarshipInst?.scholarshipDetails}
          activeSaturdayWeek={profile.activeSaturdayWeek}
          onSelectSaturdayWeek={(wk) => onChangeSaturdayWeek && onChangeSaturdayWeek(wk)}
        />

        {/* 4 Global Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Promedio General */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Promedio Consolidado (GPA)</span>
              <Award className="w-4 h-4 text-sky-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
                {gpa.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 10.0</span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${gpa >= 8.0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span>{gpa >= 8.0 ? 'Rendimiento Excelente' : 'Aprobatorio'}</span>
            </div>
          </div>

          {/* Instituto */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Instituto</span>
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
                {gobGpa > 0 ? gobGpa.toFixed(2) : '--'}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 10.0</span>
            </div>
            <div className="text-xs text-slate-500">
              {gobSubjects.length} materias · {profile.activeGobYear}º Año de Bach.
            </div>
          </div>

          {/* FGK Health */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>FGK</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
                {becasGpa > 0 ? becasGpa.toFixed(2) : '--'}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ Mín. 8.0</span>
            </div>
            <div className="text-xs font-semibold flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${becasGpa >= 8.0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span className={becasGpa >= 8.0 ? 'text-emerald-700' : 'text-rose-700'}>
                {becasGpa >= 8.0 ? 'Cumpliendo Meta FGK' : 'Requiere Refuerzo'}
              </span>
            </div>
          </div>

          {/* Asistencia Global */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Asistencia General</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
                {attendanceRate}%
              </span>
              <span className="text-xs text-slate-500">asistencia</span>
            </div>
            <div className="text-xs text-slate-500">
              {totalAbsences} faltas registradas en total
            </div>
          </div>
        </div>

        {/* 2 Primary Academic Spaces Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Instituto */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 font-display">
                      Instituto
                    </h2>
                    <p className="text-xs text-slate-500">
                      {profile.activeGobYear}º Año de Bachillerato · Horario Fijo (Lunes a Viernes)
                    </p>
                  </div>
                </div>

                {onSelectSpace && (
                  <button
                    onClick={() => onSelectSpace('gob')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ir a Instituto</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {gobSubjects.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                  Sin materias de Instituto registradas.
                </div>
              ) : (
                <div className="space-y-2">
                  {gobSubjects.map((sub) => {
                    const summary = calculateSubjectGrade(sub, profile.passingGrade, scaleMax);
                    return (
                      <div
                        key={sub.id}
                        className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: sub.color }}
                          />
                          <span className="font-semibold text-slate-900 truncate">
                            {sub.name}
                          </span>
                        </div>
                        <div className="font-mono font-bold text-slate-900 shrink-0">
                          {summary.currentGrade.toFixed(1)} / 10.0
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => onNavigateTab('subjects')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Ver evaluaciones de Instituto →
              </button>
            </div>
          </div>

          {/* Card 2: FGK */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 font-display">
                      FGK
                    </h2>
                    <p className="text-xs text-slate-500">
                      Modalidad Sabatina · Ciclo de 10 Semanas + 1 de Descanso
                    </p>
                  </div>
                </div>

                {onSelectSpace && (
                  <button
                    onClick={() => onSelectSpace('becas')}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ir a FGK</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* FGK Retention 3 Requirements Health Pill */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-center">
                <div>
                  <div className="text-[10px] text-slate-500">Promedio FGK</div>
                  <div className="font-bold text-slate-900 font-mono">
                    {becasGpa > 0 ? becasGpa.toFixed(1) : '--'} / 8.0
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Voluntariado</div>
                  <div className="font-bold text-slate-900 font-mono">38h / 60h</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Asistencia Sáb.</div>
                  <div className="font-bold text-slate-900 font-mono">95% / 90%</div>
                </div>
              </div>

              {becasSubjects.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                  Sin materias sabatinas registradas.
                </div>
              ) : (
                <div className="space-y-2">
                  {becasSubjects.map((sub) => {
                    const summary = calculateSubjectGrade(sub, minScholarshipGpa, 10);
                    return (
                      <div
                        key={sub.id}
                        className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: sub.color }}
                          />
                          <span className="font-semibold text-slate-900 truncate">
                            {sub.name}
                          </span>
                        </div>
                        <div className="font-mono font-bold text-slate-900 shrink-0">
                          {summary.currentGrade.toFixed(1)} / 10.0
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => onNavigateTab('schedule')}
                className="text-xs font-semibold text-amber-700 hover:underline"
              >
                Ver horario sabatino rotativo →
              </button>
            </div>
          </div>
        </div>

        {/* Integrated Weekly Agenda & Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Integrated Timetable preview (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">
                  Agenda Semanal Integrada (Lunes a Sábado)
                </h2>
                <p className="text-xs text-slate-500">
                  L-V Instituto · Sábado FGK
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('schedule')}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>Horario completo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {schedule.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                No has agregado clases a tu horario todavía.
              </div>
            ) : (
              <div className="space-y-2.5">
                {schedule.slice(0, 5).map((cl) => {
                  const sub = subjects.find((s) => s.id === cl.subjectId);
                  return (
                    <div
                      key={cl.id}
                      className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 font-bold text-slate-700 font-mono">
                          {cl.day}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">
                            {sub?.name || 'Clase'}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {cl.startTime} - {cl.endTime} · {cl.classroom}
                          </div>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        cl.space === 'becas'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-blue-100 text-blue-900'
                      }`}>
                        {cl.space === 'becas' ? 'FGK' : 'Instituto'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Consolidated Upcoming Tasks (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">
                  Tareas &amp; Entregas Próximas
                </h2>
                <p className="text-xs text-slate-500">Pendientes de todos tus módulos</p>
              </div>
              <button
                onClick={() => onNavigateTab('tasks')}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>Ver todas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {pendingTasks.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                ¡No tienes tareas pendientes programadas!
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                  >
                    <button
                      onClick={() => onToggleTaskStatus(t.id)}
                      className="w-5 h-5 rounded-md border border-slate-300 flex items-center justify-center hover:bg-slate-200 transition-colors shrink-0 cursor-pointer"
                    >
                      {t.status === 'completada' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 truncate">
                        {t.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Vence: {t.dueDate}
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${
                      t.space === 'becas'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-100 text-blue-900'
                    }`}>
                      {t.space === 'becas' ? 'FGK' : 'Instituto'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Active Dashboard: SPECIFIC SPACE (GOB, BECAS, UNIVERSIDAD)
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Becas FGK Cycle Tracker Strip */}
      {isBecas && (
        <FgkCycleTracker
          scholarshipDetails={scholarshipInst?.scholarshipDetails}
          activeSaturdayWeek={profile.activeSaturdayWeek}
          onSelectSaturdayWeek={(wk) => onChangeSaturdayWeek?.(wk)}
        />
      )}

      {/* Scholarship Health Bar if in Becas */}
      {isBecas && scholarshipInst?.scholarshipDetails && (
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-950">
                  {scholarshipInst.name}
                </span>
                <p className="text-xs text-slate-600">
                  Requisitos: Promedio ≥ {scholarshipInst.scholarshipDetails.minGpaRequired.toFixed(1)} · 60h Voluntariado · 90% Asistencia
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-500">Promedio Beca</div>
                <div className="text-lg font-bold font-mono text-slate-900">
                  {gpa.toFixed(2)} / 10.0
                </div>
              </div>
              <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${gpa >= 8.0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {gpa >= 8.0 ? 'Cumpliendo Beca' : 'En Riesgo'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Promedio General */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Promedio (GPA)</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {gpa.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              / {scaleMax.toFixed(1)}
            </span>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${gpa >= profile.passingGrade ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span>{gpa >= profile.passingGrade ? 'Aprobatorio' : 'Por mejorar'}</span>
          </div>
        </div>

        {/* Materias Cursando */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Materias Registradas</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {spaceSubjects.length}
            </span>
            <span className="text-xs text-slate-500">
              materias · {totalCredits} créditos
            </span>
          </div>
          <div className="text-xs text-slate-500">
            {passingCount} aprobando · {failingCount} en riesgo
          </div>
        </div>

        {/* Próxima Clase */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Próxima Clase</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          {nextClass && nextSubject ? (
            <div>
              <div className="text-sm font-bold text-slate-900 truncate">
                {nextSubject.name}
              </div>
              <div className="text-xs text-slate-500">
                {nextDay} {nextClass.startTime} · {nextClass.classroom}
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400">Sin clases próximas</div>
          )}
          <button
            onClick={() => onNavigateTab('schedule')}
            className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>Ver horario</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Asistencia */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Asistencia General</span>
            <AlertTriangle className={`w-4 h-4 ${attendanceRate < 85 ? 'text-rose-600' : 'text-emerald-600'}`} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {attendanceRate}%
            </span>
            <span className="text-xs text-slate-500">asistencia</span>
          </div>
          <div className="text-xs text-slate-500">
            {totalAbsences} faltas de {totalMaxAbsences} máx. permitidas
          </div>
        </div>
      </div>

      {/* Main Grid: Subjects Progress & Urgent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Subjects & Grade Health */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Mis Asignaturas &amp; Ponderaciones
              </h2>
              <p className="text-xs text-slate-500">
                Progreso acumulado según cortes evaluativos
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('subjects')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              <span>Gestionar notas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {spaceSubjects.map((sub) => {
              const summary = calculateSubjectGrade(sub, profile.passingGrade, scaleMax);
              return (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors bg-slate-50/50 flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: sub.color }}
                      />
                      <span className="text-xs font-mono font-semibold text-slate-700">
                        {sub.code}
                      </span>
                      <span className="text-xs text-slate-400">· {sub.credits} Créditos</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">{sub.name}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold font-mono text-slate-900">
                      {summary.currentGrade.toFixed(1)} / {scaleMax}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {summary.evaluatedWeight}% evaluado
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Upcoming Tasks */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Tareas &amp; Entregas
              </h2>
              <p className="text-xs text-slate-500">Próximos pendientes</p>
            </div>
            <button
              onClick={() => onNavigateTab('tasks')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              <span>Ver todas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {pendingTasks.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
              ¡No tienes tareas pendientes para este espacio!
            </div>
          ) : (
            <div className="space-y-2.5">
              {pendingTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-3"
                >
                  <button
                    onClick={() => onToggleTaskStatus(t.id)}
                    className="w-5 h-5 rounded-md border border-slate-300 flex items-center justify-center hover:bg-slate-200 transition-colors shrink-0"
                  >
                    {t.status === 'completada' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-900 truncate">
                      {t.title}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Entrega: {t.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
