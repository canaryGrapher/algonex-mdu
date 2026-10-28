"use client";

import { useState } from "react";
import { judging } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ScoreSplit from "./judging/ScoreSplit";
import StageCriteria from "./judging/StageCriteria";

/** How teams are scored: final-score split, per-stage criteria and fairness rules. */
export default function Judging() {
  const [active, setActive] = useState(judging.stages[judging.stages.length - 1].id);
  const stage = judging.stages.find((s) => s.id === active) ?? judging.stages[0];

  return (
    <Section id="judging">
      <SectionHeading kicker="Judging" title="Scored on what" accent="you ship." intro={judging.intro} />

      <ScoreSplit />

      <div className="mt-20 grid gap-10 lg:grid-cols-[18rem_1fr]">
        <div role="tablist" aria-label="Judging stages" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {judging.stages.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === active}
              onClick={() => setActive(s.id)}
              className={`shrink-0 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                s.id === active
                  ? "border-lilac/50 bg-white/10 text-white shadow-[0_0_30px_-8px_rgba(255,158,140,0.6)]"
                  : "border-white/10 text-ice/60 hover:border-white/25 hover:text-white"
              }`}
            >
              <span className="block font-display font-bold">{s.name}</span>
              <span className="block text-xs text-ice/50">{s.subtitle}</span>
            </button>
          ))}
        </div>
        <StageCriteria key={stage.id} stage={stage} />
      </div>

      <div className="mt-16">
        <p className="kicker mb-4">Scoring scale</p>
        <div className="flex flex-wrap gap-2">
          {judging.scale.map((s) => (
            <span key={s.score} className="glass rounded-full px-4 py-2 text-sm">
              <b className="font-display text-white">{s.score}</b>
              <span className="ml-2 text-ice/60">{s.label}</span>
            </span>
          ))}
        </div>
      </div>

      <Reveal className="mt-14 grid gap-3 sm:grid-cols-2">
        {judging.principles.map((p) => (
          <p key={p} className="flex gap-3 border-t border-white/10 pt-4 text-ice/70">
            <span className="font-mono text-lilac">✓</span>
            {p}
          </p>
        ))}
      </Reveal>
    </Section>
  );
}
