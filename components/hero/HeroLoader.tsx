import LogoMark from "@/components/ui/LogoMark";

/** Shown while the hero Lottie downloads. Matches the clip's opening darkness. */
export default function HeroLoader() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#0b0406]">
      <div className="flex flex-col items-center gap-6">
        <LogoMark className="size-14 animate-pulse" />
        <span className="relative h-px w-40 overflow-hidden bg-white/10">
          <span className="absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-lilac to-transparent" />
        </span>
      </div>
    </div>
  );
}
