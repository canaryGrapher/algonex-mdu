import { perks } from "@/lib/data";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import PerkList from "./experience/PerkList";

/** What participants get: kit, meals, on-ground support and take-home pack. */
export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        kicker="On ground"
        title="You build."
        accent="We handle the rest."
        intro="Meals, power, Wi-Fi, medical cover and overnight safety are all sorted, so the only thing you think about is your project."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <PerkList title="Welcome kit" caption="At check-in" items={perks.welcomeKit} />

        <GlassCard className="p-8">
          <p className="kicker">Meals included</p>
          <div className="mt-6 space-y-6">
            {perks.meals.map((m) => (
              <div key={m.day}>
                <p className="font-display text-xl font-bold text-white">{m.day}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.items.map((i) => (
                    <span key={i} className="rounded-full border border-white/15 px-3 py-1 text-sm text-ice/75">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <PerkList title="Take-home pack" caption="At closing" items={perks.takeHome} />
      </div>

      <Reveal className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {perks.onGround.map((p, i) => (
          <GlassCard key={p.id} className="p-7">
            <span className="font-mono text-xs text-lilac">0{i + 1}</span>
            <h3 className="mt-4 font-display text-xl font-bold text-white">{p.title}</h3>
            <p className="mt-2 text-ice/60">{p.detail}</p>
          </GlassCard>
        ))}
      </Reveal>
    </Section>
  );
}
