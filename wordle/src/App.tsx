import { useState, type FC } from "react";
import type { TileStatus } from "./components/Tile";
import type { WordleRow } from "./components/WordleGrid";
import WordleGrid from "./components/WordleGrid";
import Keyboard from "./components/Keyboard";
import useKeyboard from "./hooks/useKeyboard";
import { getRandomWord, isValidGuess } from "./data/wordSource";
import { buildKeyboardMap, evaluateGuessState } from "./gameLogic";
import type { KeyState } from "./components/Key";

const WORD_LENGTH = 5;
const MAX_GUESS = 6;

type GameStatus = "playing" | "won" | "lost";

const buildCommittedRow = (guess: string, solution: string): WordleRow => {
  const evaluatedState = evaluateGuessState(guess, solution);

  return Array.from({ length: WORD_LENGTH }, (_unused, idx) => {
    const letter: string = guess[idx] ?? "";
    const state: TileStatus = evaluatedState[idx] ?? "absent";

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
  const [message, setMessage] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  const handleLetter = (letter: string): void => {
    if (gameStatus !== "playing") {
      return;
    }

    setCurrentGuess((prevGuess: string): string => {
      if (prevGuess.length >= WORD_LENGTH) {
        return prevGuess;
      }
      return prevGuess + letter;
    });
  };

  const handleDelete = (): void => {
    if (gameStatus !== "playing") {
      return;
    }
    setCurrentGuess((prevGuess: string): string => {
      if (prevGuess.length === 0) {
        return prevGuess;
      }
      return prevGuess.slice(0, prevGuess.length - 1);
    });
  };

  const handleReturn = (): void => {
    if (gameStatus !== "playing") {
      return;
    }

    const guess: string = currentGuess;

    if (guess.length !== WORD_LENGTH) {
      setMessage("Not enough letters");
      return;
    }

    if (!isValidGuess(guess)) {
      setMessage("Not in word list");
      return;
    }

    if (guesses.length >= MAX_GUESS) {
      return;
    }

    const capitalGuess: string = guess.toUpperCase();
    const capitalSolution: string = solution.toUpperCase();

    const nextGuess: string[] = [...guesses, guess];
    setGuesses(nextGuess);
    setCurrentGuess("");

    if (capitalGuess === capitalSolution) {
      setGameStatus("won");
      setMessage(`Nice! You guessed the correct word: ${capitalSolution}!`);
      return;
    }

    if (nextGuess.length >= MAX_GUESS) {
      setGameStatus("lost");
      setMessage(`Out of attempts. The word was ${capitalSolution}`);
      return;
    }

    setMessage("");
  };

  const buildRows = (): WordleRow[] => {
    const committedRows: WordleRow[] = guesses.map(
      (guess: string): WordleRow => buildCommittedRow(guess, solution)
    );

    const rows: WordleRow[] = [...committedRows];

    if (gameStatus === "playing" && guesses.length < MAX_GUESS) {
      rows.push(buildEditingRow(currentGuess));
    }

    return rows;
  };

  const rows: WordleRow[] = buildRows();

  const keyStates: Partial<Record<string, KeyState>> = buildKeyboardMap(
    guesses,
    solution
  );

  useKeyboard({
    onLetter: handleLetter,
    onDelete: handleDelete,
    onReturn: handleReturn,
  });

  const getStatusLabel = (): string => {
    if (gameStatus === "won") {
      const attempts = guesses.length;
      return `You won in ${attempts} ${attempts === 1 ? "guess" : "guesses"}!`;
    }

    if (gameStatus === "lost") {
      return `You lost. The word was ${solution}.`;
    }

    return message;
  };

  const statusLabel: string = getStatusLabel();

  const handleResetGame = (
    event?: React.MouseEvent<HTMLButtonElement>
  ): void => {
    if (event) {
      event.currentTarget.blur();
    }

    setSolution(getRandomWord());
    setGuesses([]);
    setCurrentGuess("");
    setMessage("");
    setGameStatus("playing");
  };

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

        {statusLabel && (
          <div
            className={`text-center text-sm ${
              gameStatus === "won"
                ? "text-emerald-400"
                : gameStatus === "lost"
                ? "text-rose-400"
                : "text-amber-400"
            }`}
          >
            {statusLabel}
          </div>
        )}

        <Keyboard
          keyStates={keyStates}
          onLetterClick={handleLetter}
          onDeleteClick={handleDelete}
          onReturnClick={handleReturn}
        />

        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={handleResetGame}
            className="text-xs px-3 py-1 rounded-full border border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            New Game
          </button>
        </div>
        {solution}
      </div>
    </div>
  );
};

export default App;
