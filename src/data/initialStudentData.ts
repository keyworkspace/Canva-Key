import {
  StudentProfile,
  Subject,
  Professor,
  ScheduleClass,
  TaskItem,
  ExpenseItem,
  StudyLog,
  Institution,
  AcademicPeriod,
} from '../types/student';
import defaultAvatar from '../assets/images/student_avatar_profile_1790642966980.jpg';

export const INITIAL_INSTITUTIONS: Institution[] = [
  {
    id: 'inst-inframen',
    name: 'Instituto Nacional General Francisco Menéndez (INFRAMEN)',
    shortName: 'Instituto',
    type: 'publico',
    department: 'San Salvador',
    isScholarship: false,
  },
  {
    id: 'inst-fgk',
    name: 'Programa Oportunidades — Fundación Gloria Kriete (FGK)',
    shortName: 'FGK',
    type: 'beca_fgk',
    department: 'San Salvador',
    isScholarship: true,
    scholarshipDetails: {
      programName: 'FGK',
      minGpaRequired: 8.0,
      volunteerHoursRequired: 60,
      volunteerHoursCompleted: 0,
      attendanceRequiredPct: 90,
      cycleWeeksTotal: 10,
      hasBreakWeek: true,
      currentCycle: 1,
      currentWeekInCycle: 1,
      advisorName: 'Coordinación Oportunidades FGK',
      advisorEmail: 'coordinacion@oportunidades.org.sv',
    },
  },
  {
    id: 'inst-ues',
    name: 'Universidad de Oriente (UNIVO)',
    shortName: 'UNIVO',
    type: 'universidad',
    department: 'San Miguel',
    isScholarship: false,
  },
];

export const INITIAL_PERIODS: AcademicPeriod[] = [
  {
    id: 'per-gob-1',
    institutionId: 'inst-inframen',
    space: 'gob',
    gobYear: 3,
    year: 2026,
    name: 'Período 1 — Instituto',
    startDate: '2026-01-15',
    endDate: '2026-04-10',
    isCurrent: true,
  },
  {
    id: 'per-gob-2',
    institutionId: 'inst-inframen',
    space: 'gob',
    gobYear: 3,
    year: 2026,
    name: 'Período 2 — Instituto',
    startDate: '2026-04-15',
    endDate: '2026-07-05',
    isCurrent: false,
  },
  {
    id: 'per-fgk-1',
    institutionId: 'inst-fgk',
    space: 'becas',
    year: 2026,
    name: 'Ciclo 1 Sabatino FGK (10 Semanas)',
    startDate: '2026-01-20',
    endDate: '2026-04-05',
    isCurrent: true,
  },
  {
    id: 'per-ues-1',
    institutionId: 'inst-ues',
    space: 'universidad',
    year: 2027,
    name: 'Ciclo I - 2027 (UNIVO)',
    startDate: '2027-02-15',
    endDate: '2027-06-30',
    isCurrent: true,
  },
];

export const INITIAL_PROFILE: StudentProfile = {
  name: 'Mi Perfil Estudiantil',
  career: 'Bachillerato Técnico / Estudiante FGK',
  university: 'Instituto / FGK / UNIVO',
  studentId: 'CK-2026',
  semester: 'Año Escolar 2026',
  scale: '10',
  passingGrade: 6.0,
  avatarUrl: defaultAvatar,
  country: 'El Salvador',
  activeSpace: 'general',
  activeGobYear: 3,
  activeSaturdayWeek: 1,
  universityUnlocked: false, // Bloqueado hasta 2027 por defecto
  universityUnlockYear: 2027,
  activeInstitutionId: 'all',
  activePeriodId: 'all',
  activeYear: 2026,
};

// Toda la plataforma inicia VACÍA para que el estudiante registre su propia información
export const INITIAL_SUBJECTS: Subject[] = [];
export const INITIAL_PROFESSORS: Professor[] = [];
export const INITIAL_SCHEDULE: ScheduleClass[] = [];
export const INITIAL_TASKS: TaskItem[] = [];
export const INITIAL_EXPENSES: ExpenseItem[] = [];
export const INITIAL_STUDY_LOGS: StudyLog[] = [];
