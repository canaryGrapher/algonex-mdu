import LogoMark from "@/components/ui/LogoMark";
import RegisterButton from "@/components/ui/RegisterButton";
import Reveal from "@/components/ui/Reveal";
import SponsorBadge from "@/components/ui/SponsorBadge";
import { event } from "@/lib/data";
import { heroFacts } from "./heroFacts";

/** Static title and Register Now screen shown to phones right after the presents card. */
export default function HeroMobileMain() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center px-5 pb-16 pt-24 text-center">
      <Reveal className="flex flex-col items-center" stagger={0.07}>
        <LogoMark className="mb-5 size-12" glow={false} />
        <p className="kicker mb-4">{event.kicker}</p>
        <h1 className="text-glow font-display text-[clamp(2.6rem,15vw,4.5rem)] font-black leading-[0.9] tracking-tight">
          {event.name}
          <span className="block text-lilac">{event.edition}</span>
        </h1>
        <p className="mt-5 max-w-[20rem] text-[clamp(0.9rem,3.8vw,1.05rem)] text-ice/80">{event.tagline}</p>
        <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ice/60">
          {event.dates.short} · {event.venue.display}
        </p>

        <div className="mt-8">
          <RegisterButton size="xl" />
        </div>
        <div className="mt-4">
          <SponsorBadge />
        </div>
        <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-lilac/80">
          Registrations close {event.registration.deadlineDisplay}
        </p>

        <dl className="mt-8 grid w-full max-w-sm grid-cols-2 gap-2">
          {heroFacts.map((f) => (
            <div key={f.label} className="glass rounded-2xl px-3 py-2.5 text-left">
              <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-ice/50">{f.label}</dt>
              <dd className="mt-0.5 text-[0.8rem] font-semibold leading-snug text-white">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
