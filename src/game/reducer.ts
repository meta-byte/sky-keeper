import { createInitialState } from "./spawn.ts";
import { tick } from "./tick.ts";
import type { Action, GameState } from "./types.ts";

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "tick":
      return state.failure ? state : tick(state);
    case "select":
      return { ...state, selectedId: action.id };
    case "classify":
      return {
        ...state,
        bogeys: state.bogeys.map((bogey) =>
          bogey.id === action.id ? { ...bogey, classifiedAs: action.role } : bogey,
        ),
      };
    case "reset":
      return createInitialState();
  }
}
