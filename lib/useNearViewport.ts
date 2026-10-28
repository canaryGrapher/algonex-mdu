"use client";

import { useEffect, useState } from "react";

/**
 * Becomes true once the element is within `margin` of the viewport, and stays true.
 * Lets heavy assets wait when the page opens scrolled away (for example a #faq link).
 */
export function useNearViewport(ref: React.RefObject<Element | null>, margin = "100% 0px"): boolean {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (near || !el) return;
    if (typeof IntersectionObserver === "undefined") return setNear(true);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNear(true);
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);

  return near;
}
