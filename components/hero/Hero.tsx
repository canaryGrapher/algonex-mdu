"use client";

import { usePhoneState } from "@/lib/hooks";
import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

/**
 * Picks the hero for the screen. Phones get a light version (presents card plus a static
 * title screen) with no video, no pinning and no WebGL hand-off. Nothing heavy mounts until
 * the screen type is known, so a phone never starts the film download.
 */
export default function Hero() {
  const phone = usePhoneState();

  if (phone === null) {
    return <section id="top" aria-hidden className="h-svh w-full bg-[#050102]" />;
  }
  return phone ? <HeroMobile /> : <HeroDesktop />;
}
