import LogoMark from "@/components/ui/LogoMark";
import RegisterButton from "@/components/ui/RegisterButton";
import SponsorBadge from "@/components/ui/SponsorBadge";
import { event } from "@/lib/data";
import { heroFacts } from "./heroFacts";

/** Title and Register Now screen that the presents card dissolves into on phones. */
export default function HeroMobileMain() {
  return (
    <div className="mh-main absolute inset-0 z-10 flex flex-col items-center justify-center px-5 pb-6 pt-20 text-center">
      <LogoMark className="mb-4 size-11" glow={false} />
      <p className="kicker mb-3">{event.kicker}</p>
      <h1 className="text-glow font-display text-[clamp(2.6rem,15vw,4.5rem)] font-black leading-[0.9] tracking-tight">
        {event.name}
        <span className="block text-lilac">{event.edition}</span>
      </h1>
      <p className="mt-4 max-w-[20rem] text-[clamp(0.85rem,3.8vw,1.05rem)] text-ice/80">{event.tagline}</p>
      <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ice/60">
        {event.dates.short} · {event.venue.display}
      </p>

      <div className="mt-6">
        <RegisterButton size="xl" />
      </div>
      <div className="mt-3">
        <SponsorBadge />
      </div>

      <dl className="mt-6 grid w-full max-w-sm grid-cols-2 gap-2 [@media(max-height:700px)]:hidden">
        {heroFacts.map((f) => (
          <div key={f.label} className="glass rounded-2xl px-3 py-2 text-left">
            <dt className="text-[0.58rem] uppercase tracking-[0.2em] text-ice/50">{f.label}</dt>
            <dd className="mt-0.5 text-[0.78rem] font-semibold leading-snug text-white">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
