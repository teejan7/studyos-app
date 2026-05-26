import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BookOpen, ClipboardList, Sparkles, Bell, ChartBar, Cpu, Layers } from 'lucide-react';
import TopBar from './components/layout/TopBar';
import Sidebar from './components/layout/Sidebar';
import MainPanel from './components/layout/MainPanel';
import Onboarding from './components/onboarding/Onboarding';
import { Note, Question, FlashCard, Reminder, FileRecord, Resource, TopicProgress, Subject, SubjectTopics, SemesterConfig } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotifications } from './hooks/useNotifications';
import { ThemeProvider } from './contexts/ThemeContext';
import { sanitizeTopicProgress } from './utils/topics';
import { hydrateResources } from './utils/resources';
import { STORAGE_KEYS } from './storage/keys';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Cpu },
  { id: 'vault', label: 'Notes Vault', icon: BookOpen },
  { id: 'resources', label: 'Resources', icon: Layers },
  { id: 'questions', label: 'Question Bank', icon: ClipboardList },
  { id: 'flashcards', label: 'Flashcards', icon: Sparkles },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'progress', label: 'Progress', icon: ChartBar }
];

const initialData = {
  config: { semesterName: '', branch: '', scheme: '' } as SemesterConfig,
  subjects: [] as Subject[],
  notes: [] as Note[],
  questions: [] as Question[],
  flashcards: [] as FlashCard[],
  reminders: [] as Reminder[],
  topics: [] as SubjectTopics[],
  progress: [] as TopicProgress[],
  files: [] as FileRecord[],
  resources: [] as Resource[]
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [config, setConfig] = useLocalStorage<SemesterConfig>(STORAGE_KEYS.config, initialData.config);
  const [subjects, setSubjects] = useLocalStorage<Subject[]>(STORAGE_KEYS.subjects, initialData.subjects);
  const [selectedSubject, setSelectedSubject] = useState('');

  const [notes, setNotes] = useLocalStorage<Note[]>(STORAGE_KEYS.notes, initialData.notes);
  const [questions, setQuestions] = useLocalStorage<Question[]>(STORAGE_KEYS.questions, initialData.questions);
  const [flashcards, setFlashcards] = useLocalStorage<FlashCard[]>(STORAGE_KEYS.flashcards, initialData.flashcards);
  const [reminders, setReminders] = useLocalStorage<Reminder[]>(STORAGE_KEYS.reminders, initialData.reminders);
  const [topics, setTopics] = useLocalStorage<SubjectTopics[]>(STORAGE_KEYS.topics, initialData.topics);
  const [progress, setProgress] = useLocalStorage<TopicProgress[]>(STORAGE_KEYS.progress, initialData.progress);
  const [files, setFiles] = useLocalStorage<FileRecord[]>(STORAGE_KEYS.files, initialData.files);
  const [resources, setResources] = useLocalStorage<Resource[]>(STORAGE_KEYS.resources, initialData.resources, {
    hydrate: hydrateResources
  });
  const [showSemesterBadge, setShowSemesterBadge] = useLocalStorage<boolean>(STORAGE_KEYS.showSemesterBadge, true);
  const semesterLabel = [config.semesterName, config.branch, config.scheme].filter(Boolean).join(' - ');

  useNotifications(reminders);

  useEffect(() => {
    if (!selectedSubject && subjects.length) {
      setSelectedSubject(subjects[0].code);
    }
    if (selectedSubject && !subjects.some((subject) => subject.code === selectedSubject)) {
      setSelectedSubject(subjects[0]?.code ?? '');
    }
  }, [selectedSubject, subjects]);

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

  const handleCreateSetup = (nextConfig: SemesterConfig, nextSubjects: Subject[]) => {
    setConfig(nextConfig);
    setSubjects(nextSubjects);
    setTopics(nextSubjects.map((subject) => ({ subjectCode: subject.code, modules: {} })));
    setSelectedSubject(nextSubjects[0]?.code ?? '');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg text-text">
        <div className="mx-auto max-w-screen-2xl px-4 py-4">
          <TopBar semester={showSemesterBadge ? semesterLabel : ''} onHideSemester={() => setShowSemesterBadge(false)} />
          {subjects.length ? (
            <div className="mt-4 grid min-h-[calc(100vh-120px)] grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
              <Sidebar
                tabs={tabs}
                activeTab={activeTab}
                onSelectTab={setActiveTab}
                subjects={subjects}
                setSubjects={setSubjects}
                selectedSubject={selectedSubject}
                onSelectSubject={handleSelectSubject}
                config={config}
                setConfig={setConfig}
                topics={topics}
                setTopics={setTopics}
                setProgress={setProgress}
                setResources={setResources}
                setNotes={setNotes}
                setQuestions={setQuestions}
                setFiles={setFiles}
                setFlashcards={setFlashcards}
                setReminders={setReminders}
                showSemesterBadge={showSemesterBadge}
                setShowSemesterBadge={setShowSemesterBadge}
              />
              <MainPanel
                activeTab={activeTab}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                notes={notes}
                setNotes={setNotes}
                questions={questions}
                setQuestions={setQuestions}
                flashcards={flashcards}
                setFlashcards={setFlashcards}
                reminders={reminders}
                setReminders={setReminders}
                topics={topics}
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
          ) : (
            <Onboarding onCreateSetup={handleCreateSetup} />
          )}
        </div>
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      </div>
    </ThemeProvider>
  );
}

export default App;
