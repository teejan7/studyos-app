import { useState } from 'react';
import { Reminder } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface ReminderFormProps {
  selectedSubject: string;
  onAdd: (reminder: Reminder) => void;
}

export default function ReminderForm({ selectedSubject, onAdd }: ReminderFormProps) {
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleSubmit = () => {
    if (!title.trim() || !datetime) return;
    onAdd({
      id: uuidv4(),
      title: title.trim(),
      subjectCode: selectedSubject,
      datetime,
      priority,
      done: false
    });
    setTitle('');
    setDatetime('');
    setPriority('medium');
  };

  return (
    <div className="rounded-xl border border-border bg-deep p-4">
      <div className="text-sm uppercase tracking-[0.18em] text-muted">New reminder</div>
      <div className="mt-4 space-y-3">
        <input className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
        <input type="datetime-local" className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100" value={datetime} onChange={(event) => setDatetime(event.target.value)} />
        <select value={priority} onChange={(event) => setPriority(event.target.value as any)} className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleSubmit} className="rounded-lg border border-border bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-green-300">Add reminder</button>
      </div>
    </div>
  );
}
