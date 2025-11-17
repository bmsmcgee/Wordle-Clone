// src/App.tsx

import type { FC } from "react";
import { useState } from "react";
import type { WordleRow } from "./components/WordleGrid";
import type { TileStatus } from "./components/Tile";
import WordleGrid from "./components/WordleGrid";
import Keyboard from "./components/Keyboard";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

/**
 * Build a single "editing" row from the current guess string.
 * - Filled positions are "editing".
 * - Remaining positions are "empty".
 */
const buildEditingRow = (guess: string): WordleRow => {
  return Array.from({ length: WORD_LENGTH }, (_unused, index) => {
    const letter: string = guess[index] ?? "";
    const state: TileStatus = letter ? "editing" : "empty";

    return {
      letter,
      state,
    };
  });
};

const App: FC = () => {
  const [currentGuess, setCurrentGuess] = useState<string>("");

  /**
   * Handle a letter being clicked on the on-screen keyboard.
   *
   * - Only appends if we haven't reached WORD_LENGTH yet.
   * - Ignores clicks once the row is "full".
   */
  const handleLetterClick = (letter: string): void => {
    setCurrentGuess((prevGuess: string): string => {
      if (prevGuess.length >= WORD_LENGTH) {
        return prevGuess;
      }
      return prevGuess + letter;
    });
  };

  const handleDeleteClick = (): void => {
    setCurrentGuess((prevGuess: string): string => {
      if (prevGuess.length === 0) {
        return prevGuess;
      }
      return prevGuess.slice(0, prevGuess.length - 1);
    });
  };

  // For now, just have the first row be the current guess.
  const rows: WordleRow[] = [buildEditingRow(currentGuess)];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="px-4 py-8 border border-slate-800 rounded-xl bg-slate-900 space-y-6">
        <h1 className="text-center text-3xl font-extrabold tracking-[0.25em]">
          WORDLE
        </h1>

        <WordleGrid
          rows={rows}
          wordLength={WORD_LENGTH}
          maxGuesses={MAX_GUESSES}
        />

        <Keyboard
          onLetterClick={handleLetterClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
    </div>
  );
};

export default App;
