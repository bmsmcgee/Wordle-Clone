# Wordle Clone

A fully-typed Wordle clone built with **Vite**, **React**, **TypeScript**, and **Tailwind CSS**.

The game implements the classic Wordle rules:
- 5-letter hidden word
- Upt to 6 guesses
- Coloured tiles show accuracy (`correct`, `present`, `absent`)
- Toast messages for feedback
- Win / loss state with "New Game" reset

---

## Features

### Modern Stack
- Vite + React + TypeScript
- Tailwind CSS for styling

### Wordle-Style Gameplay
- 5-letter words, 6 attempts
- Official-style word lists:
  - Solution list
  - Allowed guesses list (valid word checking)

### Keyboard Support
- On-screen keyboard with letter, Return, and Delete keys
- Physical keyboard input via a custom `useKeyboard` hook
- Keys coloured based on known information (correct > present > absent)

### Grid UI
- Tile, Row, and Grid components with explicit types
- "Editing" row for the current guess

### Game Logic Separated from UI
- Pure functions for evaluating guesses
- Separate game config and row builders

### UX Niceties
- Centered Toast messages that auto-dismiss
- Row cleared when guess is invalid
- "New Game" button that resets the puzzle with new word

---

## Tech Stack

### Frontend
- React
- TypeScript

### Build Tool
- Vite

### Styling
- Tailwind CSS

### State Management
- React hooks (no external state library)

---

## Getting Started

### Prerequisites
- Node.js
- npm, pnmpn, or yarn

### 1. Clone the Repo

```bash
git clone https://github.com/bmsmcgee/Wordle-Clone.git
cd wordle
```

### 2. Install Dependencies

```bash
npm install
# or
pnmpn install
# or
yarn install
```

### 3. Run the `dev` Server

``` bash
npm run build
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

### 4. Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## Project Structure

High-level structure

```text
src/
  components/
    Key.tsx           # Single keyboard key (visual + click handler hook)
    Keyboard.tsx      # On-screen keyboard layout
    Tile.tsx          # Single grid tile
    WordleGrid.tsx    # Grid composed of rows + tiles
    Toast.tsx         # Centered translucent toast component

  data/
    wordSource.ts               # Loads word lists and helpers (getRandomWord, isValidGuess)
    shuffled_real_wordles.txt   # Solution words (bundled via ?raw)
    allowed_guesses.txt         # Allowed guess list (bundled via ?raw)

  game/
    config.ts         # WORD_LENGTH, MAX_GUESS, GameStatus type
    rows.ts           # buildCommittedRow, buildEditingRow helpers

  hooks/
    useKeyboard.ts    # Physical keyboard listener (letters, Backspace, Enter)

  gameLogic.ts        # evaluateGuessState, buildKeyboardMap (pure game logic)
  App.tsx             # Top-level game wiring (state, handlers, layout)
  main.tsx            # React root 
```

---

## Development Notes

This project isn’t just a visual clone of Wordle, it was structured to reflect how I approach frontend architecture in a real codebase.

### 1. Separation of UI and game logic

The core game rules live outside of React components:

- `gameLogic.ts` handles:
  - Evaluating guesses (`evaluateGuessState`)
  - Building the keyboard state map (`buildKeyboardMap`)
- Components like `WordleGrid`, `Keyboard`, and `Key` are **pure** and only depend on props.

This makes the UI easy to reason about and keeps the game logic reusable and testable.

### 2. Typed, modular game state

Game configuration and types are centralized:

- `game/config.ts` defines:
  - `WORD_LENGTH`, `MAX_GUESS`
  - `GameStatus` (`"playing" | "won" | "lost"`)

Row construction is abstracted into helpers:

- `game/rows.ts` exposes:
  - `buildCommittedRow(guess, solution)`
  - `buildEditingRow(guess)`

`App.tsx` then focuses on *state orchestration* instead of low-level tile details.

### 3. Clear input pipeline (on-screen + physical keyboard)

Keyboard handling is unified:

- On-screen keyboard:
  - `Keyboard` + `Key` components emit `onLetterClick`, `onDeleteClick`, and `onReturnClick`.
- Physical keyboard:
  - `useKeyboard` hook listens to `keydown` and forwards to the same handlers.

Both input methods go through the same code paths, which reduces duplication and potential bugs.

### 4. Word list handling and validation

The game uses two word lists:

- **Solution list**: words that can be chosen as the hidden answer.
- **Allowed guesses list**: larger set of valid guesses.

These are:

- Bundled at build time using Vite’s `?raw` imports in `data/wordSource.ts`.
- Normalized to uppercase and cached as Sets for quick O(1) lookup.
- Exposed via:
  - `getRandomWord()` – select a random solution.
  - `isValidGuess(guess)` – validate guesses before committing.

Invalid guesses trigger a toast and clear the row so the player can retry immediately.

### 5. UX details and state lifecycle

- **Toasts**  
  - `<Toast />` is a pure visual component.
  - `App.tsx` owns `message` state and an effect that auto-clears it after a short delay.
  - Toast styling varies by context (`info`, `success`, `error`).

- **Game lifecycle**  
  - `GameStatus` controls whether input is accepted:
    - `"playing"` $\rightarrow$ accepts input.
    - `"won"` / `"lost"` $\rightarrow$ input ignored until “New Game”.
  - `handleResetGame` resets solution, guesses, current guess, status, and message in a single place.

### 6. Design Choice

Current design choices:

- Kept to a **single-page game** to keep the focus on clean React state and logic.
- No external state management libraries: `useState` and custom hooks are enough at this scale.

Overall, this project is meant to demonstrate how I structure a small but complete React app:
- strongly typed,
- modular,
- and with a clear separation between **presentation**, **state**, and **domain logic**.