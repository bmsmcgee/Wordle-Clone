import type { FC } from "react";
import type { TileStatus } from "./Tile";
import Tile from "./Tile";

/**
 * Data for a single tile in a row
 *
 * - letter : The displayed character
 * - state  : Visual state of the Tile
 */
export interface GridRowTile {
  letter: string;
  state: TileStatus;
}

/**
 * Props used for a single row of tiles
 *
 * - rowIdx     : Index to indicate which row in the grid
 * - tiles      : List of tiles in the row
 * - wordLength : How many tiles the row contains
 * - className  : Optional so parent can adjust
 */
interface GridRowProps {
  rowIdx: number;
  tiles: GridRowTile[];
  wordLength: number;
  className?: string;
}

/**
 * A single grid row composed of multiple tile components.
 *
 * This component does not decide states of the tiles and does not manage input.
 * It only knows how to arrange the tiles.
 */
const GridRow: FC<GridRowProps> = ({
  rowIdx,
  tiles,
  wordLength,
  className,
}: GridRowProps) => {
  // Always render exactly 'wordLength' tiles
  //  - If fewer tiles, pad with empty ones
  //  - If too many, slice off extras
  const paddedTiles: GridRowTile[] = Array.from(
    { length: wordLength },
    (_unused, columnIdx) => {
      const existingTile = tiles[columnIdx];

      if (existingTile != null) {
        return existingTile;
      }

      // Default tile when nothing is provided
      return {
        letter: "",
        state: "empty",
      };
    }
  );

  const rowClasses = [
    // Layout of row with spacing
    "flex gap-2 justify-center",

    // Optional extra classes from parent
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div
        className={rowClasses}
        role="row"
        data-row={rowIdx}
        aria-label={`Grid row ${rowIdx + 1}`}
      >
        {paddedTiles.map((tile, columnIdx) => (
          <Tile
            key={`${rowIdx}-${columnIdx}`}
            value={tile.letter}
            state={tile.state}
            position={{ rowIdx, columnIdx }}
          />
        ))}
      </div>
    </>
  );
};

export default GridRow;
