import { Question } from '../../types';
import { Star } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onToggleStar: (id: string) => void;
}

export default function QuestionCard({ question, onToggleStar }: QuestionCardProps) {
  return (
    <div className="rounded-xl border border-border bg-bg p-4 text-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-text font-semibold">{question.question}</div>
          <div className="mt-2 text-xs text-muted">
            {question.subjectCode} - {question.module} - {question.markType}
          </div>
          {question.year && <div className="mt-1 text-xs text-muted">Year: {question.year}</div>}
        </div>
        <button onClick={() => onToggleStar(question.id)} className="rounded-full border border-border bg-deep p-2 text-accent hover:bg-accent/10">
          <Star className={`h-4 w-4 ${question.starred ? 'fill-accent text-accent' : ''}`} />
        </button>
      </div>
    </div>
  );
}
