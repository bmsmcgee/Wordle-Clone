import { useEffect } from "react";

/**
 * Handlers for physical keyboard events
 *
 * - onLetter : Called when a letter (A-Z) is pressed
 * - onDelete : Called when Delete is pressed
 * - onReturn : Called when Return is pressed
 */
interface KeyboardHandlers {
  onLetter: (letter: string) => void;
  onDelete?: () => void;
  onReturn?: () => void;
}

/**
 * Key listener to turn physical keyboard events into actions
 */
const useKeyboard = ({
  onLetter,
  onDelete,
  onReturn,
}: KeyboardHandlers): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const target = event.target as HTMLElement | null;

      if (target) {
        const tagName: string = target.tagName;
        const isEditable: boolean =
          tagName === "INPUT" ||
          tagName === "TEXTAREA" ||
          target.isContentEditable;

        if (isEditable) {
          return;
        }
      }

      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const key = event.key;

      if (key === "Enter") {
        if (typeof onReturn === "function") {
          onReturn();
        }
        return;
      }

      if (key === "Backspace") {
        if (typeof onDelete === "function") {
          onDelete();
        }
        return;
      }

      if (key.length === 1 && /[a-z]/i.test(key)) {
        const letter = key.toUpperCase();
        onLetter(letter);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onLetter, onDelete, onReturn]);
};

export default useKeyboard;
