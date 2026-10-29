import type { PodiumPrize } from "@/lib/types";
import Counter from "@/components/ui/Counter";
import GlassCard from "@/components/ui/GlassCard";

const heights: Record<number, string> = {
  1: "md:min-h-[26rem] order-first md:order-2",
  2: "md:min-h-[21rem] md:order-1",
  3: "md:min-h-[18rem] md:order-3",
};

export default function PodiumCard({ prize }: { prize: PodiumPrize }) {
  const winner = prize.rank === 1;
  return (
    <GlassCard
      className={`flex flex-col justify-between p-5 sm:p-8 ${heights[prize.rank]} ${
        winner ? "border-lilac/40 shadow-[0_0_40px_-10px_rgba(255,111,91,0.5)] sm:shadow-[0_0_80px_-10px_rgba(255,111,91,0.55)]" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-lilac">{prize.position}</span>
        <span
          className={`font-display text-5xl font-black sm:text-7xl leading-none ${winner ? "text-iris" : "text-white/15"}`}
        >
          0{prize.rank}
        </span>
      </div>
      <div className="mt-8 sm:mt-12">
        <Counter
          value={prize.amount}
          prefix="₹"
          grouped
          className={`block font-display font-black text-white ${winner ? "text-glow text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"}`}
        />
        <p className="mt-2 text-ice/60">{prize.title}</p>
      </div>
    </GlassCard>
  );
}
