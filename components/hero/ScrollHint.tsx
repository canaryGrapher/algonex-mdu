export default function ScrollHint() {
  return (
    <div className="scroll-hint pointer-events-none absolute z-30 bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
      <span className="kicker !text-[0.6rem]">Scroll to begin</span>
      <span className="relative h-10 w-6 rounded-full border border-ice/40">
        <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 animate-bounce rounded-full bg-ice" />
      </span>
    </div>
  );
}
