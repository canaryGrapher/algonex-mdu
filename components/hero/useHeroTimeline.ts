"use client";

import type { RefObject } from "react";
import { HERO_MARKS as M, heroProgress } from "@/lib/heroProgress";
import { gsap, useGSAP } from "@/lib/gsap";
import { addPresentsScrub } from "./presentsScrub";
import type { ProgressHandle } from "./types";

type Options = {
  section: RefObject<HTMLElement | null>;
  /** Everything scrubbed with the clip: the video, its captions, or the fallback intro. */
  layers: RefObject<ProgressHandle | null>[];
};

/**
 * Pinned scroll sequence for the hero:
 *  0.00 to 0.10  the "Maya Devi presents" card dissolves into the first video frame
 *  0.10 to 0.70  The video plays frame by frame with scroll (captions ride on top)
 *  0.68 to 0.80  the video's final logo dissolves into black space, where the
 *                glass logo takes over in the same spot (see scene/HeroLinkedLogo)
 *  0.82 to 0.98  Register Now call to action rises in while the glass logo glides aside
 */
export function useHeroTimeline({ section, layers }: Options) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const proxy = { p: 0 };
        const sync = () => layers.forEach((l) => l.current?.setProgress(proxy.p));
        const span = M.handoffEnd - M.handoffStart;

        gsap.set(q(".cta-item"), { y: 60, opacity: 0, filter: "blur(12px)" });

        const master = gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${window.innerHeight * M.pinLengthVh}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 1,
              onUpdate: (self) => heroProgress.set(self.progress),
            },
          })
          .to(proxy, { p: 1, duration: M.videoEnd - M.presentsEnd, onUpdate: sync }, M.presentsEnd)
          .to(q(".scroll-hint"), { opacity: 0, duration: 0.03 }, 0)
          // Backdrop behind the clip follows its palette: red room, then navy after the warp.
          .to(q(".hero-video-bg"), { backgroundColor: "#12060a", duration: 0.05 }, M.videoEnd * 0.6)
          .to(q(".hero-media"), { opacity: 0, scale: 1.12, filter: "blur(18px)", duration: span }, M.handoffStart)
          .to(q(".hero-poster"), { opacity: 0, duration: span }, M.handoffStart)
          .to(
            q(".cta-item"),
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.1, stagger: 0.015, ease: "power2.out" },
            M.ctaStart,
          )
          .to({}, { duration: 0.04 });

        addPresentsScrub(master, q);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q(".hero-media, .hero-poster, .hero-presents, .scroll-hint"), { autoAlpha: 0 });
        heroProgress.set(1);
      });
    },
    { scope: section },
  );
}
