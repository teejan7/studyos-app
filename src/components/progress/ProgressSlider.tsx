import { SubjectProgress } from '../../types';

interface ProgressSliderProps {
  item: SubjectProgress;
  onUpdate: (percentage: number) => void;
  onToggleModule: (index: number) => void;
}

export default function ProgressSlider({ item, onUpdate, onToggleModule }: ProgressSliderProps) {
  return (
    <div className="rounded-xl border border-border bg-bg p-4">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>{item.subjectCode}</span>
        <span className="font-semibold text-accent">{item.percentage}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={item.percentage}
        onChange={(event) => onUpdate(Number(event.target.value))}
        className="mt-3 w-full accent-accent"
      />
      <div className="mt-3 space-y-2">
        {item.modulesCompleted.map((done, index) => (
          <label key={index} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={done} onChange={() => onToggleModule(index)} className="h-4 w-4 rounded border border-border bg-bg text-accent" />
            Module {index + 1} done
          </label>
        ))}
      </div>
    </div>
  );
}
