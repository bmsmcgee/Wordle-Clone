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

/**
 * Allowed guess words (cannot be solution words)
 */
const GUESS_WORDS: string[] = normalizeWordList(allowedGuesses);

/**
 * Acquire single random word from list
 */
export const getRandomWord = (): string => {
  const listLength: number = SOLUTION_WORDS.length;

  if (listLength === 0) {
    throw new Error("Empty word list. Verify wordles.txt is present.");
  }

  const randomIdx: number = Math.floor(Math.random() * listLength);
  return SOLUTION_WORDS[randomIdx];
};

/**
 * Check if guess is allowed.
 */
export const isValidGuess = (rawGuess: string): boolean => {
  const guess: string = rawGuess.trimRight().toUpperCase();

  if (guess.length === 0) {
    return false;
  }

  if (SOLUTION_WORDS.includes(guess)) {
    return true;
  }

  if (GUESS_WORDS.includes(guess)) {
    return true;
  }

  return false;
};
