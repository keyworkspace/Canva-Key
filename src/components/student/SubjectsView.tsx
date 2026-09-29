import React, { useState } from 'react';
import { Subject, GradeItem, Professor, StudentProfile, Institution, AcademicPeriod, StudentSpace } from '../../types/student';
import { calculateSubjectGrade } from '../../utils/studentCalculations';
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp, BookOpen, AlertCircle, CheckCircle2, User, MapPin, Building2, Award, GraduationCap } from 'lucide-react';

interface SubjectsViewProps {
  subjects: Subject[];
  professors: Professor[];
  institutions: Institution[];
  periods: AcademicPeriod[];
  profile: StudentProfile;
  onAddSubject: (newSubject: Subject) => void;
  onUpdateSubject: (updatedSubject: Subject) => void;
  onDeleteSubject: (subjectId: string) => void;
  onAddGrade: (subjectId: string, grade: GradeItem) => void;
  onDeleteGrade: (subjectId: string, gradeId: string) => void;
  onUpdateGrade: (subjectId: string, updatedGrade: GradeItem) => void;
  onLoadTemplateSubjects?: () => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({
  subjects,
  professors,
  institutions,
  periods,
  profile,
  onAddSubject,
  onUpdateSubject,
  onDeleteSubject,
  onAddGrade,
  onDeleteGrade,
  onUpdateGrade,
  onLoadTemplateSubjects,
}) => {
  const isGeneral = profile.activeSpace === 'general';
  const [spaceFilter, setSpaceFilter] = useState<'all' | 'gob' | 'becas' | 'universidad'>('all');
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(subjects[0]?.id || null);
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);
  const [activeSubjectForGradeModal, setActiveSubjectForGradeModal] = useState<string | null>(null);

  // New Subject Form state
  const [newSubject, setNewSubject] = useState({
    name: '',
    code: '',
    institutionId: institutions[0]?.id || '',
    periodId: periods[0]?.id || '',
    credits: 4,
    professorId: professors[0]?.id || '',
    classroom: '',
    color: '#0284c7',
    targetGrade: profile.scale === '100' ? 85 : profile.scale === '5' ? 4.0 : 8.0,
    maxAbsences: 4,
    syllabusNotes: '',
  });

  // New Grade Form state
  const [newGrade, setNewGrade] = useState<{
    name: string;
    weight: number;
    score: string;
  }>({
    name: '',
    weight: 20,
    score: '',
  });

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.name || !newSubject.code) return;

    const chosenInst = institutions.find((i) => i.id === newSubject.institutionId);
    const inferredSpace: StudentSpace = chosenInst?.type === 'beca_fgk'
      ? 'becas'
      : chosenInst?.type === 'universidad'
      ? 'universidad'
      : profile.activeSpace !== 'general'
      ? profile.activeSpace
      : 'gob';

    const subjectToSave: Subject = {
      id: `sub-${Date.now()}`,
      name: newSubject.name,
      code: newSubject.code.toUpperCase(),
      space: inferredSpace,
      gobYear: inferredSpace === 'gob' ? profile.activeGobYear : undefined,
      institutionId: newSubject.institutionId || institutions[0]?.id || 'inst-inframen',
      periodId: newSubject.periodId || periods[0]?.id || 'per-gob-1',
      credits: Number(newSubject.credits),
      professorId: newSubject.professorId,
      classroom: newSubject.classroom || 'Aula por asignar',
      color: newSubject.color,
      targetGrade: Number(newSubject.targetGrade),
      absences: 0,
      maxAbsences: Number(newSubject.maxAbsences),
      syllabusNotes: newSubject.syllabusNotes,
      grades: [],
    };
    onAddSubject(subjectToSave);
    setIsAddSubjectModalOpen(false);
    setExpandedSubjectId(subjectToSave.id);
    setNewSubject({
      name: '',
      code: '',
      institutionId: institutions[0]?.id || '',
      periodId: periods[0]?.id || '',
      credits: 4,
      professorId: professors[0]?.id || '',
      classroom: '',
      color: '#0284c7',
      targetGrade: profile.scale === '100' ? 85 : profile.scale === '5' ? 4.0 : 8.0,
      maxAbsences: 4,
      syllabusNotes: '',
    });
  };

  const handleCreateGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubjectForGradeModal || !newGrade.name) return;
    const gradeToSave: GradeItem = {
      id: `g-${Date.now()}`,
      name: newGrade.name,
      weight: Number(newGrade.weight),
      score: newGrade.score !== '' ? Number(newGrade.score) : null,
      date: new Date().toISOString().split('T')[0],
    };
    onAddGrade(activeSubjectForGradeModal, gradeToSave);
    setActiveSubjectForGradeModal(null);
    setNewGrade({ name: '', weight: 20, score: '' });
  };

  const scaleMax = profile.scale === '100' ? 100 : profile.scale === '5' ? 5 : 10;

  const filteredSubjects = subjects.filter((s) => {
    if (isGeneral && spaceFilter !== 'all') {
      if (s.space !== spaceFilter) return false;
    }
    if (profile.activeInstitutionId !== 'all' && s.institutionId && s.institutionId !== profile.activeInstitutionId) {
      return false;
    }
    if (profile.activePeriodId !== 'all' && s.periodId && s.periodId !== profile.activePeriodId) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
            Materias &amp; Registro de Notas
          </h1>
          <p className="text-xs text-slate-500">
            Gestiona ponderaciones porcentuales, cortes evaluativos y proyecciones de aprobación en tus instituciones.
          </p>
        </div>

        <button
          onClick={() => setIsAddSubjectModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nueva Asignatura</span>
        </button>
      </div>

      {/* Panorama General Space Filter Tabs */}
      {isGeneral && (
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setSpaceFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              spaceFilter === 'all'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todas las Asignaturas ({subjects.length})
          </button>
          <button
            onClick={() => setSpaceFilter('gob')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              spaceFilter === 'gob'
                ? 'bg-blue-600 text-white shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Instituto ({subjects.filter((s) => s.space === 'gob').length})</span>
          </button>
          <button
            onClick={() => setSpaceFilter('becas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              spaceFilter === 'becas'
                ? 'bg-amber-500 text-slate-950 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>FGK ({subjects.filter((s) => s.space === 'becas').length})</span>
          </button>
          <button
            onClick={() => setSpaceFilter('universidad')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              spaceFilter === 'universidad'
                ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>UNIVO ({subjects.filter((s) => s.space === 'universidad').length})</span>
          </button>
        </div>
      )}

      {/* Filter Info banner if filtered */}
      {(profile.activeInstitutionId !== 'all' || profile.activePeriodId !== 'all') && (
        <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-700 flex items-center justify-between">
          <span>
            Filtrando por:{' '}
            <strong className="text-slate-900">
              {profile.activeInstitutionId === 'all'
                ? 'Todas las Instituciones'
                : institutions.find((i) => i.id === profile.activeInstitutionId)?.name || 'Institución'}
            </strong>{' '}
            {profile.activePeriodId !== 'all' && (
              <>
                · Período: <strong className="text-slate-900">{periods.find((p) => p.id === profile.activePeriodId)?.name}</strong>
              </>
            )}
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {filteredSubjects.length} de {subjects.length} materias
          </span>
        </div>
      )}

      {/* Subjects Accordion / Cards List */}
      <div className="space-y-4">
        {filteredSubjects.length === 0 ? (
          <div className="p-10 sm:p-14 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Aún no has registrado asignaturas aquí
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Agrega las materias que estás cursando para poder calcular tus notas porcentuales y promedio acumulado.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setIsAddSubjectModalOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Registrar Asignatura</span>
              </button>

              {onLoadTemplateSubjects && (
                <button
                  onClick={onLoadTemplateSubjects}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/80 rounded-xl transition-colors cursor-pointer"
                >
                  ⚡ Cargar sugeridas
                </button>
              )}
            </div>
          </div>
        ) : (
          filteredSubjects.map((sub) => {
            const summary = calculateSubjectGrade(sub, profile.passingGrade, scaleMax);
            const prof = professors.find((p) => p.id === sub.professorId);
            const inst = institutions.find((i) => i.id === sub.institutionId);
            const per = periods.find((p) => p.id === sub.periodId);
            const isExpanded = expandedSubjectId === sub.id;

            const totalWeightAssigned = sub.grades.reduce((sum, g) => sum + g.weight, 0);

            return (
              <div
                key={sub.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
              >
                {/* Card Header Accordion Trigger */}
                <div
                  onClick={() => setExpandedSubjectId(isExpanded ? null : sub.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 mt-1 sm:mt-0"
                      style={{ backgroundColor: sub.color }}
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        {inst && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                            inst.type === 'beca_fgk'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : inst.type === 'publico'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-slate-100 text-slate-800 border-slate-200'
                          }`}>
                            {inst.shortName}
                          </span>
                        )}
                        <span className="font-mono font-semibold text-slate-700">{sub.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{sub.credits} Créditos</span>
                        {prof && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {prof.name}
                            </span>
                          </>
                        )}
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {sub.classroom}
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-slate-900 mt-1">
                        {sub.name}
                      </h2>
                    </div>
                  </div>

                <div className="flex items-center gap-6 justify-between md:justify-end">
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Nota Actual / Meta</div>
                    <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                      {summary.currentGrade > 0 ? summary.currentGrade.toFixed(1) : 'S/N'}{' '}
                      <span className="text-xs text-slate-400 font-normal">
                        / {sub.targetGrade ? sub.targetGrade.toFixed(1) : scaleMax}
                      </span>
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-slate-500">Puntos Acumulados</div>
                    <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                      {summary.accumulatedScore.toFixed(2)} pts
                    </div>
                  </div>

                  <button
                    type="button"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Details: Evaluations & Controls */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-5 bg-slate-50/40 space-y-5">
                  {/* Status Banner */}
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {summary.status === 'aprobando' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      )}
                      <div>
                        {summary.pendingWeight > 0 ? (
                          <span>
                            Falta evaluar el <strong className="font-mono">{summary.pendingWeight}%</strong> de la materia.
                            Para aprobar con <strong className="font-mono">{profile.passingGrade}</strong> necesitas promediar{' '}
                            <strong className="font-mono text-slate-900">{summary.neededOnRemainingToPass}</strong> en las entregas restantes.
                          </span>
                        ) : (
                          <span>Todas las evaluaciones han sido completadas. Calificación definitiva cerrada.</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveSubjectForGradeModal(sub.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap self-start sm:self-auto"
                    >
                      + Añadir Calificación
                    </button>
                  </div>

                  {/* Evaluations Table */}
                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500 grid grid-cols-12 gap-2">
                      <div className="col-span-5">Evaluación / Actividad</div>
                      <div className="col-span-2 text-right">Peso %</div>
                      <div className="col-span-3 text-right">Calificación</div>
                      <div className="col-span-2 text-right">Acciones</div>
                    </div>

                    {sub.grades.length === 0 ? (
                      <div className="p-8 text-center text-xs text-slate-500">
                        No hay evaluaciones registradas en esta materia aún.
                      </div>
                    ) : (
                      sub.grades.map((grade) => (
                        <div
                          key={grade.id}
                          className="px-4 py-3 border-b border-slate-100 last:border-0 grid grid-cols-12 gap-2 items-center text-xs hover:bg-slate-50/50"
                        >
                          <div className="col-span-5 font-medium text-slate-900">
                            {grade.name}
                            {grade.date && (
                              <span className="block text-[10px] text-slate-400 font-mono">
                                Fecha: {grade.date}
                              </span>
                            )}
                          </div>

                          <div className="col-span-2 text-right font-mono tabular-nums text-slate-600">
                            {grade.weight}%
                          </div>

                          <div className="col-span-3 text-right">
                            {grade.score !== null ? (
                              <span className="font-bold text-slate-900 font-mono tabular-nums">
                                {grade.score.toFixed(1)} / {scaleMax}
                              </span>
                            ) : (
                              <span className="text-amber-600 font-medium">Pendiente</span>
                            )}
                          </div>

                          <div className="col-span-2 text-right flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                const newScoreStr = window.prompt(
                                  `Actualizar nota para "${grade.name}" (0 - ${scaleMax}):`,
                                  grade.score !== null ? String(grade.score) : ''
                                );
                                if (newScoreStr !== null) {
                                  const parsed = parseFloat(newScoreStr);
                                  onUpdateGrade(sub.id, {
                                    ...grade,
                                    score: isNaN(parsed) ? null : parsed,
                                  });
                                }
                              }}
                              title="Editar nota"
                              className="p-1 text-slate-400 hover:text-slate-800 rounded"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`¿Eliminar la evaluación "${grade.name}"?`)) {
                                  onDeleteGrade(sub.id, grade.id);
                                }
                              }}
                              title="Eliminar evaluación"
                              className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}

                    {/* Table Footer */}
                    <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-200 text-xs text-slate-600 flex justify-between items-center">
                      <span>Total ponderación programada: <strong className="font-mono">{totalWeightAssigned}%</strong> de 100%</span>
                      {totalWeightAssigned !== 100 && (
                        <span className="text-amber-600 text-[11px]">
                          (Faltan {100 - totalWeightAssigned}% por programar)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject Action Footer */}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => {
                        if (window.confirm(`¿Estás seguro de eliminar la materia "${sub.name}" y todas sus notas?`)) {
                          onDeleteSubject(sub.id);
                        }
                      }}
                      className="text-xs text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar esta Asignatura</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        }))}
      </div>

      {/* Modal: New Subject */}
      {isAddSubjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Registrar Nueva Asignatura
              </h3>
              <button
                onClick={() => setIsAddSubjectModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubject} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Institución / Programa *</label>
                  <select
                    value={newSubject.institutionId}
                    onChange={(e) => setNewSubject({ ...newSubject, institutionId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
                  >
                    {institutions.map((i) => (
                      <option key={i.id} value={i.id}>{i.shortName} — {i.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Período / Ciclo *</label>
                  <select
                    value={newSubject.periodId}
                    onChange={(e) => setNewSubject({ ...newSubject, periodId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
                  >
                    {periods.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Nombre de la Materia *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Redes y Comunicaciones"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Código *</label>
                  <input
                    type="text"
                    required
                    placeholder="RED-201"
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Créditos</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={newSubject.credits}
                    onChange={(e) => setNewSubject({ ...newSubject, credits: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Aula / Salón</label>
                  <input
                    type="text"
                    placeholder="Aula 301 B"
                    value={newSubject.classroom}
                    onChange={(e) => setNewSubject({ ...newSubject, classroom: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Meta Deseada</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max={scaleMax}
                    value={newSubject.targetGrade}
                    onChange={(e) => setNewSubject({ ...newSubject, targetGrade: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Profesor Responsable</label>
                  <select
                    value={newSubject.professorId}
                    onChange={(e) => setNewSubject({ ...newSubject, professorId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 text-xs bg-white"
                  >
                    {professors.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Color Identificador</label>
                  <div className="flex items-center gap-2 mt-1">
                    {['#0284c7', '#7c3aed', '#059669', '#d97706', '#e11d48', '#475569'].map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setNewSubject({ ...newSubject, color: c })}
                        className={`w-6 h-6 rounded-full border-2 ${
                          newSubject.color === c ? 'border-slate-900 scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Notas sobre el Programa / Syllabus</label>
                <textarea
                  rows={2}
                  placeholder="Temas principales, libros guía o requisitos..."
                  value={newSubject.syllabusNotes}
                  onChange={(e) => setNewSubject({ ...newSubject, syllabusNotes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 text-xs resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddSubjectModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Guardar Asignatura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Grade */}
      {activeSubjectForGradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Añadir Evaluación o Parcial
              </h3>
              <button
                onClick={() => setActiveSubjectForGradeModal(null)}
                className="text-slate-400 hover:text-slate-800 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGrade} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nombre de la Evaluación *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Examen Parcial 2, Taller en Parejas..."
                  value={newGrade.name}
                  onChange={(e) => setNewGrade({ ...newGrade, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Peso Porcentual (%) *</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newGrade.weight}
                    onChange={(e) => setNewGrade({ ...newGrade, weight: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Nota Obtenida (Opcional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max={scaleMax}
                    placeholder="Dejar vacío si pendiente"
                    value={newGrade.score}
                    onChange={(e) => setNewGrade({ ...newGrade, score: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveSubjectForGradeModal(null)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Registrar Calificación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
