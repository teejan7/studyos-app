import { Reminder } from '../../types';

interface ReminderTimelineProps {
  reminders: Reminder[];
  onToggleDone: (id: string) => void;
}

export default function ReminderTimeline({ reminders, onToggleDone }: ReminderTimelineProps) {
  const sorted = [...reminders].sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

  return (
    <div className="rounded-xl border border-border bg-deep p-4">
      <div className="text-sm uppercase tracking-[0.18em] text-muted">Reminder timeline</div>
      <div className="mt-4 space-y-3">
        {sorted.length ? (
          sorted.map((reminder) => {
            const dueToday = new Date(reminder.datetime).toDateString() === new Date().toDateString();
            return (
              <div key={reminder.id} className={`rounded-xl border border-border p-3 ${dueToday ? 'bg-warn/10' : 'bg-bg'}`}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <div>
                    <div className={`font-semibold ${reminder.done ? 'line-through text-muted' : 'text-text'}`}>{reminder.title}</div>
                    <div className="text-xs text-muted">{new Date(reminder.datetime).toLocaleString()}</div>
                  </div>
                  <button onClick={() => onToggleDone(reminder.id)} className="rounded-lg border border-border bg-surface px-3 py-1 text-xs text-text hover:bg-surface/80">
                    {reminder.done ? 'Undo' : 'Done'}
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted">
                  <span>{reminder.subjectCode}</span>
                  <span>{reminder.priority}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-muted">No reminders yet. Add one to stay on schedule.</p>
        )}
      </div>
    </div>
  );
}
