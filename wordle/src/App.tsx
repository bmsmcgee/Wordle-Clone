// src/App.tsx

import type { FC } from "react";
import type { TileStatus } from "./components/Tile";
import type { WordleRow } from "./components/WordleGrid";
import type { KeyState } from "./components/Key";
import WordleGrid from "./components/WordleGrid";
import Keyboard from "./components/Keyboard";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

function buildRow(letters: string, statuses: TileStatus[]): WordleRow {
  return letters.split("").map((letter, index) => ({
    letter,
    state: statuses[index] ?? "empty",
  }));
}

const App: FC = () => {
  const rows: WordleRow[] = [
    buildRow("REACT", ["correct", "present", "absent", "absent", "present"]),
  ];

  const keyStatuses: Partial<Record<string, KeyState>> = {
    R: "correct",
    E: "present",
    A: "absent",
    C: "absent",
    T: "present",
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
          maxGuesses={MAX_GUESSES}
        />

        <Keyboard keyStates={keyStatuses} />
      </div>
    </div>
  );
};

export default App;
