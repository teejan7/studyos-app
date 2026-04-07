interface StudyHeatmapProps {
  entries: { date: string; hours: number }[];
}

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function StudyHeatmap({ entries }: StudyHeatmapProps) {
  return (
    <div className="rounded-xl border border-border bg-deep p-4 text-sm">
      <div className="text-sm uppercase tracking-[0.18em] text-muted">Study heatmap</div>
      <div className="mt-4 grid gap-1 text-center text-xs text-green-100" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
        {weekDays.map((label) => (
          <div key={label} className="py-1">{label}</div>
        ))}
        {entries.map((entry) => {
          const color = entry.hours >= 5 ? 'bg-accent' : entry.hours >= 3 ? 'bg-green-700' : entry.hours >= 1 ? 'bg-green-900' : 'bg-border';
          return <div key={entry.date} className={`h-8 rounded-lg ${color}`} title={`${entry.date}: ${entry.hours}h`} />;
        })}
      </div>
    </div>
  );
}
