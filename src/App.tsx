import React, { useState, useEffect } from 'react';
import {
  StudentProfile,
  Subject,
  Professor,
  ScheduleClass,
  TaskItem,
  ExpenseItem,
  StudyLog,
  GradeItem,
  Institution,
  AcademicPeriod,
  StudentSpace,
  GobHighSchoolYear,
} from './types/student';
import {
  INITIAL_PROFILE,
  INITIAL_SUBJECTS,
  INITIAL_PROFESSORS,
  INITIAL_SCHEDULE,
  INITIAL_TASKS,
  INITIAL_EXPENSES,
  INITIAL_STUDY_LOGS,
  INITIAL_INSTITUTIONS,
  INITIAL_PERIODS,
} from './data/initialStudentData';
import { calculateSemesterGPA } from './utils/studentCalculations';
import { UnifiedHeader, StudentTab } from './components/student/UnifiedHeader';
import { DashboardView } from './components/student/DashboardView';
import { SubjectsView } from './components/student/SubjectsView';
import { ScheduleView } from './components/student/ScheduleView';
import { ProfessorsView } from './components/student/ProfessorsView';
import { TasksView } from './components/student/TasksView';
import { ToolsView } from './components/student/ToolsView';
import { ProfileModal } from './components/student/ProfileModal';
import { QuickAddModal } from './components/student/QuickAddModal';
import { InstitutionsModal } from './components/student/InstitutionsModal';
import { UniversityLockedView } from './components/student/UniversityLockedView';
import { InteractiveTourModal } from './components/student/InteractiveTourModal';
import {
  OFFICIAL_DEMO_SUBJECTS,
  OFFICIAL_DEMO_SCHEDULE,
  OFFICIAL_DEMO_TASKS,
  OFFICIAL_DEMO_PROFESSORS,
} from './data/officialKit';
import { Sparkles } from 'lucide-react';

const STORAGE_KEYS = {
  profile: 'canvas_key_profile_v3_panorama',
  subjects: 'canvas_key_subjects_v3_panorama',
  professors: 'canvas_key_professors_v3_panorama',
  schedule: 'canvas_key_schedule_v3_panorama',
  tasks: 'canvas_key_tasks_v3_panorama',
  expenses: 'canvas_key_expenses_v3_panorama',
  studyLogs: 'canvas_key_study_logs_v3_panorama',
  institutions: 'canvas_key_institutions_v3_panorama',
  periods: 'canvas_key_periods_v3_panorama',
  tourSeen: 'canvas_key_has_seen_tour_v3_panorama',
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<StudentTab>('dashboard');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const [isInstitutionsModalOpen, setIsInstitutionsModalOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.tourSeen) !== 'true';
  });

  // Profile State
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.profile);
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  // Institutions State
  const [institutions, setInstitutions] = useState<Institution[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.institutions);
    return saved ? JSON.parse(saved) : INITIAL_INSTITUTIONS;
  });

  // Periods State
  const [periods, setPeriods] = useState<AcademicPeriod[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.periods);
    return saved ? JSON.parse(saved) : INITIAL_PERIODS;
  });

  // Subjects State (Empty by default)
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.subjects);
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  // Professors State
  const [professors, setProfessors] = useState<Professor[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.professors);
    return saved ? JSON.parse(saved) : INITIAL_PROFESSORS;
  });

  // Schedule State
  const [schedule, setSchedule] = useState<ScheduleClass[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.schedule);
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });

  // Tasks State
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.tasks);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // Expenses State
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.expenses);
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  // Study Logs State
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.studyLogs);
    return saved ? JSON.parse(saved) : INITIAL_STUDY_LOGS;
  });

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.institutions, JSON.stringify(institutions));
  }, [institutions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.periods, JSON.stringify(periods));
  }, [periods]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.subjects, JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.professors, JSON.stringify(professors));
  }, [professors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.schedule, JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.expenses, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.studyLogs, JSON.stringify(studyLogs));
  }, [studyLogs]);

  // Space switcher handlers
  const handleChangeSpace = (space: StudentSpace) => {
    setProfile((prev) => ({
      ...prev,
      activeSpace: space,
    }));
  };

  const handleChangeGobYear = (year: GobHighSchoolYear) => {
    setProfile((prev) => ({
      ...prev,
      activeGobYear: year,
    }));
  };

  const handleChangeSaturdayWeek = (week: number) => {
    setProfile((prev) => ({
      ...prev,
      activeSaturdayWeek: week,
    }));
  };

  const handleUnlockUniversity = () => {
    setProfile((prev) => ({
      ...prev,
      universityUnlocked: true,
    }));
  };

  const handleCloseTour = () => {
    localStorage.setItem(STORAGE_KEYS.tourSeen, 'true');
    setIsTourOpen(false);
  };

  // Filter entities according to active space
  const spaceSubjects = subjects.filter((s) => {
    if (profile.activeSpace === 'general') return true;
    if (!s.space) return true;
    if (s.space !== profile.activeSpace) return false;
    if (profile.activeSpace === 'gob' && s.gobYear && s.gobYear !== profile.activeGobYear) {
      return false;
    }
    return true;
  });

  const spaceTasks = tasks.filter((t) => {
    if (profile.activeSpace === 'general') return true;
    if (!t.space) return true;
    return t.space === profile.activeSpace;
  });

  const spaceProfessors = professors.filter((p) => {
    if (profile.activeSpace === 'general') return true;
    if (!p.space) return true;
    return p.space === profile.activeSpace;
  });

  // Institution & Period Handlers
  const handleAddInstitution = (newInst: Institution) => {
    setInstitutions((prev) => [...prev, newInst]);
  };

  const handleDeleteInstitution = (instId: string) => {
    setInstitutions((prev) => prev.filter((i) => i.id !== instId));
    setPeriods((prev) => prev.filter((p) => p.institutionId !== instId));
  };

  const handleAddPeriod = (newPeriod: AcademicPeriod) => {
    setPeriods((prev) => [...prev, newPeriod]);
  };

  const handleDeletePeriod = (periodId: string) => {
    setPeriods((prev) => prev.filter((p) => p.id !== periodId));
  };

  // Subject Handlers
  const handleAddSubject = (newSubject: Subject) => {
    const determinedSpace = newSubject.space
      ? newSubject.space
      : profile.activeSpace === 'general'
        ? (newSubject.institutionId === 'inst-fgk' ? 'becas' : newSubject.institutionId === 'inst-ues' ? 'universidad' : 'gob')
        : profile.activeSpace;

    const subjectWithSpace: Subject = {
      ...newSubject,
      space: determinedSpace,
      gobYear: determinedSpace === 'gob' ? (newSubject.gobYear || profile.activeGobYear) : undefined,
    };
    setSubjects((prev) => [...prev, subjectWithSpace]);
  };

  const handleUpdateSubject = (updated: Subject) => {
    setSubjects((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleDeleteSubject = (subjectId: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== subjectId));
    setSchedule((prev) => prev.filter((sc) => sc.subjectId !== subjectId));
    setTasks((prev) => prev.filter((t) => t.subjectId !== subjectId));
  };

  const handleAddGrade = (subjectId: string, grade: GradeItem) => {
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id === subjectId) {
          return {
            ...s,
            grades: [...s.grades, grade],
          };
        }
        return s;
      })
    );
  };

  const handleDeleteGrade = (subjectId: string, gradeId: string) => {
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id === subjectId) {
          return {
            ...s,
            grades: s.grades.filter((g) => g.id !== gradeId),
          };
        }
        return s;
      })
    );
  };

  const handleUpdateGrade = (subjectId: string, updatedGrade: GradeItem) => {
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id === subjectId) {
          return {
            ...s,
            grades: s.grades.map((g) => (g.id === updatedGrade.id ? updatedGrade : g)),
          };
        }
        return s;
      })
    );
  };

  // Schedule Handlers
  const handleAddClass = (newClass: ScheduleClass) => {
    const targetSubject = subjects.find((s) => s.id === newClass.subjectId);
    const determinedSpace = newClass.space
      ? newClass.space
      : targetSubject?.space || (newClass.day === 'Sábado' ? 'becas' : profile.activeSpace === 'general' ? 'gob' : profile.activeSpace);

    setSchedule((prev) => [...prev, { ...newClass, space: determinedSpace }]);
  };

  const handleDeleteClass = (classId: string) => {
    setSchedule((prev) => prev.filter((sc) => sc.id !== classId));
  };

  // Professor Handlers
  const handleAddProfessor = (newProf: Professor) => {
    const determinedSpace = newProf.space
      ? newProf.space
      : profile.activeSpace === 'general' ? 'gob' : profile.activeSpace;
    setProfessors((prev) => [...prev, { ...newProf, space: determinedSpace }]);
  };

  const handleDeleteProfessor = (profId: string) => {
    setProfessors((prev) => prev.filter((p) => p.id !== profId));
  };

  // Task Handlers
  const handleAddTask = (newTask: TaskItem) => {
    const targetSubject = subjects.find((s) => s.id === newTask.subjectId);
    const determinedSpace = newTask.space
      ? newTask.space
      : targetSubject?.space || (profile.activeSpace === 'general' ? 'gob' : profile.activeSpace);
    setTasks((prev) => [...prev, { ...newTask, space: determinedSpace }]);
  };

  const handleToggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: t.status === 'completada' ? 'pendiente' : 'completada',
          };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Expense Handlers
  const handleAddExpense = (expense: ExpenseItem) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
  };

  // Absence Update
  const handleUpdateSubjectAbsence = (subjectId: string, delta: number) => {
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id === subjectId) {
          const newAbs = Math.max(0, s.absences + delta);
          return { ...s, absences: newAbs };
        }
        return s;
      })
    );
  };

  // Study log
  const handleLogStudySession = (subjectId: string, minutes: number) => {
    const newLog: StudyLog = {
      id: `sl-${Date.now()}`,
      subjectId,
      minutes,
      date: new Date().toISOString().split('T')[0],
    };
    setStudyLogs((prev) => [newLog, ...prev]);
  };

  // Quick helper to load common standard subjects for the space
  const handleLoadTemplateSubjects = () => {
    if (profile.activeSpace === 'general') {
      // Load both GOB and Becas FGK comprehensive data
      setSubjects(OFFICIAL_DEMO_SUBJECTS);
      setSchedule(OFFICIAL_DEMO_SCHEDULE);
      setTasks(OFFICIAL_DEMO_TASKS);
      setProfessors(OFFICIAL_DEMO_PROFESSORS);
    } else if (profile.activeSpace === 'gob') {
      const gobSubjects = OFFICIAL_DEMO_SUBJECTS.filter((s) => s.space === 'gob');
      const gobSchedule = OFFICIAL_DEMO_SCHEDULE.filter((s) => s.space === 'gob');
      const gobTasks = OFFICIAL_DEMO_TASKS.filter((s) => s.space === 'gob');
      const gobProfessors = OFFICIAL_DEMO_PROFESSORS.filter((s) => s.space === 'gob');
      setSubjects((prev) => [...prev.filter((s) => s.space !== 'gob'), ...gobSubjects]);
      setSchedule((prev) => [...prev.filter((s) => s.space !== 'gob'), ...gobSchedule]);
      setTasks((prev) => [...prev.filter((s) => s.space !== 'gob'), ...gobTasks]);
      setProfessors((prev) => [...prev.filter((s) => s.space !== 'gob'), ...gobProfessors]);
    } else if (profile.activeSpace === 'becas') {
      const becasSubjects = OFFICIAL_DEMO_SUBJECTS.filter((s) => s.space === 'becas');
      const becasSchedule = OFFICIAL_DEMO_SCHEDULE.filter((s) => s.space === 'becas');
      const becasTasks = OFFICIAL_DEMO_TASKS.filter((s) => s.space === 'becas');
      const becasProfessors = OFFICIAL_DEMO_PROFESSORS.filter((s) => s.space === 'becas');
      setSubjects((prev) => [...prev.filter((s) => s.space !== 'becas'), ...becasSubjects]);
      setSchedule((prev) => [...prev.filter((s) => s.space !== 'becas'), ...becasSchedule]);
      setTasks((prev) => [...prev.filter((s) => s.space !== 'becas'), ...becasTasks]);
      setProfessors((prev) => [...prev.filter((s) => s.space !== 'becas'), ...becasProfessors]);
    } else {
      // Universidad sample subjects
      const uesInst = institutions.find((i) => i.type === 'universidad') || institutions[0];
      const uesPeriod = periods.find((p) => p.space === 'universidad') || periods[0];
      const uniSubjects: Subject[] = [
        {
          id: `sub-prg-${Date.now()}`,
          name: 'Programación I',
          code: 'PRG101',
          space: 'universidad',
          institutionId: uesInst.id,
          periodId: uesPeriod?.id || 'per-ues-1',
          credits: 4,
          classroom: 'Edificio B - Lab 3',
          color: '#2563eb',
          targetGrade: 7.5,
          absences: 0,
          maxAbsences: 4,
          grades: [],
        },
        {
          id: `sub-mat115-${Date.now() + 1}`,
          name: 'Álgebra Vectorial y Matrices',
          code: 'MAT115',
          space: 'universidad',
          institutionId: uesInst.id,
          periodId: uesPeriod?.id || 'per-ues-1',
          credits: 4,
          classroom: 'Edificio A - Aula 12',
          color: '#059669',
          targetGrade: 7.0,
          absences: 0,
          maxAbsences: 4,
          grades: [],
        },
      ];
      setSubjects((prev) => [...prev, ...uniSubjects]);
    }
  };

  // Reset all data completely
  const handleResetAllData = () => {
    localStorage.clear();
    setProfile(INITIAL_PROFILE);
    setInstitutions(INITIAL_INSTITUTIONS);
    setPeriods(INITIAL_PERIODS);
    setSubjects([]);
    setProfessors([]);
    setSchedule([]);
    setTasks([]);
    setExpenses([]);
    setStudyLogs([]);
  };

  // Calculate scholarship GPA for Oportunidades FGK
  const scholarshipInst = institutions.find((i) => i.isScholarship);
  const scholarshipSubjects = scholarshipInst
    ? subjects.filter((s) => s.institutionId === scholarshipInst.id || s.space === 'becas')
    : [];
  const scholarshipGpa =
    scholarshipSubjects.length > 0
      ? calculateSemesterGPA(scholarshipSubjects, scholarshipInst?.scholarshipDetails?.minGpaRequired || 8.0, 10).gpa
      : undefined;

  // University locked check
  const isUniversityLocked = profile.activeSpace === 'universidad' && !profile.universityUnlocked;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-slate-200">
      {/* Streamlined, Comfortable Unified Header */}
      <UnifiedHeader
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        profile={profile}
        onChangeSpace={handleChangeSpace}
        onChangeGobYear={handleChangeGobYear}
        onChangeSaturdayWeek={handleChangeSaturdayWeek}
        onOpenTour={() => setIsTourOpen(true)}
        onOpenQuickAdd={() => setIsQuickAddModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenInstitutionsModal={() => setIsInstitutionsModalOpen(true)}
        institutions={institutions}
        periods={periods}
        scholarshipGpa={scholarshipGpa}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-24">
        {/* If university space is locked, show UniversityLockedView */}
        {isUniversityLocked ? (
          <UniversityLockedView
            profile={profile}
            onUnlockUniversity={handleUnlockUniversity}
            onOpenSettings={() => setIsProfileModalOpen(true)}
          />
        ) : (
          <>
            {currentTab === 'dashboard' && (
              <DashboardView
                profile={profile}
                subjects={spaceSubjects}
                schedule={schedule}
                tasks={spaceTasks}
                professors={spaceProfessors}
                institutions={institutions}
                periods={periods}
                onNavigateTab={setCurrentTab}
                onToggleTaskStatus={handleToggleTaskStatus}
                onOpenQuickAdd={() => setIsQuickAddModalOpen(true)}
                onOpenInstitutionsModal={() => setIsInstitutionsModalOpen(true)}
                onChangeSaturdayWeek={handleChangeSaturdayWeek}
                onLoadTemplateSubjects={handleLoadTemplateSubjects}
                onOpenTour={() => setIsTourOpen(true)}
                onSelectSpace={handleChangeSpace}
              />
            )}

            {currentTab === 'subjects' && (
              <SubjectsView
                subjects={spaceSubjects}
                professors={spaceProfessors}
                institutions={institutions}
                periods={periods}
                profile={profile}
                onAddSubject={handleAddSubject}
                onUpdateSubject={handleUpdateSubject}
                onDeleteSubject={handleDeleteSubject}
                onAddGrade={handleAddGrade}
                onDeleteGrade={handleDeleteGrade}
                onUpdateGrade={handleUpdateGrade}
                onLoadTemplateSubjects={handleLoadTemplateSubjects}
              />
            )}

            {currentTab === 'schedule' && (
              <ScheduleView
                schedule={schedule}
                subjects={spaceSubjects}
                professors={spaceProfessors}
                institutions={institutions}
                profile={profile}
                onAddClass={handleAddClass}
                onDeleteClass={handleDeleteClass}
                onChangeSaturdayWeek={handleChangeSaturdayWeek}
              />
            )}

            {currentTab === 'tasks' && (
              <TasksView
                tasks={spaceTasks}
                subjects={spaceSubjects}
                onAddTask={handleAddTask}
                onToggleTaskStatus={handleToggleTaskStatus}
                onDeleteTask={handleDeleteTask}
              />
            )}

            {currentTab === 'professors' && (
              <ProfessorsView
                professors={spaceProfessors}
                subjects={spaceSubjects}
                onAddProfessor={handleAddProfessor}
                onDeleteProfessor={handleDeleteProfessor}
              />
            )}

            {currentTab === 'tools' && (
              <ToolsView
                subjects={spaceSubjects}
                profile={profile}
                expenses={expenses}
                studyLogs={studyLogs}
                onAddExpense={handleAddExpense}
                onDeleteExpense={handleDeleteExpense}
                onUpdateSubjectAbsence={handleUpdateSubjectAbsence}
                onLogStudySession={handleLogStudySession}
              />
            )}
          </>
        )}
      </main>

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={isQuickAddModalOpen}
        onClose={() => setIsQuickAddModalOpen(false)}
        onNavigateToTab={setCurrentTab}
      />

      {/* Institutions & Periods Management Modal */}
      <InstitutionsModal
        isOpen={isInstitutionsModalOpen}
        onClose={() => setIsInstitutionsModalOpen(false)}
        institutions={institutions}
        periods={periods}
        onAddInstitution={handleAddInstitution}
        onDeleteInstitution={handleDeleteInstitution}
        onAddPeriod={handleAddPeriod}
        onDeletePeriod={handleDeletePeriod}
      />

      {/* Profile & Scale Settings Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={setProfile}
        onResetAllData={handleResetAllData}
      />

      {/* Guided Assistant & Tour Modal */}
      <InteractiveTourModal
        isOpen={isTourOpen}
        onClose={handleCloseTour}
        onSelectSpace={handleChangeSpace}
      />

      {/* Floating Canvas Key Assistant Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsTourOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl border border-slate-700 hover:border-amber-400/60 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Abrir Asistente y Guía de Canvas Key"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
          </span>
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold tracking-tight">
            Asistente Canvas Key <span className="hidden sm:inline font-normal text-slate-300">· ¿Dudas de uso?</span>
          </span>
        </button>
      </div>
    </div>
  );
}
