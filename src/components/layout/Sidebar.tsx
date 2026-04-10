import type { ComponentType } from 'react';
import { Bell, BookOpen, ChartBar, ClipboardList, Cpu, Sparkles, Layers } from 'lucide-react';

interface SidebarProps {
  tabs: { id: string; label: string; icon: ComponentType<{ className?: string }> }[];
  activeTab: string;
  onSelectTab: (tab: string) => void;
  subjects: { code: string; name: string; credit?: number }[];
  selectedSubject: string;
  onSelectSubject: (subject: string) => void;
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

export default function Sidebar({ tabs, activeTab, onSelectTab, subjects, selectedSubject, onSelectSubject }: SidebarProps) {
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
        <div className="text-sm uppercase tracking-[0.24em] text-muted">Subjects</div>
        <div className="mt-3 space-y-2">
          {subjects.map((subject) => (
            <button
              key={subject.code}
              onClick={() => onSelectSubject(subject.code)}
              className={`flex w-full items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-left text-sm ${
                selectedSubject === subject.code ? 'bg-surface text-accent' : 'bg-bg text-text hover:bg-surface'
              }`}
            >
              <span>{subject.code}</span>
              {typeof subject.credit === 'number' && (
                <span className="rounded-full border border-border px-2 font-mono text-[10px] uppercase text-muted">{subject.credit} CR</span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-border bg-surface p-3 text-xs text-muted">
        <div className="font-semibold text-text">Session Notes</div>
        <p className="mt-2 leading-5">Track exam prep, notes, reminders and flashcard progress in one retro terminal UI.</p>
      </div>
    </aside>
  );
}
