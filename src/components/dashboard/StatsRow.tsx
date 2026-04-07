interface StatsRowProps {
  totalExams: number;
  nextExamDays: number | null;
  coveredSubjects: number;
  filesStored: number;
}

export default function StatsRow({ totalExams, nextExamDays, coveredSubjects, filesStored }: StatsRowProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-4">
      {[
        { label: 'Total exams', value: totalExams },
        { label: 'Next exam', value: nextExamDays !== null ? `${nextExamDays} days` : 'N/A' },
        { label: 'Subjects covered', value: coveredSubjects },
        { label: 'Files stored', value: filesStored }
      ].map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-deep p-4 text-sm">
          <div className="text-muted uppercase tracking-[0.18em]">{stat.label}</div>
          <div className="mt-3 text-2xl font-semibold text-accent">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
