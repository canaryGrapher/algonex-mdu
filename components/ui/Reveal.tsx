"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Selector for children to stagger. Defaults to direct children. */
  items?: string;
  stagger?: number;
  y?: number;
};

/** Fades and lifts its children in as the block enters the viewport. */
export default function Reveal({ children, className = "", items = ":scope > *", stagger = 0.08, y = 40 }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = root.current?.querySelectorAll(items);
      if (!targets?.length) return;
      gsap.from(targets, {
        y,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
