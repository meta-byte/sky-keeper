import {
  ATTACK_SPEED,
  BANDIT_SCORE,
  BOGEY_SPEED,
  CENTER,
  COOLDOWN_TICKS,
  DAMAGE,
  DELIVERY_SCORE,
  FLAVOR_LIMIT,
  FRIENDLY_FIRE,
  HIT_RADIUS,
  INBOUND_ARC,
  MAX_HEADING_STEP,
  MISSILE_SPEED,
  NOSE_ARC,
  PLAYER_SPEED,
  SCOPE,
  TRAIL_DISTANCE,
  VIP_ID,
  VIP_SPEED,
  WEAPON_RANGE,
} from "./constants.ts";
import { angleDelta, getBearing, getDistance, inRadar, moveByHeading, trailSlot } from "./math.ts";
import { createId, spawnBogey } from "./spawn.ts";
import type { Bogey, Failure, FlavorLine, GameState, Missile, PlayerFlight, Point, Vip } from "./types.ts";

function isOutside(point: Point): boolean {
  return point.x < 0 || point.y < 0 || point.x > SCOPE || point.y > SCOPE;
}

function leavingRadar(entity: Point & { heading: number }): boolean {
  const dx = entity.x - CENTER;
  const dy = entity.y - CENTER;
  if (inRadar(entity)) return false;
  const rad = (entity.heading * Math.PI) / 180;
  return dx * Math.sin(rad) + dy * -Math.cos(rad) > 0;
}

function closestToPlayer(bogeys: Bogey[], player: PlayerFlight): Bogey {
  return bogeys.reduce((nearest, bogey) =>
    getDistance(player, bogey) < getDistance(player, nearest) ? bogey : nearest,
  );
}

function steerMissile(missile: Missile, vip: Vip, player: PlayerFlight, bogeys: Bogey[]): Missile {
  if (missile.owner === "player") {
    const bogey = bogeys.find((candidate) => candidate.id === missile.targetId);
    if (!bogey) return missile;
    return { ...missile, heading: getBearing(missile, bogey), targetX: bogey.x, targetY: bogey.y };
  }
  const prey = missile.targetId === VIP_ID ? vip : missile.targetId === player.id ? player : null;
  if (!prey) return missile;
  return { ...missile, heading: getBearing(missile, prey), targetX: prey.x, targetY: prey.y };
}

function launch(from: Point, target: Point, owner: Missile["owner"], targetId: string): Missile {
  return {
    id: createId("missile"),
    x: from.x,
    y: from.y,
    targetX: target.x,
    targetY: target.y,
    heading: getBearing(from, target),
    speed: MISSILE_SPEED,
    owner,
    targetId,
  };
}

function addScore(score: number, delta: number): number {
  return score + delta;
}

function note(lines: FlavorLine[], text: string, tone: FlavorLine["tone"]): void {
  lines.push({ id: createId("line"), text, tone });
}

function remember(previous: FlavorLine[], next: FlavorLine[]): FlavorLine[] {
  if (next.length === 0) return previous;
  return [...previous, ...next].slice(-FLAVOR_LIMIT);
}

function turnToward(from: number, to: number): number {
  const delta = angleDelta(from, to);
  const step = Math.max(-MAX_HEADING_STEP, Math.min(MAX_HEADING_STEP, delta));
  return (from + step + 360) % 360;
}

function bogeyAim(bogey: Bogey, vip: Vip, player: PlayerFlight): number {
  if (bogey.trueRole === "bandit") {
    const prey = getDistance(bogey, vip) <= getDistance(bogey, player) ? vip : player;
    return getBearing(bogey, prey);
  }
  const packageBearing = getBearing(bogey, vip);
  const rexBearing = getBearing(bogey, player);
  const offPackage = Math.abs(angleDelta(bogey.heading, packageBearing));
  const offRex = Math.abs(angleDelta(bogey.heading, rexBearing));
  if (offPackage >= INBOUND_ARC && offRex >= INBOUND_ARC) return bogey.heading;
  const threat = offPackage < offRex ? packageBearing : rexBearing;
  const delta = angleDelta(bogey.heading, threat);
  const bend = delta === 0 ? INBOUND_ARC : Math.sign(delta) * INBOUND_ARC;
  return (bogey.heading - bend + 360) % 360;
}

function canShoot(shooter: Point & { heading: number }, target: Point): boolean {
  const offNose = Math.abs(angleDelta(shooter.heading, getBearing(shooter, target)));
  return getDistance(shooter, target) <= WEAPON_RANGE && offNose <= NOSE_ARC;
}

function flyTrail(player: PlayerFlight, vip: Vip): PlayerFlight {
  const slot = trailSlot(vip, TRAIL_DISTANCE);
  const distanceToSlot = getDistance(player, slot);
  if (distanceToSlot <= 1 && Math.abs(angleDelta(player.heading, vip.heading)) <= MAX_HEADING_STEP) {
    return {
      ...player,
      x: slot.x,
      y: slot.y,
      heading: turnToward(player.heading, vip.heading),
      targetId: null,
    };
  }

  const toSlot = getBearing(player, slot);
  const heading = turnToward(player.heading, toSlot);
  const aimed = Math.abs(angleDelta(heading, toSlot)) <= MAX_HEADING_STEP;
  const step = aimed ? Math.min(PLAYER_SPEED, distanceToSlot) : PLAYER_SPEED;
  return {
    ...moveByHeading({ ...player, heading }, step),
    targetId: null,
  };
}

function flyEscort(player: PlayerFlight, vip: Vip, bogeys: Bogey[]): PlayerFlight {
  if (leavingRadar(vip)) return flyTrail(player, vip);
  const threats = bogeys.filter((bogey) => bogey.classifiedAs === "bandit" && inRadar(bogey));
  const leadBogey = threats.length > 0 ? closestToPlayer(threats, player) : null;
  if (leadBogey) return engageBandit(player, leadBogey);
  return flyTrail(player, vip);
}

function engageBandit(player: PlayerFlight, bandit: Bogey): PlayerFlight {
  const heading = turnToward(player.heading, getBearing(player, bandit));
  const speed = getDistance(player, bandit) > WEAPON_RANGE ? ATTACK_SPEED : BOGEY_SPEED;
  return {
    ...moveByHeading({ ...player, heading }, speed),
    targetId: bandit.id,
  };
}

export function tick(state: GameState): GameState {
  if (state.failure) return state;

  const vipMoved = moveByHeading(state.vip, VIP_SPEED);
  let player: PlayerFlight = {
    ...state.player,
    cooldown: Math.max(0, state.player.cooldown - 1),
  };
  let bogeys = state.bogeys.map((bogey) => {
    const heading = turnToward(bogey.heading, bogeyAim(bogey, vipMoved, player));
    return {
      ...moveByHeading({ ...bogey, heading }, BOGEY_SPEED),
      cooldown: Math.max(0, bogey.cooldown - 1),
    };
  });
  let missiles = state.missiles
    .map((missile) => steerMissile(missile, vipMoved, player, bogeys))
    .map((missile) => moveByHeading(missile, missile.speed))
    .filter((missile) => !isOutside(missile));

  const stillInside: Bogey[] = [];
  let replacements = 0;
  let selectedId = state.selectedId;
  for (const bogey of bogeys) {
    if (leavingRadar(bogey)) {
      replacements += 1;
      if (selectedId === bogey.id) selectedId = null;
    } else {
      stillInside.push(bogey);
    }
  }
  bogeys = stillInside;
  for (let index = 0; index < replacements; index += 1) {
    bogeys.push(spawnBogey(undefined, { vip: vipMoved, escort: player }));
  }

  player = flyEscort(player, vipMoved, bogeys);

  const fired: Missile[] = [];
  if (player.targetId && player.cooldown === 0) {
    const target = bogeys.find((bogey) => bogey.id === player.targetId);
    if (target && canShoot(player, target)) {
      fired.push(launch(player, target, "player", target.id));
      player = { ...player, cooldown: COOLDOWN_TICKS };
    }
  }

  bogeys = bogeys.map((bogey) => {
    if (bogey.trueRole !== "bandit" || bogey.classifiedAs !== "unclassified" || bogey.cooldown !== 0) {
      return bogey;
    }
    if (canShoot(bogey, vipMoved)) {
      fired.push(launch(bogey, vipMoved, "enemy", VIP_ID));
      return { ...bogey, cooldown: COOLDOWN_TICKS };
    }
    if (canShoot(bogey, player)) {
      fired.push(launch(bogey, player, "enemy", player.id));
      return { ...bogey, cooldown: COOLDOWN_TICKS };
    }
    return bogey;
  });
  missiles = [...missiles, ...fired];

  let vip = vipMoved;
  let score = state.score;
  const spent = new Set<string>();
  const killed = new Set<string>();
  const lines: FlavorLine[] = [];
  let vipHitByEnemy = false;
  let rexHit = false;

  for (const missile of missiles) {
    if (missile.owner === "player") {
      const bogey = bogeys.find((candidate) => candidate.id === missile.targetId);
      if (bogey && getDistance(missile, bogey) <= HIT_RADIUS) {
        spent.add(missile.id);
        killed.add(bogey.id);
        if (bogey.trueRole === "bandit") {
          score = addScore(score, BANDIT_SCORE);
          note(lines, `REX, SPLASH ${bogey.name}`, "good");
        } else if (bogey.trueRole === "friendly") {
          score = addScore(score, FRIENDLY_FIRE);
          note(lines, `REX, BLUE ON BLUE, ${bogey.name}`, "bad");
        } else {
          note(lines, `REX, ${bogey.name} DOWN, NO JOY`, "warn");
        }
      }
      if (getDistance(missile, vip) <= HIT_RADIUS) {
        spent.add(missile.id);
        vip = { ...vip, health: vip.health - DAMAGE };
        score = addScore(score, FRIENDLY_FIRE);
        note(lines, "CHECK FIRE, PACKAGE HIT", "bad");
      }
    } else if (missile.targetId === VIP_ID && getDistance(missile, vip) <= HIT_RADIUS) {
      spent.add(missile.id);
      vip = { ...vip, health: vip.health - DAMAGE };
      vipHitByEnemy = true;
    } else if (missile.targetId === player.id && getDistance(missile, player) <= HIT_RADIUS) {
      spent.add(missile.id);
      player = { ...player, health: player.health - DAMAGE };
      rexHit = true;
    }
  }

  if (killed.size > 0) {
    bogeys = bogeys.filter((bogey) => !killed.has(bogey.id));
    if (player.targetId && killed.has(player.targetId)) player = { ...player, targetId: null };
    if (selectedId && killed.has(selectedId)) selectedId = null;
    for (let index = 0; index < killed.size; index += 1) {
      bogeys.push(spawnBogey(undefined, { vip, escort: player }));
    }
  }
  missiles = missiles.filter((missile) => !spent.has(missile.id));

  let failure: Failure = null;
  if (vip.health <= 0) {
    failure = "package-lost";
    note(lines, "PACKAGE LOST", "bad");
  } else if (vipHitByEnemy) {
    note(lines, "PACKAGE TAKING FIRE", "warn");
  }
  if (player.health <= 0) {
    if (!failure) failure = "escort-down";
    note(lines, "REX IS DOWN", "bad");
  } else if (rexHit) {
    note(lines, "REX IS HIT", "warn");
  }
  const spoken = remember(state.lines, lines);
  if (failure) {
    return { vip, player, bogeys, missiles, score, selectedId, failure, lines: spoken };
  }

  if (leavingRadar(vip) && leavingRadar(player)) {
    note(lines, "VIP AND REX CLEAR", "good");
    return {
      vip,
      player,
      bogeys,
      missiles,
      score: addScore(score, DELIVERY_SCORE),
      selectedId,
      failure: "delivered",
      lines: remember(state.lines, lines),
    };
  }

  return { vip, player, bogeys, missiles, score, selectedId, failure: null, lines: spoken };
}
