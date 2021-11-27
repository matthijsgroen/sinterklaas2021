import { CreatureType } from "./types";

export const modifier = (from: CreatureType, to: CreatureType): number =>
  isStrongFor(from, to) ? 1.2 : isWeakFor(from, to) ? 0.8 : 1.0;

export const isStrongFor = (from: CreatureType, to: CreatureType): boolean =>
  (from === "shoe" && to === "bag") ||
  (from === "bag" && to === "rod") ||
  (from === "rod" && to === "shoe");

export const isWeakFor = (from: CreatureType, to: CreatureType): boolean =>
  (from === "shoe" && to === "rod") ||
  (from === "rod" && to === "bag") ||
  (from === "bag" && to === "shoe");
