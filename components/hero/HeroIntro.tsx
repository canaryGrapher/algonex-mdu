"use client";

import Image from "next/image";
import { useImperativeHandle, useRef } from "react";
import { event } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ProgressHandle } from "./types";

type Props = { ref: React.Ref<ProgressHandle> };

/**
 * Poster recreation shown until the hero video is added (or if they fail).
 * Plays a short entrance on load, then is scrubbed by the hero timeline.
 */
export default function HeroIntro({ ref }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const scrub = useRef<gsap.core.Timeline | null>(null);

  useImperativeHandle(ref, () => ({
    setProgress: (p) => scrub.current?.progress(p),
  }));

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(q(".intro-char"), { y: 90, opacity: 0, filter: "blur(14px)", duration: 1.4, stagger: 0.05 })
        .from(q(".intro-edition"), { y: 70, opacity: 0, filter: "blur(14px)", duration: 1.2 }, "-=1.1")
        .from(q(".intro-fade"), { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, "-=1")
        .from(q(".intro-silk"), { x: 200, rotate: 18, opacity: 0, duration: 2 }, 0.1);

      scrub.current = gsap
        .timeline({ paused: true, defaults: { ease: "none" } })
        .to(q(".intro-silk-wrap"), { rotate: -28, xPercent: -55, scale: 2.6, duration: 1 }, 0)
        .to(q(".intro-word"), { letterSpacing: "0.12em", scale: 1.25, duration: 0.6 }, 0)
        .to(q(".intro-edition-wrap"), { yPercent: -40, opacity: 0, duration: 0.45 }, 0.05)
        .to(q(".intro-fade-wrap"), { opacity: 0, y: -40, duration: 0.35 }, 0)
        .to(q(".intro-title"), { scale: 4, opacity: 0, filter: "blur(16px)", duration: 0.45 }, 0.55)
        .to(q(".intro-silk-wrap"), { opacity: 0, duration: 0.25 }, 0.75);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden">
      <div className="intro-silk-wrap absolute -right-[22%] top-[22%] w-[110vw] max-w-none origin-center sm:-right-[10%] sm:top-[8%] sm:w-[68vw]">
        <Image
          src="/brand/glass-silk.webp"
          alt=""
          width={1797}
          height={1800}
          priority
          className="intro-silk h-auto w-full drop-shadow-[0_0_80px_rgba(255,111,91,0.45)]"
        />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-10">
        <p className="intro-fade-wrap kicker mb-6 !text-[0.6rem] sm:!text-xs">
          <span className="intro-fade inline-block">{event.kicker}</span>
        </p>

        <h1 className="intro-title origin-left font-display font-black leading-[0.82] tracking-tight">
          <span className="intro-word text-glow block text-[15.5vw] sm:text-[15vw] lg:text-[12.5rem]">
            {event.name.split("").map((c, i) => (
              <span key={i} className="intro-char inline-block">
                {c}
              </span>
            ))}
          </span>
          <span className="intro-edition-wrap block">
            <span className="intro-edition text-glow block text-[26vw] sm:text-[20vw] lg:text-[16rem]">
              {event.edition}
            </span>
          </span>
        </h1>

        <div className="intro-fade-wrap mt-6 flex flex-wrap items-end gap-x-10 gap-y-4">
          <div className="intro-fade">
            <p className="font-display text-lg font-bold text-white sm:text-2xl">Prize Pool</p>
            <p className="text-glow font-display text-4xl font-black sm:text-6xl">
              {event.prizePoolDisplay}
            </p>
          </div>
          <p className="intro-fade pb-2 text-sm text-ice/80 sm:text-base">
            {event.dates.display}
            <br />
            {event.venue.display}
          </p>
        </div>
      </div>
    </div>
  );
}
