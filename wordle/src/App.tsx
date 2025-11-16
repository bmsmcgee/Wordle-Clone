// src/App.tsx

import type { FC } from "react";
import type { TileStatus } from "./components/Tile";
import type { WordleRow } from "./components/WordleGrid";
import WordleGrid from "./components/WordleGrid";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

// Helper to quickly build a row
function buildRow(letters: string, statuses: TileStatus[]): WordleRow {
  return letters.split("").map((letter, index) => ({
    letter,
    state: statuses[index] ?? "empty",
  }));
}

const App: FC = () => {
  const rows: WordleRow[] = [
    // Past guess (fully evaluated)
    buildRow("REACT", ["correct", "present", "absent", "absent", "present"]),
    // Current guess being typed (editing)
    buildRow("ST A ", ["editing", "editing", "editing", "empty", "empty"]),
    // Rest will be empty rows (no data passed)
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="px-4 py-8 border border-slate-800 rounded-xl bg-slate-900">
        <h1 className="text-center text-3xl font-extrabold tracking-[0.25em] mb-6">
          WORDLE
        </h1>
        <WordleGrid
          rows={rows}
          wordLength={WORD_LENGTH}
          maxGuesses={MAX_GUESSES}
        />
      </div>
    </div>
  );
};

export default App;
