import { useMemo } from 'react';
import CountdownCard from './CountdownCard';
import StatsRow from './StatsRow';
import TerminalStatus from './TerminalStatus';
import { FileRecord, FlashCard, Note, Question, Reminder, Resource, Subject, SubjectTopics, TopicProgress } from '../../types';
import { useExamCountdown } from '../../hooks/useExamCountdown';
import { getSubjectTopicStats } from '../../utils/topics';

interface DashboardProps {
  selectedSubject: string;
  subjects: Subject[];
  notes: Note[];
  questions: Question[];
  flashcards: FlashCard[];
  reminders: Reminder[];
  topics: SubjectTopics[];
  progress: TopicProgress[];
  files: FileRecord[];
  resources: Resource[];
}

export default function Dashboard({ selectedSubject, subjects, questions, topics, progress, files, reminders, resources }: DashboardProps) {
  const totalExams = subjects.filter((subject) => subject.examDate).length;
  const countdown = useExamCountdown(subjects);
  const nextExamDays = countdown.find((item) => item.days >= 0)?.days ?? null;

  const subjectTopicStats = subjects.map((subject) => ({
    subjectCode: subject.code,
    ...getSubjectTopicStats(topics, progress, subject.code)
  }));
  const coveredSubjects = subjectTopicStats.filter((item) => item.total > 0 && item.completed === item.total).length;
  const topQuestions = questions.filter((item) => item.starred && item.subjectCode === selectedSubject).slice(0, 3);
  const selectedFiles = files.filter((file) => file.subjectCode === selectedSubject).slice(0, 4);
  const recentResources = useMemo(
    () =>
      [...resources]
        .filter((resource) => resource.subjectCode === selectedSubject)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    [resources, selectedSubject]
  );

  const statusMessage = nextExamDays !== null ? `Only ${nextExamDays} days until the next exam — keep the focus strong.` : 'All exams completed. Review and consolidate notes.';

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[minmax(320px,0.6fr)_minmax(280px,0.4fr)]">
        <section className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {subjects.map((subject) => (
              <CountdownCard key={subject.code} subject={subject} />
            ))}
          </div>
          <StatsRow totalExams={totalExams} nextExamDays={nextExamDays} coveredSubjects={coveredSubjects} filesStored={files.length} />
        </section>
        <section className="rounded-xl border border-border bg-deep p-4">
          <div className="text-sm uppercase tracking-[0.18em] text-muted">{selectedSubject}</div>
          <div className="mt-3 space-y-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">Important questions</div>
              {topQuestions.length ? (
                <ul className="mt-3 space-y-2">
                  {topQuestions.map((item) => (
                    <li key={item.id} className="rounded-xl border border-border bg-bg p-3 text-sm">
                      <div className="font-medium text-text">{item.question}</div>
                      <div className="text-xs text-muted">{item.markType} question</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted">No starred questions yet. Add one in the Question Bank.</p>
              )}
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">Files</div>
              <ul className="mt-3 space-y-2">
                {selectedFiles.length ? (
                  selectedFiles.map((file) => (
                    <li key={file.id} className="rounded-xl border border-border bg-bg p-3 text-sm">{file.name}</li>
                  ))
                ) : (
                  <li className="rounded-xl border border-border bg-bg p-3 text-sm text-muted">No files stored for this subject.</li>
                )}
              </ul>
            </div>
          </div>
        </section>
      </div>
      <section className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="rounded-xl border border-border bg-deep p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-muted">Study progress</div>
          <div className="mt-4 space-y-3">
            {subjectTopicStats.map((item) => (
              <div key={item.subjectCode} className="space-y-2 rounded-xl border border-border bg-bg p-3">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.subjectCode}</span>
                  <span className="font-semibold text-accent">
                    {item.completed}/{item.total} topics
                  </span>
                </div>
                <div className="h-2 rounded-full bg-border">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${item.percentage}%` }} />
                </div>
                <div className="text-xs text-muted">{item.percentage}% complete</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-deep p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-muted">Active reminders</div>
          <div className="mt-3 space-y-2">
            {reminders.slice(0, 4).map((reminder) => (
              <div key={reminder.id} className={`rounded-xl border border-border p-3 ${reminder.priority === 'high' ? 'bg-danger/10' : reminder.priority === 'medium' ? 'bg-warn/10' : 'bg-bg'}`}>
                <div className="flex items-center justify-between text-sm text-text">
                  <span>{reminder.title}</span>
                  <span className="rounded-full border border-border px-2 text-[11px] uppercase text-muted">{reminder.priority}</span>
                </div>
                <div className="mt-1 text-xs text-muted">{new Date(reminder.datetime).toLocaleString()}</div>
              </div>
            ))}
            {!reminders.length && <p className="text-sm text-muted">No active reminders yet.</p>}
          </div>
        </div>
      </section>
      <section className="rounded-xl border border-border bg-deep p-4">
        <div className="text-xs uppercase tracking-[0.18em] text-muted">Quick Resources</div>
        <div className="mt-4 space-y-3">
          {recentResources.length ? (
            recentResources.map((resource) => (
              <button
                key={resource.id}
                type="button"
                onClick={() => window.open(resource.link, '_blank')}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-bg p-3 text-left text-sm text-text hover:bg-surface"
              >
                <span>{resource.title}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-muted">{resource.type}</span>
              </button>
            ))
          ) : (
            <p className="text-sm text-muted">No external resources yet. Add them in the Resource Hub.</p>
          )}
        </div>
      </section>
      <TerminalStatus message={statusMessage} />
    </div>
  );
}
