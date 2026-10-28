"use client";

import Image from "next/image";
import { useRef } from "react";
import { event, site } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import Counter from "@/components/ui/Counter";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

/** Manifesto paragraph that lights up word by word, plus key numbers. */
export default function About() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q(".ab-word"),
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: q(".ab-text")[0], start: "top 75%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.to(q(".ab-silk"), {
        yPercent: -30,
        rotate: 25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <Section id="about">
      <div ref={root} className="relative">
        <Image
          src="/brand/glass-silk.webp"
          alt=""
          width={600}
          height={600}
          className="ab-silk pointer-events-none absolute -right-24 -top-24 w-72 opacity-60 sm:w-[28rem]"
        />
        <p className="kicker mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-lilac" />
          About {event.fullName}
        </p>
        <p className="ab-text relative max-w-5xl font-display text-3xl font-bold leading-[1.18] text-white sm:text-5xl lg:text-6xl">
          {event.description.split(" ").map((w, i) => (
            <span key={i} className="ab-word">
              {w}{" "}
            </span>
          ))}
        </p>
        <p className="mt-10 max-w-2xl text-base text-ice/70 sm:text-lg">{event.mission}</p>

        <Reveal className="mt-16 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {site.stats.map((s) => (
            <GlassCard key={s.label} className="p-6 sm:p-8">
              <Counter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="text-glow block font-display text-5xl font-black sm:text-6xl"
              />
              <span className="mt-3 block text-xs uppercase tracking-[0.25em] text-ice/60">{s.label}</span>
            </GlassCard>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
