"use client";

import { useRef } from "react";
import { prizes } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { isPhone } from "@/lib/motion";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import PodiumCard from "./prizes/PodiumCard";
import SpecialAwards from "./prizes/SpecialAwards";

/** Giant prize-pool figure that zooms in with scroll, then podium and special awards. */
export default function Prizes() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const phone = isPhone();
      // Letter-spacing and a huge scaling text layer are layout and paint heavy; phones get a fade.
      if (phone) {
        gsap.from(q(".pz-big"), { opacity: 0, scale: 0.9, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: q(".pz-big")[0], start: "top 85%" } });
      } else gsap.fromTo(
        q(".pz-big"),
        { scale: 0.55, opacity: 0.1, letterSpacing: "0.2em" },
        {
          scale: 1,
          opacity: 1,
          letterSpacing: "-0.02em",
          ease: "none",
          scrollTrigger: { trigger: q(".pz-big")[0], start: "top bottom", end: "center 55%", scrub: true },
        },
      );
      gsap.from(q(".pz-podium > *"), {
        yPercent: phone ? 15 : 40,
        opacity: 0,
        duration: phone ? 0.7 : 1.1,
        stagger: phone ? 0.08 : 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: q(".pz-podium")[0], start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <Section id="prizes">
      <SectionHeading kicker="Prizes" title="Worth staying" accent="up for." />
      <div ref={root}>
        <p className="kicker text-center">Total prize pool</p>
        <p className="pz-big text-glow mt-2 text-center font-display text-[18vw] font-black leading-none sm:text-[16vw] lg:text-[13rem]">
          {prizes.headline}
        </p>

        <div className="pz-podium mt-12 sm:mt-20 grid items-end gap-4 md:grid-cols-3">
          {prizes.podium.map((p) => (
            <PodiumCard key={p.rank} prize={p} />
          ))}
        </div>

        <SpecialAwards />

        <ul className="mt-10 flex flex-col gap-2 text-sm text-ice/55 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {prizes.notes.map((n) => (
            <li key={n} className="flex items-start gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-lilac" />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
