import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Trash2 } from 'lucide-react';
import { Plus, Pencil, Save, X } from 'lucide-react';
import type { SubjectTopics, TopicProgress } from '../../types';
import { getCompletedTopicSet, getSubjectTopicStats, topicKey } from '../../utils/topics';

interface ImportantTopicsProps {
  selectedSubject: string;
  topics: SubjectTopics[];
  setTopics: Dispatch<SetStateAction<SubjectTopics[]>>;
  progress: TopicProgress[];
  setProgress: Dispatch<SetStateAction<TopicProgress[]>>;
}

export default function ImportantTopics({ selectedSubject, topics, setTopics, progress, setProgress }: ImportantTopicsProps) {
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const [newTopics, setNewTopics] = useState<Record<string, string>>({});
  const [newModuleName, setNewModuleName] = useState('');
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [moduleDraftName, setModuleDraftName] = useState('');
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);

  const subjectTopics = topics.find((item) => item.subjectCode === selectedSubject);
  const modules = subjectTopics?.modules ?? {};
  const moduleEntries = Object.entries(modules);
  const completedTopics = useMemo(() => getCompletedTopicSet(progress), [progress]);
  const subjectStats = getSubjectTopicStats(topics, progress, selectedSubject);

  const isCompleted = (module: string, topic: string) => completedTopics.has(topicKey(selectedSubject, module, topic));

  const toggleModule = (module: string) => {
    setOpenModules((current) => ({ ...current, [module]: !(current[module] ?? true) }));
  };

  const toggleTopic = (module: string, topic: string) => {
    setProgress((current) => {
      const existing = current.find((item) => item.subjectCode === selectedSubject && item.module === module && item.topic === topic);

      if (existing) {
        return current.map((item) =>
          item.subjectCode === selectedSubject && item.module === module && item.topic === topic
            ? { ...item, completed: !item.completed }
            : item
        );
      }

      return [...current, { subjectCode: selectedSubject, module, topic, completed: true }];
    });
  };

  const addTopic = (module: string) => {
    const topic = newTopics[module]?.trim();
    if (!topic) return;

    setTopics((current) =>
      current.map((subject) =>
        subject.subjectCode === selectedSubject
          ? {
              ...subject,
              modules: {
                ...subject.modules,
                [module]: [...(subject.modules[module] ?? []), topic]
              }
            }
          : subject
      )
    );
    setNewTopics((current) => ({ ...current, [module]: '' }));
  };

  const addModule = () => {
    const moduleName = newModuleName.trim();
    if (!moduleName) return;

    setTopics((current) => {
      const existingSubject = current.find((subject) => subject.subjectCode === selectedSubject);
      if (!existingSubject) {
        return [...current, { subjectCode: selectedSubject, modules: { [moduleName]: [] } }];
      }

      return current.map((subject) =>
        subject.subjectCode === selectedSubject
          ? {
              ...subject,
              modules: {
                ...subject.modules,
                [moduleName]: subject.modules[moduleName] ?? []
              }
            }
          : subject
      );
    });
    setNewModuleName('');
  };

  const startRenameModule = (module: string) => {
    setEditingModule(module);
    setModuleDraftName(module);
  };

  const renameModule = (module: string) => {
    const nextName = moduleDraftName.trim();
    if (!nextName || nextName === module) {
      setEditingModule(null);
      return;
    }

    setTopics((current) =>
      current.map((subject) => {
        if (subject.subjectCode !== selectedSubject) return subject;
        const nextModules = { ...subject.modules };
        nextModules[nextName] = nextModules[module] ?? [];
        delete nextModules[module];
        return { ...subject, modules: nextModules };
      })
    );
    setProgress((current) =>
      current.map((item) => (item.subjectCode === selectedSubject && item.module === module ? { ...item, module: nextName } : item))
    );
    setEditingModule(null);
  };

  const deleteModule = (module: string) => {
    setTopics((current) =>
      current.map((subject) => {
        if (subject.subjectCode !== selectedSubject) return subject;
        const nextModules = { ...subject.modules };
        delete nextModules[module];
        return { ...subject, modules: nextModules };
      })
    );
    setProgress((current) => current.filter((item) => !(item.subjectCode === selectedSubject && item.module === module)));
  };

  const deleteTopic = (module: string, topic: string) => {
    setTopics((current) =>
      current.map((subject) =>
        subject.subjectCode === selectedSubject
          ? {
              ...subject,
              modules: {
                ...subject.modules,
                [module]: (subject.modules[module] ?? []).filter((item) => item !== topic)
              }
            }
          : subject
      )
    );
    setProgress((current) => current.filter((item) => !(item.subjectCode === selectedSubject && item.module === module && item.topic === topic)));
  };

  const resetProgress = () => {
    setProgress([]);
  };

  return (
    <div className="rounded-xl border border-border bg-deep p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm uppercase tracking-[0.18em] text-muted">Important Topics</div>
          <div className="mt-1 text-xs text-muted">
            Progress: {subjectStats.completed} / {subjectStats.total} topics
          </div>
        </div>
        <button type="button" onClick={resetProgress} className="rounded-lg border border-border bg-bg px-3 py-2 text-xs text-muted hover:bg-surface">
          Reset Progress
        </button>
      </div>

      <label className="mt-4 flex items-center gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={showIncompleteOnly}
          onChange={(event) => setShowIncompleteOnly(event.target.checked)}
          className="h-4 w-4 rounded border border-border bg-bg accent-accent"
        />
        Show only incomplete topics
      </label>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newModuleName}
          onChange={(event) => setNewModuleName(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-accent"
          placeholder="Add module"
        />
        <button type="button" onClick={addModule} className="rounded-lg border border-accent bg-accent/10 p-2 text-accent hover:bg-accent/20" title="Add module">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {moduleEntries.length ? (
          moduleEntries.map(([module, moduleTopics]) => {
            const open = openModules[module] ?? true;
            const completedCount = moduleTopics.filter((topic) => isCompleted(module, topic)).length;
            const visibleTopics = showIncompleteOnly ? moduleTopics.filter((topic) => !isCompleted(module, topic)) : moduleTopics;

            return (
              <div key={module} className="rounded-xl border border-border bg-bg p-3">
                <div className="flex items-center justify-between gap-2">
                  {editingModule === module ? (
                    <input
                      value={moduleDraftName}
                      onChange={(event) => setModuleDraftName(event.target.value)}
                      className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-2 py-1 text-sm text-text"
                    />
                  ) : (
                    <button type="button" onClick={() => toggleModule(module)} className="min-w-0 flex-1 text-left text-sm">
                      <span className="font-semibold text-text">{module}</span>
                    </button>
                  )}
                  <span className="font-mono text-xs text-muted">
                    {completedCount}/{moduleTopics.length} {open ? '-' : '+'}
                  </span>
                  {editingModule === module ? (
                    <>
                      <button type="button" onClick={() => renameModule(module)} className="rounded-lg border border-border bg-deep p-1 text-muted hover:text-accent" title="Save module">
                        <Save className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => setEditingModule(null)} className="rounded-lg border border-border bg-deep p-1 text-muted" title="Cancel">
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => startRenameModule(module)} className="rounded-lg border border-border bg-deep p-1 text-muted hover:text-accent" title="Rename module">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => deleteModule(module)} className="rounded-lg border border-border bg-deep p-1 text-muted hover:text-danger" title="Delete module">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                {open && (
                  <div className="mt-3 space-y-2">
                    {visibleTopics.length ? (
                      visibleTopics.map((topic) => {
                        const completed = isCompleted(module, topic);

                        return (
                          <div key={topic} className="flex items-start gap-3 rounded-lg border border-border bg-deep px-3 py-2 text-sm">
                            <button
                              type="button"
                              onClick={() => toggleTopic(module, topic)}
                              className={`flex min-w-0 flex-1 items-start gap-2 text-left leading-5 ${completed ? 'text-accent' : 'text-text'}`}
                            >
                              <span className="w-7 shrink-0 pt-0.5 font-mono text-xs leading-5">{completed ? '[✓]' : '[ ]'}</span>
                              <span className={`min-w-0 break-words ${completed ? 'opacity-70' : ''}`}>{topic}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteTopic(module, topic)}
                              className="shrink-0 rounded-lg border border-border bg-bg p-1 text-muted hover:bg-surface hover:text-danger"
                              title="Delete topic"
                              aria-label={`Delete ${topic}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <p className="rounded-lg border border-border bg-deep px-3 py-2 text-sm text-muted">No incomplete topics in this module.</p>
                    )}

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTopics[module] ?? ''}
                        onChange={(event) => setNewTopics((current) => ({ ...current, [module]: event.target.value }))}
                        className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-accent"
                        placeholder="Add a descriptive topic"
                      />
                      <button type="button" onClick={() => addTopic(module)} className="rounded-lg border border-accent bg-accent/10 px-3 py-2 text-sm text-accent hover:bg-accent/20">
                        + Add Topic
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="rounded-xl border border-border bg-bg p-3 text-sm text-muted">No important topics are listed for this subject yet.</p>
        )}
      </div>
    </div>
  );
}
