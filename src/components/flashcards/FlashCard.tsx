import { FlashCard as FlashCardType } from '../../types';
import { useState } from 'react';

interface FlashCardProps {
  card: FlashCardType;
  onToggleMastered: (id: string) => void;
}

export default function FlashCard({ card, onToggleMastered }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="group relative h-64 w-full perspective">
      <div
        onClick={() => setFlipped((value) => !value)}
        className="relative h-full w-full rounded-xl border border-border bg-deep px-4 py-6 text-sm transition-transform duration-300"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div className="absolute inset-0 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted">Front</div>
            <div className="mt-3 text-lg font-semibold text-text">{card.front}</div>
          </div>
          <div className="text-xs text-muted">Click to flip</div>
        </div>
        <div className="absolute inset-0 items-center justify-between p-4"
          style={{ display: flipped ? 'flex' : 'none', transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted">Back</div>
            <div className="mt-3 text-lg font-semibold text-text">{card.back}</div>
          </div>
          <button onClick={(event) => { event.stopPropagation(); onToggleMastered(card.id); }} className="rounded-lg border border-border bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/80">
            {card.mastered ? 'Reviewed' : 'Mark mastered'}
          </button>
        </div>
      </div>
    </div>
  );
}
