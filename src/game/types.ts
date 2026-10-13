export type Point = {
  x: number;
  y: number;
};

export type TrueRole = "bandit" | "neutral" | "friendly";

export type ClassifiedAs = "unclassified" | TrueRole;

export type Failure = "package-lost" | "escort-down" | "delivered" | null;

export type FlavorTone = "good" | "bad" | "warn";

export type FlavorLine = {
  id: string;
  text: string;
  tone: FlavorTone;
};

export type Vip = {
  id: string;
  name: string;
  x: number;
  y: number;
  heading: number;
  health: number;
  altitude: number;
};

export type PlayerFlight = {
  id: string;
  x: number;
  y: number;
  heading: number;
  health: number;
  targetId: string | null;
  cooldown: number;
};

export type Bogey = {
  id: string;
  name: string;
  x: number;
  y: number;
  heading: number;
  trueRole: TrueRole;
  classifiedAs: ClassifiedAs;
  altitude: number;
  cooldown: number;
};

export type Missile = {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  heading: number;
  speed: number;
  owner: "player" | "enemy";
  targetId: string;
};

export type GameState = {
  vip: Vip;
  player: PlayerFlight;
  bogeys: Bogey[];
  missiles: Missile[];
  score: number;
  selectedId: string | null;
  failure: Failure;
  lines: FlavorLine[];
};

export type Action =
  | { type: "tick" }
  | { type: "select"; id: string }
  | { type: "classify"; id: string; role: ClassifiedAs }
  | { type: "reset" };
