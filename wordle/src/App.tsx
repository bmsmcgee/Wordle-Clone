// src/App.tsx

import type { FC } from "react";
import Tile, { type TileStatus } from "./components/Tile";

const App: FC = () => {
  const exampleStatuses: TileStatus[] = [
    "empty",
    "editing",
    "correct",
    "present",
    "absent",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="space-y-4">
        <h1 className="text-center text-2xl font-semibold tracking-[0.2em]">
          TILE DEMO
        </h1>

        <div className="flex gap-2 justify-center">
          {exampleStatuses.map((state, idx) => (
            <Tile
              key={state}
              value={state === "empty" ? "" : String.fromCharCode(65 + idx)}
              state={state}
              position={{ rowIdx: 0, columnIdx: idx }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
