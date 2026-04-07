interface TerminalStatusProps {
  message: string;
}

export default function TerminalStatus({ message }: TerminalStatusProps) {
  return (
    <div className="mt-4 rounded-xl border border-border bg-bg p-4 font-mono text-sm text-text">
      <div className="mb-2 text-xs uppercase tracking-[0.22em] text-muted">system status</div>
      <div className="space-y-2">
        <div>» {message}</div>
        <div className="text-xs text-muted">All tracked subjects synced with local session storage.</div>
      </div>
    </div>
  );
}
