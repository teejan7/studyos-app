import { Exam } from '../../types';
import { differenceInCalendarDays, parseISO } from 'date-fns';

interface CountdownCardProps {
  exam: Exam;
}

export default function CountdownCard({ exam }: CountdownCardProps) {
  const days = differenceInCalendarDays(parseISO(exam.date), new Date());
  const tone = days < 10 ? 'bg-warn text-amber-100' : days < 20 ? 'bg-orange-950 text-orange-200' : 'bg-deep text-accent';

  return (
    <div className={`rounded-xl border border-border p-4 ${tone}`}>
      <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.18em] text-muted">
        <span>{exam.code}</span>
        <span>Slot {exam.slot}</span>
      </div>
      <div className="mt-3 text-lg font-semibold">{exam.name}</div>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-muted">Exam date</div>
          <div>{exam.date}</div>
        </div>
        <div className="rounded-lg border border-border bg-bg px-3 py-2 font-mono text-xl">{days >= 0 ? `${days}d` : 'Done'}</div>
      </div>
    </div>
  );
}
