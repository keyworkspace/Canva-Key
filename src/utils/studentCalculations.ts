import { Subject, ScheduleClass, DayOfWeek, GradeScale } from '../types/student';

export interface SubjectGradeSummary {
  evaluatedWeight: number; // e.g. 45 (%)
  pendingWeight: number;   // e.g. 55 (%)
  currentGrade: number;    // weighted average of evaluated items so far
  accumulatedScore: number;// points earned towards total (e.g. 3.9 out of 10)
  neededOnRemainingToPass: number | null; // grade needed on remaining weight to reach passingGrade
  neededOnRemainingForTarget: number | null;
  status: 'aprobando' | 'en_riesgo' | 'critico' | 'completada';
}

export function calculateSubjectGrade(
  subject: Subject,
  passingGrade: number,
  scaleMax: number = 10
): SubjectGradeSummary {
  let evaluatedWeight = 0;
  let accumulatedScore = 0;

  for (const grade of subject.grades) {
    if (grade.score !== null && !isNaN(grade.score)) {
      evaluatedWeight += grade.weight;
      accumulatedScore += (grade.score * grade.weight) / 100;
    }
  }

  const pendingWeight = Math.max(0, 100 - evaluatedWeight);
  const currentGrade = evaluatedWeight > 0 ? (accumulatedScore / evaluatedWeight) * 100 : 0;

  // Needed on remaining:
  // (accumulatedScore + needed * pendingWeight / 100) >= passingGrade
  // needed * (pendingWeight / 100) >= passingGrade - accumulatedScore
  // needed = ((passingGrade - accumulatedScore) * 100) / pendingWeight
  let neededOnRemainingToPass: number | null = null;
  if (pendingWeight > 0) {
    const rawNeeded = ((passingGrade - accumulatedScore) * 100) / pendingWeight;
    neededOnRemainingToPass = Math.max(0, Math.min(scaleMax, parseFloat(rawNeeded.toFixed(2))));
  }

  let neededOnRemainingForTarget: number | null = null;
  if (pendingWeight > 0 && subject.targetGrade) {
    const rawTargetNeeded = ((subject.targetGrade - accumulatedScore) * 100) / pendingWeight;
    neededOnRemainingForTarget = Math.max(0, parseFloat(rawTargetNeeded.toFixed(2)));
  }

  let status: SubjectGradeSummary['status'] = 'aprobando';
  if (evaluatedWeight === 100) {
    status = accumulatedScore >= passingGrade ? 'completada' : 'critico';
  } else if (neededOnRemainingToPass !== null && neededOnRemainingToPass > scaleMax) {
    status = 'critico'; // Matemáticamente imposible pasar con nota máxima
  } else if (neededOnRemainingToPass !== null && neededOnRemainingToPass > passingGrade * 1.1) {
    status = 'en_riesgo';
  }

  return {
    evaluatedWeight,
    pendingWeight,
    currentGrade: parseFloat(currentGrade.toFixed(2)),
    accumulatedScore: parseFloat(accumulatedScore.toFixed(2)),
    neededOnRemainingToPass,
    neededOnRemainingForTarget,
    status,
  };
}

export function calculateSemesterGPA(
  subjects: Subject[],
  passingGrade: number,
  scaleMax: number = 10
): { gpa: number; totalCredits: number; passingCount: number; failingCount: number } {
  let totalWeightedScore = 0;
  let totalCredits = 0;
  let passingCount = 0;
  let failingCount = 0;

  for (const sub of subjects) {
    const summary = calculateSubjectGrade(sub, passingGrade, scaleMax);
    totalCredits += sub.credits;
    totalWeightedScore += summary.currentGrade * sub.credits;
    if (summary.currentGrade >= passingGrade) {
      passingCount++;
    } else {
      failingCount++;
    }
  }

  const gpa = totalCredits > 0 ? totalWeightedScore / totalCredits : 0;
  return {
    gpa: parseFloat(gpa.toFixed(2)),
    totalCredits,
    passingCount,
    failingCount,
  };
}

export function getNextUpcomingClass(
  schedule: ScheduleClass[],
  subjects: Subject[]
): { nextClass: ScheduleClass | null; subject: Subject | null; day: DayOfWeek } {
  const days: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const now = new Date();
  const dayIndex = now.getDay(); // 0 is Sunday, 1 is Monday...
  const currentDayName: DayOfWeek = dayIndex === 0 || dayIndex > 6 ? 'Lunes' : days[dayIndex - 1];
  
  // Format current time HH:MM
  const currentHours = String(now.getHours()).padStart(2, '0');
  const currentMinutes = String(now.getMinutes()).padStart(2, '0');
  const currentTimeStr = `${currentHours}:${currentMinutes}`;

  // Check today classes that haven't finished
  const todayClasses = schedule
    .filter((s) => s.day === currentDayName)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const upcomingToday = todayClasses.find((s) => s.endTime > currentTimeStr);

  if (upcomingToday) {
    const subject = subjects.find((sub) => sub.id === upcomingToday.subjectId) || null;
    return { nextClass: upcomingToday, subject, day: currentDayName };
  }

  // Otherwise, find the first class of the next available day
  const currentIdx = days.indexOf(currentDayName);
  for (let i = 1; i <= 6; i++) {
    const nextDayIdx = (currentIdx + i) % days.length;
    const nextDayName = days[nextDayIdx];
    const nextDayClasses = schedule
      .filter((s) => s.day === nextDayName)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    if (nextDayClasses.length > 0) {
      const firstClass = nextDayClasses[0];
      const subject = subjects.find((sub) => sub.id === firstClass.subjectId) || null;
      return { nextClass: firstClass, subject, day: nextDayName };
    }
  }

  if (schedule.length > 0) {
    const fallback = schedule[0];
    const subject = subjects.find((sub) => sub.id === fallback.subjectId) || null;
    return { nextClass: fallback, subject, day: fallback.day };
  }

  return { nextClass: null, subject: null, day: 'Lunes' };
}
