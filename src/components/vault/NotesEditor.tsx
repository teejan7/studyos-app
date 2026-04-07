import { useMemo, useState } from 'react';
import { Note } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface NotesEditorProps {
  subjectCode: string;
  notes: Note[];
  onSave: (note: Note) => void;
}

export default function NotesEditor({ subjectCode, notes, onSave }: NotesEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [module, setModule] = useState(1);

  const preview = useMemo(() => content.replace(/\n/g, '<br/>'), [content]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    onSave({
      id: uuidv4(),
      subjectCode,
      module,
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString()
    });
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-4 rounded-xl border border-border bg-deep p-4">
      <div className="text-sm uppercase tracking-[0.18em] text-muted">New note</div>
      <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
        <label className="flex flex-col gap-2 text-sm">
          Subject
          <input className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100" value={subjectCode} disabled />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Module
          <select className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100" value={module} onChange={(event) => setModule(Number(event.target.value))}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>Module {num}</option>
            ))}
          </select>
        </label>
      </div>
      <input
        className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Note title"
      />
      <textarea
        rows={6}
        className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your note in markdown-style text..."
      />
      <button onClick={handleSubmit} className="rounded-lg border border-border bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-green-300">
        Save note
      </button>
      <div className="rounded-xl border border-border bg-bg p-4 text-sm">
        <div className="text-xs uppercase tracking-[0.18em] text-muted">Preview</div>
        <div className="mt-3 prose prose-invert max-w-none text-green-100" dangerouslySetInnerHTML={{ __html: preview || '<span class="text-muted">Start typing to preview...</span>' }} />
      </div>
    </div>
  );
}
