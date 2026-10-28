"use client";

import { useImperativeHandle, useRef } from "react";
import { event } from "@/lib/data";
import { HERO_MARKS, heroProgress } from "@/lib/heroProgress";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ProgressHandle } from "./types";

type Props = { ref: React.Ref<ProgressHandle> };

/**
 * Text that rides on top of the video, timed to its scenes (progress is 0 to 1 of the clip):
 *  0.00 to 0.12  title card over the coder at the desk
 *  0.40 to 0.60  "Ideas to product" while the camera pushes into the code
 *  0.63 to 0.75  "Make it real" through the hyperspace warp
 * The final logo frames are left clean so the video's own logo carries the moment.
 */
export default function HeroCaptions({ ref }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const scrub = useRef<gsap.core.Timeline | null>(null);

  useImperativeHandle(ref, () => ({
    setProgress: (p) => scrub.current?.progress(p),
  }));

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      // The title card appears as the "presents" card dissolves, not on page load.
      gsap.set(q(".cap-title > *"), { y: 40, opacity: 0, filter: "blur(10px)" });
      let revealed = false;
      const reveal = (p: number) => {
        if (revealed || p < HERO_MARKS.presentsEnd * 0.4) return;
        revealed = true;
        gsap.to(q(".cap-title > *"), {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, stagger: 0.1, ease: "expo.out",
        });
      };
      reveal(heroProgress.get());
      const off = heroProgress.subscribe(reveal);

      const inOut = (sel: string, start: number, end: number) => {
        const tl = gsap.timeline();
        tl.fromTo(
          q(sel),
          { opacity: 0, y: 40, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: (end - start) * 0.35, ease: "power2.out" },
          start,
        ).to(q(sel), { opacity: 0, y: -30, filter: "blur(10px)", duration: (end - start) * 0.3, ease: "power2.in" }, end - (end - start) * 0.3);
        return tl;
      };

      scrub.current = gsap
        .timeline({ paused: true, defaults: { ease: "none" } })
        .to(q(".cap-title"), { opacity: 0, y: -40, filter: "blur(12px)", duration: 0.1 }, 0.02)
        .add(inOut(".cap-ideas", 0.4, 0.6), 0)
        .add(inOut(".cap-real", 0.63, 0.75), 0)
        .set({}, {}, 1);

      return off;
    },
    { scope: root },
  );

  return (
    <div ref={root} className="pointer-events-none absolute inset-0">
      <div className="cap-title absolute inset-x-0 bottom-28 px-5 sm:bottom-auto sm:left-10 sm:right-auto sm:top-1/2 sm:-translate-y-1/2 sm:px-0 lg:left-16">
        <p className="kicker mb-4 !text-[0.6rem] sm:!text-xs">{event.kicker}</p>
        <h1 className="text-glow font-display text-6xl font-black leading-[0.85] tracking-tight sm:text-8xl lg:text-9xl">
          {event.name}
          <span className="block text-lilac [text-shadow:0_0_40px_rgb(255_158_140/.6)]">{event.edition}</span>
        </h1>
        <p className="mt-5 max-w-sm text-sm text-ice/80 sm:text-base">{event.tagline}</p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-ice/60">
          {event.dates.short} · {event.venue.display}
        </p>
      </div>

      <p className="cap-ideas absolute inset-x-0 bottom-24 text-center font-display text-4xl font-black text-white opacity-0 [text-shadow:0_4px_40px_rgb(0_0_0/.8)] sm:text-6xl">
        Ideas <span className="text-lilac">→</span> product.
      </p>

      <p className="cap-real text-glow absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-5xl font-black opacity-0 sm:text-8xl">
        Make it real.
      </p>
    </div>
  );
}
