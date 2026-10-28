import { contacts, event } from "@/lib/data";
import { telHref } from "@/lib/format";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeading kicker="Contact" title="Questions?" accent="Talk to us." />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="grid gap-4 sm:grid-cols-2" stagger={0.06}>
          {contacts.people.map((p) => (
            <GlassCard key={p.id} className="p-6">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-indigo to-lilac font-display font-bold text-white">
                  {p.initials}
                </span>
                <div>
                  <p className="font-display font-bold text-white">{p.name}</p>
                  <p className="text-sm text-ice/55">{p.role}</p>
                </div>
              </div>
              <div className="mt-5 space-y-1 text-sm">
                <a href={telHref(p.phone)} className="block font-mono text-ice/80 hover:text-white">
                  {p.phone}
                </a>
                {p.email && (
                  <a href={`mailto:${p.email}`} className="block break-all text-ice/55 hover:text-white">
                    {p.email}
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </Reveal>

        <GlassCard className="flex flex-col justify-between p-8">
          <div>
            <p className="kicker">Venue</p>
            <p className="mt-4 font-display text-3xl font-black text-white">{event.venue.name}</p>
            <p className="mt-2 text-ice/65">{event.venue.address}</p>
            <a
              href={event.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-lilac underline-offset-4 hover:underline"
            >
              Open in Maps ↗
            </a>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="kicker">Write to us</p>
            <a href={`mailto:${event.email}`} className="mt-3 block font-display text-xl font-bold text-white hover:text-lilac sm:text-2xl">
              {event.email}
            </a>
            <a href={event.website} className="mt-2 block text-sm text-ice/55 hover:text-white">
              {event.websiteDisplay}
            </a>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
