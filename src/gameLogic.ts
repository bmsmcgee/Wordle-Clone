import type { KeyState } from "./components/Key";
import type { TileStatus } from "./components/Tile";

/**
 * States from evaluating a guess
 */
type EvaluatedState = Extract<TileStatus, "correct" | "present" | "absent">;

/**
 * Wordle style evalution.
 *
 * - Mark exact tile matches as "correct"
 * - Count remaining letters
 * - Mark remaining guess letters as "present" or "absent"
 */
export const evaluateGuessState = (
  guess: string,
  solution: string
): EvaluatedState[] => {
  const capitalGuess: string = guess.toUpperCase();
  const capitalSolution: string = solution.toUpperCase();

  const length: number = Math.min(capitalGuess.length, capitalSolution.length);

  const states: EvaluatedState[] = new Array(length) as EvaluatedState[];
  const remainingCounts: Record<string, number> = {};

  for (let i = 0; i < length; i++) {
    const guessChar: string = capitalGuess[i];
    const solutionChar: string = capitalSolution[i];

    if (guessChar === solutionChar) {
      states[i] = "correct";
    } else {
      states[i] = "absent";
      const currentCount: number = remainingCounts[solutionChar] ?? 0;
      remainingCounts[solutionChar] = currentCount + 1;
    }
  }

  for (let i = 0; i < length; i++) {
    if (states[i] === "correct") {
      continue;
    }

    const guessChar: string = capitalGuess[i];
    const availableCount: number = remainingCounts[guessChar] ?? 0;

    if (availableCount > 0) {
      states[i] = "present";
      remainingCounts[guessChar] = availableCount - 1;
    } else {
      states[i] = "absent";
    }
  }

  return states;
};

/**
 * Keyboard state map.
 */
export const buildKeyboardMap = (
  guesses: string[],
  solution: string
): Partial<Record<string, KeyState>> => {
  const rank: Record<KeyState, number> = {
    idle: 0,
    absent: 1,
    present: 2,
    correct: 3,
  };

  const res: Partial<Record<string, KeyState>> = {};

  for (const guess of guesses) {
    const capitalGuess: string = guess.toUpperCase();
    const evaluated: EvaluatedState[] = evaluateGuessState(
      capitalGuess,
      solution
    );

    for (let i = 0; i < evaluated.length; i++) {
      const letter: string = capitalGuess[i];
      const newState: KeyState = evaluated[i];
      const prevState: KeyState = res[letter] ?? "idle";

      if (rank[newState] > rank[prevState]) {
        res[letter] = newState;
      }
    }
  }
  return res;
};
