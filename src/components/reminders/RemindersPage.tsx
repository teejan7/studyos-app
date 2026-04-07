import type { Dispatch, SetStateAction } from 'react';
import { Reminder } from '../../types';
import ReminderForm from './ReminderForm';
import ReminderTimeline from './ReminderTimeline';

interface RemindersPageProps {
  selectedSubject: string;
  reminders: Reminder[];
  setReminders: Dispatch<SetStateAction<Reminder[]>>;
}

export default function RemindersPage({ selectedSubject, reminders, setReminders }: RemindersPageProps) {
  const handleAdd = (reminder: Reminder) => setReminders([reminder, ...reminders]);
  const handleToggleDone = (id: string) => setReminders(reminders.map((reminder) => (reminder.id === id ? { ...reminder, done: !reminder.done } : reminder)));

  return (
    <div className="grid gap-4 lg:grid-cols-[0.5fr_0.5fr]">
      <ReminderForm selectedSubject={selectedSubject} onAdd={handleAdd} />
      <ReminderTimeline reminders={reminders} onToggleDone={handleToggleDone} />
    </div>
  );
}
