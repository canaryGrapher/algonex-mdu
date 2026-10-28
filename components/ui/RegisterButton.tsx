"use client";

import { useRef } from "react";
import { event } from "@/lib/data";
import { gsap } from "@/lib/gsap";

type Props = { size?: "md" | "xl"; className?: string };

const sizes = {
  md: "px-5 py-2.5 text-sm gap-2",
  xl: "px-10 py-6 text-2xl gap-4 sm:px-16 sm:py-8 sm:text-4xl md:text-5xl",
};

/** Primary call to action. Links to the registration partner from data/event.json. */
export default function RegisterButton({ size = "md", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { url, ctaLabel } = event.registration;
  const external = url.startsWith("http");

  // Subtle magnetic pull toward the cursor on the large variant.
  const onMove = (e: React.MouseEvent) => {
    if (size !== "xl" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.28;
    gsap.to(ref.current, { x, y, duration: 0.5, ease: "power3.out" });
  };
  const onLeave = () => {
    if (ref.current)
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <a
      ref={ref}
      href={url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full font-display font-extrabold uppercase tracking-[0.08em] text-white transition-shadow duration-500 ${sizes[size]} ${className}`}
      style={{
        background:
          "linear-gradient(110deg, #b32d1e 0%, #e5483a 45%, #ff6f5b 70%, #b32d1e 100%)",
        backgroundSize: "200% 100%",
        boxShadow:
          size === "xl"
            ? "0 0 0 1px rgb(255 255 255 / .25) inset, 0 0 60px rgb(255 111 91 / .55), 0 0 140px rgb(194 58 43 / .45)"
            : "0 0 0 1px rgb(255 255 255 / .2) inset, 0 0 24px rgb(255 111 91 / .35)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
      <span className="relative">{ctaLabel}</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="relative size-[1em] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </a>
  );
}
