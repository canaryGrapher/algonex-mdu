"use client";

import { useState } from "react";
import { faq } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading kicker="FAQ" title="Good" accent="questions." />
        <Reveal items=":scope > div" stagger={0.05}>
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-white/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg font-bold text-white sm:text-xl">{f.q}</span>
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full border border-white/20 text-lilac transition-transform duration-500 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <p className="overflow-hidden pr-12 text-ice/65">
                    <span className="block pb-6">{f.a}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}
