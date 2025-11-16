import type { FC } from "react";
import type { KeyState, KeyType } from "./Key";
import Key from "./Key";

/**
 * Representation of a key on the keyboard
 *
 * - label  : Text inside the key
 * - code   : Key identifier
 * - type   : Key semantic
 */
export interface KeyboardKey {
  label: string;
  code: string;
  type: KeyType;
}

/**
 * Single row of keys on the keyboard
 */

export type KeyboardRow = KeyboardKey[];

/**
 * Props for the full keyboard
 *
 * - keyStates  : Map of key "code"
 * - className  : Optional extra className
 */
interface KeyboardProps {
  keyStates: Partial<Record<string, KeyState>>;
  className?: string;
}

/**
 * Fixed QWERTY layout
 */
const KEYBOARD_LAYOUT: KeyboardRow[] = [
  [
    { label: "Q", code: "Q", type: "letter" },
    { label: "W", code: "W", type: "letter" },
    { label: "E", code: "E", type: "letter" },
    { label: "R", code: "R", type: "letter" },
    { label: "T", code: "T", type: "letter" },
    { label: "Y", code: "Y", type: "letter" },
    { label: "U", code: "U", type: "letter" },
    { label: "I", code: "I", type: "letter" },
    { label: "O", code: "O", type: "letter" },
    { label: "P", code: "P", type: "letter" },
  ],
  [
    { label: "A", code: "A", type: "letter" },
    { label: "S", code: "S", type: "letter" },
    { label: "D", code: "D", type: "letter" },
    { label: "F", code: "F", type: "letter" },
    { label: "G", code: "G", type: "letter" },
    { label: "H", code: "H", type: "letter" },
    { label: "J", code: "J", type: "letter" },
    { label: "K", code: "K", type: "letter" },
    { label: "L", code: "L", type: "letter" },
  ],
  [
    { label: "RETURN", code: "RETURN", type: "return" },
    { label: "Z", code: "Z", type: "letter" },
    { label: "X", code: "X", type: "letter" },
    { label: "C", code: "C", type: "letter" },
    { label: "V", code: "V", type: "letter" },
    { label: "B", code: "B", type: "letter" },
    { label: "N", code: "N", type: "letter" },
    { label: "M", code: "M", type: "letter" },
    { label: "⌫", code: "⌫", type: "delete" },
  ],
];

const Keyboard: FC<KeyboardProps> = ({
  keyStates,
  className,
}: KeyboardProps) => {
  const containerClasses = ["space-y-2", className].filter(Boolean).join(" ");

  return (
    <>
      <div className={containerClasses} aria-label="On Screen Keyboard">
        {KEYBOARD_LAYOUT.map((row: KeyboardRow, rowIdx: number) => (
          <div key={rowIdx} className="flex justify-center gap-1">
            {row.map((keyDef: KeyboardKey) => {
              const state: KeyState = keyStates?.[keyDef.code] ?? "idle";

              return (
                <Key
                  key={keyDef.code}
                  label={keyDef.label}
                  type={keyDef.type}
                  state={state}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Keyboard;
