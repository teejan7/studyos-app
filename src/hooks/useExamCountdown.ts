import { useMemo } from 'react';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import type { Subject } from '../types';

export function useExamCountdown(subjects: Subject[]) {
  return useMemo(
    () =>
      subjects
        .filter((subject) => subject.examDate)
        .map((subject) => ({ subject, days: differenceInCalendarDays(parseISO(subject.examDate as string), new Date()) }))
        .sort((a, b) => a.days - b.days),
    [subjects]
  );
}
