import { event } from "@/lib/data";
import LogoMark from "@/components/ui/LogoMark";
import RegisterButton from "@/components/ui/RegisterButton";
import SponsorBadge from "@/components/ui/SponsorBadge";
import { heroFacts as facts } from "./heroFacts";


/** Final state of the hero: the main Register Now call to action. */
export default function HeroCta() {
  return (
    <div className="hero-cta pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 pt-16 text-center">
      <div className="cta-item mb-5 flex items-center gap-3">
        <LogoMark className="size-9" />
        <span className="kicker !tracking-[0.35em]">
          {event.fullName} · {event.dates.short}
        </span>
      </div>

      <h2 className="cta-item mb-8 max-w-3xl text-balance font-display text-3xl font-extrabold leading-tight text-white sm:mb-10 sm:text-5xl">
        Thirty hours. One idea. <span className="text-iris">Make it real.</span>
      </h2>

      <div className="cta-item pointer-events-auto">
        <RegisterButton size="xl" />
      </div>

      <div className="cta-item pointer-events-auto mt-5">
        <SponsorBadge />
      </div>

      <p className="cta-item mt-8 font-mono text-xs uppercase tracking-[0.25em] text-lilac/80">
        Registrations close {event.registration.deadlineDisplay}
      </p>

      <dl className="cta-item mt-8 grid w-full max-w-4xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 [@media(max-height:640px)]:hidden">
        {facts.map((f) => (
          <div key={f.label} className="glass rounded-2xl px-4 py-3 text-left">
            <dt className="text-[10px] uppercase tracking-[0.25em] text-ice/50">{f.label}</dt>
            <dd className="mt-1 text-sm font-semibold text-white">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
