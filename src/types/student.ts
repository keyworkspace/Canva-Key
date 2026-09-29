export type GradeScale = '10' | '5' | '100';

export type StudentSpace = 'general' | 'gob' | 'becas' | 'universidad';

export type GobHighSchoolYear = 1 | 2 | 3; // 1º, 2º o 3º Año de Bachillerato MINED

export type InstitutionType = 'publico' | 'beca_fgk' | 'universidad' | 'tecnico' | 'otro';

export interface ScholarshipConfig {
  programName: string; // e.g. "Programa Oportunidades - Fundación Gloria Kriete"
  minGpaRequired: number; // e.g. 8.0 / 10
  volunteerHoursRequired: number; // e.g. 60h
  volunteerHoursCompleted: number; // e.g. 38h
  attendanceRequiredPct: number; // e.g. 90%
  cycleWeeksTotal?: number; // 10 semanas de clases
  hasBreakWeek?: boolean; // 1 semana de descanso al finalizar el ciclo
  currentCycle?: number; // e.g. Ciclo 1
  currentWeekInCycle?: number; // 1 to 11 (1-10 clases, 11 descanso)
  advisorName?: string;
  advisorEmail?: string;
}

export interface SaturdayRotationSchedule {
  weekNumber: number; // 1, 2, 3, 4
  weekLabel: string;  // e.g. "Semana 1: Énfasis Tech & Codificación"
  classes: ScheduleClass[];
}

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  type: InstitutionType;
  department?: string; // San Salvador, Santa Ana, San Miguel, etc.
  isScholarship: boolean;
  scholarshipDetails?: ScholarshipConfig;
}

export interface AcademicPeriod {
  id: string;
  institutionId: string;
  space?: StudentSpace; // 'gob' | 'becas' | 'universidad'
  year: number; // e.g. 2026
  name: string; // e.g. "Período 1 MINED", "Ciclo I - 2026", "Fase FGK 2026"
  gobYear?: GobHighSchoolYear; // 1, 2, or 3 if space === 'gob'
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface GradeItem {
  id: string;
  name: string;
  weight: number; // e.g. 20 for 20%
  score: number | null; // null if pending
  date?: string;
}

export interface Subject {
  id: string;
  space?: StudentSpace; // 'gob' | 'becas' | 'universidad'
  institutionId: string;
  periodId: string;
  gobYear?: GobHighSchoolYear; // 1, 2, 3 if space === 'gob'
  code: string;
  name: string;
  credits: number;
  professorId?: string;
  classroom: string;
  color: string;
  targetGrade: number;
  grades: GradeItem[];
  absences: number;
  maxAbsences: number;
  syllabusNotes?: string;
}

export type DayOfWeek = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';

export interface ScheduleClass {
  id: string;
  space?: StudentSpace; // 'gob' | 'becas' | 'universidad'
  subjectId: string;
  day: DayOfWeek;
  startTime: string; // "HH:MM" 24h
  endTime: string;   // "HH:MM" 24h
  classroom: string;
  type: 'Teoría' | 'Laboratorio' | 'Taller' | 'Seminario';
  saturdayWeek?: number; // 1, 2, 3, 4 for rotating Saturday classes
}

export interface Professor {
  id: string;
  space?: StudentSpace;
  name: string;
  title: string;
  email: string;
  phone?: string;
  office: string;
  officeHours: string;
  rating: number; // 1 to 5
  evaluationTips: string;
}

export type TaskPriority = 'alta' | 'media' | 'baja';
export type TaskStatus = 'pendiente' | 'en_progreso' | 'completada';
export type TaskType = 'tarea' | 'examen' | 'proyecto' | 'lectura';

export interface TaskItem {
  id: string;
  space?: StudentSpace;
  title: string;
  subjectId: string;
  dueDate: string; // YYYY-MM-DD
  priority: TaskPriority;
  status: TaskStatus;
  type: TaskType;
  notes?: string;
}

export interface StudentProfile {
  name: string;
  career: string;
  university: string;
  studentId: string;
  semester: string;
  scale: GradeScale;
  passingGrade: number;
  avatarUrl?: string;
  country: string; // e.g. "El Salvador"
  activeSpace: StudentSpace; // 'gob' | 'becas' | 'universidad'
  activeGobYear: GobHighSchoolYear; // 1, 2, or 3
  activeSaturdayWeek: number; // 1, 2, 3, 4
  universityUnlocked: boolean; // locked until next year by default
  universityUnlockYear: number; // 2027
  activeInstitutionId: string;
  activePeriodId: string;
  activeYear: number;
}

export interface ExpenseItem {
  id: string;
  description: string;
  category: 'Matrícula' | 'Libros' | 'Transporte' | 'Alimentación' | 'Tecnología' | 'Materiales' | 'Otros';
  amount: number;
  date: string;
}

export interface StudyLog {
  id: string;
  subjectId: string;
  minutes: number;
  date: string;
}

