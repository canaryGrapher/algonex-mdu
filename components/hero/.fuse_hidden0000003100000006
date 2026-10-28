import type { gsap } from "@/lib/gsap";
import { HERO_MARKS as M } from "@/lib/heroProgress";

/**
 * Scroll-driven dissolve of the "presents" card into the Lottie (positions are
 * fractions of the hero timeline). A short hold first, so the first scroll tick
 * does not rush the card away, then bars retreat while the card blurs and fades.
 */
export function addPresentsScrub(tl: gsap.core.Timeline, q: (sel: string) => Element[]) {
  const hold = M.presentsEnd * 0.2;
  const span = M.presentsEnd - hold;

  tl.to(q(".presents-bar-top"), { yPercent: -100, duration: span, ease: "power2.in" }, hold)
    .to(q(".presents-bar-bottom"), { yPercent: 100, duration: span, ease: "power2.in" }, hold)
    .to(q(".presents-body"), { scale: 1.18, filter: "blur(14px)", duration: span }, hold)
    .to(q(".presents-body"), { opacity: 0, duration: span * 0.7 }, hold + span * 0.3)
    .set(q(".hero-presents"), { autoAlpha: 0 }, M.presentsEnd);
  return tl;
}
