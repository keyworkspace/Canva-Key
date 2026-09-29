import React from 'react';
import { BookOpen, Calendar, CheckSquare, GraduationCap, Plus, Sparkles, X } from 'lucide-react';
import { StudentTab } from './TopHeader';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: StudentTab) => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  if (!isOpen) return null;

  const quickActions = [
    {
      title: 'Registrar Materia o Asignatura',
      desc: 'Añade una nueva materia con código, créditos, aula y docente.',
      icon: <BookOpen className="w-5 h-5 text-sky-600" />,
      tab: 'subjects' as StudentTab,
    },
    {
      title: 'Agregar Calificación o Parcial',
      desc: 'Ingresa una nueva nota con su respectivo peso porcentual.',
      icon: <GraduationCap className="w-5 h-5 text-emerald-600" />,
      tab: 'subjects' as StudentTab,
    },
    {
      title: 'Programar Tarea o Examen',
      desc: 'Anota fechas límite, proyectos, prioridades y requisitos.',
      icon: <CheckSquare className="w-5 h-5 text-amber-600" />,
      tab: 'tasks' as StudentTab,
    },
    {
      title: 'Añadir Clase al Horario',
      desc: 'Asigna días y horas de clases teóricas o laboratorios.',
      icon: <Calendar className="w-5 h-5 text-purple-600" />,
      tab: 'schedule' as StudentTab,
    },
    {
      title: 'Calculadora "Salvar el Semestre"',
      desc: 'Calcula cuánto necesitas en el examen final para pasar.',
      icon: <Sparkles className="w-5 h-5 text-rose-600" />,
      tab: 'tools' as StudentTab,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 font-display">
            ¿Qué deseas registrar o consultar?
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                onNavigateToTab(action.tab);
                onClose();
              }}
              className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center gap-3.5 text-left group"
            >
              <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white transition-colors shrink-0">
                {action.icon}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-slate-800">
                  {action.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {action.desc}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
