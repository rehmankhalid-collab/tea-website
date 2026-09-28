import type { CSSProperties } from "react";

type TeaLeafProps = {
  className?: string;
  style?: CSSProperties;
};

/** Decorative tea leaf. Colour comes from `currentColor` (set via text-* or style.color). */
export function TeaLeaf({ className, style }: TeaLeafProps) {
  return (
    <svg
      viewBox="0 0 60 120"
      className={className}
      style={style}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M30 2C52 26 57 76 30 118 3 76 8 26 30 2Z"
        fill="currentColor"
      />
      {/* Shaded half gives the leaf a folded, dimensional look. */}
      <path
        d="M30 2C52 26 57 76 30 118Z"
        fill="#000"
        fillOpacity="0.18"
      />
      <path
        d="M30 8v106M30 34l-10-9M30 52l-13-10M30 70l-13-9M30 88l-10-7M30 42l11-9M30 60l13-10M30 78l12-8"
        stroke="#000"
        strokeOpacity="0.22"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
