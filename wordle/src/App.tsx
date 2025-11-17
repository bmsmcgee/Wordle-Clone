import { useState, type FC } from "react";
import type { TileStatus } from "./components/Tile";
import type { WordleRow } from "./components/WordleGrid";
import WordleGrid from "./components/WordleGrid";
import Keyboard from "./components/Keyboard";
import useKeyboard from "./hooks/useKeyboard";
import { getRandomWord } from "./data/wordSource";

const WORD_LENGTH = 5;
const MAX_GUESS = 6;

const buildCommittedRow = (guess: string): WordleRow => {
  return Array.from({ length: WORD_LENGTH }, (_unused, idx) => {
    const letter: string = guess[idx] ?? "";
    const state: TileStatus = letter ? "absent" : "empty";

    return {
      letter,
      state,
    };
  });
};

const buildEditingRow = (guess: string): WordleRow => {
  return Array.from({ length: WORD_LENGTH }, (_unused, idx) => {
    const letter: string = guess[idx] ?? "";
    const state: TileStatus = letter ? "editing" : "empty";

    return {
      letter,
      state,
    };
  });
};

const App: FC = () => {
  const [solution, setSolution] = useState<string>(() => getRandomWord());
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);

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

  const handleReturnClick = (): void => {
    setGuesses((prevGuesses: string[]): string[] => {
      const canCommit: boolean =
        currentGuess.length === WORD_LENGTH && prevGuesses.length < MAX_GUESS;

      if (!canCommit) {
        return prevGuesses;
      }

      return [...prevGuesses, currentGuess];
    });

    setCurrentGuess((prevGuess: string): string => {
      if (prevGuess.length === WORD_LENGTH && guesses.length < MAX_GUESS) {
        return "";
      }
      return prevGuess;
    });
  };

  const buildRows = (): WordleRow[] => {
    const committedRows: WordleRow[] = guesses.map(
      (guess: string): WordleRow => buildCommittedRow(guess)
    );

    const rows: WordleRow[] = [...committedRows];

    const hasRoomForEditingRow: boolean = guesses.length < MAX_GUESS;

    if (hasRoomForEditingRow) {
      rows.push(buildEditingRow(currentGuess));
    }

    return rows;
  };

  const rows: WordleRow[] = buildRows();

  useKeyboard({
    onLetter: handleLetterClick,
    onDelete: handleDeleteClick,
    onReturn: handleReturnClick,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="px-4 py-8 border border-slate-800 rounded-xl bg-slate-900 space-y-6">
        <h1 className="text-center text-3xl font-extrabold tracking-[0.25em]">
          WORDLE
        </h1>

        <WordleGrid
          rows={rows}
          wordLength={WORD_LENGTH}
          maxGuesses={MAX_GUESS}
        />

        <Keyboard
          onLetterClick={handleLetterClick}
          onDeleteClick={handleDeleteClick}
          onReturnClick={handleReturnClick}
        />
      </div>
    </div>
  );
};

export default App;
