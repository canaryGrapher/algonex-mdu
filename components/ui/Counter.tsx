"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Format with Indian digit grouping (1,40,000). */
  grouped?: boolean;
  className?: string;
};

/** Counts up from zero the first time it scrolls into view. */
export default function Counter({ value, prefix = "", suffix = "", grouped = false, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => (grouped ? Math.round(n).toLocaleString("en-IN") : String(Math.round(n)));

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const state = { n: 0 };
    gsap.to(state, {
      n: value,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: () => {
        el.textContent = `${prefix}${format(state.n)}${suffix}`;
      },
    });
  });

  return (
    <span ref={ref} className={className}>
      {`${prefix}${format(value)}${suffix}`}
    </span>
  );
}
