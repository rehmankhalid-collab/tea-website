type TeaBoxProps = {
  name: string;
  number: string;
  sealColor: string;
};

/**
 * A small wooden keepsake box — brass corner brackets, a front clasp, a
 * wax-seal accent (colored per variety), and a paper label matching the
 * hero tin's typography treatment exactly, for brand consistency.
 */
export function TeaBox({ name, number, sealColor }: TeaBoxProps) {
  const uid = number.replace(/\D/g, "");

  return (
    <svg
      viewBox="0 0 260 220"
      aria-hidden="true"
      focusable="false"
      className="w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
    >
      <defs>
        <linearGradient id={`box-front-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#20130a" />
          <stop offset="0.14" stopColor="#5c3c22" />
          <stop offset="0.3" stopColor="#8a5c34" />
          <stop offset="0.5" stopColor="#6b4726" />
          <stop offset="0.78" stopColor="#42290f" />
          <stop offset="1" stopColor="#1d1108" />
        </linearGradient>
        <linearGradient id={`box-top-${uid}`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#a5744a" />
          <stop offset="0.5" stopColor="#7c5330" />
          <stop offset="1" stopColor="#5c3b1f" />
        </linearGradient>
        <linearGradient id={`box-side-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a1a0d" />
          <stop offset="1" stopColor="#140b05" />
        </linearGradient>
        <linearGradient id={`box-label-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8f887a" />
          <stop offset="0.25" stopColor="#e2dac7" />
          <stop offset="0.38" stopColor="#f4eee0" />
          <stop offset="0.7" stopColor="#d4ccb8" />
          <stop offset="1" stopColor="#7c7668" />
        </linearGradient>
        <radialGradient id={`box-seal-${uid}`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor={sealColor} stopOpacity="0.95" />
          <stop offset="1" stopColor={sealColor} stopOpacity="0.55" />
        </radialGradient>
      </defs>

      {/* Top / lid face */}
      <path d="M40 58 72 18 232 18 200 58Z" fill={`url(#box-top-${uid})`} />
      {/* Side face */}
      <path d="M200 58 232 18 232 150 200 190Z" fill={`url(#box-side-${uid})`} />
      {/* Front face */}
      <path d="M40 58h160v132H40Z" fill={`url(#box-front-${uid})`} />

      {/* Lid seam */}
      <path d="M40 74h160M72 34 232 18" stroke="#1b0f05" strokeOpacity="0.4" strokeWidth="1.2" fill="none" />
      {/* Grain lines */}
      <g stroke="#1b0f05" strokeOpacity="0.18" strokeWidth="1">
        <path d="M40 108h160" />
        <path d="M40 142h160" />
        <path d="M40 172h160" />
      </g>

      {/* Corner brackets, one L per corner of the front face */}
      <g stroke="#c8a96e" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M40 72V58h14" />
        <path d="M186 58h14v14" />
        <path d="M40 176v14h14" />
        <path d="M186 190h14v-14" />
      </g>

      {/* Front clasp */}
      <rect x="112" y="118" width="36" height="20" rx="3" fill="#c8a96e" />
      <circle cx="130" cy="128" r="4" fill="#3a2b12" />

      {/* Label */}
      <rect x="66" y="86" width="128" height="26" rx="2" fill={`url(#box-label-${uid})`} />
      <text
        x="130"
        y="103"
        textAnchor="middle"
        className="font-display"
        fontSize="13"
        fill="#1b271e"
        letterSpacing="1"
      >
        {name} · {number}
      </text>

      {/* Wax seal */}
      <circle cx="212" cy="34" r="12" fill={`url(#box-seal-${uid})`} />
      <circle cx="212" cy="34" r="12" fill="none" stroke="#000" strokeOpacity="0.15" />
    </svg>
  );
}
