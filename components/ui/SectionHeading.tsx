"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  kicker: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "left" | "center";
};

/** Kicker + headline whose words rise in from a mask as they scroll into view. */
export default function SectionHeading({ kicker, title, accent, intro, align = "left" }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const tl = gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 82%" } })
        .from(q(".sh-kicker"), { opacity: 0, x: -20, duration: 0.6, ease: "power2.out" })
        .from(q(".sh-word"), { yPercent: 110, rotate: 4, duration: 1, stagger: 0.06, ease: "expo.out" }, "-=0.3");
      if (intro) tl.from(q(".sh-intro"), { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.6");
    },
    { scope: root },
  );

  const words = (text: string, cls = "") =>
    text.split(" ").map((w, i) => (
      <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <span className={`sh-word inline-block ${cls}`}>{w}&nbsp;</span>
      </span>
    ));

  const centered = align === "center";

  return (
    <div ref={root} className={`mb-10 sm:mb-20 ${centered ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}`}>
      <p className={`sh-kicker kicker mb-5 flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-lilac" />
        {kicker}
      </p>
      <h2 className="font-display text-[clamp(2rem,10vw,2.75rem)] font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
        {words(title)}
        {accent && words(accent, "text-iris")}
      </h2>
      {intro && <p className="sh-intro mt-6 max-w-2xl text-base text-ice/70 sm:text-lg">{intro}</p>}
    </div>
  );
}
