import type { FC } from "react";

/**
 * Status of a single tile in the grid.
 *
 * - "empty"    : No letter has been assigned
 * - "editing"  : Current user guess
 * - "correct"  : Letter is in correct position
 * - "present"  : Letter is in wrong position
 * - "absent"   : Letter is not in word
 */
export type TileStatus = "empty" | "editing" | "correct" | "present" | "absent";

/**
 * Position of the tile in the grid
 */
interface TilePosition {
  rowIdx: number;
  columnIdx: number;
}

/**
 * Props for a single tile
 *
 * - value      : Character shown inside tile
 * - state      : Visual state of the tile
 * - position   : Position of the tile on the grid
 * - className  : Optional to allow parent to tweak grid
 */
interface TileProps {
  value: string;
  state: TileStatus;
  position: TilePosition;
  className?: string;
}

/**
 * Map each TileStatus to a Tailwind class string.
 * Extracted to keep the render function small and easy to follow.
 */
const statusClassMap: Record<TileStatus, string> = {
  empty: "bg-slate-900 border-slate-700 text-slate-100:",
  editing: "bg-slate-800 border-slate-400 text-slate-50",
  correct: "bg-emerald-600 border-emerald-700 text-white",
  present: "bg-amber-500 border-amber-600 text-white",
  absent: "bg-slate-700 border-slate-700 text-slate-300",
};

/**
 * A single Tile in a wordle grid
 *
 * Component only knows how to display a letter + status.
 * No game logic lives here.
 */
const Tile: FC<TileProps> = ({
  value,
  state,
  position,
  className,
}: TileProps) => {
  const classes = [
    // Base layout of tile: Squared with content centered
    "inline-flex h-14 w-14 items-center justify-center",
    "rounded-md border font-bold text-2xl",
    "select-none uppercase tracking-widest",

    // State-based styles
    statusClassMap[state],

    // Optional extra classes from parent
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const displayValue = value.trim().slice(0, 1);

  return (
    <>
      <div
        className={classes}
        data-row={position.rowIdx}
        data-col={position.columnIdx}
        aria-label={`Tile row ${position.rowIdx + 1}, column ${
          position.columnIdx + 1
        }: ${displayValue || "empty"}`}
        role="gridcell"
      >
        {displayValue}
      </div>
    </>
  );
};

export default Tile;
