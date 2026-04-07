import { Clock6, Cpu, Sun, Moon } from 'lucide-react';
import { format } from 'date-fns';
import { useTheme } from '../../contexts/ThemeContext';

interface TopBarProps {
  semester: string;
}

export default function TopBar({ semester }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Cpu className="h-7 w-7 text-accent" />
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-muted">STUDY//OS</div>
            <div className="text-2xl font-semibold text-text">Exam Prep Command Center</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-lg border border-border bg-deep px-3 py-2 text-sm text-text transition-colors hover:bg-surface hover:text-accent"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="rounded-lg border border-border bg-deep px-4 py-2 text-sm text-muted">
            {semester}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-deep px-4 py-3 text-sm text-text">
        <div className="flex items-center gap-2">
          <Clock6 className="h-4 w-4 text-accent" />
          Live date:
          <span className="font-mono text-accent">{format(new Date(), 'EEEE, MMM d, yyyy')}</span>
        </div>
        <div className="rounded-lg border border-border bg-bg px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
          Terminal mode active
        </div>
      </div>
    </div>
  );
}
