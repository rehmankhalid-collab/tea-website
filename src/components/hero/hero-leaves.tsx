import { TeaLeaf } from "@/components/ui/tea-leaf";

// Scattered at different depths: small blurred leaves read as far away,
// large sharp ones as close. `depth` is exposed for future parallax.
const LEAVES = [
  { className: "top-[42%] right-[2%] w-10 rotate-[32deg] text-leaf", depth: 0.6 },
  { className: "top-[30%] right-[42%] w-6 -rotate-[24deg] text-moss blur-[2px]", depth: 0.3 },
  { className: "bottom-[16%] right-[4%] w-16 rotate-[118deg] text-matcha/80", depth: 1 },
  { className: "top-[62%] right-[38%] w-9 rotate-[74deg] text-leaf blur-[1px]", depth: 0.5 },
  { className: "top-[14%] left-[44%] w-5 rotate-[140deg] text-moss blur-[3px]", depth: 0.2 },
  { className: "bottom-[10%] left-[6%] w-7 -rotate-[48deg] text-moss blur-[2px] hidden lg:block", depth: 0.3 },
] as const;

export function HeroLeaves() {
  return (
    <div
      data-hero-leaves
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {LEAVES.map((leaf, index) => (
        <span
          key={index}
          data-hero-leaf
          data-depth={leaf.depth}
          className={`absolute ${leaf.className}`}
        >
          <TeaLeaf className="w-full drop-shadow-[0_12px_14px_rgba(0,0,0,0.4)]" />
        </span>
      ))}
    </div>
  );
}
