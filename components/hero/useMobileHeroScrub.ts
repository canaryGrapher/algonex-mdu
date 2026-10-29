"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { heroProgress } from "@/lib/heroProgress";

/**
 * Phone hero scroll: the "presents" card fades out while the ALGONEX title screen is
 * revealed. Only opacity and a small transform are scrubbed, and nothing is pinned with JS
 * (the stage is CSS sticky), so it stays cheap on phones.
 */
export function useMobileHeroScrub(wrap: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(wrap);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(q(".mh-main"), { autoAlpha: 0, y: 28, scale: 0.97 });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: wrap.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              onUpdate: (self) => heroProgress.set(self.progress > 0.6 ? 1 : 0),
            },
          })
          .to(q(".scroll-hint"), { opacity: 0, duration: 0.1 }, 0)
          .to(q(".hero-presents"), { opacity: 0, scale: 1.05, duration: 0.55 }, 0.05)
          .to(q(".mh-main"), { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, 0.4);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q(".hero-presents, .scroll-hint"), { autoAlpha: 0 });
        heroProgress.set(1);
      });
    },
    { scope: wrap },
  );
}
