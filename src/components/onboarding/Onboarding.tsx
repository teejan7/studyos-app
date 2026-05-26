import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { SemesterConfig, Subject } from '../../types';

interface OnboardingProps {
  onCreateSetup: (config: SemesterConfig, subjects: Subject[]) => void;
}

const emptySubject = { code: '', name: '', credits: 3, examDate: '' };

export default function Onboarding({ onCreateSetup }: OnboardingProps) {
  const [config, setConfig] = useState<SemesterConfig>({ semesterName: '', branch: '', scheme: '' });
  const [subjects, setSubjects] = useState<Array<Subject & { examDate: string }>>([{ ...emptySubject }]);

  const updateSubject = (index: number, fields: Partial<Subject & { examDate: string }>) => {
    setSubjects((current) => current.map((subject, itemIndex) => (itemIndex === index ? { ...subject, ...fields } : subject)));
  };

  const addSubject = () => {
    setSubjects((current) => [...current, { ...emptySubject }]);
  };

  const removeSubject = (index: number) => {
    setSubjects((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSubmit = () => {
    const cleanSubjects = subjects
      .map((subject) => ({
        code: subject.code.trim().toUpperCase(),
        name: subject.name.trim(),
        credits: Number(subject.credits) || 0,
        examDate: subject.examDate || undefined
      }))
      .filter((subject) => subject.code && subject.name);

    if (!config.semesterName.trim() || !config.branch.trim() || !config.scheme.trim() || !cleanSubjects.length) return;

    onCreateSetup(
      {
        semesterName: config.semesterName.trim(),
        branch: config.branch.trim(),
        scheme: config.scheme.trim()
      },
      cleanSubjects
    );
  };

  return (
    <main className="mt-4 rounded-xl border border-border bg-surface p-4 text-text shadow-sm">
      <div className="rounded-xl border border-border bg-deep p-4">
        <div className="text-sm uppercase tracking-[0.18em] text-muted">Create your semester setup</div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <input
            value={config.branch}
            onChange={(event) => setConfig((current) => ({ ...current, branch: event.target.value }))}
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent"
            placeholder="Branch"
          />
          <input
            value={config.semesterName}
            onChange={(event) => setConfig((current) => ({ ...current, semesterName: event.target.value }))}
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent"
            placeholder="Semester"
          />
          <input
            value={config.scheme}
            onChange={(event) => setConfig((current) => ({ ...current, scheme: event.target.value }))}
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent"
            placeholder="Scheme / year"
          />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-deep p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm uppercase tracking-[0.18em] text-muted">Add subjects</div>
          <button type="button" onClick={addSubject} className="rounded-lg border border-accent bg-accent/10 p-2 text-accent hover:bg-accent/20" title="Add subject">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {subjects.map((subject, index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-border bg-bg p-3 md:grid-cols-[110px_1fr_110px_160px_auto]">
              <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.16em] text-muted">
                Code
                <input value={subject.code} onChange={(event) => updateSubject(index, { code: event.target.value })} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm normal-case tracking-normal text-text" placeholder="MAT101" />
              </label>
              <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.16em] text-muted">
                Subject name
                <input value={subject.name} onChange={(event) => updateSubject(index, { name: event.target.value })} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm normal-case tracking-normal text-text" placeholder="Course title" />
              </label>
              <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.16em] text-muted">
                Credits
                <input type="number" min={0} value={subject.credits} onChange={(event) => updateSubject(index, { credits: Number(event.target.value) })} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm normal-case tracking-normal text-text" placeholder="Credits" />
              </label>
              <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.16em] text-muted">
                Exam date
                <input type="date" value={subject.examDate} onChange={(event) => updateSubject(index, { examDate: event.target.value })} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm normal-case tracking-normal text-text" />
              </label>
              <button type="button" onClick={() => removeSubject(index)} className="rounded-lg border border-border bg-surface p-2 text-muted hover:text-danger" title="Delete subject">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleSubmit} className="mt-4 rounded-lg border border-border bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/80">
          Launch StudyOS
        </button>
      </div>
    </main>
  );
}
