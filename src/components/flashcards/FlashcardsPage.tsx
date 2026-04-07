import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { FlashCard as FlashCardType, SubjectProgress } from '../../types';
import FlashCard from './FlashCard';
import StudyMode from './StudyMode';
import { v4 as uuidv4 } from 'uuid';

interface FlashcardsPageProps {
  selectedSubject: string;
  flashcards: FlashCardType[];
  setFlashcards: Dispatch<SetStateAction<FlashCardType[]>>;
  subjects: { code: string; name: string }[];
}

export default function FlashcardsPage({ selectedSubject, flashcards, setFlashcards, subjects }: FlashcardsPageProps) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const deck = useMemo(() => flashcards.filter((card) => card.subjectCode === selectedSubject), [flashcards, selectedSubject]);
  const masteredCount = deck.filter((card) => card.mastered).length;

  const addCard = () => {
    if (!front.trim() || !back.trim()) return;
    setFlashcards([
      {
        id: uuidv4(),
        subjectCode: selectedSubject,
        front: front.trim(),
        back: back.trim(),
        mastered: false,
        reviewCount: 0
      },
      ...flashcards
    ]);
    setFront('');
    setBack('');
  };

  const reviewCard = (id: string, mastered: boolean) => {
    setFlashcards(
      flashcards.map((card) =>
        card.id === id
          ? {
              ...card,
              mastered,
              reviewCount: mastered ? card.reviewCount + 1 : Math.max(card.reviewCount + 1, 1)
            }
          : card
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[0.6fr_0.4fr]">
        <div className="rounded-xl border border-border bg-deep p-4">
          <div className="text-sm uppercase tracking-[0.18em] text-muted">Create flashcard</div>
          <div className="mt-4 space-y-3">
            <textarea value={front} onChange={(event) => setFront(event.target.value)} rows={3} className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text" placeholder="Front: question or concept" />
            <textarea value={back} onChange={(event) => setBack(event.target.value)} rows={3} className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text" placeholder="Back: answer or formula" />
            <button onClick={addCard} className="rounded-lg border border-border bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/80">
              Add card
            </button>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-deep p-4">
          <div className="text-sm uppercase tracking-[0.18em] text-muted">Deck stats</div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl border border-border bg-bg p-3">Subject: {selectedSubject}</div>
            <div className="rounded-xl border border-border bg-bg p-3">Cards in deck: {deck.length}</div>
            <div className="rounded-xl border border-border bg-bg p-3">Mastered: {masteredCount}</div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.55fr_0.45fr]">
        <div className="space-y-3">
          {deck.length ? (
            deck.map((card) => <FlashCard key={card.id} card={card} onToggleMastered={(id) => reviewCard(id, !deck.find((c) => c.id === id)?.mastered)} />)
          ) : (
            <div className="rounded-xl border border-border bg-bg p-4 text-sm text-muted">No cards in this deck yet.</div>
          )}
        </div>
        <StudyMode deck={deck} onReview={reviewCard} />
      </div>
    </div>
  );
}
