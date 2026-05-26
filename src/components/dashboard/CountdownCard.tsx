import { Subject } from '../../types';
import { differenceInCalendarDays, parseISO } from 'date-fns';

interface CountdownCardProps {
  subject: Subject;
}

export default function CountdownCard({ subject }: CountdownCardProps) {
  const days = subject.examDate ? differenceInCalendarDays(parseISO(subject.examDate), new Date()) : null;
  const tone = days === null ? 'bg-deep text-accent' : days < 10 ? 'bg-warn text-amber-100' : days < 20 ? 'bg-orange-950 text-orange-200' : 'bg-deep text-accent';

  return (
    <div className={`rounded-xl border-2 border-accent p-4 ${tone}`}>
      <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.18em] text-muted">
        <span>{subject.code}</span>
        <span>Credits: {subject.credits}</span>
      </div>
      <div className="mt-3 text-lg font-semibold">{subject.name}</div>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-muted">Exam date</div>
          <div>{subject.examDate || 'Not set'}</div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-accent bg-accent/10 px-4 py-3 font-mono text-2xl font-bold text-accent">
          {days === null ? '--' : days >= 0 ? `${days}d` : 'Done'}
        </div>
      </div>
    </div>
  );
}
