import { useId } from "react";

type Props = { className?: string; glow?: boolean };

/** The ALGONEX "A" mark from the brand kit, on a transparent background. */
export default function LogoMark({ className, glow = true }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="20 20 160 165" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`l1${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE3D8" />
          <stop offset="0.45" stopColor="#FF9E8C" />
          <stop offset="1" stopColor="#8A1F12" />
        </linearGradient>
        <linearGradient id={`l2${id}`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#FF6F5B" />
          <stop offset="1" stopColor="#8A1F12" />
        </linearGradient>
        <filter id={`g${id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        filter={glow ? `url(#g${id})` : undefined}
        strokeLinecap="round"
        fill="none"
      >
        <path d="M50 134 C78 104 122 162 150 134" stroke="#fff" strokeWidth="16" />
        <path d="M38 168 L100 34" stroke={`url(#l1${id})`} strokeWidth="26" />
        <path d="M100 34 L162 168" stroke={`url(#l2${id})`} strokeWidth="26" />
      </g>
      <g fill="#fff">
        <circle cx="100" cy="34" r="9" />
        <circle cx="38" cy="168" r="7" />
        <circle cx="162" cy="168" r="7" />
      </g>
    </svg>
  );
}
