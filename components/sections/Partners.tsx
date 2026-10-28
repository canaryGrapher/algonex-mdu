import Image from "next/image";
import { event, sponsors } from "@/lib/data";
import { formatINR } from "@/lib/format";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

/** Host institutions, the registration partner and an invitation to sponsor. */
export default function Partners() {
  const { pitch, partners, registrationPartner } = sponsors;

  return (
    <Section id="partners">
      <SectionHeading kicker="Partners" title="Brought to you" accent="by." />

      <Reveal className="grid gap-4 sm:grid-cols-3">
        {partners.map((p) =>
          p.wide ? (
            <GlassCard key={p.name} className="flex flex-col justify-center gap-3 p-6">
              <Image src={p.logo} alt={p.name} width={1533} height={315} className="h-10 w-auto self-start" />
              <p className="text-sm text-ice/55">{p.role}</p>
            </GlassCard>
          ) : (
            <GlassCard key={p.name} className="flex items-center gap-5 p-6">
              <Image src={p.logo} alt={p.name} width={64} height={64} className="size-16 rounded-full bg-white object-contain p-1" />
              <div>
                <p className="font-display font-bold text-white">{p.name}</p>
                <p className="text-sm text-ice/55">{p.role}</p>
              </div>
            </GlassCard>
          ),
        )}
        <GlassCard className="flex items-center gap-5 p-6">
          <div className="grid size-16 place-items-center rounded-full border border-white/15 font-display text-sm font-bold text-white">
            {registrationPartner.logo ? (
              <Image src={registrationPartner.logo} alt={registrationPartner.name} width={48} height={48} unoptimized={registrationPartner.logo.endsWith(".svg")} className="w-12" />
            ) : (
              registrationPartner.name
            )}
          </div>
          <div>
            <p className="font-display font-bold text-white">{registrationPartner.name}</p>
            <p className="text-sm text-ice/55">Registration Partner</p>
          </div>
        </GlassCard>
      </Reveal>

      <GlassCard className="mt-16 p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h3 className="font-display text-3xl font-black text-white sm:text-4xl">{pitch.title}</h3>
            <p className="mt-4 text-ice/65">{pitch.body}</p>
            <p className="mt-4 text-sm text-ice/50">{pitch.inKind}</p>
            <a
              href={`mailto:${event.email}?subject=Sponsoring%20ALGONEX%201.0`}
              className="mt-8 inline-flex rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-lilac hover:bg-white/5"
            >
              Become a sponsor
            </a>
          </div>
          <ul className="divide-y divide-white/10">
            {pitch.tiers.map((t) => (
              <li key={t.name} className="flex items-baseline justify-between gap-6 py-4">
                <div>
                  <p className="font-display font-bold text-white">{t.name}</p>
                  <p className="text-sm text-ice/55">{t.highlight}</p>
                </div>
                <span className="shrink-0 font-mono text-lilac">{formatINR(t.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </GlassCard>
    </Section>
  );
}
