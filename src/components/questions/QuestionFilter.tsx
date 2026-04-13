import { Exam } from '../../types';

interface QuestionFilterProps {
  subjects: { code: string; name: string }[];
  filters: { subject: string; module: string; type: string; starredOnly: boolean };
  onChange: (fields: Partial<{ subject: string; module: string; type: string; starredOnly: boolean }>) => void;
}

export default function QuestionFilter({ subjects, filters, onChange }: QuestionFilterProps) {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
      <select value={filters.subject} onChange={(event) => onChange({ subject: event.target.value })} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
        <option value="">Select subject</option>
        {subjects.map((subject) => (
          <option key={subject.code} value={subject.code}>{subject.name}</option>
        ))}
      </select>
      <select value={filters.module} onChange={(event) => onChange({ module: event.target.value })} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
        <option value="">All modules</option>
        {[1, 2, 3, 4, 5].map((module) => (
          <option key={module} value={String(module)}>Module {module}</option>
        ))}
      </select>
      <select value={filters.type} onChange={(event) => onChange({ type: event.target.value })} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
        <option value="">All types</option>
        <option value="2mark">3 mark</option>
        <option value="partA">4 mark</option>
        <option value="5mark">7 mark</option>
        <option value="partB">10 mark</option>
        <option value="10mark">14 mark</option>
      </select>
      <label className="inline-flex items-center rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
        <input type="checkbox" checked={filters.starredOnly} onChange={(event) => onChange({ starredOnly: event.target.checked })} className="mr-2 h-4 w-4 rounded border-border bg-bg text-accent" />
        Starred only
      </label>
    </div>
  );
}
