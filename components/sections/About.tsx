"use client";

import Image from "next/image";
import { useRef } from "react";
import { event, site } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { isPhone } from "@/lib/motion";
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
      // Phones: show the paragraph as plain text. Scrubbing opacity on every word and
      // rotating a large image on scroll is costly there.
      if (isPhone()) {
        gsap.set(q(".ab-word"), { opacity: 1 });
        return;
      }
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
          sizes="(max-width: 640px) 12rem, 28rem"
          className="ab-silk pointer-events-none absolute -right-16 -top-12 w-44 opacity-50 sm:-right-24 sm:-top-24 sm:w-[28rem] sm:opacity-60"
        />
        <p className="kicker mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-lilac" />
          About {event.fullName}
        </p>
        <p className="ab-text relative max-w-5xl font-display text-[clamp(1.35rem,6vw,1.9rem)] font-bold leading-[1.25] text-white sm:text-5xl sm:leading-[1.18] lg:text-6xl">
          {event.description.split(" ").map((w, i) => (
            <span key={i} className="ab-word">
              {w}{" "}
            </span>
          ))}
        </p>
        <p className="mt-8 max-w-2xl text-sm sm:mt-10 sm:text-lg text-ice/70 sm:text-lg">{event.mission}</p>

        <Reveal className="mt-10 grid grid-cols-2 sm:mt-16 gap-3 sm:gap-5 lg:grid-cols-4">
          {site.stats.map((s) => (
            <GlassCard key={s.label} className="p-4 sm:p-8">
              <Counter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="text-glow block font-display text-[clamp(1.9rem,9vw,2.6rem)] font-black sm:text-6xl"
              />
              <span className="mt-3 block text-xs uppercase tracking-[0.25em] text-ice/60">{s.label}</span>
            </GlassCard>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
