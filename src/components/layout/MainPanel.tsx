import type { Dispatch, SetStateAction } from 'react';
import { Exam, FileRecord, FlashCard, Note, Question, Reminder, Resource, SubjectProgress } from '../../types';
import Dashboard from '../dashboard/Dashboard';
import VaultPage from '../vault/VaultPage';
import ResourceHub from '../resources/ResourceHub';
import QuestionsPage from '../questions/QuestionsPage';
import FlashcardsPage from '../flashcards/FlashcardsPage';
import RemindersPage from '../reminders/RemindersPage';
import ProgressPage from '../progress/ProgressPage';

interface MainPanelProps {
  activeTab: string;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  exams: Exam[];
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  flashcards: FlashCard[];
  setFlashcards: Dispatch<SetStateAction<FlashCard[]>>;
  reminders: Reminder[];
  setReminders: Dispatch<SetStateAction<Reminder[]>>;
  progress: SubjectProgress[];
  setProgress: Dispatch<SetStateAction<SubjectProgress[]>>;
  files: FileRecord[];
  setFiles: Dispatch<SetStateAction<FileRecord[]>>;
  resources: Resource[];
  setResources: Dispatch<SetStateAction<Resource[]>>;
  subjects: { code: string; name: string }[];
}

export default function MainPanel(props: MainPanelProps) {
  const { activeTab } = props;

  return (
    <main className="rounded-xl border border-border bg-surface p-4 text-text shadow-sm">
      {activeTab === 'dashboard' && <Dashboard {...props} />}
      {activeTab === 'vault' && <VaultPage {...props} />}
      {activeTab === 'resources' && <ResourceHub {...props} />}
      {activeTab === 'questions' && <QuestionsPage {...props} />}
      {activeTab === 'flashcards' && <FlashcardsPage {...props} />}
      {activeTab === 'reminders' && <RemindersPage {...props} />}
      {activeTab === 'progress' && <ProgressPage {...props} />}
    </main>
  );
}
