"use client";

import { useEffect, type RefObject } from "react";
import { heroProgress } from "@/lib/heroProgress";

/**
 * Phones have no pinned timeline, so the shared hero progress is driven by one observer:
 * 0 while the presents card fills the screen (the navbar stays tucked away), 1 after.
 */
export function useMobileHeroProgress(card: RefObject<Element | null>) {
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => heroProgress.set(entry.intersectionRatio > 0.5 ? 0 : 1),
      { threshold: [0, 0.5, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [card]);
}
