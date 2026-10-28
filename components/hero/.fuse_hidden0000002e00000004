"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Cinematic opening card: "<Maya Devi logo> presents".
 * It plays its own entrance on load and then holds. The hero scroll timeline
 * (see presentsScrub.ts) dissolves it into the Lottie once the visitor scrolls.
 */
export default function HeroPresents() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.35 })
        .fromTo(q(".presents-streak"), { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.1 })
        .fromTo(
          q(".presents-logo"),
          { opacity: 0, scale: 1.08, filter: "blur(18px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" },
          0.35,
        )
        .to(q(".presents-streak"), { opacity: 0, duration: 1.4, ease: "power2.inOut" }, 1.1)
        .fromTo(
          q(".presents-char"),
          { opacity: 0, y: 14, letterSpacing: "0.9em" },
          { opacity: 1, y: 0, letterSpacing: "0.55em", duration: 1.6, stagger: 0.07 },
          1.5,
        );

      // Slow push-in so the held card never feels frozen.
      gsap.fromTo(q(".presents-drift"), { scale: 1 }, { scale: 1.06, duration: 14, ease: "none" });
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
            className="presents-streak absolute top-1/2 h-px w-[78vw] max-w-5xl origin-center bg-gradient-to-r from-transparent via-white to-transparent opacity-0 shadow-[0_0_28px_6px_rgb(255_111_91/.55)]"
          />
          <Image
            src="/brand/mdu-logo.png"
            alt="Maya Devi University"
            width={1533}
            height={315}
            priority
            className="presents-logo h-auto w-[min(82vw,34rem)] opacity-0 drop-shadow-[0_0_40px_rgba(255,111,91,0.25)]"
          />
          <p
            aria-label="presents"
            className="presents-text mt-8 font-display text-xs font-semibold uppercase text-ice/80 sm:mt-10 sm:text-sm"
          >
            {Array.from("PRESENTS").map((c, i) => (
              <span key={i} className="presents-char inline-block opacity-0">
                {c}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Letterbox bars slide away as the card dissolves. */}
      <div className="presents-bar-top absolute inset-x-0 top-0 h-[11vh] bg-black" />
      <div className="presents-bar-bottom absolute inset-x-0 bottom-0 h-[11vh] bg-black" />
    </div>
  );
}
