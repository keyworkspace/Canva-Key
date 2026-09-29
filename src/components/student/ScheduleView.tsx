import React, { useState } from 'react';
import {
  ScheduleClass,
  Subject,
  Professor,
  DayOfWeek,
  Institution,
  StudentProfile,
  StudentSpace,
} from '../../types/student';
import { Plus, Clock, MapPin, Trash2, Calendar as CalendarIcon, User, RefreshCw, AlertCircle, Coffee } from 'lucide-react';
import { FgkCycleTracker } from './FgkCycleTracker';

interface ScheduleViewProps {
  schedule: ScheduleClass[];
  subjects: Subject[];
  professors: Professor[];
  institutions: Institution[];
  profile: StudentProfile;
  onAddClass: (newClass: ScheduleClass) => void;
  onDeleteClass: (classId: string) => void;
  onChangeSaturdayWeek?: (week: number) => void;
}

const GOB_DAYS: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const ALL_DAYS: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  schedule,
  subjects,
  professors,
  institutions,
  profile,
  onAddClass,
  onDeleteClass,
  onChangeSaturdayWeek,
}) => {
  const isGeneral = profile.activeSpace === 'general';
  const isBecas = profile.activeSpace === 'becas';
  const isGob = profile.activeSpace === 'gob';

  const scholarshipInst = institutions.find((i) => i.isScholarship);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(isBecas ? 'Sábado' : 'Lunes');
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);

  // New Class state
  const [newClass, setNewClass] = useState<{
    subjectId: string;
    day: DayOfWeek;
    startTime: string;
    endTime: string;
    classroom: string;
    type: ScheduleClass['type'];
    saturdayWeek: number;
  }>({
    subjectId: subjects[0]?.id || '',
    day: isBecas ? 'Sábado' : 'Lunes',
    startTime: '08:00',
    endTime: '10:00',
    classroom: isBecas ? 'Language Hub FGK' : 'Aula 201',
    type: 'Teoría',
    saturdayWeek: profile.activeSaturdayWeek || 1,
  });

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.subjectId) return;

    const classToSave: ScheduleClass = {
      id: `sc-${Date.now()}`,
      space: profile.activeSpace === 'general' ? (newClass.day === 'Sábado' ? 'becas' : 'gob') : profile.activeSpace,
      subjectId: newClass.subjectId,
      day: isBecas ? 'Sábado' : newClass.day,
      startTime: newClass.startTime,
      endTime: newClass.endTime,
      classroom: newClass.classroom,
      type: newClass.type,
      saturdayWeek: isBecas || newClass.day === 'Sábado' ? newClass.saturdayWeek : undefined,
    };

    onAddClass(classToSave);
    setIsAddClassModalOpen(false);
  };

  // Filter schedule based on active space and Saturday rotation
  const filteredSchedule = schedule.filter((sc) => {
    // If not general, filter by space
    if (sc.space && !isGeneral && sc.space !== profile.activeSpace) {
      return false;
    }

    // If becas: only show Saturday and matching the active rotation week (1-4 sample cycles)
    if (isBecas) {
      if (sc.day !== 'Sábado') return false;
      // If week is 11, it's a break week (no classes)
      if (profile.activeSaturdayWeek === 11) return false;
      // Rotating schedule maps to weeks 1-4 repeat
      const normalizedWeek = ((profile.activeSaturdayWeek - 1) % 4) + 1;
      if (sc.saturdayWeek && sc.saturdayWeek !== normalizedWeek) {
        return false;
      }
      return true;
    }

    // If GOB: show Monday to Friday
    if (isGob) {
      return sc.day !== 'Sábado';
    }

    return true;
  });

  // Group classes by day: in general space, show ALL 6 days (Lunes a Sábado)
  const daysToList = isBecas ? (['Sábado'] as DayOfWeek[]) : isGob ? GOB_DAYS : ALL_DAYS;

  const classesByDay: Record<string, ScheduleClass[]> = {};
  daysToList.forEach((d) => {
    classesByDay[d] = [];
  });

  filteredSchedule.forEach((sc) => {
    if (classesByDay[sc.day]) {
      classesByDay[sc.day].push(sc);
    }
  });

  daysToList.forEach((d) => {
    classesByDay[d].sort((a, b) => a.startTime.localeCompare(b.startTime));
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              isGob
                ? 'bg-blue-100 text-blue-800'
                : isBecas
                ? 'bg-amber-100 text-amber-900'
                : isGeneral
                ? 'bg-slate-900 text-white'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              {isGob
                ? 'Instituto — Horario Fijo'
                : isBecas
                ? 'FGK — 10 Semanas + 1 Descanso'
                : isGeneral
                ? 'General — Lunes a Sábado'
                : 'UNIVO'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display mt-1">
            {isBecas ? 'Horario Sabatino FGK (Ciclo de 10 Semanas)' : isGeneral ? 'Horario General (Lunes a Sábado)' : 'Horario Semanal de Clases'}
          </h1>
          <p className="text-xs text-slate-500">
            {isBecas
              ? 'En FGK cada ciclo dura 10 semanas de clases sabatinas rotativas, con 1 semana de descanso al finalizar.'
              : 'En el Instituto el horario es fijo de lunes a viernes, y en FGK los sábados.'}
          </p>
        </div>

        <button
          onClick={() => setIsAddClassModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isBecas ? 'Añadir Bloque FGK' : 'Añadir Bloque de Horario'}</span>
        </button>
      </div>

      {/* FGK & GENERAL: 10-Week Cycle Tracker + 1-Week Break */}
      {(isBecas || isGeneral) && (
        <FgkCycleTracker
          scholarshipDetails={scholarshipInst?.scholarshipDetails}
          activeSaturdayWeek={profile.activeSaturdayWeek}
          onSelectSaturdayWeek={(wk) => onChangeSaturdayWeek && onChangeSaturdayWeek(wk)}
        />
      )}

      {/* GOB: Selector de Día para móvil */}
      {isGob && (
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto lg:hidden">
          {GOB_DAYS.map((day) => {
            const count = classesByDay[day]?.length || 0;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-1 min-w-[80px] py-2 px-3 text-xs font-semibold rounded-lg transition-all text-center whitespace-nowrap ${
                  selectedDay === day
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{day}</span>
                <span className="ml-1 text-[10px] text-slate-400 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* BECAS VIEW: Sabatino Timeline Cards or Break Week View */}
      {isBecas ? (
        profile.activeSaturdayWeek === 11 ? (
          /* Week 11: Break Week Banner */
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <Coffee className="w-7 h-7" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <h2 className="text-xl font-bold text-emerald-950 font-display">
                🎉 ¡Semana de Descanso Interciclo en Oportunidades FGK! 🎉
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Has completado con éxito las <strong>10 semanas de clases sabatinas</strong> de este ciclo. Esta semana no hay clases en la sede FGK. Tómate el fin de semana para descansar, recargar energías y celebrar tu esfuerzo antes del próximo ciclo.
              </p>
            </div>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => onChangeSaturdayWeek && onChangeSaturdayWeek(1)}
                className="px-5 py-2.5 text-xs font-semibold text-emerald-900 bg-white border border-emerald-300 rounded-xl hover:bg-emerald-50 transition-colors shadow-2xs"
              >
                Volver al horario de la Semana 1
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-amber-600" />
                <h2 className="text-sm font-bold text-slate-900 font-display">
                  Jornada Sabatina — Semana {profile.activeSaturdayWeek} de 10
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {classesByDay['Sábado']?.length || 0} bloques programados
              </span>
            </div>

            <div className="space-y-3">
              {(!classesByDay['Sábado'] || classesByDay['Sábado'].length === 0) ? (
                <div className="p-10 text-center space-y-3 bg-slate-50/60 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500">
                    No hay bloques de clase registrados para el Sábado en la Semana {profile.activeSaturdayWeek}.
                  </p>
                  <button
                    onClick={() => setIsAddClassModalOpen(true)}
                    className="px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Clase para este Sábado</span>
                  </button>
                </div>
              ) : (
                classesByDay['Sábado'].map((item, idx) => {
                  const sub = subjects.find((s) => s.id === item.subjectId);
                  const prof = sub ? professors.find((p) => p.id === sub.professorId) : null;

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center font-mono text-xs shrink-0">
                          0{idx + 1}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-mono font-bold text-slate-900">
                              {item.startTime} - {item.endTime}
                            </span>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="font-semibold text-amber-800 text-[11px] bg-amber-100/60 px-2 py-0.5 rounded">
                              {item.type}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900">
                            {sub ? sub.name : 'Materia'}
                          </h3>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{item.classroom}</span>
                            </span>
                            {prof && (
                              <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5 text-slate-400" />
                                <span>{prof.name}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => onDeleteClass(item.id)}
                          title="Eliminar bloque sabatino"
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )
      ) : (
        /* GOB / UNIVERSIDAD VIEW: Full Weekly Grid */
        <>
          {/* Desktop Grid (Lunes a Viernes) */}
          <div className="hidden lg:grid grid-cols-5 gap-3">
            {GOB_DAYS.map((day) => (
              <div key={day} className="space-y-3">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center font-bold text-xs text-slate-800 font-display">
                  {day}
                </div>

                <div className="space-y-2.5 min-h-[300px]">
                  {(!classesByDay[day] || classesByDay[day].length === 0) ? (
                    <div className="p-4 rounded-lg border border-dashed border-slate-200 text-center text-[11px] text-slate-400">
                      Sin clases
                    </div>
                  ) : (
                    classesByDay[day].map((item) => {
                      const sub = subjects.find((s) => s.id === item.subjectId);
                      const prof = sub ? professors.find((p) => p.id === sub.professorId) : null;

                      return (
                        <div
                          key={item.id}
                          className="p-3 rounded-lg border border-slate-200/90 bg-white hover:border-slate-400 transition-all space-y-2 relative group shadow-2xs"
                        >
                          <button
                            onClick={() => onDeleteClass(item.id)}
                            title="Eliminar clase"
                            className="absolute top-2 right-2 text-slate-300 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>

                          <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-slate-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{item.startTime} - {item.endTime}</span>
                            </div>
                            <span className="text-[9px] font-semibold text-slate-500">
                              {item.type}
                            </span>
                          </div>

                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-slate-900 leading-snug">
                              {sub ? sub.name : 'Materia desconocida'}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-600">
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{item.classroom}</span>
                            </span>
                            {sub && (
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: sub.color }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Detailed Day View */}
          <div className="lg:hidden space-y-3">
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-slate-700" />
              <span>Clases del {selectedDay}</span>
            </div>

            {(!classesByDay[selectedDay] || classesByDay[selectedDay].length === 0) ? (
              <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
                No tienes clases programadas para el {selectedDay}.
              </div>
            ) : (
              classesByDay[selectedDay].map((item) => {
                const sub = subjects.find((s) => s.id === item.subjectId);
                const prof = sub ? professors.find((p) => p.id === sub.professorId) : null;

                return (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                        <span className="font-semibold text-slate-800">{item.startTime} - {item.endTime}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{item.type}</span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900">
                        {sub ? sub.name : 'Materia'}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.classroom}
                        </span>
                        {prof && (
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {prof.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteClass(item.id)}
                      className="p-1 text-slate-300 hover:text-rose-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* Modal: Add Class */}
      {isAddClassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {isBecas ? 'Programar Bloque Sabatino (FGK)' : 'Programar Bloque de Horario'}
              </h3>
              <button
                onClick={() => setIsAddClassModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Materia *</label>
                <select
                  value={newClass.subjectId}
                  onChange={(e) => setNewClass({ ...newClass, subjectId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
                >
                  {subjects
                    .filter((s) => isGeneral || !s.space || s.space === profile.activeSpace)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        [{s.space === 'becas' ? 'FGK' : s.space === 'gob' ? 'Instituto' : 'UNIVO'}] {s.code} — {s.name}
                      </option>
                    ))}
                </select>
              </div>

              {isBecas ? (
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Semana del Sábado (1 al 10)</label>
                  <select
                    value={newClass.saturdayWeek}
                    onChange={(e) => setNewClass({ ...newClass, saturdayWeek: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((w) => (
                      <option key={w} value={w}>Semana {w} del Ciclo</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Día de la Semana</label>
                      <select
                        value={newClass.day}
                        onChange={(e) => setNewClass({ ...newClass, day: e.target.value as DayOfWeek })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
                      >
                        {(isGeneral ? ALL_DAYS : GOB_DAYS).map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Tipo de Sesión</label>
                      <select
                        value={newClass.type}
                        onChange={(e) => setNewClass({ ...newClass, type: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
                      >
                        <option value="Teoría">Teoría</option>
                        <option value="Laboratorio">Laboratorio</option>
                        <option value="Taller">Taller</option>
                        <option value="Seminario">Seminario</option>
                      </select>
                    </div>
                  </div>

                  {newClass.day === 'Sábado' && (
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Semana del Sábado (1 al 10)</label>
                      <select
                        value={newClass.saturdayWeek}
                        onChange={(e) => setNewClass({ ...newClass, saturdayWeek: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((w) => (
                          <option key={w} value={w}>Semana {w} del Ciclo Sabatino FGK</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Hora Inicio</label>
                  <input
                    type="time"
                    required
                    value={newClass.startTime}
                    onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
                    className="w-full px-2 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Hora Fin</label>
                  <input
                    type="time"
                    required
                    value={newClass.endTime}
                    onChange={(e) => setNewClass({ ...newClass, endTime: e.target.value })}
                    className="w-full px-2 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Aula / Salón</label>
                  <input
                    type="text"
                    required
                    placeholder="Language Hub FGK"
                    value={newClass.classroom}
                    onChange={(e) => setNewClass({ ...newClass, classroom: e.target.value })}
                    className="w-full px-2 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddClassModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Añadir al Horario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
