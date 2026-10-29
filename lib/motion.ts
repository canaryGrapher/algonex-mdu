import { PHONE_QUERY } from "./hooks";

/** Non-reactive phone check for use inside GSAP setup code (client only). */
export function isPhone(): boolean {
  return typeof window !== "undefined" && window.matchMedia(PHONE_QUERY).matches;
}

/** Shrinks travel distances on phones so animations feel in proportion to the screen. */
export const travel = (px: number): number => (isPhone() ? Math.round(px * 0.45) : px);
