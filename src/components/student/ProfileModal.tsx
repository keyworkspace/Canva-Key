import React, { useState } from 'react';
import { StudentProfile, GradeScale } from '../../types/student';
import { UserCheck, X, RefreshCcw, Save } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSaveProfile: (newProfile: StudentProfile) => void;
  onResetAllData: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onResetAllData,
}) => {
  const [formData, setFormData] = useState<StudentProfile>({ ...profile });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-slate-900" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              Perfil Estudiantil &amp; Configuración de Escala
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 p-1"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Nombre Completo</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Matrícula / ID Estudiante</label>
              <input
                type="text"
                required
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Universidad / Institución</label>
              <input
                type="text"
                required
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Carrera / Grado</label>
              <input
                type="text"
                required
                value={formData.career}
                onChange={(e) => setFormData({ ...formData, career: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Semestre / Curso</label>
              <input
                type="text"
                required
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Escala de Calificación</label>
              <select
                value={formData.scale}
                onChange={(e) => {
                  const newScale = e.target.value as GradeScale;
                  let defaultPassing = 6.0;
                  if (newScale === '5') defaultPassing = 3.0;
                  if (newScale === '100') defaultPassing = 70.0;
                  setFormData({
                    ...formData,
                    scale: newScale,
                    passingGrade: defaultPassing,
                  });
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
              >
                <option value="10">Escala 0 - 10 (MINED / UES El Salvador)</option>
                <option value="5">Escala 0 - 5 (Internacional)</option>
                <option value="100">Escala 0 - 100</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Nota Mínima Aprobatoria</label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.passingGrade}
                onChange={(e) => setFormData({ ...formData, passingGrade: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 font-mono"
              />
            </div>
          </div>

          {/* Configuración de Espacios: GOB & Universidad */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Configuración de Espacios Estudiantiles
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Año de Bachillerato GOB */}
              <div>
                <label className="block font-medium text-slate-700 mb-1">Año Activo en Bachillerato GOB</label>
                <select
                  value={formData.activeGobYear}
                  onChange={(e) => setFormData({ ...formData, activeGobYear: Number(e.target.value) as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value={1}>1º Año de Bachillerato</option>
                  <option value={2}>2º Año de Bachillerato</option>
                  <option value={3}>3º Año de Bachillerato (Último Año)</option>
                </select>
              </div>

              {/* Desbloqueo Universidad */}
              <div>
                <label className="block font-medium text-slate-700 mb-1">Año Desbloqueo Universidad</label>
                <select
                  value={formData.universityUnlockYear}
                  onChange={(e) => setFormData({ ...formData, universityUnlockYear: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                >
                  <option value={2026}>2026 (Este año)</option>
                  <option value={2027}>2027 (Próximo año lectivo)</option>
                  <option value={2028}>2028</option>
                </select>
              </div>
            </div>

            {/* Toggle Desbloquear Universidad */}
            <div className="pt-2 border-t border-slate-200/80">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={formData.universityUnlocked}
                  onChange={(e) => setFormData({ ...formData, universityUnlocked: e.target.checked })}
                  className="rounded text-slate-900 focus:ring-0"
                />
                <span>Desbloquear Espacio Universitario ahora (Habilitar Ciclos y Notas de Universidad)</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('¿Deseas restaurar todos los datos de materias, horarios y tareas a los valores iniciales de prueba?')) {
                  onResetAllData();
                  onClose();
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 font-medium"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Restaurar Datos de Muestra</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg inline-flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
