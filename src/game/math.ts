import { CENTER, RADAR_RADIUS } from "./constants.ts";
import type { Point } from "./types.ts";

export function inRadar(point: Point): boolean {
  return Math.hypot(point.x - CENTER, point.y - CENTER) <= RADAR_RADIUS;
}

export function getDistance(origin: Point, target: Point): number {
  return Math.hypot(target.x - origin.x, target.y - origin.y);
}

export function angleDelta(from: number, to: number): number {
  return ((to - from + 540) % 360) - 180;
}

export function getBearing(origin: Point, target: Point): number {
  const degrees = Math.atan2(target.x - origin.x, -(target.y - origin.y)) * (180 / Math.PI);
  return (degrees + 360) % 360;
}

export function moveByHeading<T extends Point & { heading: number }>(entity: T, speed: number): T {
  const rad = (entity.heading * Math.PI) / 180;
  return {
    ...entity,
    x: entity.x + speed * Math.sin(rad),
    y: entity.y - speed * Math.cos(rad),
  };
}

export function trailSlot(origin: Point & { heading: number }, distance: number): Point {
  const rad = (origin.heading * Math.PI) / 180;
  return {
    x: origin.x - distance * Math.sin(rad),
    y: origin.y + distance * Math.cos(rad),
  };
}
