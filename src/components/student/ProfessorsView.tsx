import React, { useState } from 'react';
import { Professor, Subject } from '../../types/student';
import { Mail, Phone, MapPin, Clock, Star, Plus, Trash2, Award, Lightbulb, ExternalLink } from 'lucide-react';

interface ProfessorsViewProps {
  professors: Professor[];
  subjects: Subject[];
  onAddProfessor: (newProf: Professor) => void;
  onDeleteProfessor: (profId: string) => void;
}

export const ProfessorsView: React.FC<ProfessorsViewProps> = ({
  professors,
  subjects,
  onAddProfessor,
  onDeleteProfessor,
}) => {
  const [isAddProfModalOpen, setIsAddProfModalOpen] = useState(false);

  const [newProf, setNewProf] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    office: '',
    officeHours: '',
    rating: 4.5,
    evaluationTips: '',
  });

  const handleCreateProfessor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProf.name || !newProf.email) return;
    const profToSave: Professor = {
      id: `prof-${Date.now()}`,
      name: newProf.name,
      title: newProf.title || 'Docente Universitario',
      email: newProf.email,
      phone: newProf.phone,
      office: newProf.office || 'Despacho por confirmar',
      officeHours: newProf.officeHours || 'Previa cita por correo',
      rating: Number(newProf.rating),
      evaluationTips: newProf.evaluationTips || 'Mantener participación y entregas al día.',
    };
    onAddProfessor(profToSave);
    setIsAddProfModalOpen(false);
    setNewProf({
      name: '',
      title: '',
      email: '',
      phone: '',
      office: '',
      officeHours: '',
      rating: 4.5,
      evaluationTips: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
            Directorio de Docentes &amp; Tutorías
          </h1>
          <p className="text-xs text-slate-500">
            Horarios de consulta, canales de contacto y notas sobre la metodología de evaluación de cada profesor.
          </p>
        </div>

        <button
          onClick={() => setIsAddProfModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir Docente</span>
        </button>
      </div>

      {/* Professors Grid */}
      {professors.length === 0 ? (
        <div className="p-10 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3 max-w-md mx-auto">
          <p className="text-xs text-slate-500">
            Aún no has registrado docentes en este espacio.
          </p>
          <button
            onClick={() => setIsAddProfModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Añadir Primer Docente</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {professors.map((prof) => {
            const taughtSubjects = subjects.filter((s) => s.professorId === prof.id);

            return (
              <div
                key={prof.id}
                className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
              >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      {prof.name}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {prof.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded text-amber-800 text-xs font-bold font-mono">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{prof.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Materias que imparte */}
                {taughtSubjects.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {taughtSubjects.map((s) => (
                      <span
                        key={s.id}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-md border text-slate-700 bg-slate-50 border-slate-200"
                      >
                        {s.code}: {s.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Contact & Office info */}
                <div className="space-y-2 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a
                      href={`mailto:${prof.email}`}
                      className="hover:underline text-slate-800 font-medium truncate"
                    >
                      {prof.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{prof.office}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Tutorías: <strong>{prof.officeHours}</strong></span>
                  </div>
                </div>

                {/* Methodology & Evaluation Tips */}
                {prof.evaluationTips && (
                  <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/50 text-xs text-amber-900 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-[11px] uppercase tracking-wider text-amber-800">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Claves de Evaluación &amp; Exámenes</span>
                    </div>
                    <p className="text-[11px] text-amber-900/90 leading-relaxed">
                      {prof.evaluationTips}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`mailto:${prof.email}?subject=Consulta de Tutoría - Canvas Key`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-slate-600 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Enviar Correo</span>
                </a>

                <button
                  onClick={() => {
                    if (window.confirm(`¿Eliminar al docente ${prof.name}?`)) {
                      onDeleteProfessor(prof.id);
                    }
                  }}
                  className="text-xs text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      )}

      {/* Modal: New Professor */}
      {isAddProfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Añadir Ficha de Docente
              </h3>
              <button
                onClick={() => setIsAddProfModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProfessor} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nombre y Apellidos *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Dra. Elena Ortiz"
                    value={newProf.name}
                    onChange={(e) => setNewProf({ ...newProf, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Cargo / Especialidad</label>
                  <input
                    type="text"
                    placeholder="Prof. Titular de Sistemas"
                    value={newProf.title}
                    onChange={(e) => setNewProf({ ...newProf, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email Institucional *</label>
                  <input
                    type="email"
                    required
                    placeholder="profesor@universidad.edu"
                    value={newProf.email}
                    onChange={(e) => setNewProf({ ...newProf, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Despacho / Aula</label>
                  <input
                    type="text"
                    placeholder="Edificio B, Despacho 204"
                    value={newProf.office}
                    onChange={(e) => setNewProf({ ...newProf, office: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Horarios de Tutoría</label>
                  <input
                    type="text"
                    placeholder="Lunes y Miércoles 16:00 - 18:00"
                    value={newProf.officeHours}
                    onChange={(e) => setNewProf({ ...newProf, officeHours: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Valoración Docente (1 - 5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={newProf.rating}
                    onChange={(e) => setNewProf({ ...newProf, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Consejos sobre cómo evalúa</label>
                <textarea
                  rows={2}
                  placeholder="¿Es estricto con las fechas? ¿Da puntos por asistencia? ¿Pone preguntas trampa?..."
                  value={newProf.evaluationTips}
                  onChange={(e) => setNewProf({ ...newProf, evaluationTips: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddProfModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Guardar Docente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
