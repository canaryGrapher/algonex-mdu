"use client";

import { useRef } from "react";
import { site } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import LogoMark from "@/components/ui/LogoMark";

function Row({ outline = false }: { outline?: boolean }) {
  const words = [...site.marquee, ...site.marquee];
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {words.map((w, i) => (
        <span key={i} className="flex items-center gap-10">
          <span
            className={`whitespace-nowrap font-display text-6xl font-black uppercase sm:text-8xl ${
              outline ? "text-transparent [-webkit-text-stroke:1.5px_rgb(255_227_216/0.45)]" : "text-glow"
            }`}
          >
            {w}
          </span>
          <LogoMark className="size-10 shrink-0 sm:size-14" glow={false} />
        </span>
      ))}
    </div>
  );
}

/** Two oversized ribbons that slide in opposite directions as the page scrolls. */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 };
      gsap.fromTo(q(".mq-a"), { xPercent: 0 }, { xPercent: -30, ease: "none", scrollTrigger: st });
      gsap.fromTo(q(".mq-b"), { xPercent: -30 }, { xPercent: 0, ease: "none", scrollTrigger: st });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="relative -rotate-2 overflow-hidden py-16 sm:py-24">
      <div className="mq-a flex w-max">
        <Row />
      </div>
      <div className="mq-b mt-4 flex w-max">
        <Row outline />
      </div>
    </div>
  );
}
