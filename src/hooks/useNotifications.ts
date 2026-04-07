import { useEffect } from 'react';
import { Reminder } from '../types';

export function useNotifications(reminders: Reminder[]) {
  useEffect(() => {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const dueToday = reminders.filter((reminder) => {
      const now = new Date();
      const due = new Date(reminder.datetime);
      return (
        !reminder.done &&
        due.getFullYear() === now.getFullYear() &&
        due.getMonth() === now.getMonth() &&
        due.getDate() === now.getDate()
      );
    });

    if (Notification.permission === 'granted') {
      dueToday.forEach((reminder) => {
        new Notification('StudyOS Reminder', {
          body: `${reminder.title} due today`,
          tag: reminder.id
        });
      });
    }
  }, [reminders]);
}
