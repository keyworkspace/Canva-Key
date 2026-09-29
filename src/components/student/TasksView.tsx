import React, { useState } from 'react';
import { TaskItem, Subject, TaskPriority, TaskType, TaskStatus } from '../../types/student';
import { Plus, Check, Clock, Calendar, AlertCircle, Trash2, CheckCircle2, Filter } from 'lucide-react';

interface TasksViewProps {
  tasks: TaskItem[];
  subjects: Subject[];
  onAddTask: (newTask: TaskItem) => void;
  onToggleTaskStatus: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  subjects,
  onAddTask,
  onToggleTaskStatus,
  onDeleteTask,
}) => {
  const [statusFilter, setStatusFilter] = useState<'todas' | 'pendientes' | 'completadas'>('todas');
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('todas');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const [newTask, setNewTask] = useState<{
    title: string;
    subjectId: string;
    dueDate: string;
    priority: TaskPriority;
    type: TaskType;
    notes: string;
  }>({
    title: '',
    subjectId: subjects[0]?.id || '',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    priority: 'media',
    type: 'tarea',
    notes: '',
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.subjectId) return;
    const taskToSave: TaskItem = {
      id: `t-${Date.now()}`,
      title: newTask.title,
      subjectId: newTask.subjectId,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      status: 'pendiente',
      type: newTask.type,
      notes: newTask.notes,
    };
    onAddTask(taskToSave);
    setIsAddTaskModalOpen(false);
    setNewTask({
      title: '',
      subjectId: subjects[0]?.id || '',
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      priority: 'media',
      type: 'tarea',
      notes: '',
    });
  };

  const filteredTasks = tasks.filter((t) => {
    if (statusFilter === 'pendientes' && t.status === 'completada') return false;
    if (statusFilter === 'completadas' && t.status !== 'completada') return false;
    if (typeFilter !== 'todos' && t.type !== typeFilter) return false;
    if (selectedSubjectId !== 'todas' && t.subjectId !== selectedSubjectId) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
            Entregas, Tareas &amp; Exámenes
          </h1>
          <p className="text-xs text-slate-500">
            Control de fechas límite, niveles de prioridad y seguimiento de entregas.
          </p>
        </div>

        <button
          onClick={() => setIsAddTaskModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nueva Tarea o Examen</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg">
            {(['todas', 'pendientes', 'completadas'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors ${
                  statusFilter === s ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700"
          >
            <option value="todos">Todos los Tipos</option>
            <option value="tarea">Tareas</option>
            <option value="examen">Exámenes</option>
            <option value="proyecto">Proyectos</option>
            <option value="lectura">Lecturas</option>
          </select>
        </div>

        <select
          value={selectedSubjectId}
          onChange={(e) => setSelectedSubjectId(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700"
        >
          <option value="todas">Todas las Materias</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
          ))}
        </select>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white p-10 sm:p-14 text-center rounded-2xl border border-slate-200 shadow-2xs space-y-3 max-w-md mx-auto">
            <p className="text-xs text-slate-500">
              No tienes tareas ni exámenes registrados aquí.
            </p>
            <button
              onClick={() => setIsAddTaskModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Primera Tarea o Examen</span>
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const subject = subjects.find((s) => s.id === task.subjectId);
            const isCompleted = task.status === 'completada';

            return (
              <div
                key={task.id}
                className={`bg-white p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                  isCompleted
                    ? 'border-slate-200/60 opacity-60 bg-slate-50/50'
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    onClick={() => onToggleTaskStatus(task.id)}
                    className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 hover:border-slate-800'
                    }`}
                  >
                    {isCompleted && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      {task.space && (
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          task.space === 'becas'
                            ? 'bg-amber-100 text-amber-900'
                            : task.space === 'gob'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {task.space === 'becas' ? 'FGK' : task.space === 'gob' ? 'Instituto' : 'UNIVO'}
                        </span>
                      )}
                      {subject && (
                        <span
                          className="font-semibold"
                          style={{ color: subject.color }}
                        >
                          {subject.code}
                        </span>
                      )}
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="capitalize text-slate-500 font-medium">
                        {task.type}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span
                        className={`font-semibold uppercase tracking-wider text-[10px] ${
                          task.priority === 'alta'
                            ? 'text-rose-600'
                            : task.priority === 'media'
                            ? 'text-amber-600'
                            : 'text-slate-500'
                        }`}
                      >
                        Prioridad {task.priority}
                      </span>
                    </div>

                    <h3
                      className={`text-sm font-bold text-slate-900 leading-snug ${
                        isCompleted ? 'line-through text-slate-500' : ''
                      }`}
                    >
                      {task.title}
                    </h3>

                    {task.notes && (
                      <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                        {task.notes}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono pt-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>Vencimiento: {task.dueDate}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  title="Eliminar tarea"
                  className="p-1 text-slate-300 hover:text-rose-600 rounded shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Add Task */}
      {isAddTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Programar Tarea o Examen
              </h3>
              <button
                onClick={() => setIsAddTaskModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Título de la Entrega *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Entrega de Proyecto Docker, Examen Final..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Materia Asociada *</label>
                <select
                  value={newTask.subjectId || subjects[0]?.id || ''}
                  onChange={(e) => setNewTask({ ...newTask, subjectId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      [{s.space === 'becas' ? 'FGK' : s.space === 'gob' ? 'Instituto' : 'UNIVO'}] {s.code} — {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Fecha Límite</label>
                  <input
                    type="date"
                    required
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-2 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tipo</label>
                  <select
                    value={newTask.type}
                    onChange={(e) => setNewTask({ ...newTask, type: e.target.value as TaskType })}
                    className="w-full px-2 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
                  >
                    <option value="tarea">Tarea</option>
                    <option value="examen">Examen</option>
                    <option value="proyecto">Proyecto</option>
                    <option value="lectura">Lectura</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Prioridad</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
                    className="w-full px-2 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
                  >
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Detalles, rúbrica o enlaces</label>
                <textarea
                  rows={2}
                  placeholder="Requisitos de entrega, enlaces a repositorios o carpetas compartidas..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddTaskModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Guardar Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
