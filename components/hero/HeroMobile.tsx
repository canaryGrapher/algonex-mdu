"use client";

import { useRef } from "react";
import HeroMobileMain from "./HeroMobileMain";
import HeroPresents from "./HeroPresents";
import ScrollHint from "./ScrollHint";
import { useMobileHeroScrub } from "./useMobileHeroScrub";

/**
 * Phone hero: "Maya Devi presents" fades away on scroll and reveals the ALGONEX title screen.
 * One sticky stage inside a taller wrapper; no video, no JS pinning, no WebGL.
 */
export default function HeroMobile() {
  const wrap = useRef<HTMLElement>(null);
  useMobileHeroScrub(wrap);

  return (
    <section ref={wrap} id="top" className="relative h-[190svh] w-full">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <HeroMobileMain />
        <HeroPresents lite />
        <ScrollHint />
      </div>
    </section>
  );
}
