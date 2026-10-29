import { gsap } from "@/lib/gsap";

type Q = (sel: string) => Element[];

/** Full entrance for desktop: blur, tracking and a slow push-in. */
export function playPresentsEntrance(q: Q) {
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
}

/**
 * Phone entrance: same beats, but transform and opacity only. No blur filter and no
 * letter-spacing tween (that forces a layout every frame), no endless push-in layer.
 */
export function playPresentsEntranceLite(q: Q) {
  gsap
    .timeline({ defaults: { ease: "power3.out" }, delay: 0.2 })
    .fromTo(q(".presents-streak"), { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8 })
    .fromTo(q(".presents-logo"), { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.2 }, 0.2)
    .to(q(".presents-streak"), { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 0.8)
    .fromTo(q(".presents-char"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.05 }, 1);
}
