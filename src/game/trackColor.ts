import type { ClassifiedAs } from "./types.ts";

const colors: Record<ClassifiedAs, string> = {
  unclassified: "#f8fafc",
  bandit: "#f87171",
  neutral: "#facc15",
  friendly: "#22d3ee",
};

export function trackColor(classifiedAs: ClassifiedAs): string {
  return colors[classifiedAs];
}
