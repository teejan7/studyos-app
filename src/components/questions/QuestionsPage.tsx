import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Question } from '../../types';
import QuestionFilter from './QuestionFilter';
import QuestionForm from './QuestionForm';
import QuestionCard from './QuestionCard';

interface QuestionsPageProps {
  selectedSubject: string;
  subjects: { code: string; name: string }[];
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}

export default function QuestionsPage({ selectedSubject, subjects, questions, setQuestions }: QuestionsPageProps) {
  const [filters, setFilters] = useState({ subject: '', module: '', type: '', starredOnly: false });

  const filteredQuestions = useMemo(() => {
    if (!filters.subject) {
      return [];
    }

    return questions.filter((question) => {
      if (question.subjectCode !== filters.subject) return false;
      if (filters.module && question.module !== Number(filters.module)) return false;
      if (filters.type && question.type !== filters.type) return false;
      if (filters.starredOnly && !question.starred) return false;
      return true;
    });
  }, [filters, questions]);

  const previousYearQuestions = useMemo(
    () => questions.filter((question) => filters.subject && question.subjectCode === filters.subject && question.year).slice(0, 3),
    [filters.subject, questions]
  );

  const handleCreate = (question: Question) => {
    setQuestions([question, ...questions]);
  };

  const handleToggleStar = (id: string) => {
    setQuestions(questions.map((question) => (question.id === id ? { ...question, starred: !question.starred } : question)));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[0.55fr_0.45fr]">
        <QuestionForm subjectCode={selectedSubject} subjects={subjects} onCreate={handleCreate} />
        <div className="rounded-xl border border-border bg-deep p-4">
          <div className="text-sm uppercase tracking-[0.18em] text-muted">Filters</div>
          <div className="mt-4">
            <QuestionFilter subjects={subjects} filters={filters} onChange={(update) => setFilters({ ...filters, ...update })} />
          </div>
          <div className="mt-6 rounded-xl border border-border bg-bg p-4 text-sm">
            <div className="text-xs uppercase tracking-[0.18em] text-muted">Previous year questions</div>
            <div className="mt-3 space-y-2">
              {previousYearQuestions.map((question) => (
                <div key={question.id} className="rounded-lg border border-border bg-surface p-3">{question.year} · {question.text}</div>
              ))}
              {!filters.subject && <div className="text-sm text-muted">Select a subject to view previous year questions.</div>}
              {Boolean(filters.subject) && !previousYearQuestions.length && (
                <div className="text-sm text-muted">Add previous year items to see them here.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-deep p-4">
        <div className="text-sm uppercase tracking-[0.18em] text-muted">Question list</div>
        <div className="mt-4 space-y-3">
          {filteredQuestions.length ? (
            filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} onToggleStar={handleToggleStar} />
            ))
          ) : (
            <p className="text-sm text-muted">No questions match the selected criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}
