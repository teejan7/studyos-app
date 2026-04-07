interface ModuleAccordionProps {
  moduleIndex: number;
  completed: boolean;
  onToggle: () => void;
}

export default function ModuleAccordion({ moduleIndex, completed, onToggle }: ModuleAccordionProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-left text-sm ${
        completed ? 'bg-accent/10 text-accent' : 'bg-bg text-text hover:bg-surface'
      }`}
    >
      <span>Module {moduleIndex + 1}</span>
      <span>{completed ? 'Done' : 'Pending'}</span>
    </button>
  );
}
