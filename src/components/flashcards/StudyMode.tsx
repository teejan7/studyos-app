import { FlashCard as FlashCardType } from '../../types';
import { useState } from 'react';

interface StudyModeProps {
  deck: FlashCardType[];
  onReview: (id: string, mastered: boolean) => void;
}

export default function StudyMode({ deck, onReview }: StudyModeProps) {
  const [current, setCurrent] = useState(0);
  const card = deck[current];

  if (!deck.length) {
    return <div className="rounded-xl border border-border bg-bg p-4 text-sm text-muted">Add flashcards to start studying.</div>;
  }

  const handleNext = (mastered: boolean) => {
    onReview(card.id, mastered);
    setCurrent((value) => (value + 1) % deck.length);
  };

  return (
    <div className="rounded-xl border border-border bg-bg p-4 text-sm">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted">
        <span>Study mode</span>
        <span>{current + 1}/{deck.length}</span>
      </div>
      <div className="mt-4 space-y-3">
        <div className="rounded-xl border border-border bg-deep p-4">
          <div className="text-text font-semibold">{card.front}</div>
          <div className="mt-3 text-sm text-muted">Tap on the card to reveal the answer.</div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button onClick={() => handleNext(true)} className="rounded-lg border border-border bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/80">
            Got it
          </button>
          <button onClick={() => handleNext(false)} className="rounded-lg border border-border bg-warn px-4 py-2 text-sm font-semibold text-black hover:bg-orange-400">
            Review again
          </button>
        </div>
      </div>
    </div>
  );
}
