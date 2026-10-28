"use client";

import { useRef } from "react";
import type { JudgingStage } from "@/lib/types";
import { gsap, useGSAP } from "@/lib/gsap";

/** Criteria list for one stage with weight bars that fill on mount. */
export default function StageCriteria({ stage }: { stage: JudgingStage }) {
  const root = useRef<HTMLUListElement>(null);
  const max = Math.max(...stage.criteria.map((c) => c.weight));

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.from(q(".sc-row"), { opacity: 0, x: 30, duration: 0.6, stagger: 0.05, ease: "power3.out" });
      gsap.from(q(".sc-bar"), { scaleX: 0, duration: 1.1, stagger: 0.05, ease: "expo.out", delay: 0.1 });
    },
    { scope: root },
  );

  return (
    <ul ref={root} role="tabpanel" className="space-y-5">
      {stage.criteria.map((c) => (
        <li key={c.name} className="sc-row">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <span className="text-white">{c.name}</span>
            <span className="font-mono text-sm text-lilac">{c.weight}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="sc-bar h-full origin-left rounded-full bg-gradient-to-r from-indigo via-violet to-lilac"
              style={{ width: `${(c.weight / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
