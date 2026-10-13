import { CENTER } from "./constants.ts";
import { getBearing, getDistance } from "./math.ts";
import type { Bogey, GameState, Vip } from "./types.ts";

const awacs = { x: CENTER, y: CENTER };

export type Bra = {
  bearing: number;
  range: number;
  altitude: number;
};

export function selectedTrack(state: GameState): Vip | Bogey | null {
  if (state.selectedId === state.vip.id) return state.vip;
  return state.bogeys.find((bogey) => bogey.id === state.selectedId) ?? null;
}

export function bra(state: GameState): Bra | null {
  const track = selectedTrack(state);
  if (!track) return null;
  return {
    bearing: getBearing(awacs, track),
    range: getDistance(state.player, track),
    altitude: track.altitude,
  };
}

export function isBogey(track: Vip | Bogey): track is Bogey {
  return "classifiedAs" in track;
}
