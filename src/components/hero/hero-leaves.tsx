import { TeaLeaf } from "@/components/ui/tea-leaf";

// Scattered at different depths: small blurred leaves read as far away,
// large sharp ones as close. `depth` drives the scroll parallax.
// `position` sits on the outer element (scroll target), `leaf` on the SVG so
// its static rotation never skews GSAP's transforms.
const LEAVES = [
  { position: "top-[42%] right-[2%] w-10", leaf: "rotate-[32deg] text-leaf", depth: 0.6 },
  { position: "top-[30%] right-[42%] w-6", leaf: "-rotate-[24deg] text-moss blur-[2px]", depth: 0.3 },
  { position: "bottom-[16%] right-[4%] w-16", leaf: "rotate-[118deg] text-matcha/80", depth: 1 },
  { position: "top-[62%] right-[38%] w-9", leaf: "rotate-[74deg] text-leaf blur-[1px]", depth: 0.5 },
  { position: "top-[14%] left-[44%] w-5", leaf: "rotate-[140deg] text-moss blur-[3px]", depth: 0.2 },
  { position: "bottom-[10%] left-[6%] w-7 hidden lg:block", leaf: "-rotate-[48deg] text-moss blur-[2px]", depth: 0.3 },
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
          className={`absolute ${leaf.position}`}
        >
          <span data-hero-leaf-inner className="block">
            <TeaLeaf
              className={`w-full drop-shadow-[0_12px_14px_rgba(0,0,0,0.4)] ${leaf.leaf}`}
            />
          </span>
        </span>
      ))}
    </div>
  );
}
