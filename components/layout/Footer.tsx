import Image from "next/image";
import { event, site } from "@/lib/data";
import LogoMark from "@/components/ui/LogoMark";
import SponsorBadge from "@/components/ui/SponsorBadge";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-5 pb-10 pt-16 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoMark className="size-11" />
              <span className="font-display text-3xl font-black tracking-tight text-white">
                {event.name}
                <span className="ml-1.5 text-lilac">{event.edition}</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-ice/55">{event.tagline}</p>
            <div className="mt-4">
              <SponsorBadge />
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            {site.nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-ice/60 hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <Image
              src={event.organizer.logo}
              alt={event.organizer.name}
              width={1533}
              height={315}
              className="h-12 w-auto"
            />
            <p className="hidden max-w-[10rem] text-sm text-ice/55 lg:block">{event.venue.address}</p>
          </div>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-16 select-none text-center font-display text-[22vw] font-black leading-none tracking-tighter text-white/[0.04] lg:text-[17rem]"
        >
          {event.name}
        </p>

        <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-ice/40 sm:flex-row">
          <p>
            © 2026 {event.fullName} · {event.organizer.name}
          </p>
          <a href={`mailto:${event.email}`} className="hover:text-white">
            {event.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
