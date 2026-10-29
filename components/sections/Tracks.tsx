"use client";

import { useRef } from "react";
import { tracks } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

/** Domains. Pinned horizontal scroll on desktop, a simple stack on mobile. */
export default function Tracks() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = rail.current!;
        const distance = () => el.scrollWidth - window.innerWidth + 80;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".tr-card").forEach((card) =>
          gsap.from(card, {
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }),
        );
      });
    },
    { scope: root },
  );

  return (
    <section id="tracks" ref={root} className="relative overflow-hidden py-16 sm:py-40 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10">
        <SectionHeading kicker="Tracks" title="Build what" accent="matters." intro={tracks.intro} />
      </div>
      <div ref={rail} className="flex flex-col gap-4 px-5 sm:px-10 lg:w-max lg:flex-row lg:gap-6 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
        {tracks.items.map((t) => (
          <GlassCard key={t.id} className="tr-card flex flex-col justify-between p-5 sm:p-8 lg:h-[24rem] lg:w-[22rem]">
            <span className="font-mono text-sm text-lilac">/{t.code}</span>
            <div className="mt-8 lg:mt-0">
              <h3 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">{t.title}</h3>
              <p className="mt-3 text-sm text-ice/65 sm:mt-4 sm:text-base">{t.blurb}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
