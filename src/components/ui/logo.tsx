import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Veyla — home"
      className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-6 text-matcha"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2.5c5 4 6.5 12 0 19-6.5-7-5-15 0-19Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M12 6v15" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="font-display text-[1.75rem] leading-none tracking-tight">
        Veyla
      </span>
    </Link>
  );
}
