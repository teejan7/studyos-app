import { useState } from 'react';
import { Question } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface QuestionFormProps {
  subjectCode: string;
  subjects: { code: string; name: string }[];
  onCreate: (question: Question) => void;
}

export default function QuestionForm({ subjectCode, subjects, onCreate }: QuestionFormProps) {
  const [text, setText] = useState('');
  const [module, setModule] = useState(1);
  const [type, setType] = useState<'2mark' | '5mark' | '10mark' | 'partA' | 'partB'>('2mark');
  const [year, setYear] = useState(new Date().getFullYear());

  const handleSubmit = () => {
    if (!text.trim()) return;
    onCreate({
      id: uuidv4(),
      subjectCode,
      module,
      text: text.trim(),
      type,
      starred: false,
      year
    });
    setText('');
  };

  return (
    <div className="rounded-xl border border-border bg-deep p-4">
      <div className="text-sm uppercase tracking-[0.18em] text-muted">Add important question</div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_120px]">
        <textarea
          rows={4}
          className="col-span-full w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Question text"
        />
        <select value={subjectCode} disabled className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
          <option>{subjectCode}</option>
        </select>
        <select value={module} onChange={(event) => setModule(Number(event.target.value))} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>Module {num}</option>
          ))}
        </select>
        <select value={type} onChange={(event) => setType(event.target.value as any)} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
          <option value="2mark">2-mark</option>
          <option value="5mark">5-mark</option>
          <option value="10mark">10-mark</option>
          <option value="partA">Part A</option>
          <option value="partB">Part B</option>
        </select>
        <input
          type="number"
          className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
          value={year}
          min={2000}
          max={2030}
          onChange={(event) => setYear(Number(event.target.value))}
          placeholder="Year"
        />
      </div>
      <button onClick={handleSubmit} className="mt-4 rounded-lg border border-border bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/80">
        Add question
      </button>
    </div>
  );
}
