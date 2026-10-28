"use client";

import { useEffect, useState } from "react";
import { event, site } from "@/lib/data";
import { HERO_MARKS, heroProgress } from "@/lib/heroProgress";
import LogoMark from "@/components/ui/LogoMark";
import RegisterButton from "@/components/ui/RegisterButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const [filmPlaying, setFilmPlaying] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Step aside while the hero film plays, including the opening "presents" card, return once the call to action arrives.
  useEffect(() => {
    const sync = (p: number) => setFilmPlaying(p < HERO_MARKS.handoffEnd);
    sync(heroProgress.get());
    return heroProgress.subscribe(sync);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-700 sm:px-6 sm:pt-4 ${
        filmPlaying && !open ? "pointer-events-none -translate-y-6 opacity-0" : ""
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled || open ? "glass" : "border border-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${event.fullName} home`}>
          <LogoMark className="size-7" />
          <span className="font-display text-lg font-black tracking-tight text-white">
            {event.name}
            <span className="ml-1 text-lilac">{event.edition}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {site.nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="text-sm text-ice/70 transition-colors hover:text-white">
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <RegisterButton />
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full border border-white/15 lg:hidden"
          >
            <span className={`block h-px w-4 bg-white transition-transform ${open ? "translate-y-[3px] rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`absolute block h-px w-4 bg-white transition-transform ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </div>
      </nav>

      <div
        className={`glass mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl transition-all duration-500 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-4">
          {site.nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 font-display text-lg font-bold text-white hover:bg-white/5"
              >
                {n.label}
              </a>
            </li>
          ))}
          <li className="px-2 pt-3">
            <RegisterButton className="w-full" />
          </li>
        </ul>
      </div>
    </header>
  );
}
