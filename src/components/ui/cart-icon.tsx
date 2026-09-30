type CartIconProps = {
  className?: string;
};

export function CartIcon({ className }: CartIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2 4.5h1.6l.5 8a1 1 0 0 0 1 .9h5.8a1 1 0 0 0 1-.9l.5-6.5H4.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.5 4.5V3.8a2.5 2.5 0 0 1 5 0v.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
