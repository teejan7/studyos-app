import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { SubjectProgress } from '../../types';
import ProgressSlider from './ProgressSlider';
import StudyHeatmap from './StudyHeatmap';

interface ProgressPageProps {
  selectedSubject: string;
  progress: SubjectProgress[];
  setProgress: Dispatch<SetStateAction<SubjectProgress[]>>;
}

export default function ProgressPage({ selectedSubject, progress, setProgress }: ProgressPageProps) {
  const [targetSgpa, setTargetSgpa] = useState(9.0);
  const [studyHours, setStudyHours] = useState(0);

  const progressItem = progress.find((item) => item.subjectCode === selectedSubject);
  const daysLeft = useMemo(() => {
    const subjectIndex = progress.findIndex((item) => item.subjectCode === selectedSubject);
    return subjectIndex >= 0 ? (6 - subjectIndex) * 3 : 0;
  }, [selectedSubject, progress]);

  const heatmap = useMemo(() => {
    const entries = Array.from({ length: 21 }).map((_, index) => ({
      date: new Date(Date.now() - (20 - index) * 86400000).toISOString().slice(0, 10),
      hours: Math.floor(Math.random() * 5)
    }));
    return entries;
  }, []);

  const message = progressItem
    ? progressItem.percentage >= 80
      ? 'You are on track for your target SGPA.'
      : daysLeft <= 10
      ? 'Urgent focus needed to meet your study goals.'
      : 'Keep building momentum with steady daily hours.'
    : 'Pick a subject and begin updating progress.';

  const handleUpdatePercentage = (percentage: number) => {
    setProgress(
      progress.map((item) => (item.subjectCode === selectedSubject ? { ...item, percentage } : item))
    );
  };

  const handleToggleModule = (index: number) => {
    setProgress(
      progress.map((item) =>
        item.subjectCode === selectedSubject
          ? {
              ...item,
              modulesCompleted: item.modulesCompleted.map((done, idx) => (idx === index ? !done : done))
            }
          : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[0.6fr_0.4fr]">
        <div className="rounded-xl border border-border bg-deep p-4">
          <div className="text-sm uppercase tracking-[0.18em] text-muted">Target progress</div>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-border bg-bg p-3 text-sm">Target SGPA: {targetSgpa.toFixed(1)}</div>
            <div className="rounded-xl border border-border bg-bg p-3 text-sm">Days until final exam period: {daysLeft}</div>
            <div className="rounded-xl border border-border bg-bg p-3 text-sm">Current status: {message}</div>
          </div>
          <div className="mt-4 space-y-3">
            <label className="text-sm text-muted">Set target SGPA</label>
            <input type="number" step="0.1" min={6.0} max={10.0} value={targetSgpa} onChange={(event) => setTargetSgpa(Number(event.target.value))} className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100" />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-deep p-4">
          <div className="text-sm uppercase tracking-[0.18em] text-muted">Daily study log</div>
          <div className="mt-4 space-y-3">
            <input type="number" min={0} max={12} value={studyHours} onChange={(event) => setStudyHours(Number(event.target.value))} className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100" placeholder="Hours studied today" />
            <div className="rounded-xl border border-border bg-bg p-3 text-sm">Today's logged hours: {studyHours}</div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-deep p-4">
        <div className="text-sm uppercase tracking-[0.18em] text-muted">Subject progress</div>
        <div className="mt-4 space-y-3">
          {progressItem ? (
            <ProgressSlider item={progressItem} onUpdate={handleUpdatePercentage} onToggleModule={handleToggleModule} />
          ) : (
            <p className="text-sm text-muted">Select a subject from the sidebar to update its progress.</p>
          )}
        </div>
      </div>
      <StudyHeatmap entries={heatmap} />
    </div>
  );
}
