"use client";

import { useRef } from "react";
import HeroMobileMain from "./HeroMobileMain";
import HeroPresents from "./HeroPresents";
import ScrollHint from "./ScrollHint";
import { useMobileHeroProgress } from "./useMobileHeroProgress";

/**
 * Phone hero: the "Maya Devi presents" card, then a static title screen.
 * No video, no scroll pinning, no WebGL, so memory and main-thread work stay low.
 */
export default function HeroMobile() {
  const card = useRef<HTMLElement>(null);
  useMobileHeroProgress(card);

  return (
    <>
      <section ref={card} id="top" className="relative h-svh w-full overflow-hidden">
        <HeroPresents lite />
        <ScrollHint />
      </section>
      <HeroMobileMain />
    </>
  );
}
