"use client";

import { useRef, useState } from "react";
import HeroCaptions from "./HeroCaptions";
import HeroCta from "./HeroCta";
import HeroIntro from "./HeroIntro";
import HeroLoader from "./HeroLoader";
import HeroPresents from "./HeroPresents";
import HeroLottie from "./HeroLottie";
import ScrollHint from "./ScrollHint";
import type { LottieStatus, ProgressHandle } from "./types";
import { useHeroTimeline } from "./useHeroTimeline";

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const lottie = useRef<ProgressHandle>(null);
  const intro = useRef<ProgressHandle>(null);
  const captions = useRef<ProgressHandle>(null);
  const [status, setStatus] = useState<LottieStatus>("loading");
  const ready = status === "ready";

  useHeroTimeline({ section, layers: [lottie, intro, captions] });

  return (
    <section ref={section} id="top" className="relative h-svh w-full overflow-hidden">
      {/* Poster backdrop, only used by the fallback intro if the Lottie cannot load. */}
      <div className={`hero-poster grain absolute inset-0 ${status === "missing" ? "" : "invisible"}`}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/brand/poster-bg.webp)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0304]/40 via-transparent to-[#0a0304]/70" />
      </div>

      <div className="hero-media absolute inset-0">
        <div className={`hero-lottie-bg absolute inset-0 bg-[#1c0608] ${ready ? "" : "invisible"}`}>
          <HeroLottie ref={lottie} onStatus={setStatus} />
          {/* Grain and vignette soften the upscaled video frames and melt the edges into the page. */}
          <div className="grain pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(10_3_4/.75)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void/70 to-transparent" />
        </div>
        {ready && <HeroCaptions ref={captions} />}
        {status === "missing" && <HeroIntro ref={intro} />}
        {status === "loading" && <HeroLoader />}
      </div>

      <HeroPresents />
      <HeroCta />
      <ScrollHint />
    </section>
  );
}
