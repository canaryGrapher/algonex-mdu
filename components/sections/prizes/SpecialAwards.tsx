import { prizes } from "@/lib/data";
import { formatINR } from "@/lib/format";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";

export default function SpecialAwards() {
  return (
    <div className="mt-24">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h3 className="font-display text-3xl font-extrabold text-white sm:text-4xl">Special recognition</h3>
        <span className="font-mono text-sm text-ice/60">
          {prizes.specialAwards.length} awards · {formatINR(prizes.specialAwards[0].amount)} each
        </span>
      </div>
      <Reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" stagger={0.06}>
        {prizes.specialAwards.map((a, i) => (
          <GlassCard key={a.id} className="flex flex-col p-6">
            <span className="font-mono text-xs text-lilac">0{i + 1}</span>
            {/* Fixed two-line title height keeps every description and amount on the same line. */}
            <h4 className="mt-6 line-clamp-2 min-h-[2.75em] font-display text-lg font-bold leading-snug text-white">
              {a.title}
            </h4>
            <p className="mt-3 flex-1 text-sm text-ice/55">{a.focus}</p>
            <p className="mt-6 border-t border-white/10 pt-5 font-display text-2xl font-black text-white">
              {formatINR(a.amount)}
            </p>
          </GlassCard>
        ))}
      </Reveal>
    </div>
  );
}
