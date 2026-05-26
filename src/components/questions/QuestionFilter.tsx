interface QuestionFilterProps {
  subjects: { code: string; name: string }[];
  modules: string[];
  filters: { subject: string; module: string; type: string; starredOnly: boolean };
  onChange: (fields: Partial<{ subject: string; module: string; type: string; starredOnly: boolean }>) => void;
}

export default function QuestionFilter({ subjects, modules, filters, onChange }: QuestionFilterProps) {
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
        {modules.map((module) => (
          <option key={module} value={module}>{module}</option>
        ))}
      </select>
      <select value={filters.type} onChange={(event) => onChange({ type: event.target.value })} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
        <option value="">All types</option>
        <option value="Short answer">Short answer</option>
        <option value="Long answer">Long answer</option>
        <option value="Essay">Essay</option>
        <option value="Problem">Problem</option>
        <option value="Custom">Custom</option>
      </select>
      <label className="inline-flex items-center rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
        <input type="checkbox" checked={filters.starredOnly} onChange={(event) => onChange({ starredOnly: event.target.checked })} className="mr-2 h-4 w-4 rounded border-border bg-bg text-accent" />
        Starred only
      </label>
    </div>
  );
}
