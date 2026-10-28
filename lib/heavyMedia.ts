/**
 * Decides whether multi-megabyte animations should be downloaded at all.
 * Skipped for visitors who asked for less data or less motion, or are on a very slow network.
 */
type NetworkInfo = { saveData?: boolean; effectiveType?: string };

export function shouldSkipHeavyMedia(): boolean {
  if (typeof window === "undefined") return true;

  const connection = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (connection?.saveData) return true;
  if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return true;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
