import type { Perk } from "@/lib/types";
import GlassCard from "@/components/ui/GlassCard";

type Props = { title: string; caption: string; items: Perk[] };

export default function PerkList({ title, caption, items }: Props) {
  return (
    <GlassCard className="p-8">
      <div className="flex items-baseline justify-between">
        <p className="kicker">{title}</p>
        <span className="font-mono text-xs text-lilac">{caption}</span>
      </div>
      <ul className="mt-6 space-y-5">
        {items.map((p) => (
          <li key={p.id} className="border-t border-white/10 pt-4">
            <p className="font-semibold text-white">{p.title}</p>
            <p className="mt-1 text-sm text-ice/55">{p.detail}</p>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
