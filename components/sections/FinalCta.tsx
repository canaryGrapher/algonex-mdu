"use client";

import { useRef } from "react";
import { event } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import Countdown from "@/components/ui/Countdown";
import RegisterButton from "@/components/ui/RegisterButton";
import SponsorBadge from "@/components/ui/SponsorBadge";

/** Closing call to action with a countdown to the registration deadline. */
export default function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 70%" } })
        .from(q(".fc-line"), { yPercent: 110, duration: 1.2, stagger: 0.1, ease: "expo.out" })
        .from(q(".fc-fade"), { y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }, "-=0.7");
    },
    { scope: root },
  );

  return (
    <section ref={root} id="register" className="relative overflow-hidden px-5 py-20 text-center sm:py-48">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 sm:size-[60rem] sm:opacity-50 sm:blur-3xl"
        style={{ background: "radial-gradient(circle, rgb(255 111 91 / .45), rgb(194 58 43 / .2) 45%, transparent 70%)" }}
      />
      <div className="relative">
        <p className="fc-fade kicker">Registrations close {event.registration.deadlineDisplay}</p>
        <h2 className="mt-6 font-display text-[clamp(2.25rem,12vw,3.25rem)] font-black leading-[0.98] tracking-tight text-white sm:text-8xl">
          <span className="block overflow-hidden">
            <span className="fc-line block">Your idea.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="fc-line text-iris block">Our stage.</span>
          </span>
        </h2>
        <div className="fc-fade mt-8 sm:mt-12">
          <Countdown to={event.registration.deadline} />
        </div>
        <div className="fc-fade mt-8 sm:mt-12">
          <RegisterButton size="xl" />
        </div>
        <div className="fc-fade mt-5">
          <SponsorBadge />
        </div>
      </div>
    </section>
  );
}
