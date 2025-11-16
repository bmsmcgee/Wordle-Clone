// src/App.tsx

import type { FC } from "react";
import type { GridRowTile } from "./components/GridRow";
import GridRow from "./components/GridRow";

const WORD_LENGTH = 5;

const App: FC = () => {
  const pastRow: GridRowTile[] = [
    { letter: "R", state: "correct" },
    { letter: "E", state: "present" },
    { letter: "A", state: "absent" },
    { letter: "C", state: "absent" },
    { letter: "T", state: "present" },
  ];

  const currentRow: GridRowTile[] = [
    { letter: "S", state: "editing" },
    { letter: "T", state: "editing" },
    { letter: "A", state: "editing" },
  ]; // last 2 will be padded as empty

  const futureRow: GridRowTile[] = []; // fully empty row

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="space-y-3">
        <GridRow rowIdx={0} tiles={pastRow} wordLength={WORD_LENGTH} />
        <GridRow rowIdx={1} tiles={currentRow} wordLength={WORD_LENGTH} />
        <GridRow rowIdx={2} tiles={futureRow} wordLength={WORD_LENGTH} />
      </div>
    </div>
  );
};

export default App;
