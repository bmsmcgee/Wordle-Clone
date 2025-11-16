import type { FC, ReactNode } from "react";

/**
 * Type of key
 *
 * - "letter" : A-Z key
 * - "return" : The return key
 * - "delete" : The delete key
 */
export type KeyType = "letter" | "return" | "delete";

/**
 * Visual states of keys
 *
 * - "idle"     : default, key not evaluated
 * - "correct"  : letter is confirmed correct
 * - "present"  : letter is in the word but incorrect position
 * - "absent"   : letter is not in the word
 */
export type KeyState = "idle" | "correct" | "present" | "absent";

/**
 * Props for key
 *
 * - label      : What is displayed inside the key
 * - type       : Semantic type of the key
 * - state      : Visual state for colouring
 * - className  : Optional
 */
interface KeyProps {
  label: ReactNode;
  type: KeyType;
  state: KeyState;
  className?: string;
}

/**
 * Map visual states to Tailwind classes for ease
 */
const stateClassMap: Record<KeyState, string> = {
  idle: "bg-slate-700 text-slate-50 border-slate-700 hover:bg-slate-600 hover:border-slate-500",
  correct: "bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-500",
  present: "bg-amber-500 text-white border-amber-600 hover:bg-amber-400",
  absent: "bg-slate-800 text-slate-400 border-slate-800",
};

/**
 * Map the key types to size styles
 */
const typeClassMap: Record<KeyType, string> = {
  letter: "px-3 py-3 min-w-[2.25rem]",
  return: "px-5 py-3 min-w-[3.5rem] text-xs",
  delete: "px-5 py-3 min-w-[3.5rem] text-xs",
};

/**
 * On-screen key for the keyboard
 */
const Key: FC<KeyProps> = ({
  label,
  type,
  state = "idle",
  className,
}: KeyProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md border text-sm font-semibold select-none uppercase transition-colors duration-150";

  const combinedClasses = [
    baseClasses,
    typeClassMap[type],
    stateClassMap[state],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <>
      <div
        className={combinedClasses}
        role="button"
        aria-label={typeof label === "string" ? `Key ${label}` : "Keyboard key"}
      >
        {label}
      </div>
    </>
  );
};

export default Key;
