// src/App.tsx

import type { FC } from "react";
import type { KeyState, KeyType } from "./components/Key";
import Key from "./components/Key";

const App: FC = () => {
  const statuses: KeyState[] = ["idle", "correct", "present", "absent"];

  const letterRow = "QWERTYUIOP".split("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="space-y-4">
        <h1 className="text-center text-lg tracking-[0.2em]">
          KEYBOARD KEY DEMO
        </h1>

        {/* Letter row with all statuses demoed on the first 4 keys */}
        <div className="flex gap-1 justify-center">
          {letterRow.map((letter, index) => {
            const status = statuses[index] ?? "idle";
            return (
              <Key
                key={letter}
                label={letter}
                type={"letter" satisfies KeyType}
                state={status}
              />
            );
          })}
        </div>

        {/* Enter + Backspace examples */}
        <div className="flex gap-2 justify-center">
          <Key label="ENTER" type="return" state="idle" />
          <Key label="⌫" type="delete" state="idle" />
        </div>
      </div>
    </div>
  );
};

export default App;
