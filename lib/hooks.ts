"use client";

import { useEffect, useState } from "react";

/**
 * Tracks a media query. Returns null until the browser has been checked, so callers
 * can wait instead of acting on a guessed value (which caused double downloads).
 */
export function useMatchMedia(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Same as useMatchMedia, but treats "not checked yet" as false. */
export function useMediaQuery(query: string): boolean {
  return useMatchMedia(query) ?? false;
}

const PORTRAIT_QUERY = "(max-aspect-ratio: 1/1)";

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/** True when the viewport is taller than it is wide (uses the 9:16 assets). */
export const usePortrait = () => useMediaQuery(PORTRAIT_QUERY);

/** Like usePortrait, but null until known. Use it before picking which asset to download. */
export const usePortraitState = () => useMatchMedia(PORTRAIT_QUERY);
