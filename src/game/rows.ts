import type { TileStatus } from "../components/Tile";
import type { WordleRow } from "../components/WordleGrid";
import { evaluateGuessState } from "../gameLogic";
import { WORD_LENGTH } from "./config";

export const buildCommittedRow = (
  guess: string,
  solution: string
): WordleRow => {
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

export const buildEditingRow = (guess: string): WordleRow => {
  return Array.from({ length: WORD_LENGTH }, (_unused, idx) => {
    const letter: string = guess[idx] ?? "";
    const state: TileStatus = letter ? "editing" : "empty";

    return {
      letter,
      state,
    };
  });
};
