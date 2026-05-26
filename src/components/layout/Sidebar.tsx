import type { ComponentType } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Bell, BookOpen, ChartBar, ClipboardList, Cpu, Sparkles, Layers } from 'lucide-react';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { useState } from 'react';
import type { FileRecord, FlashCard, Note, Question, Reminder, Resource, SemesterConfig, Subject, SubjectTopics, TopicProgress } from '../../types';

interface SidebarProps {
  tabs: { id: string; label: string; icon: ComponentType<{ className?: string }> }[];
  activeTab: string;
  onSelectTab: (tab: string) => void;
  subjects: Subject[];
  setSubjects: Dispatch<SetStateAction<Subject[]>>;
  selectedSubject: string;
  onSelectSubject: (subject: string) => void;
  config: SemesterConfig;
  setConfig: Dispatch<SetStateAction<SemesterConfig>>;
  topics: SubjectTopics[];
  setTopics: Dispatch<SetStateAction<SubjectTopics[]>>;
  setProgress: Dispatch<SetStateAction<TopicProgress[]>>;
  setResources: Dispatch<SetStateAction<Resource[]>>;
  setNotes: Dispatch<SetStateAction<Note[]>>;
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  setFiles: Dispatch<SetStateAction<FileRecord[]>>;
  setFlashcards: Dispatch<SetStateAction<FlashCard[]>>;
  setReminders: Dispatch<SetStateAction<Reminder[]>>;
  showSemesterBadge: boolean;
  setShowSemesterBadge: Dispatch<SetStateAction<boolean>>;
}

const iconMap = {
  dashboard: Cpu,
  vault: BookOpen,
  resources: Layers,
  questions: ClipboardList,
  flashcards: Sparkles,
  reminders: Bell,
  progress: ChartBar
};

export default function Sidebar({
  tabs,
  activeTab,
  onSelectTab,
  subjects,
  setSubjects,
  selectedSubject,
  onSelectSubject,
  config,
  setConfig,
  topics,
  setTopics,
  setProgress,
  setResources,
  setNotes,
  setQuestions,
  setFiles,
  setFlashcards,
  setReminders,
  showSemesterBadge,
  setShowSemesterBadge
}: SidebarProps) {
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [draftSubject, setDraftSubject] = useState<Subject>({ code: '', name: '', credits: 3, examDate: '' });
  const [editingConfig, setEditingConfig] = useState(false);
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [draftConfig, setDraftConfig] = useState(config);

  const startAddSubject = () => {
    setEditingCode('__new__');
    setDraftSubject({ code: '', name: '', credits: 3, examDate: '' });
  };

  const startEditSubject = (subject: Subject) => {
    setEditingCode(subject.code);
    setDraftSubject({ ...subject, examDate: subject.examDate ?? '' });
  };

  const cancelEdit = () => {
    setEditingCode(null);
    setDraftSubject({ code: '', name: '', credits: 3, examDate: '' });
  };

  const saveSubject = () => {
    const nextSubject: Subject = {
      code: draftSubject.code.trim().toUpperCase(),
      name: draftSubject.name.trim(),
      credits: Number(draftSubject.credits) || 0,
      examDate: draftSubject.examDate || undefined
    };
    if (!nextSubject.code || !nextSubject.name) return;

    if (editingCode === '__new__') {
      setSubjects((current) => (current.some((subject) => subject.code === nextSubject.code) ? current : [...current, nextSubject]));
      setTopics((current) => [...current, { subjectCode: nextSubject.code, modules: {} }]);
      onSelectSubject(nextSubject.code);
    } else if (editingCode) {
      setSubjects((current) => current.map((subject) => (subject.code === editingCode ? nextSubject : subject)));
      setTopics((current) => current.map((subject) => (subject.subjectCode === editingCode ? { ...subject, subjectCode: nextSubject.code } : subject)));
      setProgress((current) => current.map((item) => (item.subjectCode === editingCode ? { ...item, subjectCode: nextSubject.code } : item)));
      setResources((current) => current.map((item) => (item.subjectCode === editingCode ? { ...item, subjectCode: nextSubject.code } : item)));
      setNotes((current) => current.map((item) => (item.subjectCode === editingCode ? { ...item, subjectCode: nextSubject.code } : item)));
      setQuestions((current) => current.map((item) => (item.subjectCode === editingCode ? { ...item, subjectCode: nextSubject.code } : item)));
      setFiles((current) => current.map((item) => (item.subjectCode === editingCode ? { ...item, subjectCode: nextSubject.code } : item)));
      setFlashcards((current) => current.map((item) => (item.subjectCode === editingCode ? { ...item, subjectCode: nextSubject.code } : item)));
      setReminders((current) => current.map((item) => (item.subjectCode === editingCode ? { ...item, subjectCode: nextSubject.code } : item)));
      onSelectSubject(nextSubject.code);
    }
    cancelEdit();
  };

  const deleteSubject = (subjectCode: string) => {
    setSubjects((current) => current.filter((subject) => subject.code !== subjectCode));
    setTopics((current) => current.filter((subject) => subject.subjectCode !== subjectCode));
    setProgress((current) => current.filter((item) => item.subjectCode !== subjectCode));
    setResources((current) => current.filter((item) => item.subjectCode !== subjectCode));
    setNotes((current) => current.filter((item) => item.subjectCode !== subjectCode));
    setQuestions((current) => current.filter((item) => item.subjectCode !== subjectCode));
    setFiles((current) => current.filter((item) => item.subjectCode !== subjectCode));
    setFlashcards((current) => current.filter((item) => item.subjectCode !== subjectCode));
    setReminders((current) => current.filter((item) => item.subjectCode !== subjectCode));
  };

  const saveConfig = () => {
    setConfig({
      semesterName: draftConfig.semesterName.trim(),
      branch: draftConfig.branch.trim(),
      scheme: draftConfig.scheme.trim()
    });
    setEditingConfig(false);
  };

  return (
    <aside className="flex min-h-[calc(100vh-120px)] flex-col gap-4 rounded-xl border border-border bg-deep p-4">
      <div className="space-y-3">
        <div className="text-sm uppercase tracking-[0.24em] text-muted">Navigation</div>
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = iconMap[tab.id as keyof typeof iconMap] as ComponentType<{ className?: string }>;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-lg border border-border px-3 py-2 text-left text-sm transition ${
                  activeTab === tab.id ? 'bg-surface text-accent' : 'bg-deep text-text hover:bg-surface'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm uppercase tracking-[0.24em] text-muted">Subjects</div>
          <button type="button" onClick={startAddSubject} className="rounded-lg border border-border bg-bg p-1.5 text-muted hover:text-accent" title="Add subject">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {subjects.map((subject) => (
            <div key={subject.code} className={`rounded-lg border border-border ${selectedSubject === subject.code ? 'bg-surface text-accent' : 'bg-bg text-text'}`}>
              <button onClick={() => onSelectSubject(subject.code)} className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-surface">
                <span>{subject.code}</span>
                <span className="rounded-full border border-border px-2 font-mono text-[10px] uppercase text-muted">{subject.credits} CR</span>
              </button>
              <div className="flex items-center justify-end gap-1 border-t border-border px-2 py-1">
                <button type="button" onClick={() => startEditSubject(subject)} className="rounded p-1 text-muted hover:text-accent" title="Edit subject">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => deleteSubject(subject.code)} className="rounded p-1 text-muted hover:text-danger" title="Delete subject">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          {editingCode && (
            <div className="space-y-2 rounded-lg border border-border bg-bg p-3">
              <input value={draftSubject.code} onChange={(event) => setDraftSubject((current) => ({ ...current, code: event.target.value }))} className="w-full rounded-lg border border-border bg-surface px-2 py-1.5 text-xs text-text" placeholder="Code" />
              <input value={draftSubject.name} onChange={(event) => setDraftSubject((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-lg border border-border bg-surface px-2 py-1.5 text-xs text-text" placeholder="Name" />
              <div className="grid grid-cols-2 gap-2">
                <label className="flex flex-col gap-1 text-[10px] uppercase tracking-[0.14em] text-muted">
                  Credits
                  <input type="number" min={0} value={draftSubject.credits} onChange={(event) => setDraftSubject((current) => ({ ...current, credits: Number(event.target.value) }))} className="w-full rounded-lg border border-border bg-surface px-2 py-1.5 text-xs normal-case tracking-normal text-text" placeholder="Credits" />
                </label>
                <label className="flex flex-col gap-1 text-[10px] uppercase tracking-[0.14em] text-muted">
                  Exam date
                  <input type="date" value={draftSubject.examDate ?? ''} onChange={(event) => setDraftSubject((current) => ({ ...current, examDate: event.target.value }))} className="w-full rounded-lg border border-border bg-surface px-2 py-1.5 text-xs normal-case tracking-normal text-text" />
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={saveSubject} className="rounded-lg border border-accent bg-accent/10 p-1.5 text-accent" title="Save subject">
                  <Save className="h-4 w-4" />
                </button>
                <button type="button" onClick={cancelEdit} className="rounded-lg border border-border bg-surface p-1.5 text-muted" title="Cancel">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showConfigPanel ? (
        <div className="rounded-lg border border-border bg-surface p-3 text-xs text-muted">
          <div className="flex items-center justify-between gap-2">
            <div className="font-semibold text-text">Semester Setup</div>
            <div className="flex gap-1">
              <button type="button" onClick={() => { setDraftConfig(config); setEditingConfig((current) => !current); }} className="rounded p-1 text-muted hover:text-accent" title="Edit setup">
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={() => { setShowConfigPanel(false); setEditingConfig(false); }} className="rounded p-1 text-muted hover:text-danger" title="Hide setup">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          {editingConfig ? (
            <div className="mt-2 space-y-2">
              <input value={draftConfig.branch} onChange={(event) => setDraftConfig((current) => ({ ...current, branch: event.target.value }))} className="w-full rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-text" placeholder="Branch" />
              <input value={draftConfig.semesterName} onChange={(event) => setDraftConfig((current) => ({ ...current, semesterName: event.target.value }))} className="w-full rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-text" placeholder="Semester" />
              <input value={draftConfig.scheme} onChange={(event) => setDraftConfig((current) => ({ ...current, scheme: event.target.value }))} className="w-full rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-text" placeholder="Scheme" />
              <button type="button" onClick={saveConfig} className="rounded-lg border border-accent bg-accent/10 px-2 py-1 text-accent">Save</button>
            </div>
          ) : (
            <p className="mt-2 leading-5">{[config.semesterName, config.branch, config.scheme].filter(Boolean).join(' / ')}</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => { setDraftConfig(config); setShowConfigPanel(true); }}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-left text-xs text-muted hover:text-accent"
          >
            Edit semester setup
          </button>
          {!showSemesterBadge && (
            <button
              type="button"
              onClick={() => setShowSemesterBadge(true)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-left text-xs text-muted hover:text-accent"
            >
              Show top semester label
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
