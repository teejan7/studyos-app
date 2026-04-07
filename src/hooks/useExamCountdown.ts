import { useMemo } from 'react';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import type { Exam } from '../types';

export function useExamCountdown(exams: Exam[]) {
  return useMemo(
    () =>
      exams
        .map((exam) => ({ exam, days: differenceInCalendarDays(parseISO(exam.date), new Date()) }))
        .sort((a, b) => a.days - b.days),
    [exams]
  );
}
