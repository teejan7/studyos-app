import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { SubjectTopics, TopicProgress } from '../../types';
import StudyHeatmap from './StudyHeatmap';
import { getSubjectTopics, getSubjectTopicStats } from '../../utils/topics';

interface ProgressPageProps {
  selectedSubject: string;
  topics: SubjectTopics[];
  progress: TopicProgress[];
  setProgress: Dispatch<SetStateAction<TopicProgress[]>>;
}

export default function ProgressPage({ selectedSubject, topics, progress, setProgress }: ProgressPageProps) {
  const [targetSgpa, setTargetSgpa] = useState(9.0);
  const [studyHours, setStudyHours] = useState(0);

  const subjectStats = getSubjectTopicStats(topics, progress, selectedSubject);
  const subjectModules = getSubjectTopics(topics, selectedSubject);
  const daysLeft = useMemo(() => {
    const subjectIndex = topics.findIndex((item) => item.subjectCode === selectedSubject);
    return subjectIndex >= 0 ? (6 - subjectIndex) * 3 : 0;
  }, [selectedSubject, topics]);

  const heatmap = useMemo(() => {
    const entries = Array.from({ length: 21 }).map((_, index) => ({
      date: new Date(Date.now() - (20 - index) * 86400000).toISOString().slice(0, 10),
      hours: Math.floor(Math.random() * 5)
    }));
    return entries;
  }, []);

  const message = subjectStats.total
    ? subjectStats.percentage >= 80
      ? 'You are on track for your target SGPA.'
      : daysLeft <= 10
      ? 'Urgent focus needed to meet your study goals.'
      : 'Keep building momentum with steady daily hours.'
    : 'Pick a subject and begin updating progress.';

  const resetProgress = () => {
    setProgress([]);
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
            <input type="number" step="0.1" min={6.0} max={10.0} value={targetSgpa} onChange={(event) => setTargetSgpa(Number(event.target.value))} className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text" />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-deep p-4">
          <div className="text-sm uppercase tracking-[0.18em] text-muted">Daily study log</div>
          <div className="mt-4 space-y-3">
            <input type="number" min={0} max={12} value={studyHours} onChange={(event) => setStudyHours(Number(event.target.value))} className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text" placeholder="Hours studied today" />
            <div className="rounded-xl border border-border bg-bg p-3 text-sm">Today's logged hours: {studyHours}</div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-deep p-4">
        <div className="text-sm uppercase tracking-[0.18em] text-muted">Subject progress</div>
        <div className="mt-4 space-y-3">
          {subjectStats.total ? (
            <div className="rounded-xl border border-border bg-bg p-4">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>{selectedSubject}</span>
                <span className="font-semibold text-accent">{subjectStats.percentage}%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-border">
                <div className="h-full rounded-full bg-accent" style={{ width: `${subjectStats.percentage}%` }} />
              </div>
              <div className="mt-3 text-sm text-text">
                {subjectStats.completed} / {subjectStats.total} important topics completed
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {Object.entries(subjectModules).map(([module, moduleTopics]) => {
                  const completed = moduleTopics.filter((topic) =>
                    progress.some((item) => item.subjectCode === selectedSubject && item.module === module && item.topic === topic && item.completed)
                  ).length;

                  return (
                    <div key={module} className="rounded-lg border border-border bg-deep px-3 py-2 text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <span>{module}</span>
                        <span className="font-mono text-xs text-muted">
                          {completed}/{moduleTopics.length}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button type="button" onClick={resetProgress} className="mt-4 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted hover:bg-bg">
                Reset Progress
              </button>
            </div>
          ) : (
            <p className="text-sm text-muted">No important topics are listed for this subject yet.</p>
          )}
        </div>
      </div>
      <StudyHeatmap entries={heatmap} />
    </div>
  );
}
