import { useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BookOpen, ClipboardList, Sparkles, Bell, ChartBar, Cpu, Layers } from 'lucide-react';
import TopBar from './components/layout/TopBar';
import Sidebar from './components/layout/Sidebar';
import MainPanel from './components/layout/MainPanel';
import { EXAMS } from './data/exams';
import { Note, Question, FlashCard, Reminder, SubjectProgress, FileRecord, Resource } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotifications } from './hooks/useNotifications';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Cpu },
  { id: 'vault', label: 'Notes Vault', icon: BookOpen },
  { id: 'resources', label: 'Resources', icon: Layers },
  { id: 'questions', label: 'Question Bank', icon: ClipboardList }
];

const SUBJECTS = EXAMS.map((exam) => ({ code: exam.code, name: exam.name }));

const emptyProgress: SubjectProgress[] = SUBJECTS.map((subject) => ({
  subjectCode: subject.code,
  percentage: 0,
  modulesCompleted: [false, false, false, false, false]
}));

const initialData = {
  notes: [] as Note[],
  questions: [] as Question[],
  flashcards: [] as FlashCard[],
  reminders: [] as Reminder[],
  progress: emptyProgress,
  files: [] as FileRecord[],
  resources: [] as Resource[]
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0].code);

  const [notes, setNotes] = useLocalStorage<Note[]>('studyos_notes', initialData.notes);
  const [questions, setQuestions] = useLocalStorage<Question[]>('studyos_questions', initialData.questions);
  const [flashcards, setFlashcards] = useLocalStorage<FlashCard[]>('studyos_flashcards', initialData.flashcards);
  const [reminders, setReminders] = useLocalStorage<Reminder[]>('studyos_reminders', initialData.reminders);
  const [progress, setProgress] = useLocalStorage<SubjectProgress[]>('studyos_progress', initialData.progress);
  const [files, setFiles] = useLocalStorage<FileRecord[]>('studyos_files', initialData.files);
  const [resources, setResources] = useLocalStorage<Resource[]>('studyos_resources', initialData.resources);

  useNotifications(reminders);

  const subjects = useMemo(() => SUBJECTS, []);

  const handleSelectSubject = (subjectCode: string) => {
    setSelectedSubject(subjectCode);
    setActiveTab('resources');
  };

  return (
    <div className="min-h-screen bg-bg text-green-100">
      <div className="mx-auto max-w-screen-2xl px-4 py-4">
        <TopBar semester="S6 CSE 2019 Scheme" />
        <div className="mt-4 grid min-h-[calc(100vh-120px)] grid-cols-1 gap-4 lg:grid-cols-[200px_1fr]">
          <Sidebar
            tabs={tabs}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            subjects={subjects}
            selectedSubject={selectedSubject}
            onSelectSubject={handleSelectSubject}
          />
          <MainPanel
            activeTab={activeTab}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            exams={EXAMS}
            notes={notes}
            setNotes={setNotes}
            questions={questions}
            setQuestions={setQuestions}
            flashcards={flashcards}
            setFlashcards={setFlashcards}
            reminders={reminders}
            setReminders={setReminders}
            progress={progress}
            setProgress={setProgress}
            files={files}
            setFiles={setFiles}
            resources={resources}
            setResources={setResources}
            subjects={subjects}
          />
        </div>
      </div>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
}

export default App;
