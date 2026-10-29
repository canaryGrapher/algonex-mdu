"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { gsap } from "@/lib/gsap";
import { playPresentsEntrance, playPresentsEntranceLite } from "./presentsEntrance";

type Props = {
  /** Phone version: lighter entrance, no letterbox bars, no grain, tracking set in CSS. */
  lite?: boolean;
};

/**
 * Cinematic opening card: "<Maya Devi logo> presents".
 * It plays its own entrance on load and then holds. On desktop the hero scroll timeline
 * (see presentsScrub.ts) dissolves it into the video once the visitor scrolls.
 */
export default function HeroPresents({ lite = false }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      (lite ? playPresentsEntranceLite : playPresentsEntrance)(q);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="hero-presents pointer-events-none absolute inset-0 z-20">
      <div className="presents-body grain absolute inset-0 overflow-hidden bg-[#050102]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_52%,rgb(138_31_18/.38),transparent_62%)]" />

        <div className="presents-drift absolute inset-0 flex flex-col items-center justify-center px-6">
          <span
            aria-hidden
            className="presents-streak absolute top-1/2 h-px w-[78vw] max-w-5xl origin-center bg-gradient-to-r from-transparent via-white to-transparent opacity-0 shadow-[0_0_16px_3px_rgb(255_111_91/.5)] sm:shadow-[0_0_28px_6px_rgb(255_111_91/.55)]"
          />
          <Image
            src="/brand/mdu-logo.png"
            alt="Maya Devi University"
            width={1533}
            height={315}
            priority
            sizes="(max-width: 640px) 82vw, 34rem"
            className="presents-logo h-auto w-[min(78vw,34rem)] opacity-0 drop-shadow-[0_0_24px_rgba(255,111,91,0.25)] sm:drop-shadow-[0_0_40px_rgba(255,111,91,0.25)]"
          />
          <p
            aria-label="presents"
            className={`presents-text mt-6 font-display text-[0.7rem] font-semibold uppercase text-ice/80 sm:mt-10 sm:text-sm ${
              lite ? "tracking-[0.45em]" : ""
            }`}
          >
            {Array.from("PRESENTS").map((c, i) => (
              <span key={i} className="presents-char inline-block opacity-0">
                {c}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Letterbox bars slide away as the card dissolves (desktop scroll timeline only). */}
      {!lite && (
        <>
          <div className="presents-bar-top absolute inset-x-0 top-0 h-[11vh] bg-black" />
          <div className="presents-bar-bottom absolute inset-x-0 bottom-0 h-[11vh] bg-black" />
        </>
      )}
    </div>
  );
}
