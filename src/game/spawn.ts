import {
  CENTER,
  INBOUND_ARC,
  INITIAL_BOGEYS,
  PLAYER_ID,
  RADAR_RADIUS,
  SCOPE,
  START_HEALTH,
  TRAIL_DISTANCE,
  VIP_ID,
} from "./constants.ts";
import { angleDelta, getBearing, getDistance, trailSlot } from "./math.ts";
import type { Bogey, FlavorLine, GameState, Point, TrueRole, Vip } from "./types.ts";
import { pickTarget } from "../targets.ts";

const mixedRoles: TrueRole[] = ["bandit", "neutral", "friendly", "bandit", "friendly"];

let serial = 0;

export function createId(prefix: string): string {
  serial += 1;
  return `${prefix}-${serial}`;
}

function altitude(): number {
  return 12000 + Math.floor(Math.random() * 18) * 1000;
}

export function rimPoint(): Point {
  const side = Math.floor(Math.random() * 4);
  const along = Math.random() * SCOPE;
  if (side === 0) return { x: along, y: 0 };
  if (side === 1) return { x: SCOPE, y: along };
  if (side === 2) return { x: along, y: SCOPE };
  return { x: 0, y: along };
}

function interiorPoint(): Point {
  const margin = 80;
  return {
    x: margin + Math.random() * (SCOPE - margin * 2),
    y: margin + Math.random() * (SCOPE - margin * 2),
  };
}

type Focus = {
  vip: Point;
  escort: Point;
};

function misses(at: Point, heading: number, mark: Point): boolean {
  return Math.abs(angleDelta(heading, getBearing(at, mark))) >= INBOUND_ARC;
}

function transitHeading(at: Point, focus: Focus): number {
  let heading = getBearing(at, interiorPoint());
  for (let step = 0; step < 9; step += 1) {
    if (misses(at, heading, focus.vip) && misses(at, heading, focus.escort)) return heading;
    heading = (heading + 40) % 360;
  }
  return heading;
}

function interceptHeading(at: Point, focus: Focus): number {
  const prey = getDistance(at, focus.vip) <= getDistance(at, focus.escort) ? focus.vip : focus.escort;
  return getBearing(at, prey);
}

export function spawnBogey(trueRole?: TrueRole, focus?: Focus): Bogey {
  const at = rimPoint();
  const role = trueRole ?? mixedRoles[Math.floor(Math.random() * mixedRoles.length)] ?? "neutral";
  let heading = getBearing(at, interiorPoint());
  if (focus) heading = role === "bandit" ? interceptHeading(at, focus) : transitHeading(at, focus);
  return {
    id: createId("bogey"),
    name: pickTarget().name,
    x: at.x,
    y: at.y,
    heading,
    trueRole: role,
    classifiedAs: "unclassified",
    altitude: altitude(),
    cooldown: 0,
  };
}

export function spawnVip(): Vip {
  const heading = Math.random() * 360;
  const radius = RADAR_RADIUS - TRAIL_DISTANCE - 16;
  const rad = (heading * Math.PI) / 180;
  return {
    id: VIP_ID,
    name: "PACKAGE",
    x: CENTER - radius * Math.sin(rad),
    y: CENTER + radius * Math.cos(rad),
    heading,
    health: START_HEALTH,
    altitude: altitude(),
  };
}

export function createInitialState(): GameState {
  const vip = spawnVip();
  const slot = trailSlot(vip, TRAIL_DISTANCE);
  return {
    vip,
    player: {
      id: PLAYER_ID,
      x: slot.x,
      y: slot.y,
      heading: vip.heading,
      health: START_HEALTH,
      targetId: null,
      cooldown: 0,
    },
    bogeys: mixedRoles.slice(0, INITIAL_BOGEYS).map((role) =>
      spawnBogey(role, { vip, escort: { x: slot.x, y: slot.y } }),
    ),
    missiles: [],
    score: 0,
    selectedId: null,
    failure: null,
    lines: [openingLine()],
  };
}

function openingLine(): FlavorLine {
  return { id: createId("line"), text: "SORTIE START, REX IN TRAIL", tone: "good" };
}
