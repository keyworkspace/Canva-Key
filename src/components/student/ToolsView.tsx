import React, { useState, useEffect } from 'react';
import { Subject, StudentProfile, ExpenseItem, StudyLog } from '../../types/student';
import { calculateSubjectGrade } from '../../utils/studentCalculations';
import { Sparkles, Timer, Play, Pause, RotateCcw, AlertTriangle, Wallet, CreditCard, Plus, Trash2, Printer, CheckCircle2, ShieldAlert } from 'lucide-react';
import defaultAvatar from '../../assets/images/student_avatar_profile_1790642966980.jpg';

interface ToolsViewProps {
  subjects: Subject[];
  profile: StudentProfile;
  expenses: ExpenseItem[];
  studyLogs: StudyLog[];
  onAddExpense: (expense: ExpenseItem) => void;
  onDeleteExpense: (expenseId: string) => void;
  onUpdateSubjectAbsence: (subjectId: string, delta: number) => void;
  onLogStudySession: (subjectId: string, minutes: number) => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({
  subjects,
  profile,
  expenses,
  studyLogs,
  onAddExpense,
  onDeleteExpense,
  onUpdateSubjectAbsence,
  onLogStudySession,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'pomodoro' | 'absences' | 'finances' | 'idcard'>('calculator');

  // Calculator State
  const [selectedCalcSubjectId, setSelectedCalcSubjectId] = useState<string>(subjects[0]?.id || '');
  const [targetPassingGrade, setTargetPassingGrade] = useState<number>(profile.passingGrade);
  const [customFinalExamWeight, setCustomFinalExamWeight] = useState<number>(30);

  // Pomodoro State
  const [pomodoroSubjectId, setPomodoroSubjectId] = useState<string>(subjects[0]?.id || '');
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'study' | 'short_break' | 'long_break'>('study');

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (timerMode === 'study' && pomodoroSubjectId) {
        onLogStudySession(pomodoroSubjectId, 25);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, timerMode, pomodoroSubjectId, onLogStudySession]);

  const setMode = (mode: 'study' | 'short_break' | 'long_break') => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    if (mode === 'study') setTimerSeconds(25 * 60);
    if (mode === 'short_break') setTimerSeconds(5 * 60);
    if (mode === 'long_break') setTimerSeconds(15 * 60);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Finance State
  const [newExpense, setNewExpense] = useState({
    description: '',
    category: 'Alimentación' as ExpenseItem['category'],
    amount: '',
  });

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount) return;
    onAddExpense({
      id: `exp-${Date.now()}`,
      description: newExpense.description,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      date: new Date().toISOString().split('T')[0],
    });
    setNewExpense({ description: '', category: 'Alimentación', amount: '' });
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Selected subject for calculator
  const calcSubject = subjects.find((s) => s.id === selectedCalcSubjectId) || subjects[0];
  const scaleMax = profile.scale === '100' ? 100 : profile.scale === '5' ? 5 : 10;

  // Calculate needed grade on custom weight or remaining
  const calcSummary = calcSubject ? calculateSubjectGrade(calcSubject, targetPassingGrade, scaleMax) : null;
  const remainingWeight = calcSummary ? calcSummary.pendingWeight : 0;
  const weightToUse = customFinalExamWeight > 0 ? customFinalExamWeight : (remainingWeight > 0 ? remainingWeight : 30);
  const neededScoreCustom = calcSummary
    ? Math.max(0, parseFloat((((targetPassingGrade - calcSummary.accumulatedScore) * 100) / weightToUse).toFixed(2)))
    : 0;

  const totalStudyMinutes = studyLogs.reduce((sum, log) => sum + log.minutes, 0);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
          Herramientas Estudiantiles &amp; Productividad
        </h1>
        <p className="text-xs text-slate-500">
          Todo lo que necesitas para tu día a día: calculadora de aprobación, pomodoro, control de faltas y billetera.
        </p>
      </div>

      {/* Tools Nav Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto">
        {[
          { id: 'calculator', label: '🎯 Salvar el Semestre' },
          { id: 'pomodoro', label: '⏱️ Pomodoro Timer' },
          { id: 'absences', label: '🛡️ Control de Faltas' },
          { id: 'finances', label: '💰 Billetera Estudiantil' },
          { id: 'idcard', label: '🪪 Carnet & Reporte' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveSubTab(t.id as any)}
            className={`py-2 px-3.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeSubTab === t.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tool 1: Calculadora "Salvar el Semestre" */}
      {activeSubTab === 'calculator' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
          <div className="max-w-xl space-y-1">
            <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Calculadora de Supervivencia: ¿Cuánto necesito en el final?</span>
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Selecciona tu materia, define la nota mínima que deseas alcanzar y el peso del examen final para saber exactamente cuánto debes sacar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Materia a Analizar</label>
              <select
                value={selectedCalcSubjectId}
                onChange={(e) => setSelectedCalcSubjectId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.code} — {s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Nota Objetivo que Quieres Sacar</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max={scaleMax}
                value={targetPassingGrade}
                onChange={(e) => setTargetPassingGrade(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Peso del Examen Restante (%)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={customFinalExamWeight}
                onChange={(e) => setCustomFinalExamWeight(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 font-mono"
              />
            </div>
          </div>

          {/* Result Card */}
          {calcSubject && calcSummary && (
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Diagnóstico de Aprobación para {calcSubject.name}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Llevas acumulados <strong className="font-mono text-slate-900">{calcSummary.accumulatedScore} puntos</strong> de {calcSummary.evaluatedWeight}% evaluado.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 text-center shrink-0">
                  <div className="text-[11px] text-slate-500 font-medium">Nota necesaria en el {weightToUse}% restante:</div>
                  <div className={`text-3xl font-extrabold font-mono tabular-nums mt-0.5 ${
                    neededScoreCustom <= targetPassingGrade
                      ? 'text-emerald-600'
                      : neededScoreCustom <= scaleMax
                      ? 'text-amber-600'
                      : 'text-rose-600'
                  }`}>
                    {neededScoreCustom > 0 ? neededScoreCustom : '0.0 (Ya pasaste)'}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">escala 0 - {scaleMax}</div>
                </div>
              </div>

              {/* Text interpretation */}
              <div className="text-xs leading-relaxed">
                {neededScoreCustom <= 0 ? (
                  <div className="text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>¡Enhorabuena! Ya tienes suficientes puntos acumulados para aprobar esta materia incluso sin presentarte al examen final.</span>
                  </div>
                ) : neededScoreCustom <= targetPassingGrade ? (
                  <div className="text-emerald-700">
                    🟢 <strong>Excelente posición:</strong> Necesitas una nota alcanzable de <strong>{neededScoreCustom}</strong> en el examen final para cerrar la asignatura con <strong>{targetPassingGrade}</strong>.
                  </div>
                ) : neededScoreCustom <= scaleMax ? (
                  <div className="text-amber-700">
                    🟡 <strong>Atención:</strong> Necesitas sacar al menos <strong>{neededScoreCustom}</strong> de {scaleMax} en la evaluación final. Te recomendamos planificar sesiones de estudio con anticipación.
                  </div>
                ) : (
                  <div className="text-rose-700 font-semibold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>Matemáticamente la nota requerida ({neededScoreCustom}) supera la escala máxima ({scaleMax}). Habla con el docente para explorar trabajos de recuperación o puntos extra.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tool 2: Pomodoro Timer */}
      {activeSubTab === 'pomodoro' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-8 shadow-2xs text-center max-w-xl mx-auto space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 font-display flex items-center justify-center gap-2">
              <Timer className="w-5 h-5 text-sky-600" />
              <span>Temporizador Pomodoro para Estudiantes</span>
            </h2>
            <p className="text-xs text-slate-500">
              Mantén el foco con bloques de estudio de 25 minutos y pausas breves.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center justify-center gap-2 p-1 bg-slate-100 rounded-xl max-w-xs mx-auto">
            <button
              onClick={() => setMode('study')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                timerMode === 'study' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Estudio (25m)
            </button>
            <button
              onClick={() => setMode('short_break')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                timerMode === 'short_break' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Pausa (5m)
            </button>
            <button
              onClick={() => setMode('long_break')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                timerMode === 'long_break' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Largo (15m)
            </button>
          </div>

          {/* Subject picker */}
          <div className="max-w-xs mx-auto">
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Materia en Estudio</label>
            <select
              value={pomodoroSubjectId}
              onChange={(e) => setPomodoroSubjectId(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.code} — {s.name}</option>
              ))}
            </select>
          </div>

          {/* Big Digital Display */}
          <div className="py-6 font-mono text-6xl font-bold tracking-tight text-slate-900 tabular-nums">
            {formatTimer(timerSeconds)}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isTimerRunning ? 'Pausar' : 'Comenzar Sesión'}</span>
            </button>

            <button
              onClick={() => setMode(timerMode)}
              title="Reiniciar temporizador"
              className="p-2.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between max-w-sm mx-auto">
            <span>Tiempo total registrado:</span>
            <strong className="font-mono text-slate-900">{totalStudyMinutes} minutos</strong>
          </div>
        </div>
      )}

      {/* Tool 3: Control de Faltas & Inasistencias */}
      {activeSubTab === 'absences' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
          <div className="max-w-xl space-y-1">
            <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Control de Asistencia &amp; Faltas Permitidas</span>
            </h2>
            <p className="text-xs text-slate-500">
              Evita perder asignaturas por inasistencias. Registra tus faltas y mantén el control antes del límite reglamentario.
            </p>
          </div>

          <div className="space-y-3">
            {subjects.map((sub) => {
              const remainingAbsences = Math.max(0, sub.maxAbsences - sub.absences);
              const isDanger = remainingAbsences <= 1;

              return (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <span>{sub.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>Aula {sub.classroom}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{sub.name}</h3>
                    <div className="text-xs text-slate-500">
                      Límite reglamentario: <strong>{sub.maxAbsences} faltas</strong> máximo por semestre.
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Faltas Actuales</div>
                      <div className="text-xl font-bold font-mono tabular-nums text-slate-900">
                        {sub.absences}{' '}
                        <span className="text-xs text-slate-400 font-normal">/ {sub.maxAbsences}</span>
                      </div>
                      <div className={`text-[11px] font-semibold ${isDanger ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {remainingAbsences === 0
                          ? '¡Límite alcanzado!'
                          : `Te quedan ${remainingAbsences} faltas permitidas`}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onUpdateSubjectAbsence(sub.id, -1)}
                        disabled={sub.absences <= 0}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 font-bold flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <button
                        onClick={() => onUpdateSubjectAbsence(sub.id, 1)}
                        className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tool 4: Billetera Estudiantil */}
      {activeSubTab === 'finances' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span>Registrar Gasto Universitario</span>
            </h2>

            <form onSubmit={handleAddExpenseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Concepto o Descripción *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Fotocopias apuntes, Menú comedor..."
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Categoría</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 bg-white"
                  >
                    <option value="Matrícula">Matrícula</option>
                    <option value="Libros">Libros &amp; Manuales</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Alimentación">Alimentación</option>
                    <option value="Tecnología">Tecnología &amp; Software</option>
                    <option value="Materiales">Materiales</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Importe (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="15.50"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors mt-2"
              >
                Añadir a la Billetera
              </button>
            </form>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-950 mt-4">
              <div className="text-xs">Gasto Total Acumulado en el Semestre</div>
              <div className="text-2xl font-bold font-mono tabular-nums mt-0.5">
                {totalExpenses.toFixed(2)} €
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Historial de Gastos
            </h3>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {expenses.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  No hay gastos registrados todavía.
                </div>
              ) : (
                expenses.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-3 rounded-lg border border-slate-100 hover:bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{exp.description}</div>
                      <div className="text-[11px] text-slate-500">
                        {exp.category} · {exp.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold font-mono tabular-nums text-slate-900">
                        {exp.amount.toFixed(2)} €
                      </span>
                      <button
                        onClick={() => onDeleteExpense(exp.id)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tool 5: Carnet Universitario & Reporte */}
      {activeSubTab === 'idcard' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-8 shadow-2xs space-y-6 max-w-xl mx-auto">
          <div className="text-center space-y-1">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Carnet Digital Estudiantil — Canvas Key
            </h2>
            <p className="text-xs text-slate-500">
              Identificación universitaria oficial para acceso a bibliotecas, laboratorios y descuentos.
            </p>
          </div>

          {/* Student ID Card Badge */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white shadow-xl border border-slate-700 relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-sky-500 text-slate-950 font-extrabold flex items-center justify-center text-xs">
                  CK
                </div>
                <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
                  {profile.university}
                </span>
              </div>
              <span className="text-[10px] font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800">
                ACTIVO 2026/2027
              </span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={profile.avatarUrl || defaultAvatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-18 h-18 rounded-xl object-cover border-2 border-slate-600"
              />
              <div className="space-y-1 min-w-0">
                <h3 className="text-base font-bold text-white truncate">{profile.name}</h3>
                <div className="text-xs text-slate-300 truncate">{profile.career}</div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Matrícula ID: <strong className="text-slate-200">{profile.studentId}</strong>
                </div>
                <div className="text-[11px] text-slate-400">{profile.semester}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-[10px] text-slate-400">
              <span>Sede Central Campus Norte</span>
              <span className="font-mono">VALIDACIÓN: OK</span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar en PDF</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
