import type { FC } from "react";
import type { GridRowTile } from "./GridRow";
import GridRow from "./GridRow";

/**
 * A single logical row in the Wordle grid
 *
 * It's just an array of GridRowTile objects.
 */
export type WordleRow = GridRowTile[];

/**
 * Props for the Wordle grid.
 *
 * - rows       : All rows that have data
 * - wordLength : Number of letters (columns) in row
 * - maxGuesses : Maximum number of guesses
 * - className  : Optional add-ons
 */
interface WordleGridProps {
  rows: WordleRow[];
  wordLength: number;
  maxGuesses: number;
  className?: string;
}

/**
 * The full Wordle grid.
 *
 * Lays out all rows vertically and makes sure that exactly 'maxGuesses' rows are rendered
 */
const WordleGrid: FC<WordleGridProps> = ({
  rows,
  wordLength,
  maxGuesses,
  className,
}: WordleGridProps) => {
  // Alway render exactly 'maxGuesses' rows
  const normalizedRows: WordleRow[] = Array.from(
    { length: maxGuesses },
    (_unused, rowIdx) => rows[rowIdx] ?? []
  );

  const containerClasses = ["space-y-2", className].filter(Boolean).join(" ");

  return (
    <>
      <div
        className={containerClasses}
        role="grid"
        aria-label="Wordle Grid"
        data-word-length={wordLength}
        data-max-guesses={maxGuesses}
      >
        {normalizedRows.map((row, rowIdx) => (
          <GridRow
            key={rowIdx}
            rowIdx={rowIdx}
            tiles={row}
            wordLength={wordLength}
          />
        ))}
      </div>
    </>
  );
};

export default WordleGrid;
