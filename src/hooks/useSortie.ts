import { useEffect, useReducer, useState } from "react";
import { TICK_MS } from "../game/constants.ts";
import { reducer } from "../game/reducer.ts";
import { createInitialState } from "../game/spawn.ts";
import type { ClassifiedAs } from "../game/types.ts";

const SPEEDS = [0.5, 1, 2, 4] as const;

export function useSortie() {
  const [state, dispatch] = useReducer(reducer, null, createInitialState);
  const [paused, setPaused] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);
  const speed = SPEEDS[speedIndex] ?? 1;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      dispatch({ type: "tick" });
    }, TICK_MS / speed);
    return () => window.clearInterval(id);
  }, [paused, speed]);

  return {
    state,
    paused,
    speed,
    canSlow: speedIndex > 0,
    canSpeed: speedIndex < SPEEDS.length - 1,
    togglePause: () => setPaused((current) => !current),
    slower: () => setSpeedIndex((index) => Math.max(0, index - 1)),
    faster: () => setSpeedIndex((index) => Math.min(SPEEDS.length - 1, index + 1)),
    select: (id: string) => dispatch({ type: "select", id }),
    classify: (id: string, role: ClassifiedAs) => dispatch({ type: "classify", id, role }),
    reset: () => {
      setPaused(false);
      dispatch({ type: "reset" });
    },
  };
}
