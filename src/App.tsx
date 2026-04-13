import { useEffect, useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BookOpen, ClipboardList, Sparkles, Bell, ChartBar, Cpu, Layers } from 'lucide-react';
import TopBar from './components/layout/TopBar';
import Sidebar from './components/layout/Sidebar';
import MainPanel from './components/layout/MainPanel';
import { EXAMS } from './data/exams';
import { DEFAULT_TOPICS } from './data/topics';
import { Note, Question, FlashCard, Reminder, FileRecord, Resource, TopicProgress } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotifications } from './hooks/useNotifications';
import { ThemeProvider } from './contexts/ThemeContext';
import { mergeTopics, sanitizeTopicProgress } from './utils/topics';
import { hydrateResources } from './utils/resources';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Cpu },
  { id: 'vault', label: 'Notes Vault', icon: BookOpen },
  { id: 'resources', label: 'Resources', icon: Layers },
  { id: 'questions', label: 'Question Bank', icon: ClipboardList }
];

const SUBJECTS = EXAMS.map((exam) => ({ code: exam.code, name: exam.name, credit: exam.credit }));

const initialData = {
  notes: [] as Note[],
  questions: [] as Question[],
  flashcards: [] as FlashCard[],
  reminders: [] as Reminder[],
  progress: [] as TopicProgress[],
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
  const [topics, setTopics] = useLocalStorage('studyos_topics', DEFAULT_TOPICS);
  const [progress, setProgress] = useLocalStorage<TopicProgress[]>('studyos_progress', initialData.progress);
  const [files, setFiles] = useLocalStorage<FileRecord[]>('studyos_files', initialData.files);
  const [resources, setResources] = useLocalStorage<Resource[]>('studyos_resources', initialData.resources, {
    hydrate: hydrateResources
  });

  useNotifications(reminders);

  const subjects = useMemo(() => SUBJECTS, []);
  const mergedTopics = useMemo(() => mergeTopics(DEFAULT_TOPICS, topics), [topics]);

  useEffect(() => {
    setTopics((currentTopics) => {
      const nextTopics = mergeTopics(DEFAULT_TOPICS, currentTopics);
      return JSON.stringify(nextTopics) === JSON.stringify(currentTopics) ? currentTopics : nextTopics;
    });
  }, [setTopics]);

  useEffect(() => {
    setProgress((currentProgress) => {
      const nextProgress = sanitizeTopicProgress(currentProgress);
      return nextProgress.length === currentProgress.length ? currentProgress : nextProgress;
    });
  }, [setProgress]);

  useEffect(() => {
    setResources((currentResources) => {
      const nextResources = hydrateResources(currentResources, initialData.resources);
      return JSON.stringify(nextResources) === JSON.stringify(currentResources) ? currentResources : nextResources;
    });
  }, [setResources]);

  const handleSelectSubject = (subjectCode: string) => {
    setSelectedSubject(subjectCode);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg text-text">
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
              topics={mergedTopics}
              setTopics={setTopics}
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
    </ThemeProvider>
  );
}

export default App;
