import React, { useState } from 'react';
import { Institution, AcademicPeriod, InstitutionType } from '../../types/student';
import { School, Calendar, Plus, Trash2, Award, CheckCircle2, AlertTriangle, ShieldCheck, MapPin, X } from 'lucide-react';

interface InstitutionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  institutions: Institution[];
  periods: AcademicPeriod[];
  onAddInstitution: (inst: Institution) => void;
  onDeleteInstitution: (instId: string) => void;
  onAddPeriod: (period: AcademicPeriod) => void;
  onDeletePeriod: (periodId: string) => void;
}

const SV_DEPARTMENTS = [
  'San Salvador',
  'La Libertad',
  'Santa Ana',
  'San Miguel',
  'Sonsonate',
  'Ahuachapán',
  'Usulután',
  'La Paz',
  'Cuscatlán',
  'Chalatenango',
  'Morazán',
  'San Vicente',
  'Cabañas',
  'La Unión',
];

export const InstitutionsModal: React.FC<InstitutionsModalProps> = ({
  isOpen,
  onClose,
  institutions,
  periods,
  onAddInstitution,
  onDeleteInstitution,
  onAddPeriod,
  onDeletePeriod,
}) => {
  const [activeTab, setActiveTab] = useState<'institutions' | 'periods'>('institutions');

  // New Institution Form
  const [newInst, setNewInst] = useState<{
    name: string;
    shortName: string;
    type: InstitutionType;
    department: string;
    isScholarship: boolean;
    minGpa: number;
    volunteerHoursReq: number;
    volunteerHoursDone: number;
    attendancePct: number;
    advisorName: string;
    advisorEmail: string;
  }>({
    name: '',
    shortName: '',
    type: 'publico',
    department: 'San Salvador',
    isScholarship: false,
    minGpa: 8.0,
    volunteerHoursReq: 60,
    volunteerHoursDone: 0,
    attendancePct: 90,
    advisorName: '',
    advisorEmail: '',
  });

  // New Period Form
  const [newPeriod, setNewPeriod] = useState<{
    institutionId: string;
    year: number;
    name: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
  }>({
    institutionId: institutions[0]?.id || '',
    year: 2026,
    name: '',
    startDate: '2026-02-01',
    endDate: '2026-06-30',
    isCurrent: true,
  });

  if (!isOpen) return null;

  const handleCreateInstitution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInst.name || !newInst.shortName) return;

    const instToSave: Institution = {
      id: `inst-${Date.now()}`,
      name: newInst.name,
      shortName: newInst.shortName,
      type: newInst.type,
      department: newInst.department,
      isScholarship: newInst.isScholarship,
      scholarshipDetails: newInst.isScholarship
        ? {
            programName: newInst.name,
            minGpaRequired: Number(newInst.minGpa),
            volunteerHoursRequired: Number(newInst.volunteerHoursReq),
            volunteerHoursCompleted: Number(newInst.volunteerHoursDone),
            attendanceRequiredPct: Number(newInst.attendancePct),
            cycleWeeksTotal: 10,
            hasBreakWeek: true,
            currentCycle: 1,
            currentWeekInCycle: 1,
            advisorName: newInst.advisorName,
            advisorEmail: newInst.advisorEmail,
          }
        : undefined,
    };

    onAddInstitution(instToSave);
    setNewInst({
      name: '',
      shortName: '',
      type: 'publico',
      department: 'San Salvador',
      isScholarship: false,
      minGpa: 8.0,
      volunteerHoursReq: 60,
      volunteerHoursDone: 0,
      attendancePct: 90,
      advisorName: '',
      advisorEmail: '',
    });
  };

  const handleCreatePeriod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPeriod.institutionId || !newPeriod.name) return;

    const periodToSave: AcademicPeriod = {
      id: `per-${Date.now()}`,
      institutionId: newPeriod.institutionId,
      year: Number(newPeriod.year),
      name: newPeriod.name,
      startDate: newPeriod.startDate,
      endDate: newPeriod.endDate,
      isCurrent: newPeriod.isCurrent,
    };

    onAddPeriod(periodToSave);
    setNewPeriod({
      institutionId: institutions[0]?.id || '',
      year: 2026,
      name: '',
      startDate: '2026-02-01',
      endDate: '2026-06-30',
      isCurrent: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <School className="w-5 h-5 text-slate-900" />
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Instituciones, Períodos &amp; Programas de Beca
              </h2>
              <p className="text-xs text-slate-500">
                Gestiona tus institutos públicos salvadoreños, universidades y programas como Oportunidades FGK.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 pt-3 border-b border-slate-100 flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('institutions')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'institutions'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Instituciones &amp; Programas de Beca ({institutions.length})
          </button>
          <button
            onClick={() => setActiveTab('periods')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'periods'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Años &amp; Períodos Académicos ({periods.length})
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'institutions' ? (
            <div className="space-y-6">
              {/* List of current institutions */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Instituciones Registradas
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {institutions.map((inst) => (
                    <div
                      key={inst.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs text-slate-900 font-display">
                            {inst.shortName}
                          </span>
                          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
                            {inst.type === 'beca_fgk'
                              ? 'Programa de Beca'
                              : inst.type === 'publico'
                              ? 'Instituto Público (MINED)'
                              : inst.type === 'universidad'
                              ? 'Universidad'
                              : 'Institución'}
                          </span>
                        </div>

                        <div className="text-xs text-slate-700 leading-snug">
                          {inst.name}
                        </div>

                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{inst.department || 'El Salvador'}</span>
                        </div>
                      </div>

                      {/* Scholarship Details if applicable */}
                      {inst.isScholarship && inst.scholarshipDetails && (
                        <div className="mt-2 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-950 space-y-1">
                          <div className="font-semibold flex items-center gap-1 text-amber-900">
                            <Award className="w-3.5 h-3.5 text-amber-600" />
                            <span>Requisitos de Beca Activa</span>
                          </div>
                          <div className="flex justify-between text-slate-700">
                            <span>Promedio mínimo:</span>
                            <strong className="font-mono">{inst.scholarshipDetails.minGpaRequired.toFixed(1)} / 10</strong>
                          </div>
                          <div className="flex justify-between text-slate-700">
                            <span>Horas de Voluntariado:</span>
                            <strong className="font-mono">
                              {inst.scholarshipDetails.volunteerHoursCompleted} / {inst.scholarshipDetails.volunteerHoursRequired}h
                            </strong>
                          </div>
                          <div className="flex justify-between text-slate-700">
                            <span>Asistencia requerida:</span>
                            <strong className="font-mono">{inst.scholarshipDetails.attendanceRequiredPct}%</strong>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            if (institutions.length <= 1) {
                              alert('Debes mantener al menos una institución registrada.');
                              return;
                            }
                            if (window.confirm(`¿Eliminar la institución "${inst.shortName}"?`)) {
                              onDeleteInstitution(inst.id);
                            }
                          }}
                          className="text-[11px] text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Institution Form */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Nueva Institución o Programa</span>
                </div>

                <form onSubmit={handleCreateInstitution} className="space-y-3 text-xs">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block font-medium text-slate-700 mb-1">Nombre Oficial de la Institución *</label>
                      <input
                        type="text"
                        required
                        placeholder="ej. Instituto Nacional de Santa Ana (INSA)"
                        value={newInst.name}
                        onChange={(e) => setNewInst({ ...newInst, name: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Siglas / Nombre Corto *</label>
                      <input
                        type="text"
                        required
                        placeholder="INSA / UES / FGK"
                        value={newInst.shortName}
                        onChange={(e) => setNewInst({ ...newInst, shortName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white uppercase font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Tipo de Institución</label>
                      <select
                        value={newInst.type}
                        onChange={(e) => setNewInst({ ...newInst, type: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="publico">Instituto Público de Gobierno (El Salvador)</option>
                        <option value="beca_fgk">Programa de Becas (Oportunidades FGK, etc.)</option>
                        <option value="universidad">Universidad (UES / Privada)</option>
                        <option value="tecnico">Instituto Técnico Superior (ITCA, etc.)</option>
                        <option value="otro">Otro Centro Educativo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Departamento de El Salvador</label>
                      <select
                        value={newInst.department}
                        onChange={(e) => setNewInst({ ...newInst, department: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                      >
                        {SV_DEPARTMENTS.map((dep) => (
                          <option key={dep} value={dep}>{dep}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Toggle: ¿Es programa de Beca? */}
                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                      <input
                        type="checkbox"
                        checked={newInst.isScholarship}
                        onChange={(e) => setNewInst({ ...newInst, isScholarship: e.target.checked })}
                        className="rounded text-slate-900 focus:ring-0"
                      />
                      <span>Esta institución tiene requisitos de beca (promedio mínimo, voluntariado, asistencia)</span>
                    </label>
                  </div>

                  {/* Beca sub-form */}
                  {newInst.isScholarship && (
                    <div className="p-4 rounded-xl bg-white border border-amber-200/80 space-y-3">
                      <div className="font-semibold text-amber-900 text-xs flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-600" />
                        <span>Parámetros de Permanencia de la Beca</span>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Promedio Mínimo Exigido</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={newInst.minGpa}
                            onChange={(e) => setNewInst({ ...newInst, minGpa: Number(e.target.value) })}
                            className="w-full px-2 py-1.5 border border-slate-300 rounded-lg font-mono"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Horas Voluntariado Requeridas</label>
                          <input
                            type="number"
                            min="0"
                            value={newInst.volunteerHoursReq}
                            onChange={(e) => setNewInst({ ...newInst, volunteerHoursReq: Number(e.target.value) })}
                            className="w-full px-2 py-1.5 border border-slate-300 rounded-lg font-mono"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Horas Realizadas</label>
                          <input
                            type="number"
                            min="0"
                            value={newInst.volunteerHoursDone}
                            onChange={(e) => setNewInst({ ...newInst, volunteerHoursDone: Number(e.target.value) })}
                            className="w-full px-2 py-1.5 border border-slate-300 rounded-lg font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Coordinador o Tutor de Beca</label>
                          <input
                            type="text"
                            placeholder="ej. Licda. Marcela Guirola"
                            value={newInst.advisorName}
                            onChange={(e) => setNewInst({ ...newInst, advisorName: e.target.value })}
                            className="w-full px-2 py-1.5 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Correo del Coordinador</label>
                          <input
                            type="email"
                            placeholder="coordinacion@becas.org"
                            value={newInst.advisorEmail}
                            onChange={(e) => setNewInst({ ...newInst, advisorEmail: e.target.value })}
                            className="w-full px-2 py-1.5 border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Guardar Institución
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Periods List */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Períodos &amp; Años Académicos
                </div>

                <div className="space-y-2">
                  {periods.map((per) => {
                    const inst = institutions.find((i) => i.id === per.institutionId);

                    return (
                      <div
                        key={per.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-slate-900">{per.name}</span>
                            {per.isCurrent && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                                Período Activo
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Institución: <strong className="text-slate-700">{inst?.shortName || 'General'}</strong> · Año <strong className="font-mono text-slate-700">{per.year}</strong> · {per.startDate} a {per.endDate}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (periods.length <= 1) {
                              alert('Debes mantener al menos un período registrado.');
                              return;
                            }
                            if (window.confirm(`¿Eliminar el período "${per.name}"?`)) {
                              onDeletePeriod(per.id);
                            }
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add Period Form */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Añadir Nuevo Período o Ciclo</span>
                </div>

                <form onSubmit={handleCreatePeriod} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Institución Asociada *</label>
                      <select
                        value={newPeriod.institutionId}
                        onChange={(e) => setNewPeriod({ ...newPeriod, institutionId: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                      >
                        {institutions.map((i) => (
                          <option key={i.id} value={i.id}>{i.shortName} — {i.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Año Lectivo *</label>
                      <input
                        type="number"
                        min="2020"
                        max="2035"
                        required
                        value={newPeriod.year}
                        onChange={(e) => setNewPeriod({ ...newPeriod, year: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Nombre del Período / Ciclo *</label>
                    <input
                      type="text"
                      required
                      placeholder="ej. Ciclo II - 2026, Período 2 MINED, Módulo Especialización FGK..."
                      value={newPeriod.name}
                      onChange={(e) => setNewPeriod({ ...newPeriod, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Fecha de Inicio</label>
                      <input
                        type="date"
                        required
                        value={newPeriod.startDate}
                        onChange={(e) => setNewPeriod({ ...newPeriod, startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Fecha de Cierre</label>
                      <input
                        type="date"
                        required
                        value={newPeriod.endDate}
                        onChange={(e) => setNewPeriod({ ...newPeriod, endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                      <input
                        type="checkbox"
                        checked={newPeriod.isCurrent}
                        onChange={(e) => setNewPeriod({ ...newPeriod, isCurrent: e.target.checked })}
                        className="rounded text-slate-900 focus:ring-0"
                      />
                      <span>Establecer como período activo actual</span>
                    </label>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Guardar Período
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
