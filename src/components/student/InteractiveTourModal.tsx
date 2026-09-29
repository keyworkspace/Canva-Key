import React, { useState } from 'react';
import {
  Compass,
  Building2,
  Award,
  GraduationCap,
  Calendar,
  Sparkles,
  Coffee,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  HelpCircle,
  Clock,
  BookOpen,
  ArrowRight,
  PlusCircle,
  HelpCircle as QuestionIcon,
  ChevronDown,
} from 'lucide-react';
import { StudentSpace } from '../../types/student';

interface InteractiveTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpace: (space: StudentSpace) => void;
}

export const InteractiveTourModal: React.FC<InteractiveTourModalProps> = ({
  isOpen,
  onClose,
  onSelectSpace,
}) => {
  const [activeTab, setActiveTab] = useState<'tour' | 'faq'>('tour');
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  if (!isOpen) return null;

  const faqs = [
    {
      q: '¿Por qué la plataforma está dividida en módulos (General, Instituto, FGK, UNIVO)?',
      a: 'El módulo General te ofrece una visión panorámica consolidada de todo tu rendimiento; Instituto gestiona tu bachillerato de 3 años con horario de Lunes a Viernes; FGK controla tus ciclos sabatinos de 10 semanas (con exigencia de promedio ≥ 8.0 y 60h de voluntariado); y UNIVO almacena tu planificación de educación superior.',
    },
    {
      q: '¿Cómo funciona el ciclo de 10 semanas de FGK y la semana de descanso?',
      a: 'Cada ciclo sabatino en FGK dura exactamente 10 sábados de clases intensivas. Al finalizar la semana 10, la plataforma activa la "Semana 11 de Descanso Interciclo" donde no hay clases sabatinas programadas. Puedes cambiar de semana con el selector interactivo para ver qué materias tienes cada sábado.',
    },
    {
      q: '¿Por qué los horarios sabatinos son rotativos en FGK?',
      a: 'En FGK las aulas, laboratorios de tecnología e inmersión en inglés B2 van rotando cada sábado para optimizar el uso de los recursos. En el menú superior o en la pestaña "Horario" puedes elegir qué semana del ciclo estás cursando (Semana 1 a 10) para ver tu aula y orden exacto de clases.',
    },
    {
      q: '¿Cómo cambio entre los 3 años de bachillerato (1º, 2º y 3º año) en Instituto?',
      a: 'Al hacer clic en el módulo "Instituto" en la barra superior, verás los botones de "1º Año", "2º Año" y "3º Año". Cada año tiene sus materias independientes con el horario fijo de Lunes a Viernes.',
    },
    {
      q: '¿Por qué el módulo UNIVO está bloqueado y cómo lo desbloqueo?',
      a: 'Está bloqueado para no abrumarte mientras completas el bachillerato. Si ya estás en la universidad o quieres planificar con anticipación, simplemente haz clic en el módulo UNIVO y pulsa el botón "Desbloquear Espacio UNIVO Ahora", o cámbialo en Configuración / Perfil.',
    },
    {
      q: '¿Cómo añado nuevas instituciones, años o periodos?',
      a: 'En la barra secundaria blanca debajo del menú, haz clic en "Administrar Instituciones y Periodos". Allí puedes agregar nuevos institutos públicos, universidades o programas de formación y definir sus ciclos.',
    },
    {
      q: '¿Cómo me ayuda la calculadora "Salvar el Semestre"?',
      a: 'Ve a la pestaña "Herramientas & Extras" y selecciona cualquier materia. La calculadora sumará todas las notas que ya tienes ponderadas y te dirá la calificación matemática exacta que debes sacar en tu examen final para aprobar con la nota mínima.',
    },
  ];

  const steps = [
    {
      title: '¡Bienvenido a Canvas Key!',
      subtitle: 'Tu plataforma integral con módulos: General, Instituto, FGK y UNIVO',
      badge: 'Paso 1 de 5 · Los Módulos',
      icon: <Compass className="w-8 h-8 text-sky-500" />,
      content: (
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p className="text-sm text-slate-800 font-medium">
            Canvas Key está diseñado a la medida de tu día a día como estudiante salvadoreño, resolviendo la necesidad de coordinar tus estudios en el Instituto con tu programa FGK y tu proyección a la UNIVO.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>1. Instituto</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Tus 3 años de bachillerato con horario fijo de lunes a viernes.
                </p>
              </div>
              <button
                onClick={() => {
                  onSelectSpace('gob');
                  onClose();
                }}
                className="text-[11px] font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 pt-1"
              >
                <span>Probar Instituto</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>2. FGK</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Formación sabatina: ciclo de 10 semanas rotativas + 1 semana de descanso.
                </p>
              </div>
              <button
                onClick={() => {
                  onSelectSpace('becas');
                  onClose();
                }}
                className="text-[11px] font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1 pt-1"
              >
                <span>Probar FGK</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>3. UNIVO</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Educación superior: bloqueada hasta 2027 (o desbloqueable con un clic).
                </p>
              </div>
              <button
                onClick={() => {
                  onSelectSpace('universidad');
                  onClose();
                }}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 pt-1"
              >
                <span>Ver UNIVO</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'El Ciclo de 10 Semanas en FGK + 1 de Descanso',
      subtitle: 'Comprende la modalidad sabatina rotativa de FGK',
      badge: 'Paso 2 de 5 · FGK',
      icon: <Coffee className="w-8 h-8 text-amber-500" />,
      content: (
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p className="text-sm text-slate-800 font-medium">
            En FGK el ritmo es intensivo y altamente estructurado:
          </p>
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                10
              </div>
              <div>
                <strong className="text-amber-950 block text-xs">10 Semanas de Clases Sabatinas Rotativas</strong>
                <span>Cada ciclo consta de 10 sábados de clases donde los horarios y laboratorios rotan cada semana para cubrir tecnología, inglés B2 y liderazgo.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-200 text-emerald-900 font-bold flex items-center justify-center shrink-0 text-sm">
                ☕
              </div>
              <div>
                <strong className="text-emerald-950 block text-xs">1 Semana de Descanso Interciclo (Semana 11)</strong>
                <span>Al terminar la semana 10, la plataforma marca automáticamente la semana 11 como descanso libre de clases sabatinas.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-xs">
                ⭐
              </div>
              <div>
                <strong className="text-slate-900 block text-xs">Requisitos de Permanencia en FGK</strong>
                <span>Promedio mínimo &ge; <strong>8.0 / 10</strong>, <strong>60 horas</strong> de voluntariado social y <strong>90% de asistencia</strong> obligatoria.</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Módulo Instituto: Bachillerato',
      subtitle: 'Historial de 1º, 2º y 3º año con horario fijo semanal',
      badge: 'Paso 3 de 5 · Instituto',
      icon: <Building2 className="w-8 h-8 text-blue-500" />,
      content: (
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p className="text-sm text-slate-800 font-medium">
            En el Instituto tu formación se divide en 3 años lectivos:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="font-bold text-slate-900 text-xs">1º Año de Bachillerato</div>
              <p className="text-[11px] text-slate-500">Histórico de materias básicas y período inicial.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="font-bold text-slate-900 text-xs">2º Año de Bachillerato</div>
              <p className="text-[11px] text-slate-500">Especialidad técnica intermedia.</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center space-y-1">
              <div className="font-bold text-blue-900 text-xs">3º Año (Año Actual)</div>
              <p className="text-[11px] text-slate-600">Preparación Prueba Avanzo y graduación técnica.</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-blue-950 text-xs">
            💡 <strong>Horario Fijo:</strong> Las clases del Instituto son siempre fijas de <strong>Lunes a Viernes</strong>, permitiéndote planificar tus tardes de estudio y tus sábados para FGK.
          </div>
        </div>
      ),
    },
    {
      title: 'Módulo UNIVO (Desbloqueo Configurable)',
      subtitle: 'Tu futuro universitario en la UNIVO',
      badge: 'Paso 4 de 5 · UNIVO',
      icon: <GraduationCap className="w-8 h-8 text-emerald-500" />,
      content: (
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p className="text-sm text-slate-800 font-medium">
            El módulo UNIVO está configurado por defecto para <strong>desbloquearse el próximo año (2027)</strong>, cuando te gradúes de bachillerato y de FGK.
          </p>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>¿Ya estás en la UNIVO o quieres explorarla antes?</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Puedes hacer clic en el botón <strong>"Desbloquear Espacio UNIVO Ahora"</strong> o entrar a <strong>Perfil / Configuración</strong> para cambiar el año de desbloqueo cuando tú lo decidas.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Herramientas Especiales & Productividad',
      subtitle: 'Calculadora "Salvar el Semestre", Pomodoro, Faltas y Billetera',
      badge: 'Paso 5 de 5 · Herramientas',
      icon: <Sparkles className="w-8 h-8 text-rose-500" />,
      content: (
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p className="text-sm text-slate-800 font-medium">
            En la pestaña <strong>"Herramientas &amp; Extras"</strong> tienes utilidades para garantizar que nunca pierdas una materia ni tu beca:
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-0.5">
              <div className="font-bold text-slate-900 text-xs">🎯 Salvar el Semestre</div>
              <p className="text-[10px] text-slate-500">Calcula la nota exacta que necesitas en el examen final para pasar.</p>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-0.5">
              <div className="font-bold text-slate-900 text-xs">⏱️ Pomodoro Sabatino</div>
              <p className="text-[10px] text-slate-500">Temporizador de 25 min para estudiar enfocado.</p>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-0.5">
              <div className="font-bold text-slate-900 text-xs">🛡️ Control de Faltas</div>
              <p className="text-[10px] text-slate-500">Alertas antes de superar el límite de inasistencias.</p>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-0.5">
              <div className="font-bold text-slate-900 text-xs">💰 Billetera Estudiantil</div>
              <p className="text-[10px] text-slate-500">Control de gastos de transporte, comida y fotocopias.</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 flex flex-col justify-between space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Top Header & Tab Switcher */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('tour')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'tour'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🚀 Guía Paso a Paso
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'faq'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              💡 Preguntas Frecuentes (FAQ)
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100"
            title="Cerrar asistente"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab 1: Step-by-Step Tour */}
        {activeTab === 'tour' && (
          <>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-slate-100 shrink-0">
                  {currentStepData.icon}
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {currentStepData.badge}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 font-display">
                    {currentStepData.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentStepData.subtitle}
                  </p>
                </div>
              </div>

              {/* Dynamic Content */}
              <div className="pt-2">
                {currentStepData.content}
              </div>
            </div>

            {/* Step Progress Dots & Navigation Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentStep === idx
                        ? 'w-6 bg-slate-900'
                        : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors inline-flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Anterior</span>
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>{currentStep === steps.length - 1 ? '¡Listo para comenzar!' : 'Siguiente'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Tab 2: Frequently Asked Questions */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <span>Respuestas directas a tus dudas de Canvas Key</span>
            </div>
            <p className="text-xs text-slate-500">
              Haz clic en cualquiera de las preguntas para desplegar la explicación detallada:
            </p>

            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full text-left p-3.5 flex items-center justify-between gap-3 font-semibold text-xs text-slate-800 hover:bg-slate-100 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 pt-0 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Entendido, volver a la plataforma
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
