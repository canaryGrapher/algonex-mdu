"use client";

import { useRef } from "react";
import { timeline } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

/** Event schedule with a glowing line that draws itself as you scroll. */
export default function Timeline() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q(".tl-progress"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: q(".tl-list")[0], start: "top 60%", end: "bottom 60%", scrub: true },
        },
      );
      q(".tl-item").forEach((item) => {
        gsap.from(item.querySelector(".tl-body"), {
          x: item.classList.contains("tl-right") ? 60 : -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 78%" },
        });
        gsap.to(item.querySelector(".tl-dot"), {
          scale: 1,
          backgroundColor: "#ff9e8c",
          boxShadow: "0 0 24px #ff9e8c",
          scrollTrigger: { trigger: item, start: "top 60%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root },
  );

  return (
    <Section id="timeline">
      <SectionHeading
        kicker="Timeline"
        title="Thirty hours,"
        accent="minute by minute."
        intro="All times in IST. Judges visit every team at the 10, 20 and 30-hour marks."
      />
      <div ref={root}>
        <ol className="tl-list relative">
          <span className="absolute bottom-0 left-4 top-0 w-px bg-white/10 md:left-1/2" />
          <span className="tl-progress absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-ice via-lilac to-indigo md:left-1/2" />
          {timeline.map((t, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={t.id}
                className={`tl-item relative grid py-8 pl-12 md:grid-cols-2 md:pl-0 ${right ? "tl-right" : ""}`}
              >
                <span className="tl-dot absolute left-4 top-11 size-3 -translate-x-1/2 scale-75 rounded-full border border-white/40 bg-void md:left-1/2" />
                <div className={`tl-body ${right ? "md:col-start-2 md:pl-16" : "md:pr-16 md:text-right"}`}>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-lilac">{t.tag}</span>
                  <h3 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">{t.title}</h3>
                  <p className="mt-1 font-mono text-sm text-ice/80">{t.time}</p>
                  <p className={`mt-3 max-w-md text-ice/60 ${right ? "" : "md:ml-auto"}`}>{t.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
