import { useState } from 'react';
import { Question } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface QuestionFormProps {
  subjectCode: string;
  subjects: { code: string; name: string }[];
  modules: string[];
  onCreate: (question: Question) => void;
}

export default function QuestionForm({ subjectCode, modules, onCreate }: QuestionFormProps) {
  const [text, setText] = useState('');
  const [module, setModule] = useState('');
  const [type, setType] = useState('Short answer');
  const [year, setYear] = useState(String(new Date().getFullYear()));

  const handleSubmit = () => {
    if (!text.trim()) return;
    onCreate({
      id: uuidv4(),
      subjectCode,
      module: module || modules[0] || 'General',
      question: text.trim(),
      markType: type,
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
        <select value={module} onChange={(event) => setModule(event.target.value)} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
          <option value="">General</option>
          {modules.map((moduleName) => (
            <option key={moduleName} value={moduleName}>{moduleName}</option>
          ))}
        </select>
        <select value={type} onChange={(event) => setType(event.target.value)} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
          <option value="Short answer">Short answer</option>
          <option value="Long answer">Long answer</option>
          <option value="Essay">Essay</option>
          <option value="Problem">Problem</option>
          <option value="Custom">Custom</option>
        </select>
        <input
          type="text"
          className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
          value={year}
          onChange={(event) => setYear(event.target.value)}
          placeholder="Year"
        />
      </div>
      <button onClick={handleSubmit} className="mt-4 rounded-lg border border-border bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/80">
        Add question
      </button>
    </div>
  );
}
