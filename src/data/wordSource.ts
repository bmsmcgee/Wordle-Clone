import wordList from "./wordles.txt?raw";
import allowedGuesses from "./guesses.txt";

/**
 * Utility to normalize a raw newline-separated word list into
 * a clean array of uppercase words.
 */
const normalizeWordList = (raw: string): string[] => {
  return raw
    .split("\n")
    .map((line: string): string => line.trim())
    .filter((line: string): boolean => line.length > 0)
    .map((word: string): string => word.toUpperCase());
};

/**
 * Allowed solution words
 */
const SOLUTION_WORDS: string[] = normalizeWordList(wordList);
const SOLUTION_SET: Set<string> = new Set(SOLUTION_WORDS);

/**
 * Allowed guess words (cannot be solution words)
 */
const GUESS_WORDS: string[] = normalizeWordList(allowedGuesses);
const GUESS_SET: Set<string> = new Set(GUESS_WORDS);

/**
 * Acquire single random word from list
 */
export const getRandomWord = (): string => {
  if (SOLUTION_WORDS.length === 0) {
    throw new Error("Empty word list. Verify wordles.txt is present.");
  }

  const randomIdx: number = Math.floor(Math.random() * SOLUTION_WORDS.length);
  return SOLUTION_WORDS[randomIdx];
};

/**
 * Check if guess is allowed.
 */
export const isValidGuess = (rawGuess: string): boolean => {
  const guess: string = rawGuess.trim().toUpperCase();

  if (guess.length === 0) {
    return false;
  }

  if (SOLUTION_SET.has(guess)) {
    return true;
  }

  if (GUESS_SET.has(guess)) {
    return true;
  }

  return false;
};
