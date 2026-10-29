"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; mins: number; secs: number };

function diff(target: number): Parts {
  const ms = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    mins: Math.floor(ms / 60_000) % 60,
    secs: Math.floor(ms / 1000) % 60,
  };
}

/** Live countdown to an ISO date. Renders placeholders until mounted to avoid hydration drift. */
export default function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff(target));
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: [keyof Parts, string][] = [
    ["days", "Days"],
    ["hours", "Hours"],
    ["mins", "Minutes"],
    ["secs", "Seconds"],
  ];

  return (
    <div className="mx-auto flex max-w-md justify-center gap-2 sm:max-w-none sm:gap-4">
      {cells.map(([k, label]) => (
        <div key={k} className="glass min-w-0 flex-1 rounded-2xl py-3 text-center sm:w-28 sm:flex-none sm:py-4">
          <span className="block font-display text-2xl font-black tabular-nums text-white sm:text-5xl">
            {parts ? String(parts[k]).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.15em] sm:text-[10px] sm:tracking-[0.25em] text-ice/50">{label}</span>
        </div>
      ))}
    </div>
  );
}
