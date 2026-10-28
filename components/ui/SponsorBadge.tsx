import Image from "next/image";
import { sponsors } from "@/lib/data";

/** Small, subtle "Sponsored by Onstop" line shown under the main CTA. */
export default function SponsorBadge({ className = "" }: { className?: string }) {
  const { name, label, logo, url } = sponsors.registrationPartner;
  const external = url.startsWith("http");

  return (
    <a
      href={url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ice/45 transition-colors hover:text-ice/80 ${className}`}
    >
      <span>{label}</span>
      {logo ? (
        <Image
          src={logo}
          alt={name}
          width={72}
          height={18}
          unoptimized={logo.endsWith(".svg")}
          className="h-3.5 w-auto opacity-70"
        />
      ) : (
        <span className="font-display text-xs font-bold normal-case tracking-normal text-ice/70">
          {name}
        </span>
      )}
    </a>
  );
}
