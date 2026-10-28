"use client";

type Props = React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode };

/** Frosted glass panel with a soft spotlight that follows the cursor. */
export default function GlassCard({ children, className = "", ...rest }: Props) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      onMouseMove={onMove}
      className={`glass group relative overflow-hidden rounded-3xl transition-colors duration-500 hover:border-white/25 ${className}`}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(255 158 140 / .16), transparent 60%)",
        }}
      />
      {/* `contents` lets children take part in the card's own flex/grid layout. */}
      <div className="contents [&>*]:relative">{children}</div>
    </div>
  );
}
