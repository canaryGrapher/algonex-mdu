"use client";

import { useRef } from "react";
import { judging } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";

const tints = ["from-indigo to-violet", "from-violet to-lilac", "from-lilac to-ice"];

/** Stacked bar showing how the three on-site sessions add up to the final score. */
export default function ScoreSplit() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(gsap.utils.selector(root)(".ss-seg"), {
        scaleX: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: "expo.inOut",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <p className="kicker mb-4">Final score</p>
      <div className="flex h-24 w-full gap-1.5 sm:h-28">
        {judging.aggregation.map((a, i) => (
          <div
            key={a.stage}
            style={{ width: `${a.share}%` }}
            className={`ss-seg flex origin-left flex-col justify-end rounded-2xl bg-gradient-to-br p-4 ${tints[i]}`}
          >
            <span className="font-display text-2xl font-black text-white sm:text-4xl">{a.share}%</span>
            <span className="truncate text-xs font-semibold text-white/80">{a.stage}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-ice/55">{judging.aggregationNote}</p>
    </div>
  );
}
